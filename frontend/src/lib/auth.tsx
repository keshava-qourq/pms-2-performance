import * as React from "react";

import { apiFetch, getAuthToken, onForbidden, onUnauthorized, setAuthToken } from "@/lib/api";

export type Role = "employee" | "manager" | "hr_admin";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: SessionUser;
}

const USER_STORAGE_KEY = "pms_auth_user";

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<SessionUser>;
  logout: () => void;
  /** Set when any API call most recently returned 403, so the shell can render the shared
   * "Access denied" state instead of an empty screen or a raw error. */
  forbidden: boolean;
  clearForbidden: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

function loadStoredUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

function storeUser(user: SessionUser | null): void {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(USER_STORAGE_KEY);
}

/** hr_admin lands on the employee directory; manager and employee land on their dashboard. */
export function landingPathForRole(role: Role): string {
  return role === "hr_admin" ? "/employees" : "/dashboard";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SessionUser | null>(() =>
    getAuthToken() ? loadStoredUser() : null,
  );
  const [forbidden, setForbidden] = React.useState(false);
  const clearForbidden = React.useCallback(() => setForbidden(false), []);

  React.useEffect(() => {
    onUnauthorized(() => {
      setUser(null);
      storeUser(null);
    });
    onForbidden(() => setForbidden(true));
    return () => {
      onUnauthorized(null);
      onForbidden(null);
    };
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const response = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(response.access_token);
    storeUser(response.user);
    setUser(response.user);
    return response.user;
  }, []);

  const logout = React.useCallback(() => {
    setAuthToken(null);
    storeUser(null);
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, login, logout, forbidden, clearForbidden }),
    [user, login, logout, forbidden, clearForbidden],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
