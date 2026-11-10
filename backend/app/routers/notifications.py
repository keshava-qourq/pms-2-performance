"""In-app notifications: listing them and marking one read."""

import uuid

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["notifications"])


@router.get("/notifications", response_model=StubResponse)
async def list_notifications() -> StubResponse:
    return StubResponse(endpoint="GET /notifications")


@router.post("/notifications/{notification_id}/read", response_model=StubResponse)
async def mark_notification_read(notification_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="POST /notifications/{id}/read")
