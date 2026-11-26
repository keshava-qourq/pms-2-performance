"""Goal creation, key result updates, submission and manager review.

POST /goals is this story's endpoint (AC-016, AC-017). The other three routes
are scaffolded from the approved architecture for later stories and stay
stubs until those are built.
"""

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.schemas import (
    GoalCreate,
    GoalOut,
    GoalReviewRequest,
    KeyResultUpdate,
    StubResponse,
)
from app.security import get_current_employee
from app.services import create_goal as create_goal_record

router = APIRouter(tags=["goals"])


@router.post("/goals", response_model=GoalOut, status_code=status.HTTP_201_CREATED)
def create_goal(
    body: GoalCreate,
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> GoalOut:
    """AC-016: save the objective and its key results, owned by the
    signed-in employee -- never by an id the request body could supply.
    AC-017 (missing title / no key results) is already rejected by
    ``GoalCreate`` before this body runs, with a 422 naming the field(s)."""
    goal = create_goal_record(db, current, body)
    return GoalOut.model_validate(goal)


@router.patch("/goals/{goal_id}/key-results/{key_result_id}", response_model=StubResponse)
async def update_key_result(
    goal_id: uuid.UUID, key_result_id: uuid.UUID, body: KeyResultUpdate
) -> StubResponse:
    return StubResponse(endpoint="PATCH /goals/{id}/key-results/{kr_id}")


@router.post("/goals/{goal_id}/submit", response_model=StubResponse)
async def submit_goal(goal_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="POST /goals/{id}/submit")


@router.post("/goals/{goal_id}/review", response_model=StubResponse)
async def review_goal(goal_id: uuid.UUID, body: GoalReviewRequest) -> StubResponse:
    return StubResponse(endpoint="POST /goals/{id}/review")
