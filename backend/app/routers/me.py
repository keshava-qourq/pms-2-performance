"""GET /me -- the caller's own profile and assigned manager (AC-015)."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.schemas import MeResponse
from app.security import get_current_employee
from app.services import build_me_response

router = APIRouter(tags=["me"])


@router.get("/me", response_model=MeResponse)
def get_me(
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> MeResponse:
    return build_me_response(db, current)
