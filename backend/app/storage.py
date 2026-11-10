"""File storage: one small module, two backends.

S3 when `S3_BUCKET` is configured (the real deployment); the local filesystem
under `MEDIA_ROOT` otherwise (tests, a laptop). Callers never branch on which
backend is active -- they call `save_bytes` / `presigned_url` and get a key
and a URL back either way.

Objects are never made public: the S3 backend always hands back a short-lived
presigned URL, never a public one.
"""

import uuid
from pathlib import Path

from app.config import AWS_REGION, MEDIA_ROOT, S3_BUCKET


def _s3_client():
    import boto3  # imported lazily so the local-filesystem path needs no AWS SDK call

    return boto3.client("s3", region_name=AWS_REGION)


def new_key(prefix: str, filename: str) -> str:
    """A collision-free storage key under ``prefix`` for an uploaded ``filename``."""
    suffix = Path(filename).suffix
    return f"{prefix.strip('/')}/{uuid.uuid4()}{suffix}"


def save_bytes(key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
    """Store ``data`` under ``key`` in whichever backend is configured."""
    if S3_BUCKET:
        _s3_client().put_object(Bucket=S3_BUCKET, Key=key, Body=data, ContentType=content_type)
        return key
    path = Path(MEDIA_ROOT) / key
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return key


def read_bytes(key: str) -> bytes:
    """The bytes stored under ``key``."""
    if S3_BUCKET:
        body = _s3_client().get_object(Bucket=S3_BUCKET, Key=key)["Body"]
        return body.read()
    return (Path(MEDIA_ROOT) / key).read_bytes()


def presigned_url(key: str, expires_in: int = 3600) -> str:
    """A short-lived URL to read ``key`` back; never a public one."""
    if S3_BUCKET:
        return _s3_client().generate_presigned_url(
            "get_object",
            Params={"Bucket": S3_BUCKET, "Key": key},
            ExpiresIn=expires_in,
        )
    # No S3 configured: the API itself serves files out of MEDIA_ROOT.
    return f"/media/{key}"
