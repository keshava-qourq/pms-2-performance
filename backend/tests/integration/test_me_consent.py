"""Integration tests for POST /me/consent (AC-040).

One test per reviewed test case: TC-063, TC-064, TC-065.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
purpose or status, since only the consent recording and retrieval matter
to the case -- the same approach test_me.py and test_goals.py take for the
same reason.

GET /me's exact shape for a recorded consent status is not covered by a
readable spec here (no readable openapi.json). Each test below tries a
few plausible response shapes for a purpose's consent status
(``_find_consent_status``) and falls back to a text-level check of the
raw response when none of those shapes match, the way test_us002_rbac.py
and test_goals.py check response.text when an exact schema is not given.
This is flagged as a risk in the task report.
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


def _find_consent_status(body: dict, purpose: str) -> str | None:
    """Look for a purpose's consent status across a few plausible shapes
    for GET /me's response, since the exact schema is not covered by a
    readable spec here."""
    consents = body.get("consents")
    if isinstance(consents, dict):
        if purpose in consents:
            return consents[purpose]
    if isinstance(consents, list):
        for entry in consents:
            if isinstance(entry, dict) and entry.get("purpose") == purpose:
                return entry.get("status")
    consent = body.get("consent")
    if isinstance(consent, dict):
        if consent.get("purpose") == purpose:
            return consent.get("status")
        if purpose in consent:
            return consent[purpose]
    return None


def test_tc063_recording_consent_makes_it_retrievable(client: TestClient, db: Session) -> None:
    password = secrets.token_urlsafe(16)
    employee = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=password,
    )
    token = _login(client, employee.email, password)

    recorded = client.post(
        "/me/consent",
        headers=_auth(token),
        json={"purpose": "performance_analytics", "status": "given"},
    )

    assert recorded.status_code in (200, 201), recorded.text

    me = client.get("/me", headers=_auth(token))

    assert me.status_code == 200, me.text
    body = me.json()
    status = _find_consent_status(body, "performance_analytics")
    if status is not None:
        assert status == "given"
    else:
        assert "performance_analytics" in me.text
        assert "given" in me.text


def test_tc064_updating_consent_status_reflects_the_latest_value(
    client: TestClient, db: Session
) -> None:
    password = secrets.token_urlsafe(16)
    employee = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=password,
    )
    token = _login(client, employee.email, password)

    given = client.post(
        "/me/consent",
        headers=_auth(token),
        json={"purpose": "performance_analytics", "status": "given"},
    )
    assert given.status_code in (200, 201), given.text

    withdrawn = client.post(
        "/me/consent",
        headers=_auth(token),
        json={"purpose": "performance_analytics", "status": "withdrawn"},
    )

    assert withdrawn.status_code in (200, 201), withdrawn.text

    me = client.get("/me", headers=_auth(token))

    assert me.status_code == 200, me.text
    body = me.json()
    status = _find_consent_status(body, "performance_analytics")
    if status is not None:
        assert status == "withdrawn"
    else:
        assert "withdrawn" in me.text


def test_tc065_invalid_consent_status_is_rejected(client: TestClient, db: Session) -> None:
    password = secrets.token_urlsafe(16)
    employee = _make_employee(
        db,
        name="Alice Example",
        email="alice@example.com",
        role="employee",
        password=password,
    )
    token = _login(client, employee.email, password)

    response = client.post(
        "/me/consent",
        headers=_auth(token),
        json={"purpose": "performance_analytics", "status": "maybe"},
    )

    assert response.status_code == 422, response.text

    me = client.get("/me", headers=_auth(token))

    assert me.status_code == 200, me.text
    body = me.json()
    status = _find_consent_status(body, "performance_analytics")
    assert status != "maybe"
    if status is None:
        assert "maybe" not in me.text
