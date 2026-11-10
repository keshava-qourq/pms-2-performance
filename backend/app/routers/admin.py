"""HR-Admin-only endpoints, including the employee directory (AC-004, AC-006)."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import require_hr_admin
from app.models import Employee
from app.schemas import UserSummary

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/employees", response_model=list[UserSummary])
def list_employees(
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> list[UserSummary]:
    """The employee directory: full read access is hr_admin only."""
    employees = (
        db.query(Employee).order_by(Employee.name).offset(offset).limit(limit).all()
    )
    return [
        UserSummary(id=e.id, name=e.name, email=e.email, role=e.role) for e in employees
    ]
