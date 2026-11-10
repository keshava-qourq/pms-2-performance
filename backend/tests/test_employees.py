"""Integration tests for /admin/employees (AC-007, AC-008, AC-009, NFR-002,
NFR-003, NFR-007)."""

from __future__ import annotations

import time

from fastapi.testclient import TestClient


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _hr_token(client: TestClient, seeded: dict) -> str:
    return _login(client, seeded["hr_admin_email"], seeded["password"])


# ---------------------------------------------------------------------------
# AC-007: create + list
# ---------------------------------------------------------------------------


def test_ac007_post_employee_returns_201_and_is_listed_by_get(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Nina New",
            "email": "nina.new@example.com",
            "role": "employee",
            "manager_id": None,
        },
    )
    assert response.status_code == 201, response.text
    created = response.json()
    assert created["name"] == "Nina New"
    assert created["email"] == "nina.new@example.com"
    assert created["status"] == "active"

    listing = client.get("/admin/employees", headers=_auth(token))
    assert listing.status_code == 200
    emails = [item["email"] for item in listing.json()["items"]]
    assert "nina.new@example.com" in emails


# ---------------------------------------------------------------------------
# AC-007 validation: 422 / 409
# ---------------------------------------------------------------------------


def test_ac007_post_missing_name_returns_422(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"email": "no.name@example.com", "role": "employee"},
    )
    assert response.status_code == 422


def test_ac007_post_malformed_email_returns_422(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Bad Email", "email": "not-an-email", "role": "employee"},
    )
    assert response.status_code == 422


def test_ac007_post_unknown_role_returns_422(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Odd Role", "email": "odd.role@example.com", "role": "superadmin"},
    )
    assert response.status_code == 422


def test_ac007_post_duplicate_email_returns_409(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Dup", "email": seeded["employee_email"], "role": "employee"},
    )
    assert response.status_code == 409


# ---------------------------------------------------------------------------
# AC-008: patch updates a field, GET reflects it, updated_at advances
# ---------------------------------------------------------------------------


def test_ac008_patch_updates_field_and_advances_updated_at(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    created = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Paula Patch", "email": "paula.patch@example.com", "role": "employee"},
    ).json()
    original_updated_at = created["updated_at"]

    time.sleep(1.1)  # Postgres timestamp resolution can round within a second.
    patched = client.patch(
        f"/admin/employees/{created['id']}",
        headers=_auth(token),
        json={"name": "Paula Patched"},
    )
    assert patched.status_code == 200, patched.text
    body = patched.json()
    assert body["name"] == "Paula Patched"
    assert body["updated_at"] > original_updated_at

    fresh = client.get("/admin/employees", headers=_auth(token))
    match = next(i for i in fresh.json()["items"] if i["id"] == created["id"])
    assert match["name"] == "Paula Patched"
    assert match["updated_at"] == body["updated_at"]


def test_ac008_patch_unknown_id_returns_404(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.patch(
        "/admin/employees/does-not-exist", headers=_auth(token), json={"name": "Nobody"}
    )
    assert response.status_code == 404


def test_ac008_patch_manager_id_pointing_at_nonexistent_employee_returns_422(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    created = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Orphan", "email": "orphan@example.com", "role": "employee"},
    ).json()

    response = client.patch(
        f"/admin/employees/{created['id']}",
        headers=_auth(token),
        json={"manager_id": "does-not-exist"},
    )
    assert response.status_code == 422


def test_ac008_patch_manager_id_pointing_at_self_returns_422(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    created = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Loopy", "email": "loopy@example.com", "role": "employee"},
    ).json()

    response = client.patch(
        f"/admin/employees/{created['id']}",
        headers=_auth(token),
        json={"manager_id": created["id"]},
    )
    assert response.status_code == 422


# ---------------------------------------------------------------------------
# AC-009 / NFR-003: response schema is minimised; extra fields do not persist
# ---------------------------------------------------------------------------


def test_ac009_nfr003_employee_schema_exposes_only_allowed_fields(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Minimal Fields", "email": "minimal.fields@example.com", "role": "employee"},
    )
    assert response.status_code == 201
    assert set(response.json()) == {
        "id",
        "name",
        "email",
        "role",
        "manager_id",
        "status",
        "created_at",
        "updated_at",
    }


def test_ac009_nfr003_extra_fields_on_create_are_rejected_and_not_persisted(
    client: TestClient, seeded: dict
) -> None:
    token = _hr_token(client, seeded)
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Extra Fields",
            "email": "extra.fields@example.com",
            "role": "employee",
            "date_of_birth": "1990-01-01",
            "salary": 100000,
        },
    )
    # extra="forbid" on EmployeeCreate: the whole request is rejected rather
    # than silently dropping the extra fields.
    assert response.status_code == 422

    listing = client.get("/admin/employees", headers=_auth(token))
    emails = [item["email"] for item in listing.json()["items"]]
    assert "extra.fields@example.com" not in emails


