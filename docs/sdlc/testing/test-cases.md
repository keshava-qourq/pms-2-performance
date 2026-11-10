# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
52 tests · Passed 40 · Failed 0 · Skipped 0 · Not run 12

Acceptance criteria covered: 10/40 · passing: 3/40
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: Sign in with email and password

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-001 | test_ac001_access_token_carries_sub_role_and_expiry | Unit | Passed | `backend/tests/test_security.py` |
| AC-001 | test_ac001_password_is_hashed_not_plaintext | Unit | Passed | `backend/tests/test_security.py` |
| — | test_me_rejects_token_signed_with_wrong_secret | Unit | Passed | `backend/tests/test_security.py` |
| AC-001 | test_ac001_login_with_correct_credentials_returns_token_and_user | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| AC-002 | test_ac002_login_with_unknown_email_returns_generic_401 | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| AC-002 | test_ac002_login_with_wrong_password_returns_identical_generic_401 | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| AC-002 | test_ac002_malformed_body_returns_422 | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| AC-003 | test_ac003_no_sso_saml_oauth_route_exists | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| — | test_nfr001_unknown_email_and_wrong_password_responses_are_byte_identical | Integration | Passed | `backend/tests/integration/test_auth_login.py` |
| AC-015 | test_ac015_me_manager_is_null_when_unassigned | Integration | Passed | `backend/tests/integration/test_me.py` |
| AC-015 | test_ac015_me_returns_profile_and_manager | Integration | Passed | `backend/tests/integration/test_me.py` |
| — | test_me_with_expired_token_returns_401 | Integration | Passed | `backend/tests/integration/test_me.py` |
| — | test_me_with_invalid_token_returns_401 | Integration | Passed | `backend/tests/integration/test_me.py` |
| — | test_me_without_token_returns_401 | Integration | Passed | `backend/tests/integration/test_me.py` |
| AC-001 | [AC-001] sign in as employee lands on the dashboard | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-001 | [AC-001] sign in as hr_admin lands on the employee directory | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-002 | [AC-002] a bad password shows one non-field error and stays on /login | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-015 | [AC-015] an authenticated employee sees their own profile and manager | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| — | [AC-guard] visiting a protected route while signed out redirects to /login | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| — | [NFR-008] the login screen is usable on a mobile viewport | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |

### US-002: Role-based access enforcement

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-004, AC-006 | test_ac004_ac006_employee_and_manager_tokens_get_403_on_every_admin_route | Unit | Passed | `backend/tests/test_rbac.py` |
| AC-004, AC-006 | test_ac004_ac006_hr_admin_gets_non_403_on_every_admin_route | Unit | Passed | `backend/tests/test_rbac.py` |
| AC-005 | test_ac005_nfr002_manager_a_cannot_read_manager_b_report | Unit | Passed | `backend/tests/test_rbac.py` |
| AC-005 | test_ac005_nfr002_manager_reads_direct_report_goals | Unit | Passed | `backend/tests/test_rbac.py` |
| AC-005 | test_ac005_nfr002_manager_reads_own_goals | Unit | Passed | `backend/tests/test_rbac.py` |
| — | test_employee_cannot_read_another_employees_data | Unit | Passed | `backend/tests/test_rbac.py` |
| — | test_employee_reads_own_data | Unit | Passed | `backend/tests/test_rbac.py` |
| — | test_every_route_except_login_requires_auth | Unit | Passed | `backend/tests/test_rbac.py` |
| — | test_tampered_role_claim_is_not_honoured | Unit | Passed | `backend/tests/test_rbac.py` |
| AC-004 | [AC-004] an employee who visits /employees directly is redirected with an access-denied message | E2E | Not run yet | `frontend/e2e/rbac.spec.ts` |
| AC-004 | [AC-004] signed in as an employee, no HR Admin navigation is shown | E2E | Not run yet | `frontend/e2e/rbac.spec.ts` |

### US-003: Create and edit employee profiles

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-007 | test_ac007_post_duplicate_email_returns_409 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-007 | test_ac007_post_employee_returns_201_and_is_listed_by_get | Unit | Passed | `backend/tests/test_employees.py` |
| AC-007 | test_ac007_post_malformed_email_returns_422 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-007 | test_ac007_post_missing_name_returns_422 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-007 | test_ac007_post_unknown_role_returns_422 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-008 | test_ac008_patch_manager_id_pointing_at_nonexistent_employee_returns_422 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-008 | test_ac008_patch_manager_id_pointing_at_self_returns_422 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-008 | test_ac008_patch_unknown_id_returns_404 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-008 | test_ac008_patch_updates_field_and_advances_updated_at | Unit | Passed | `backend/tests/test_employees.py` |
| AC-009 | test_ac009_nfr003_employee_schema_exposes_only_allowed_fields | Unit | Passed | `backend/tests/test_employees.py` |
| AC-009 | test_ac009_nfr003_extra_fields_on_create_are_rejected_and_not_persisted | Unit | Passed | `backend/tests/test_employees.py` |
| — | test_nfr002_employee_and_manager_tokens_get_403_on_all_routes | Unit | Passed | `backend/tests/test_employees.py` |
| — | test_nfr007_list_honours_page_and_page_size | Unit | Passed | `backend/tests/test_employees.py` |
| — | test_nfr007_list_honours_search | Unit | Passed | `backend/tests/test_employees.py` |
| — | test_nfr007_page_size_is_capped_at_100 | Unit | Passed | `backend/tests/test_employees.py` |
| AC-007 | [AC-007] HR Admin creates an employee through the form and sees them in the directory | E2E | Not run yet | `frontend/e2e/employees.spec.ts` |
| AC-008 | [AC-008] HR Admin edits an employee's field, saves, and sees the new value after a reload | E2E | Not run yet | `frontend/e2e/employees.spec.ts` |
| AC-009 | [AC-009] the create form offers no field beyond name, email, role and manager | E2E | Not run yet | `frontend/e2e/employees.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_health_reports_ok | Unit | Passed | `backend/tests/test_health.py` |
| — | test_the_openapi_document_builds | Unit | Passed | `backend/tests/test_health.py` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
