"""The background job queue: one Redis-backed arq queue, shared by the API
(which enqueues) and the worker (app/worker.py, which runs the jobs).

Every job a ticket adds here must be safe to run twice -- arq can redeliver a
job that crashed after doing its work but before acking it.
"""

from arq import create_pool
from arq.connections import ArqRedis, RedisSettings

from app.config import REDIS_URL


def redis_settings() -> RedisSettings:
    return RedisSettings.from_dsn(REDIS_URL)


async def get_queue() -> ArqRedis:
    """A pool connected to the job queue. The caller owns it and should `await pool.close()`."""
    return await create_pool(redis_settings())
