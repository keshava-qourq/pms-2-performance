"""Environment-backed settings, read once at import time.

Every value has a working local default so a bare `uvicorn app.main:app` runs
with nothing configured. The platform injects the real value for each of these
in every deployment; nothing here is ever a secret value baked into code.
"""

import os

# The frontend's origin(s), comma separated. CORS in app/main.py already reads
# this directly; kept here too so other modules (and tests) have one place to
# read it from without reaching into main.
ALLOWED_ORIGINS: list[str] = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# The shared bearer the generated frontend sends on every call (apiFetch). It is
# public -- the platform bakes the same value into the frontend build -- so it
# must never be used to sign anything; it only gates "is this our frontend".
SECRET_KEY = os.getenv("SECRET_KEY", "dev-shared-secret")

# Private: signs JWT access tokens and sessions. Never sent to the frontend.
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-change-in-deployment")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))

# A writable directory that survives redeploys; used as the local storage
# backend when S3_BUCKET is unset (see app/storage.py).
MEDIA_ROOT = os.getenv("MEDIA_ROOT", "./media")

# Object storage. When S3_BUCKET is unset, app/storage.py falls back to
# MEDIA_ROOT -- this is the only place that branch is decided.
S3_BUCKET = os.getenv("S3_BUCKET", "")
AWS_REGION = os.getenv("AWS_REGION", "eu-west-1")

# Cache, sessions and the background job queue all share this one Redis.
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
