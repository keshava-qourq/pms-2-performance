"""The backing services this application is configured to reach.

Each entry maps a service to the environment variable that addresses it. The value
comes from docker-compose.yml through .env.example, so the health check reports
what the running deployment can actually reach.
"""

import os

from sqlalchemy.orm import Session

from app.models import Employee
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
