"""Unit tests for the POST /me/consent logic (AC-040).

These exercise `app.services.record_consent` directly against the database
session, rather than the full integration surface (owned by
backend/tests/integration/).
"""

from sqlalchemy.orm import Session

from app.models import Consent, Employee
from app.schemas import ConsentRequest
from app.security import hash_password
from app.services import record_consent


def _make_employee(db: Session, *, email: str, name: str = "Test Person") -> Employee:
    employee = Employee(
        name=name,
        email=email,
        role="employee",
        status="active",
        password_hash=hash_password("correct-horse-battery"),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def test_ac040_recording_consent_for_a_new_purpose_creates_a_row(db: Session) -> None:
    employee = _make_employee(db, email="alex@example.com")

    result = record_consent(
        db, employee, ConsentRequest(purpose="feedback_sharing", status="granted")
    )

    assert result.employee_id == employee.id
    assert result.purpose == "feedback_sharing"
    assert result.status == "granted"
    assert result.recorded_at is not None


def test_ac040_consent_status_is_retrievable_afterwards(db: Session) -> None:
    employee = _make_employee(db, email="blair@example.com")

    record_consent(db, employee, ConsentRequest(purpose="analytics", status="granted"))

    stored = (
        db.query(Consent)
        .filter(Consent.employee_id == employee.id, Consent.purpose == "analytics")
        .one()
    )
    assert stored.status == "granted"


def test_ac040_recording_the_same_purpose_again_updates_the_existing_row(db: Session) -> None:
    employee = _make_employee(db, email="casey@example.com")

    first = record_consent(
        db, employee, ConsentRequest(purpose="feedback_sharing", status="granted")
    )
    second = record_consent(
        db, employee, ConsentRequest(purpose="feedback_sharing", status="withdrawn")
    )

    assert second.id == first.id
    assert second.status == "withdrawn"

    rows = db.query(Consent).filter(Consent.employee_id == employee.id).all()
    assert len(rows) == 1


def test_ac040_consent_is_recorded_per_employee_and_does_not_clash(db: Session) -> None:
    alex = _make_employee(db, email="alex2@example.com")
    blair = _make_employee(db, email="blair2@example.com")

    record_consent(db, alex, ConsentRequest(purpose="feedback_sharing", status="granted"))
    record_consent(db, blair, ConsentRequest(purpose="feedback_sharing", status="denied"))

    alex_row = (
        db.query(Consent)
        .filter(Consent.employee_id == alex.id, Consent.purpose == "feedback_sharing")
        .one()
    )
    blair_row = (
        db.query(Consent)
        .filter(Consent.employee_id == blair.id, Consent.purpose == "feedback_sharing")
        .one()
    )
    assert alex_row.status == "granted"
    assert blair_row.status == "denied"


def test_ac040_different_purposes_for_the_same_employee_are_recorded_separately(
    db: Session,
) -> None:
    employee = _make_employee(db, email="drew@example.com")

    record_consent(db, employee, ConsentRequest(purpose="feedback_sharing", status="granted"))
    record_consent(db, employee, ConsentRequest(purpose="analytics", status="denied"))

    rows = {
        row.purpose: row.status
        for row in db.query(Consent).filter(Consent.employee_id == employee.id).all()
    }
    assert rows == {"feedback_sharing": "granted", "analytics": "denied"}
