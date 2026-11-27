"""The backing services this application is configured to reach.

Each entry maps a service to the environment variable that addresses it. The value
comes from docker-compose.yml through .env.example, so the health check reports
what the running deployment can actually reach.
"""

import os
import secrets
from datetime import UTC, datetime

from sqlalchemy.orm import Session

from app.errors import EMPLOYEE_ALREADY_ERASED, EMPLOYEE_NOT_FOUND, FEEDBACK_RECIPIENT_NOT_FOUND
from app.models import AuditLog, Consent, Employee, Feedback, Goal, KeyResult
from app.schemas import ConsentRequest, FeedbackCreate, GoalCreate, ManagerSummary, MeResponse
from app.security import hash_password, verify_password

# The only employee fields performance management needs (AC-039, NFR-003):
# identity, role and reporting line. Creation -- whether through POST
# /admin/employees or a future bulk import -- goes through
# ``create_employee`` below, so neither path can smuggle an extra column
# (an address, a date of birth, a salary, ...) into the stored record: a key
# outside this set is simply not read, regardless of what the caller sent.
EMPLOYEE_MINIMISED_FIELDS = {"name", "email", "role", "manager_id"}

SERVICES = {
    "redis-queue": "REDIS_URL",
    "redis": "REDIS_URL",
}


def configured_services() -> dict[str, bool]:
    """Each service mapped to whether its connection variable is set."""
    return {name: bool(os.getenv(var)) for name, var in SERVICES.items()}


# A pre-computed bcrypt hash of an unguessable value, used only to keep the
# cost of an unknown-email login attempt the same as a known-email one.
_DUMMY_HASH = "$2b$12$CwTycUXWue0Thq9StjUM0uJ8i6jkT1o0RxReJq8g8LRbgs2RK0UMi"


def authenticate_employee(db: Session, email: str, password: str) -> Employee | None:
    """Verify an email/password pair (AC-001, AC-002).

    Returns the matching employee only when the email is known and the
    password matches its stored hash; otherwise returns ``None`` so the
    caller can raise a single generic error regardless of which check failed
    (NFR-001).
    """
    employee = db.query(Employee).filter(Employee.email == email).first()
    if employee is None:
        # Still run a hash comparison so a valid vs. unknown email cannot be
        # told apart by response timing.
        verify_password(password, _DUMMY_HASH)
        return None
    if not verify_password(password, employee.password_hash):
        return None
    return employee


def get_manager_summary(db: Session, employee: Employee) -> ManagerSummary | None:
    """The assigned manager's summary for ``employee``, or ``None`` when the
    employee has no manager, or its referenced manager row no longer exists
    (AC-015)."""
    if not employee.manager_id:
        return None
    manager_row = db.get(Employee, employee.manager_id)
    if manager_row is None:
        return None
    return ManagerSummary(
        id=manager_row.id,
        name=manager_row.name,
        email=manager_row.email,
        role=manager_row.role,
    )


def build_me_response(db: Session, employee: Employee) -> MeResponse:
    """The caller's own profile plus their assigned manager (AC-015)."""
    return MeResponse(
        id=employee.id,
        name=employee.name,
        email=employee.email,
        role=employee.role,
        status=employee.status,
        created_at=employee.created_at,
        updated_at=employee.updated_at,
        manager=get_manager_summary(db, employee),
    )


