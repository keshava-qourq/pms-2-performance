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
    """Create the demo accounts if they do not already exist, and return them.

    Driven by SEED_EMPLOYEES itself, rather than one hand-written block per
    account, so the fixture data and the creation logic cannot drift apart.
    The employee entry's manager_id is resolved by email against whatever
    was already created in this same pass -- SEED_EMPLOYEES lists the
    manager before the employee that reports to it.
    """
    by_email: dict[str, Employee] = {e.email: e for e in db.query(Employee).all()}
    created: list[Employee] = []

    for spec in SEED_EMPLOYEES:
        if spec["email"] in by_email:
            continue
        manager = by_email.get("manager@example.com") if spec["role"] == "employee" else None
        employee = Employee(
            name=spec["name"],
            email=spec["email"],
            role=spec["role"],
            status="active",
            manager_id=manager.id if manager else None,
            password_hash=hash_password(SEED_PASSWORD),
        )
        db.add(employee)
        db.flush()
        by_email[spec["email"]] = employee
        created.append(employee)

    db.commit()
    return created
