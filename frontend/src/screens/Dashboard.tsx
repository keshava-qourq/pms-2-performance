// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Button, Input, Label, Switch, Badge, Avatar, Separator, Tabs, Empty } = UI;

const { Filter } = Icons;

const ME = {
  id: "emp-204",
  name: "Amara Ndiaye",
  title: "Senior Product Designer",
  email: "amara.ndiaye@northfield.co",
  manager: "Thomas Lindqvist",
};

const CYCLE = { label: "Q4 2026", dayOf: 30, days: 92, lockDate: "15 November" };

const INITIAL_GOALS = [
  {
    id: "g-4412",
    ref: "OKR-4412",
    title: "Ship the Q4 design system refresh",
    description: "Token-first components across web and mobile, owned jointly with Platform.",
    status: "active",
    approval_status: "approved",
    health: "on_track",
    due: "19 Dec",
    key_results: [
      {
        id: "kr-1",
        title: "Components migrated to design tokens",
        current_value: 86,
        target_value: 120,
        status: "on_track",
      },
      {
        id: "kr-2",
        title: "Joint design reviews run with engineering",
        current_value: 14,
        target_value: 20,
        status: "on_track",
      },
      {
        id: "kr-3",
        title: "Product teams onboarded to the kit",
        current_value: 2,
        target_value: 3,
        status: "at_risk",
      },
    ],
  },
  {
    id: "g-4398",
    ref: "OKR-4398",
    title: "Raise first-week activation to 62%",
    description: "Rework the onboarding path for self-serve accounts in EMEA.",
    status: "active",
    approval_status: "approved",
    health: "at_risk",
    due: "12 Dec",
    key_results: [
      {
        id: "kr-4",
        title: "First-week activation rate (%)",
        current_value: 41,
        target_value: 62,
        status: "at_risk",
      },
      {
        id: "kr-5",
        title: "Onboarding checklists completed",
        current_value: 28,
        target_value: 80,
        status: "at_risk",
      },
      {
        id: "kr-6",
        title: "In-product tour sessions started",
        current_value: 320,
        target_value: 900,
        status: "at_risk",
      },
    ],
  },
  {
    id: "g-4376",
    ref: "OKR-4376",
    title: "Mentor two designers to mid-level",
    description: "Structured coaching for Lina Achterberg and Dev Raman.",
    status: "active",
    approval_status: "approved",
    health: "on_track",
    due: "31 Dec",
    key_results: [
      {
        id: "kr-7",
        title: "Coaching sessions held",
        current_value: 9,
        target_value: 16,
        status: "on_track",
      },
      {
        id: "kr-8",
        title: "Portfolio reviews completed",
        current_value: 3,
        target_value: 4,
        status: "on_track",
      },
      {
        id: "kr-9",
        title: "Promotion cases drafted",
        current_value: 1,
        target_value: 2,
        status: "on_track",
      },
    ],
  },
  {
    id: "g-4451",
    ref: "OKR-4451",
    title: "Cut checkout support escalations by 30%",
    description: "Follow-on work from the Atlas migration post-mortem.",
    status: "active",
    approval_status: "submitted",
    health: "on_track",
    due: "31 Dec",
    key_results: [
      {
        id: "kr-10",
        title: "Escalations avoided per month",
        current_value: 8,
        target_value: 30,
        status: "on_track",
      },
      {
        id: "kr-11",
        title: "Root-cause fixes shipped",
        current_value: 1,
        target_value: 5,
        status: "on_track",
      },
    ],
  },
  {
    id: "g-4301",
    ref: "OKR-4301",
    title: "Publish the 2026 accessibility audit",
    description: "WCAG 2.2 AA sweep of the customer-facing estate. Closed 14 Oct.",
    status: "completed",
    approval_status: "approved",
    health: "on_track",
    due: "14 Oct",
    key_results: [
      {
        id: "kr-12",
        title: "Page templates reviewed",
        current_value: 48,
        target_value: 48,
        status: "done",
      },
      {
        id: "kr-13",
        title: "Critical issues logged and triaged",
        current_value: 31,
        target_value: 31,
        status: "done",
      },
      {
        id: "kr-14",
        title: "Teams briefed on findings",
        current_value: 12,
        target_value: 12,
        status: "done",
      },
    ],
  },
  {
    id: "g-4440",
    ref: "OKR-4440",
    title: "Run the quarterly research panel",
    description: "Thomas asked for a tighter recruitment measure before approving.",
    status: "active",
    approval_status: "changes_requested",
    health: "at_risk",
    due: "20 Dec",
    key_results: [
      {
        id: "kr-15",
        title: "Panel participants recruited",
        current_value: 6,
        target_value: 24,
        status: "at_risk",
      },
      {
        id: "kr-16",
        title: "Sessions run and written up",
        current_value: 2,
        target_value: 12,
        status: "at_risk",
      },
    ],
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "n-901",
    type: "feedback_request",
    icon: "users",
    typeLabel: "Feedback request",
    message: "Priya Raghunathan asked you for feedback on the Atlas checkout migration.",
    detail:
      "“You sat in on all three escalation reviews — I’d value your read on how the handover to Support went.” She’d like a reply by Friday 6 Nov.",
    created_at: "Today, 08:41",
    is_read: false,
    cta: { label: "Write feedback", route: "feedback" },
  },
  {
    id: "n-900",
    type: "goal_update",
    icon: "check",
    typeLabel: "Goal approved",
    message: "Thomas Lindqvist approved “Ship the Q4 design system refresh”.",
    detail:
      "Approved 29 Oct at 17:20 with no changes requested. The objective now counts towards your Q4 cycle.",
    created_at: "Yesterday, 17:20",
    is_read: false,
    cta: { label: "Open in Goals", route: "goals" },
  },
  {
    id: "n-898",
    type: "goal_update",
    icon: "alert",
    typeLabel: "Changes requested",
    message: "Thomas Lindqvist requested changes on “Run the quarterly research panel”.",
    detail:
      "“A recruitment target of 24 feels light for a panel this broad — can we say 24 across four markets, and add a write-up measure?”",
    created_at: "Tue 27 Oct, 11:05",
    is_read: false,
    cta: { label: "Revise objective", route: "goals" },
  },
  {
    id: "n-894",
    type: "goal_update",
    icon: "clock",
    typeLabel: "Awaiting review",
    message: "“Cut checkout support escalations by 30%” has been with your manager for 6 days.",
    detail:
      "Submitted 20 Oct. Objectives lock for the cycle on 15 November — nudge Thomas if it stays unreviewed.",
    created_at: "Mon 26 Oct, 09:00",
    is_read: false,
    cta: { label: "Open in Goals", route: "goals" },
  },
  {
    id: "n-889",
    type: "feedback",
    icon: "file",
    typeLabel: "Feedback received",
    message: "Jonas Weber left you feedback on the design system review.",
    detail:
      "“The token naming walkthrough saved my team a week. Next time share the migration map before the session, not during.”",
    created_at: "Fri 23 Oct, 16:12",
    is_read: true,
    cta: { label: "Read in Feedback", route: "feedback" },
  },
  {
    id: "n-884",
    type: "feedback_request",
    icon: "users",
    typeLabel: "Request accepted",
    message: "Lina Achterberg accepted your request for feedback on mentoring.",
    detail: "She has until 10 Nov to respond. You’ll be notified here when the feedback arrives.",
    created_at: "Thu 22 Oct, 10:30",
    is_read: true,
    cta: { label: "View request", route: "feedback" },
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "on_track", label: "On track" },
  { key: "at_risk", label: "At risk" },
  { key: "awaiting", label: "Awaiting review" },
  { key: "completed", label: "Completed" },
];

