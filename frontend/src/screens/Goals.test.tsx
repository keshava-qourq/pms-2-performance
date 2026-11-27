import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Goals from "@/screens/Goals";
import { apiFetch } from "@/lib/api";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: vi.fn() };
});

function renderScreen() {
  return render(
    <MemoryRouter>
      <Goals />
    </MemoryRouter>,
  );
}

function openComposer() {
  fireEvent.click(screen.getByRole("button", { name: /new objective/i }));
}

describe("Goals screen — manager-scoped view", () => {
  it("[AC-005] shows the signed-in manager's own objectives by default", async () => {
    renderScreen();
    expect(await screen.findByText(/priya raghunathan\s*·\s*your objectives/i)).toBeInTheDocument();
  });

  it("[AC-005] the Team review tab lists only the manager's direct reports, not unrelated employees", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    fireEvent.click(screen.getByRole("button", { name: /team review/i }));

    const rail = screen.getByRole("heading", { name: /direct reports/i }).closest("aside");
    expect(rail).not.toBeNull();
    const reportsRail = within(rail as HTMLElement);
    expect(reportsRail.getByText("Mateo Ferrante")).toBeInTheDocument();
    expect(reportsRail.getByText("Hannah Okonjo")).toBeInTheDocument();
    expect(reportsRail.getByText("Lars Dahlberg")).toBeInTheDocument();
    expect(reportsRail.getByText("Nadia Haddad")).toBeInTheDocument();
    expect(reportsRail.queryByText("Clara Beaumont")).toBeNull();
    expect(reportsRail.queryByText("Rajiv Menon")).toBeNull();
  });

  it("[AC-005] selecting a direct report shows that report's objectives, read-only", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    fireEvent.click(screen.getByRole("button", { name: /team review/i }));
    fireEvent.click(screen.getByRole("button", { name: /mateo ferrante/i }));

    expect(
      await screen.findByText(/mateo ferrante\s*·\s*senior backend engineer/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/read-only/i)).toBeInTheDocument();
  });

  it("[AC-005] opening goals for an employee outside the reporting line is denied rather than shown", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    fireEvent.click(screen.getByRole("button", { name: /team review/i }));

    fireEvent.change(screen.getByLabelText(/open another employee/i), {
      target: { value: "emp-210" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^open goals$/i }));

    expect(
      await screen.findByText(/clara beaumont.s goals are closed to you/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you can open goals for yourself and the four people who report to you/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /access check/i })).toBeInTheDocument();
  });

  it("[AC-005] the lookup form states the manager's scope: themself and their direct reports only", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    fireEvent.click(screen.getByRole("button", { name: /team review/i }));

    expect(
      screen.getByText(
        /as a manager you can open goals for yourself and your direct reports only/i,
      ),
    ).toBeInTheDocument();
  });
});

describe("Goals screen — Create Goal form", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("[AC-017] prevents saving and names the required fields when title and key result are both missing", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    openComposer();

    fireEvent.click(screen.getByRole("button", { name: /^save objective$/i }));

    expect(await screen.findByText(/give the objective a title/i)).toBeInTheDocument();
    expect(screen.getByText(/add at least one key result with a title/i)).toBeInTheDocument();
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("[AC-017] names only the missing key result when the title is filled in", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    openComposer();

    fireEvent.change(screen.getByLabelText(/objective title/i), {
      target: { value: "Cut support backlog" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^save objective$/i }));

    expect(
      await screen.findByText(/add at least one key result with a title/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/give the objective a title/i)).toBeNull();
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("[AC-017] names only the missing title when a key result is filled in", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    openComposer();

    fireEvent.change(screen.getByLabelText(/^key result 1$/i), {
      target: { value: "Open tickets older than a week" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^save objective$/i }));

    expect(await screen.findByText(/give the objective a title/i)).toBeInTheDocument();
    expect(screen.queryByText(/add at least one key result with a title/i)).toBeNull();
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("[AC-016] creates an objective with a title, description and key result, and lists it among my goals", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    openComposer();

    fireEvent.change(screen.getByLabelText(/objective title/i), {
      target: { value: "Cut support backlog to zero" },
    });
    fireEvent.change(screen.getByLabelText(/why this matters/i), {
      target: { value: "Backlog grew past what the team can triage." },
    });
    fireEvent.change(screen.getByLabelText(/^key result 1$/i), {
      target: { value: "Open tickets older than a week" },
    });
    fireEvent.change(screen.getByLabelText(/^target$/i), { target: { value: "0" } });

    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "g-900",
      employee_id: "emp-001",
      title: "Cut support backlog to zero",
      description: "Backlog grew past what the team can triage.",
      status: "active",
      approval_status: "draft",
      progress: 0,
      created_at: "2026-11-26T00:00:00Z",
      key_results: [
        {
          id: "kr-900",
          goal_id: "g-900",
          title: "Open tickets older than a week",
          target_value: 0,
          current_value: 0,
          status: "not_started",
        },
      ],
    });

    fireEvent.click(screen.getByRole("button", { name: /^save objective$/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(
        "/goals",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            title: "Cut support backlog to zero",
            description: "Backlog grew past what the team can triage.",
            key_results: [{ title: "Open tickets older than a week", target_value: 0 }],
          }),
        }),
      ),
    );

    expect(await screen.findByText("Cut support backlog to zero")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/saved and listed among your goals/i);
  });

  it("[AC-016] shows a readable error and keeps the form open when saving fails", async () => {
    renderScreen();
    await screen.findByText(/your objectives/i);
    openComposer();

    fireEvent.change(screen.getByLabelText(/objective title/i), {
      target: { value: "Reduce on-call noise" },
    });
    fireEvent.change(screen.getByLabelText(/^key result 1$/i), {
      target: { value: "Pages per week" },
    });

    vi.mocked(apiFetch).mockRejectedValueOnce(new Error("network down"));
    fireEvent.click(screen.getByRole("button", { name: /^save objective$/i }));

    expect(await screen.findByText(/network down/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/objective title/i)).toHaveValue("Reduce on-call noise");
  });
});
