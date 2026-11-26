"""Unit tests for the POST /auth/login logic (AC-001, AC-002, AC-003, NFR-001).

These exercise `app.services.authenticate_employee` and the route itself
directly against the database session, rather than the full integration
surface (owned by backend/tests/integration/test_auth_login.py).
"""

import jwt
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import JWT_SECRET_KEY, create_access_token, hash_password
from app.services import authenticate_employee


def _make_employee(db: Session, *, email: str, password: str, role: str = "employee") -> Employee:
    employee = Employee(
        name="Test Person",
        email=email,
        role=role,
        status="active",
        password_hash=hash_password(password),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def test_ac001_authenticate_employee_returns_employee_for_correct_credentials(
    db: Session,
) -> None:
    employee = _make_employee(db, email="good@example.com", password="correct-horse-battery")

    result = authenticate_employee(db, "good@example.com", "correct-horse-battery")

    assert result is not None
    assert result.id == employee.id


def test_ac002_authenticate_employee_returns_none_for_unknown_email(db: Session) -> None:
    result = authenticate_employee(db, "nobody@example.com", "whatever")

    assert result is None


def test_ac002_authenticate_employee_returns_none_for_wrong_password(db: Session) -> None:
    _make_employee(db, email="good@example.com", password="correct-horse-battery")

    result = authenticate_employee(db, "good@example.com", "not-the-password")

    assert result is None


def test_ac001_successful_login_token_decodes_to_the_employees_role(db: Session) -> None:
    employee = _make_employee(
        db, email="manager@example.com", password="correct-horse-battery", role="manager"
    )

    result = authenticate_employee(db, "manager@example.com", "correct-horse-battery")
    assert result is not None

    token = create_access_token(result)
    payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])

    assert payload["sub"] == employee.id
    assert payload["role"] == "manager"


def test_ac003_no_sso_fields_are_part_of_the_auth_flow(db: Session) -> None:
    """AC-003: authentication rests solely on email/password; there is no
    secondary SSO token, assertion or provider id anywhere in this path."""
    employee = _make_employee(db, email="plain@example.com", password="correct-horse-battery")

    result = authenticate_employee(db, "plain@example.com", "correct-horse-battery")

    assert result is not None
    assert not hasattr(employee, "sso_provider")
    assert not hasattr(employee, "saml_subject")
