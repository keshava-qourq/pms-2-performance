"""Integration tests for POST /goals (AC-016, AC-017).

One test per reviewed test case: TC-046, TC-048, TC-049.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the login outcome and the goal data matter to the
case -- the same approach test_us002_rbac.py and test_me.py take for the
same reason.

The reviewed cases describe each key result as a plain string (for example
"Achieve NPS score of 75"). The implemented POST /goals schema takes
key_results as a list of objects with a title and a target_value (see
test_us002_rbac.py's _create_goal, which notes the exact shape of /goals is
not covered by a readable spec here), so each case's key result string is
sent as that object's title, with a target_value drawn from the figure the
case's own text names.
"""

from __future__ import annotations

import secrets

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password


def _make_employee(
    db: Session,
    *,
    name: str,
    email: str,
    role: str,
    password: str,
) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role=role,
        status="active",
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


# ---------------------------------------------------------------------------
# AC-016
# ---------------------------------------------------------------------------


def test_tc046_create_objective_with_key_result_and_see_it_listed(
    client: TestClient, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=alice_password,
    )
    token = _login(client, alice.email, alice_password)

    response = client.post(
        "/goals",
        headers=_auth(token),
        json={
            "title": "Increase customer satisfaction",
            "description": "Improve NPS score by Q4",
            "key_results": [{"title": "Achieve NPS score of 75", "target_value": 75}],
        },
    )

    assert response.status_code in (200, 201), response.text
    body = response.json()
    assert body.get("id")
    assert body["title"] == "Increase customer satisfaction"

    dashboard = client.get("/dashboard", headers=_auth(token))

    assert dashboard.status_code == 200, dashboard.text
    assert "Increase customer satisfaction" in dashboard.text


# ---------------------------------------------------------------------------
# AC-017
# ---------------------------------------------------------------------------


def test_tc048_reject_goal_creation_when_title_is_missing(client: TestClient, db: Session) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=alice_password,
    )
    token = _login(client, alice.email, alice_password)

    response = client.post(
        "/goals",
        headers=_auth(token),
        json={
            "title": "",
            "description": "Improve NPS score by Q4",
            "key_results": [{"title": "Achieve NPS score of 75", "target_value": 75}],
        },
    )

    assert response.status_code == 422, response.text
    assert "title" in str(response.json()).lower()

    dashboard = client.get("/dashboard", headers=_auth(token))

    assert dashboard.status_code == 200, dashboard.text
    assert "Improve NPS score by Q4" not in dashboard.text


def test_tc049_reject_goal_creation_when_no_key_result_is_provided(
    client: TestClient, db: Session
) -> None:
    alice_password = secrets.token_urlsafe(16)
    alice = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=alice_password,
    )
    token = _login(client, alice.email, alice_password)

    response = client.post(
        "/goals",
        headers=_auth(token),
        json={
            "title": "Increase customer satisfaction",
            "description": "Improve NPS score by Q4",
            "key_results": [],
        },
    )

    assert response.status_code == 422, response.text
    assert (
        "key_result" in str(response.json()).lower() or "key result" in str(response.json()).lower()
    )

    dashboard = client.get("/dashboard", headers=_auth(token))

    assert dashboard.status_code == 200, dashboard.text
    assert "Increase customer satisfaction" not in dashboard.text
