import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Feedback from "@/screens/Feedback";
import { apiFetch } from "@/lib/api";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: vi.fn() };
});

function renderScreen() {
  return render(
    <MemoryRouter>
      <Feedback />
    </MemoryRouter>,
  );
}

function fillAndChooseColleague() {
  fireEvent.change(screen.getByLabelText(/who is it for/i), {
    target: { value: "emp-112" },
  });
}

describe("Feedback screen — Give feedback", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("[AC-027] prevents saving and prompts to enter feedback when content is empty", async () => {
    renderScreen();
    fillAndChooseColleague();

    fireEvent.click(screen.getByRole("button", { name: /^send feedback$/i }));

    expect(
      await screen.findByText(/write a few lines first.*an empty note can't be sent/i),
    ).toBeInTheDocument();
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it("[AC-027] clears the empty-content prompt once feedback text is entered", async () => {
    renderScreen();
    fillAndChooseColleague();

    fireEvent.click(screen.getByRole("button", { name: /^send feedback$/i }));
    expect(
      await screen.findByText(/write a few lines first.*an empty note can't be sent/i),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/your feedback/i), {
      target: { value: "Great work shipping the migration." },
    });

    expect(screen.queryByText(/write a few lines first.*an empty note can't be sent/i)).toBeNull();
  });

  it("[AC-026] saves feedback for the chosen colleague through the generated client and lists it as given", async () => {
    renderScreen();
    fillAndChooseColleague();

    fireEvent.change(screen.getByLabelText(/your feedback/i), {
      target: { value: "Great work shipping the migration ahead of schedule." },
    });

    vi.mocked(apiFetch).mockResolvedValueOnce({
      id: "fb-900",
      author_id: "emp-104",
      recipient_id: "emp-112",
      request_id: null,
      content: "Great work shipping the migration ahead of schedule.",
      created_at: "2026-11-27T00:00:00Z",
    });

    fireEvent.click(screen.getByRole("button", { name: /^send feedback$/i }));

    await waitFor(() =>
      expect(apiFetch).toHaveBeenLastCalledWith(
        "/feedback",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            recipient_id: "emp-112",
            content: "Great work shipping the migration ahead of schedule.",
            request_id: null,
          }),
        }),
      ),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      /feedback sent to amara okafor\. only the two of you and your managers can read it\./i,
    );
    expect(screen.getByLabelText(/your feedback/i)).toHaveValue("");
  });

  it("[AC-026] shows a readable error and keeps the draft when saving fails", async () => {
    renderScreen();
    fillAndChooseColleague();

    fireEvent.change(screen.getByLabelText(/your feedback/i), {
      target: { value: "Great work on the release." },
    });

    vi.mocked(apiFetch).mockRejectedValueOnce(new Error("network down"));
    fireEvent.click(screen.getByRole("button", { name: /^send feedback$/i }));

    expect(await screen.findByText(/network down/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your feedback/i)).toHaveValue("Great work on the release.");
  });
});
