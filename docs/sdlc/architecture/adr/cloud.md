<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-30

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Keeps all data in a chosen EU region with managed RDS PostgreSQL, S3 and VPC networking to lock down an internal tool and deliver the GDPR residency and deletion story.

## Consequences

Single-region for simplicity and residency; multi-region HA is deferred for this MVP.
<!-- sdlc:auto:end adr -->