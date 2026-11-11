"""Every endpoint the approved API spec declares resolves to a route.

A stub that is missing from the router (a typo in a path, a method mismatch)
means the frontend's call 404s long before anyone notices it was never wired
up. This checks the shape once, here, rather than once per ticket.
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# (method, path) exactly as the approved api_spec declares it.
SPEC_ENDPOINTS = [
    ("post", "/auth/login"),
    ("get", "/me"),
    ("post", "/admin/employees"),
    ("patch", "/admin/employees/{employee_id}"),
    ("post", "/admin/imports"),
    ("get", "/admin/imports/{job_id}"),
    ("post", "/goals"),
    ("patch", "/goals/{goal_id}/key-results/{key_result_id}"),
    ("post", "/goals/{goal_id}/submit"),
    ("get", "/employees/{employee_id}/goals"),
    ("post", "/goals/{goal_id}/review"),
    ("get", "/dashboard"),
    ("post", "/feedback"),
    ("post", "/feedback/requests"),
    ("get", "/feedback"),
    ("get", "/notifications"),
    ("post", "/notifications/{notification_id}/read"),
    ("post", "/me/data-export"),
    ("post", "/admin/employees/{employee_id}/erase"),
    ("post", "/me/consent"),
]


def test_every_spec_endpoint_is_registered() -> None:
    paths = client.get("/openapi.json").json()["paths"]
    for method, path in SPEC_ENDPOINTS:
        assert path in paths, f"{path} is not registered"
        assert method in paths[path], f"{method.upper()} {path} is not registered"


def test_a_stub_route_returns_a_typed_placeholder() -> None:
    response = client.post("/auth/login", json={"email": "a@b.com", "password": "x"})

    assert response.status_code == 200
    assert response.json() == {
        "endpoint": "POST /auth/login",
        "status": "not_implemented",
        "detail": "Scaffolded from the approved API spec; no behaviour yet.",
    }


def test_feedback_request_body_rejects_empty_content() -> None:
    """The api_spec calls this out explicitly: "empty content rejected"."""
    response = client.post(
        "/feedback",
        json={"recipient_id": "11111111-1111-1111-1111-111111111111", "content": ""},
    )

    assert response.status_code == 422
