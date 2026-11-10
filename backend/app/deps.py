"""Shared FastAPI dependencies.

`get_current_user` is the one seam every protected endpoint depends on: it
reads the bearer JWT, decodes it, and loads the employee it names. No route
wires it in yet -- RBAC and manager-report scoping are enforced per endpoint,
one development ticket at a time (NFR-002), and each endpoint's audit-log
write belongs with that endpoint's own ticket too.
"""

import uuid

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.security import decode_access_token

_bearer = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> Employee:
    """The Employee the bearer token names; raises 401 for anything else."""
    if credentials is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")
    try:
        payload = decode_access_token(credentials.credentials)
        subject = uuid.UUID(str(payload.get("sub")))
    except (jwt.PyJWTError, ValueError) as exc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token") from exc
    user = db.get(Employee, subject)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unknown user")
    return user
