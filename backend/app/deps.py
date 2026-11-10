"""Role-based access control: the permission matrix and the guards built on it.

Everything the API enforces about who may do what lives in one place --
``PERMISSION_MATRIX`` -- so extending it later (a new role, a new scope) means
editing this dict, not hunting through routers (NFR-002).

Role and subject always come from the verified JWT (``get_current_employee``),
never from a client-supplied header, body field or query parameter.
"""

from collections.abc import Callable

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Employee
from app.security import get_current_employee

_FORBIDDEN_DETAIL = "Forbidden"


def _forbidden() -> HTTPException:
    # A fresh exception per raise: HTTPException instances are not meant to be
    # reused/shared across requests.
    return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=_FORBIDDEN_DETAIL)


# The permission matrix (AC-006): one row per role, naming what it may reach.
# "admin" gates /admin/* (full employee/hierarchy administration). "scope"
# gates employee-scoped reads: "all" (hr_admin), "self_and_direct_reports"
# (manager -- own data plus direct reports' goals and feedback), or
# "self_only" (employee -- own data only).
PERMISSION_MATRIX: dict[str, dict[str, object]] = {
    "hr_admin": {"admin": True, "scope": "all"},
    "manager": {"admin": False, "scope": "self_and_direct_reports"},
    "employee": {"admin": False, "scope": "self_only"},
}


def require_role(*roles: str) -> Callable[..., Employee]:
    """Build a dependency that only lets the given roles through.

    Denial is a flat 403 {"detail": "Forbidden"}: it never hints at what the
    caller lacked or whether the resource exists.
    """

    def _dependency(current: Employee = Depends(get_current_employee)) -> Employee:  # noqa: B008
        if current.role not in roles:
            raise _forbidden()
        return current

    return _dependency


def _is_hr_admin(role: str) -> bool:
    return bool(PERMISSION_MATRIX.get(role, {}).get("admin", False))


# /admin/* is hr_admin only (AC-004, AC-006, NFR-002). Driven by the matrix so
# adding a second administrative role later is a one-line matrix edit.
require_hr_admin = require_role(*[r for r, perms in PERMISSION_MATRIX.items() if perms["admin"]])


def require_self_or_report(param_name: str = "id") -> Callable[..., Employee]:
    """Build a dependency guarding an employee-scoped path parameter.

    hr_admin reaches any employee. A manager reaches themselves and any
    employee whose ``manager_id`` is their own id -- resolved with a single
    indexed query on ``manager_id`` (NFR-007), never a scan of all employees.
    An employee reaches only themselves. Any other case is a flat 403 that
    does not reveal whether the target employee exists (AC-005, NFR-002).
    """

    def _dependency(
        request: Request,
        current: Employee = Depends(get_current_employee),  # noqa: B008
        db: Session = Depends(get_db),  # noqa: B008
    ) -> Employee:
        target_id = request.path_params.get(param_name)
        scope = PERMISSION_MATRIX.get(current.role, {}).get("scope")

        if scope == "all":
            return current
        if target_id is not None and target_id == current.id:
            return current
        if scope == "self_and_direct_reports" and target_id is not None:
            is_direct_report = (
                db.query(Employee.id)
                .filter(Employee.id == target_id, Employee.manager_id == current.id)
                .first()
                is not None
            )
            if is_direct_report:
                return current

        raise _forbidden()

    return _dependency
