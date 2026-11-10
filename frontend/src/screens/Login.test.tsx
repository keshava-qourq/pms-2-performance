import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Login from "@/screens/Login";
import { AuthProvider } from "@/lib/auth";
import { apiFetch } from "@/lib/api";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: vi.fn() };
});

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
    window.localStorage.clear();
  });

  it("[AC-003] states email/password sign-in only, with no SSO path", () => {
    renderLogin();
    expect(screen.getByText(/single sign-on arrives in a later release/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sso|single sign-on|google|microsoft/i })
    ).toBeNull();
  });

  it("[AC-001] submits email+password to POST /auth/login and stores the session on success", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      access_token: "tok-123",
      token_type: "bearer",
      user: { id: "u-1", name: "Rosa Lindqvist", email: "rosa@example.com", role: "manager" },
    });
    renderLogin();
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "rosa@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "secret" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(apiFetch).toHaveBeenCalledWith(
        "/auth/login",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "rosa@example.com", password: "secret" }),
        })
      );
    });
    await waitFor(() => expect(window.localStorage.getItem("pms_auth_token")).toBe("tok-123"));
    expect(JSON.parse(window.localStorage.getItem("pms_auth_user") ?? "{}")).toMatchObject({
      id: "u-1",
      role: "manager",
    });
  });

  it("[AC-002] shows a single non-revealing error on 401 and keeps the form usable", async () => {
    const error = new Error("Invalid email or password");
    vi.mocked(apiFetch).mockRejectedValueOnce(error);
    renderLogin();
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "nobody@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("That email and password don’t match an account");
    expect(screen.getByLabelText(/work email/i)).toBeEnabled();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeEnabled();
  });
});
