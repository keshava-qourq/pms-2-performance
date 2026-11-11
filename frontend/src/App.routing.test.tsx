import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import App from "@/App";
import { setAuthToken } from "@/lib/api";

describe("App routing guard", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setAuthToken(null);
  });

  it("[AC-route] redirects an unauthenticated visit to a protected route back to /login", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/secure sign-in/i)).toBeInTheDocument();
  });

  it("[AC-route] renders the shell once a session is stored", () => {
    setAuthToken("tok-1");
    window.localStorage.setItem(
      "pms_auth_user",
      JSON.stringify({ id: "u-1", name: "Rosa", email: "r@example.com", role: "manager" })
    );
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: "My dashboard" })).toBeInTheDocument();
  });
});
