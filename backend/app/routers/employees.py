"""HR Admin employee management, CSV bulk import, a manager's view of a
direct report's goals, and GDPR erasure."""

import uuid

from fastapi import APIRouter, File, UploadFile

from app.schemas import EmployeeCreate, EmployeeUpdate, StubResponse

router = APIRouter(tags=["employees"])


@router.post("/admin/employees", response_model=StubResponse)
async def create_employee(body: EmployeeCreate) -> StubResponse:
    return StubResponse(endpoint="POST /admin/employees")


@router.patch("/admin/employees/{employee_id}", response_model=StubResponse)
async def update_employee(employee_id: uuid.UUID, body: EmployeeUpdate) -> StubResponse:
    return StubResponse(endpoint="PATCH /admin/employees/{id}")


@router.post("/admin/imports", response_model=StubResponse)
async def upload_csv_import(file: UploadFile = File(...)) -> StubResponse:  # noqa: B008
    return StubResponse(endpoint="POST /admin/imports")


@router.get("/admin/imports/{job_id}", response_model=StubResponse)
async def get_csv_import(job_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="GET /admin/imports/{job_id}")


@router.get("/employees/{employee_id}/goals", response_model=StubResponse)
async def get_direct_report_goals(employee_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="GET /employees/{id}/goals")


@router.post("/admin/employees/{employee_id}/erase", response_model=StubResponse)
async def erase_employee(employee_id: uuid.UUID) -> StubResponse:
    return StubResponse(endpoint="POST /admin/employees/{id}/erase")
