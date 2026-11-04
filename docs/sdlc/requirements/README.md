# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · approved · source: requirements:scope

Lightweight MVP, requirements v1, with a product-owner-approved tech stack and runtime services; several previously discussed capabilities are explicitly deferred.

- Approved stack: Backend FastAPI 0.115, Cloud AWS, Database PostgreSQL 16, Frontend React 19 (each with documented rationale).
- Approved runtime services: Amazon S3 (SaaS file storage) for CSV uploads and generated exports; Redis (container redis:7-alpine) used both as a background job queue and as a cache.
- Required env vars/API keys: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, REDIS_URL, S3_BUCKET.
- Explicitly out of scope: native mobile apps (iOS/Android); email delivery (SendGrid removed from stack); SSO (WorkOS removed); HRIS integration (BambooHR removed).
- In-scope capabilities per product owner: OKR-style goal setting/tracking, personal dashboard, continuous feedback, employee profile records.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007

### EPIC-001 · approved · source: requirements:EPIC-001

Email/password sign-in and role-based access control across Employee, Manager and HR Admin roles; SSO explicitly deferred to a later version.

- US-001 (critical): registered user signs in with email+password and lands on role-appropriate page (AC-001); incorrect credentials denied with a single non-revealing error (AC-002, NFR-001); only email/password auth delivered, SSO (SAML/OAuth) deferred (AC-003).
- US-002 (critical): Employees denied HR Admin functions such as directory management (AC-004); Managers see their own data plus direct reports' only, not unrelated employees (AC-005); HR Admins manage employee profiles and reporting hierarchy (AC-006).

**Related:** US-001, US-002, NFR-001, NFR-002

- ⚠ AC-006 notes the exact permission matrix per role is still 'to be refined' — not finalized anywhere in this input.

### EPIC-002 · approved · source: requirements:EPIC-002

HR Admins maintain employee profiles and reporting hierarchy in-app and via CSV bulk import; HRIS sync is explicitly deferred.

- US-003 (high): HR Admin creates/edits profiles with required fields (name, email, role) (AC-007, AC-008); only performance-management-relevant fields collected per data minimisation (AC-009, NFR-003).
- US-004 (high): HR Admin assigns/changes an employee's manager; hierarchy updates for both the previous and new manager (AC-010, AC-011).
- US-005 (medium): HR Admin bulk CSV import creates/updates employees and hierarchy relationships with a processed-records summary (AC-012); invalid/missing-field rows are rejected with per-row reasons and valid rows are unaffected (AC-013, NFR-009); only CSV import plus in-app management delivered in this MVP, HRIS sync deferred (AC-014).
- US-006 (medium): Employee views own profile including assigned manager (AC-015).

**Related:** US-003, US-004, US-005, US-006, NFR-003, NFR-006, NFR-009

### EPIC-003 · approved · source: requirements:EPIC-003

Employees create and track OKR-style goals with key results; managers review and approve their direct reports' goals.

- US-007 (critical): Employee creates an objective with title, description and one or more key results (AC-016); missing title or key result blocks save with a field-level message (AC-017).
- US-008 (high): Employee updates a key result's progress value/status, goal overall progress recalculates and saves (AC-018); marking a goal complete/closed updates its status and reflects on the dashboard (AC-019).
- US-009 (high): Manager views a direct report's objectives, key results and progress (AC-020); approves or requests changes on a submitted goal, with the outcome visible to the employee (AC-021); access denied when attempting to view a non-direct-report's goals (AC-022).

**Related:** US-007, US-008, US-009

### EPIC-004 · approved · source: requirements:EPIC-004

Personal dashboard summarising each user's own goals and progress; org-wide/aggregate reporting is explicitly out of scope for this MVP.

- US-010 (high): Dashboard shows active goals with progress/status (AC-023); empty state prompts goal creation when the user has none (AC-024); dashboard reflects a goal's updated progress on return (AC-025). Intended to be served from cache for responsiveness (NFR-005).

**Related:** US-010, NFR-005

### EPIC-005 · approved · source: requirements:EPIC-005

Continuous feedback: any logged-in user can write feedback for a colleague, request feedback, and view feedback given and received.

- US-011 (high): User selects a colleague and submits feedback text, saved and associated with that colleague (AC-026); empty content is blocked with a prompt (AC-027).
- US-012 (medium): User requests feedback from a colleague; the request is recorded and visible/respondable by the colleague (AC-028); requester can view the submitted response (AC-029).
- US-013 (high): Employee views feedback received (AC-030) and feedback they have given (AC-031); viewing feedback addressed to another employee without entitlement is denied (AC-032, NFR-002).

