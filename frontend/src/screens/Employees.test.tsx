import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Employees from "@/screens/Employees";
import { apiFetch, ApiError } from "@/lib/api";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: vi.fn() };
});

function renderScreen() {
  return render(
    <MemoryRouter>
      <Employees />
    </MemoryRouter>,
  );
}

function page(items: unknown[], total: number, page = 1) {
  return { items, total, page, page_size: 25 };
}

const ALICE = {
  id: "e-1",
  name: "Alice Manager",
  email: "alice@example.com",
  role: "manager",
  manager_id: null,
  status: "active",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
};

const BOB = {
  id: "e-2",
  name: "Bob Employee",
  email: "bob@example.com",
  role: "employee",
  manager_id: "e-1",
  status: "active",
  created_at: "2023-01-02T00:00:00Z",
  updated_at: "2023-01-02T00:00:00Z",
};

describe("Employees screen", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("[AC-dir] shows a loading state while GET /admin/employees is in flight", () => {
    vi.mocked(apiFetch).mockReturnValue(new Promise(() => {}));
    renderScreen();
    expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  });

  it("[AC-dir] shows an empty state when the directory has no matches", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([], 0));
    renderScreen();
    expect(await screen.findByText(/no employees found/i)).toBeInTheDocument();
  });

  it("[AC-dir] shows a readable error state and can retry", async () => {
    vi.mocked(apiFetch).mockRejectedValueOnce(new Error("network down"));
    renderScreen();
    expect(await screen.findByRole("alert")).toHaveTextContent(/network down/i);

    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(await screen.findByText("Alice Manager")).toBeInTheDocument();
  });

  it("[AC-dir] lists employees from GET /admin/employees with no seeded sample data, and removes all seeded arrays", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE, BOB], 2));
    renderScreen();
    expect((await screen.findAllByText("Alice Manager")).length).toBeGreaterThan(0);
    expect(screen.getByText("Bob Employee")).toBeInTheDocument();
    expect(screen.queryByText("Marguerite Oyelaran")).toBeNull();
    expect(screen.queryByText(/northbeam/i)).toBeNull();
  });

  it("[AC-dir] server-side searches, resetting to page 1 and debouncing the query", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE, BOB], 2));
    renderScreen();
    await screen.findAllByText("Alice Manager");

    vi.mocked(apiFetch).mockResolvedValueOnce(page([BOB], 1));
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: "bob" } });

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(
        expect.stringMatching(/search=bob.*page=1/),
      ),
    );
  });

  it("[AC-dir] NFR-007 paginates rather than rendering everything: Next requests page 2", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 60, 1));
    renderScreen();
    await screen.findByText("Alice Manager");

    vi.mocked(apiFetch).mockResolvedValueOnce(page([BOB], 60, 2));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(expect.stringMatching(/page=2/)),
    );
    expect(await screen.findByText("Bob Employee")).toBeInTheDocument();
  });

  it("[AC-009] the create form collects only name, email, role and manager", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    renderScreen();
    await screen.findByText("Alice Manager");
    fireEvent.click(screen.getByRole("button", { name: /new employee/i }));

    const form = screen.getByRole("form", { name: /add employee/i });
    expect(within(form).getByLabelText(/full name/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/work email/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/^role$/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/^manager$/i)).toBeInTheDocument();
    expect(within(form).queryByLabelText(/address/i)).toBeNull();
    expect(within(form).queryByLabelText(/date of birth/i)).toBeNull();
    expect(within(form).queryByLabelText(/salary/i)).toBeNull();
  });

  it("[AC-val] shows inline validation for required name, invalid email and does not submit", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    renderScreen();
    await screen.findByText("Alice Manager");
    fireEvent.click(screen.getByRole("button", { name: /new employee/i }));

    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "not-an-email" } });
    fireEvent.click(screen.getByRole("button", { name: /^add employee$/i }));

    expect(await screen.findByText(/enter the employee's full name/i)).toBeInTheDocument();
    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(apiFetch).toHaveBeenCalledTimes(1); // only the initial GET
  });

  it("[AC-007] creating an employee POSTs name/email/role/manager and shows it in the directory on 201 with no reload", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    renderScreen();
    await screen.findByText("Alice Manager");
    fireEvent.click(screen.getByRole("button", { name: /new employee/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Carol New" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "carol@example.com" } });
    fireEvent.change(screen.getByLabelText(/^manager$/i), { target: { value: "e-1" } });

    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "e-3",
      name: "Carol New",
      email: "carol@example.com",
      role: "employee",
      manager_id: "e-1",
      status: "active",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    });

    fireEvent.click(screen.getByRole("button", { name: /^add employee$/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(
        "/admin/employees",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "Carol New",
            email: "carol@example.com",
            role: "employee",
            manager_id: "e-1",
          }),
        }),
      ),
    );
    expect(await screen.findByText("Carol New")).toBeInTheDocument();
  });

  it("[AC-server] a 409 on create shows 'Email already in use' on the email field", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    renderScreen();
    await screen.findByText("Alice Manager");
    fireEvent.click(screen.getByRole("button", { name: /new employee/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Dupe" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "alice@example.com" } });

    vi.mocked(apiFetch).mockRejectedValueOnce(
      new ApiError("Email already in use", 409, "Email already in use"),
    );
    fireEvent.click(screen.getByRole("button", { name: /^add employee$/i }));

    expect(await screen.findByText(/email already in use/i)).toBeInTheDocument();
  });

  it("[AC-008] editing submits only changed fields via PATCH and shows the update in the list", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE, BOB], 2));
    renderScreen();
    await screen.findByText("Bob Employee");

    fireEvent.click(screen.getByRole("button", { name: /edit bob employee/i }));
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Bob Updated" } });

    vi.mocked(apiFetch).mockResolvedValueOnce({ ...BOB, name: "Bob Updated" });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(
        "/admin/employees/e-2",
        expect.objectContaining({ method: "PATCH", body: JSON.stringify({ name: "Bob Updated" }) }),
      ),
    );
    expect(await screen.findByText("Bob Updated")).toBeInTheDocument();
  });

  it("[AC-server] a 422 shows field-level messages from the server", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce(page([ALICE], 1));
    renderScreen();
    await screen.findByText("Alice Manager");
    fireEvent.click(screen.getByRole("button", { name: /new employee/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Someone" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "someone@example.com" } });

    const error = new ApiError("Validation failed", 422, undefined as unknown as string);
    (error as unknown as { detail: unknown }).detail = [
      { loc: ["body", "name"], msg: "Name is too long" },
    ];
    vi.mocked(apiFetch).mockRejectedValueOnce(error);
    fireEvent.click(screen.getByRole("button", { name: /^add employee$/i }));

    expect(await screen.findByText(/name is too long/i)).toBeInTheDocument();
  });
});
