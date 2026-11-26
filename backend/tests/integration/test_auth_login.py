"""Integration tests for POST /auth/login (AC-001, AC-002, AC-003).

One test per reviewed test case: TC-016, TC-018, TC-019, TC-020, TC-023.
"""

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password

ALICE_EMAIL = "alice@example.com"
ALICE_PASSWORD = "Passw0rd!2026"
MARK_EMAIL = "mark.manager@example.com"
MARK_PASSWORD = "MgrPass!2026"


def _make_employee(db: Session, *, name: str, email: str, password: str, role: str) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role=role,
        status="active",
        password_hash=hash_password(password),
    )
    db.add(employee)
    db.commit()
    return employee


def test_tc016_successful_login_returns_token_and_employee_landing(
    client: TestClient, db: Session
) -> None:
    _make_employee(
        db, name="Alice Employee", email=ALICE_EMAIL, password=ALICE_PASSWORD, role="employee"
    )

    response = client.post("/auth/login", json={"email": ALICE_EMAIL, "password": ALICE_PASSWORD})

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["access_token"], str) and body["access_token"]
    assert body["token_type"] == "bearer"
    assert body["user"]["email"] == ALICE_EMAIL
    # The Employee role landing is role-appropriate: the client routes on this role.
    assert body["user"]["role"] == "employee"


def test_tc018_successful_login_returns_token_and_manager_landing(
    client: TestClient, db: Session
) -> None:
    _make_employee(
        db, name="Mark Manager", email=MARK_EMAIL, password=MARK_PASSWORD, role="manager"
    )

    response = client.post("/auth/login", json={"email": MARK_EMAIL, "password": MARK_PASSWORD})

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["access_token"], str) and body["access_token"]
    assert body["token_type"] == "bearer"
    assert body["user"]["email"] == MARK_EMAIL
    # The Manager landing must be distinct from the Employee landing.
    assert body["user"]["role"] == "manager"
    assert body["user"]["role"] != "employee"


def test_tc019_wrong_password_is_denied_with_generic_error(client: TestClient, db: Session) -> None:
    _make_employee(
        db, name="Alice Employee", email=ALICE_EMAIL, password=ALICE_PASSWORD, role="employee"
    )

    response = client.post("/auth/login", json={"email": ALICE_EMAIL, "password": "WrongPass123"})

    assert response.status_code == 401
    # A single generic error: it does not say the password (rather than the
    # email) was the one that was wrong.
    assert response.json() == {"detail": "Invalid email or password"}


def test_tc020_unregistered_email_is_denied_with_the_same_generic_error(
    client: TestClient,
) -> None:
    response = client.post(
        "/auth/login",
        json={"email": "unknown.user@example.com", "password": ALICE_PASSWORD},
    )

    assert response.status_code == 401
    # Identical to the wrong-password case in TC-019: the caller cannot tell
    # the two failure modes apart.
    assert response.json() == {"detail": "Invalid email or password"}


def test_tc023_sso_token_has_no_effect_and_cannot_replace_the_password(
    client: TestClient, db: Session
) -> None:
    _make_employee(
        db, name="Alice Employee", email=ALICE_EMAIL, password=ALICE_PASSWORD, role="employee"
    )

    # Step 1: a valid password together with an ssoToken still authenticates
    # normally via the password; the token has no special effect.
    with_sso = client.post(
        "/auth/login",
        json={
            "email": ALICE_EMAIL,
            "password": ALICE_PASSWORD,
            "ssoToken": "dummy-saml-token-123",
        },
    )
    assert with_sso.status_code == 200
    body = with_sso.json()
    assert isinstance(body["access_token"], str) and body["access_token"]
    assert body["token_type"] == "bearer"
    assert body["user"]["email"] == ALICE_EMAIL
    assert body["user"]["role"] == "employee"

    # Step 2: an ssoToken without a password is rejected for lacking the
    # required password, not authenticated through any SSO path.
    without_password = client.post(
        "/auth/login",
        json={"email": ALICE_EMAIL, "ssoToken": "dummy-saml-token-123"},
    )
    assert without_password.status_code != 200
    assert "access_token" not in without_password.json()