**Related:** US-011, US-012, US-013, NFR-002

### EPIC-006 · approved · source: requirements:EPIC-006

In-app notifications for feedback requests and goal updates; email notification delivery is explicitly deferred.

- US-014 (medium): Logged-in user sees an in-app notification when a colleague sends a feedback request (AC-033); opening/viewing a notification marks it read (AC-034); only in-app notifications are delivered in this MVP, email delivery deferred (AC-035). Notification fan-out intended to run as a background job (NFR-006).

**Related:** US-014, NFR-006

### EPIC-007 · approved · source: requirements:EPIC-007

GDPR-level data protection: employees can access/export their own data, HR Admins action erasure requests, and data minimisation/consent are enforced.

- US-015 (high): Employee requests a copy of their personal data; system provides profile, goals and feedback data in an exportable format (AC-036).
- US-016 (high): HR Admin actions an approved erasure request; personal data removed or anonymised per the organisation's retention policy (AC-037); after erasure the employee's personal data is no longer accessible in the application (AC-038).
- US-017 (medium): Only fields necessary for performance management are stored on record creation or import (AC-039, NFR-003); consent status is recorded and retrievable where required for a given processing purpose (AC-040).

**Related:** US-015, US-016, US-017, NFR-003, NFR-004

- ⚠ The organisation's specific data retention policy referenced by AC-037 and NFR-004 is not defined anywhere in this input.
- ⚠ Which processing purposes require consent, and the exact consent-collection flow, is not specified beyond AC-040's general statement.

### REQ-NFR · approved · source: requirements:non-functional

Nine non-functional requirements span security, privacy, compliance, performance, scalability, compatibility and maintainability.

- NFR-001 [security] Non-revealing sign-in errors — applies to US-001.
- NFR-002 [security] Role-based access control across the tool — applies to US-002, US-009, US-013.
- NFR-003 [privacy] Data minimisation for employee records — applies to US-003, US-017.
- NFR-004 [compliance] GDPR-level data protection and EU residency, incl. access/export/erasure/consent — applies to US-015, US-016, US-017.
- NFR-005 [performance] Responsive dashboards/reports with caching of expensive aggregates — applies to US-010.
- NFR-006 [performance] Background processing for batch work (CSV import, reminders, notifications) — applies to US-005, US-014.
- NFR-007 [scalability] Supports up to a few thousand employees in one organisation — applies to whole system.
- NFR-008 [compatibility] Responsive web app on desktop and mobile browsers, no native apps — applies to whole system.
- NFR-009 [maintainability] CSV import protects valid records on partial failure — applies to US-005.

**Related:** US-001, US-002, US-003, US-005, US-009, US-010, US-013, US-014, US-015, US-016, US-017
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-30

**Capabilities in scope:** Goal and objective setting and tracking (OKR-style), Personal dashboard of own goals and progress, Writing and viewing continuous feedback, Employee profile records

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The core work here is business logic over structured data: cycle phases, approval flows, RBAC permissions, HRIS sync, CSV import and scheduled notifications. FastAPI is a clean fit for building those APIs, and its Python base makes the reporting/aggregation and CSV/PDF generation straightforward. Its request validation also helps enforce the data minimisation and strict input handling your GDPR-level standard calls for. |
| cloud | AWS | A multi-region workforce under GDPR needs data kept in a chosen region (e.g. EU) with a clear data-residency and deletion story, and AWS gives you that control plus managed PostgreSQL (RDS), file storage (S3) and the networking to lock an internal tool down. It is the most broadly supported option, which keeps an internal corporate tool easy to host, secure and hand over. |
| database | PostgreSQL | Your data is highly relational — employees, reporting hierarchy, goals, review cycles, assessments, feedback, ratings — and correctness matters for sensitive performance records. PostgreSQL enforces those relationships and transactions reliably, handles the hierarchy and rating-distribution queries your HR reports need, and its row-level controls and auditability support the GDPR access/erasure requirements. At a few thousand employees it runs comfortably without tuning. |
| frontend | React | Your app is form-heavy and interactive: goal trees, review forms with configurable templates and rating scales, 360 rater selection, and three role-specific dashboards with charts and exports. React handles this kind of stateful, role-aware interface well, and because the directory, review cycles and templates are all admin-configurable, you need a UI that renders dynamic forms rather than fixed pages. It is also the most widely known choice, so staffing and future maintenance of an internal tool stay easy. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Authentication and Role-Based Access Control

