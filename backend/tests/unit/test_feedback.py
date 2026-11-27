"""Unit tests for the POST /feedback logic (AC-026, AC-027).

These exercise `app.services.write_feedback` and `app.schemas.FeedbackCreate`
directly against the database session, rather than the full integration
surface (owned by backend/tests/integration/, not this file).
"""

import pytest
from fastapi import HTTPException
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.models import Employee, Feedback
from app.schemas import FeedbackCreate, FeedbackOut
from app.security import hash_password
from app.services import write_feedback


def _make_employee(db: Session, *, email: str) -> Employee:
    employee = Employee(
        name="Someone",
        email=email,
        role="employee",
        status="active",
        password_hash=hash_password("correct-horse-battery"),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def test_ac026_writing_feedback_saves_it_associated_with_the_colleague(db: Session) -> None:
    author = _make_employee(db, email="author@example.com")
    colleague = _make_employee(db, email="colleague@example.com")
    body = FeedbackCreate(recipient_id=colleague.id, content="Great work on the launch")

    feedback = write_feedback(db, author, body)

    assert feedback.id
    assert feedback.author_id == author.id
    assert feedback.recipient_id == colleague.id
    assert feedback.content == "Great work on the launch"


def test_ac026_feedback_is_authored_by_the_signed_in_employee_not_a_body_field(
    db: Session,
) -> None:
    """The author comes from the authenticated caller, never from the
    request body: FeedbackCreate has no field through which an author id
    could be supplied."""
    author = _make_employee(db, email="author@example.com")
    colleague = _make_employee(db, email="colleague@example.com")
    body = FeedbackCreate(recipient_id=colleague.id, content="Nice job")

    feedback = write_feedback(db, author, body)

    assert feedback.author_id == author.id
    assert not hasattr(body, "author_id")


def test_ac026_feedback_is_listed_among_the_colleagues_received_feedback(db: Session) -> None:
    author = _make_employee(db, email="author@example.com")
    colleague = _make_employee(db, email="colleague@example.com")
    body = FeedbackCreate(recipient_id=colleague.id, content="Nice job")

    write_feedback(db, author, body)

    listed = db.query(Feedback).filter(Feedback.recipient_id == colleague.id).all()
    assert len(listed) == 1
    assert listed[0].content == "Nice job"


def test_ac026_feedback_out_serialises_the_created_feedback(db: Session) -> None:
    author = _make_employee(db, email="author@example.com")
    colleague = _make_employee(db, email="colleague@example.com")
    body = FeedbackCreate(recipient_id=colleague.id, content="Nice job")

    feedback = write_feedback(db, author, body)
    out = FeedbackOut.model_validate(feedback)

    assert out.author_id == author.id
    assert out.recipient_id == colleague.id
    assert out.content == "Nice job"
    assert out.request_id is None


def test_ac026_rejects_feedback_for_an_unknown_colleague(db: Session) -> None:
    author = _make_employee(db, email="author@example.com")
    body = FeedbackCreate(recipient_id="11111111-1111-1111-1111-111111111111", content="Nice job")

    with pytest.raises(HTTPException) as exc_info:
        write_feedback(db, author, body)

    assert exc_info.value.status_code == 422
    assert db.query(Feedback).count() == 0


def test_ac027_missing_content_is_rejected_with_the_required_field_named() -> None:
    with pytest.raises(ValidationError) as exc_info:
        FeedbackCreate(recipient_id="11111111-1111-1111-1111-111111111111")

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "content" in fields


def test_ac027_empty_content_is_rejected(db: Session) -> None:
    with pytest.raises(ValidationError) as exc_info:
        FeedbackCreate(recipient_id="11111111-1111-1111-1111-111111111111", content="")

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "content" in fields
