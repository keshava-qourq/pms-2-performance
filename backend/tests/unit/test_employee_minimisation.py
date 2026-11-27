"""Unit tests for data minimisation on employee record creation (AC-039).

These exercise `app.services.create_employee` and `app.schemas.EmployeeCreate`
directly, rather than the full integration surface (owned by
backend/tests/integration/ and backend/tests/test_employees.py).
"""

import pytest
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.models import Employee
from app.schemas import EmployeeCreate
from app.services import EMPLOYEE_MINIMISED_FIELDS, create_employee


def test_ac039_employee_table_stores_no_fields_beyond_what_performance_management_needs() -> None:
    """The ORM model itself carries no address, date-of-birth, salary or
    other demographic column: only identity, reporting line, status and the
    credential needed to authenticate."""
    column_names = {column.name for column in Employee.__table__.columns}
    assert column_names == {
        "id",
        "name",
        "email",
        "role",
        "manager_id",
        "status",
        "password_hash",
        "created_at",
        "updated_at",
        "erased_at",
    }


def test_ac039_employee_create_schema_rejects_a_field_outside_the_minimised_set() -> None:
    with pytest.raises(ValidationError):
        EmployeeCreate(
            name="Extra Fields",
            email="extra.fields@example.com",
            role="employee",
            date_of_birth="1990-01-01",
        )


def test_ac039_create_employee_persists_only_the_minimised_fields(db: Session) -> None:
    employee = create_employee(
        db,
        {
            "name": "Minimal Person",
            "email": "minimal.person@example.com",
            "role": "employee",
            "manager_id": None,
        },
    )

    assert employee.name == "Minimal Person"
    assert employee.email == "minimal.person@example.com"
    assert employee.role == "employee"
    assert employee.manager_id is None
    # Nothing beyond the known, minimised columns was ever set.
    column_names = {column.name for column in Employee.__table__.columns}
    assert column_names == EMPLOYEE_MINIMISED_FIELDS | {
        "id",
        "status",
        "password_hash",
        "created_at",
        "updated_at",
        "erased_at",
    }


def test_ac039_create_employee_ignores_keys_outside_the_minimised_set(db: Session) -> None:
    """A dict shaped like a CSV import row, carrying extra columns a stray
    header might introduce, still only stores the minimised fields: the
    extra keys are never read."""
    employee = create_employee(
        db,
        {
            "name": "Batch Employee",
            "email": "batch.employee@example.com",
            "role": "employee",
            "date_of_birth": "1990-01-01",
            "salary": 100000,
            "home_address": "1 Example Street",
        },
    )

    assert employee.name == "Batch Employee"
    assert employee.email == "batch.employee@example.com"
    assert not hasattr(employee, "date_of_birth")
    assert not hasattr(employee, "salary")
    assert not hasattr(employee, "home_address")


def test_ac039_created_employee_is_assigned_active_status_and_a_credential(db: Session) -> None:
    employee = create_employee(
        db,
        {"name": "Needs Hash", "email": "needs.hash@example.com", "role": "employee"},
    )

    assert employee.status == "active"
    assert employee.password_hash
    assert employee.password_hash != "needs-hash"