def create_employee(db: Session, data: dict) -> Employee:
    """Persist a new employee record from ``data``, keeping only the fields
    performance management needs (AC-039, NFR-003).

    ``data`` is a plain mapping -- the validated body of POST
    /admin/employees today, and in the same shape a future CSV-import row
    would take -- and any key outside ``EMPLOYEE_MINIMISED_FIELDS`` is
    ignored here, so data minimisation holds at the service layer even if a
    looser caller passed through more than the schema allows. Callers are
    expected to have already checked ``email``/``manager_id`` uniqueness and
    existence; this function only shapes and stores the row.
    """
    allowed = {k: v for k, v in data.items() if k in EMPLOYEE_MINIMISED_FIELDS}
    employee = Employee(
        name=allowed["name"],
        email=allowed["email"],
        role=allowed["role"],
        manager_id=allowed.get("manager_id"),
        status="active",
        # No login/invite flow exists yet for admin-created profiles; a
        # random, never-disclosed hash satisfies the non-nullable column
        # until that flow lands.
        password_hash=hash_password(secrets.token_urlsafe(32)),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def record_consent(db: Session, employee: Employee, body: ConsentRequest) -> Consent:
    """Record or update ``employee``'s own consent status for
    ``body.purpose`` (AC-040).

    One row per ``(employee_id, purpose)``: recording the same purpose again
    updates its existing row's ``status`` and ``recorded_at`` rather than
    adding a duplicate, so the status retrieved for that purpose afterwards
    is always this single current one.
    """
    consent = (
        db.query(Consent)
        .filter(Consent.employee_id == employee.id, Consent.purpose == body.purpose)
        .first()
    )
    if consent is None:
        consent = Consent(employee_id=employee.id, purpose=body.purpose, status=body.status)
        db.add(consent)
    else:
        consent.status = body.status
        consent.recorded_at = datetime.now(UTC)
    db.commit()
    db.refresh(consent)
    return consent


def create_goal(db: Session, employee: Employee, body: GoalCreate) -> Goal:
    """Persist a new objective with its key results for ``employee``
    (AC-016). A missing title or an empty key-results list never reaches
    here: ``GoalCreate`` already rejects both with a 422 (AC-017)."""
    goal = Goal(employee_id=employee.id, title=body.title, description=body.description)
    goal.key_results = [
        KeyResult(title=kr.title, target_value=kr.target_value) for kr in body.key_results
    ]
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


def write_feedback(db: Session, author: Employee, body: FeedbackCreate) -> Feedback:
    """Persist feedback authored by ``author`` about the chosen colleague
    (AC-026). Empty content never reaches here: ``FeedbackCreate`` already
    rejects it with a 422 (AC-027). The recipient must be a real employee;
    an unknown ``recipient_id`` raises ``FEEDBACK_RECIPIENT_NOT_FOUND``."""
    recipient = db.get(Employee, body.recipient_id)
    if recipient is None:
        raise FEEDBACK_RECIPIENT_NOT_FOUND.raise_as_http()

    feedback = Feedback(
        author_id=author.id,
        recipient_id=body.recipient_id,
        request_id=body.request_id,
        content=body.content,
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback


def direct_reports(db: Session, manager_id: str) -> list[Employee]:
    """Every employee currently reporting to ``manager_id``, by name.

    This is the live reporting hierarchy: it is never stored separately, so
    assigning or changing an employee's ``manager_id`` (PATCH
    /admin/employees/{id}) is immediately reflected for both the employee's
    previous manager (who stops appearing here) and their new one (who starts
    appearing here) without any further bookkeeping (AC-010, AC-011).
    """
    return (
        db.query(Employee).filter(Employee.manager_id == manager_id).order_by(Employee.name).all()
    )


def erase_employee(db: Session, actor: Employee, employee_id: str) -> Employee:
    """Action an approved GDPR erasure request for ``employee_id`` (AC-037).

    Removes/anonymises the employee's personal data in line with retention
    policy: their name and email are replaced with non-identifying values,
    their password hash is replaced with an unusable one (so the erased
    account can no longer authenticate), and ``status``/``erased_at`` record
    that the erasure has happened. The reporting line (``manager_id``) is
    organisational data, not personal data, and is left untouched.

    Raises ``EMPLOYEE_NOT_FOUND`` when ``employee_id`` does not exist, and
    ``EMPLOYEE_ALREADY_ERASED`` when it has already been actioned, so an
    erasure is never actioned twice (idempotent from the caller's point of
    view: the second call fails loudly rather than re-anonymising already
    anonymised data).

    Writes one ``audit_logs`` row recording that the erasure was performed,
    by whom and when -- the durable evidence the organisation keeps even
    though the employee's own personal data is no longer accessible
    afterwards (AC-038).
    """
    employee = db.get(Employee, employee_id)
    if employee is None:
        raise EMPLOYEE_NOT_FOUND.raise_as_http()
    if employee.erased_at is not None or employee.status == "erased":
        raise EMPLOYEE_ALREADY_ERASED.raise_as_http()

    now = datetime.now(UTC)
    employee.name = "Erased Employee"
    employee.email = f"erased-{employee.id}@erased.invalid"
    employee.password_hash = hash_password(secrets.token_urlsafe())
    employee.status = "erased"
    employee.erased_at = now

    db.add(
        AuditLog(
            actor_id=actor.id,
            action="employee_erasure",
            target_type="employee",
            target_id=employee.id,
        )
    )
    db.commit()
    db.refresh(employee)
    return employee


def creates_manager_cycle(db: Session, employee_id: str, candidate_manager_id: str) -> bool:
    """True if ``employee_id`` is an ancestor of ``candidate_manager_id``.

    Walks up the candidate's existing chain of managers; reaching
    ``employee_id`` means assigning ``candidate_manager_id`` as their manager
    would close a reporting loop (AC-011). A dangling/garbled chain simply
    stops the walk rather than looping forever.
    """
    visited: set[str] = set()
    walker = db.get(Employee, candidate_manager_id)
    while walker is not None:
        if walker.id == employee_id:
            return True
        if walker.id in visited:
            break
        visited.add(walker.id)
        walker = db.get(Employee, walker.manager_id) if walker.manager_id else None
    return False
