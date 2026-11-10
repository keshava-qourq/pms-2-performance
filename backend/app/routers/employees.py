"""Employee-scoped resources and the HR-Admin employee directory.

- GET/POST/PATCH /admin/employees* is hr_admin-only (AC-007, AC-008, AC-009).
- /employees/{id}/goals uses manager scoping to self + direct reports (AC-005).
"""

import secrets

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import require_hr_admin, require_self_or_report
from app.models import Employee
from app.schemas import (
    EmployeeCreate,
    EmployeeListResponse,
    EmployeeOut,
    EmployeeUpdate,
    StubResponse,
)
from app.security import hash_password

router = APIRouter(tags=["employees"])

_EMPLOYEE_NOT_FOUND = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found"
)


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


@router.post("/admin/employees", response_model=EmployeeOut, status_code=status.HTTP_201_CREATED)
def create_employee(
    body: EmployeeCreate,
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeOut:
    if body.manager_id is not None and db.get(Employee, body.manager_id) is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="manager_id does not exist",
        )
    if _email_in_use(db, body.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")

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


def _creates_cycle(db: Session, employee_id: str, new_manager_id: str) -> bool:
    """True if employee_id is an ancestor of new_manager_id, i.e. assigning
    new_manager_id as employee_id's manager would close a reporting loop."""
    visited: set[str] = set()
    walker = db.get(Employee, new_manager_id)
    while walker is not None:
        if walker.id == employee_id:
            return True
        if walker.id in visited:
            break
        visited.add(walker.id)
        walker = db.get(Employee, walker.manager_id) if walker.manager_id else None
    return False


@router.patch("/admin/employees/{id}", response_model=EmployeeOut)
def update_employee(
    id: str,
    body: EmployeeUpdate,
    current: Employee = Depends(require_hr_admin),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> EmployeeOut:
    employee = db.get(Employee, id)
    if employee is None:
        raise _EMPLOYEE_NOT_FOUND

    data = body.model_dump(exclude_unset=True)

    if "email" in data and _email_in_use(db, data["email"], exclude_id=id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")

    if "manager_id" in data and data["manager_id"] is not None:
        new_manager_id = data["manager_id"]
        if new_manager_id == id:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="An employee cannot be their own manager",
            )
        if db.get(Employee, new_manager_id) is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="manager_id does not exist",
            )
        if _creates_cycle(db, id, new_manager_id):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="manager_id would create a reporting cycle",
            )

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
