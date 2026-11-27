"""SQLAlchemy models.

Schema changes flow only through Alembic migrations (see backend/alembic/); this
module declares the mapped classes that migrations and the ORM both work from.
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Index, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Employee(Base):
    """A member of the single organisation this system serves (NFR-007).

    Fields are limited to what performance management needs: identity,
    reporting line, status and the password hash used to authenticate --
    nothing beyond that (NFR-003).
    """

    __tablename__ = "employees"
    __table_args__ = (
        Index("ix_employees_email", "email", unique=True),
        Index("ix_employees_manager_id", "manager_id"),
        Index("ix_employees_name", "name"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    manager_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("employees.id"), nullable=True
    )
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="active")
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )
    # Set once an erasure request has been actioned (AC-037, AC-038); ``None``
    # for every employee who has not been erased. Distinct from ``status`` so
    # "erased" can be told apart from a merely deactivated account.
    erased_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    manager: Mapped["Employee | None"] = relationship(
        "Employee", remote_side=[id], foreign_keys=[manager_id]
    )


class Goal(Base):
    """An employee's objective: a title, an optional description and the key
    results that make it measurable (AC-016, AC-017).

    ``status`` tracks the goal's own lifecycle (active/at_risk/completed/
    closed); ``approval_status`` tracks the separate submit/review workflow
    (draft/pending/approved/changes) scaffolded by later stories. A goal is
    created as an active draft: visible among the employee's goals
    immediately (AC-016), not yet submitted for manager review.
    """

    __tablename__ = "goals"
    __table_args__ = (Index("ix_goals_employee_id", "employee_id"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id: Mapped[str] = mapped_column(String(36), ForeignKey("employees.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="active")
    progress: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    approval_status: Mapped[str] = mapped_column(String(20), nullable=False, default="draft")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    key_results: Mapped[list["KeyResult"]] = relationship(
        "KeyResult", back_populates="goal", cascade="all, delete-orphan", order_by="KeyResult.id"
    )


class KeyResult(Base):
    """One measurable key result belonging to a single goal (AC-016)."""

    __tablename__ = "key_results"
    __table_args__ = (Index("ix_key_results_goal_id", "goal_id"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    goal_id: Mapped[str] = mapped_column(String(36), ForeignKey("goals.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    target_value: Mapped[float | None] = mapped_column(Float, nullable=True)
    current_value: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="not_started")

    goal: Mapped["Goal"] = relationship("Goal", back_populates="key_results")


class Feedback(Base):
    """Free-text feedback one employee writes about a colleague (AC-026).

    Authored by the signed-in employee and associated with the chosen
    recipient; ``request_id`` is scaffolded for a later story (answering a
    feedback request) and stays unset until that story wires it up.
    """

    __tablename__ = "feedback"
    __table_args__ = (
        Index("ix_feedback_author_id", "author_id"),
        Index("ix_feedback_recipient_id", "recipient_id"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    author_id: Mapped[str] = mapped_column(String(36), ForeignKey("employees.id"), nullable=False)
    recipient_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("employees.id"), nullable=False
    )
    request_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    content: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )


class AuditLog(Base):
    """A durable record of a sensitive administrative action (AC-037).

    Actioning an employee's erasure writes one row here -- who did it, to
    whom, and when -- so the organisation can demonstrate the erasure was
    performed, even though the employee's own personal data is no longer
    retrievable afterwards (AC-038).
    """

    __tablename__ = "audit_logs"
    __table_args__ = (
        Index("ix_audit_logs_actor_id", "actor_id"),
        Index("ix_audit_logs_target_id", "target_id"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    actor_id: Mapped[str] = mapped_column(String(36), ForeignKey("employees.id"), nullable=False)
    action: Mapped[str] = mapped_column(String(50), nullable=False)
    target_type: Mapped[str] = mapped_column(String(50), nullable=False)
    target_id: Mapped[str] = mapped_column(String(36), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )


class Consent(Base):
    """An employee's recorded consent status for one processing purpose
    (AC-040).

    One row per ``(employee_id, purpose)`` pair (enforced by a unique index):
    recording consent again for a purpose already on file updates that same
    row's ``status`` and ``recorded_at`` rather than piling up duplicate
    rows, so the status retrieved for a purpose is always the single current
    one.
    """

    __tablename__ = "consents"
    __table_args__ = (
        Index("ix_consents_employee_id", "employee_id"),
        Index("ix_consents_employee_purpose", "employee_id", "purpose", unique=True),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id: Mapped[str] = mapped_column(String(36), ForeignKey("employees.id"), nullable=False)
    purpose: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )


__all__ = ["Base", "Employee", "Goal", "KeyResult", "Feedback", "AuditLog", "Consent"]
