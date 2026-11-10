"""POST /auth/login.

No credential verification yet. app/security.py already has the
password-hashing and JWT helpers the real implementation will need.
"""

from fastapi import APIRouter

from app.schemas import LoginRequest, StubResponse

router = APIRouter(tags=["auth"])


@router.post("/auth/login", response_model=StubResponse)
async def login(body: LoginRequest) -> StubResponse:
    return StubResponse(endpoint="POST /auth/login")
