"""GET /me, and the GDPR self-service endpoints every employee can call on
their own record: requesting a data export and recording consent."""

from fastapi import APIRouter

from app.schemas import ConsentRequest, StubResponse

router = APIRouter(tags=["me"])


@router.get("/me", response_model=StubResponse)
async def get_my_profile() -> StubResponse:
    return StubResponse(endpoint="GET /me")


@router.post("/me/data-export", response_model=StubResponse)
async def request_data_export() -> StubResponse:
    return StubResponse(endpoint="POST /me/data-export")


@router.post("/me/consent", response_model=StubResponse)
async def record_consent(body: ConsentRequest) -> StubResponse:
    return StubResponse(endpoint="POST /me/consent")
