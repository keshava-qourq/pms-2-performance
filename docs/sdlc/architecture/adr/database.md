<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-30

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQL Server

## Decision Outcome

Chosen option: PostgreSQL 16, because Enforces the highly relational model (employees, hierarchy, goals, key results, feedback) transactionally, runs dashboard aggregation queries, and supports row-level controls and auditability for GDPR access/erasure.

## Consequences

Expensive org-wide aggregates are cached in Redis rather than recomputed each view (NFR-005).
<!-- sdlc:auto:end adr -->