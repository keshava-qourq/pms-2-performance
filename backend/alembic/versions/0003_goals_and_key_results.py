"""create goals and key_results tables

Revision ID: 0003
Revises: 0002
Create Date: 2026-11-26

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0003"
down_revision: str | None = "0002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "goals",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column(
            "employee_id",
            sa.String(length=36),
            sa.ForeignKey("employees.id"),
            nullable=False,
        ),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="active"),
        sa.Column("progress", sa.Float(), nullable=False, server_default="0"),
        sa.Column("approval_status", sa.String(length=20), nullable=False, server_default="draft"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_goals_employee_id", "goals", ["employee_id"], unique=False)

    op.create_table(
        "key_results",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column(
            "goal_id",
            sa.String(length=36),
            sa.ForeignKey("goals.id"),
            nullable=False,
        ),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("target_value", sa.Float(), nullable=True),
        sa.Column("current_value", sa.Float(), nullable=False, server_default="0"),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="not_started"),
    )
    op.create_index("ix_key_results_goal_id", "key_results", ["goal_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_key_results_goal_id", table_name="key_results")
    op.drop_table("key_results")
    op.drop_index("ix_goals_employee_id", table_name="goals")
    op.drop_table("goals")
