"""GET /dashboard: the personal dashboard, served from cache once implemented.

app/cache.py already has the disposable Redis cache helpers this will use.
"""

from fastapi import APIRouter

from app.schemas import StubResponse

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard", response_model=StubResponse)
async def get_dashboard() -> StubResponse:
    return StubResponse(endpoint="GET /dashboard")
