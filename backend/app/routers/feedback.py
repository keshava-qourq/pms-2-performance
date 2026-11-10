"""Feedback: writing it, requesting it, and listing given/received."""

from typing import Literal

from fastapi import APIRouter

from app.schemas import FeedbackCreate, FeedbackRequestCreate, StubResponse

router = APIRouter(tags=["feedback"])


@router.post("/feedback", response_model=StubResponse)
async def write_feedback(body: FeedbackCreate) -> StubResponse:
    return StubResponse(endpoint="POST /feedback")


@router.post("/feedback/requests", response_model=StubResponse)
async def request_feedback(body: FeedbackRequestCreate) -> StubResponse:
    return StubResponse(endpoint="POST /feedback/requests")


@router.get("/feedback", response_model=StubResponse)
async def list_feedback(direction: Literal["received", "given"] | None = None) -> StubResponse:
    return StubResponse(endpoint="GET /feedback")
