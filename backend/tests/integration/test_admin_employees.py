"""Integration tests for POST /admin/employees and PATCH /admin/employees/{id}
(AC-007, AC-008, AC-009).

One test per reviewed test case: TC-006, TC-007, TC-010, TC-011, TC-014.
"""

from __future__ import annotations

import secrets

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _hr_token(client: TestClient, seeded: dict) -> str:
    return _login(client, seeded["hr_admin_email"], seeded["password"])


# ---------------------------------------------------------------------------
# AC-007
# ---------------------------------------------------------------------------


def test_tc006_create_employee_profile_with_required_fields(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)

    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "role": "Software Engineer",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["name"] == "Jane Doe"
    assert body["email"] == "jane.doe@example.com"
    assert body["role"] == "Software Engineer"
    assert body.get("id")


def test_tc007_create_employee_fails_when_a_required_field_is_missing(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)

    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "John Smith", "role": "Analyst"},
    )

    assert response.status_code == 400
    body = response.json()
    assert "email" in str(body).lower()

    listing = client.get("/admin/employees", headers=_auth(token))
    names = [item["name"] for item in listing.json()["items"]]
    assert "John Smith" not in names


# ---------------------------------------------------------------------------
# AC-008
# ---------------------------------------------------------------------------


def test_tc010_edited_field_is_persisted_and_reflected_on_own_profile(
    client: TestClient, seeded: dict, db: Session
) -> None:
    hr_token = _hr_token(client, seeded)

    # Precondition: an employee profile exists for jane.doe@example.com. A
    # password is set directly on the record (never a literal, generated at
    # run time) so that the second step can authenticate as Jane herself,
    # the way test_us002_rbac.py's _make_employee does for the same reason.
    jane_password = secrets.token_urlsafe(16)
    jane = Employee(
        name="Jane Doe",
        email="jane.doe@example.com",
        role="employee",
        status="active",
        password_hash=hash_password(jane_password),
    )
    db.add(jane)
    db.commit()
    db.refresh(jane)

    patched = client.patch(
        f"/admin/employees/{jane.id}",
        headers=_auth(hr_token),
        json={"role": "Senior Software Engineer"},
    )

    assert patched.status_code == 200, patched.text
    assert patched.json()["role"] == "Senior Software Engineer"

    jane_token = _login(client, jane.email, jane_password)
    me = client.get("/me", headers=_auth(jane_token))

    assert me.status_code == 200
    assert me.json()["role"] == "Senior Software Engineer"


def test_tc011_editing_a_nonexistent_profile_fails(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)

    response = client.patch(
        "/admin/employees/999999",
        headers=_auth(token),
        json={"role": "Manager"},
    )

    assert response.status_code == 404


# ---------------------------------------------------------------------------
# AC-009 / NFR-003
# ---------------------------------------------------------------------------


def test_tc014_only_performance_management_relevant_fields_are_stored_on_creation(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)

    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Alex Kim",
            "email": "alex.kim@example.com",
            "role": "Data Analyst",
            "home_address": "12 Elm Street",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["name"] == "Alex Kim"
    assert body["email"] == "alex.kim@example.com"
    assert body["role"] == "Data Analyst"
    assert "id" in body
    assert "home_address" not in body
