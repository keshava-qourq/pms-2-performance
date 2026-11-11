"""index employees.name for directory search and ordering

Revision ID: 0002
Revises: 0001
Create Date: 2026-11-10

"""

from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0002"
down_revision: str | None = "0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_index("ix_employees_name", "employees", ["name"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_employees_name", table_name="employees")
