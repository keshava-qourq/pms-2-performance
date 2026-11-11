import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useAuth, landingPathForRole } from "@/lib/auth";

const { AlertCircle } = Icons;

const PRODUCT = "PMS 2 performance";
const SCREEN = "Secure sign-in";
const HAIRLINE = "1px solid rgba(255,255,255,0.10)";

type Status = "idle" | "checking" | "error";

export default function Screen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [focused, setFocused] = React.useState<string | null>(null);

  const field = {
    border: HAIRLINE,
    borderRadius: brand.radius,
    height: 46,
    backgroundColor: "rgba(0,0,0,0.25)",
    color: brand.primaryColor,
  };
  const label = { color: brand.neutralColor, letterSpacing: "0.18em" };
  const focusStyle = (name: string) =>
    focused === name
      ? { ...field, borderColor: brand.accentColor, boxShadow: `0 0 0 2px ${brand.accentColor}33` }
      : field;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "checking") return;
    setStatus("checking");
    try {
      const user = await login(email, password);
      navigate(landingPathForRole(user.role), { replace: true });
    } catch {
      // Never reveal whether the email or the password was wrong.
      setStatus("error");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}
    >
      <main
        className="w-full max-w-md p-10"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: HAIRLINE, borderRadius: brand.radius }}
      >
        <h1 className="text-3xl" style={{ fontFamily: brand.fontHeading }}>
          {PRODUCT}
        </h1>
        <div aria-hidden className="mt-3 h-px w-12" style={{ backgroundColor: brand.accentColor }} />
        <p className="mt-3 text-xs uppercase" style={label}>
          {SCREEN}
        </p>

        <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
          {status === "error" && (
            <div
              role="alert"
              className="flex gap-3 p-3"
              style={{ border: HAIRLINE, borderRadius: brand.radius, backgroundColor: "rgba(0,0,0,0.25)" }}
            >
              <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
              <div>
                <p className="text-xs font-bold uppercase" style={{ ...label, color: brand.primaryColor }}>
                  Sign-in failed
                </p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                  That email and password don’t match an account. Your entries are kept — check both
                  and try again.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="vl-email" className="block text-xs uppercase" style={label}>
              Work email
            </label>
            <input
              id="vl-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              aria-invalid={status === "error"}
              className="w-full px-3 text-sm outline-none"
              style={focusStyle("email")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="vl-password" className="block text-xs uppercase" style={label}>
              Password
            </label>
            <input
              id="vl-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              aria-invalid={status === "error"}
              className="w-full px-3 text-sm outline-none"
              style={focusStyle("password")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "checking"}
            aria-busy={status === "checking"}
            className="h-12 w-full text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: brand.accentColor,
              color: brand.backgroundColor,
              borderRadius: brand.radius,
              outlineColor: brand.accentColor,
            }}
          >
            {status === "checking" ? "Checking credentials…" : "Sign in"}
          </button>
          <p className="text-xs leading-relaxed" style={{ color: brand.neutralColor }}>
            Email and password only — single sign-on arrives in a later release.
          </p>
        </form>

        <p className="mt-8 text-xs uppercase" style={label}>
          Accounts are issued by your HR Admin.
        </p>
      </main>
    </div>
  );
}
