# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Ship login, role-based access enforcement, and core employee directory CRUD with self-service profile view.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign in with email and password | 5 | backend-agent | — |
| US-002 | Story | Role-based access enforcement | 8 | security-agent | US-001 |
| ↳ US-002-T1 | Task | Implement role-permission dependency/middleware | — | backend-agent | — |
| ↳ US-002-T2 | Task | Add manager direct-report scoping | — | backend-agent | — |
| ↳ US-002-T3 | Task | Add HR Admin scope checks | — | backend-agent | — |
| ↳ US-002-T4 | Task | Build RBAC regression test suite | — | qa-agent | — |
| US-003 | Story | Create and edit employee profiles | 5 | backend-agent | US-001, US-002 |
| US-006 | Story | View own employee profile | 2 | frontend-agent | US-001, US-003 |

## Sprint 2: Sprint 2

Add reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Maintain reporting hierarchy | 3 | backend-agent | US-003 |
| US-007 | Story | Create goals and objectives | 5 | backend-agent | US-001, US-002, US-003 |
| US-011 | Story | Write feedback for a colleague | 3 | backend-agent | US-001, US-003 |
| US-016 | Story | Handle data erasure requests | 5 | security-agent | US-003 |
| US-017 | Story | Consent and data minimisation | 3 | security-agent | US-003 |

## Sprint 3: Sprint 3

Deliver bulk CSV import, goal progress tracking, and feedback requests.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Bulk import and update employees via CSV | 13 | backend-agent | US-003, US-004 |
| ↳ US-005-T1 | Task | Add CSV upload endpoint with S3 storage | — | backend-agent | — |
| ↳ US-005-T2 | Task | Implement import worker job | — | backend-agent | — |
| ↳ US-005-T3 | Task | Add import job status endpoint | — | backend-agent | — |
| ↳ US-005-T4 | Task | Build import upload and results UI | — | frontend-agent | — |
| US-008 | Story | Track and update goal progress | 3 | backend-agent | US-007 |
| US-012 | Story | Request feedback | 3 | backend-agent | US-011 |

## Sprint 4: Sprint 4

Deliver manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | Manager review of direct reports' goals | 5 | backend-agent | US-007, US-004, US-002 |
| US-010 | Story | View personal goals and progress dashboard | 5 | frontend-agent | US-007, US-008 |
| US-013 | Story | View feedback given and received | 3 | frontend-agent | US-011, US-012 |
| US-015 | Story | Access and export own personal data | 5 | backend-agent | US-003, US-007, US-011 |

## Sprint 5: Sprint 5

Deliver in-app notifications for feedback requests and goal updates.

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-014 | Story | Receive in-app notifications | 5 | backend-agent | US-012, US-009 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
