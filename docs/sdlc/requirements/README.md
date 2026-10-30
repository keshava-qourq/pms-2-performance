# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-EPIC-001 · approved · source: requirements:EPIC-001

Users authenticate with email and password and are routed to a role-appropriate landing page; access across the system is governed by three roles: Employee, Manager, HR Admin. SSO was considered but is explicitly deferred.

US-001 (critical): Registered users log in with email/password and reach their role-appropriate landing page (AC-001). Incorrect credentials are denied with a single non-revealing error that does not disclose which field was wrong (AC-002, NFR-001). SSO (SAML/OAuth) was raised during requirements discussion and is explicitly deferred to a later version for this MVP (AC-003, assumption documented).
US-002 (critical): Role-based access is enforced for all three roles. Employees are denied access to HR Admin functions such as the employee directory (AC-004). Managers can see their own data and their direct reports' data but not unrelated employees (AC-005). HR Admins can manage employee profiles and the reporting hierarchy (AC-006). The exact permission matrix per role is flagged as an open assumption to be refined.

**Related:** US-001, US-002, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, NFR-001, NFR-002

- ⚠ AC-006 explicitly flags the exact permission matrix per role as unrefined -- needs a definitive role/action matrix before design.
- ⚠ SSO is deferred per AC-003; confirm this remains acceptable for go-live before architecture begins.

### REQ-EPIC-002 · approved · source: requirements:EPIC-002

HR Admins create and maintain employee profiles and the reporting hierarchy in-app and via CSV bulk import/update; employees can view their own profile. HRIS sync is explicitly out of scope for this MVP.

US-003 (high): HR Admins create profiles with required fields (name, email, role) that appear in the directory (AC-007), and edits persist everywhere the profile is shown (AC-008). Only fields relevant to performance management are collected, per data minimisation (AC-009, NFR-003).
US-004 (high): HR Admins assign/change an employee's manager; reassignment updates the direct-report lists of both the old and new manager (AC-010, AC-011).
US-005 (medium): HR Admins bulk import/update employees and reporting relationships via CSV; a correctly formatted file creates/updates records and returns a processing summary (AC-012). Invalid/incomplete rows are rejected individually with reasons, without corrupting valid records (AC-013, NFR-009), and this runs as a background job (NFR-006). HRIS sync is explicitly out of scope; only CSV import and in-app management are delivered for this MVP (AC-014, assumption documented).
US-006 (medium): Employees can view their own profile, including their assigned manager (AC-015).

**Related:** US-003, US-004, US-005, US-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012, AC-013, AC-014, AC-015, NFR-003, NFR-006, NFR-009

- ⚠ HRIS sync (originally BambooHR) is confirmed out of scope -- no gap, but noted here for traceability since it was an open assumption in US-005.

### REQ-EPIC-003 · approved · source: requirements:EPIC-003

Employees create OKR-style goals with measurable key results, track and update progress, and managers review and approve their direct reports' goals.

US-007 (critical): Employees create objectives with a title, description and one or more key results; the goal is saved and listed (AC-016). Submitting without a title or any key result is blocked with field-level messaging (AC-017).
US-008 (high): Updating a key result's progress or status recalculates and saves the goal's overall progress (AC-018); marking a goal complete/closed changes its status and reflects on the dashboard (AC-019).
US-009 (high): Managers view their direct reports' objectives, key results and progress (AC-020), and can approve or request changes to goals submitted for approval, with the outcome visible to the employee (AC-021). Managers are denied access to goals of employees who are not their direct reports (AC-022, NFR-002).

**Related:** US-007, US-008, US-009, AC-016, AC-017, AC-018, AC-019, AC-020, AC-021, AC-022, NFR-002

- ⚠ The full set of goal/approval status values (e.g. draft, submitted, approved, changes-requested, complete, closed) is not enumerated -- needed before data modeling.

### REQ-EPIC-004 · approved · source: requirements:EPIC-004

Every user gets a personal dashboard summarising their own active goals and progress; org-wide/aggregate reporting is explicitly out of scope for this MVP.

