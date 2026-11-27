"""Unit tests for the manager-assignment logic behind
PATCH /admin/employees/{id} (AC-010, AC-011).

These exercise `app.routers.employees.update_employee` and the
`app.services.direct_reports` / `app.services.creates_manager_cycle` helpers
it relies on, directly against the database session, rather than the full
integration surface (owned by backend/tests/integration/test_admin_employees.py).
"""

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Employee
from app.routers.employees import update_employee
from app.schemas import EmployeeUpdate
from app.security import hash_password
from app.services import creates_manager_cycle, direct_reports


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


def _hr_admin(db: Session) -> Employee:
    return _make_employee(db, email="hr.admin@example.com", role="hr_admin", name="HR Admin")


# ---------------------------------------------------------------------------
# AC-010: assigning a manager makes the employee a direct report
# ---------------------------------------------------------------------------


def test_ac010_assigning_a_manager_adds_employee_as_direct_report(db: Session) -> None:
    admin = _hr_admin(db)
    manager = _make_employee(db, email="boss@example.com", role="manager", name="Boss")
    employee = _make_employee(db, email="report@example.com", name="Report")

    assert direct_reports(db, manager.id) == []

    update_employee(
        id=employee.id,
        body=EmployeeUpdate(manager_id=manager.id),
        current=admin,
        db=db,
    )

    reports = direct_reports(db, manager.id)
    assert [r.id for r in reports] == [employee.id]


def test_ac010_direct_reports_lists_only_that_managers_reports(db: Session) -> None:
    manager_a = _make_employee(db, email="manager.a@example.com", role="manager", name="Manager A")
    manager_b = _make_employee(db, email="manager.b@example.com", role="manager", name="Manager B")
    reports_a = _make_employee(
        db, email="under.a@example.com", name="Under A", manager_id=manager_a.id
    )
    _make_employee(db, email="under.b@example.com", name="Under B", manager_id=manager_b.id)
    _make_employee(db, email="unassigned@example.com", name="Unassigned")

    reports = direct_reports(db, manager_a.id)

    assert [r.id for r in reports] == [reports_a.id]


# ---------------------------------------------------------------------------
# AC-011: changing a manager updates both the previous and new manager
# ---------------------------------------------------------------------------


def test_ac011_changing_manager_updates_both_previous_and_new_manager(db: Session) -> None:
    admin = _hr_admin(db)
    original_manager = _make_employee(
        db, email="original@example.com", role="manager", name="Original Manager"
    )
    new_manager = _make_employee(db, email="newmgr@example.com", role="manager", name="New Manager")
    employee = _make_employee(
        db, email="moved@example.com", name="Moved Employee", manager_id=original_manager.id
    )

    assert [r.id for r in direct_reports(db, original_manager.id)] == [employee.id]
    assert direct_reports(db, new_manager.id) == []

    update_employee(
        id=employee.id,
        body=EmployeeUpdate(manager_id=new_manager.id),
        current=admin,
        db=db,
    )

    assert direct_reports(db, original_manager.id) == []
    assert [r.id for r in direct_reports(db, new_manager.id)] == [employee.id]


def test_ac011_rejects_manager_assignment_to_self(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db, email="solo@example.com", name="Solo")

    with pytest.raises(HTTPException) as excinfo:
        update_employee(
            id=employee.id,
            body=EmployeeUpdate(manager_id=employee.id),
            current=admin,
            db=db,
        )

    assert excinfo.value.status_code == 422
    assert direct_reports(db, employee.id) == []


def test_ac011_rejects_manager_assignment_to_a_nonexistent_employee(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db, email="dangling@example.com", name="Dangling")

    with pytest.raises(HTTPException) as excinfo:
        update_employee(
            id=employee.id,
            body=EmployeeUpdate(manager_id="does-not-exist"),
            current=admin,
            db=db,
        )

    assert excinfo.value.status_code == 422


def test_ac011_rejects_a_manager_change_that_would_create_a_cycle(db: Session) -> None:
    """A -> B -> C (A reports to B, B reports to C). Making C report to A
    would close the loop and must be rejected, leaving the hierarchy intact."""
    admin = _hr_admin(db)
    employee_c = _make_employee(db, email="c@example.com", name="C")
    employee_b = _make_employee(db, email="b@example.com", name="B", manager_id=employee_c.id)
    employee_a = _make_employee(db, email="a@example.com", name="A", manager_id=employee_b.id)

    with pytest.raises(HTTPException) as excinfo:
        update_employee(
            id=employee_c.id,
            body=EmployeeUpdate(manager_id=employee_a.id),
            current=admin,
            db=db,
        )

    assert excinfo.value.status_code == 422
    # The hierarchy is unchanged: C still has no manager.
    assert direct_reports(db, employee_a.id) == []


def test_ac011_creates_manager_cycle_detects_an_indirect_cycle(db: Session) -> None:
    employee_c = _make_employee(db, email="cc@example.com", name="CC")
    employee_b = _make_employee(db, email="bb@example.com", name="BB", manager_id=employee_c.id)
    employee_a = _make_employee(db, email="aa@example.com", name="AA", manager_id=employee_b.id)
    unrelated = _make_employee(db, email="dd@example.com", name="DD")

    assert creates_manager_cycle(db, employee_c.id, employee_a.id) is True
    assert creates_manager_cycle(db, employee_c.id, unrelated.id) is False


def test_ac011_changing_manager_does_not_affect_unrelated_employees(db: Session) -> None:
    admin = _hr_admin(db)
    original_manager = _make_employee(db, email="orig2@example.com", role="manager", name="Orig2")
    new_manager = _make_employee(db, email="new2@example.com", role="manager", name="New2")
    moved = _make_employee(
        db, email="moved2@example.com", name="Moved2", manager_id=original_manager.id
    )
    bystander = _make_employee(
        db, email="bystander@example.com", name="Bystander", manager_id=original_manager.id
    )

    update_employee(
        id=moved.id,
        body=EmployeeUpdate(manager_id=new_manager.id),
        current=admin,
        db=db,
    )

    assert [r.id for r in direct_reports(db, original_manager.id)] == [bystander.id]
    assert [r.id for r in direct_reports(db, new_manager.id)] == [moved.id]