# ---------------------------------------------------------------------------
# NFR-007: search, page, page_size, and the page_size cap
# ---------------------------------------------------------------------------


def test_nfr007_list_honours_search(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    client.post(
        "/admin/employees",
        headers=_auth(token),
        json={
            "name": "Zelda Searchable",
            "email": "zelda.searchable@example.com",
            "role": "employee",
        },
    )
    response = client.get("/admin/employees?search=Zelda", headers=_auth(token))
    assert response.status_code == 200
    body = response.json()
    assert all("zelda" in item["name"].lower() for item in body["items"])
    assert any(item["email"] == "zelda.searchable@example.com" for item in body["items"])


def test_nfr007_list_honours_page_and_page_size(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    for i in range(5):
        client.post(
            "/admin/employees",
            headers=_auth(token),
            json={"name": f"Paged {i}", "email": f"paged{i}@example.com", "role": "employee"},
        )

    page1 = client.get("/admin/employees?page=1&page_size=2", headers=_auth(token))
    page2 = client.get("/admin/employees?page=2&page_size=2", headers=_auth(token))
    assert page1.status_code == page2.status_code == 200
    assert page1.json()["page"] == 1
    assert page2.json()["page"] == 2
    assert len(page1.json()["items"]) == 2
    assert len(page2.json()["items"]) == 2
    ids1 = {i["id"] for i in page1.json()["items"]}
    ids2 = {i["id"] for i in page2.json()["items"]}
    assert ids1.isdisjoint(ids2)


def test_nfr007_page_size_is_capped_at_100(client: TestClient, seeded: dict) -> None:
    token = _hr_token(client, seeded)
    response = client.get("/admin/employees?page_size=1000", headers=_auth(token))
    assert response.status_code == 422


# ---------------------------------------------------------------------------
# NFR-002: non-admin roles are forbidden on all three routes
# ---------------------------------------------------------------------------


def test_nfr002_employee_and_manager_tokens_get_403_on_all_routes(
    client: TestClient, seeded: dict
) -> None:
    hr_token = _hr_token(client, seeded)
    created = client.post(
        "/admin/employees",
        headers=_auth(hr_token),
        json={"name": "Target", "email": "target.rbac@example.com", "role": "employee"},
    ).json()

    for role_key in ("employee_email", "manager_email"):
        token = _login(client, seeded[role_key], seeded["password"])
        get_resp = client.get("/admin/employees", headers=_auth(token))
        post_resp = client.post(
            "/admin/employees",
            headers=_auth(token),
            json={"name": "X", "email": f"x.{role_key}@example.com", "role": "employee"},
        )
        patch_resp = client.patch(
            f"/admin/employees/{created['id']}",
            headers=_auth(token),
            json={"name": "Y"},
        )
        assert get_resp.status_code == 403, role_key
        assert post_resp.status_code == 403, role_key
        assert patch_resp.status_code == 403, role_key