Users sign in to the internal tool with email and password, and the system enforces role-based permissions across the three primary roles (Employee, Manager, HR Admin). SSO (SAML/OAuth) was discussed in the understanding but is out of scope for this Lightweight MVP; email/password only is delivered here.

### US-001: Sign in with email and password

**Priority:** critical

> As a registered user (Employee, Manager or HR Admin), I want to log in with my email address and password, so that I can securely access the performance management application.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am a registered user on the login page | I enter my correct email and password and submit | I am authenticated and taken to my role-appropriate landing page |
| AC-002 | I am on the login page | I enter an incorrect email or password | I am denied access and shown an error message without revealing which field was wrong |
| AC-003 | SSO (SAML/OAuth) was raised as an open assumption | this MVP version is delivered | only email/password authentication is available and SSO is deferred to a later version (assumption: SSO out of scope for this version) |

### US-002: Role-based access enforcement

**Priority:** critical

> As a security-conscious organization, I want each user's access to be governed by their assigned role, so that people can only see and do what their role permits.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | a user is assigned the Employee role | they attempt to access HR Admin functions such as managing the employee directory | the system denies access |
| AC-005 | a user is assigned the Manager role | they view goals and feedback | they can see their own data and that of their direct reports but not unrelated employees |
| AC-006 | a user is assigned the HR Admin role | they access administrative functions | they can manage employee profiles and the reporting hierarchy (assumption: exact permission matrix per role to be refined) |

## EPIC-002: Employee Profile Records and Reporting Hierarchy

HR Admins maintain employee profile records and the reporting hierarchy directly in the app and via CSV bulk import/update. HRIS sync was raised as an open assumption but is out of scope for this Lightweight MVP; CSV import plus in-app management are delivered.

### US-003: Create and edit employee profiles

**Priority:** high

> As a HR Admin, I want to create and update employee profile records in the app, so that the directory of employees is accurate and up to date.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am an HR Admin on the employee directory | I create a new employee profile with required fields (e.g. name, email, role) | the profile is saved and the employee appears in the directory |
| AC-008 | an existing employee profile | I edit and save a field | the updated value is persisted and reflected wherever the profile is shown |
| AC-009 | data minimisation is required under GDPR-level standards | a profile is created | only fields relevant to performance management are collected |

### US-004: Maintain reporting hierarchy

**Priority:** high

> As a HR Admin, I want to assign each employee a manager and define the reporting structure, so that managers can see the right direct reports and the org structure is accurate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | an employee profile | I assign a manager to that employee | the employee appears as a direct report under that manager |
| AC-011 | an employee already has a manager assigned | I change the manager assignment | the reporting hierarchy updates for both the previous and new manager |

### US-005: Bulk import and update employees via CSV

**Priority:** medium

> As a HR Admin, I want to bulk import and update employee records and reporting relationships via CSV, so that I can onboard or update many employees at once without manual entry.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am an HR Admin with a correctly formatted CSV file | I upload the file | new employees are created and existing ones updated, and I see a summary of records processed |
| AC-013 | a CSV file with invalid or missing required fields | I upload it | the system rejects the invalid rows and reports which rows failed and why, without partially corrupting valid records |
| AC-014 | HRIS sync was raised as an open assumption | this MVP version is delivered | only CSV import and in-app management are supported and HRIS integration is deferred (assumption: HRIS sync out of scope for this version) |

### US-006: View own employee profile

**Priority:** medium

> As a Employee, I want to view my own profile record, so that I can confirm my details and reporting line are correct.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I am a logged-in employee | I open my profile | I see my own profile details and my assigned manager |

## EPIC-003: Goal and Objective Setting and Tracking (OKR-style)

Employees set OKR-style goals and objectives with measurable key results, track and update progress over time, and managers can view and approve their direct reports' goals.

### US-007: Create goals and objectives

**Priority:** critical

> As a Employee, I want to create objectives with measurable key results, so that I have clear, trackable goals for my performance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am a logged-in employee | I create an objective with a title, description and one or more key results | the goal is saved and listed among my goals |
| AC-017 | I am creating a goal | I submit without a title or any key result | the system prevents saving and tells me which fields are required |

### US-008: Track and update goal progress

**Priority:** high

> As a Employee, I want to update the progress of my goals and key results, so that my goal status reflects my current work.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | an existing goal with key results | I update a key result's progress value or status | the goal's overall progress recalculates and is saved |
| AC-019 | a goal I own | I mark it complete or closed | its status changes and it is reflected in my dashboard |

### US-009: Manager review of direct reports' goals

**Priority:** high

