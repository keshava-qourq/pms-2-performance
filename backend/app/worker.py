"""The arq worker entrypoint: run with `arq app.worker.WorkerSettings`.

No job functions yet -- CSV bulk import, deadline/feedback-request reminders
and notification fan-out, and GDPR export/erasure processing are each the
development sprint's ticket (one queued job at a time). `functions` starts
empty so the worker process starts and connects to Redis with nothing to run
until a ticket registers one.

Whatever job a ticket adds here must be safe for arq to redeliver and run
twice.
"""

from app.queue import redis_settings


async def startup(ctx: dict) -> None:
    """Open per-worker resources (a DB session factory, an S3 client) here as jobs need them."""


async def shutdown(ctx: dict) -> None:
    """Close whatever `startup` opened."""


class WorkerSettings:
    functions: list = []
    on_startup = startup
    on_shutdown = shutdown
    redis_settings = redis_settings()
