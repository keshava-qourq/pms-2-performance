<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-30

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Hosts the business logic over structured data — RBAC, goal approval flow, CSV import, GDPR export/erasure — with Pydantic request validation enforcing data minimisation and strict input handling.

## Consequences

Background and scheduled work is offloaded to an arq worker since FastAPI handles request/response only.
<!-- sdlc:auto:end adr -->