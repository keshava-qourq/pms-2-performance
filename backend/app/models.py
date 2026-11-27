"""SQLAlchemy models.

Schema changes flow only through Alembic migrations (see backend/alembic/); this
module declares the mapped classes that migrations and the ORM both work from.
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, String, func
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

    manager: Mapped["Employee | None"] = relationship(
        "Employee", remote_side=[id], foreign_keys=[manager_id]
    )


__all__ = ["Base", "Employee"]