US-010 (high): Logged-in users with goals see active goals with progress/status on their dashboard (AC-023). Users with no goals see an empty state prompting goal creation (AC-024). The dashboard reflects progress updates when the user returns (AC-025). Dashboard responsiveness relies on caching rather than recompute-per-view (NFR-005).

**Related:** US-010, AC-023, AC-024, AC-025, NFR-005

### REQ-EPIC-005 · approved · source: requirements:EPIC-005

Employees and managers can write continuous feedback for colleagues at any time, request feedback, and view feedback given and received, with visibility restricted to entitled parties.

US-011 (high): Any logged-in user selects a colleague and submits feedback text, which is saved and associated with that colleague (AC-026); empty submissions are blocked (AC-027).
US-012 (medium): A user requests feedback from a colleague; the colleague sees and can respond to the request (AC-028), and the requester can view the response once submitted (AC-029).
US-013 (high): Employees can view feedback addressed to them (AC-030) and feedback they have given (AC-031). Attempts to view feedback addressed to another employee without entitlement are denied (AC-032, NFR-002).

**Related:** US-011, US-012, US-013, AC-026, AC-027, AC-028, AC-029, AC-030, AC-031, AC-032, NFR-002

### REQ-EPIC-006 · approved · source: requirements:EPIC-006

The system surfaces in-app notifications for feedback requests and goal updates. Email delivery was part of the broader vision but is explicitly out of scope for this MVP.

US-014 (medium): Logged-in users see an in-app notification when a colleague sends a feedback request (AC-033). Opening/viewing a notification marks it read (AC-034). Email notifications (originally via SendGrid) are explicitly deferred; only in-app notifications are delivered for this MVP (AC-035, assumption documented). Notification sending runs as background work (NFR-006).

**Related:** US-014, AC-033, AC-034, AC-035, NFR-006

### REQ-EPIC-007 · approved · source: requirements:EPIC-007

The system is designed to GDPR-level standards: employees can access/export their own data, HR Admins can action erasure requests, and data minimisation plus consent recording apply across record creation and import.

US-015 (high): Employees can request and receive an exportable copy of their profile, goals and feedback data (AC-036).
US-016 (high): HR Admins action approved erasure requests, removing or anonymising personal data per the organisation's retention policy (AC-037); after erasure, that employee's personal data is no longer accessible in the application (AC-038).
US-017 (medium): Only fields necessary for performance management are stored on record creation or import, i.e. data minimisation (AC-039, NFR-003). Where consent is required for a processing purpose, consent status is recorded and retrievable (AC-040). Data residency in a chosen region (e.g. EU) and the overall GDPR-level posture is called out at NFR-004.

**Related:** US-015, US-016, US-017, AC-036, AC-037, AC-038, AC-039, AC-040, NFR-003, NFR-004

- ⚠ The organisation's specific data retention policy referenced in AC-037 is not itself defined in the inputs -- needed to implement erasure correctly.
- ⚠ The mechanism and UI for recording/retrieving consent status (AC-040) is not detailed beyond 'recorded and retrievable'.
- ⚠ GDPR-level requirements (US-015/016/017, NFR-004) have no architecture, implementation, or test coverage yet since those phases have not started -- compliance cannot be confirmed end-to-end until they do.

### REQ-NFR-SET · approved · source: requirements:NFR-001..NFR-009

Nine non-functional requirements span security, privacy, compliance, performance, scalability, compatibility and maintainability, each mapped to the user stories they constrain.

