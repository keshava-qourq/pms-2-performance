"""Unit tests for password hashing and JWT helpers."""

import jwt
import pytest

from app.models import Employee
from app.security import (
    JWT_SECRET_KEY,
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)


def test_ac001_password_is_hashed_not_plaintext() -> None:
    hashed = hash_password("correct horse battery staple")

    assert hashed != "correct horse battery staple"
    assert verify_password("correct horse battery staple", hashed)
    assert not verify_password("wrong password", hashed)


def test_ac001_access_token_carries_sub_role_and_expiry() -> None:
    employee = Employee(
        id="emp-1", name="A", email="a@example.com", role="manager", password_hash="x"
    )

    token = create_access_token(employee)
    payload = decode_access_token(token)

    assert payload["sub"] == "emp-1"
    assert payload["role"] == "manager"
    assert "exp" in payload


def test_me_rejects_token_signed_with_wrong_secret() -> None:
    bogus = jwt.encode({"sub": "emp-1", "role": "employee"}, "not-the-secret", algorithm="HS256")

    with pytest.raises(jwt.PyJWTError):
        decode_access_token(bogus)

    assert JWT_SECRET_KEY != "not-the-secret"
