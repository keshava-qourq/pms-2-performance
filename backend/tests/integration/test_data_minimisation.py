"""Integration tests for data minimisation on employee creation and CSV
import (AC-039 / NFR-003).

One test per reviewed test case: TC-059, TC-060.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the stored fields matter to the case -- the same
approach test_admin_employees.py and test_us002_rbac.py take for the same
reason.
"""

from __future__ import annotations

import csv
import io
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


def _hr_token(client: TestClient, db: Session) -> str:
    password = secrets.token_urlsafe(16)
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="harper.admin@example.com",
        role="hr_admin",
        password=password,
    )
    return _login(client, hr_admin.email, password)


# ---------------------------------------------------------------------------
# AC-039
# ---------------------------------------------------------------------------


def test_tc059_creating_an_employee_stores_only_minimised_fields(
    client: TestClient, db: Session
) -> None:
    token = _hr_token(client, db)

    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Alice Dupont",
            "email": "alice.dupont@example.com",
            "role": "Employee",
            "home_address": "12 Rue de Paris",
            "national_id": "FR123456789",
            "date_of_birth": "1990-05-02",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["name"] == "Alice Dupont"
    assert body["email"] == "alice.dupont@example.com"
    assert body["role"] == "Employee"
    assert "home_address" not in body
    assert "national_id" not in body
    assert "date_of_birth" not in body
    assert "12 Rue de Paris" not in response.text
    assert "FR123456789" not in response.text
    assert "1990-05-02" not in response.text

    listing = client.get("/admin/employees", headers=_auth(token))
    assert listing.status_code == 200, listing.text
    match = next(
        item for item in listing.json()["items"] if item["email"] == "alice.dupont@example.com"
    )
    assert match["name"] == "Alice Dupont"
    assert match["role"] == "Employee"
    assert "home_address" not in match
    assert "national_id" not in match
    assert "date_of_birth" not in match
    assert "12 Rue de Paris" not in listing.text
    assert "FR123456789" not in listing.text
    assert "1990-05-02" not in listing.text


def test_tc060_csv_import_stores_only_minimised_fields(client: TestClient, db: Session) -> None:
    token = _hr_token(client, db)

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["name", "email", "role", "home_address", "national_id"])
    writer.writerow(
        ["Bob Martin", "bob.martin@example.com", "Employee", "5 High Street", "UK998877"]
    )
    csv_bytes = buffer.getvalue().encode("utf-8")

    upload = client.post(
        "/admin/imports",
        headers=_auth(token),
        files={"file": ("employees_minimisation.csv", csv_bytes, "text/csv")},
    )

    assert upload.status_code in (200, 201, 202), upload.text
    upload_body = upload.json()
    job_id = upload_body.get("job_id") or upload_body.get("id")
    assert job_id, upload.text

    status_response = client.get(f"/admin/imports/{job_id}", headers=_auth(token))

    assert status_response.status_code == 200, status_response.text
    summary = status_response.json()
    assert summary, status_response.text
    assert "5 High Street" not in status_response.text
    assert "UK998877" not in status_response.text

    listing = client.get("/admin/employees?search=Bob", headers=_auth(token))
    assert listing.status_code == 200, listing.text
    match = next(
        item for item in listing.json()["items"] if item["email"] == "bob.martin@example.com"
    )
    assert match["name"] == "Bob Martin"
    assert match["role"] == "Employee"
    assert "home_address" not in match
    assert "national_id" not in match
    assert "5 High Street" not in listing.text
    assert "UK998877" not in listing.text
