import * as React from "react";
import { NavLink, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import Login from "@/screens/Login";
import Dashboard from "@/screens/Dashboard";
import Goals from "@/screens/Goals";
import Feedback from "@/screens/Feedback";
import MyProfile from "@/screens/MyProfile";
import Employees from "@/screens/Employees";
import { AuthProvider, landingPathForRole, useAuth, type Role } from "@/lib/auth";
import { AccessDenied } from "@/lib/AccessDenied";

// Guards every route below it: an unauthenticated visit to anything other than
// /login bounces back there.
function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// Guards admin-only routes: a signed-in user whose role is not in `roles` is sent back to
// their own landing page with a message the shell surfaces, rather than seeing the page at
// all. Client-side only -- the API enforces the real boundary on every request.
function RequireRole({ roles }: { roles: Role[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) {
    return (
      <Navigate
        to={landingPathForRole(user.role)}
        replace
        state={{ accessDeniedMessage: "You do not have access to that area" }}
      />
    );
  }
  return <Outlet />;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The screens behind sign-in render inside the side menu. Login and the other
// screens shown before sign-in render on their own, with no menu around them.
function Shell() {
  const { user, forbidden, clearForbidden } = useAuth();
  const location = useLocation();
  const [routeDeniedMessage, setRouteDeniedMessage] = React.useState<string | null>(
    (location.state as { accessDeniedMessage?: string } | null)?.accessDeniedMessage ?? null,
  );

  // A denial (route-guard or API 403) belongs to the page that triggered it; moving on to
  // another page clears it rather than following the user around.
  React.useEffect(() => {
    clearForbidden();
    setRouteDeniedMessage(
      (location.state as { accessDeniedMessage?: string } | null)?.accessDeniedMessage ?? null,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isHrAdmin = user?.role === "hr_admin";

  return (
    <div className="flex min-h-screen">
      <aside
        className="w-56 shrink-0 border-r p-4"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <p
          className="mb-4 px-3 text-sm font-semibold"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          {"PMS 2 performance"}
        </p>
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard" className={navLinkClass}>
            {"My dashboard"}
          </NavLink>
          <NavLink to="/goals" className={navLinkClass}>
            {"Goals"}
          </NavLink>
          <NavLink to="/feedback" className={navLinkClass}>
            {"Feedback"}
          </NavLink>
          <NavLink to="/my-profile" className={navLinkClass}>
            {"My profile"}
          </NavLink>
          {isHrAdmin ? (
            <NavLink to="/employees" className={navLinkClass}>
              {"Employee directory"}
            </NavLink>
          ) : null}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {routeDeniedMessage ? (
          <AccessDenied
            message={routeDeniedMessage}
            onDismiss={() => setRouteDeniedMessage(null)}
          />
        ) : null}
        {forbidden ? <AccessDenied onDismiss={clearForbidden} /> : <Outlet />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<Shell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/me" element={<MyProfile />} />
            <Route element={<RequireRole roles={["hr_admin"]} />}>
              <Route path="/employees" element={<Employees />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