const goalProgress = (g) =>
  g.key_results.length
    ? Math.round(
        (g.key_results.reduce(
          (sum, kr) => sum + Math.min(kr.current_value / kr.target_value, 1),
          0,
        ) /
          g.key_results.length) *
          100,
      )
    : 0;

const matchesFilter = (g, key) => {
  if (key === "all") return true;
  if (key === "completed") return g.status === "completed";
  if (key === "awaiting")
    return g.approval_status === "submitted" || g.approval_status === "changes_requested";
  if (key === "on_track") return g.status === "active" && g.health === "on_track";
  if (key === "at_risk") return g.status === "active" && g.health === "at_risk";
  return true;
};

const APPROVAL_COPY = {
  approved: "Approved",
  submitted: "Awaiting review",
  changes_requested: "Changes requested",
  draft: "Draft",
};

function PaceMeter({ value, pace, muted }) {
  return (
    <div
      className="relative h-[6px] w-full overflow-visible rounded-full"
      style={{ backgroundColor: "var(--pm-rail)" }}
      aria-hidden="true"
    >
      <div
        className="pm-anim absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: value + "%",
          backgroundColor: muted ? "var(--pm-muted)" : "var(--pm-accent)",
          opacity: muted ? 0.65 : 1,
        }}
      />
      <span
        className="absolute -top-[5px] -bottom-[5px] w-px"
        style={{ left: pace + "%", backgroundColor: "var(--pm-fg)", opacity: 0.55 }}
      />
    </div>
  );
}

