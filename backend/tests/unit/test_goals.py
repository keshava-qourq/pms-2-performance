"""Unit tests for the POST /goals logic (AC-016, AC-017).

These exercise `app.services.create_goal` and `app.schemas.GoalCreate`
directly against the database session, rather than the full integration
surface (owned by backend/tests/integration/, not this file).
"""

import pytest
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.models import Employee, Goal
from app.schemas import GoalCreate, GoalOut, KeyResultCreate
from app.security import hash_password
from app.services import create_goal


def _make_employee(db: Session, *, email: str = "owner@example.com") -> Employee:
    employee = Employee(
        name="Goal Owner",
        email=email,
        role="employee",
        status="active",
        password_hash=hash_password("correct-horse-battery"),
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def test_ac016_creating_a_goal_saves_it_with_its_key_results(db: Session) -> None:
    employee = _make_employee(db)
    body = GoalCreate(
        title="Ship the thing",
        description="Get it out the door",
        key_results=[
            KeyResultCreate(title="Widgets shipped", target_value=10),
            KeyResultCreate(title="Bugs fixed"),
        ],
    )

    goal = create_goal(db, employee, body)

    assert goal.id
    assert goal.employee_id == employee.id
    assert goal.title == "Ship the thing"
    assert goal.description == "Get it out the door"
    assert len(goal.key_results) == 2
    assert goal.key_results[0].title == "Widgets shipped"
    assert goal.key_results[0].target_value == 10
    assert goal.key_results[0].current_value == 0
    assert goal.key_results[1].target_value is None


def test_ac016_goal_is_owned_by_the_signed_in_employee_not_a_body_field(db: Session) -> None:
    """The employee comes from the authenticated caller, never from the
    request body: GoalCreate has no field through which an id could be
    supplied, and create_goal always attributes the goal to the caller."""
    employee = _make_employee(db)
    body = GoalCreate(title="Grow the thing", key_results=[KeyResultCreate(title="KR one")])

    goal = create_goal(db, employee, body)

    assert goal.employee_id == employee.id
    assert not hasattr(body, "employee_id")


def test_ac016_goal_is_listed_among_the_employees_goals(db: Session) -> None:
    employee = _make_employee(db)
    body = GoalCreate(title="Ship the thing", key_results=[KeyResultCreate(title="KR one")])

    create_goal(db, employee, body)

    listed = db.query(Goal).filter(Goal.employee_id == employee.id).all()
    assert len(listed) == 1
    assert listed[0].title == "Ship the thing"


def test_ac016_goal_out_serialises_the_created_goal(db: Session) -> None:
    employee = _make_employee(db)
    body = GoalCreate(title="Ship the thing", key_results=[KeyResultCreate(title="KR one")])

    goal = create_goal(db, employee, body)
    out = GoalOut.model_validate(goal)

    assert out.employee_id == employee.id
    assert out.title == "Ship the thing"
    assert out.approval_status == "draft"
    assert len(out.key_results) == 1
    assert out.key_results[0].title == "KR one"
    assert out.key_results[0].current_value == 0


def test_ac017_missing_title_is_rejected_with_the_required_field_named() -> None:
    with pytest.raises(ValidationError) as exc_info:
        GoalCreate(key_results=[KeyResultCreate(title="KR one")])

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "title" in fields


def test_ac017_blank_title_is_rejected() -> None:
    with pytest.raises(ValidationError) as exc_info:
        GoalCreate(title="", key_results=[KeyResultCreate(title="KR one")])

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "title" in fields


def test_ac017_no_key_results_is_rejected_with_the_required_field_named() -> None:
    with pytest.raises(ValidationError) as exc_info:
        GoalCreate(title="Ship the thing", key_results=[])

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "key_results" in fields


def test_ac017_missing_title_and_key_results_names_both_fields() -> None:
    with pytest.raises(ValidationError) as exc_info:
        GoalCreate(key_results=[])

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "title" in fields
    assert "key_results" in fields


def test_ac017_key_result_without_a_title_is_rejected() -> None:
    with pytest.raises(ValidationError) as exc_info:
        GoalCreate(title="Ship the thing", key_results=[KeyResultCreate(title="")])

    fields = {err["loc"][-1] for err in exc_info.value.errors()}
    assert "title" in fields
