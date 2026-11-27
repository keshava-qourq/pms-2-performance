"""create consents table

Revision ID: 0006
Revises: 0005
Create Date: 2026-11-27

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0006"
down_revision: str | None = "0005"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "consents",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column(
            "employee_id",
            sa.String(length=36),
            sa.ForeignKey("employees.id"),
            nullable=False,
        ),
        sa.Column("purpose", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column(
            "recorded_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_consents_employee_id", "consents", ["employee_id"], unique=False)
    op.create_index(
        "ix_consents_employee_purpose", "consents", ["employee_id", "purpose"], unique=True
    )


def downgrade() -> None:
    op.drop_index("ix_consents_employee_purpose", table_name="consents")
    op.drop_index("ix_consents_employee_id", table_name="consents")
    op.drop_table("consents")
