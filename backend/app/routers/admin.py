"""HR-Admin-only endpoints (AC-004, AC-006).

The employee directory itself lives in backend/app/routers/employees.py
alongside the other employee-scoped handlers; this router is kept as the
mount point for future /admin/* endpoints that are not employee-directory
routes.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])
