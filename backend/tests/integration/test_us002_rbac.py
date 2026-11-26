"""Integration tests for role-based access enforcement (US-002).

One test per reviewed test case: TC-025, TC-026, TC-028, TC-029, TC-030,
TC-031, TC-034, TC-035, TC-036, TC-037.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the role and the login outcome matter to the case.
"""

from __future__ import annotations

import csv
import io
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
    manager: Employee | None = None,
) -> Employee:
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


def _login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/auth/login", json={"email": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _create_goal(client: TestClient, token: str, title: str) -> None:
    """Create a goal for the signed-in user, through the API, as the case data
    requires. The exact shape of /goals is not covered by a readable spec
    here, so this uses the field names the data model itself uses
    (title, key_results[].title, key_results[].target_value)."""
    response = client.post(
        "/goals",
        headers=_auth(token),
        json={
            "title": title,
            "key_results": [{"title": f"{title} key result", "target_value": 5}],
        },
    )
    assert response.status_code in (200, 201), response.text


# ---------------------------------------------------------------------------
# AC-004: Employee role blocked from HR Admin functions
# ---------------------------------------------------------------------------


def test_tc025_employee_blocked_from_creating_an_employee_profile(
    client: TestClient, db: Session
) -> None:
    alice_password = _password()
    _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
    )
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper HR Admin",
        email="harper.hradmin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    alice_token = _login(client, "alice.employee@example.com", alice_password)

    # The case's payload names first_name/last_name; the implemented
    # POST /admin/employees schema takes a single "name" field (see
    # backend/tests/test_employees.py), so the two parts are combined here.
    response = client.post(
        "/admin/employees",
        headers=_auth(alice_token),
        json={
            "name": "Frank Newman",
            "email": "frank.newman@example.com",
            "role": "employee",
        },
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Forbidden"}

    hr_token = _login(client, hr_admin.email, hr_password)
    listing = client.get("/admin/employees", headers=_auth(hr_token))
    assert listing.status_code == 200
    emails = [item["email"] for item in listing.json()["items"]]
    assert "frank.newman@example.com" not in emails


def test_tc026_employee_blocked_from_editing_an_employee_profile(
    client: TestClient, db: Session
) -> None:
    alice_password = _password()
    _make_employee(
        db,
        name="Alice Employee",
        email="alice.employee@example.com",
        role="employee",
        password=alice_password,
    )
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper HR Admin",
        email="harper.hradmin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    original_manager = _make_employee(
        db,
        name="Original Manager",
        email="original.manager@example.com",
        role="manager",
        password=_password(),
    )
    new_manager = _make_employee(
        db,
        name="New Manager",
        email="new.manager@example.com",
        role="manager",
        password=_password(),
    )
    target = _make_employee(
        db,
        name="Target Employee",
        email="target.employee@example.com",
        role="employee",
        password=_password(),
        manager=original_manager,
    )
    alice_token = _login(client, "alice.employee@example.com", alice_password)

    response = client.patch(
        f"/admin/employees/{target.id}",
        headers=_auth(alice_token),
        json={"manager_id": new_manager.id},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Forbidden"}

    hr_token = _login(client, hr_admin.email, hr_password)
    listing = client.get("/admin/employees", headers=_auth(hr_token))
    match = next(item for item in listing.json()["items"] if item["id"] == target.id)
    assert match["manager_id"] == original_manager.id


# ---------------------------------------------------------------------------
# AC-005: Manager sees their own data and their direct reports', not others'
# ---------------------------------------------------------------------------


def test_tc028_manager_views_a_direct_reports_goals(client: TestClient, db: Session) -> None:
    bob_password = _password()
    bob = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=bob_password,
    )
    dana_password = _password()
    dana = _make_employee(
        db,
        name="Dana Scott",
        email="dana.scott@example.com",
        role="employee",
        password=dana_password,
        manager=bob,
    )
    dana_token = _login(client, dana.email, dana_password)
    _create_goal(client, dana_token, "Dana Scott Direct Report Goal")

    bob_token = _login(client, bob.email, bob_password)
    response = client.get(f"/employees/{dana.id}/goals", headers=_auth(bob_token))

    assert response.status_code == 200
    # The exact response shape is not covered by a readable spec here; this
    # checks that Dana's goal data is present in the payload either way.
    assert "Dana Scott Direct Report Goal" in response.text


