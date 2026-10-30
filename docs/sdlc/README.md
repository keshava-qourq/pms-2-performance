# PMS 2 performance — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
build a performance management system

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 1 entry |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | not generated yet |
| [API (OpenAPI)](architecture/api/openapi.yaml) | not generated yet |
| [Decisions (ADRs)](architecture/adr/README.md) | 0 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 17 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
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

- Architecture phase has not started -- no design exists yet to translate the approved requirements and tech stack into a system design.
- No data model exists yet for employees, reporting hierarchy, goals/key results, feedback, or notifications.
- No design yet shows how AWS region pinning and GDPR data-residency requirements (NFR-004) will be implemented.

### Development

- Development phase has not started -- no code, tickets, or sprint plans exist yet for any of the 17 approved user stories.

### Testing

- Testing phase has not started -- none of the 40 acceptance criteria defined in requirements have recorded test coverage or results.

### Deployment

- No deployment recorded yet -- AWS environment, RDS PostgreSQL, S3 bucket, and Redis provisioning have not been documented.

### Maintenance

- No maintenance notes exist yet because the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
