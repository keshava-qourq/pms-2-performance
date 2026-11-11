"""Goal creation, key result updates, submission and manager review."""

import uuid

from fastapi import APIRouter

from app.schemas import GoalCreate, GoalReviewRequest, KeyResultUpdate, StubResponse

router = APIRouter(tags=["goals"])


@router.post("/goals", response_model=StubResponse)
async def create_goal(body: GoalCreate) -> StubResponse:
    return StubResponse(endpoint="POST /goals")


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
