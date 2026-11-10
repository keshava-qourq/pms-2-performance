/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails --
// which `vite build` does not catch, because it tree-shakes this module out when no screen
// imports it yet.
//
// Where the generated API lives.
//
// Set at build time: the platform bakes the deployed API URL into the frontend build. The
// fallback is the local backend so a bare `npm run dev` still points somewhere real.
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

// The shared bearer the deployed API expects (its SECRET_KEY), used only while no signed-in
// user token exists yet (e.g. the login call itself).
export const API_SECRET_KEY: string = import.meta.env.VITE_API_SECRET_KEY ?? "";

const TOKEN_STORAGE_KEY = "pms_auth_token";

function readStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

let authToken: string | null = readStoredToken();
let unauthorizedHandler: (() => void) | null = null;

/** Sets (or clears) the bearer token apiFetch attaches to every later call, and persists it. */
export function setAuthToken(token: string | null): void {
  authToken = token;
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getAuthToken(): string | null {
  return authToken;
}

/** Registered by the auth store so a 401 anywhere can clear the session. */
export function onUnauthorized(handler: (() => void) | null): void {
  unauthorizedHandler = handler;
}

export class ApiError extends Error {
  status: number;
  detail?: string;
  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const isLogin = path === "/auth/login";
  const bearer = isLogin ? API_SECRET_KEY : (authToken ?? API_SECRET_KEY);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 401 && !isLogin) {
    setAuthToken(null);
    unauthorizedHandler?.();
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const body = (await response.clone().json()) as { detail?: string };
      detail = body?.detail;
    } catch {
      // no JSON body on this response
    }
    throw new ApiError(
      detail ?? `${init?.method ?? "GET"} ${path} failed: ${response.status}`,
      response.status,
      detail
    );
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}
