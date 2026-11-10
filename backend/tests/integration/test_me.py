"""Integration tests for GET /me (AC-015)."""

from datetime import UTC, datetime, timedelta

import jwt
from fastapi.testclient import TestClient

from app.security import JWT_ALGORITHM, JWT_SECRET_KEY


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200
    return response.json()["access_token"]


def test_ac015_me_returns_profile_and_manager(client: TestClient, seeded: dict) -> None:
    token = _login(client, seeded["employee_email"], seeded["password"])

    response = client.get("/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == seeded["employee_email"]
    assert body["role"] == "employee"
    assert body["manager"]["email"] == seeded["manager_email"]
    assert set(body["manager"]) == {"id", "name", "email", "role"}
    assert set(body) == {
        "id",
        "name",
        "email",
        "role",
        "status",
        "created_at",
        "updated_at",
        "manager",
    }


def test_ac015_me_manager_is_null_when_unassigned(client: TestClient, seeded: dict) -> None:
    token = _login(client, seeded["manager_email"], seeded["password"])

    response = client.get("/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200
    assert response.json()["manager"] is None


def test_me_without_token_returns_401(client: TestClient) -> None:
    response = client.get("/me")

    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_me_with_invalid_token_returns_401(client: TestClient) -> None:
    response = client.get("/me", headers={"Authorization": "Bearer not-a-real-token"})

    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_me_with_expired_token_returns_401(client: TestClient) -> None:
    expired = jwt.encode(
        {
            "sub": "whoever",
            "role": "employee",
            "iat": datetime.now(UTC) - timedelta(minutes=10),
            "exp": datetime.now(UTC) - timedelta(minutes=1),
        },
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )

    response = client.get("/me", headers={"Authorization": f"Bearer {expired}"})

    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}
