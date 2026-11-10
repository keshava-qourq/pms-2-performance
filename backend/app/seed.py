"""Seed fixture: one employee, one manager and one hr_admin with hashed
passwords, for local development and tests.

Safe to call repeatedly: it skips any seed email that already exists.
"""

from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password

SEED_PASSWORD = "Password123!"

SEED_EMPLOYEES = [
    {"email": "hr.admin@example.com", "name": "Harper Admin", "role": "hr_admin"},
    {"email": "manager@example.com", "name": "Morgan Manager", "role": "manager"},
    {"email": "employee@example.com", "name": "Emery Employee", "role": "employee"},
]


def seed_demo_employees(db: Session) -> list[Employee]:
    """Create the demo accounts if they do not already exist, and return them."""
    created: list[Employee] = []
    by_email = {e.email: e for e in db.query(Employee).all()}

    manager = by_email.get("manager@example.com")
    if manager is None:
        manager = Employee(
            name="Morgan Manager",
            email="manager@example.com",
            role="manager",
            status="active",
            password_hash=hash_password(SEED_PASSWORD),
        )
        db.add(manager)
        db.flush()
        created.append(manager)

    hr_admin = by_email.get("hr.admin@example.com")
    if hr_admin is None:
        hr_admin = Employee(
            name="Harper Admin",
            email="hr.admin@example.com",
            role="hr_admin",
            status="active",
            password_hash=hash_password(SEED_PASSWORD),
        )
        db.add(hr_admin)
        db.flush()
        created.append(hr_admin)

    employee = by_email.get("employee@example.com")
    if employee is None:
        employee = Employee(
            name="Emery Employee",
            email="employee@example.com",
            role="employee",
            status="active",
            manager_id=manager.id,
            password_hash=hash_password(SEED_PASSWORD),
        )
        db.add(employee)
        db.flush()
        created.append(employee)

    db.commit()
    return created
