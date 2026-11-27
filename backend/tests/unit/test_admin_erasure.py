"""Unit tests for the POST /admin/employees/{id}/erase logic (AC-037, AC-038).

These exercise `app.services.erase_employee` directly against the database
session, rather than the full integration surface (owned by
backend/tests/integration/, not this file).
"""

import secrets

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import AuditLog, Employee
from app.security import hash_password, verify_password
from app.services import erase_employee


def _make_employee(
    db: Session,
    *,
    email: str = "target@example.com",
    role: str = "employee",
    password: str = "correct-horse-battery",
) -> Employee:
    employee = Employee(
        name="Jamie Original",
        email=email,
        role=role,
        status="active",
        password_hash=hash_password(password),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def _hr_admin(db: Session) -> Employee:
    return _make_employee(db, email="hr.admin@example.com", role="hr_admin")


# ---------------------------------------------------------------------------
# AC-037: actioning the erasure removes/anonymises the employee's personal
# data and records that it was done.
# ---------------------------------------------------------------------------


def test_ac037_erasure_anonymises_name_and_email(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db)
    original_email = employee.email

    erased = erase_employee(db, admin, employee.id)

    assert erased.name != "Jamie Original"
    assert erased.email != original_email
    assert "jamie" not in erased.email.lower()


def test_ac037_erasure_invalidates_the_password(db: Session) -> None:
    admin = _hr_admin(db)
    password = secrets.token_urlsafe()
    employee = _make_employee(db, password=password)

    erased = erase_employee(db, admin, employee.id)

    assert not verify_password(password, erased.password_hash)


def test_ac037_erasure_marks_status_and_timestamp(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db)

    erased = erase_employee(db, admin, employee.id)

    assert erased.status == "erased"
    assert erased.erased_at is not None


def test_ac037_erasure_writes_an_audit_log_entry(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db)

    erase_employee(db, admin, employee.id)

    entries = db.query(AuditLog).filter(AuditLog.target_id == employee.id).all()
    assert len(entries) == 1
    entry = entries[0]
    assert entry.actor_id == admin.id
    assert entry.action == "employee_erasure"
    assert entry.target_type == "employee"


def test_ac037_erasure_persists_across_a_fresh_lookup(db: Session) -> None:
    """The anonymisation is committed, not just held on the in-memory
    object: a fresh read of the row shows the anonymised data."""
    admin = _hr_admin(db)
    employee = _make_employee(db)

    erase_employee(db, admin, employee.id)

    reloaded = db.get(Employee, employee.id)
    assert reloaded is not None
    assert reloaded.name != "Jamie Original"
    assert reloaded.status == "erased"


# ---------------------------------------------------------------------------
# AC-038: once erased, looking the employee up no longer surfaces their
# personal data.
# ---------------------------------------------------------------------------


def test_ac038_looking_up_an_erased_employee_no_longer_shows_original_data(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db, email="findme@example.com")
    employee_id = employee.id

    erase_employee(db, admin, employee_id)

    looked_up = db.get(Employee, employee_id)
    assert looked_up is not None
    assert looked_up.email != "findme@example.com"
    assert looked_up.name != "Jamie Original"


def test_ac038_erased_employee_can_no_longer_authenticate(db: Session) -> None:
    admin = _hr_admin(db)
    password = secrets.token_urlsafe()
    employee = _make_employee(db, password=password)

    erase_employee(db, admin, employee.id)

    reloaded = db.get(Employee, employee.id)
    assert reloaded is not None
    assert not verify_password(password, reloaded.password_hash)


# ---------------------------------------------------------------------------
# Error handling
# ---------------------------------------------------------------------------


def test_erasing_an_unknown_employee_returns_404(db: Session) -> None:
    admin = _hr_admin(db)

    with pytest.raises(HTTPException) as excinfo:
        erase_employee(db, admin, "does-not-exist")

    assert excinfo.value.status_code == 404


def test_erasing_an_already_erased_employee_is_rejected(db: Session) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db)
    erase_employee(db, admin, employee.id)

    with pytest.raises(HTTPException) as excinfo:
        erase_employee(db, admin, employee.id)

    assert excinfo.value.status_code == 409


def test_erasing_an_already_erased_employee_does_not_change_the_anonymised_data_again(
    db: Session,
) -> None:
    admin = _hr_admin(db)
    employee = _make_employee(db)
    first = erase_employee(db, admin, employee.id)
    first_email = first.email
    first_erased_at = first.erased_at

    with pytest.raises(HTTPException):
        erase_employee(db, admin, employee.id)

    reloaded = db.get(Employee, employee.id)
    assert reloaded is not None
    assert reloaded.email == first_email
    assert reloaded.erased_at == first_erased_at

    # Only the original audit log entry exists: the rejected second attempt
    # never wrote a second one.
    entries = db.query(AuditLog).filter(AuditLog.target_id == employee.id).all()
    assert len(entries) == 1
