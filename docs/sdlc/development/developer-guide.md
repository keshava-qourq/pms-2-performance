# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `5281d29` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
PMS 2 performance is a generated two-app monorepo for a performance management system: a `frontend/` Vite + React 19 single-page app containing the fully approved, reviewed UI (currently running on seeded sample data, not live API calls), and a `backend/` FastAPI 0.115 service that is still an early scaffold -- it exposes only a `/health` endpoint plus the plumbing (SQLAlchemy models/Base, Pydantic stub schemas, CORS) needed to add real routes. The backend defaults to a local SQLite file so it runs without any database server, while the approved architecture targets PostgreSQL 16, Redis, and AWS for deployment; `docker-compose.yml` provides local Postgres and Redis containers for when that wiring is added.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm/Vite, frontend)
- npm
- Python 3.12
- pip
- Docker and Docker Compose (optional, for local Postgres/Redis via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd backend
3. pip install -r requirements.txt
4. uvicorn app.main:app --reload   # starts the API on http://localhost:8000
5. cd ../frontend
6. npm install
7. npm run dev   # starts the SPA, default http://localhost:5173
8. (optional) from the repo root: docker-compose up -d   # starts Postgres on 5432 and Redis containers
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Runs the Vite dev server for the React SPA |
| frontend build | `npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI service with auto-reload (from backend/) |
| docker services | `docker-compose up` | Starts the Postgres and Redis containers defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Vite + React 19 SPA containing the approved, generated screens, currently rendering seeded sample data |
| `frontend/src/screens` | One module per approved screen (Dashboard, Goals, Feedback, MyProfile, Employees, Login) |
| `frontend/src/lib` | Shared API client (api.ts), UI components/icons, brand tokens, navigation helpers |
| `frontend/e2e` | Playwright acceptance tests |
| `backend/` | FastAPI service scaffold (currently only a health check implemented) |
| `backend/app` | Application code: main.py (entrypoint/CORS/startup), database.py (engine/session), models.py (SQLAlchemy Base, currently empty), schemas.py (Pydantic stub response), services.py, routers/ (empty, one router per future component) |
| `backend/tests` | Pytest tests (currently just the health check) |
| `.quorq/` | Platform handoff metadata, not application code |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are generated as typed stubs (StubResponse) so the service and its OpenAPI docs stay valid before handlers are implemented
- One FastAPI router per architecture component that owns endpoints, mounted under backend/app/routers/
- SQLAlchemy models all inherit from the shared Base declared in app/database.py; models.py is imported in main.py before create_all so tables register
- Database connection is environment-driven via DATABASE_URL, defaulting to local SQLite so the service runs without external dependencies
- CORS allowed origins are environment-driven via ALLOWED_ORIGINS (comma-separated), falling back to the Vite dev server origins
- Frontend screens map one-to-one to routes declared in App.tsx, each screen living in its own file under src/screens
- Frontend API access is centralized in src/lib/api.ts (apiFetch), using VITE_API_BASE_URL and VITE_API_SECRET_KEY as the bearer token, though screens don't yet call it
- Frontend build intentionally does not typecheck; `npm run typecheck` (tsc --noEmit) is separate and should be run before relying on type safety
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm run test` | Runs Vitest component tests located beside the components they cover |
| frontend e2e tests | `npm run test:e2e` | Runs Playwright acceptance tests from frontend/e2e; builds/serves the app locally unless E2E_BASE_URL is set |
| install e2e browser | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app (CI gate) |
| backend tests | `pytest` | Runs backend pytest suite (run from backend/, uses pythonpath=. from pytest.ini) |
| backend lint | `ruff check .` | Lints the backend Python code |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend requests to the API fail with a CORS error | Set ALLOWED_ORIGINS on the backend to include the frontend's origin (comma-separated); by default only http://localhost:5173 and http://127.0.0.1:5173 are allowed |
| `npm run build` succeeds but the app has type errors | Run `npm run typecheck` (tsc --noEmit) separately, since the Vite build does not typecheck |
| `pytest` fails with `ModuleNotFoundError: app` | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` setting applies |
| `npm run test:e2e` fails because no browser is installed | Run `npm run test:e2e:install` first to fetch Chromium for Playwright |
| `docker-compose up` fails with a port conflict on 6379 | docker-compose.yml defines two Redis services (redis-queue and redis) both mapping host port 6379; edit the compose file to use a different host port for one of them before starting both |
<!-- sdlc:auto:end troubleshooting -->
