import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import { expect, test } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_DIR = path.resolve(__dirname, "../../backend");
const PASSWORD = "Password123!";
const EMPLOYEE_EMAIL = "employee@example.com";
const MANAGER_EMAIL = "manager@example.com";
const HR_ADMIN_EMAIL = "hr.admin@example.com";

// The API has no HTTP endpoint to create demo accounts, so this seeds the
// sandbox database the same way backend/tests/conftest.py does: by calling
// the idempotent seed_demo_employees() directly. Safe to call repeatedly.
function seedDemoEmployees(): void {
  execFileSync(
    path.join(BACKEND_DIR, ".venv/bin/python"),
    [
      "-c",
      "from app.database import SessionLocal; from app.seed import seed_demo_employees; " +
        "db = SessionLocal(); seed_demo_employees(db); db.close()",
    ],
    { cwd: BACKEND_DIR, stdio: "inherit" },
  );
}

test.beforeAll(() => {
  seedDemoEmployees();
});

async function signIn(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel(/work email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
}

test("[AC-001] sign in as hr_admin lands on the employee directory", async ({ page }) => {
  await signIn(page, HR_ADMIN_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/employees$/);
});

test("[AC-001] sign in as employee lands on the dashboard", async ({ page }) => {
  await signIn(page, EMPLOYEE_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/dashboard$/);
});

test("[AC-002] a bad password shows one non-field error and stays on /login", async ({ page }) => {
  await signIn(page, EMPLOYEE_EMAIL, "definitely-wrong-password");

  await expect(page).toHaveURL(/\/login$/);
  const alerts = page.getByRole("alert");
  await expect(alerts).toHaveCount(1);
  const text = (await alerts.first().textContent()) ?? "";
  expect(text.toLowerCase()).not.toMatch(/\bemail\b is|\bpassword\b is wrong|\bemail\b not found/);
  // No field is singled out as the one that was wrong.
  expect(text.toLowerCase()).not.toContain("the email you entered does not exist");
  expect(text.toLowerCase()).not.toContain("incorrect password");
});

test("[AC-015] an authenticated employee sees their own profile and manager", async ({ page }) => {
  await signIn(page, EMPLOYEE_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/my-profile");
  await expect(page.getByText("Emery Employee")).toBeVisible();
  await expect(page.getByText(EMPLOYEE_EMAIL)).toBeVisible();
  await expect(page.getByText("Morgan Manager")).toBeVisible();
  await expect(page.getByText(MANAGER_EMAIL)).toBeVisible();
});

test("[AC-guard] visiting a protected route while signed out redirects to /login", async ({
  page,
}) => {
  await page.context().clearCookies();
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("[NFR-008] the login screen is usable on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/login");
  await expect(page.getByLabel(/work email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});
