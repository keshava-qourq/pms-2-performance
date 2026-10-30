# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign in with email and password | US-001 | 1 | POST /auth/login, api, db, employees, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Role-based access enforcement | US-002, US-002-T1, US-002-T2, US-002-T3, US-002-T4 | 1 | api, db, employees | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-002 | Create and edit employee profiles | US-003 | 1 | PATCH /admin/employees/{id}, POST /admin/employees, api, db, employees, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-002 | Maintain reporting hierarchy | US-004 | 2 | PATCH /admin/employees/{id}, api, db, employees, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-002 | Bulk import and update employees via CSV | US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4 | 3 | GET /admin/imports/{job_id}, POST /admin/imports, api, csv_import_jobs, db, employees, redis, s3, web, worker | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | View own employee profile | US-006 | 1 | GET /me, api, db, employees, web | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-007 | EPIC-003 | Create goals and objectives | US-007 | 2 | POST /goals, api, db, goals, key_results, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-003 | Track and update goal progress | US-008 | 3 | PATCH /goals/{id}/key-results/{kr_id}, POST /goals/{id}/submit, api, db, goals, key_results, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-003 | Manager review of direct reports' goals | US-009 | 4 | GET /employees/{id}/goals, POST /goals/{id}/review, api, db, employees, goals, key_results, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-004 | View personal goals and progress dashboard | US-010 | 4 | GET /dashboard, api, db, goals, key_results, redis, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-011 | EPIC-005 | Write feedback for a colleague | US-011 | 2 | POST /feedback, api, db, employees, feedback, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-005 | Request feedback | US-012 | 3 | POST /feedback/requests, api, db, employees, feedback_requests, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-005 | View feedback given and received | US-013 | 4 | GET /feedback, api, db, feedback, feedback_requests, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-014 | EPIC-006 | Receive in-app notifications | US-014 | 5 | GET /notifications, POST /notifications/{id}/read, api, db, feedback_requests, goals, notifications, redis, web, worker | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-015 | EPIC-007 | Access and export own personal data | US-015 | 4 | POST /me/data-export, api, db, employees, feedback, goals, s3, web | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-016 | EPIC-007 | Handle data erasure requests | US-016 | 2 | POST /admin/employees/{id}/erase, api, audit_logs, db, employees | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-007 | Consent and data minimisation | US-017 | 2 | POST /me/consent, api, consents, db, employees, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
