"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserSummary(BaseModel):
    id: str
    name: str
    email: str
    role: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserSummary


class ManagerSummary(BaseModel):
    id: str
    name: str
    email: str
    role: str


class MeResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    status: str
    created_at: datetime
    updated_at: datetime
    manager: ManagerSummary | None = None


EmployeeRole = Literal["employee", "manager", "hr_admin"]
EmployeeStatus = Literal["active", "inactive"]


class EmployeeCreate(BaseModel):
    """Only the fields performance management needs (NFR-003): no address,
    DOB, salary or demographic data, and no other field is accepted."""

    model_config = ConfigDict(extra="forbid")

    name: str
    email: EmailStr
    role: EmployeeRole
    manager_id: str | None = None


class EmployeeUpdate(BaseModel):
    """Any subset of the minimised fields; anything else is rejected."""

    model_config = ConfigDict(extra="forbid")

    name: str | None = None
    email: EmailStr | None = None
    role: EmployeeRole | None = None
    manager_id: str | None = None
    status: EmployeeStatus | None = None


class EmployeeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: str
    role: str
    manager_id: str | None
    status: str
    created_at: datetime
    updated_at: datetime


class EmployeeListResponse(BaseModel):
    items: list[EmployeeOut]
    total: int
    page: int
    page_size: int


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."
