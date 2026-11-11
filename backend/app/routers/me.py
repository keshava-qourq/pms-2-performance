"""GET /me -- the caller's own profile and assigned manager (AC-015)."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.schemas import ManagerSummary, MeResponse
from app.security import get_current_employee

router = APIRouter(tags=["me"])


@router.get("/me", response_model=MeResponse)
def get_me(
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> MeResponse:
    manager = None
    if current.manager_id:
        manager_row = db.get(Employee, current.manager_id)
        if manager_row is not None:
            manager = ManagerSummary(
                id=manager_row.id,
                name=manager_row.name,
                email=manager_row.email,
                role=manager_row.role,
            )

    return MeResponse(
        id=current.id,
        name=current.name,
        email=current.email,
        role=current.role,
        status=current.status,
        created_at=current.created_at,
        updated_at=current.updated_at,
        manager=manager,
    )
