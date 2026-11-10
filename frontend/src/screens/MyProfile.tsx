// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { apiFetch } from "@/lib/api";

const {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Select,
  Checkbox,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Avatar,
  Separator,
  Stat,
  Empty,
} = UI;

const HR_CONTACT = { name: "Priya Raman", role: "HR Admin", email: "priya.raman@lindhurst.co" };

const ROLE_LABELS = {
  employee: "Employee",
  manager: "Manager",
  hr_admin: "HR Admin",
};

const STATUS_LABELS = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
  erased: "Erased",
};

function roleLabel(role) {
  return ROLE_LABELS[role] || role;
}

function statusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function formatDateTime(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return (
    d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

function storedFieldsFor(profile) {
  return [
    ["Employee reference", profile.id],
    ["Full name", profile.name],
    ["Work email", profile.email],
    ["Access role", roleLabel(profile.role)],
    ["Account status", statusLabel(profile.status)],
    ["Record created", formatDate(profile.created_at)],
    ["Last updated", formatDateTime(profile.updated_at)],
  ];
}

const INITIAL_CONSENTS = [
  {
    id: "CNS-0012",
    purpose: "Performance review processing",
    detail: "Goals, key results and review outcomes processed to perform your employment contract.",
    status: "granted",
    recorded_at: "4 March 2023",
    locked: true,
    lockedNote: "Lawful basis is contract, not consent — there is nothing to withdraw here.",
  },
  {
    id: "CNS-0318",
    purpose: "Peer visibility of continuous feedback",
    detail: "Lets colleagues outside your reporting line read feedback written about your work.",
    status: "granted",
    recorded_at: "18 September 2026",
    locked: false,
  },
  {
    id: "CNS-0402",
    purpose: "Inclusion in the talent calibration pool",
    detail:
      "Your goal attainment is discussed in half-yearly calibration sessions with other managers.",
    status: "withdrawn",
    recorded_at: "2 October 2026",
    locked: false,
  },
  {
    id: "CNS-0441",
    purpose: "Transfer to the US analytics region",
    detail: "Pseudonymised goal data leaves the EU region for aggregate reporting in Chicago.",
    status: "granted",
    recorded_at: "11 August 2026",
    locked: false,
  },
];

const INITIAL_EXPORTS = [
  {
    id: "EXP-0119",
    requested: "14 Oct 2026, 08:12",
    contents: "Profile, goals, feedback",
    format: "JSON",
    size: "4.2 MB",
    status: "ready",
    note: "Link active until 3 Nov 2026",
  },
  {
    id: "EXP-0097",
    requested: "2 Sep 2026, 16:40",
    contents: "Profile, goals",
    format: "CSV",
    size: "812 KB",
    status: "expired",
    note: "Download link expired 16 Sep 2026",
  },
  {
    id: "EXP-0061",
    requested: "21 Jul 2026, 11:05",
    contents: "Profile, goals, feedback",
    format: "JSON",
    size: "—",
    status: "failed",
    note: "Packaging timed out after 10 minutes",
  },
];

const SET_LABELS = {
  profile: "Profile record",
  goals: "Goals and key results",
  feedback: "Feedback given and received",
};

export default function Screen() {
  const navigate = useNavigate();
  const line = "rgba(233,237,233,0.12)";
  const lineSoft = "rgba(233,237,233,0.08)";
  const surface = "rgba(233,237,233,0.035)";
  const surfaceHi = "rgba(233,237,233,0.065)";
  const danger = "#c98a7d";
  const warn = "#cbb279";
  const accent = brand.accentColor;
  const text = brand.primaryColor;
  const muted = brand.neutralColor;

  const css = `
    @keyframes vSweep { 0% { transform: translateX(-110%); } 100% { transform: translateX(320%); } }
    @keyframes vIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
    .v-bar { animation: vSweep 1.15s ease-in-out infinite; }
    .v-in { animation: vIn .34s ease-out both; }
    .v-focus:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
    .v-row { transition: background-color .18s ease; }
    .v-row:hover { background-color: rgba(233,237,233,0.04); }
    .v-toggle { transition: background-color .2s ease, border-color .2s ease; }
    .v-knob { transition: transform .2s ease, background-color .2s ease; }
    @media (prefers-reduced-motion: reduce) {
      .v-bar, .v-in { animation: none !important; }
      .v-toggle, .v-knob, .v-row { transition: none !important; }
    }
  `;

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const [profile, setProfile] = React.useState(null);
  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [loadError, setLoadError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoadingProfile(true);
    setLoadError(null);
    apiFetch("/me")
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("We could not load your profile. Try again in a moment.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingProfile(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [consents, setConsents] = React.useState(INITIAL_CONSENTS);
  const [exports, setExports] = React.useState(INITIAL_EXPORTS);
  const [nextRef, setNextRef] = React.useState(120);
  const [include, setInclude] = React.useState({ profile: true, goals: true, feedback: true });
  const [format, setFormat] = React.useState("JSON");
  const [exportError, setExportError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [filter, setFilter] = React.useState("all");
  const [downloaded, setDownloaded] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [syncing, setSyncing] = React.useState(false);
  const [syncedAt, setSyncedAt] = React.useState("09:42 today");

  const statusMeta = {
    ready: { label: "Ready", color: accent, Icon: Icons.CheckCircle },
    preparing: { label: "Preparing", color: warn, Icon: Icons.Clock },
    expired: { label: "Expired", color: muted, Icon: Icons.X },
    failed: { label: "Failed", color: danger, Icon: Icons.AlertCircle },
  };

  const toggleConsent = (id) => {
    setConsents((prev) =>
      prev.map((c) => {
        if (c.id !== id || c.locked) return c;
        const next = c.status === "granted" ? "withdrawn" : "granted";
        setMessage(
          `Consent ${next === "granted" ? "granted" : "withdrawn"} — “${c.purpose}”. Recorded 30 October 2026, 09:51.`,
        );
        return { ...c, status: next, recorded_at: "30 October 2026" };
      }),
    );
  };

  const toggleInclude = (key) => {
    setInclude((prev) => ({ ...prev, [key]: !prev[key] }));
    setExportError("");
  };

  const submitExport = (event) => {
    event.preventDefault();
    const sets = Object.keys(SET_LABELS).filter((k) => include[k]);
    if (sets.length === 0) {
      setExportError("Pick at least one data set — an export needs something in it.");
      return;
    }
    const ref = "EXP-0" + nextRef;
    const contents = sets.map((k) => SET_LABELS[k]).join(", ");
    setExportError("");
    setSubmitting(true);
    setNextRef((n) => n + 1);
    setFilter("all");
    setExports((prev) => [
      {
        id: ref,
        requested: "30 Oct 2026, 09:51",
        contents,
        format,
        size: "—",
        status: "preparing",
        note: "Packaging your record — usually under a minute.",
        fresh: true,
      },
      ...prev,
    ]);
    setMessage(`Export ${ref} requested. We are packaging ${contents.toLowerCase()} as ${format}.`);

    const t = setTimeout(() => {
      setExports((prev) =>
        prev.map((r) =>
          r.id === ref
            ? { ...r, status: "ready", size: "3.8 MB", note: "Link active until 13 Nov 2026" }
            : r,
        ),
      );
      setSubmitting(false);
      setMessage(`Export ${ref} is ready. The download link stays active for 14 days.`);
    }, 2200);
    timers.current.push(t);
  };

  const download = (row) => {
    setDownloaded((prev) => ({ ...prev, [row.id]: true }));
    setMessage(`${row.id} downloaded (${row.size}). The link stays active until it expires.`);
  };

  const recheck = () => {
    setSyncing(true);
    const t = setTimeout(() => {
      setSyncing(false);
      setSyncedAt("just now");
      setMessage("Record re-checked against the HR directory. No changes since 22 October.");
    }, 1300);
    timers.current.push(t);
  };

  const visibleExports = exports.filter((r) => filter === "all" || r.status === filter);
  const grantedCount = consents.filter((c) => c.status === "granted").length;

  const microLabel = "text-[11px] uppercase tracking-[0.18em]";
  const cardStyle = {
    backgroundColor: surface,
    borderColor: line,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: brand.radius,
    color: text,
  };

  const StatusTag = ({ status }) => {
    const meta = statusMeta[status];
    const Icon = meta.Icon;
    return (
      <span
        className={"inline-flex items-center gap-1.5 px-2 py-1 " + microLabel}
        style={{
          color: meta.color,
          border: "1px solid " + meta.color + "40",
          borderRadius: brand.radius,
          backgroundColor: meta.color + "14",
        }}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        {meta.label}
      </span>
    );
  };

  if (loadingProfile) {
    return (
      <div
        className="min-h-full px-6 py-10 sm:px-10"
        style={{ backgroundColor: brand.backgroundColor, color: text, fontFamily: brand.fontBody }}
      >
        <style>{css}</style>
        <div className="mx-auto max-w-6xl">
          <p role="status" aria-live="polite" className="text-sm" style={{ color: muted }}>
            Loading your profile…
          </p>
        </div>
      </div>
    );
  }

  if (loadError || !profile) {
    return (
      <div
        className="min-h-full px-6 py-10 sm:px-10"
        style={{ backgroundColor: brand.backgroundColor, color: text, fontFamily: brand.fontBody }}
      >
        <style>{css}</style>
        <div className="mx-auto max-w-6xl">
          <p role="alert" className="text-sm" style={{ color: danger }}>
            {loadError || "We could not load your profile."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-full px-6 py-10 sm:px-10"
      style={{ backgroundColor: brand.backgroundColor, color: text, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className={microLabel} style={{ color: accent }}>
              Personal record · {profile.id}
            </p>
            <h1
              className="mt-3 text-4xl leading-tight sm:text-[40px]"
              style={{ fontFamily: brand.fontHeading }}
            >
              My profile
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>
              Everything Lindhurst holds about you for performance management: your record, your
              reporting line, the consents on file and a copy you can take away.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 px-3 py-2 text-xs"
              style={{
                color: muted,
                border: "1px solid " + lineSoft,
                borderRadius: brand.radius,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {syncing ? "Re-checking the HR directory…" : "Synced from HR directory " + syncedAt}
            </span>
            <Button
              type="button"
              onClick={recheck}
              disabled={syncing}
              className="v-focus px-3 py-2 text-xs"
              style={{
                backgroundColor: "transparent",
                color: syncing ? muted : text,
                border: "1px solid " + line,
                borderRadius: brand.radius,
              }}
            >
              Re-check
            </Button>
          </div>
        </header>

        <p role="status" aria-live="polite" className="mt-6 text-sm" style={{ color: accent }}>
          {message}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Employee record */}
          <Card className="lg:col-span-2" style={cardStyle}>
            <CardHeader className="px-6 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar name={profile.name} className="h-12 w-12" />
                  <div>
                    <CardTitle
                      className="text-2xl"
                      style={{ fontFamily: brand.fontHeading, color: text }}
                    >
                      {profile.name}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm" style={{ color: muted }}>
                      {roleLabel(profile.role)} · {profile.email}
                    </CardDescription>
                  </div>
                </div>
                <span
                  className={microLabel + " shrink-0 px-2 py-1"}
                  style={{
                    color: accent,
                    backgroundColor: accent + "14",
                    border: "1px solid " + accent + "40",
                    borderRadius: brand.radius,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <Icons.Check className="mr-1 inline h-3 w-3" aria-hidden="true" />
                  {statusLabel(profile.status)}
                </span>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <h2 className={microLabel + " mt-6"} style={{ color: muted }}>
                Fields we store
              </h2>
              <dl className="mt-4">
                {storedFieldsFor(profile).map(([label, value], i) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[190px_1fr] sm:gap-4"
                    style={{ borderTop: i === 0 ? "none" : "1px solid " + lineSoft }}
                  >
                    <dt className="text-sm" style={{ color: muted }}>
                      {label}
                    </dt>
                    <dd
                      className="text-sm"
                      style={{
                        color: label === "Employee reference" ? accent : text,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div
                className="mt-6 p-4"
                style={{
                  borderLeft: "2px solid " + accent,
                  backgroundColor: "rgba(143,174,139,0.07)",
                }}
              >
                <h3 className={microLabel} style={{ color: accent }}>
                  Data minimisation
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: text }}>
                  Those seven fields are all of it. No home address, no date of birth, no salary, no
                  emergency contact — none of that is needed to run performance management, so none
                  of it is collected.
                </p>
              </div>

              {/* Reporting line */}
              <h2 className={microLabel + " mt-8"} style={{ color: muted }}>
                Reporting line
              </h2>
              {profile.manager ? (
                <div
                  className="mt-4 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ border: "1px solid " + lineSoft, borderRadius: brand.radius }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar name={profile.manager.name} className="h-10 w-10" />
                    <div>
                      <p className="text-sm font-medium" style={{ color: text }}>
                        {profile.manager.name}
                      </p>
                      <p className="text-xs" style={{ color: muted }}>
                        {profile.manager.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={microLabel + " px-2 py-1"}
                    style={{
                      color: muted,
                      border: "1px solid " + line,
                      borderRadius: brand.radius,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {profile.manager.id} · {roleLabel(profile.manager.role)}
                  </span>
                </div>
              ) : (
                <p className="mt-4 text-sm" style={{ color: muted }}>
                  No manager is assigned to your record.
                </p>
              )}

              {/* Permission denied / read-only */}
              <div
                className="mt-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between"
                style={{ border: "1px dashed " + line, borderRadius: brand.radius }}
              >
                <div className="flex gap-3">
                  <Icons.AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: warn }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-medium" style={{ color: text }}>
                      These details are read-only for you
                    </h3>
                    <p
                      id="edit-denied-help"
                      className="mt-1 max-w-prose text-sm leading-relaxed"
                      style={{ color: muted }}
                    >
                      Name, work email, access role and reporting line are maintained by People
                      Operations. Ask {HR_CONTACT.name} ({HR_CONTACT.role}, {HR_CONTACT.email}) to
                      correct anything that looks wrong.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  disabled
                  aria-describedby="edit-denied-help"
                  className="v-focus shrink-0 px-3 py-2 text-xs"
                  style={{
                    backgroundColor: "transparent",
                    color: muted,
                    border: "1px solid " + lineSoft,
                    borderRadius: brand.radius,
                    cursor: "not-allowed",
                  }}
                >
                  <Icons.Edit className="mr-2 inline h-3.5 w-3.5" aria-hidden="true" />
                  Edit details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Export request — primary action */}
          <Card
            className="self-start"
            style={{ ...cardStyle, backgroundColor: surfaceHi, borderColor: accent + "45" }}
          >
            <CardHeader className="px-6 pt-6">
              <p className={microLabel} style={{ color: accent }}>
                Your right of access
              </p>
              <CardTitle
                className="mt-2 text-xl"
                style={{ fontFamily: brand.fontHeading, color: text }}
              >
                Request a copy of your data
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
                We package your profile, goals and feedback into one file. Exports are kept for 14
                days, then deleted.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <form onSubmit={submitExport} noValidate>
                <fieldset className="border-0 p-0" style={{ margin: 0 }}>
                  <legend className={microLabel + " mb-3"} style={{ color: muted }}>
                    What to include
                  </legend>
                  <div className="flex flex-col gap-3">
                    {Object.keys(SET_LABELS).map((key) => (
                      <div key={key} className="flex items-center gap-3">
                        <Checkbox
                          id={"include-" + key}
                          checked={include[key]}
                          onChange={() => toggleInclude(key)}
                          className="v-focus h-4 w-4"
                        />
                        <Label
                          htmlFor={"include-" + key}
                          className="text-sm"
                          style={{ color: text }}
                        >
                          {SET_LABELS[key]}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5">
                  <Label htmlFor="export-format" className={microLabel} style={{ color: muted }}>
                    File format
                  </Label>
                  <Select
                    id="export-format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="v-focus mt-2 w-full px-3 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(22,33,28,0.6)",
                      color: text,
                      border: "1px solid " + line,
                      borderRadius: brand.radius,
                    }}
                  >
                    <option value="JSON">JSON — machine readable</option>
                    <option value="CSV">CSV — opens in a spreadsheet</option>
                  </Select>
                </div>

                {exportError ? (
                  <p
                    role="alert"
                    className="v-in mt-4 flex items-start gap-2 p-3 text-sm"
                    style={{
                      color: danger,
                      backgroundColor: danger + "14",
                      border: "1px solid " + danger + "45",
                      borderRadius: brand.radius,
                    }}
                  >
                    <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {exportError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="v-focus mt-6 w-full px-4 py-3 text-sm font-medium"
                  style={{
                    backgroundColor: submitting ? accent + "66" : accent,
                    color: brand.backgroundColor,
                    border: "1px solid " + accent,
                    borderRadius: brand.radius,
                    cursor: submitting ? "progress" : "pointer",
                  }}
                >
                  {submitting ? "Packaging your record…" : "Request data export"}
                </Button>

                {submitting ? (
                  <div
                    className="mt-3 h-px w-full overflow-hidden"
                    style={{ backgroundColor: lineSoft }}
                    aria-hidden="true"
                  >
                    <div className="v-bar h-px w-1/3" style={{ backgroundColor: accent }} />
                  </div>
                ) : null}

                <p className="mt-4 text-xs leading-relaxed" style={{ color: muted }}>
                  Feedback written about you is included with the author's name removed, so their
                  rights are protected too.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Consent + counts */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" style={cardStyle}>
            <CardHeader className="px-6 pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <CardTitle
                    className="text-xl"
                    style={{ fontFamily: brand.fontHeading, color: text }}
                  >
                    Consent on file
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm" style={{ color: muted }}>
                    Changes take effect immediately and are stamped with the date you made them.
                  </CardDescription>
                </div>
                <span
                  className={microLabel}
                  style={{ color: accent, fontVariantNumeric: "tabular-nums" }}
                >
                  {grantedCount} of {consents.length} granted
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ul className="mt-2">
                {consents.map((c, i) => {
                  const on = c.status === "granted";
                  return (
                    <li
                      key={c.id}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between"
                      style={{ borderTop: i === 0 ? "none" : "1px solid " + lineSoft }}
                    >
                      <div className="max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            id={"consent-" + c.id}
                            className="text-sm font-medium"
                            style={{ color: text }}
                          >
                            {c.purpose}
                          </h3>
                          {c.locked ? (
                            <span
                              className={microLabel + " px-2 py-0.5"}
                              style={{
                                color: warn,
                                border: "1px solid " + warn + "45",
                                borderRadius: brand.radius,
                              }}
                            >
                              Required
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: muted }}>
                          {c.locked ? c.lockedNote : c.detail}
                        </p>
                        <p
                          className="mt-2 text-xs"
                          style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                        >
                          {c.id} · {on ? "Granted" : "Withdrawn"} {c.recorded_at}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:pt-1">
                        <span
                          className="text-xs"
                          style={{ color: on ? accent : muted, minWidth: 68, textAlign: "right" }}
                        >
                          {on ? "Granted" : "Withdrawn"}
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-labelledby={"consent-" + c.id}
                          disabled={c.locked}
                          onClick={() => toggleConsent(c.id)}
                          className="v-focus v-toggle relative inline-flex h-6 w-11 shrink-0 items-center rounded-full"
                          style={{
                            backgroundColor: on
                              ? accent + (c.locked ? "55" : "cc")
                              : "rgba(233,237,233,0.08)",
                            border: "1px solid " + (on ? accent : line),
                            cursor: c.locked ? "not-allowed" : "pointer",
                          }}
                        >
                          <span
                            className="v-knob block h-4 w-4 rounded-full"
                            style={{
                              backgroundColor: on ? brand.backgroundColor : muted,
                              transform: on ? "translateX(24px)" : "translateX(4px)",
                            }}
                          />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card className="self-start" style={cardStyle}>
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl" style={{ fontFamily: brand.fontHeading, color: text }}>
                What is in your record
              </CardTitle>
              <CardDescription className="mt-1 text-sm" style={{ color: muted }}>
                Counted at 09:42 today.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex flex-col" style={{ fontVariantNumeric: "tabular-nums" }}>
                <Stat
                  label="Goals on record"
                  value="6"
                  hint="4 active · 2 closed"
                  className="py-4"
                />
                <div style={{ borderTop: "1px solid " + lineSoft }} />
                <Stat
                  label="Key results"
                  value="17"
                  hint="Across all six objectives"
                  className="py-4"
                />
                <div style={{ borderTop: "1px solid " + lineSoft }} />
                <Stat
                  label="Feedback items"
                  value="25"
                  hint="14 received · 11 given"
                  className="py-4"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  type="button"
                  onClick={() => navigate("goals")}
                  className="v-focus flex w-full items-center justify-between px-3 py-2.5 text-sm"
                  style={{
                    backgroundColor: "transparent",
                    color: text,
                    border: "1px solid " + line,
                    borderRadius: brand.radius,
                  }}
                >
                  Open my goals
                  <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("feedback")}
                  className="v-focus flex w-full items-center justify-between px-3 py-2.5 text-sm"
                  style={{
                    backgroundColor: "transparent",
                    color: text,
                    border: "1px solid " + line,
                    borderRadius: brand.radius,
                  }}
                >
                  Open my feedback
                  <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export history */}
        <Card className="mt-6" style={cardStyle}>
          <CardHeader className="px-6 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle
                  className="text-xl"
                  style={{ fontFamily: brand.fontHeading, color: text }}
                >
                  Export history
                </CardTitle>
                <CardDescription className="mt-1 text-sm" style={{ color: muted }}>
                  Every copy of your data you have asked for, and what happened to it.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="export-filter" className={microLabel} style={{ color: muted }}>
                  Status
                </Label>
                <Select
                  id="export-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="v-focus px-3 py-2 text-sm"
                  style={{
                    backgroundColor: "rgba(22,33,28,0.6)",
                    color: text,
                    border: "1px solid " + line,
                    borderRadius: brand.radius,
                  }}
                >
                  <option value="all">All exports</option>
                  <option value="ready">Ready</option>
                  <option value="preparing">Preparing</option>
                  <option value="expired">Expired</option>
                  <option value="failed">Failed</option>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {visibleExports.length === 0 ? (
              <div className="py-6">
                <Empty
                  title="Nothing with that status"
                  description={
                    "You have no " +
                    statusMeta[filter].label.toLowerCase() +
                    " exports. Show everything, or request a fresh copy of your record above."
                  }
                  action={
                    <Button
                      type="button"
                      onClick={() => setFilter("all")}
                      className="v-focus px-4 py-2 text-sm"
                      style={{
                        backgroundColor: "transparent",
                        color: accent,
                        border: "1px solid " + accent + "66",
                        borderRadius: brand.radius,
                      }}
                    >
                      Show all exports
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="mt-2 overflow-x-auto">
                <Table className="w-full text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <THead>
                    <TR style={{ borderBottom: "1px solid " + line }}>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Reference
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Requested
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Contents
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Format
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Size
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-left"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Status
                      </TH>
                      <TH
                        className={microLabel + " py-3 text-right"}
                        style={{ color: muted }}
                        scope="col"
                      >
                        Action
                      </TH>
                    </TR>
                  </THead>
                  <TBody>
                    {visibleExports.map((row) => (
                      <TR
                        key={row.id}
                        className={"v-row" + (row.fresh ? " v-in" : "")}
                        style={{ borderBottom: "1px solid " + lineSoft }}
                      >
                        <TD className="py-4 pr-4 align-top" style={{ color: accent }}>
                          {row.id}
                        </TD>
                        <TD className="py-4 pr-4 align-top" style={{ color: text }}>
                          {row.requested}
                        </TD>
                        <TD className="py-4 pr-4 align-top" style={{ color: text }}>
                          <span>{row.contents}</span>
                          <span className="mt-1 block text-xs" style={{ color: muted }}>
                            {row.note}
                            {downloaded[row.id] ? " · Downloaded 30 Oct 2026" : ""}
                          </span>
                        </TD>
                        <TD className="py-4 pr-4 align-top" style={{ color: muted }}>
                          {row.format}
                        </TD>
                        <TD className="py-4 pr-4 align-top" style={{ color: muted }}>
                          {row.size}
                        </TD>
                        <TD className="py-4 pr-4 align-top">
                          <StatusTag status={row.status} />
                        </TD>
                        <TD className="py-4 text-right align-top">
                          {row.status === "ready" ? (
                            <Button
                              type="button"
                              onClick={() => download(row)}
                              className="v-focus inline-flex items-center gap-2 px-3 py-2 text-xs"
                              style={{
                                backgroundColor: "transparent",
                                color: accent,
                                border: "1px solid " + accent + "66",
                                borderRadius: brand.radius,
                              }}
                            >
                              <Icons.Download className="h-3.5 w-3.5" aria-hidden="true" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-xs" style={{ color: muted }}>
                              {row.status === "preparing"
                                ? "Working on it"
                                : row.status === "failed"
                                  ? "Request again"
                                  : "No longer available"}
                            </span>
                          )}
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            )}

            <Separator className="mt-6" />
            <p className="mt-4 max-w-prose text-xs leading-relaxed" style={{ color: muted }}>
              Need your record erased rather than exported? Erasure is actioned by People Operations
              — write to {HR_CONTACT.name} at {HR_CONTACT.email} and they will handle it under the
              retention policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