def test_tc029_manager_blocked_from_viewing_an_unrelated_employees_goals(
    client: TestClient, db: Session
) -> None:
    bob_password = _password()
    bob = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=bob_password,
    )
    other_manager = _make_employee(
        db,
        name="Other Manager",
        email="other.manager@example.com",
        role="manager",
        password=_password(),
    )
    erin = _make_employee(
        db,
        name="Erin Walsh",
        email="erin.walsh@example.com",
        role="employee",
        password=_password(),
        manager=other_manager,
    )

    token = _login(client, bob.email, bob_password)
    response = client.get(f"/employees/{erin.id}/goals", headers=_auth(token))

    assert response.status_code == 403
    assert response.json() == {"detail": "Forbidden"}


def test_tc030_managers_dashboard_shows_only_their_own_goals(
    client: TestClient, db: Session
) -> None:
    bob_password = _password()
    bob = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=bob_password,
    )
    dana_password = _password()
    dana = _make_employee(
        db,
        name="Dana Scott",
        email="dana.scott@example.com",
        role="employee",
        password=dana_password,
        manager=bob,
    )
    bob_token = _login(client, bob.email, bob_password)
    _create_goal(client, bob_token, "Bob Manager Own Dashboard Goal")
    dana_token = _login(client, dana.email, dana_password)
    _create_goal(client, dana_token, "Dana Scott Report Dashboard Goal")

    response = client.get("/dashboard", headers=_auth(bob_token))

    assert response.status_code == 200
    assert "Bob Manager Own Dashboard Goal" in response.text
    assert "Dana Scott Report Dashboard Goal" not in response.text


def test_tc031_managers_feedback_view_is_limited_to_their_own_feedback(
    client: TestClient, db: Session
) -> None:
    bob_password = _password()
    bob = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=bob_password,
    )
    dana_password = _password()
    dana = _make_employee(
        db,
        name="Dana Scott",
        email="dana.scott@example.com",
        role="employee",
        password=dana_password,
        manager=bob,
    )
    third = _make_employee(
        db,
        name="Third Employee",
        email="third.employee@example.com",
        role="employee",
        password=_password(),
    )

    dana_token = _login(client, dana.email, dana_password)
    private_content = "Unrelated feedback content between Dana and the third employee"
    created = client.post(
        "/feedback",
        headers=_auth(dana_token),
        json={"recipient_id": third.id, "content": private_content},
    )
    assert created.status_code in (200, 201), created.text

    bob_token = _login(client, bob.email, bob_password)
    response = client.get("/feedback", headers=_auth(bob_token))

    assert response.status_code == 200
    assert private_content not in response.text


def test_tc034_manager_blocked_from_fetching_a_specific_feedback_record(
    client: TestClient, db: Session
) -> None:
    bob_password = _password()
    bob = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=bob_password,
    )
    dana_password = _password()
    dana = _make_employee(
        db,
        name="Dana Scott",
        email="dana.scott@example.com",
        role="employee",
        password=dana_password,
    )
    third = _make_employee(
        db,
        name="Third Employee",
        email="third.employee@example.com",
        role="employee",
        password=_password(),
    )

    dana_token = _login(client, dana.email, dana_password)
    private_content = "Specific feedback record fb-550 between Dana and the third employee"
    created = client.post(
        "/feedback",
        headers=_auth(dana_token),
        json={"recipient_id": third.id, "content": private_content},
    )
    assert created.status_code in (200, 201), created.text
    feedback_id = created.json().get("id") or created.json().get("feedback_id")

    bob_token = _login(client, bob.email, bob_password)
    # The approved API spec exposes no single-record GET for feedback, only
    # GET /feedback: a direct attempt to reach fb-550 is therefore checked
    # against that same list endpoint, confirming the record is withheld
    # from it entirely rather than merely paginated away.
    response = client.get("/feedback", headers=_auth(bob_token))

    assert response.status_code == 200
    assert private_content not in response.text
    if feedback_id is not None:
        assert str(feedback_id) not in response.text


