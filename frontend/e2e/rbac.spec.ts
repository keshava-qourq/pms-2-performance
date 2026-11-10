import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import { expect, test } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_DIR = path.resolve(__dirname, "../../backend");
const PASSWORD = "Password123!";
const EMPLOYEE_EMAIL = "employee@example.com";

// Seeds the same demo accounts backend/tests/conftest.py uses. Safe to call repeatedly.
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

test("[AC-004] signed in as an employee, no HR Admin navigation is shown", async ({ page }) => {
  await signIn(page, EMPLOYEE_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/dashboard$/);

  await expect(page.getByRole("link", { name: /employee directory/i })).toHaveCount(0);
});

test("[AC-004] an employee who visits /employees directly is redirected with an access-denied message", async ({
  page,
}) => {
  await signIn(page, EMPLOYEE_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/employees");

  await expect(page).not.toHaveURL(/\/employees$/);
  await expect(page.getByRole("alert")).toContainText(/access denied/i);
  await expect(page.getByRole("alert")).toContainText(/do not have access/i);
});
