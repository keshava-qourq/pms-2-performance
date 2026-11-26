"""Unit tests for the GET /me logic (AC-015).

These exercise `app.services.build_me_response` / `get_manager_summary`
directly against the database session, rather than the full integration
surface (owned by backend/tests/integration/test_me.py).
"""

from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password
from app.services import build_me_response, get_manager_summary


def _make_employee(
    db: Session,
    *,
    email: str,
    role: str = "employee",
    manager_id: str | None = None,
    name: str = "Test Person",
) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role=role,
        status="active",
        manager_id=manager_id,
        password_hash=hash_password("correct-horse-battery"),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def test_ac015_build_me_response_returns_own_profile_fields(db: Session) -> None:
    employee = _make_employee(db, email="own@example.com", name="Own Person", role="manager")

    result = build_me_response(db, employee)

    assert result.id == employee.id
    assert result.name == "Own Person"
    assert result.email == "own@example.com"
    assert result.role == "manager"
    assert result.status == "active"
    assert result.created_at == employee.created_at
    assert result.updated_at == employee.updated_at


def test_ac015_build_me_response_includes_assigned_manager(db: Session) -> None:
    manager = _make_employee(db, email="manager@example.com", role="manager", name="Boss")
    report = _make_employee(db, email="report@example.com", manager_id=manager.id)

    result = build_me_response(db, report)

    assert result.manager is not None
    assert result.manager.id == manager.id
    assert result.manager.name == "Boss"
    assert result.manager.email == "manager@example.com"
    assert result.manager.role == "manager"


def test_ac015_manager_is_none_when_unassigned(db: Session) -> None:
    employee = _make_employee(db, email="lonely@example.com")

    result = build_me_response(db, employee)

    assert result.manager is None


def test_ac015_get_manager_summary_returns_none_when_manager_row_is_missing(
    db: Session,
) -> None:
    """A dangling manager_id (e.g. the manager was deleted) must not blow up
    the response: it simply reports no manager."""
    employee = _make_employee(
        db, email="dangling@example.com", manager_id="11111111-1111-1111-1111-111111111111"
    )

    result = get_manager_summary(db, employee)

    assert result is None
