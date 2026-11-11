"""The data model's referential integrity, exercised against a real schema.

`db_session` (see conftest.py) builds every table in `Base.metadata` -- including
these -- against an in-memory database, so a column type SQLAlchemy cannot
actually create fails here rather than on the first ticket that imports it.
"""

from sqlalchemy.orm import Session

from app.models import Employee, Goal, KeyResult


def test_employee_hierarchy_round_trips(db_session: Session) -> None:
    manager = Employee(
        name="Nadia Osei",
        email="nadia@example.com",
        password_hash="x",
        role="Manager",
    )
    db_session.add(manager)
    db_session.flush()

    report = Employee(
        name="Rosa Lindqvist",
        email="rosa@example.com",
        password_hash="x",
        role="Employee",
        manager_id=manager.id,
    )
    db_session.add(report)
    db_session.commit()

    fetched = db_session.get(Employee, report.id)
    assert fetched is not None
    assert fetched.manager_id == manager.id
    assert fetched.status == "active"
    assert fetched.is_anonymised is False


def test_goal_owns_its_key_results(db_session: Session) -> None:
    owner = Employee(name="Amara", email="amara@example.com", password_hash="x", role="Employee")
    db_session.add(owner)
    db_session.flush()

    goal = Goal(employee_id=owner.id, title="Ship the thing")
    goal.key_results.append(KeyResult(title="Widgets shipped", target_value=10))
    db_session.add(goal)
    db_session.commit()

    fetched = db_session.get(Goal, goal.id)
    assert fetched is not None
    assert fetched.approval_status == "draft"
    assert len(fetched.key_results) == 1
    assert fetched.key_results[0].current_value == 0
