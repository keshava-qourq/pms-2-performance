"""Redis cache client.

Caches dashboard aggregates and anything else worth not recomputing on every
request. Every key here is disposable: a failed connection or a missing key
makes a caller recompute, never fail. Nothing in this module raises.
"""

import redis

from app.config import REDIS_URL

_client: redis.Redis | None = None


def get_client() -> redis.Redis:
    """The shared Redis client, created on first use."""
    global _client
    if _client is None:
        _client = redis.from_url(REDIS_URL, socket_connect_timeout=2, socket_timeout=2)
    return _client


def cache_get(key: str) -> str | None:
    """The cached value for ``key``, or None when it is missing or Redis is down."""
    try:
        value = get_client().get(key)
    except redis.RedisError:
        return None
    return value.decode() if value is not None else None


def cache_set(key: str, value: str, ex: int = 300) -> None:
    """Cache ``value`` under ``key`` for ``ex`` seconds; silently does nothing if Redis is down."""
    try:
        get_client().set(key, value, ex=ex)
    except redis.RedisError:
        pass


def cache_delete(key: str) -> None:
    """Invalidate ``key``; silently does nothing if Redis is down."""
    try:
        get_client().delete(key)
    except redis.RedisError:
        pass
