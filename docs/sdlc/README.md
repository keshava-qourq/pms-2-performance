# PMS 2 performance — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
build a performance management system

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 15 entries |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 17 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- AC-006 explicitly flags the exact permission matrix per role as unrefined -- needs a definitive role/action matrix before design.
- SSO is deferred per AC-003; confirm this remains acceptable for go-live before architecture begins.
- HRIS sync (originally BambooHR) is confirmed out of scope -- no gap, but noted here for traceability since it was an open assumption in US-005.
- The full set of goal/approval status values (e.g. draft, submitted, approved, changes-requested, complete, closed) is not enumerated -- needed before data modeling.
- The organisation's specific data retention policy referenced in AC-037 is not itself defined in the inputs -- needed to implement erasure correctly.
- The mechanism and UI for recording/retrieving consent status (AC-040) is not detailed beyond 'recorded and retrievable'.
- GDPR-level requirements (US-015/016/017, NFR-004) have no architecture, implementation, or test coverage yet since those phases have not started -- compliance cannot be confirmed end-to-end until they do.
- None of the NFRs have yet been verified against an architecture or test plan since those phases have not started.
- No architecture documentation exists yet to show how these approved technologies are actually composed into services/components.

### Architecture

- No requirements-phase input was supplied alongside this architecture, so explicit links from architecture decisions to US-001..US-017 cannot be confirmed -- only inferred from functional description.
- No approver name or approval date given for the v1 architecture sign-off.
- No explicit requirement id is attached to NFR-001 or this path in the provided input; likely maps to an auth/security-related user story but this cannot be confirmed without requirements-phase input.
- GDPR: 'right to erasure' and 'right of access' controls -- the architecture documents export/erasure/audit-logging mechanisms, but retention-policy specifics (how long data is kept before/after erasure) are referenced only generically as 'per retention policy' with no concrete policy definition in this input.

### Development

- Development phase has not started -- no code, tickets, or sprint plans exist yet for any of the 17 approved user stories.

### Testing

- Testing phase has not started -- none of the 40 acceptance criteria defined in requirements have recorded test coverage or results.

### Deployment

- No deployment recorded yet -- AWS environment, RDS PostgreSQL, S3 bucket, and Redis provisioning have not been documented.

### Maintenance

- No maintenance notes exist yet because the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
