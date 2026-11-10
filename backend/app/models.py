"""SQLAlchemy models: the approved data model, table for table.

Every table from the architecture's data model lives here as a declarative
class. No endpoint reads or writes them yet -- wiring one up is the
development sprint's work, one ticket at a time. `Base` is bound to the
engine in app/database.py, and app/main.py imports this module before it
creates the schema.

`Uuid` (SQLAlchemy 2.0's database-agnostic UUID type) rather than Postgres's
native UUID directly: it stores a real `uuid` column on Postgres and falls
back to a CHAR(32) on SQLite, so the same models work against the sandbox's
real Postgres and the tests' in-memory SQLite.
"""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Numeric, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.types import JSON, String

from app.database import Base

__all__ = [
    "Base",
    "Employee",
    "Goal",
    "KeyResult",
    "Feedback",
    "FeedbackRequest",
    "Notification",
    "Consent",
    "CsvImportJob",
    "AuditLog",
]


def _uuid_pk() -> Mapped[uuid.UUID]:
    return mapped_column(Uuid, primary_key=True, default=uuid.uuid4)


class Employee(Base):
    """An HR Admin, Manager or Employee account and its place in the hierarchy."""

    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = _uuid_pk()
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50))
    manager_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("employees.id"), nullable=True, index=True
    )
    status: Mapped[str] = mapped_column(String(50), default="active", server_default="active")
    is_anonymised: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    manager: Mapped["Employee | None"] = relationship(remote_side=[id])


class Goal(Base):
    """An objective an employee owns, with one or more key results."""

    __tablename__ = "goals"

    id: Mapped[uuid.UUID] = _uuid_pk()
    employee_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="active", server_default="active")
    progress: Mapped[float] = mapped_column(Numeric, default=0, server_default="0")
    approval_status: Mapped[str] = mapped_column(
        String(50), default="draft", server_default="draft"
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    key_results: Mapped[list["KeyResult"]] = relationship(
        back_populates="goal", cascade="all, delete-orphan"
    )


class KeyResult(Base):
    """A measurable target that rolls up into its goal's progress."""

    __tablename__ = "key_results"

    id: Mapped[uuid.UUID] = _uuid_pk()
    goal_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("goals.id"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    target_value: Mapped[float] = mapped_column(Numeric)
    current_value: Mapped[float] = mapped_column(Numeric, default=0, server_default="0")
    status: Mapped[str] = mapped_column(String(50), default="on_track", server_default="on_track")

    goal: Mapped["Goal"] = relationship(back_populates="key_results")


class FeedbackRequest(Base):
    """A request that one employee asks another to leave them feedback."""

    __tablename__ = "feedback_requests"

    id: Mapped[uuid.UUID] = _uuid_pk()
    requester_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    target_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    status: Mapped[str] = mapped_column(String(50), default="pending", server_default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Feedback(Base):
    """Feedback one employee wrote about another, optionally answering a request."""

    __tablename__ = "feedback"

    id: Mapped[uuid.UUID] = _uuid_pk()
    author_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    recipient_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    request_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("feedback_requests.id"), nullable=True
    )
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Notification(Base):
    """An in-app notification for one employee."""

    __tablename__ = "notifications"

    id: Mapped[uuid.UUID] = _uuid_pk()
    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    type: Mapped[str] = mapped_column(String(50))
    message: Mapped[str] = mapped_column(Text)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Consent(Base):
    """An employee's recorded consent status for one GDPR processing purpose."""

    __tablename__ = "consents"

    id: Mapped[uuid.UUID] = _uuid_pk()
    employee_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"), index=True)
    purpose: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(50))
    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class CsvImportJob(Base):
    """One HR Admin bulk CSV upload, and the background worker's progress on it."""

    __tablename__ = "csv_import_jobs"

    id: Mapped[uuid.UUID] = _uuid_pk()
    uploaded_by: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("employees.id"))
    s3_key: Mapped[str] = mapped_column(String(512))
    status: Mapped[str] = mapped_column(String(50), default="queued", server_default="queued")
    summary: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class AuditLog(Base):
    """An immutable record of who did what to which entity, and when."""

    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = _uuid_pk()
    actor_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("employees.id"), nullable=True
    )
    action: Mapped[str] = mapped_column(String(100))
    entity: Mapped[str] = mapped_column(String(100))
    entity_id: Mapped[str] = mapped_column(String(100))
    details: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
