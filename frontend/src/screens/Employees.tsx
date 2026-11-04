// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Badge, Table, THead, TBody, TR, TH, TD, Avatar, Tabs, Stat, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Search, Check, X, Clock, Edit, Download, Upload, AlertCircle, CheckCircle } = Icons;

const ORG = "Northbeam";

const SURFACE = "#1b2822";
const SURFACE_RAISED = "#20302a";
const HAIRLINE = "rgba(233,237,233,0.11)";
const HAIRLINE_SOFT = "rgba(233,237,233,0.07)";
const WARN = "#c9a86a";
const DANGER = "#cc8a76";

const INITIAL_EMPLOYEES = [
  { id: "e-0101", ref: "EMP-0101", name: "Marguerite Oyelaran", email: "m.oyelaran@northbeam.co", role: "HR Admin", manager_id: null, status: "active", is_anonymised: false, consent: "granted", created_at: "2023-02-14", updated_at: "2026-10-28" },
  { id: "e-0102", ref: "EMP-0102", name: "Tobias Lindqvist", email: "t.lindqvist@northbeam.co", role: "Manager", manager_id: "e-0101", status: "active", is_anonymised: false, consent: "granted", created_at: "2023-04-03", updated_at: "2026-10-21" },
  { id: "e-0103", ref: "EMP-0103", name: "Priya Raghunathan", email: "p.raghunathan@northbeam.co", role: "Manager", manager_id: "e-0101", status: "active", is_anonymised: false, consent: "granted", created_at: "2023-06-19", updated_at: "2026-10-29" },
  { id: "e-0104", ref: "EMP-0104", name: "Daniel Okonkwo", email: "d.okonkwo@northbeam.co", role: "Employee", manager_id: "e-0102", status: "active", is_anonymised: false, consent: "granted", created_at: "2024-01-08", updated_at: "2026-10-27" },
  { id: "e-0105", ref: "EMP-0105", name: "Yuki Nakamura", email: "y.nakamura@northbeam.co", role: "Employee", manager_id: "e-0102", status: "active", is_anonymised: false, consent: "pending", created_at: "2024-03-11", updated_at: "2026-10-30" },
  { id: "e-0106", ref: "EMP-0106", name: "Clara Benedetti", email: "c.benedetti@northbeam.co", role: "Employee", manager_id: "e-0103", status: "active", is_anonymised: false, consent: "granted", created_at: "2024-05-02", updated_at: "2026-10-14" },
  { id: "e-0107", ref: "EMP-0107", name: "Samuel Adeyemi", email: "s.adeyemi@northbeam.co", role: "Employee", manager_id: "e-0103", status: "invited", is_anonymised: false, consent: "pending", created_at: "2026-10-26", updated_at: "2026-10-26" },
  { id: "e-0108", ref: "EMP-0108", name: "Hélène Dufort", email: "h.dufort@northbeam.co", role: "Employee", manager_id: "e-0102", status: "suspended", is_anonymised: false, consent: "withdrawn", created_at: "2022-09-15", updated_at: "2026-10-24" },
  { id: "e-0109", ref: "EMP-0109", name: "Marcus Whitfield", email: "m.whitfield@northbeam.co", role: "Employee", manager_id: "e-0103", status: "active", is_anonymised: false, consent: "granted", created_at: "2023-11-20", updated_at: "2026-10-09" },
  { id: "e-0110", ref: "EMP-0110", name: "Anja Kowalczyk", email: "a.kowalczyk@northbeam.co", role: "Manager", manager_id: "e-0101", status: "active", is_anonymised: false, consent: "granted", created_at: "2022-07-04", updated_at: "2026-10-22" },
  { id: "e-0111", ref: "EMP-0111", name: "Anonymised record", email: "erased@northbeam.invalid", role: "Employee", manager_id: null, status: "erased", is_anonymised: true, consent: "withdrawn", created_at: "2021-03-01", updated_at: "2026-10-12" },
  { id: "e-0112", ref: "EMP-0112", name: "Rowan Pierce", email: "r.pierce@northbeam.co", role: "Employee", manager_id: "e-0110", status: "invited", is_anonymised: false, consent: "pending", created_at: "2026-10-19", updated_at: "2026-10-19" },
  { id: "e-0113", ref: "EMP-0113", name: "Ingrid Sørensen", email: "i.sorensen@northbeam.co", role: "Employee", manager_id: "e-0110", status: "active", is_anonymised: false, consent: "granted", created_at: "2023-08-30", updated_at: "2026-10-25" },
  { id: "e-0114", ref: "EMP-0114", name: "Félix Amadou", email: "f.amadou@northbeam.co", role: "Employee", manager_id: null, status: "active", is_anonymised: false, consent: "granted", created_at: "2026-09-28", updated_at: "2026-10-18" },
];

const INITIAL_REQUESTS = [
  { id: "ER-0113", employee_id: "e-0108", requested_at: "2026-10-18", status: "approved", approver: "Y. Adeyinka, Legal", approved_at: "2026-10-28", note: "Left Northbeam 31 Aug 2026. Retention window for performance records has closed." },
  { id: "ER-0114", employee_id: "e-0112", requested_at: "2026-10-27", status: "approved", approver: "Y. Adeyinka, Legal", approved_at: "2026-10-29", note: "Offer withdrawn before start date. Record created by the Q4 import in error." },
  { id: "ER-0112", employee_id: "e-0109", requested_at: "2026-10-29", status: "awaiting_approval", approver: null, approved_at: null, note: "Submitted by the employee on 29 Oct. Legal review in progress." },
  { id: "ER-0109", employee_id: "e-0111", requested_at: "2026-09-30", status: "actioned", approver: "Y. Adeyinka, Legal", approved_at: "2026-10-10", note: "Anonymised on 12 Oct 2026. Goals and feedback authorship de-identified." },
];

