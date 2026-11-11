import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import { expect, test } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_DIR = path.resolve(__dirname, "../../backend");
const PASSWORD = "Password123!";
const HR_ADMIN_EMAIL = "hr.admin@example.com";

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

function uniqueEmail(prefix: string): string {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`;
}

test("[AC-007] HR Admin creates an employee through the form and sees them in the directory", async ({
  page,
}) => {
  await signIn(page, HR_ADMIN_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/employees$/);

  const email = uniqueEmail("new.hire");
  await page.getByRole("button", { name: /new employee/i }).click();
  await page.getByLabel(/full name/i).fill("New Hire");
  await page.getByLabel(/work email/i).fill(email);
  await page.getByLabel(/^role$/i).selectOption("employee");
  await page.getByRole("button", { name: /add employee/i }).click();

  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.getByText(email)).toBeVisible();
  await expect(page.getByText("New Hire")).toBeVisible();
});

test("[AC-008] HR Admin edits an employee's field, saves, and sees the new value after a reload", async ({
  page,
}) => {
  await signIn(page, HR_ADMIN_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/employees$/);

  const email = uniqueEmail("editable");
  await page.getByRole("button", { name: /new employee/i }).click();
  await page.getByLabel(/full name/i).fill("Before Edit");
  await page.getByLabel(/work email/i).fill(email);
  await page.getByLabel(/^role$/i).selectOption("employee");
  await page.getByRole("button", { name: /add employee/i }).click();
  await expect(page.getByText(email)).toBeVisible();

  const row = page.getByRole("row", { name: new RegExp(email) });
  await row.getByRole("button", { name: /^edit /i }).click();
  const nameInput = page.getByLabel(/full name/i);
  await nameInput.fill("After Edit");
  await page.getByRole("button", { name: /save changes/i }).click();
  await expect(page.getByText("After Edit")).toBeVisible();

  await page.reload();
  await page.getByLabel(/^search$/i).fill(email);
  await expect(page.getByText("After Edit")).toBeVisible();
  await expect(page.getByText("Before Edit")).toHaveCount(0);
});

test("[AC-009] the create form offers no field beyond name, email, role and manager", async ({
  page,
}) => {
  await signIn(page, HR_ADMIN_EMAIL, PASSWORD);
  await expect(page).toHaveURL(/\/employees$/);

  await page.getByRole("button", { name: /new employee/i }).click();
  const form = page.getByRole("form", { name: /add employee/i });

  await expect(form.getByLabel(/full name/i)).toBeVisible();
  await expect(form.getByLabel(/work email/i)).toBeVisible();
  await expect(form.getByLabel(/^role$/i)).toBeVisible();
  await expect(form.getByLabel(/manager/i)).toBeVisible();

  const inputCount = await form.locator("input, select, textarea").count();
  // name, email, role, manager — exactly these four fields, nothing more.
  expect(inputCount).toBe(4);
});
