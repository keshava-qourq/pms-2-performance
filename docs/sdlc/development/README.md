# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-001 · approved · source: plan:PLAN-001

Development plan version 1 is approved, organizing all 17 user stories into 7 epics across 5 sprints of capacity 20 each.

Plan status: approved, version 1. Scope: EPIC-001 Authentication and RBAC, EPIC-002 Employee Profile Records and Reporting Hierarchy, EPIC-003 Goal/Objective Setting and Tracking, EPIC-004 Personal Dashboard, EPIC-005 Continuous Feedback, EPIC-006 In-App Notifications, EPIC-007 GDPR-Level Data Protection. No approver name or approval date was provided.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017

- ⚠ No approver identity or approval date given.
- ⚠ No explicit per-item sprint assignment was provided in the input -- sprint item lists in this documentation are inferred from matching sprint goal text to story titles, not from a direct mapping field.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 targets login, role-based access enforcement, and core employee directory CRUD with self-service profile view.

Goal: 'Ship login, role-based access enforcement, and core employee directory CRUD with self-service profile view.' Capacity: 20 points. Inferred items (by goal-text match, not explicit mapping): US-001 Sign in with email and password (5 pts, backend-agent); US-002 Role-based access enforcement (8 pts, security-agent) with tasks US-002-T1 role-permission middleware, US-002-T2 manager direct-report scoping, US-002-T3 HR Admin scope checks (all backend-agent), US-002-T4 RBAC regression test suite (qa-agent); US-003 Create and edit employee profiles (5 pts, backend-agent); US-006 View own employee profile (2 pts, frontend-agent). Inferred point total = 20, matching stated capacity exactly.

**Related:** US-001, US-002, US-003, US-006

- ⚠ No status (not started/in progress/done) reported for any item in this sprint.
- ⚠ Item-to-sprint assignment is inferred, not stated explicitly in the input.

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 targets reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.

Goal: 'Add reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.' Capacity: 20 points. Inferred items: US-004 Maintain reporting hierarchy (3 pts, backend-agent); US-007 Create goals and objectives (5 pts, backend-agent); US-011 Write feedback for a colleague (3 pts, backend-agent); US-016 Handle data erasure requests (5 pts, security-agent); US-017 Consent and data minimisation (3 pts, security-agent). Inferred point total = 19 vs stated capacity 20.

**Related:** US-004, US-007, US-011, US-016, US-017

- ⚠ No status reported for any item in this sprint.
- ⚠ Item-to-sprint assignment is inferred, not stated explicitly in the input.
- ⚠ Inferred points (19) do not exactly match stated capacity (20) -- may indicate an unlisted or differently-scoped item.

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 targets bulk CSV import, goal progress tracking, and feedback requests.

Goal: 'Deliver bulk CSV import, goal progress tracking, and feedback requests.' Capacity: 20 points. Inferred items: US-005 Bulk import and update employees via CSV (13 pts, backend-agent) with tasks US-005-T1 CSV upload endpoint with S3 storage, US-005-T2 import worker job, US-005-T3 import job status endpoint (all backend-agent), US-005-T4 import upload and results UI (frontend-agent); US-008 Track and update goal progress (3 pts, backend-agent); US-012 Request feedback (3 pts, backend-agent). Inferred point total = 19 vs stated capacity 20.

**Related:** US-005, US-008, US-012

- ⚠ No status reported for any item in this sprint.
- ⚠ Item-to-sprint assignment is inferred, not stated explicitly in the input.
- ⚠ Inferred points (19) do not exactly match stated capacity (20).

### SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 targets manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.

Goal: 'Deliver manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.' Capacity: 20 points. Inferred items: US-009 Manager review of direct reports' goals (5 pts, backend-agent); US-010 View personal goals and progress dashboard (5 pts, frontend-agent); US-013 View feedback given and received (3 pts, frontend-agent); US-015 Access and export own personal data (5 pts, backend-agent). Inferred point total = 18 vs stated capacity 20.

**Related:** US-009, US-010, US-013, US-015

- ⚠ No status reported for any item in this sprint.
- ⚠ Item-to-sprint assignment is inferred, not stated explicitly in the input.
- ⚠ Inferred points (18) do not exactly match stated capacity (20).

### SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 targets in-app notifications for feedback requests and goal updates.