const INITIAL_JOBS = [
  {
    id: "JOB-2041", file: "q4-new-hires.csv", created_at: "30 Oct 2026, 09:12", uploaded_by: "Marguerite Oyelaran",
    status: "completed_with_errors", summary: { processed: 24, created: 18, updated: 4, failed: 2 },
    rows: [
      { row: 3, subject: "r.pierce@northbeam.co", outcome: "created", detail: "New profile, reports to Anja Kowalczyk" },
      { row: 7, subject: "s.adeyemi@northbeam.co", outcome: "created", detail: "New profile, invitation pending" },
      { row: 11, subject: "c.benedetti@northbeam.co", outcome: "updated", detail: "manager_id changed e-0102 → e-0103" },
      { row: 14, subject: "—", outcome: "rejected", detail: "Missing required field: email" },
      { row: 19, subject: "k.mensah@northbeam.co", outcome: "rejected", detail: "manager_email \"j.vance@northbeam.co\" not found in directory" },
      { row: 22, subject: "i.sorensen@northbeam.co", outcome: "updated", detail: "role changed Employee → Employee (no change persisted)" },
    ],
  },
  {
    id: "JOB-2038", file: "emea-manager-remap.csv", created_at: "27 Oct 2026, 10:44", uploaded_by: "Marguerite Oyelaran",
    status: "completed", summary: { processed: 11, created: 0, updated: 11, failed: 0 },
    rows: [
      { row: 2, subject: "d.okonkwo@northbeam.co", outcome: "updated", detail: "manager_id changed e-0103 → e-0102" },
      { row: 5, subject: "y.nakamura@northbeam.co", outcome: "updated", detail: "manager_id changed e-0110 → e-0102" },
      { row: 9, subject: "m.whitfield@northbeam.co", outcome: "updated", detail: "status changed invited → active" },
    ],
  },
  {
    id: "JOB-2035", file: "contractors-oct.csv", created_at: "22 Oct 2026, 16:30", uploaded_by: "Marguerite Oyelaran",
    status: "rejected", summary: { processed: 0, created: 0, updated: 0, failed: 9 },
    rows: [
      { row: 1, subject: "header", outcome: "rejected", detail: "Unknown column \"date_of_birth\" — not collected by this system" },
      { row: 1, subject: "header", outcome: "rejected", detail: "Required column \"email\" missing from header" },
    ],
  },
];

const NEW_JOB_ROWS = [
  { row: 2, subject: "n.ferreira@northbeam.co", outcome: "created", detail: "New profile, reports to Priya Raghunathan" },
  { row: 4, subject: "l.haddad@northbeam.co", outcome: "created", detail: "New profile, reports to Tobias Lindqvist" },
  { row: 6, subject: "a.kowalczyk@northbeam.co", outcome: "updated", detail: "role changed Employee → Manager" },
  { row: 8, subject: "—", outcome: "rejected", detail: "Missing required field: name" },
  { row: 12, subject: "t.okafor@northbeam.co", outcome: "updated", detail: "manager_id changed e-0102 → e-0110" },
  { row: 15, subject: "g.villanueva@northbeam.co", outcome: "rejected", detail: "Duplicate email already present on EMP-0106" },
];

const SESSIONS = {
  hr: { role: "HR Admin", name: "Marguerite Oyelaran" },
  manager: { role: "Manager", name: "Tobias Lindqvist" },
  employee: { role: "Employee", name: "Daniel Okonkwo" },
};

const STATUS_META = {
  active: { label: "Active", color: "#8fae8b" },
  invited: { label: "Invited", color: WARN },
  suspended: { label: "Suspended", color: DANGER },
  erased: { label: "Erased", color: "#8ba095" },
};

const CONSENT_META = {
  granted: { label: "Granted", color: "#8fae8b" },
  pending: { label: "Not recorded", color: WARN },
  withdrawn: { label: "Withdrawn", color: DANGER },
};

const OUTCOME_META = {
  created: { label: "Created", color: "#8fae8b" },
  updated: { label: "Updated", color: "#e9ede9" },
  rejected: { label: "Rejected", color: DANGER },
};

const JOB_STATUS_META = {
  completed: { label: "Completed", color: "#8fae8b" },
  completed_with_errors: { label: "Completed, 2 rejected", color: WARN },
  rejected: { label: "Rejected", color: DANGER },
};

