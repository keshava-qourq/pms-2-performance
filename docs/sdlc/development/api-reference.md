# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | health | `backend/app/main.py:43` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /admin/imports/{job_id}
- GET /dashboard
- GET /employees/{id}/goals
- GET /feedback
- GET /me
- GET /notifications
- PATCH /admin/employees/{id}
- PATCH /goals/{id}/key-results/{kr_id}
- POST /admin/employees
- POST /admin/employees/{id}/erase
- POST /admin/imports
- POST /auth/login
- POST /feedback
- POST /feedback/requests
- POST /goals
- POST /goals/{id}/review
- POST /goals/{id}/submit
- POST /me/consent
- POST /me/data-export
- POST /notifications/{id}/read
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `015a647`
<!-- sdlc:auto:end source -->
