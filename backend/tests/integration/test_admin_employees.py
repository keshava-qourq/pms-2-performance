"""Integration tests for POST /admin/employees and PATCH /admin/employees/{id}
(AC-007, AC-008, AC-009, AC-010, AC-011).

One test per reviewed test case: TC-006, TC-007, TC-010, TC-011, TC-014,
TC-067, TC-068, TC-070, TC-071, TC-072.
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


def _make_employee(
    db: Session,
    *,
    name: str,
    email: str,
    role: str,
    password: str,
    manager: Employee | None = None,
) -> Employee:
    """Create an employee record directly on the schema, the way
    test_me.py and test_us002_rbac.py do, so a test can sign in as this
    person afterwards. Every password here is generated at run time
    (never a literal), since only the login outcome and hierarchy matter."""
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


# ---------------------------------------------------------------------------
# AC-010 / AC-011: reporting hierarchy updates (US-004)
# ---------------------------------------------------------------------------


def test_tc067_assign_manager_grants_manager_access_to_direct_report(
    client: TestClient, seeded: dict, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
    )
    mia_password = secrets.token_urlsafe(16)
    mia = _make_employee(
        db,
        name="Mia Manager",
        email="mia.manager@example.com",
        role="manager",
        password=mia_password,
    )
    hr_token = _hr_token(client, seeded)

    patched = client.patch(
        f"/admin/employees/{alice.id}",
        headers=_auth(hr_token),
        json={"manager_id": mia.id},
    )

    assert patched.status_code == 200, patched.text

    alice_token = _login(client, alice.email, alice_password)
    me = client.get("/me", headers=_auth(alice_token))
    assert me.status_code == 200
    assert me.json()["manager"] is not None
    assert me.json()["manager"]["email"] == mia.email

    mia_token = _login(client, mia.email, mia_password)
    goals = client.get(f"/employees/{alice.id}/goals", headers=_auth(mia_token))
    assert goals.status_code == 200, goals.text


def test_tc068_assign_a_non_existent_manager_fails(
    client: TestClient, seeded: dict, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
    )
    hr_token = _hr_token(client, seeded)

    # The case's test data names a non-existent manager id (nonexistent-888);
    # manager_id is an integer foreign key elsewhere in this suite (see
    # test_tc010 and test_us002_rbac.py's manager_id usage), so a large,
    # unused integer id stands in for the non-existent manager here.
    response = client.patch(
        f"/admin/employees/{alice.id}",
        headers=_auth(hr_token),
        json={"manager_id": 999999999},
    )

    assert response.status_code in (400, 404), response.text

    alice_token = _login(client, alice.email, alice_password)
    me = client.get("/me", headers=_auth(alice_token))
    assert me.status_code == 200
    assert me.json()["manager"] is None


def test_tc070_non_hr_admin_cannot_assign_a_manager_to_an_employee(
    client: TestClient, seeded: dict, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
    )
    mia = _make_employee(
        db,
        name="Mia Manager",
        email="mia.manager@example.com",
        role="manager",
        password=secrets.token_urlsafe(16),
    )
    noah_password = secrets.token_urlsafe(16)
    noah = _make_employee(
        db,
        name="Noah Manager",
        email="noah.manager@example.com",
        role="manager",
        password=noah_password,
    )

    noah_token = _login(client, noah.email, noah_password)
    response = client.patch(
        f"/admin/employees/{alice.id}",
        headers=_auth(noah_token),
        json={"manager_id": mia.id},
    )

    assert response.status_code == 403, response.text

    alice_token = _login(client, alice.email, alice_password)
    me = client.get("/me", headers=_auth(alice_token))
    assert me.status_code == 200
    assert me.json()["manager"] is None


def test_tc071_change_an_employees_manager_updates_both_old_and_new_managers_access(
    client: TestClient, seeded: dict, db: Session
) -> None:
    mia_password = secrets.token_urlsafe(16)
    mia = _make_employee(
        db,
        name="Mia Manager",
        email="mia.manager@example.com",
        role="manager",
        password=mia_password,
    )
    noah_password = secrets.token_urlsafe(16)
    noah = _make_employee(
        db,
        name="Noah Manager",
        email="noah.manager@example.com",
        role="manager",
        password=noah_password,
    )
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
        manager=mia,
    )
    hr_token = _hr_token(client, seeded)

    patched = client.patch(
        f"/admin/employees/{alice.id}",
        headers=_auth(hr_token),
        json={"manager_id": noah.id},
    )

    assert patched.status_code == 200, patched.text

    mia_token = _login(client, mia.email, mia_password)
    old_manager_goals = client.get(f"/employees/{alice.id}/goals", headers=_auth(mia_token))
    assert old_manager_goals.status_code == 403, old_manager_goals.text

    noah_token = _login(client, noah.email, noah_password)
    new_manager_goals = client.get(f"/employees/{alice.id}/goals", headers=_auth(noah_token))
    assert new_manager_goals.status_code == 200, new_manager_goals.text

    alice_token = _login(client, alice.email, alice_password)
    me = client.get("/me", headers=_auth(alice_token))
    assert me.status_code == 200
    assert me.json()["manager"] is not None
    assert me.json()["manager"]["email"] == noah.email


def test_tc072_change_manager_to_a_non_existent_manager_fails_and_keeps_the_current_one(
    client: TestClient, seeded: dict, db: Session
) -> None:
    noah_password = secrets.token_urlsafe(16)
    noah = _make_employee(
        db,
        name="Noah Manager",
        email="noah.manager@example.com",
        role="manager",
        password=noah_password,
    )
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
        manager=noah,
    )
    hr_token = _hr_token(client, seeded)

    # As in test_tc068, the non-existent manager id is stood in for by a
    # large, unused integer id, since manager_id is an integer foreign key.
    response = client.patch(
        f"/admin/employees/{alice.id}",
        headers=_auth(hr_token),
        json={"manager_id": 999999999},
    )

    assert response.status_code in (400, 404), response.text

    alice_token = _login(client, alice.email, alice_password)
    me = client.get("/me", headers=_auth(alice_token))
    assert me.status_code == 200
    assert me.json()["manager"] is not None
    assert me.json()["manager"]["email"] == noah.email
