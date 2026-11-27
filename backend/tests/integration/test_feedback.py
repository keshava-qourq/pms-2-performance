"""Integration tests for POST /feedback (AC-026, AC-027).

One test per reviewed test case: TC-040, TC-042, TC-044.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the login outcome and the feedback data matter to the
case -- the same approach test_us002_rbac.py, test_goals.py and test_me.py
take for the same reason.

The reviewed cases refer to the colleague by a placeholder id (emp-205);
the implemented POST /feedback schema identifies the colleague by
"recipient_id" against a real Employee row (see test_us002_rbac.py's
test_tc031_managers_feedback_view_is_limited_to_their_own_feedback), so
each case's colleague is a real employee created in the test and referred
to by that employee's own id.
"""

from __future__ import annotations

import secrets

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import Employee
from app.security import hash_password


def _password() -> str:
    return secrets.token_urlsafe(16)


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
# AC-026
# ---------------------------------------------------------------------------


def test_tc040_submit_feedback_for_a_colleague_saves_and_links_it(
    client: TestClient, db: Session
) -> None:
    author_password = _password()
    author = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=author_password,
    )
    colleague = _make_employee(
        db,
        name="Colleague Example",
        email="colleague@example.com",
        role="employee",
        password=_password(),
    )
    token = _login(client, author.email, author_password)
    content = "Great job on the Q4 project presentation!"

    created = client.post(
        "/feedback",
        headers=_auth(token),
        json={"recipient_id": colleague.id, "content": content},
    )

    assert created.status_code == 201, created.text
    assert content in created.text
    assert str(colleague.id) in created.text

    listing = client.get("/feedback", headers=_auth(token))

    assert listing.status_code == 200, listing.text
    assert content in listing.text
    assert str(colleague.id) in listing.text


def test_tc042_submitting_feedback_without_selecting_a_colleague_is_rejected(
    client: TestClient, db: Session
) -> None:
    author_password = _password()
    author = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=author_password,
    )
    token = _login(client, author.email, author_password)

    response = client.post(
        "/feedback",
        headers=_auth(token),
        json={"content": "Great teamwork this sprint"},
    )

    assert response.status_code == 400, response.text


# ---------------------------------------------------------------------------
# AC-027
# ---------------------------------------------------------------------------


def test_tc044_submitting_feedback_with_empty_content_is_rejected(
    client: TestClient, db: Session
) -> None:
    author_password = _password()
    author = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=author_password,
    )
    colleague = _make_employee(
        db,
        name="Colleague Example",
        email="colleague@example.com",
        role="employee",
        password=_password(),
    )
    token = _login(client, author.email, author_password)

    response = client.post(
        "/feedback",
        headers=_auth(token),
        json={"recipient_id": colleague.id, "content": ""},
    )

    assert response.status_code == 400, response.text
