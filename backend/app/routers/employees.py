"""Employee-scoped resources and the HR-Admin employee directory.

- GET/POST/PATCH /admin/employees* is hr_admin-only (AC-007, AC-008, AC-009).
- PATCH /admin/employees/{id} also assigns/reassigns the reporting hierarchy
  (AC-010, AC-011).
- /employees/{id}/goals uses manager scoping to self + direct reports (AC-005).
"""

import secrets

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import require_hr_admin, require_self_or_report
from app.errors import (
    EMPLOYEE_EMAIL_IN_USE,
    EMPLOYEE_MANAGER_CYCLE,
    EMPLOYEE_MANAGER_NOT_FOUND,
    EMPLOYEE_MANAGER_SELF,
    EMPLOYEE_NOT_FOUND,
)
from app.models import Employee
from app.schemas import (
    EmployeeCreate,
    EmployeeListResponse,
    EmployeeOut,
    EmployeeUpdate,
    StubResponse,
)
from app.security import hash_password
from app.services import creates_manager_cycle

router = APIRouter(tags=["employees"])

_CREATE_RESPONSES = {
    **EMPLOYEE_EMAIL_IN_USE.openapi_response(),
    **EMPLOYEE_MANAGER_NOT_FOUND.openapi_response(),
}

_UPDATE_RESPONSES = {
    **EMPLOYEE_NOT_FOUND.openapi_response(),
    **EMPLOYEE_EMAIL_IN_USE.openapi_response(),
    status.HTTP_422_UNPROCESSABLE_ENTITY: {
        "description": (
            f"{EMPLOYEE_MANAGER_NOT_FOUND.detail} / {EMPLOYEE_MANAGER_SELF.detail} / "
            f"{EMPLOYEE_MANAGER_CYCLE.detail}"
        )
    },
}


def _email_in_use(db: Session, email: str, exclude_id: str | None = None) -> bool:
    query = db.query(Employee.id).filter(Employee.email == email)
    if exclude_id is not None:
        query = query.filter(Employee.id != exclude_id)
    return query.first() is not None


@router.get("/admin/employees", response_model=EmployeeListResponse)
def list_employees(
    search: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=25, ge=1, le=100),
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeListResponse:
    """Searchable, paginated employee directory, ordered by name (NFR-007)."""
    query = db.query(Employee)
    if search:
        like = f"%{search}%"
        query = query.filter(or_(Employee.name.ilike(like), Employee.email.ilike(like)))

    total = query.count()
    rows = query.order_by(Employee.name).offset((page - 1) * page_size).limit(page_size).all()
    items = [EmployeeOut.model_validate(row) for row in rows]
    return EmployeeListResponse(items=items, total=total, page=page, page_size=page_size)


@router.post(
    "/admin/employees",
    response_model=EmployeeOut,
    status_code=status.HTTP_201_CREATED,
    responses=_CREATE_RESPONSES,
)
def create_employee(
    body: EmployeeCreate,
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeOut:
    if body.manager_id is not None and db.get(Employee, body.manager_id) is None:
        raise EMPLOYEE_MANAGER_NOT_FOUND.raise_as_http()
    if _email_in_use(db, body.email):
        raise EMPLOYEE_EMAIL_IN_USE.raise_as_http()

    employee = Employee(
        name=body.name,
        email=body.email,
        role=body.role,
        manager_id=body.manager_id,
        status="active",
        # No login/invite flow exists yet for admin-created profiles; a
        # random, never-disclosed hash satisfies the non-nullable column
        # until that flow lands.
        password_hash=hash_password(secrets.token_urlsafe(32)),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return EmployeeOut.model_validate(employee)


@router.patch(
    "/admin/employees/{id}",
    response_model=EmployeeOut,
    responses=_UPDATE_RESPONSES,
)
def update_employee(
    id: str,
    body: EmployeeUpdate,
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeOut:
    """Edit a profile or (re)assign its manager (AC-008, AC-010, AC-011).

    Assigning ``manager_id`` -- whether the employee had none before or is
    being moved from one manager to another -- is a single update to this
    row: the previous manager's direct reports and the new manager's direct
    reports are both just live queries over ``manager_id`` (see
    ``app.services.direct_reports``), so both sides of the hierarchy reflect
    the change with nothing further to update.
    """
    employee = db.get(Employee, id)
    if employee is None:
        raise EMPLOYEE_NOT_FOUND.raise_as_http()

    data = body.model_dump(exclude_unset=True)

    if "email" in data and _email_in_use(db, data["email"], exclude_id=id):
        raise EMPLOYEE_EMAIL_IN_USE.raise_as_http()

    if "manager_id" in data and data["manager_id"] is not None:
        new_manager_id = data["manager_id"]
        if new_manager_id == id:
            raise EMPLOYEE_MANAGER_SELF.raise_as_http()
        if db.get(Employee, new_manager_id) is None:
            raise EMPLOYEE_MANAGER_NOT_FOUND.raise_as_http()
        if creates_manager_cycle(db, id, new_manager_id):
            raise EMPLOYEE_MANAGER_CYCLE.raise_as_http()

    for field, value in data.items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)
    return EmployeeOut.model_validate(employee)


@router.get("/employees/{id}/goals", response_model=StubResponse)
def get_employee_goals(
    id: str,
    current: Employee = Depends(require_self_or_report("id")),  # noqa: B008
) -> StubResponse:
    """A manager views a direct report's goals; an unrelated manager or any
    other employee is denied. Goal content itself is implemented elsewhere;
    this route exists so the scoping guard has a real endpoint to protect."""
    return StubResponse(endpoint="get_employees_id_goals")
