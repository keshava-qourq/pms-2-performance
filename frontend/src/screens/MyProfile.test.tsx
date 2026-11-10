import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MyProfile from "@/screens/MyProfile";
import { apiFetch } from "@/lib/api";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: vi.fn() };
});

function renderProfile() {
  return render(
    <MemoryRouter>
      <MyProfile />
    </MemoryRouter>
  );
}

describe("MyProfile", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("[AC-015] shows a loading state while GET /me is in flight", () => {
    vi.mocked(apiFetch).mockReturnValue(new Promise(() => {}));
    renderProfile();
    expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  });

  it("[AC-015] shows a readable error state when GET /me fails", async () => {
    vi.mocked(apiFetch).mockRejectedValueOnce(new Error("Not authenticated"));
    renderProfile();
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not load your profile/i);
  });

  it("[AC-015] renders the logged-in user's own record and assigned manager from GET /me", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "emp-204",
      name: "Amara Ndiaye",
      email: "amara@example.com",
      role: "employee",
      status: "active",
      created_at: "2023-03-04T00:00:00Z",
      updated_at: "2026-10-22T09:42:00Z",
      manager: { id: "emp-100", name: "Thomas Lindqvist", email: "thomas@example.com", role: "manager" },
    });
    renderProfile();
    expect(await screen.findByRole("heading", { name: "Amara Ndiaye" })).toBeInTheDocument();
    expect(screen.getAllByText("Thomas Lindqvist").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/amara@example.com/).length).toBeGreaterThan(0);
  });

  it("[AC-015] shows no manager assigned when GET /me returns manager: null", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "emp-205",
      name: "Jonas Weber",
      email: "jonas@example.com",
      role: "manager",
      status: "active",
      created_at: "2023-03-04T00:00:00Z",
      updated_at: "2026-10-22T09:42:00Z",
      manager: null,
    });
    renderProfile();
    expect(await screen.findByRole("heading", { name: "Jonas Weber" })).toBeInTheDocument();
    expect(screen.getByText(/no manager is assigned/i)).toBeInTheDocument();
  });
});
