# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-SPRINT-1 · approved · source: development:plan:Sprint 1

Sprint 1 (capacity 20) targets login, role-based access enforcement, and core employee directory CRUD with self-service profile view.

- EPIC-001 Authentication and Role-Based Access Control (epic, role unassigned)
- US-001 Sign in with email and password — 5 pts, backend-agent
- US-002 Role-based access enforcement — 8 pts, security-agent, with tasks: T1 Implement role-permission dependency/middleware (backend-agent); T2 Add manager direct-report scoping (backend-agent); T3 Add HR Admin scope checks (backend-agent); T4 Build RBAC regression test suite (qa-agent)
- EPIC-002 Employee Profile Records and Reporting Hierarchy (epic, role unassigned)
- US-003 Create and edit employee profiles — 5 pts, backend-agent
- US-006 View own employee profile — 2 pts, frontend-agent
Planned points sum to 20, exactly matching the sprint's 20-point capacity.

**Related:** EPIC-001, US-001, US-002, US-002-T1, US-002-T2, US-002-T3, US-002-T4, EPIC-002, US-003, US-006

- ⚠ Backlog items carry no explicit sprint field in the input; this sprint's item list was inferred from matching each item's subject matter to the sprint goal text (cross-checked by points summing exactly to the 20-point capacity).
- ⚠ No implementation status (in-progress/done/blocked), commits, or PR references were provided for any item in this sprint.

### DEV-SPRINT-2 · approved · source: development:plan:Sprint 2

Sprint 2 (capacity 20) targets reporting hierarchy, goal/objective creation, feedback writing, and GDPR erasure/consent handling.

- US-004 Maintain reporting hierarchy — 3 pts, backend-agent
- EPIC-003 Goal and Objective Setting and Tracking (OKR-style) (epic, role unassigned)
- US-007 Create goals and objectives — 5 pts, backend-agent
- EPIC-005 Continuous Feedback (epic, role unassigned)
- US-011 Write feedback for a colleague — 3 pts, backend-agent
- EPIC-007 GDPR-Level Data Protection (epic, role unassigned)
- US-016 Handle data erasure requests — 5 pts, security-agent
- US-017 Consent and data minimisation — 3 pts, security-agent
Planned points sum to 19 of the 20-point capacity.

**Related:** US-004, EPIC-003, US-007, EPIC-005, US-011, EPIC-007, US-016, US-017

- ⚠ Sprint-to-item mapping inferred from goal text, not an explicit input field.
- ⚠ No implementation status was reported for this sprint's items.

### DEV-SPRINT-3 · approved · source: development:plan:Sprint 3

Sprint 3 (capacity 20) targets bulk CSV import, goal progress tracking, and feedback requests.

- US-005 Bulk import and update employees via CSV — 13 pts, backend-agent, with tasks: T1 Add CSV upload endpoint with S3 storage (backend-agent); T2 Implement import worker job (backend-agent); T3 Add import job status endpoint (backend-agent); T4 Build import upload and results UI (frontend-agent)
- US-008 Track and update goal progress — 3 pts, backend-agent
- US-012 Request feedback — 3 pts, backend-agent
Planned points sum to 19 of the 20-point capacity.

**Related:** US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4, US-008, US-012

- ⚠ Sprint-to-item mapping inferred from goal text, not an explicit input field.
- ⚠ No implementation status was reported for this sprint's items.

### DEV-SPRINT-4 · approved · source: development:plan:Sprint 4

Sprint 4 (capacity 20) targets manager goal review/approval, the personal dashboard, feedback visibility, and personal data export.

- US-009 Manager review of direct reports' goals — 5 pts, backend-agent
- EPIC-004 Personal Dashboard of Goals and Progress (epic, role unassigned)
- US-010 View personal goals and progress dashboard — 5 pts, frontend-agent
- US-013 View feedback given and received — 3 pts, frontend-agent
- US-015 Access and export own personal data — 5 pts, backend-agent
Planned points sum to 18 of the 20-point capacity.

**Related:** US-009, EPIC-004, US-010, US-013, US-015

- ⚠ Sprint-to-item mapping inferred from goal text, not an explicit input field.
- ⚠ No implementation status was reported for this sprint's items.

### DEV-SPRINT-5 · approved · source: development:plan:Sprint 5

Sprint 5 (capacity 20) targets in-app notifications for feedback requests and goal updates.

- EPIC-006 In-App Notifications (epic, role unassigned)
- US-014 Receive in-app notifications — 5 pts, backend-agent
Planned points sum to 5 of the 20-point capacity, the lightest-loaded sprint in the plan.

**Related:** EPIC-006, US-014

- ⚠ Sprint-to-item mapping inferred from goal text, not an explicit input field.
- ⚠ No implementation status was reported for this sprint's items.
<!-- sdlc:auto:end narrative -->
