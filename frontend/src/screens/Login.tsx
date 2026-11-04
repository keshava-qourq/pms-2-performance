// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { AlertCircle } = Icons;

const PRODUCT = "PMS 2 performance";
const SCREEN = "Secure sign-in";
const HAIRLINE = "1px solid rgba(255,255,255,0.10)";

// Seeded employee records (employees: id, name, email, role, manager_id, status)
const ACCOUNTS = [
  {
    id: "emp-1042",
    name: "Rosa Lindqvist",
    email: "rosa.lindqvist@northbay.co",
    password: "Keyresult-24",
    role: "Employee",
    manager_id: "emp-0617",
    status: "active",
    landing: "dashboard",
    landingLabel: "My dashboard",
  },
  {
    id: "emp-0617",
    name: "Nadia Osei",
    email: "nadia.osei@northbay.co",
    password: "Keyresult-24",
    role: "Manager",
    manager_id: "emp-0031",
    status: "active",
    landing: "dashboard",
    landingLabel: "My dashboard",
  },
  {
    id: "emp-0031",
    name: "Marcus Aldrete",
    email: "marcus.aldrete@northbay.co",
    password: "Keyresult-24",
    role: "HR Admin",
    manager_id: null,
    status: "active",
    landing: "employees",
    landingLabel: "Employee directory",
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | checking | error | done
  const [session, setSession] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const [demoIndex, setDemoIndex] = React.useState(0);
  const [filled, setFilled] = React.useState(null);
  const timer = React.useRef(null);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const field = { border: HAIRLINE, borderRadius: brand.radius, height: 46, backgroundColor: "rgba(0,0,0,0.25)", color: brand.primaryColor };
  const label = { color: brand.neutralColor, letterSpacing: "0.18em" };
  const focusStyle = (name) =>
    focused === name
      ? { ...field, borderColor: brand.accentColor, boxShadow: `0 0 0 2px ${brand.accentColor}33` }
      : field;

  const submit = (e) => {
    e.preventDefault();
    if (status === "checking") return;
    setStatus("checking");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const match = ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );
      if (match) {
        setSession(match);
        setStatus("done");
      } else {
        setStatus("error"); // email and password are preserved on purpose
      }
    }, 650);
  };

  const useDemo = () => {
    const next = ACCOUNTS[demoIndex % ACCOUNTS.length];
    setEmail(next.email);
    setPassword(next.password);
    setFilled(next);
    setDemoIndex(demoIndex + 1);
    if (status === "error") setStatus("idle");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <main className="w-full max-w-md p-10" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: HAIRLINE, borderRadius: brand.radius }}>
        <h1 className="text-3xl" style={{ fontFamily: brand.fontHeading }}>{PRODUCT}</h1>
        <div aria-hidden className="mt-3 h-px w-12" style={{ backgroundColor: brand.accentColor }} />
        <p className="mt-3 text-xs uppercase" style={label}>{SCREEN}</p>

        {status === "done" && session ? (
          <div className="mt-8">
            <p role="status" className="text-xl" style={{ fontFamily: brand.fontHeading }}>
              Welcome back, {session.name.split(" ")[0]}.
            </p>
            <p className="mt-2 text-sm" style={{ color: brand.neutralColor }}>
              Signed in as {session.email}.
            </p>
            <p className="mt-6 text-xs uppercase" style={label}>
              Role <span style={{ color: brand.accentColor }}>{session.role}</span> · Landing on {session.landingLabel}
            </p>
            <button
              type="button"
              onClick={() => navigate(session.landing)}
              className="mt-6 h-12 w-full text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: brand.accentColor, color: brand.backgroundColor, borderRadius: brand.radius, outlineColor: brand.accentColor }}
            >
              Continue to {session.landingLabel}
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
            {status === "error" && (
              <div
                role="alert"
                className="flex gap-3 p-3"
                style={{ border: HAIRLINE, borderRadius: brand.radius, backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
                <div>
                  <p className="text-xs font-bold uppercase" style={{ ...label, color: brand.primaryColor }}>Sign-in failed</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.neutralColor }}>
                    That email and password don’t match an account on this workspace. Your entries are kept — check both and try again.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="vl-email" className="block text-xs uppercase" style={label}>Work email</label>
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
              <label htmlFor="vl-password" className="block text-xs uppercase" style={label}>Password</label>
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
              style={{ backgroundColor: brand.accentColor, color: brand.backgroundColor, borderRadius: brand.radius, outlineColor: brand.accentColor }}
            >
              {status === "checking" ? "Checking credentials…" : "Sign in"}
            </button>
            <p className="text-xs leading-relaxed" style={{ color: brand.neutralColor }}>
              Email and password only — single sign-on arrives in a later release.
            </p>
          </form>
        )}

        <p className="mt-8 text-xs uppercase" style={label}>
          Accounts are issued by your HR Admin.{" "}
          <button
            type="button"
            onClick={useDemo}
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2"
            style={{ color: brand.accentColor, outlineColor: brand.accentColor }}
          >
            Use a demo account
          </button>
          {filled && (
            <span role="status" className="mt-2 block normal-case" style={{ letterSpacing: "normal" }}>
              Filled {filled.role}: {filled.email}
            </span>
          )}
        </p>
      </main>
    </div>
  );
}
