"""Error codes: one named constant per error a story's endpoints can return.

Each constant pairs the HTTP status with the exact message the client sees, so
a route can raise it verbatim and declare it in its OpenAPI contract from the
same source of truth, rather than repeating a status code and a string at
every call site.
"""

from dataclasses import dataclass

from fastapi import HTTPException, status


@dataclass(frozen=True)
class ErrorCode:
    status_code: int
    detail: str

    def raise_as_http(self) -> HTTPException:
        """A fresh HTTPException per raise: instances are not meant to be
        reused/shared across requests."""
        return HTTPException(status_code=self.status_code, detail=self.detail)

    def openapi_response(self) -> dict:
        return {self.status_code: {"description": self.detail}}


# POST /auth/login -- AC-002, NFR-001: one generic error for any failed
# sign-in attempt. Never reveals whether the email or the password was wrong.
AUTH_INVALID_CREDENTIALS = ErrorCode(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid email or password",
)