const fmtDate = (iso) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function Screen() {
  const navigate = useNavigate();
  const [session, setSession] = React.useState("hr");
  const [tab, setTab] = React.useState("directory");
  const [employees, setEmployees] = React.useState(INITIAL_EMPLOYEES);
  const [requests, setRequests] = React.useState(INITIAL_REQUESTS);
  const [jobs, setJobs] = React.useState(INITIAL_JOBS);

  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [includeAnon, setIncludeAnon] = React.useState(true);

  const [panel, setPanel] = React.useState({ mode: "closed", id: null });
  const [form, setForm] = React.useState({ name: "", email: "", role: "Employee", manager_id: "", status: "invited", consent: false });
  const [errors, setErrors] = React.useState({});
  const [saving, setSaving] = React.useState(false);

  const [toast, setToast] = React.useState(null);
  const [lastTouched, setLastTouched] = React.useState(null);

  const [refreshing, setRefreshing] = React.useState(false);
  const [syncedAt, setSyncedAt] = React.useState("09:42 GMT");

  const [fileName, setFileName] = React.useState("");
  const [importing, setImporting] = React.useState(false);
  const [importError, setImportError] = React.useState("");
  const [selectedJobId, setSelectedJobId] = React.useState("JOB-2041");

  const [confirmReq, setConfirmReq] = React.useState(null);
  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    if (!refreshing) return;
    const t = setTimeout(() => {
      setRefreshing(false);
      setSyncedAt("09:58 GMT");
    }, 900);
    return () => clearTimeout(t);
  }, [refreshing]);

  React.useEffect(() => {
    if (!importing) return;
    const t = setTimeout(() => {
      const job = {
        id: "JOB-2042",
        file: fileName || "import.csv",
        created_at: "30 Oct 2026, 10:02",
        uploaded_by: SESSIONS.hr.name,
        status: "completed_with_errors",
        summary: { processed: 18, created: 11, updated: 5, failed: 2 },
        rows: NEW_JOB_ROWS,
      };
      setJobs((j) => [job, ...j]);
      setSelectedJobId(job.id);
      setImporting(false);
      setToast({ tone: "warn", title: "Import finished with rejections", message: "JOB-2042 — 16 of 18 rows applied. 2 rows were rejected and no partial record was written for them." });
    }, 1400);
    return () => clearTimeout(t);
  }, [importing, fileName]);

  React.useEffect(() => {
    if (confirmReq && cancelRef.current) cancelRef.current.focus();
  }, [confirmReq]);

  const nameOf = (id) => {
    const e = employees.find((x) => x.id === id);
    return e ? e.name : null;
  };

  const managerOptions = employees.filter((e) => (e.role === "Manager" || e.role === "HR Admin") && !e.is_anonymised);

  const filtered = employees.filter((e) => {
    if (!includeAnon && e.is_anonymised) return false;
    if (roleFilter !== "all" && e.role !== roleFilter) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (e.name + " " + e.email + " " + e.ref).toLowerCase().includes(q);
  });

  const activeCount = employees.filter((e) => e.status === "active" && !e.is_anonymised).length;
  const managerCount = employees.filter((e) => e.role === "Manager").length;
  const unassigned = employees.filter((e) => !e.manager_id && e.role !== "HR Admin" && !e.is_anonymised).length;
  const consentPending = employees.filter((e) => e.consent !== "granted" && !e.is_anonymised).length;
  const openErasures = requests.filter((r) => r.status === "approved").length;

  const isHR = session === "hr";
  const anonHidden = employees.filter((e) => e.is_anonymised).length;

  const openCreate = () => {
    setErrors({});
    setForm({ name: "", email: "", role: "Employee", manager_id: "", status: "invited", consent: false });
    setPanel({ mode: "create", id: null });
  };

  const openEdit = (emp) => {
    setErrors({});
    setForm({ name: emp.name, email: emp.email, role: emp.role, manager_id: emp.manager_id || "", status: emp.status, consent: emp.consent === "granted" });
    setPanel({ mode: "edit", id: emp.id });
  };

  const closePanel = () => setPanel({ mode: "closed", id: null });

  const submitProfile = (ev) => {
    ev.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter the employee's full name.";
    if (!form.email.trim()) next.email = "Enter a work email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "That doesn't look like an email address — check for a missing @ or domain.";
    else {
      const clash = employees.find((e) => e.email.toLowerCase() === form.email.trim().toLowerCase() && e.id !== panel.id);
      if (clash) next.email = "Already used by " + clash.ref + ". Work emails must be unique.";
    }
    if (!form.role) next.role = "Choose a role — it decides what this person can see.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    const consent = form.consent ? "granted" : "pending";

    if (panel.mode === "create") {
      const num = 115 + employees.filter((e) => Number(e.ref.slice(4)) >= 115).length;
      const id = "e-0" + num;
      const rec = {
        id, ref: "EMP-0" + num, name: form.name.trim(), email: form.email.trim().toLowerCase(),
        role: form.role, manager_id: form.manager_id || null, status: form.status,
        is_anonymised: false, consent, created_at: "2026-10-30", updated_at: "2026-10-30",
      };
      setEmployees((list) => [rec, ...list]);
      setLastTouched(id);
      setSaving(false);
      closePanel();
      setToast({
        tone: "ok",
        title: rec.name + " added to the directory",
        message: rec.ref + " · " + rec.role + (rec.manager_id ? " · reports to " + nameOf(rec.manager_id) : " · no manager assigned yet"),
      });
      return;
    }

    const before = employees.find((e) => e.id === panel.id);
    const newManager = form.manager_id || null;
    setEmployees((list) => list.map((e) => e.id === panel.id ? {
      ...e, name: form.name.trim(), email: form.email.trim().toLowerCase(), role: form.role,
      manager_id: newManager, status: form.status, consent, updated_at: "2026-10-30",
    } : e));
    setLastTouched(panel.id);
    setSaving(false);
    closePanel();
    const moved = before && before.manager_id !== newManager;
    setToast({
      tone: "ok",
      title: before.ref + " updated",
      message: moved
        ? form.name.trim() + " now reports to " + (newManager ? nameOf(newManager) : "nobody") + (before.manager_id ? " — removed from " + nameOf(before.manager_id) + "'s direct reports." : ".")
        : "Changes to " + form.name.trim() + "'s record are live wherever the profile appears.",
    });
  };

  const runImport = (ev) => {
    ev.preventDefault();
    if (!fileName) {
      setImportError("Choose a CSV file before running the import.");
      return;
    }
    setImportError("");
    setImporting(true);
  };

  const actionErasure = (req) => {
    const emp = employees.find((e) => e.id === req.employee_id);
    setEmployees((list) => list.map((e) => e.id === req.employee_id ? {
      ...e, name: "Anonymised record", email: "erased@northbeam.invalid", manager_id: null,
      status: "erased", is_anonymised: true, consent: "withdrawn", updated_at: "2026-10-30",
    } : e));
    setRequests((list) => list.map((r) => r.id === req.id ? { ...r, status: "actioned", note: "Anonymised on 30 Oct 2026. Goals and feedback authorship de-identified." } : r));
    setConfirmReq(null);
    setLastTouched(req.employee_id);
    setToast({ tone: "danger", title: "Erasure actioned for " + (emp ? emp.ref : req.employee_id), message: (emp ? emp.name : "The record") + " is now anonymised. Name, email and reporting line are no longer retrievable in " + ORG + " PMS." });
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const editing = panel.mode === "edit" ? employees.find((e) => e.id === panel.id) : null;
  const directReports = editing ? employees.filter((e) => e.manager_id === editing.id) : [];

  const label = "text-[11px] uppercase tracking-[0.14em]";
  const panelStyle = { backgroundColor: SURFACE, border: "1px solid " + HAIRLINE, borderRadius: brand.radius };
  const inputStyle = { backgroundColor: "#16211c", border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius };

  const Pill = ({ meta }) => (
    <span className="inline-flex items-center gap-2 text-[12px]" style={{ color: brand.primaryColor }}>
      <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );

  return (
    <div style={{ color: brand.primaryColor, fontFamily: brand.fontBody }} className="pb-16">
      <style>{`
        .vel-focus:focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 2px; }
        @keyframes velRowIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        @keyframes velPanelIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }
        @keyframes velFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @keyframes velPulse { 0%, 100% { opacity: .3 } 50% { opacity: .62 } }
        .vel-row-in { animation: velRowIn .45s ease-out both; }
        .vel-panel-in { animation: velPanelIn .3s ease-out both; }
        .vel-fade-in { animation: velFadeIn .3s ease-out both; }
        .vel-pulse { animation: velPulse 1.3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .vel-row-in, .vel-panel-in, .vel-fade-in, .vel-pulse { animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="pt-2">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46ch]">
            <p className={label} style={{ color: brand.accentColor }}>{ORG} · HR administration</p>
            <h1 className="mt-3 text-[38px] leading-[1.1]" style={{ fontFamily: brand.fontHeading }}>Employee directory</h1>
            <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: brand.neutralColor }}>
              The single record of who works here and who they report to. Profiles, reporting lines, CSV imports and approved erasures are all maintained from this page.
            </p>
          </div>

          <div className="flex items-end gap-6">
            <div>
              <Label htmlFor="session-role" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Preview access as</Label>
              <Select id="session-role" value={session} onChange={(e) => setSession(e.target.value)} className="vel-focus text-[13px] px-3 py-2 w-[210px]" style={inputStyle}>
                <option value="hr">HR Admin — Marguerite Oyelaran</option>
                <option value="manager">Manager — Tobias Lindqvist</option>
                <option value="employee">Employee — Daniel Okonkwo</option>
              </Select>
            </div>
            <Button
              onClick={openCreate}
              disabled={!isHR}
              className="vel-focus inline-flex items-center gap-2 px-5 py-3 text-[14px] font-medium transition-opacity disabled:opacity-40"
              style={{ backgroundColor: brand.accentColor, color: "#13201a", borderRadius: brand.radius }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add employee
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-5" style={{ border: "1px solid " + HAIRLINE, borderRadius: brand.radius, backgroundColor: SURFACE }}>
          {[
            { label: "Active employees", value: String(activeCount), hint: "of " + employees.length + " records" },
            { label: "Managers", value: String(managerCount), hint: "with direct reports" },
            { label: "No manager assigned", value: String(unassigned), hint: "needs a reporting line" },
            { label: "Consent not granted", value: String(consentPending), hint: "performance processing" },
            { label: "Erasures to action", value: String(openErasures), hint: "approved by Legal" },
          ].map((s, i) => (
            <div key={s.label} className="px-5 py-4" style={{ borderLeft: i === 0 ? "none" : "1px solid " + HAIRLINE_SOFT }}>
              <Stat label={s.label} value={s.value} hint={s.hint} className="[&>*]:!m-0" />
            </div>
          ))}
        </div>
      </header>

      {/* Toast / live region */}
      <div aria-live="polite" className="mt-6">
        {toast && (
          <div className="vel-fade-in flex items-start gap-3 px-5 py-4" style={{ backgroundColor: SURFACE_RAISED, border: "1px solid " + (toast.tone === "ok" ? "rgba(143,174,139,0.4)" : toast.tone === "warn" ? "rgba(201,168,106,0.4)" : "rgba(204,138,118,0.4)"), borderRadius: brand.radius }}>
            {toast.tone === "ok"
              ? <CheckCircle className="h-5 w-5 shrink-0 mt-[1px]" style={{ color: brand.accentColor }} aria-hidden="true" />
              : <AlertCircle className="h-5 w-5 shrink-0 mt-[1px]" style={{ color: toast.tone === "warn" ? WARN : DANGER }} aria-hidden="true" />}
            <div className="min-w-0 flex-1">
              <p className="text-[14px]">{toast.title}</p>
              <p className="mt-1 text-[13px] leading-[1.55]" style={{ color: brand.neutralColor }}>{toast.message}</p>
            </div>
            <Button onClick={() => setToast(null)} aria-label="Dismiss notice" className="vel-focus shrink-0 p-2" style={{ color: brand.neutralColor, borderRadius: brand.radius }}>
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Tabs
          tabs={[
            { key: "directory", label: "Directory" },
            { key: "import", label: "CSV import" },
            { key: "erasure", label: "Erasure requests (" + openErasures + ")" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {!isHR ? (
        <section className="mt-8 px-8 py-12" style={panelStyle} aria-labelledby="denied-title">
          <div className="max-w-[52ch]">
            <p className={label} style={{ color: WARN }}>Access denied</p>
            <h2 id="denied-title" className="mt-3 text-[26px]" style={{ fontFamily: brand.fontHeading }}>The directory is HR Admin only</h2>
            <p className="mt-3 text-[14px] leading-[1.65]" style={{ color: brand.neutralColor }}>
              You are signed in as {SESSIONS[session].name} ({SESSIONS[session].role}). {session === "manager"
                ? "Managers can see their own record and their direct reports' goals and feedback, but not the organisation-wide directory or the reporting hierarchy."
                : "Employees can see and check their own profile record and reporting line."}
              {" "}To correct a name, email or reporting line, ask Marguerite Oyelaran (HR Admin) to make the change.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => navigate("my-profile")} className="vel-focus px-5 py-3 text-[14px]" style={{ backgroundColor: brand.accentColor, color: "#13201a", borderRadius: brand.radius }}>
                Open my profile
              </Button>
              <Button onClick={() => navigate("dashboard")} className="vel-focus px-5 py-3 text-[14px]" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>
                Go to my dashboard
              </Button>
            </div>
          </div>
        </section>
      ) : tab === "directory" ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
          <section aria-labelledby="dir-heading" style={panelStyle}>
            <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
              <div>
                <h2 id="dir-heading" className="text-[20px]" style={{ fontFamily: brand.fontHeading }}>All records</h2>
                <p className="mt-1 text-[12px] flex items-center gap-2" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {refreshing ? "Re-reading the directory…" : "Synced " + syncedAt + " · showing " + filtered.length + " of " + employees.length}
                </p>
              </div>
              <Button onClick={() => setRefreshing(true)} disabled={refreshing} className="vel-focus px-3 py-2 text-[13px] disabled:opacity-50" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>
                {refreshing ? "Refreshing…" : "Refresh"}
              </Button>
            </div>

            <div className="flex flex-wrap items-end gap-4 px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE_SOFT }}>
              <div className="min-w-[220px] flex-1">
                <Label htmlFor="dir-search" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: brand.neutralColor }} aria-hidden="true" />
                  <Input id="dir-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, work email or EMP reference" className="vel-focus w-full pl-9 pr-3 py-2 text-[14px]" style={inputStyle} />
                </div>
              </div>
              <div>
                <Label htmlFor="dir-role" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Role</Label>
                <Select id="dir-role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="vel-focus px-3 py-2 text-[14px]" style={inputStyle}>
                  <option value="all">All roles</option>
                  <option value="HR Admin">HR Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="dir-status" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Status</Label>
                <Select id="dir-status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="vel-focus px-3 py-2 text-[14px]" style={inputStyle}>
                  <option value="all">Any status</option>
                  <option value="active">Active</option>
                  <option value="invited">Invited</option>
                  <option value="suspended">Suspended</option>
                  <option value="erased">Erased</option>
                </Select>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Checkbox id="dir-anon" checked={includeAnon} onChange={(e) => setIncludeAnon(e.target.checked)} className="vel-focus" />
                <Label htmlFor="dir-anon" className="text-[13px]" style={{ color: brand.neutralColor }}>
                  Show anonymised ({anonHidden})
                </Label>
              </div>
            </div>

            {refreshing ? (
              <div className="px-6 py-6 space-y-4" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="vel-pulse h-3 w-[30%] rounded" style={{ backgroundColor: HAIRLINE, animationDelay: i * 90 + "ms" }} />
                    <div className="vel-pulse h-3 w-[18%] rounded" style={{ backgroundColor: HAIRLINE_SOFT, animationDelay: i * 90 + "ms" }} />
                    <div className="vel-pulse h-3 w-[22%] rounded" style={{ backgroundColor: HAIRLINE_SOFT, animationDelay: i * 90 + "ms" }} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-6 py-10">
                <Empty
                  title="No one matches those filters"
                  description={'Nothing in the directory matches "' + query + '" with those role and status filters. Clear them to see all ' + employees.length + " records."}
                  action={
                    <Button onClick={() => { setQuery(""); setRoleFilter("all"); setStatusFilter("all"); setIncludeAnon(true); }} className="vel-focus px-4 py-2 text-[13px]" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>
                      Clear filters
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="w-full text-[14px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <THead>
                    <TR style={{ borderBottom: "1px solid " + HAIRLINE }}>
                      <TH scope="col" className={label + " text-left px-6 py-3 font-normal"} style={{ color: brand.neutralColor }}>Employee</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal"} style={{ color: brand.neutralColor }}>Role</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal hidden md:table-cell"} style={{ color: brand.neutralColor }}>Reports to</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal"} style={{ color: brand.neutralColor }}>Status</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal hidden lg:table-cell"} style={{ color: brand.neutralColor }}>Consent</TH>
                      <TH scope="col" className={label + " text-right px-6 py-3 font-normal hidden lg:table-cell"} style={{ color: brand.neutralColor }}>Updated</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {filtered.map((e) => {
                      const selected = panel.id === e.id;
                      return (
                        <TR
                          key={e.id}
                          className={(lastTouched === e.id ? "vel-row-in " : "") + "transition-colors hover:bg-[rgba(233,237,233,0.03)]"}
                          style={{ borderBottom: "1px solid " + HAIRLINE_SOFT, backgroundColor: selected ? "rgba(143,174,139,0.07)" : "transparent", boxShadow: selected ? "inset 2px 0 0 " + brand.accentColor : "none" }}
                        >
                          <TD className="px-6 py-4 align-top">
                            <div className="flex items-start gap-3">
                              <Avatar name={e.is_anonymised ? "–" : e.name} className="shrink-0" />
                              <div className="min-w-0">
                                {e.is_anonymised ? (
                                  <p className="italic" style={{ color: brand.neutralColor }}>Anonymised record</p>
                                ) : (
                                  <Button onClick={() => openEdit(e)} className="vel-focus text-left hover:underline" style={{ color: brand.primaryColor, borderRadius: brand.radius }}>
                                    {e.name}
                                  </Button>
                                )}
                                <p className="text-[12px] mt-0.5 truncate" style={{ color: brand.neutralColor }}>
                                  <span style={{ color: brand.accentColor }}>{e.ref}</span>
                                  <span aria-hidden="true"> · </span>
                                  {e.is_anonymised ? "contact details removed" : e.email}
                                </p>
                              </div>
                            </div>
                          </TD>
                          <TD className="px-4 py-4 align-top">
                            <Badge className="text-[12px] px-2.5 py-1 inline-block" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius, backgroundColor: "transparent" }}>{e.role}</Badge>
                          </TD>
                          <TD className="px-4 py-4 align-top hidden md:table-cell">
                            {e.manager_id ? (
                              <span className="text-[13px] inline-flex items-center gap-2">
                                <span aria-hidden="true" style={{ color: brand.accentColor }}>└</span>
                                {nameOf(e.manager_id)}
                              </span>
                            ) : e.role === "HR Admin" ? (
                              <span className="text-[13px]" style={{ color: brand.neutralColor }}>Top of hierarchy</span>
                            ) : e.is_anonymised ? (
                              <span className="text-[13px]" style={{ color: brand.neutralColor }}>—</span>
                            ) : (
                              <span className="text-[13px] inline-flex items-center gap-2" style={{ color: WARN }}>
                                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> Not assigned
                              </span>
                            )}
                          </TD>
                          <TD className="px-4 py-4 align-top"><Pill meta={STATUS_META[e.status]} /></TD>
                          <TD className="px-4 py-4 align-top hidden lg:table-cell"><Pill meta={CONSENT_META[e.consent]} /></TD>
                          <TD className="px-6 py-4 align-top text-right text-[13px] hidden lg:table-cell" style={{ color: brand.neutralColor }}>{fmtDate(e.updated_at)}</TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            )}
          </section>

          {/* Side panel */}
          <aside className="lg:sticky lg:top-6">
            {panel.mode === "closed" ? (
              <div className="px-6 py-7" style={panelStyle}>
                <p className={label} style={{ color: brand.accentColor }}>Record editor</p>
                <h2 className="mt-3 text-[20px]" style={{ fontFamily: brand.fontHeading }}>Pick a name to edit it</h2>
                <p className="mt-3 text-[13px] leading-[1.65]" style={{ color: brand.neutralColor }}>
                  Select an employee in the table to change their details, move them under a different manager, or record consent. Changes appear everywhere the profile is shown.
                </p>
                <div className="my-6" style={{ borderTop: "1px solid " + HAIRLINE_SOFT }} />
                <p className={label} style={{ color: brand.neutralColor }}>Data minimisation</p>
                <p className="mt-2 text-[13px] leading-[1.65]" style={{ color: brand.neutralColor }}>
                  {ORG} PMS stores name, work email, role, reporting line and status only. Date of birth, home address and salary are deliberately not collected.
                </p>
              </div>
            ) : (
              <form onSubmit={submitProfile} className="vel-panel-in" style={panelStyle} noValidate>
                <div className="flex items-start justify-between gap-4 px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
                  <div>
                    <p className={label} style={{ color: brand.accentColor }}>{panel.mode === "create" ? "New profile" : editing.ref}</p>
                    <h2 className="mt-2 text-[20px]" style={{ fontFamily: brand.fontHeading }}>
                      {panel.mode === "create" ? "Add an employee" : "Edit " + editing.name.split(" ")[0] + "'s record"}
                    </h2>
                  </div>
                  <Button type="button" onClick={closePanel} aria-label="Close record editor" className="vel-focus p-2" style={{ color: brand.neutralColor, borderRadius: brand.radius }}>
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="px-6 py-6 space-y-5">
                  <div>
                    <Label htmlFor="f-name" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Full name *</Label>
                    <Input id="f-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "f-name-err" : undefined} className="vel-focus w-full px-3 py-2 text-[14px]" style={{ ...inputStyle, borderColor: errors.name ? DANGER : HAIRLINE }} />
                    {errors.name && <p id="f-name-err" className="mt-2 text-[12px] flex items-center gap-1.5" style={{ color: DANGER }}><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="f-email" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Work email *</Label>
                    <Input id="f-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "f-email-err" : undefined} className="vel-focus w-full px-3 py-2 text-[14px]" style={{ ...inputStyle, borderColor: errors.email ? DANGER : HAIRLINE }} />
                    {errors.email && <p id="f-email-err" className="mt-2 text-[12px] flex items-center gap-1.5" style={{ color: DANGER }}><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="f-role" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Role *</Label>
                    <Select id="f-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="vel-focus w-full px-3 py-2 text-[14px]" style={inputStyle}>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="HR Admin">HR Admin</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="f-manager" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Reports to</Label>
                    <Select id="f-manager" value={form.manager_id} onChange={(e) => setForm({ ...form, manager_id: e.target.value })} className="vel-focus w-full px-3 py-2 text-[14px]" style={inputStyle}>
                      <option value="">No manager</option>
                      {managerOptions.filter((m) => m.id !== panel.id).map((m) => (
                        <option key={m.id} value={m.id}>{m.name} — {m.role}</option>
                      ))}
                    </Select>
                    {editing && editing.manager_id !== (form.manager_id || null) && (
                      <p className="mt-2 text-[12px] leading-[1.55]" style={{ color: WARN }}>
                        On save, {editing.name} moves out of {editing.manager_id ? nameOf(editing.manager_id) + "'s" : "an unassigned"} team
                        {form.manager_id ? " and into " + nameOf(form.manager_id) + "'s direct reports." : " and will have no manager."}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="f-status" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>Account status</Label>
                    <Select id="f-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="vel-focus w-full px-3 py-2 text-[14px]" style={inputStyle}>
                      <option value="invited">Invited — not signed in yet</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </Select>
                  </div>

                  <div className="pt-1" style={{ borderTop: "1px solid " + HAIRLINE_SOFT }}>
                    <div className="flex items-start gap-3 pt-4">
                      <Checkbox id="f-consent" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="vel-focus mt-0.5" />
                      <Label htmlFor="f-consent" className="text-[13px] leading-[1.6]" style={{ color: brand.primaryColor }}>
                        Consent recorded for performance management processing
                        <span className="block text-[12px] mt-1" style={{ color: brand.neutralColor }}>
                          Stored against this profile with today's date and retrievable on request.
                        </span>
                      </Label>
                    </div>
                  </div>

                  {editing && directReports.length > 0 && (
                    <div className="pt-4" style={{ borderTop: "1px solid " + HAIRLINE_SOFT }}>
                      <p className={label} style={{ color: brand.neutralColor }}>Direct reports ({directReports.length})</p>
                      <ul className="mt-3 space-y-2">
                        {directReports.map((r) => (
                          <li key={r.id} className="text-[13px] flex items-center gap-2">
                            <span aria-hidden="true" style={{ color: brand.accentColor }}>└</span>
                            {r.name}
                            <span style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>{r.ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-5" style={{ borderTop: "1px solid " + HAIRLINE }}>
                  <Button type="button" onClick={closePanel} className="vel-focus px-4 py-2.5 text-[13px]" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>Cancel</Button>
                  <Button type="submit" disabled={saving} className="vel-focus px-5 py-2.5 text-[14px] font-medium disabled:opacity-60" style={{ backgroundColor: brand.accentColor, color: "#13201a", borderRadius: brand.radius }}>
                    {saving ? "Saving…" : panel.mode === "create" ? "Create profile" : "Save changes"}
                  </Button>
                </div>
              </form>
            )}
          </aside>
        </div>
      ) : tab === "import" ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] items-start">
          <section aria-labelledby="imp-heading" style={panelStyle}>
            <div className="px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
              <h2 id="imp-heading" className="text-[20px]" style={{ fontFamily: brand.fontHeading }}>Bulk import</h2>
              <p className="mt-1 text-[13px]" style={{ color: brand.neutralColor }}>Create or update many records at once.</p>
            </div>
            <form onSubmit={runImport} className="px-6 py-6 space-y-5">
              <div>
                <Label htmlFor="csv-file" className={label + " block mb-2"} style={{ color: brand.neutralColor }}>CSV file</Label>
                <Input
                  id="csv-file" type="file" accept=".csv"
                  onChange={(e) => { const f = e.target.files && e.target.files[0]; setFileName(f ? f.name : ""); setImportError(""); }}
                  aria-describedby="csv-help"
                  className="vel-focus w-full px-3 py-2 text-[13px]"
                  style={{ ...inputStyle, borderColor: importError ? DANGER : HAIRLINE }}
                />
                <p id="csv-help" className="mt-2 text-[12px] leading-[1.6]" style={{ color: brand.neutralColor }}>
                  Columns: name, email, role, manager_email, status. Rows are matched on email — a match updates, no match creates.
                </p>
                {importError && (
                  <p role="alert" className="mt-2 text-[12px] flex items-center gap-1.5" style={{ color: DANGER }}>
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{importError}
                  </p>
                )}
                {fileName && !importError && (
                  <p className="mt-2 text-[12px] flex items-center gap-1.5" style={{ color: brand.accentColor }}>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />{fileName} ready to process
                  </p>
                )}
              </div>

              <Button type="submit" disabled={importing} className="vel-focus w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium disabled:opacity-60" style={{ backgroundColor: brand.accentColor, color: "#13201a", borderRadius: brand.radius }}>
                <Upload className="h-4 w-4" aria-hidden="true" />
                {importing ? "Processing rows…" : "Run import"}
              </Button>

              <Button type="button" onClick={() => setToast({ tone: "ok", title: "Template ready", message: "northbeam-employees-template.csv contains the five accepted columns and one example row." })} className="vel-focus w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[13px]" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download template
              </Button>

              <p className="text-[12px] leading-[1.65] pt-4" style={{ color: brand.neutralColor, borderTop: "1px solid " + HAIRLINE_SOFT }}>
                CSV import and in-app editing are the two ways to maintain the directory in this release. HRIS sync is not part of it.
              </p>
            </form>
          </section>

          <section aria-labelledby="jobs-heading" className="space-y-8">
            <div style={panelStyle}>
              <div className="px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
                <h2 id="jobs-heading" className="text-[20px]" style={{ fontFamily: brand.fontHeading }}>Import history</h2>
                <p className="mt-1 text-[13px]" style={{ color: brand.neutralColor }}>Select a job to read its per-row result.</p>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full text-[14px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <THead>
                    <TR style={{ borderBottom: "1px solid " + HAIRLINE }}>
                      <TH scope="col" className={label + " text-left px-6 py-3 font-normal"} style={{ color: brand.neutralColor }}>Job</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal hidden md:table-cell"} style={{ color: brand.neutralColor }}>Uploaded</TH>
                      <TH scope="col" className={label + " text-left px-4 py-3 font-normal"} style={{ color: brand.neutralColor }}>Result</TH>
                      <TH scope="col" className={label + " text-right px-6 py-3 font-normal"} style={{ color: brand.neutralColor }}>Rows</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {importing && (
                      <TR style={{ borderBottom: "1px solid " + HAIRLINE_SOFT }}>
                        <TD className="px-6 py-4" colSpan={4}>
                          <div className="flex items-center gap-3">
                            <span className="vel-pulse inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: brand.accentColor }} aria-hidden="true" />
                            <span className="text-[13px]">Validating {fileName} — reading rows and checking manager_email against the directory…</span>
                          </div>
                          <div className="mt-3 h-[3px] w-full overflow-hidden" style={{ backgroundColor: HAIRLINE_SOFT, borderRadius: 2 }}>
                            <div className="vel-pulse h-full w-1/2" style={{ backgroundColor: brand.accentColor }} />
                          </div>
                        </TD>
                      </TR>
                    )}
                    {jobs.map((j) => {
                      const meta = JOB_STATUS_META[j.status];
                      const sel = selectedJob && selectedJob.id === j.id;
                      return (
                        <TR key={j.id} className={(j.id === "JOB-2042" ? "vel-row-in " : "") + "transition-colors hover:bg-[rgba(233,237,233,0.03)]"} style={{ borderBottom: "1px solid " + HAIRLINE_SOFT, backgroundColor: sel ? "rgba(143,174,139,0.07)" : "transparent", boxShadow: sel ? "inset 2px 0 0 " + brand.accentColor : "none" }}>
                          <TD className="px-6 py-4">
                            <Button onClick={() => setSelectedJobId(j.id)} className="vel-focus text-left" style={{ borderRadius: brand.radius }} aria-pressed={sel}>
                              <span className="block text-[13px]" style={{ color: brand.accentColor }}>{j.id}</span>
                              <span className="block mt-0.5">{j.file}</span>
                            </Button>
                          </TD>
                          <TD className="px-4 py-4 text-[13px] hidden md:table-cell" style={{ color: brand.neutralColor }}>{j.created_at}<br />{j.uploaded_by}</TD>
                          <TD className="px-4 py-4"><Pill meta={{ label: j.status === "completed_with_errors" ? "Completed, " + j.summary.failed + " rejected" : meta.label, color: meta.color }} /></TD>
                          <TD className="px-6 py-4 text-right text-[13px]" style={{ color: brand.neutralColor }}>
                            {j.summary.processed} processed<br />{j.summary.created} created · {j.summary.updated} updated · {j.summary.failed} failed
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            </div>

            {selectedJob && (
              <div style={panelStyle}>
                <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
                  <div>
                    <p className={label} style={{ color: brand.accentColor }}>{selectedJob.id} · {selectedJob.file}</p>
                    <h3 className="mt-2 text-[18px]" style={{ fontFamily: brand.fontHeading }}>Per-row result</h3>
                  </div>
                  <p className="text-[13px]" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                    {selectedJob.summary.failed > 0
                      ? "Rejected rows were not written. Valid rows in the same file were still applied."
                      : "Every row in this file was applied."}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table className="w-full text-[14px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <THead>
                      <TR style={{ borderBottom: "1px solid " + HAIRLINE }}>
                        <TH scope="col" className={label + " text-left px-6 py-3 font-normal w-[70px]"} style={{ color: brand.neutralColor }}>Row</TH>
                        <TH scope="col" className={label + " text-left px-4 py-3 font-normal"} style={{ color: brand.neutralColor }}>Record</TH>
                        <TH scope="col" className={label + " text-left px-4 py-3 font-normal"} style={{ color: brand.neutralColor }}>Outcome</TH>
                        <TH scope="col" className={label + " text-left px-6 py-3 font-normal"} style={{ color: brand.neutralColor }}>Detail</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {selectedJob.rows.map((r, i) => (
                        <TR key={i} style={{ borderBottom: "1px solid " + HAIRLINE_SOFT }}>
                          <TD className="px-6 py-3" style={{ color: brand.accentColor }}>{r.row}</TD>
                          <TD className="px-4 py-3">{r.subject}</TD>
                          <TD className="px-4 py-3"><Pill meta={OUTCOME_META[r.outcome]} /></TD>
                          <TD className="px-6 py-3 text-[13px]" style={{ color: brand.neutralColor }}>{r.detail}</TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <section aria-labelledby="er-heading" className="mt-8" style={panelStyle}>
          <div className="px-6 py-5" style={{ borderBottom: "1px solid " + HAIRLINE }}>
            <h2 id="er-heading" className="text-[20px]" style={{ fontFamily: brand.fontHeading }}>Erasure requests</h2>
            <p className="mt-1 text-[13px] leading-[1.6] max-w-[70ch]" style={{ color: brand.neutralColor }}>
              Only requests approved by Legal can be actioned. Actioning anonymises the profile, goals and feedback authorship under the retention policy — it cannot be reversed.
            </p>
          </div>

          {requests.length === 0 ? (
            <div className="px-6 py-10">
              <Empty title="No erasure requests" description="Nothing is waiting. Requests appear here once an employee submits one and Legal approves it." />
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: HAIRLINE_SOFT }}>
              {requests.map((r) => {
                const emp = employees.find((e) => e.id === r.employee_id);
                const approved = r.status === "approved";
                const actioned = r.status === "actioned";
                return (
                  <li key={r.id} className="px-6 py-6 flex flex-wrap items-start justify-between gap-6" style={{ borderTop: "1px solid " + HAIRLINE_SOFT }}>
                    <div className="max-w-[62ch]">
                      <p className="text-[12px] uppercase tracking-[0.14em]" style={{ color: brand.accentColor, fontVariantNumeric: "tabular-nums" }}>{r.id}</p>
                      <h3 className="mt-2 text-[17px]" style={{ fontFamily: brand.fontHeading }}>
                        {emp && !emp.is_anonymised ? emp.name : "Anonymised record"} <span className="text-[13px]" style={{ color: brand.neutralColor, fontFamily: brand.fontBody }}>{emp ? emp.ref : ""}</span>
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.65]" style={{ color: brand.neutralColor }}>{r.note}</p>
                      <p className="mt-3 text-[12px]" style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>
                        Requested {fmtDate(r.requested_at)}
                        {r.approver ? " · approved " + fmtDate(r.approved_at) + " by " + r.approver : " · awaiting Legal approval"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Pill meta={actioned ? { label: "Actioned", color: brand.neutralColor } : approved ? { label: "Approved — ready", color: WARN } : { label: "Awaiting approval", color: brand.neutralColor }} />
                      {actioned ? (
                        <span className="inline-flex items-center gap-2 text-[13px]" style={{ color: brand.neutralColor }}>
                          <CheckCircle className="h-4 w-4" aria-hidden="true" /> Data removed
                        </span>
                      ) : (
                        <Button
                          onClick={() => setConfirmReq(r)}
                          disabled={!approved}
                          title={approved ? undefined : "Legal approval required first"}
                          className="vel-focus px-4 py-2.5 text-[13px] disabled:opacity-40"
                          style={{ border: "1px solid " + (approved ? "rgba(204,138,118,0.55)" : HAIRLINE), color: approved ? DANGER : brand.neutralColor, borderRadius: brand.radius }}
                        >
                          {approved ? "Action erasure" : "Blocked until approved"}
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {/* Confirm dialog */}
      {confirmReq && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(10,16,13,0.72)" }}
          onKeyDown={(ev) => { if (ev.key === "Escape") setConfirmReq(null); }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-body" className="vel-fade-in w-full max-w-[480px] p-7" style={{ backgroundColor: SURFACE_RAISED, border: "1px solid " + HAIRLINE, borderRadius: brand.radius, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: DANGER }}>Irreversible · {confirmReq.id}</p>
            <h2 id="confirm-title" className="mt-3 text-[22px]" style={{ fontFamily: brand.fontHeading }}>
              Erase {(employees.find((e) => e.id === confirmReq.employee_id) || {}).name}?
            </h2>
            <p id="confirm-body" className="mt-3 text-[14px] leading-[1.65]" style={{ color: brand.neutralColor }}>
              Name, work email and reporting line are deleted; their goals and feedback are kept but de-identified under the retention policy. Approved {fmtDate(confirmReq.approved_at)} by {confirmReq.approver}. This cannot be undone.
            </p>
            <div className="mt-7 flex justify-end gap-3">
              <Button ref={cancelRef} onClick={() => setConfirmReq(null)} className="vel-focus px-4 py-2.5 text-[13px]" style={{ border: "1px solid " + HAIRLINE, color: brand.primaryColor, borderRadius: brand.radius }}>
                Keep record
              </Button>
              <Button onClick={() => actionErasure(confirmReq)} className="vel-focus px-5 py-2.5 text-[14px] font-medium" style={{ backgroundColor: DANGER, color: "#1a0f0b", borderRadius: brand.radius }}>
                Action erasure
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