> As a Manager, I want to view and approve the goals of my direct reports, so that I can ensure their objectives are aligned and agreed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am a manager with direct reports | I open a direct report's goals | I can see their objectives, key results and current progress |
| AC-021 | a direct report has submitted a goal for approval | I approve or request changes to it | the goal's approval status updates and the employee can see the outcome |
| AC-022 | I am a manager | I attempt to view goals of an employee who is not my direct report | access is denied |

## EPIC-004: Personal Dashboard of Goals and Progress

Each user sees a personal dashboard summarising their own goals and progress. Org-wide and aggregate reporting from the fuller vision is out of scope for this Lightweight MVP.

### US-010: View personal goals and progress dashboard

**Priority:** high

> As a Employee, I want a dashboard that summarises my goals and their progress, so that I can see my performance status at a glance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am a logged-in user with goals | I open my dashboard | I see my active goals with their progress and status |
| AC-024 | I have no goals yet | I open my dashboard | I see an empty state prompting me to create a goal |
| AC-025 | I update a goal's progress | I return to my dashboard | the dashboard reflects the updated progress |

## EPIC-005: Continuous Feedback

Employees and managers can write continuous feedback for colleagues, request feedback, and view feedback they have given and received. Peer/manager continuous feedback supports an ongoing performance conversation outside of formal review cycles.

### US-011: Write feedback for a colleague

**Priority:** high

> As a Employee or Manager, I want to write feedback for a colleague at any time, so that I can recognise good work or offer constructive input continuously.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I am a logged-in user | I select a colleague and submit feedback text | the feedback is saved and associated with that colleague |
| AC-027 | I am writing feedback | I submit with empty content | the system prevents saving and prompts me to enter feedback |

### US-012: Request feedback

**Priority:** medium

> As a Employee or Manager, I want to request feedback from a colleague, so that I can gather input relevant to my performance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I am a logged-in user | I request feedback from a chosen colleague | a feedback request is recorded and the colleague can see and respond to it |
| AC-029 | a colleague has responded to my request | I view the request | I can see their submitted feedback |

### US-013: View feedback given and received

**Priority:** high

> As a Employee, I want to view the feedback I have received and given, so that I can reflect on and act upon it.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I have received feedback | I open my feedback view | I see the feedback addressed to me |
| AC-031 | I have written feedback for others | I open my feedback view | I can see the feedback I have given |
| AC-032 | I am a user | I attempt to view feedback addressed to another employee that I am not entitled to see | access is denied |

## EPIC-006: In-App Notifications

The system surfaces in-app notifications for relevant events such as feedback requests and goal updates. Email notifications were part of the broader understanding but email delivery is out of scope for this Lightweight MVP; in-app notifications only are delivered.

### US-014: Receive in-app notifications

**Priority:** medium

> As a logged-in user, I want to receive in-app notifications for feedback requests and goal updates relevant to me, so that I stay aware of actions I need to take.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | a colleague sends me a feedback request | I am logged in | I see an in-app notification about the request |
| AC-034 | I have unread notifications | I open the notifications area and view one | it is marked as read |
| AC-035 | email notifications were raised as an assumption | this MVP version is delivered | only in-app notifications are provided and email delivery is deferred (assumption: email notifications out of scope for this version) |

## EPIC-007: GDPR-Level Data Protection

Because the workforce is multi-region and performance data is sensitive, the system is designed to GDPR-level standards: data minimisation, the ability for employees to access/export their own data, and support for erasure requests and consent handling.

### US-015: Access and export own personal data

**Priority:** high

> As a Employee, I want to access and export the personal data the system holds about me, so that I can exercise my data access rights under GDPR-level standards.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | I am a logged-in employee | I request a copy of my personal data | the system provides my profile, goals and feedback data in an exportable format |

### US-016: Handle data erasure requests

**Priority:** high

> As a HR Admin, I want to action an employee's data erasure request, so that the organization meets its GDPR-level erasure obligations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | an employee has requested erasure and the request is approved | I action the erasure for that employee | their personal data is removed or anonymised in accordance with the organization's retention policy |
| AC-038 | an erasure has been actioned | I look up that employee | their personal data is no longer accessible in the application |

### US-017: Consent and data minimisation

**Priority:** medium

> As a organization subject to GDPR-level standards, I want the system to collect only necessary data and record consent where required, so that personal data processing is lawful and minimised.

| ID | Given | When | Then |
|---|---|---|---|
| AC-039 | the application collects employee personal data | a record is created or imported | only fields necessary for performance management are stored (data minimisation) |
| AC-040 | consent is required for a given processing purpose | an employee's data is processed for that purpose | the relevant consent status is recorded and retrievable |
<!-- sdlc:auto:end epics -->
