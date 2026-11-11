"""Shared test fixtures: a clean employees table and a TestClient per test."""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine
from app.main import app
from app.seed import SEED_PASSWORD, seed_demo_employees


@pytest.fixture(autouse=True)
def _clean_schema():
    """Create the schema once per test (additive, matches the migration) and
    empty the employees table before each test so tests do not leak state."""
    Base.metadata.create_all(bind=engine)
    with engine.begin() as conn:
        conn.exec_driver_sql("DELETE FROM employees")
    yield


@pytest.fixture
def db() -> Session:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture
def seeded(db: Session):
    seed_demo_employees(db)
    db.commit()
    return {
        "password": SEED_PASSWORD,
        "manager_email": "manager@example.com",
        "employee_email": "employee@example.com",
        "hr_admin_email": "hr.admin@example.com",
    }