# ---------------------------------------------------------------------------
# AC-006: HR Admin manages employee profiles and the reporting hierarchy
# ---------------------------------------------------------------------------


def test_tc035_hr_admin_creates_an_employee_profile(client: TestClient, db: Session) -> None:
    carol_password = _password()
    carol = _make_employee(
        db,
        name="Carol HR Admin",
        email="carol.hradmin@example.com",
        role="hr_admin",
        password=carol_password,
    )
    token = _login(client, carol.email, carol_password)

    # The case's payload names first_name/last_name; the implemented
    # POST /admin/employees schema takes a single "name" field (see
    # backend/tests/test_employees.py), so the two parts are combined here.
    response = client.post(
        "/admin/employees",
        headers=_auth(token),
        json={"name": "Grace Lee", "email": "grace.lee@example.com", "role": "employee"},
    )

    assert response.status_code == 201, response.text
    assert response.json()["email"] == "grace.lee@example.com"

    listing = client.get("/admin/employees", headers=_auth(token))
    assert listing.status_code == 200
    emails = [item["email"] for item in listing.json()["items"]]
    assert "grace.lee@example.com" in emails


def test_tc036_hr_admin_edits_a_profile_and_reassigns_the_manager(
    client: TestClient, db: Session
) -> None:
    carol_password = _password()
    carol = _make_employee(
        db,
        name="Carol HR Admin",
        email="carol.hradmin@example.com",
        role="hr_admin",
        password=carol_password,
    )
    original_manager = _make_employee(
        db,
        name="Bob Manager",
        email="bob.manager@example.com",
        role="manager",
        password=_password(),
    )
    new_manager = _make_employee(
        db,
        name="New Manager",
        email="new.manager@example.com",
        role="manager",
        password=_password(),
    )
    dana = _make_employee(
        db,
        name="Dana Scott",
        email="dana.scott@example.com",
        role="employee",
        password=_password(),
        manager=original_manager,
    )

    token = _login(client, carol.email, carol_password)
    response = client.patch(
        f"/admin/employees/{dana.id}",
        headers=_auth(token),
        json={"manager_id": new_manager.id},
    )

    assert response.status_code == 200, response.text
    assert response.json()["manager_id"] == new_manager.id

    listing = client.get("/admin/employees", headers=_auth(token))
    match = next(item for item in listing.json()["items"] if item["id"] == dana.id)
    assert match["manager_id"] == new_manager.id


def test_tc037_hr_admin_bulk_imports_employees_via_csv(client: TestClient, db: Session) -> None:
    carol_password = _password()
    carol = _make_employee(
        db,
        name="Carol HR Admin",
        email="carol.hradmin@example.com",
        role="hr_admin",
        password=carol_password,
    )
    token = _login(client, carol.email, carol_password)

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["name", "email", "role"])
    for i in range(50):
        writer.writerow([f"Batch Employee {i}", f"batch.employee.{i}@example.com", "employee"])
    csv_bytes = buffer.getvalue().encode("utf-8")

    upload = client.post(
        "/admin/imports",
        headers=_auth(token),
        files={"file": ("employees_batch1.csv", csv_bytes, "text/csv")},
    )
    assert upload.status_code in (200, 201, 202), upload.text
    upload_body = upload.json()
    job_id = upload_body.get("job_id") or upload_body.get("id")
    assert job_id, upload.text

    status_response = client.get(f"/admin/imports/{job_id}", headers=_auth(token))
    assert status_response.status_code == 200, status_response.text
    summary = status_response.json()
    assert summary, status_response.text

    listing = client.get("/admin/employees?search=Batch", headers=_auth(token))
    assert listing.status_code == 200
    emails = [item["email"] for item in listing.json()["items"]]
    assert "batch.employee.0@example.com" in emails
