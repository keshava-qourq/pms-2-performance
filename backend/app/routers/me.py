"""GET /me -- the caller's own profile and assigned manager (AC-015).

POST /me/consent (AC-040) records or updates the signed-in employee's
consent status for a processing purpose.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.schemas import ConsentOut, ConsentRequest, MeResponse
from app.security import get_current_employee
from app.services import build_me_response
from app.services import record_consent as record_consent_service

router = APIRouter(tags=["me"])


@router.get("/me", response_model=MeResponse)
def get_me(
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> MeResponse:
    return build_me_response(db, current)


@router.post(
    "/me/consent",
    response_model=ConsentOut,
    status_code=status.HTTP_201_CREATED,
)
def record_consent(
    body: ConsentRequest,
    current: Employee = Depends(get_current_employee),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> ConsentOut:
    """AC-040: record/update the caller's own consent for ``body.purpose``.

    The identity consent is recorded against is always the signed-in
    employee (``current``), never a field of the request body.
    """
    consent = record_consent_service(db, current, body)
    return ConsentOut.model_validate(consent)
