"""Integration tests for POST /auth/login (AC-001, AC-002, NFR-001)."""

from fastapi.testclient import TestClient


def test_ac001_login_with_correct_credentials_returns_token_and_user(
    client: TestClient, seeded: dict
) -> None:
    response = client.post(
        "/auth/login",
        json={"email": seeded["employee_email"], "password": seeded["password"]},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert isinstance(body["access_token"], str) and body["access_token"]
    assert body["user"]["email"] == seeded["employee_email"]
    assert body["user"]["role"] == "employee"
    assert set(body["user"]) == {"id", "name", "email", "role"}


def test_ac002_login_with_unknown_email_returns_generic_401(
    client: TestClient, seeded: dict
) -> None:
    response = client.post(
        "/auth/login",
        json={"email": "nobody@example.com", "password": seeded["password"]},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid email or password"}


def test_ac002_login_with_wrong_password_returns_identical_generic_401(
    client: TestClient, seeded: dict
) -> None:
    response = client.post(
        "/auth/login",
        json={"email": seeded["employee_email"], "password": "not-the-password"},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid email or password"}


def test_ac002_malformed_body_returns_422(client: TestClient) -> None:
    response = client.post("/auth/login", json={"email": "not-an-email"})

    assert response.status_code == 422


def test_nfr001_unknown_email_and_wrong_password_responses_are_byte_identical(
    client: TestClient, seeded: dict
) -> None:
    """NFR-001: the two failure modes must be indistinguishable to the caller."""
    unknown = client.post(
        "/auth/login", json={"email": "nobody@example.com", "password": seeded["password"]}
    )
    wrong = client.post(
        "/auth/login",
        json={"email": seeded["employee_email"], "password": "not-the-password"},
    )

    assert unknown.status_code == wrong.status_code == 401
    assert unknown.content == wrong.content


def test_ac003_no_sso_saml_oauth_route_exists(client: TestClient) -> None:
    response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    joined = " ".join(paths).lower()
    for forbidden in ("sso", "saml", "oauth"):
        assert forbidden not in joined
