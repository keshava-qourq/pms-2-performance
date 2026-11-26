"""POST /auth/login -- email/password authentication (AC-001, AC-002, AC-003).

No SAML/OAuth route exists anywhere in this app (AC-003): email/password is
the only authentication this version supports.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.errors import AUTH_INVALID_CREDENTIALS
from app.schemas import LoginRequest, LoginResponse, UserSummary
from app.security import create_access_token
from app.services import authenticate_employee

router = APIRouter(tags=["auth"])


@router.post(
    "/auth/login",
    response_model=LoginResponse,
    responses=AUTH_INVALID_CREDENTIALS.openapi_response(),
)
def login(body: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:  # noqa: B008
    employee = authenticate_employee(db, body.email, body.password)
    if employee is None:
        # AC-002, NFR-001: one generic error, whether the email was unknown
        # or the password was wrong.
        raise AUTH_INVALID_CREDENTIALS.raise_as_http()

    token = create_access_token(employee)
    return LoginResponse(
        access_token=token,
        user=UserSummary(
            id=employee.id,
            name=employee.name,
            email=employee.email,
            role=employee.role,
        ),
    )
