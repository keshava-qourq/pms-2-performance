"""HR-Admin-only endpoints (AC-004, AC-006).

The employee directory itself lives in backend/app/routers/employees.py
alongside the other employee-scoped handlers; this router holds /admin/*
endpoints that are not employee-directory routes.

POST /admin/employees/{id}/erase (AC-037, AC-038): actions an approved GDPR
erasure request -- removes/anonymises the employee's personal data and
writes an audit log entry recording that it happened.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import require_hr_admin
from app.errors import EMPLOYEE_ALREADY_ERASED, EMPLOYEE_NOT_FOUND
from app.models import Employee
from app.schemas import EmployeeErasureResponse
from app.services import erase_employee as erase_employee_service

router = APIRouter(prefix="/admin", tags=["admin"])

_ERASE_RESPONSES = {
    **EMPLOYEE_NOT_FOUND.openapi_response(),
    **EMPLOYEE_ALREADY_ERASED.openapi_response(),
}


@router.post(
    "/employees/{id}/erase",
    response_model=EmployeeErasureResponse,
    responses=_ERASE_RESPONSES,
)
def erase_employee(
    id: str,
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeErasureResponse:
    """Action an approved erasure for the employee at ``id`` (AC-037,
    AC-038). 404 when the employee does not exist, 409 when it has already
    been erased."""
    employee = erase_employee_service(db, current, id)
    return EmployeeErasureResponse(
        id=employee.id, status=employee.status, erased_at=employee.erased_at
    )
