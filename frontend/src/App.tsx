import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import Login from "@/screens/Login";
import Dashboard from "@/screens/Dashboard";
import Goals from "@/screens/Goals";
import Feedback from "@/screens/Feedback";
import MyProfile from "@/screens/MyProfile";
import Employees from "@/screens/Employees";
import { AuthProvider, useAuth } from "@/lib/auth";

// Guards every route below it: an unauthenticated visit to anything other than
// /login bounces back there.
function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
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
          <NavLink to="/employees" className={navLinkClass}>
            {"Employee directory"}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
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
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