function Hairline({ children, className }) {
  return (
    <div className={"border-t " + (className || "")} style={{ borderColor: "var(--pm-line)" }}>
      {children}
    </div>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const paceValue = Math.round((CYCLE.dayOf / CYCLE.days) * 100);

  const [goals] = React.useState(INITIAL_GOALS);
  const [notifications, setNotifications] = React.useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [openGoal, setOpenGoal] = React.useState("g-4412");
  const [openNote, setOpenNote] = React.useState(null);
  const [noteTab, setNoteTab] = React.useState("unread");
  const [loading, setLoading] = React.useState(true);
  const [sync, setSync] = React.useState("idle");
  const [stale, setStale] = React.useState(false);
  const [syncedAt, setSyncedAt] = React.useState("08:41");

  const timerRef = React.useRef(null);
  const attemptRef = React.useRef(0);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const refresh = () => {
    clearTimeout(timerRef.current);
    setSync("syncing");
    const attempt = attemptRef.current + 1;
    attemptRef.current = attempt;
    timerRef.current = setTimeout(() => {
      setSync("idle");
      if (attempt === 2) {
        setStale(true);
      } else {
        setStale(false);
        setSyncedAt("just now");
      }
    }, 850);
  };

  const vars = {
    "--pm-bg": brand.backgroundColor,
    "--pm-fg": brand.primaryColor,
    "--pm-muted": brand.neutralColor,
    "--pm-accent": brand.accentColor,
    "--pm-surface": "rgba(255,255,255,0.028)",
    "--pm-surface-2": "rgba(255,255,255,0.055)",
    "--pm-line": "rgba(255,255,255,0.11)",
    "--pm-rail": "rgba(255,255,255,0.09)",
    "--pm-radius": brand.radius,
  };

  const serif = { fontFamily: brand.fontHeading };
  const focus =
    "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--pm-accent)]";

  const activeGoals = goals.filter((g) => g.status === "active");
  const avgProgress = activeGoals.length
    ? Math.round(activeGoals.reduce((s, g) => s + goalProgress(g), 0) / activeGoals.length)
    : 0;
  const awaiting = goals.filter(
    (g) => g.approval_status === "submitted" || g.approval_status === "changes_requested",
  ).length;
  const paceDelta = avgProgress - paceValue;

  const q = query.trim().toLowerCase();
  const visibleGoals = goals.filter(
    (g) =>
      matchesFilter(g, filter) &&
      (q === "" ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.ref.toLowerCase().includes(q)),
  );

  const unread = notifications.filter((n) => !n.is_read);
  const shownNotes = noteTab === "unread" ? unread : notifications;

  const openNotification = (id) => {
    setOpenNote((prev) => (prev === id ? null : id));
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const clearView = () => {
    setFilter("all");
    setQuery("");
  };

  const NoteIcon = ({ kind }) => {
    const props = { className: "h-4 w-4", "aria-hidden": "true" };
    if (kind === "users") return <Icons.Users {...props} />;
    if (kind === "check") return <Icons.CheckCircle {...props} />;
    if (kind === "alert") return <Icons.AlertCircle {...props} />;
    if (kind === "clock") return <Icons.Clock {...props} />;
    return <Icons.FileText {...props} />;
  };

  const chipBase =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.12em] " +
    focus;

  return (
    <div
      className="min-h-full"
      style={{
        ...vars,
        backgroundColor: "var(--pm-bg)",
        color: "var(--pm-fg)",
        fontFamily: brand.fontBody,
      }}
    >
      <style>{`
        @keyframes pmRowIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @keyframes pmFade { from { opacity: 0; } to { opacity: 1; } }
        .pm-in { animation: pmRowIn 240ms ease-out both; }
        .pm-fade { animation: pmFade 300ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .pm-in, .pm-fade { animation: none !important; }
          .pm-anim { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-14">
        {/* ── Header ─────────────────────────────── */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--pm-muted)" }}
            >
              {CYCLE.label} performance cycle · day{" "}
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{CYCLE.dayOf}</span> of{" "}
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{CYCLE.days}</span>
            </p>
            <h1 className="mt-3 text-[34px] leading-tight md:text-[40px]" style={serif}>
              My dashboard
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <Avatar name={ME.name} className="h-8 w-8" />
              <p className="text-[13px]" style={{ color: "var(--pm-muted)" }}>
                {ME.name} · {ME.title} · reporting to{" "}
                <button
                  type="button"
                  onClick={() => navigate("my-profile")}
                  className={"underline underline-offset-4 " + focus}
                  style={{ color: "var(--pm-fg)" }}
                >
                  {ME.manager}
                </button>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right sm:block" aria-live="polite">
              <p
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--pm-muted)" }}
              >
                {sync === "syncing"
                  ? "Syncing…"
                  : stale
                    ? "Showing saved copy"
                    : "Synced " + syncedAt}
              </p>
            </div>
            <Button
              type="button"
              onClick={refresh}
              disabled={sync === "syncing"}
              className={
                "inline-flex items-center gap-2 rounded-[var(--pm-radius)] border bg-transparent px-3 py-2 text-[13px] disabled:opacity-50 " +
                focus
              }
              style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
            >
              <Icons.Clock
                className={"h-4 w-4 " + (sync === "syncing" ? "animate-spin" : "")}
                aria-hidden="true"
              />
              {sync === "syncing" ? "Refreshing" : "Refresh"}
            </Button>
            <Button
              type="button"
              onClick={() => navigate("goals")}
              className={
                "inline-flex items-center gap-2 rounded-[var(--pm-radius)] px-4 py-2 text-[13px] font-medium " +
                focus
              }
              style={{ backgroundColor: "var(--pm-accent)", color: brand.backgroundColor }}
            >
              <Icons.Plus className="h-4 w-4" aria-hidden="true" />
              New objective
            </Button>
          </div>
        </header>

        {/* ── Stale / partial-data notice ─────────── */}
        {stale && (
          <div
            className="pm-in mt-8 flex flex-col gap-3 rounded-[var(--pm-radius)] border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "var(--pm-line)", backgroundColor: "var(--pm-surface-2)" }}
            role="status"
          >
            <div className="flex items-start gap-3">
              <Icons.AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
                style={{ color: "var(--pm-fg)" }}
              />
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--pm-fg)" }}>
                We couldn’t reach the performance service just now. These objectives are your saved
                copy from <span style={{ fontVariantNumeric: "tabular-nums" }}>08:41</span> —
                nothing you’ve done has been lost.
              </p>
            </div>
            <Button
              type="button"
              onClick={refresh}
              className={
                "shrink-0 rounded-[var(--pm-radius)] border bg-transparent px-3 py-2 text-[12px] " +
                focus
              }
              style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
            >
              Try again
            </Button>
          </div>
        )}

        {/* ── Metric strip ───────────────────────── */}
        <section className="mt-8" aria-label="Cycle summary">
          <h2 className="sr-only">Cycle summary</h2>
          <div
            className="grid grid-cols-2 rounded-[var(--pm-radius)] border lg:grid-cols-4"
            style={{ borderColor: "var(--pm-line)", backgroundColor: "var(--pm-surface)" }}
          >
            {[
              {
                label: "Active objectives",
                value: String(activeGoals.length),
                hint: "1 completed this cycle",
              },
              {
                label: "Average progress",
                value: avgProgress + "%",
                hint: "across active objectives",
              },
              {
                label: "Pace against quarter",
                value: (paceDelta >= 0 ? "+" : "−") + Math.abs(paceDelta) + " pts",
                hint: (paceDelta >= 0 ? "ahead of" : "behind") + " " + paceValue + "% elapsed",
              },
              {
                label: "Awaiting manager",
                value: String(awaiting),
                hint: "cycle locks " + CYCLE.lockDate,
              },
            ].map((m, i) => (
              <div
                key={m.label}
                className={
                  "px-5 py-5 md:px-6 md:py-6 " +
                  (i % 2 === 1 ? "border-l " : "") +
                  (i > 1 ? "border-t lg:border-t-0 " : "") +
                  (i === 2 ? "lg:border-l " : "") +
                  (i === 3 ? "lg:border-l " : "")
                }
                style={{ borderColor: "var(--pm-line)" }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--pm-muted)" }}
                >
                  {m.label}
                </p>
                <p
                  className="mt-2 text-[30px] leading-none"
                  style={{
                    ...serif,
                    color: "var(--pm-accent)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.value}
                </p>
                <p className="mt-2 text-[12px]" style={{ color: "var(--pm-muted)" }}>
                  {m.hint}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px]" style={{ color: "var(--pm-muted)" }}>
            <span aria-hidden="true" className="mr-1.5" style={{ color: "var(--pm-fg)" }}>
              │
            </span>
            on each rail marks today’s expected pace —{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{paceValue}%</span> of{" "}
            {CYCLE.label} has elapsed.
          </p>
        </section>

        {/* ── Main grid ──────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Objectives */}
          <section className="lg:col-span-8" aria-labelledby="objectives-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="objectives-heading" className="text-[24px]" style={serif}>
                My objectives
              </h2>
              <button
                type="button"
                onClick={() => navigate("goals")}
                className={
                  "inline-flex items-center gap-1 text-[12px] uppercase tracking-[0.14em] " + focus
                }
                style={{ color: "var(--pm-accent)" }}
              >
                Manage in Goals
                <Icons.ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div role="group" aria-label="Filter objectives" className="flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                  const count = goals.filter((g) => matchesFilter(g, f.key)).length;
                  const on = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilter(f.key)}
                      className={chipBase + " pm-anim transition-colors"}
                      style={{
                        borderColor: on ? "var(--pm-accent)" : "var(--pm-line)",
                        backgroundColor: on ? "var(--pm-accent)" : "transparent",
                        color: on ? brand.backgroundColor : "var(--pm-fg)",
                      }}
                    >
                      {on && <Icons.Check className="h-3 w-3" aria-hidden="true" />}
                      {f.label}
                      <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.75 }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="md:w-[240px]">
                <Label
                  htmlFor="goal-search"
                  className="block text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--pm-muted)" }}
                >
                  Find an objective
                </Label>
                <div className="relative mt-1.5">
                  <Icons.Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    aria-hidden="true"
                    style={{ color: "var(--pm-muted)" }}
                  />
                  <Input
                    id="goal-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Title or OKR number"
                    className={
                      "w-full rounded-[var(--pm-radius)] border bg-transparent py-2 pl-9 pr-3 text-[13px] placeholder:opacity-60 " +
                      focus
                    }
                    style={{
                      borderColor: "var(--pm-line)",
                      color: "var(--pm-fg)",
                      backgroundColor: "var(--pm-surface)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="mt-5 overflow-hidden rounded-[var(--pm-radius)] border"
              style={{ borderColor: "var(--pm-line)", backgroundColor: "var(--pm-surface)" }}
              aria-busy={loading ? "true" : "false"}
            >
              {loading ? (
                <div className="px-6 py-8">
                  <p className="text-[13px]" style={{ color: "var(--pm-muted)" }}>
                    Pulling your {CYCLE.label} objectives and key results…
                  </p>
                  <ul className="mt-6 space-y-7">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="animate-pulse space-y-3">
                        <div
                          className="h-3 w-24 rounded"
                          style={{ backgroundColor: "var(--pm-rail)" }}
                        />
                        <div
                          className="h-4 w-2/3 rounded"
                          style={{ backgroundColor: "var(--pm-rail)" }}
                        />
                        <div
                          className="h-[6px] w-full rounded-full"
                          style={{ backgroundColor: "var(--pm-rail)" }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : visibleGoals.length === 0 ? (
                <div className="px-6 py-12">
                  {goals.length === 0 ? (
                    <Empty
                      className="text-[color:var(--pm-fg)] [&_h3]:text-[color:var(--pm-fg)] [&_p]:text-[color:var(--pm-muted)] [&_svg]:text-[color:var(--pm-muted)]"
                      title={"No objectives yet for " + CYCLE.label}
                      description={
                        "Write your first objective with at least one measurable key result. " +
                        ME.manager +
                        " reviews it before the cycle locks on " +
                        CYCLE.lockDate +
                        "."
                      }
                      action={
                        <Button
                          type="button"
                          onClick={() => navigate("goals")}
                          className={
                            "rounded-[var(--pm-radius)] px-4 py-2 text-[13px] font-medium " + focus
                          }
                          style={{
                            backgroundColor: "var(--pm-accent)",
                            color: brand.backgroundColor,
                          }}
                        >
                          Create my first objective
                        </Button>
                      }
                    />
                  ) : (
                    <Empty
                      className="text-[color:var(--pm-fg)] [&_h3]:text-[color:var(--pm-fg)] [&_p]:text-[color:var(--pm-muted)] [&_svg]:text-[color:var(--pm-muted)]"
                      title="Nothing in this view"
                      description={
                        (q
                          ? "No objective matches “" + query + "”"
                          : "No objective is " +
                            (FILTERS.find((f) => f.key === filter) || {}).label.toLowerCase()) +
                        " right now. Clear the view to see all " +
                        goals.length +
                        " objectives."
                      }
                      action={
                        <Button
                          type="button"
                          onClick={clearView}
                          className={
                            "rounded-[var(--pm-radius)] border bg-transparent px-4 py-2 text-[13px] " +
                            focus
                          }
                          style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
                        >
                          Clear filters and search
                        </Button>
                      }
                    />
                  )}
                </div>
              ) : (
                <ul className="pm-fade">
                  {visibleGoals.map((g, idx) => {
                    const p = goalProgress(g);
                    const open = openGoal === g.id;
                    const onTarget = g.key_results.filter((kr) => kr.status !== "at_risk").length;
                    const done = g.status === "completed";
                    return (
                      <li
                        key={g.id}
                        className={idx > 0 ? "border-t" : ""}
                        style={{ borderColor: "var(--pm-line)" }}
                      >
                        <div className="px-5 py-6 md:px-6">
                          <div className="flex items-start justify-between gap-5">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <span
                                  className="text-[11px] uppercase tracking-[0.18em]"
                                  style={{
                                    color: "var(--pm-accent)",
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {g.ref}
                                </span>
                                <Badge
                                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em]"
                                  style={{
                                    borderColor: "var(--pm-line)",
                                    backgroundColor: "transparent",
                                    color: "var(--pm-fg)",
                                  }}
                                >
                                  {g.approval_status === "approved" && (
                                    <Icons.Check className="h-3 w-3" aria-hidden="true" />
                                  )}
                                  {g.approval_status === "submitted" && (
                                    <Icons.Clock className="h-3 w-3" aria-hidden="true" />
                                  )}
                                  {g.approval_status === "changes_requested" && (
                                    <Icons.AlertCircle className="h-3 w-3" aria-hidden="true" />
                                  )}
                                  {APPROVAL_COPY[g.approval_status]}
                                </Badge>
                                <span
                                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em]"
                                  style={{ color: "var(--pm-muted)" }}
                                >
                                  {done ? (
                                    <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : g.health === "at_risk" ? (
                                    <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : (
                                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                  )}
                                  {done
                                    ? "Completed"
                                    : g.health === "at_risk"
                                      ? "At risk"
                                      : "On track"}
                                </span>
                              </div>

                              <h3 className="mt-2.5 text-[19px] leading-snug" style={serif}>
                                <button
                                  type="button"
                                  onClick={() => setOpenGoal(open ? null : g.id)}
                                  aria-expanded={open}
                                  aria-controls={"kr-" + g.id}
                                  className={
                                    "inline-flex items-start gap-2 text-left hover:underline underline-offset-4 " +
                                    focus
                                  }
                                  style={{ color: "var(--pm-fg)" }}
                                >
                                  <span>{g.title}</span>
                                  {open ? (
                                    <Icons.ChevronDown
                                      className="mt-1.5 h-4 w-4 shrink-0"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <Icons.ChevronRight
                                      className="mt-1.5 h-4 w-4 shrink-0"
                                      aria-hidden="true"
                                    />
                                  )}
                                </button>
                              </h3>
                              <p
                                className="mt-1.5 max-w-[62ch] text-[13px] leading-relaxed"
                                style={{ color: "var(--pm-muted)" }}
                              >
                                {g.description}
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              <p
                                className="text-[30px] leading-none"
                                style={{
                                  ...serif,
                                  color: "var(--pm-accent)",
                                  fontVariantNumeric: "tabular-nums",
                                }}
                              >
                                {p}
                                <span className="text-[15px]">%</span>
                              </p>
                              <p
                                className="mt-1.5 text-[10px] uppercase tracking-[0.16em]"
                                style={{ color: "var(--pm-muted)" }}
                              >
                                {done ? "Final" : "Progress"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5">
                            <PaceMeter value={p} pace={paceValue} muted={done} />
                            <div
                              className="mt-2.5 flex items-center justify-between text-[12px]"
                              style={{ color: "var(--pm-muted)" }}
                            >
                              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                {onTarget} of {g.key_results.length} key results on target
                              </span>
                              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                {done ? "Closed " : "Due "}
                                {g.due}
                              </span>
                            </div>
                          </div>

                          {open && (
                            <div
                              id={"kr-" + g.id}
                              className="pm-in mt-5 rounded-[var(--pm-radius)] border px-4 py-4"
                              style={{
                                borderColor: "var(--pm-line)",
                                backgroundColor: "var(--pm-surface-2)",
                              }}
                            >
                              <p
                                className="text-[11px] uppercase tracking-[0.16em]"
                                style={{ color: "var(--pm-muted)" }}
                              >
                                Key results
                              </p>
                              <ul className="mt-3 space-y-3">
                                {g.key_results.map((kr) => {
                                  const pct = Math.round(
                                    Math.min(kr.current_value / kr.target_value, 1) * 100,
                                  );
                                  return (
                                    <li key={kr.id} className="flex items-center gap-4">
                                      <span
                                        className="min-w-0 flex-1 text-[13px]"
                                        style={{ color: "var(--pm-fg)" }}
                                      >
                                        {kr.title}
                                      </span>
                                      <span
                                        className="w-[88px] shrink-0 text-right text-[12px]"
                                        style={{
                                          color: "var(--pm-muted)",
                                          fontVariantNumeric: "tabular-nums",
                                        }}
                                      >
                                        {kr.current_value} / {kr.target_value}
                                      </span>
                                      <span className="hidden w-[90px] shrink-0 sm:block">
                                        <PaceMeter
                                          value={pct}
                                          pace={paceValue}
                                          muted={kr.status === "at_risk"}
                                        />
                                      </span>
                                      <span
                                        className="w-[74px] shrink-0 text-right text-[11px] uppercase tracking-[0.1em]"
                                        style={{ color: "var(--pm-muted)" }}
                                      >
                                        {kr.status === "done"
                                          ? "Done"
                                          : kr.status === "at_risk"
                                            ? "At risk"
                                            : "On track"}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  type="button"
                                  onClick={() => navigate("goals")}
                                  className={
                                    "inline-flex items-center gap-2 rounded-[var(--pm-radius)] border bg-transparent px-3 py-2 text-[12px] " +
                                    focus
                                  }
                                  style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
                                >
                                  Update progress in Goals
                                  <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {!loading && visibleGoals.length > 0 && (
              <p
                className="mt-3 text-[12px]"
                style={{ color: "var(--pm-muted)", fontVariantNumeric: "tabular-nums" }}
              >
                Showing {visibleGoals.length} of {goals.length} objectives in {CYCLE.label}.
              </p>
            )}
          </section>

          {/* Notifications */}
          <section className="lg:col-span-4" aria-labelledby="notifications-heading">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="notifications-heading" className="text-[24px]" style={serif}>
                Notifications
              </h2>
              <span
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--pm-muted)" }}
              >
                <Icons.Bell className="h-3.5 w-3.5" aria-hidden="true" />
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{unread.length}</span> unread
              </span>
            </div>

            <div className="mt-5">
              <Tabs
                tabs={[
                  { key: "unread", label: "Unread (" + unread.length + ")" },
                  { key: "all", label: "All (" + notifications.length + ")" },
                ]}
                active={noteTab}
                onChange={setNoteTab}
                className="text-[13px]"
              />
            </div>

            <div
              className="mt-4 overflow-hidden rounded-[var(--pm-radius)] border"
              style={{ borderColor: "var(--pm-line)", backgroundColor: "var(--pm-surface)" }}
            >
              <div className="flex items-center justify-between px-5 py-3">
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--pm-muted)" }}
                >
                  Feedback &amp; goal activity
                </p>
                <Button
                  type="button"
                  onClick={markAllRead}
                  disabled={unread.length === 0}
                  className={
                    "rounded-[var(--pm-radius)] bg-transparent px-2 py-1 text-[11px] uppercase tracking-[0.12em] disabled:opacity-40 " +
                    focus
                  }
                  style={{ color: unread.length === 0 ? "var(--pm-muted)" : "var(--pm-accent)" }}
                >
                  Mark all read
                </Button>
              </div>

              <Hairline>
                {shownNotes.length === 0 ? (
                  <div className="px-5 py-10">
                    <Empty
                      className="text-[color:var(--pm-fg)] [&_h3]:text-[color:var(--pm-fg)] [&_p]:text-[color:var(--pm-muted)] [&_svg]:text-[color:var(--pm-muted)]"
                      title={
                        noteTab === "unread" ? "You’re all caught up" : "Nothing has happened yet"
                      }
                      description={
                        noteTab === "unread"
                          ? "Feedback requests and manager decisions on your goals land here first. Switch to All to re-read what you’ve already seen."
                          : "When a colleague requests feedback or your manager reviews a goal, you’ll see it here. In-app only for now — email delivery comes in a later release."
                      }
                      action={
                        noteTab === "unread" ? (
                          <Button
                            type="button"
                            onClick={() => setNoteTab("all")}
                            className={
                              "rounded-[var(--pm-radius)] border bg-transparent px-3 py-2 text-[12px] " +
                              focus
                            }
                            style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
                          >
                            See all notifications
                          </Button>
                        ) : undefined
                      }
                    />
                  </div>
                ) : (
                  <ul>
                    {shownNotes.map((n, idx) => {
                      const expanded = openNote === n.id;
                      return (
                        <li
                          key={n.id}
                          className={"pm-in " + (idx > 0 ? "border-t" : "")}
                          style={{ borderColor: "var(--pm-line)" }}
                        >
                          <button
                            type="button"
                            onClick={() => openNotification(n.id)}
                            aria-expanded={expanded}
                            aria-controls={"note-" + n.id}
                            className={
                              "pm-anim flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-[color:var(--pm-surface-2)] " +
                              focus
                            }
                          >
                            <span
                              className="mt-0.5 shrink-0"
                              style={{ color: n.is_read ? "var(--pm-muted)" : "var(--pm-accent)" }}
                            >
                              <NoteIcon kind={n.icon} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span
                                  className="text-[10px] uppercase tracking-[0.16em]"
                                  style={{ color: "var(--pm-muted)" }}
                                >
                                  {n.typeLabel}
                                </span>
                                {!n.is_read && (
                                  <span
                                    className="rounded-full border px-1.5 py-[1px] text-[10px] uppercase tracking-[0.12em]"
                                    style={{
                                      borderColor: "var(--pm-accent)",
                                      color: "var(--pm-accent)",
                                    }}
                                  >
                                    New
                                  </span>
                                )}
                              </span>
                              <span
                                className="mt-1.5 block text-[13.5px] leading-relaxed"
                                style={{ color: n.is_read ? "var(--pm-muted)" : "var(--pm-fg)" }}
                              >
                                {n.message}
                              </span>
                              <span
                                className="mt-1.5 block text-[11px]"
                                style={{
                                  color: "var(--pm-muted)",
                                  fontVariantNumeric: "tabular-nums",
                                }}
                              >
                                {n.created_at}
                              </span>
                            </span>
                            <span
                              className="mt-0.5 shrink-0"
                              style={{ color: "var(--pm-muted)" }}
                              aria-hidden="true"
                            >
                              {expanded ? (
                                <Icons.ChevronDown className="h-4 w-4" />
                              ) : (
                                <Icons.ChevronRight className="h-4 w-4" />
                              )}
                            </span>
                          </button>

                          {expanded && (
                            <div id={"note-" + n.id} className="pm-in px-5 pb-5 pl-12">
                              <p
                                className="max-w-[48ch] text-[13px] leading-relaxed"
                                style={{ color: "var(--pm-fg)" }}
                              >
                                {n.detail}
                              </p>
                              {n.cta && (
                                <Button
                                  type="button"
                                  onClick={() => navigate(n.cta.route)}
                                  className={
                                    "mt-3 inline-flex items-center gap-2 rounded-[var(--pm-radius)] border bg-transparent px-3 py-2 text-[12px] " +
                                    focus
                                  }
                                  style={{ borderColor: "var(--pm-line)", color: "var(--pm-fg)" }}
                                >
                                  {n.cta.label}
                                  <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </Button>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Hairline>
            </div>

            <p className="mt-3 text-[12px] leading-relaxed" style={{ color: "var(--pm-muted)" }}>
              Opening a notification marks it read. In-app notifications only in this release —
              email delivery is deferred.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <div style={{ color: "var(--pm-line)" }}>
            <Separator className="opacity-100" />
          </div>
          <p className="mt-5 text-[12px]" style={{ color: "var(--pm-muted)" }}>
            Objectives lock for {CYCLE.label} on {CYCLE.lockDate}. Need to change a key result
            afterwards? Ask {ME.manager} to reopen it from his review queue.
          </p>
        </div>
      </div>
    </div>
  );
}
