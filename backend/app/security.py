"""Password hashing and JWT access tokens.

Email/password only -- no SAML/OAuth here or anywhere else in the app (AC-003).
"""

import os
from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

_bearer_scheme = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    """Hash a plaintext password. The plaintext itself is never persisted or logged."""
    return _pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd_context.verify(password, password_hash)


def create_access_token(employee: Employee) -> str:
    now = datetime.now(UTC)
    payload: dict[str, Any] = {
        "sub": employee.id,
        "role": employee.role,
        "iat": now,
        "exp": now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any]:
    """Raises jwt.PyJWTError on any invalid, malformed or expired token."""
    return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])


_NOT_AUTHENTICATED = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not authenticated",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_employee(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),  # noqa: B008
    db: Session = Depends(get_db),  # noqa: B008
) -> Employee:
    """Verify the bearer JWT fully (signature, algorithm, expiry) and load its
    subject. Fails closed: any missing or invalid token is a 401, never a guess."""
    if credentials is None or not credentials.credentials:
        raise _NOT_AUTHENTICATED
    try:
        payload = decode_access_token(credentials.credentials)
    except jwt.PyJWTError as exc:
        raise _NOT_AUTHENTICATED from exc

    employee_id = payload.get("sub")
    if not employee_id:
        raise _NOT_AUTHENTICATED

    employee = db.get(Employee, employee_id)
    if employee is None:
        raise _NOT_AUTHENTICATED
    return employee
