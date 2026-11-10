# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 plan (capacity 20) targets login, RBAC enforcement, and core employee directory CRUD with self-service profile view.

Goal: 'Ship login, role-based access enforcement, and core employee directory CRUD with self-service profile view.' Capacity: 20 points. Part of approved plan version 1. Note: the plan input does not explicitly map backlog items to sprints; alignment with US-001/US-002/US-003/US-006 is inferred from the stated sprint goal text, not an explicit item-to-sprint assignment in the source.

**Related:** US-001, US-002, US-003, US-006

### PLAN-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 plan (capacity 20) targets reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.

Goal: 'Add reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.' Capacity: 20 points. Part of approved plan version 1. Item-to-sprint mapping inferred from goal text only; the plan input does not give an explicit assignment table.

**Related:** US-004, US-007, US-011, US-015, US-016, US-017

### PLAN-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 plan (capacity 20) targets bulk CSV import, goal progress tracking, and feedback requests.

Goal: 'Deliver bulk CSV import, goal progress tracking, and feedback requests.' Capacity: 20 points. Part of approved plan version 1. Item-to-sprint mapping inferred from goal text only.

**Related:** US-005, US-008, US-012

### PLAN-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 plan (capacity 20) targets manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.

Goal: 'Deliver manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.' Capacity: 20 points. Part of approved plan version 1. Item-to-sprint mapping inferred from goal text only.

**Related:** US-009, US-010, US-013, US-015

### PLAN-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 plan (capacity 20) targets in-app notifications for feedback requests and goal updates.

Goal: 'Deliver in-app notifications for feedback requests and goal updates.' Capacity: 20 points. Part of approved plan version 1.

**Related:** US-014

### PLAN-EPIC-001 · approved · source: plan:EPIC-001

Epic covering authentication and role-based access control.

Epic: Authentication and Role-Based Access Control. Contains: US-001 Sign in with email and password (5 pts, backend-agent); US-002 Role-based access enforcement (8 pts, security-agent) with sub-tasks US-002-T1 Implement role-permission dependency/middleware (backend-agent), US-002-T2 Add manager direct-report scoping (backend-agent), US-002-T3 Add HR Admin scope checks (backend-agent), US-002-T4 Build RBAC regression test suite (qa-agent).

**Related:** US-001, US-002

### PLAN-EPIC-002 · approved · source: plan:EPIC-002

Epic covering employee profile records and reporting hierarchy, including bulk import.

Epic: Employee Profile Records and Reporting Hierarchy. Contains: US-003 Create and edit employee profiles (5 pts, backend-agent); US-004 Maintain reporting hierarchy (3 pts, backend-agent); US-005 Bulk import and update employees via CSV (13 pts, backend-agent) with sub-tasks US-005-T1 Add CSV upload endpoint with S3 storage, US-005-T2 Implement import worker job, US-005-T3 Add import job status endpoint (all backend-agent), US-005-T4 Build import upload and results UI (frontend-agent); US-006 View own employee profile (2 pts, frontend-agent).

**Related:** US-003, US-004, US-005, US-006

### PLAN-EPIC-003 · approved · source: plan:EPIC-003

Epic covering OKR-style goal and objective setting and tracking.

Epic: Goal and Objective Setting and Tracking (OKR-style). Contains: US-007 Create goals and objectives (5 pts, backend-agent); US-008 Track and update goal progress (3 pts, backend-agent); US-009 Manager review of direct reports' goals (5 pts, backend-agent).

**Related:** US-007, US-008, US-009

### PLAN-EPIC-004 · approved · source: plan:EPIC-004

Epic covering the personal dashboard of goals and progress.

Epic: Personal Dashboard of Goals and Progress. Contains: US-010 View personal goals and progress dashboard (5 pts, frontend-agent).

**Related:** US-010

### PLAN-EPIC-005 · approved · source: plan:EPIC-005

Epic covering continuous feedback writing, requesting, and viewing.

Epic: Continuous Feedback. Contains: US-011 Write feedback for a colleague (3 pts, backend-agent); US-012 Request feedback (3 pts, backend-agent); US-013 View feedback given and received (3 pts, frontend-agent).

**Related:** US-011, US-012, US-013

### PLAN-EPIC-006 · approved · source: plan:EPIC-006

Epic covering in-app notifications.

Epic: In-App Notifications. Contains: US-014 Receive in-app notifications (5 pts, backend-agent).

**Related:** US-014

### PLAN-EPIC-007 · approved · source: plan:EPIC-007

Epic covering GDPR-level data protection: access/export, erasure, and consent/minimisation.

Epic: GDPR-Level Data Protection. Contains: US-015 Access and export own personal data (5 pts, backend-agent); US-016 Handle data erasure requests (5 pts, security-agent); US-017 Consent and data minimisation (3 pts, security-agent).

**Related:** US-015, US-016, US-017

### DEV-RUN-SUMMARY · draft · source: dev:run

The development run for this phase is marked completed overall, but ticket-level outcomes show mostly failures: 1 delivered, 2 failed, 1 skipped, plus 1 failed fix-up ticket.

Run status: completed. Ticket outcomes: US-001 Sign in with email and password = failed (no commit); US-002 Role-based access enforcement = failed (no commit); US-003 Create and edit employee profiles = delivered (commit e8b243f8df77630091e75bebed0194425e479515); US-006 View own employee profile = skipped (no commit); US-FIX-1 Fix the scaffold's failing checks = failed (no commit). No other tickets from the plan (US-004, US-005, US-007 through US-017) appear in this run's results.

**Related:** US-001, US-002, US-003, US-006

### DEV-US-001 · draft · source: dev:US-001

Implementation attempt for email/password sign-in failed; no code was committed.

Ticket US-001 'Sign in with email and password' ended with status=failed. No commit hash recorded. Backend-agent was the assigned role per plan. No further failure rationale was provided in the input.

**Related:** US-001

### DEV-US-002 · draft · source: dev:US-002

Implementation attempt for role-based access enforcement failed; no code was committed.

Ticket US-002 'Role-based access enforcement' ended with status=failed. No commit hash recorded. Security-agent was the assigned role per plan; related sub-tasks (US-002-T1 through T4) covering RBAC middleware, manager scoping, HR Admin scope checks, and a regression test suite were planned but their individual outcomes were not reported in this run's input. No further failure rationale was provided.

**Related:** US-002

### DEV-US-003 · approved · source: dev:US-003

Create and edit employee profiles was successfully delivered and committed.

Ticket US-003 'Create and edit employee profiles' ended with status=delivered. Commit: e8b243f8df77630091e75bebed0194425e479515. Backend-agent was the assigned role per plan. No further implementation detail (fields, endpoints, UI) was provided in this run's input.

**Related:** US-003

### DEV-US-006 · draft · source: dev:US-006

Work on viewing one's own employee profile was skipped in this run.

Ticket US-006 'View own employee profile' ended with status=skipped. No commit hash recorded. Frontend-agent was the assigned role per plan. No reason for the skip was provided in the input.

**Related:** US-006

### DEV-US-FIX-1 · draft · source: dev:US-FIX-1

A fix-up ticket to resolve the scaffold's failing checks also failed.

Ticket US-FIX-1 'Fix the scaffold's failing checks' ended with status=failed. No commit hash recorded. This ticket does not correspond to a specific user story from the known requirement set; it addressed scaffold-level check failures. No further detail on which checks or why it failed was provided in the input.
<!-- sdlc:auto:end narrative -->
