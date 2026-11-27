"""Feedback: writing it, requesting it, and listing given/received.

POST /feedback is this story's endpoint (AC-026, AC-027). The other two
routes are scaffolded from the approved architecture for later stories and
stay stubs until those are built.
"""

from typing import Literal

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.errors import FEEDBACK_RECIPIENT_NOT_FOUND
from app.models import Employee
from app.schemas import FeedbackCreate, FeedbackOut, FeedbackRequestCreate, StubResponse
from app.security import get_current_employee
from app.services import write_feedback as save_feedback

router = APIRouter(tags=["feedback"])

_WRITE_RESPONSES = {
    **FEEDBACK_RECIPIENT_NOT_FOUND.openapi_response(),
}


@router.post(
    "/feedback",
    response_model=FeedbackOut,
    status_code=status.HTTP_201_CREATED,
    responses=_WRITE_RESPONSES,
)
async def write_feedback(
    body: FeedbackCreate,
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> FeedbackOut:
    """AC-026: save the feedback, associated with the chosen colleague and
    authored by the signed-in employee -- never by an id the request body
    could supply. AC-027 (empty content) is already rejected by
    ``FeedbackCreate`` before this body runs, with a 422 naming the field."""
    feedback = save_feedback(db, current, body)
    return FeedbackOut.model_validate(feedback)


@router.post("/feedback/requests", response_model=StubResponse)
async def request_feedback(body: FeedbackRequestCreate) -> StubResponse:
    return StubResponse(endpoint="POST /feedback/requests")


@router.get("/feedback", response_model=StubResponse)
async def list_feedback(direction: Literal["received", "given"] | None = None) -> StubResponse:
    return StubResponse(endpoint="GET /feedback")
