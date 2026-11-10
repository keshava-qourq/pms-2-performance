import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { setAuthToken } from "@/lib/api";

function signInAs(role: "employee" | "manager" | "hr_admin", id: string) {
  setAuthToken(`tok-${id}`);
  window.localStorage.setItem(
    "pms_auth_user",
    JSON.stringify({ id, name: "Test User", email: `${id}@example.com`, role }),
  );
}

describe("Role-based route guard and navigation", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setAuthToken(null);
  });

  it("[AC-004] redirects a manager visiting /employees to their landing page with the denial message", () => {
    signInAs("manager", "u-mgr");
    render(
      <MemoryRouter initialEntries={["/employees"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/you do not have access to that area/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My dashboard" })).toBeInTheDocument();
  });

  it("[AC-004] redirects an employee visiting /employees to their landing page with the denial message", () => {
    signInAs("employee", "u-emp");
    render(
      <MemoryRouter initialEntries={["/employees"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/you do not have access to that area/i)).toBeInTheDocument();
  });

  it("[AC-nav] hides the Employee directory link for an employee", () => {
    signInAs("employee", "u-emp2");
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link", { name: "Employee directory" })).toBeNull();
  });

  it("[AC-nav] hides the Employee directory link for a manager", () => {
    signInAs("manager", "u-mgr2");
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link", { name: "Employee directory" })).toBeNull();
  });

  it("[AC-nav] shows the Employee directory link for hr_admin", () => {
    signInAs("hr_admin", "u-hr");
    render(
      <MemoryRouter initialEntries={["/employees"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Employee directory" })).toBeInTheDocument();
  });

  describe("403 handling", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("[NFR-002] a 403 from any API call renders the shared Access denied state, not a blank or raw error screen", async () => {
      signInAs("employee", "u-403");
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 403,
          clone() {
            return this;
          },
          json: async () => ({ detail: "Forbidden" }),
        }),
      );
      render(
        <MemoryRouter initialEntries={["/my-profile"]}>
          <App />
        </MemoryRouter>,
      );
      await waitFor(() => expect(screen.getByText(/^access denied$/i)).toBeInTheDocument());
    });
  });
});
