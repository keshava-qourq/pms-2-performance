import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Goals from "@/screens/Goals";

function renderScreen() {
  return render(
    <MemoryRouter>
      <Goals />
    </MemoryRouter>,
  );
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