Goal: 'Deliver in-app notifications for feedback requests and goal updates.' Capacity: 20 points. Inferred items: US-014 Receive in-app notifications (5 pts, backend-agent). Inferred point total = 5 vs stated capacity 20.

**Related:** US-014

- ⚠ No status reported for this sprint's item.
- ⚠ Item-to-sprint assignment is inferred, not stated explicitly in the input.
- ⚠ Inferred points (5) are well below stated capacity (20) -- either additional unlisted work is planned for this sprint or capacity is significantly underutilized; input does not clarify which.

### EPIC-001 · approved · source: plan:EPIC-001

Authentication and Role-Based Access Control epic covering sign-in and enforcement of role-based permissions.

Contains US-001 Sign in with email and password (5 pts, backend-agent) and US-002 Role-based access enforcement (8 pts, security-agent). US-002 is broken into tasks: US-002-T1 Implement role-permission dependency/middleware (backend-agent), US-002-T2 Add manager direct-report scoping (backend-agent), US-002-T3 Add HR Admin scope checks (backend-agent), US-002-T4 Build RBAC regression test suite (qa-agent).

**Related:** US-001, US-002

- ⚠ No completion/test status reported for any item in this epic.

### EPIC-002 · approved · source: plan:EPIC-002

Employee Profile Records and Reporting Hierarchy epic covering profile CRUD, hierarchy maintenance, bulk CSV import, and self-service profile view.

Contains US-003 Create and edit employee profiles (5 pts, backend-agent); US-004 Maintain reporting hierarchy (3 pts, backend-agent); US-005 Bulk import and update employees via CSV (13 pts, backend-agent), broken into tasks US-005-T1 CSV upload endpoint with S3 storage, US-005-T2 import worker job, US-005-T3 import job status endpoint (all backend-agent), and US-005-T4 import upload and results UI (frontend-agent); US-006 View own employee profile (2 pts, frontend-agent).

**Related:** US-003, US-004, US-005, US-006

- ⚠ No completion/test status reported for any item in this epic.

### EPIC-003 · approved · source: plan:EPIC-003

Goal and Objective Setting and Tracking (OKR-style) epic covering goal creation, progress tracking, and manager review.

Contains US-007 Create goals and objectives (5 pts, backend-agent); US-008 Track and update goal progress (3 pts, backend-agent); US-009 Manager review of direct reports' goals (5 pts, backend-agent).

**Related:** US-007, US-008, US-009

- ⚠ No completion/test status reported for any item in this epic.

### EPIC-004 · approved · source: plan:EPIC-004

Personal Dashboard of Goals and Progress epic covering the end-user dashboard view.

Contains US-010 View personal goals and progress dashboard (5 pts, frontend-agent).

**Related:** US-010

- ⚠ No completion/test status reported for this item.

### EPIC-005 · approved · source: plan:EPIC-005

Continuous Feedback epic covering writing feedback, requesting feedback, and viewing feedback history.

Contains US-011 Write feedback for a colleague (3 pts, backend-agent); US-012 Request feedback (3 pts, backend-agent); US-013 View feedback given and received (3 pts, frontend-agent).

**Related:** US-011, US-012, US-013

- ⚠ No completion/test status reported for any item in this epic.

### EPIC-006 · approved · source: plan:EPIC-006

In-App Notifications epic covering delivery of notifications to users.

Contains US-014 Receive in-app notifications (5 pts, backend-agent).

**Related:** US-014

- ⚠ No completion/test status reported for this item.
- ⚠ No detail given on which events (feedback requests, goal updates) trigger notifications beyond the Sprint 5 goal text.

### EPIC-007 · approved · source: plan:EPIC-007

GDPR-Level Data Protection epic covering personal data access/export, erasure requests, and consent/minimisation.

Contains US-015 Access and export own personal data (5 pts, backend-agent); US-016 Handle data erasure requests (5 pts, security-agent); US-017 Consent and data minimisation (3 pts, security-agent). These three stories together address core data-subject rights (access, erasure, consent) typically associated with GDPR-style compliance, but no formal regulation/control mapping was provided in the input.

**Related:** US-015, US-016, US-017

- ⚠ No completion/test status reported for any item in this epic.
- ⚠ No explicit compliance framework or control checklist was supplied to confirm these stories fully satisfy GDPR obligations -- this needs human legal/compliance confirmation.
<!-- sdlc:auto:end narrative -->
