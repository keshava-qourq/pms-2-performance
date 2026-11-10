"""Password hashing and JWT helpers shared by every endpoint that needs auth.

Scaffolding only: nothing here is wired into a route yet. Implementing
POST /auth/login (and the `get_current_user` dependency in app/deps.py that the
other endpoints will depend on) is the development sprint's work.

pbkdf2_sha256 rather than bcrypt: it is pure-Python (via hashlib), so it needs
no extra pinned dependency beyond passlib itself.
"""

from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from passlib.context import CryptContext

from app.config import JWT_ALGORITHM, JWT_EXPIRE_MINUTES, JWT_SECRET_KEY

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    """A salted hash of ``password``, safe to store in employees.password_hash."""
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    """Whether ``password`` matches a hash `hash_password` produced."""
    return pwd_context.verify(password, password_hash)


def create_access_token(subject: str, extra_claims: dict[str, Any] | None = None) -> str:
    """A signed JWT naming ``subject`` (the employee id) as `sub`."""
    now = datetime.now(UTC)
    payload: dict[str, Any] = {
        "sub": subject,
        "iat": now,
        "exp": now + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any]:
    """The claims a valid token carries; raises jwt.PyJWTError when it is not."""
    return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
