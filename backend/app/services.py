"""The backing services this application is configured to reach.

Each entry maps a service to the environment variable that addresses it. The value
comes from docker-compose.yml through .env.example, so the health check reports
what the running deployment can actually reach.
"""

import os

from sqlalchemy.orm import Session

from app.models import Employee
from app.schemas import ManagerSummary, MeResponse
from app.security import verify_password

SERVICES = {
    "redis-queue": "REDIS_URL",
    "redis": "REDIS_URL",
}


def configured_services() -> dict[str, bool]:
    """Each service mapped to whether its connection variable is set."""
    return {name: bool(os.getenv(var)) for name, var in SERVICES.items()}


# A pre-computed bcrypt hash of an unguessable value, used only to keep the
# cost of an unknown-email login attempt the same as a known-email one.
_DUMMY_HASH = "$2b$12$CwTycUXWue0Thq9StjUM0uJ8i6jkT1o0RxReJq8g8LRbgs2RK0UMi"


def authenticate_employee(db: Session, email: str, password: str) -> Employee | None:
    """Verify an email/password pair (AC-001, AC-002).

    Returns the matching employee only when the email is known and the
    password matches its stored hash; otherwise returns ``None`` so the
    caller can raise a single generic error regardless of which check failed
    (NFR-001).
    """
    employee = db.query(Employee).filter(Employee.email == email).first()
    if employee is None:
        # Still run a hash comparison so a valid vs. unknown email cannot be
        # told apart by response timing.
        verify_password(password, _DUMMY_HASH)
        return None
    if not verify_password(password, employee.password_hash):
        return None
    return employee


def get_manager_summary(db: Session, employee: Employee) -> ManagerSummary | None:
    """The assigned manager's summary for ``employee``, or ``None`` when the
    employee has no manager, or its referenced manager row no longer exists
    (AC-015)."""
    if not employee.manager_id:
        return None
    manager_row = db.get(Employee, employee.manager_id)
    if manager_row is None:
        return None
    return ManagerSummary(
        id=manager_row.id,
        name=manager_row.name,
        email=manager_row.email,
        role=manager_row.role,
    )


def build_me_response(db: Session, employee: Employee) -> MeResponse:
    """The caller's own profile plus their assigned manager (AC-015)."""
    return MeResponse(
        id=employee.id,
        name=employee.name,
        email=employee.email,
        role=employee.role,
        status=employee.status,
        created_at=employee.created_at,
        updated_at=employee.updated_at,
        manager=get_manager_summary(db, employee),
    )


def direct_reports(db: Session, manager_id: str) -> list[Employee]:
    """Every employee currently reporting to ``manager_id``, by name.

    This is the live reporting hierarchy: it is never stored separately, so
    assigning or changing an employee's ``manager_id`` (PATCH
    /admin/employees/{id}) is immediately reflected for both the employee's
    previous manager (who stops appearing here) and their new one (who starts
    appearing here) without any further bookkeeping (AC-010, AC-011).
    """
    return (
        db.query(Employee).filter(Employee.manager_id == manager_id).order_by(Employee.name).all()
    )


def creates_manager_cycle(db: Session, employee_id: str, candidate_manager_id: str) -> bool:
    """True if ``employee_id`` is an ancestor of ``candidate_manager_id``.

    Walks up the candidate's existing chain of managers; reaching
    ``employee_id`` means assigning ``candidate_manager_id`` as their manager
    would close a reporting loop (AC-011). A dangling/garbled chain simply
    stops the walk rather than looping forever.
    """
    visited: set[str] = set()
    walker = db.get(Employee, candidate_manager_id)
    while walker is not None:
        if walker.id == employee_id:
            return True
        if walker.id in visited:
            break
        visited.add(walker.id)
        walker = db.get(Employee, walker.manager_id) if walker.manager_id else None
    return False
