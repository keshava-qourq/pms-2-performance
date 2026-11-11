"""POST /auth/login -- email/password authentication (AC-001, AC-002)."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.schemas import LoginRequest, LoginResponse, UserSummary
from app.security import create_access_token, verify_password

router = APIRouter(tags=["auth"])

_INVALID_CREDENTIALS = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid email or password",
)


@router.post("/auth/login", response_model=LoginResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:  # noqa: B008
    employee = db.query(Employee).filter(Employee.email == body.email).first()
    # Same error for an unknown email and a wrong password: never reveals which
    # field was wrong (AC-002, NFR-001).
    if employee is None or not verify_password(body.password, employee.password_hash):
        raise _INVALID_CREDENTIALS

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
