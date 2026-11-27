import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    </MemoryRouter>,
  );
}

const PROFILE = {
  id: "emp-204",
  name: "Amara Ndiaye",
  email: "amara@example.com",
  role: "employee",
  status: "active",
  created_at: "2023-03-04T00:00:00Z",
  updated_at: "2026-10-22T09:42:00Z",
  manager: null,
};

function mockMeThen(byPath: Record<string, unknown>) {
  vi.mocked(apiFetch).mockImplementation((path: string) => {
    if (path === "/me") return Promise.resolve(PROFILE);
    if (path in byPath) {
      const value = byPath[path];
      if (value instanceof Error) return Promise.reject(value);
      return Promise.resolve(value);
    }
    return Promise.reject(new Error(`unexpected call to ${path}`));
  });
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
      manager: {
        id: "emp-100",
        name: "Thomas Lindqvist",
        email: "thomas@example.com",
        role: "manager",
      },
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

  it("[AC-040] grants consent for a processing purpose via POST /me/consent and shows it as recorded", async () => {
    mockMeThen({
      "/me/consent": {
        id: "CNS-9000",
        employee_id: "emp-204",
        purpose: "Inclusion in the talent calibration pool",
        status: "granted",
        recorded_at: "2026-10-30T09:51:00Z",
      },
    });
    renderProfile();
    const toggle = await screen.findByRole("switch", {
      name: "Inclusion in the talent calibration pool",
    });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    fireEvent.click(toggle);

    await waitFor(() => expect(toggle).toHaveAttribute("aria-checked", "true"));
    expect(apiFetch).toHaveBeenCalledWith(
      "/me/consent",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          purpose: "Inclusion in the talent calibration pool",
          status: "granted",
        }),
      }),
    );
  });

  it("[AC-040] withdraws a previously granted consent via POST /me/consent", async () => {
    mockMeThen({
      "/me/consent": {
        id: "CNS-0318",
        employee_id: "emp-204",
        purpose: "Peer visibility of continuous feedback",
        status: "withdrawn",
        recorded_at: "2026-10-30T09:51:00Z",
      },
    });
    renderProfile();
    const toggle = await screen.findByRole("switch", {
      name: "Peer visibility of continuous feedback",
    });
    expect(toggle).toHaveAttribute("aria-checked", "true");

    fireEvent.click(toggle);

    await waitFor(() => expect(toggle).toHaveAttribute("aria-checked", "false"));
    expect(screen.getAllByText(/Withdrawn/).length).toBeGreaterThan(0);
  });

  it("[AC-040] shows a saving state on the toggle while POST /me/consent is in flight", async () => {
    let resolveConsent: (value: unknown) => void = () => {};
    vi.mocked(apiFetch).mockImplementation((path: string) => {
      if (path === "/me") return Promise.resolve(PROFILE);
      if (path === "/me/consent")
        return new Promise((resolve) => {
          resolveConsent = resolve;
        });
      return Promise.reject(new Error(`unexpected call to ${path}`));
    });
    renderProfile();
    const toggle = await screen.findByRole("switch", {
      name: "Peer visibility of continuous feedback",
    });

    fireEvent.click(toggle);

    expect(await screen.findByText(/Saving…/)).toBeInTheDocument();
    expect(toggle).toBeDisabled();

    resolveConsent({
      id: "CNS-0318",
      employee_id: "emp-204",
      purpose: "Peer visibility of continuous feedback",
      status: "withdrawn",
      recorded_at: "2026-10-30T09:51:00Z",
    });
    await waitFor(() => expect(toggle).not.toBeDisabled());
  });

  it("[AC-040] shows an error and keeps the prior status when POST /me/consent fails", async () => {
    mockMeThen({ "/me/consent": new Error("network error") });
    renderProfile();
    const toggle = await screen.findByRole("switch", {
      name: "Peer visibility of continuous feedback",
    });

    fireEvent.click(toggle);

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not update that consent/i);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("[AC-040] does not call the consent endpoint for the contract-based, non-withdrawable purpose", async () => {
    mockMeThen({});
    renderProfile();
    const toggle = await screen.findByRole("switch", {
      name: "Performance review processing",
    });
    expect(toggle).toBeDisabled();

    fireEvent.click(toggle);

    await waitFor(() =>
      expect(apiFetch).not.toHaveBeenCalledWith("/me/consent", expect.anything()),
    );
  });
});
