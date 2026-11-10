"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated stub route returns until it is implemented. These are request/response
*shapes* straight from the approved API spec -- not business logic. No route
decides what happens with a validated body yet; that is the development
sprint's work, one endpoint at a time.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


# ---- auth --------------------------------------------------------------


class LoginRequest(BaseModel):
    email: str
    password: str


# ---- employees ----------------------------------------------------------


class EmployeeCreate(BaseModel):
    name: str
    email: str
    role: str
    manager_id: uuid.UUID | None = None


class EmployeeUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    role: str | None = None
    manager_id: uuid.UUID | None = None
    status: str | None = None


class EmployeeRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: str
    role: str
    manager_id: uuid.UUID | None
    status: str


# ---- goals and key results ------------------------------------------------


class KeyResultCreate(BaseModel):
    title: str
    target_value: float
    current_value: float = 0


class GoalCreate(BaseModel):
    title: str
    description: str | None = None
    key_results: list[KeyResultCreate] = Field(min_length=1)


class KeyResultUpdate(BaseModel):
    current_value: float | None = None
    status: str | None = None


class GoalReviewRequest(BaseModel):
    decision: str
    comment: str | None = None


class KeyResultRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    target_value: float
    current_value: float
    status: str


class GoalRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    employee_id: uuid.UUID
    title: str
    description: str | None
    status: str
    progress: float
    approval_status: str
    key_results: list[KeyResultRead] = []


# ---- feedback -------------------------------------------------------------


class FeedbackCreate(BaseModel):
    recipient_id: uuid.UUID
    content: str = Field(min_length=1)
    request_id: uuid.UUID | None = None


class FeedbackRequestCreate(BaseModel):
    target_id: uuid.UUID


class FeedbackRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    author_id: uuid.UUID
    recipient_id: uuid.UUID
    request_id: uuid.UUID | None
    content: str
    created_at: datetime


class FeedbackRequestRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    requester_id: uuid.UUID
    target_id: uuid.UUID
    status: str
    created_at: datetime


# ---- notifications ---------------------------------------------------------


class NotificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    type: str
    message: str
    is_read: bool
    created_at: datetime


# ---- consent ----------------------------------------------------------------


class ConsentRequest(BaseModel):
    purpose: str
    status: str


class ConsentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    purpose: str
    status: str