NFR-001 (security): non-revealing sign-in errors -- applies to US-001.
NFR-002 (security): role-based access control across the tool (managers limited to own + direct reports' data, employees barred from HR Admin functions, feedback restricted to entitled viewers) -- applies to US-002, US-009, US-013.
NFR-003 (privacy): data minimisation for employee records created or imported -- applies to US-003, US-017.
NFR-004 (compliance): GDPR-level data protection and residency (region-pinned data, access/export/erasure/consent support, retention-aligned erasure) -- applies to US-015, US-016, US-017.
NFR-005 (performance): dashboards/reports stay responsive for a few thousand employees via caching of expensive org-wide aggregates -- applies to US-010.
NFR-006 (performance): CSV bulk import/update, scheduled reminders and bulk notification sending run as background jobs -- applies to US-005, US-014.
NFR-007 (scalability): supports up to a few thousand employees in one organisation -- applies to the whole system.
NFR-008 (compatibility): responsive web app for desktop and mobile browsers; no native mobile apps -- applies to the whole system.
NFR-009 (maintainability): CSV import isolates and reports failing rows without corrupting valid ones -- applies to US-005.

**Related:** US-001, US-002, US-003, US-005, US-009, US-010, US-013, US-014, US-015, US-016, US-017

- ⚠ None of the NFRs have yet been verified against an architecture or test plan since those phases have not started.

### REQ-TECHSTACK · approved · source: requirements:technology-stack

Product owner approved a fixed technology stack to be designed against exactly as specified, with no substitutions: FastAPI backend, AWS cloud, PostgreSQL 16 database, React 19 frontend.

Backend: FastAPI 0.115 -- chosen for business logic over structured data (cycle phases, approval flows, RBAC, HRIS sync placeholder, CSV import, scheduled notifications), clean API fit, and request validation supporting GDPR-level data minimisation and strict input handling.
Cloud: AWS -- chosen for region-pinned data residency/deletion control under GDPR (e.g. EU region), managed PostgreSQL (RDS), file storage (S3), networking to lock down an internal tool, and broad support for easy hosting/hand-over.
Database: PostgreSQL 16 -- chosen for strong relational integrity across employees/hierarchy/goals/review cycles/assessments/feedback/ratings, reliable transactions, hierarchy and rating-distribution queries, row-level controls/auditability for GDPR access/erasure, and comfortable performance at a few thousand employees without tuning.
Frontend: React 19 -- chosen for form-heavy, interactive, role-aware UI (goal trees, configurable review forms/rating scales, 360 rater selection placeholder, role-specific dashboards with charts/exports), dynamic rendering of admin-configurable directory/cycles/templates, and wide staffing availability.

**Related:** REQ-NFR-SET

- ⚠ No architecture documentation exists yet to show how these approved technologies are actually composed into services/components.

### REQ-SERVICES · approved · source: requirements:runtime-services

Three approved runtime services support file storage, background job processing, and caching, with a defined set of required API keys/environment variables.

File storage: Amazon S3 (SaaS; env AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET) -- holds uploaded CSV imports and generated CSV/PDF report and review exports durably, in the chosen GDPR region, separate from the database.
Queue: Redis as a job queue (container redis:7-alpine) -- runs bulk CSV import/update, HRIS sync placeholder, scheduled deadline reminders, and bulk notification sending in the background rather than blocking requests.
Cache: Redis (container redis:7-alpine) -- caches expensive org-wide completion/rating-distribution dashboard results and user sessions to keep HR reporting responsive for a few thousand employees.
Required API keys/env vars: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, REDIS_URL, S3_BUCKET.

**Related:** NFR-005, NFR-006, US-005, US-010, US-014, US-015

### REQ-SCOPE · approved · source: requirements:scope-and-version

This is a lightweight MVP, requirements version 1, covering goal/OKR tracking, a personal dashboard, continuous feedback, and employee profile records -- explicitly excluding native mobile apps, email delivery, SSO, and HRIS integration.

Delivery scope: lightweight. Requirements version: 1. In-scope capabilities: goal and objective setting/tracking (OKR-style), personal dashboard of own goals/progress, writing/viewing continuous feedback, employee profile records. Out of scope for this version: native mobile apps (iOS/Android); email (SendGrid was removed from the stack); SSO (WorkOS was removed from the stack); HRIS (BambooHR was removed from the stack). These exclusions are reflected as deferred assumptions in EPIC-001 (SSO), EPIC-002 (HRIS), and EPIC-006 (email).

**Related:** REQ-EPIC-001, REQ-EPIC-002, REQ-EPIC-006
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
