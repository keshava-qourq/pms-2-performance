"""Integration tests for GET /me (AC-015).

One test per reviewed test case: TC-001, TC-002, TC-003.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the login outcome and the returned profile matter to
the case -- the same approach test_us002_rbac.py takes for the same reason.
"""

from __future__ import annotations

import secrets
from datetime import UTC, datetime, timedelta

import jwt
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import JWT_ALGORITHM, JWT_SECRET_KEY, hash_password


def _make_employee(
    db: Session,
    *,
    name: str,
    email: str,
    role: str,
    password: str,
    manager: Employee | None = None,
) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role=role,
        status="active",
        manager_id=manager.id if manager else None,
        password_hash=hash_password(password),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_tc001_employee_fetches_own_profile_and_manager(client: TestClient, db: Session) -> None:
    manager_password = secrets.token_urlsafe(16)
    manager = _make_employee(
        db,
        name="Bob Smith",
        email="bob.smith@example.com",
        role="manager",
        password=manager_password,
    )
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=alice_password,
        manager=manager,
    )

    token = _login(client, alice.email, alice_password)
    response = client.get("/me", headers=_auth(token))

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "alice@example.com"
    assert body["name"] == "Alice Example"
    assert body["role"] == "employee"
    assert body["manager"] is not None
    assert body["manager"]["name"] == "Bob Smith"
    assert body["manager"]["email"] == "bob.smith@example.com"


def test_tc002_request_with_no_authorization_header_is_rejected(
    client: TestClient,
) -> None:
    response = client.get("/me")

    assert response.status_code == 401
    body = response.json()
    assert "email" not in body
    assert "manager" not in body


def test_tc003_request_with_expired_or_invalid_token_is_rejected(
    client: TestClient, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=alice_password,
    )

    expired_token = jwt.encode(
        {
            "sub": "alice@example.com",
            "role": "employee",
            "iat": datetime.now(UTC) - timedelta(minutes=10),
            "exp": datetime.now(UTC) - timedelta(minutes=1),
        },
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )

    expired_response = client.get("/me", headers=_auth(expired_token))

    assert expired_response.status_code == 401
    expired_body = expired_response.json()
    assert "email" not in expired_body
    assert "manager" not in expired_body

    tampered_token = expired_token[:-1] + ("A" if expired_token[-1] != "A" else "B")
    invalid_response = client.get("/me", headers=_auth(tampered_token))

    assert invalid_response.status_code == 401
    invalid_body = invalid_response.json()
    assert "email" not in invalid_body
    assert "manager" not in invalid_body
