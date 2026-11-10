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
| [Architecture](architecture/README.md) | 6 entries |
| [Development](development/README.md) | 18 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 5 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 52 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 17 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- AC-006 notes the exact permission matrix per role is still 'to be refined' — not finalized anywhere in this input.
- The organisation's specific data retention policy referenced by AC-037 and NFR-004 is not defined anywhere in this input.
- Which processing purposes require consent, and the exact consent-collection flow, is not specified beyond AC-040's general statement.

### Architecture

- Architecture does not specify the export delivery mechanism in detail (e.g., synchronous response vs. async download link) beyond 'worker processes ... GDPR export/erasure processing'.

### Development

- Backlog items carry no explicit sprint field in the input; this sprint's item list was inferred from matching each item's subject matter to the sprint goal text (cross-checked by points summing exactly to the 20-point capacity).
- No implementation status (in-progress/done/blocked), commits, or PR references were provided for any item in this sprint.
- Sprint-to-item mapping inferred from goal text, not an explicit input field.
- No implementation status was reported for this sprint's items.

### Testing

- Testing phase has not started: no test plans, cases, or execution results are available to document.

### Deployment

- Deployment phase has not started: no deployment records, environments, or release history were provided.

### Maintenance

- Maintenance phase has not started: the system has not reached post-deployment, so there is nothing to report.
<!-- sdlc:auto:end open-gaps -->
