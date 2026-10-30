# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `015a647` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
PMS 2 performance is a generated two-app repository for a performance management system: a FastAPI backend and a Vite + React 19 single-page frontend. The frontend contains the full set of approved, reviewed screens but currently renders seeded sample data rather than calling the API. The backend has no approved architecture yet beyond a health check — it is a scaffold with SQLAlchemy/Pydantic wiring, a stub router pattern, and a SQLite default database, ready for real models and endpoints to be added.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm, Vite, React 19 toolchain)
- Python 3.12
- pip
- Docker and Docker Compose (optional, for Postgres/Redis via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd backend && pip install -r requirements.txt
3. cd frontend && npm install
4. (optional) from the repo root, run docker-compose up -d to start Postgres and Redis containers if DATABASE_URL/Redis env vars are pointed at them
5. Start the backend: cd backend && uvicorn app.main:app --reload
6. Start the frontend: cd frontend && npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI service with auto-reload; serves /health and creates SQLite tables on startup |
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite; does not typecheck |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally |
| docker services | `docker-compose up -d` | Starts the Postgres (db) and Redis containers defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | FastAPI service: entrypoint, DB session management, models, schemas, services, and generated routers |
| `backend/app` | Application code — main.py (app + CORS + startup), database.py (engine/session), models.py (SQLAlchemy models, currently empty), schemas.py (Pydantic models, incl. StubResponse), services.py, routers/ (one router per architecture component, currently empty) |
| `backend/tests` | Pytest test suite (test_health.py) |
| `frontend/` | Vite + React 19 SPA containing the approved app design, currently running on seeded sample data |
| `frontend/src` | App source: entry point (main.tsx), global styles (index.css), and lib/ (api client, shared UI components, icons, navigation helpers) |
| `frontend/e2e` | Playwright end-to-end specs |
| `.quorq/` | Platform metadata (handoff.json) used internally by the Quorq AI SDLC platform, not application code |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routers are generated one-per-architecture-component, with one route per endpoint declared in the API spec
- Unimplemented backend routes return a typed StubResponse rather than raising, keeping the service startable and its OpenAPI doc complete
- Backend tables are created from SQLAlchemy models via Base.metadata.create_all on startup (no migrations yet)
- Database defaults to local SQLite (app.db) via DATABASE_URL env var, swappable to Postgres/MySQL without code changes
- CORS origins are configurable via ALLOWED_ORIGINS (comma-separated), defaulting to the Vite dev server origins
- Frontend API access is centralized in src/lib/api.ts, using VITE_API_BASE_URL and VITE_API_SECRET_KEY (bearer token) build-time env vars; screens do not yet call it
- Frontend component tests (Vitest) live beside the components they cover, under src/; Playwright e2e specs live separately under e2e/
- Frontend build (npm run build) does not typecheck; npm run typecheck runs tsc --noEmit separately
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `cd backend && pytest` | Runs the pytest suite (currently covers the /health endpoint) |
| backend lint | `cd backend && ruff check .` | Lints the backend with Ruff |
| backend format | `cd backend && ruff format .` | Formats backend code with Ruff |
| frontend unit | `cd frontend && npm run test` | Runs Vitest component tests |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit to catch type errors the build skips |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the frontend app |
| frontend e2e install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser required by Playwright |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests; without E2E_BASE_URL it builds/serves the frontend and expects a backend venv at backend/.venv |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend can't reach the backend / CORS errors in the browser console | Ensure the backend is running and set ALLOWED_ORIGINS to include the frontend's origin (defaults to http://localhost:5173 in dev) |
| `pytest` fails with ModuleNotFoundError: No module named 'app' | Run pytest from inside backend/ (not the repo root) — pytest.ini sets pythonpath=. relative to that directory |
| `docker-compose up` fails with a port conflict on 6379 | docker-compose.yml defines two Redis services (redis-queue and redis) both mapped to host port 6379; edit one of the host port mappings before starting the stack |
| `npm run build` succeeds but deployment/typecheck fails | Run `npm run typecheck` (tsc --noEmit) separately, since the Vite build does not typecheck the app |
| `npm run test:e2e` can't start the backend webServer | Create a Python virtualenv at backend/.venv with the backend/requirements.txt packages installed before running the e2e suite locally, or set E2E_BASE_URL to point at an already-running deployment |
<!-- sdlc:auto:end troubleshooting -->
