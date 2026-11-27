"""Integration tests for POST /admin/employees/{id}/erase (AC-037, AC-038).

One test per reviewed test case: TC-052, TC-053, TC-054, TC-056, TC-057.

Credentials for every account this file creates are generated at run time
(never written as literals), even where the reviewed case names a specific
password, since only the role and the login outcome matter to the case --
the same approach test_us002_rbac.py, test_goals.py, test_feedback.py and
test_me.py take for the same reason. Where a case names a specific email
(admin@example.com, dev.jones@example.com, sam.lee@example.com,
priya.shah@example.com, tom.reeves@example.com) that email is kept as
given, since it is the case's own test data, not a credential.

The reviewed cases use placeholder employee ids (emp-4821, emp-7733); the
implemented admin routes take the employee's own path id (see
test_admin_employees.py and test_employees.py), so each case's employee is
a real Employee row created in the test and referred to by that row's own
id.

The cases' precondition -- "an approved erasure request recorded against
[the] profile" -- names no endpoint in this story's scope to create or
approve such a request; the only endpoint given here is the erase action
itself, and no readable spec covers the shape of that prior state. This
file follows this codebase's own naming convention for a workflow-state
column (Goal's `approval_status`, see test_models.py) and records the
precondition as `erasure_status="approved"` set directly on the Employee
row; an employee with no erasure request recorded is left at that
column's default (None). This mapping is this file's own assumption,
flagged as a risk in the task report, since no readable file names the
actual column the implementation will use.
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
    manager: Employee | None = None,
    erasure_status: str | None = None,
) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role=role,
        status="active",
        manager_id=manager.id if manager else None,
        password_hash=hash_password(password),
        erasure_status=erasure_status,
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
# AC-037
# ---------------------------------------------------------------------------


def test_tc052_hr_admin_actions_approved_erasure_for_an_employee(
    client: TestClient, db: Session
) -> None:
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="admin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    priya = _make_employee(
        db,
        name="Priya Shah",
        email="priya.shah@example.com",
        role="employee",
        password=_password(),
        erasure_status="approved",
    )
    hr_token = _login(client, hr_admin.email, hr_password)

    response = client.post(f"/admin/employees/{priya.id}/erase", headers=_auth(hr_token))

    assert response.status_code == 200, response.text
    body = response.json()
    assert body.get("name") != "Priya Shah"
    assert body.get("email") != "priya.shah@example.com"

    listing = client.get("/admin/employees", headers=_auth(hr_token))
    assert listing.status_code == 200, listing.text
    assert "priya.shah@example.com" not in listing.text
    assert "Priya Shah" not in listing.text


def test_tc053_employee_role_cannot_action_an_erasure(client: TestClient, db: Session) -> None:
    employee_password = _password()
    requester = _make_employee(
        db,
        name="Dev Jones",
        email="dev.jones@example.com",
        role="employee",
        password=employee_password,
    )
    priya = _make_employee(
        db,
        name="Priya Shah",
        email="priya.shah@example.com",
        role="employee",
        password=_password(),
        erasure_status="approved",
    )
    requester_token = _login(client, requester.email, employee_password)

    response = client.post(f"/admin/employees/{priya.id}/erase", headers=_auth(requester_token))

    assert response.status_code == 403, response.text

    # Priya's profile remains unchanged and accessible: an HR Admin can
    # still see the original personal data.
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="hr.verifier@example.com",
        role="hr_admin",
        password=hr_password,
    )
    hr_token = _login(client, hr_admin.email, hr_password)
    listing = client.get("/admin/employees", headers=_auth(hr_token))
    assert listing.status_code == 200, listing.text
    match = next(item for item in listing.json()["items"] if item["id"] == priya.id)
    assert match["name"] == "Priya Shah"
    assert match["email"] == "priya.shah@example.com"


def test_tc054_erasure_rejected_when_no_approved_request_exists(
    client: TestClient, db: Session
) -> None:
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="admin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    tom = _make_employee(
        db,
        name="Tom Reeves",
        email="tom.reeves@example.com",
        role="employee",
        password=_password(),
    )
    hr_token = _login(client, hr_admin.email, hr_password)

    response = client.post(f"/admin/employees/{tom.id}/erase", headers=_auth(hr_token))

    assert response.status_code in (400, 404, 409), response.text
    message = str(response.json()).lower()
    assert "erasure" in message or "approved" in message

    listing = client.get("/admin/employees", headers=_auth(hr_token))
    assert listing.status_code == 200, listing.text
    match = next(item for item in listing.json()["items"] if item["id"] == tom.id)
    assert match["name"] == "Tom Reeves"
    assert match["email"] == "tom.reeves@example.com"


# ---------------------------------------------------------------------------
# AC-038
# ---------------------------------------------------------------------------


def test_tc056_erased_employees_data_is_not_retrievable_by_hr_admin_lookup(
    client: TestClient, db: Session
) -> None:
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="admin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    priya = _make_employee(
        db,
        name="Priya Shah",
        email="priya.shah@example.com",
        role="employee",
        password=_password(),
        erasure_status="approved",
    )
    hr_token = _login(client, hr_admin.email, hr_password)
    erase = client.post(f"/admin/employees/{priya.id}/erase", headers=_auth(hr_token))
    assert erase.status_code == 200, erase.text

    response = client.get(f"/employees/{priya.id}/goals", headers=_auth(hr_token))

    if response.status_code == 200:
        assert "Priya Shah" not in response.text
        assert "priya.shah@example.com" not in response.text
    else:
        assert response.status_code in (403, 404), response.text


def test_tc057_manager_cannot_see_erased_direct_reports_personal_data_via_goals_lookup(
    client: TestClient, db: Session
) -> None:
    hr_password = _password()
    hr_admin = _make_employee(
        db,
        name="Harper Admin",
        email="admin@example.com",
        role="hr_admin",
        password=hr_password,
    )
    manager_password = _password()
    sam = _make_employee(
        db,
        name="Sam Lee",
        email="sam.lee@example.com",
        role="manager",
        password=manager_password,
    )
    priya = _make_employee(
        db,
        name="Priya Shah",
        email="priya.shah@example.com",
        role="employee",
        password=_password(),
        manager=sam,
        erasure_status="approved",
    )
    hr_token = _login(client, hr_admin.email, hr_password)
    erase = client.post(f"/admin/employees/{priya.id}/erase", headers=_auth(hr_token))
    assert erase.status_code == 200, erase.text

    sam_token = _login(client, sam.email, manager_password)
    response = client.get(f"/employees/{priya.id}/goals", headers=_auth(sam_token))

    if response.status_code == 200:
        assert "Priya Shah" not in response.text
        assert "priya.shah@example.com" not in response.text
    else:
        assert response.status_code in (403, 404), response.text
