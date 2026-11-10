"""The password-hashing and JWT helpers every auth ticket will build on."""

import jwt
import pytest

from app.security import create_access_token, decode_access_token, hash_password, verify_password


def test_password_hash_round_trips() -> None:
    hashed = hash_password("correct horse battery staple")

    assert hashed != "correct horse battery staple"
    assert verify_password("correct horse battery staple", hashed)
    assert not verify_password("wrong password", hashed)


def test_access_token_round_trips_the_subject() -> None:
    token = create_access_token("employee-id-123")

    claims = decode_access_token(token)

    assert claims["sub"] == "employee-id-123"


def test_tampered_token_is_rejected() -> None:
    token = create_access_token("employee-id-123")

    with pytest.raises(jwt.PyJWTError):
        decode_access_token(token + "tampered")
