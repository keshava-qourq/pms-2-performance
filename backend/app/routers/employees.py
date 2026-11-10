"""Employee-scoped resources: manager scoping to self + direct reports (AC-005)."""

from fastapi import APIRouter, Depends

from app.deps import require_self_or_report
from app.models import Employee
from app.schemas import StubResponse

router = APIRouter(tags=["employees"])


@router.get("/employees/{id}/goals", response_model=StubResponse)
def get_employee_goals(
    id: str,
    current: Employee = Depends(require_self_or_report("id")),  # noqa: B008
) -> StubResponse:
    """A manager views a direct report's goals; an unrelated manager or any
    other employee is denied. Goal content itself is implemented elsewhere;
    this route exists so the scoping guard has a real endpoint to protect."""
    return StubResponse(endpoint="get_employees_id_goals")
