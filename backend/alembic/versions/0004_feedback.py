"""create feedback table

Revision ID: 0004
Revises: 0003
Create Date: 2026-11-27

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0004"
down_revision: str | None = "0003"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "feedback",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column(
            "author_id",
            sa.String(length=36),
            sa.ForeignKey("employees.id"),
            nullable=False,
        ),
        sa.Column(
            "recipient_id",
            sa.String(length=36),
            sa.ForeignKey("employees.id"),
            nullable=False,
        ),
        sa.Column("request_id", sa.String(length=36), nullable=True),
        sa.Column("content", sa.String(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_feedback_author_id", "feedback", ["author_id"], unique=False)
    op.create_index("ix_feedback_recipient_id", "feedback", ["recipient_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_feedback_recipient_id", table_name="feedback")
    op.drop_index("ix_feedback_author_id", table_name="feedback")
    op.drop_table("feedback")
