"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
"""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


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


class EmployeeErasureResponse(BaseModel):
    """What actioning an erasure returns (AC-037, AC-038): confirmation that
    the employee's personal data has been removed/anonymised, never the
    data itself."""

    id: str
    status: str
    erased_at: datetime


class KeyResultCreate(BaseModel):
    """One measurable key result of a new objective (AC-016)."""

    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1)
    target_value: float | None = None


class GoalCreate(BaseModel):
    """AC-016: a title, an optional description and one or more key results.
    AC-017: a missing title, or an empty ``key_results`` list, is rejected
    with a 422 naming the field(s) that are required."""

    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1)
    description: str | None = None
    key_results: list[KeyResultCreate] = Field(min_length=1)


class KeyResultOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    goal_id: str
    title: str
    target_value: float | None
    current_value: float
    status: str


class GoalOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    employee_id: str
    title: str
    description: str | None
    status: str
    progress: float
    approval_status: str
    created_at: datetime
    key_results: list[KeyResultOut]


class KeyResultUpdate(BaseModel):
    """Scaffolded for a later story (key result progress updates); shape
    matches the approved architecture. Not yet backed by any logic."""

    model_config = ConfigDict(extra="forbid")

    current_value: float | None = None
    status: str | None = None


class GoalReviewRequest(BaseModel):
    """Scaffolded for a later story (manager review of a submitted goal);
    shape matches the approved architecture. Not yet backed by any logic."""

    model_config = ConfigDict(extra="forbid")

    decision: str
    comment: str | None = None


class FeedbackCreate(BaseModel):
    """AC-026: a colleague and non-empty feedback text. AC-027: blank or
    missing ``content`` is rejected with a 422 naming the field."""

    model_config = ConfigDict(extra="forbid")

    recipient_id: str
    content: str = Field(min_length=1)
    request_id: str | None = None


class FeedbackOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    author_id: str
    recipient_id: str
    request_id: str | None
    content: str
    created_at: datetime


class FeedbackRequestCreate(BaseModel):
    """Scaffolded for a later story (requesting feedback from a colleague);
    shape matches the approved architecture. Not yet backed by any logic."""

    model_config = ConfigDict(extra="forbid")

    target_id: str


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."
