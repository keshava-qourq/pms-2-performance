// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Textarea, Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Avatar, Tabs, Stat, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search } = Icons;

const rgba = (hex, a) => {
  const h = String(hex).replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// Palette roles, all traced to the brand tokens. One semantic brass is reserved
// for "needs attention" (at risk / changes requested) and nothing else.
const T = {
  bg: brand.backgroundColor,
  panel: rgba(brand.primaryColor, 0.035),
  panelUp: rgba(brand.primaryColor, 0.06),
  line: rgba(brand.primaryColor, 0.11),
  lineSoft: rgba(brand.primaryColor, 0.07),
  ink: brand.primaryColor,
  muted: brand.neutralColor,
  accent: brand.accentColor,
  attention: '#c8a46a',
};

const ME = {
  id: 'emp-001',
  name: 'Priya Raghunathan',
  title: 'Engineering Manager · Payments Platform',
  role: 'Manager',
  manager: 'Dominic Shaw',
};

const REPORTS = [
  { id: 'emp-104', name: 'Mateo Ferrante', title: 'Senior Backend Engineer' },
  { id: 'emp-118', name: 'Hannah Okonjo', title: 'Platform Engineer' },
  { id: 'emp-127', name: 'Lars Dahlberg', title: 'QA Lead' },
  { id: 'emp-133', name: 'Nadia Haddad', title: 'Data Engineer' },
];

const ELSEWHERE = [
  { id: 'emp-210', name: 'Clara Beaumont', title: 'Financial Controller', manager: 'Dominic Shaw', dept: 'Finance' },
  { id: 'emp-244', name: 'Rajiv Menon', title: 'Sales Operations Lead', manager: 'Ines Vogel', dept: 'Revenue' },
];

const INITIAL_GOALS = {
  'emp-001': [
    {
      id: 'g-041', ref: 'OBJ-26-041', employee_id: 'emp-001',
      title: 'Ship the SEPA instant payouts corridor',
      description: 'Open the euro instant corridor to every EEA merchant before the January pricing change lands.',
      status: 'active', approval_status: 'approved', created_at: '2026-09-14',
      reviewed_by: 'Dominic Shaw', reviewed_at: '2026-09-18', progress: 78,
      key_results: [
        { id: 'kr-411', goal_id: 'g-041', title: 'Merchants live on the instant corridor', target_value: 120, current_value: 86, status: 'on_track' },
        { id: 'kr-412', goal_id: 'g-041', title: 'Seconds cut from p95 settlement time', target_value: 8, current_value: 5, status: 'at_risk' },
        { id: 'kr-413', goal_id: 'g-041', title: 'Partner banks certified end to end', target_value: 4, current_value: 4, status: 'done' },
      ],
    },
    {
      id: 'g-047', ref: 'OBJ-26-047', employee_id: 'emp-001',
      title: 'Make payments on-call sustainable',
      description: 'Cut the noise that wakes the team at night, and write down what we actually do about the pages that remain.',
      status: 'at_risk', approval_status: 'approved', created_at: '2026-09-02',
      reviewed_by: 'Dominic Shaw', reviewed_at: '2026-09-05', progress: 62,
      key_results: [
        { id: 'kr-471', goal_id: 'g-047', title: 'Tier-1 alert runbooks rewritten', target_value: 18, current_value: 7, status: 'at_risk' },
        { id: 'kr-472', goal_id: 'g-047', title: 'Percent of pages auto-resolved', target_value: 40, current_value: 22, status: 'on_track' },
        { id: 'kr-473', goal_id: 'g-047', title: 'Weekly handover notes published', target_value: 12, current_value: 11, status: 'on_track' },
      ],
    },
    {
      id: 'g-052', ref: 'OBJ-26-052', employee_id: 'emp-001',
      title: 'Grow two engineers into tech-lead scope',
      description: 'Mateo and Hannah each own a cross-team workstream end to end by the close of the cycle.',
      status: 'active', approval_status: 'changes', created_at: '2026-10-05',
      reviewed_by: 'Dominic Shaw', reviewed_at: '2026-10-21',
      review_note: 'Add a key result we can measure — mentoring sessions alone will not tell us whether the scope actually grew.',
      progress: 44,
      key_results: [
        { id: 'kr-521', goal_id: 'g-052', title: 'Mentoring sessions held', target_value: 24, current_value: 9, status: 'on_track' },
        { id: 'kr-522', goal_id: 'g-052', title: 'Cross-team workstreams owned by a report', target_value: 2, current_value: 1, status: 'on_track' },
      ],
    },
    {
      id: 'g-058', ref: 'OBJ-26-058', employee_id: 'emp-001',
      title: 'Halve the cost of chargeback handling',
      description: 'Draft for the Q4 cycle — waiting on a cost baseline from Finance before this goes to Dominic.',
      status: 'active', approval_status: 'draft', created_at: '2026-10-27', progress: 0,
      key_results: [
        { id: 'kr-581', goal_id: 'g-058', title: 'Manual chargeback reviews removed per week', target_value: 400, current_value: 0, status: 'not_started' },
      ],
    },
    {
      id: 'g-018', ref: 'OBJ-26-018', employee_id: 'emp-001',
      title: 'Close out PCI DSS 4.0 evidence for the payments estate',
      description: 'Every in-scope control evidenced in the audit workspace ahead of the November walkthrough.',
      status: 'completed', approval_status: 'approved', created_at: '2026-07-02',
      reviewed_by: 'Dominic Shaw', reviewed_at: '2026-07-06', completed_at: '2026-10-09', progress: 100,
      key_results: [
        { id: 'kr-181', goal_id: 'g-018', title: 'Controls evidenced in the audit workspace', target_value: 64, current_value: 64, status: 'done' },
        { id: 'kr-182', goal_id: 'g-018', title: 'Findings cleared before the auditor walkthrough', target_value: 9, current_value: 9, status: 'done' },
      ],
    },
    {
      id: 'g-033', ref: 'OBJ-26-033', employee_id: 'emp-001',
      title: 'Pilot a merchant-facing status page',
      description: 'Closed on 2 Oct 2026 — folded into the Trust Centre programme run by Comms.',
      status: 'closed', approval_status: 'approved', created_at: '2026-08-11',
      reviewed_by: 'Dominic Shaw', reviewed_at: '2026-08-14', progress: 33,
      key_results: [
        { id: 'kr-331', goal_id: 'g-033', title: 'Design partners signed up for the pilot', target_value: 6, current_value: 2, status: 'not_started' },
      ],
    },
  ],
  'emp-104': [
    {
      id: 'g-063', ref: 'OBJ-26-063', employee_id: 'emp-104',
      title: 'Cut ledger reconciliation lag to under a minute',
      description: 'Ledger entries should land in the reporting store within 60 seconds of capture, every hour of the day.',
      status: 'active', approval_status: 'pending', created_at: '2026-10-22', submitted_at: '2026-10-28', progress: 51,
      key_results: [
        { id: 'kr-631', goal_id: 'g-063', title: 'Seconds cut from reconciliation lag', target_value: 240, current_value: 155, status: 'on_track' },
        { id: 'kr-632', goal_id: 'g-063', title: 'Reconciliation jobs moved to the stream processor', target_value: 9, current_value: 4, status: 'on_track' },
        { id: 'kr-633', goal_id: 'g-063', title: 'Nightly fix-up scripts retired', target_value: 5, current_value: 2, status: 'at_risk' },
      ],
    },
    {
      id: 'g-039', ref: 'OBJ-26-039', employee_id: 'emp-104',
      title: 'Make the payouts API safe to retry',
      description: 'No merchant integration should be able to double-pay by retrying a request.',
      status: 'active', approval_status: 'approved', created_at: '2026-09-08',
      reviewed_by: 'Priya Raghunathan', reviewed_at: '2026-09-10', progress: 82,
      key_results: [
        { id: 'kr-391', goal_id: 'g-039', title: 'Endpoints accepting idempotency keys', target_value: 14, current_value: 11, status: 'on_track' },
        { id: 'kr-392', goal_id: 'g-039', title: 'Duplicate-payout cases in the contract suite', target_value: 30, current_value: 26, status: 'on_track' },
      ],
    },
  ],
  'emp-118': [
    {
      id: 'g-061', ref: 'OBJ-26-061', employee_id: 'emp-118',
      title: 'Move the platform to signed build provenance',
      description: 'Every deployable artefact carries an attestation we can trace back to a commit and a runner.',
      status: 'active', approval_status: 'pending', created_at: '2026-10-24', submitted_at: '2026-10-29', progress: 34,
      key_results: [
        { id: 'kr-611', goal_id: 'g-061', title: 'Services publishing SLSA-3 attestations', target_value: 22, current_value: 6, status: 'on_track' },
        { id: 'kr-612', goal_id: 'g-061', title: 'Pipelines moved off the legacy runner', target_value: 22, current_value: 9, status: 'on_track' },
      ],
    },
    {
      id: 'g-044', ref: 'OBJ-26-044', employee_id: 'emp-118',
      title: 'Keep staging within thirty minutes of production',
      description: 'Teams stopped trusting staging in August. Automated refresh is the way back.',
      status: 'at_risk', approval_status: 'approved', created_at: '2026-08-26',
      reviewed_by: 'Priya Raghunathan', reviewed_at: '2026-08-28', progress: 32,
      key_results: [
        { id: 'kr-441', goal_id: 'g-044', title: 'Services with automated staging refresh', target_value: 18, current_value: 5, status: 'at_risk' },
        { id: 'kr-442', goal_id: 'g-044', title: 'Manual environment tickets removed per month', target_value: 24, current_value: 9, status: 'on_track' },
      ],
    },
  ],
  'emp-127': [],
  'emp-133': [
    {
      id: 'g-029', ref: 'OBJ-26-029', employee_id: 'emp-133',
      title: 'Publish the payments data dictionary',
      description: 'One agreed definition per metric, owned by a named person, readable by Finance without a translator.',
      status: 'completed', approval_status: 'approved', created_at: '2026-07-21',
      reviewed_by: 'Priya Raghunathan', reviewed_at: '2026-07-23', completed_at: '2026-10-16', progress: 100,
      key_results: [
        { id: 'kr-291', goal_id: 'g-029', title: 'Core metrics defined and owned', target_value: 48, current_value: 48, status: 'done' },
        { id: 'kr-292', goal_id: 'g-029', title: 'Finance sign-offs on the definitions', target_value: 3, current_value: 3, status: 'done' },
      ],
    },
    {
      id: 'g-055', ref: 'OBJ-26-055', employee_id: 'emp-133',
      title: 'Shrink the cost of the events warehouse',
      description: 'Monthly warehouse spend is up 40% on the year with no growth in queries behind it.',
      status: 'active', approval_status: 'changes', created_at: '2026-10-12',
      reviewed_by: 'Priya Raghunathan', reviewed_at: '2026-10-26',
      review_note: 'Good target — add a key result for the query latency we promised Finance, otherwise we cut cost and break their dashboards.',
      progress: 44,
      key_results: [
        { id: 'kr-551', goal_id: 'g-055', title: 'Percent reduction in monthly warehouse spend', target_value: 25, current_value: 11, status: 'on_track' },
      ],
    },
  ],
};

const STATUS_META = {
  active: { label: 'Active', tone: 'muted' },
  at_risk: { label: 'At risk', tone: 'attention' },
  completed: { label: 'Completed', tone: 'accent' },
  closed: { label: 'Closed', tone: 'muted' },
};

const APPROVAL_META = {
  draft: { label: 'Draft', tone: 'muted' },
  pending: { label: 'Pending approval', tone: 'muted' },
  approved: { label: 'Approved', tone: 'accent' },
  changes: { label: 'Changes requested', tone: 'attention' },
};

const KR_STATUS = {
  not_started: 'Not started',
  on_track: 'On track',
  at_risk: 'At risk',
  done: 'Done',
};

const STATUS_FILTERS = [
  { value: 'all', label: 'All objectives' },
  { value: 'active', label: 'Active' },
  { value: 'at_risk', label: 'At risk' },
  { value: 'pending', label: 'Awaiting approval' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' },
];

const krPercent = (kr) => {
  const target = Number(kr.target_value);
  if (!target) return kr.status === 'done' ? 100 : 0;
  return Math.max(0, Math.min(100, Math.round((Number(kr.current_value) / target) * 100)));
};

const goalProgress = (goal) => {
  if (!goal.key_results.length) return 0;
  return Math.round(goal.key_results.reduce((sum, kr) => sum + krPercent(kr), 0) / goal.key_results.length);
};

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const TONES = {
  accent: { color: T.accent, borderColor: rgba(T.accent, 0.45), backgroundColor: rgba(T.accent, 0.1) },
  attention: { color: T.attention, borderColor: rgba(T.attention, 0.45), backgroundColor: rgba(T.attention, 0.1) },
  muted: { color: T.muted, borderColor: T.line, backgroundColor: 'transparent' },
};

const Chip = ({ tone = 'muted', icon: Ico, children }) => (
  <Badge
    className="inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px] text-[11px] uppercase tracking-[0.12em]"
    style={{ ...TONES[tone], fontFamily: brand.fontBody }}
  >
    {Ico ? <Ico className="h-3 w-3" aria-hidden="true" /> : null}
    {children}
  </Badge>
);

const Rail = ({ value }) => (
  <div
    className="relative h-[3px] w-full overflow-visible rounded-full"
    style={{ backgroundColor: T.lineSoft }}
    role="img"
    aria-label={`Progress ${value} percent`}
  >
    <div className="vlv-bar relative h-[3px] rounded-full" style={{ width: `${value}%`, backgroundColor: T.accent }}>
      {value > 0 && value < 100 ? (
        <span
          className="absolute -top-[2px] right-[-3px] block h-[7px] w-[7px] rotate-45"
          style={{ backgroundColor: T.accent }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  </div>
);

const Lbl = ({ children, className = '' }) => (
  <span className={`block text-[11px] uppercase tracking-[0.16em] ${className}`} style={{ color: T.muted }}>
    {children}
  </span>
);

const GoalCard = ({ goal, ownerName, editable, canReview, expanded, onToggle, onKrValue, onKrStatus, onSubmit, onComplete, onClose, onApprove, onRequestChanges, savedKr }) => {
  const [confirming, setConfirming] = React.useState(false);
  const [reviewing, setReviewing] = React.useState(false);
  const [note, setNote] = React.useState('');
  const [noteError, setNoteError] = React.useState('');
  const progress = goalProgress(goal);
  const st = STATUS_META[goal.status];
  const ap = APPROVAL_META[goal.approval_status];
  const panelId = `kr-panel-${goal.id}`;
  const dimmed = goal.status === 'closed';

  const submitReview = (event) => {
    event.preventDefault();
    if (!note.trim()) {
      setNoteError('Write what should change — the note is what your report sees.');
      return;
    }
    onRequestChanges(goal.id, note.trim());
    setNote('');
    setNoteError('');
    setReviewing(false);
  };

  return (
    <li className="vlv-rise">
      <Card
        className="rounded-[6px] border"
        style={{ backgroundColor: T.panel, borderColor: T.line, opacity: dimmed ? 0.72 : 1 }}
      >
        <CardHeader className="gap-3 px-6 pt-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className="text-[12px] uppercase tracking-[0.18em]"
                style={{ color: T.accent, fontVariantNumeric: 'tabular-nums' }}
              >
                {goal.ref}
              </span>
              <span className="text-[12px]" style={{ color: T.lineSoft }} aria-hidden="true">/</span>
              <span className="text-[12px]" style={{ color: T.muted }}>FY26 · Q4</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone={st.tone} icon={goal.status === 'at_risk' ? Icons.AlertCircle : goal.status === 'completed' ? Icons.CheckCircle : goal.status === 'closed' ? Icons.X : Icons.ChevronRight}>
                {st.label}
              </Chip>
              <Chip tone={ap.tone} icon={goal.approval_status === 'pending' ? Icons.Clock : goal.approval_status === 'approved' ? Icons.Check : goal.approval_status === 'changes' ? Icons.AlertCircle : Icons.Edit}>
                {ap.label}
              </Chip>
            </div>
          </div>
          <CardTitle
            className="text-[21px] leading-snug"
            style={{ fontFamily: brand.fontHeading, color: T.ink, fontWeight: 400 }}
          >
            {goal.title}
          </CardTitle>
          <CardDescription className="max-w-[68ch] text-[14px] leading-relaxed" style={{ color: T.muted }}>
            {goal.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-2">
          <div className="flex items-end gap-6">
            <div className="shrink-0">
              <Lbl>Progress</Lbl>
              <p
                className="mt-1 text-[30px] leading-none"
                style={{ fontFamily: brand.fontHeading, color: T.accent, fontVariantNumeric: 'tabular-nums' }}
              >
                {progress}<span className="text-[18px]">%</span>
              </p>
            </div>
            <div className="flex-1 pb-3">
              <Rail value={progress} />
              <p className="mt-2 text-[12px]" style={{ color: T.muted, fontVariantNumeric: 'tabular-nums' }}>
                {goal.key_results.length} key result{goal.key_results.length === 1 ? '' : 's'} · opened {fmtDate(goal.created_at)}
                {goal.completed_at ? ` · completed ${fmtDate(goal.completed_at)}` : ''}
              </p>
            </div>
          </div>

          {goal.review_note ? (
            <div className="rounded-[6px] border px-4 py-3" style={{ borderColor: rgba(T.attention, 0.35), backgroundColor: rgba(T.attention, 0.07) }}>
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: T.attention }}>
                <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Changes requested by {goal.reviewed_by}, {fmtDate(goal.reviewed_at)}
              </p>
              <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed" style={{ color: T.ink }}>{goal.review_note}</p>
            </div>
          ) : null}

          <div>
            <button
              type="button"
              onClick={() => onToggle(goal.id)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 rounded-[4px] py-1 text-[12px] uppercase tracking-[0.16em] transition-colors"
              style={{ color: expanded ? T.ink : T.muted }}
            >
              {expanded ? <Icons.ChevronDown className="h-4 w-4" aria-hidden="true" /> : <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />}
              {expanded ? 'Hide key results' : `Key results (${goal.key_results.length})`}
            </button>

            {expanded ? (
              <div id={panelId} className="vlv-rise mt-3 overflow-x-auto rounded-[6px] border" style={{ borderColor: T.line, backgroundColor: T.panelUp }}>
                <Table
                  className="w-full text-left text-[14px]"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  aria-label={`Key results for ${goal.ref}`}
                >
                  <THead>
                    <TR style={{ borderBottom: `1px solid ${T.line}` }}>
                      <TH className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-normal" style={{ color: T.muted }}>Key result</TH>
                      <TH className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-normal" style={{ color: T.muted }}>Current</TH>
                      <TH className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-normal" style={{ color: T.muted }}>Target</TH>
                      <TH className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-normal" style={{ color: T.muted }}>Done</TH>
                      <TH className="px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-normal" style={{ color: T.muted }}>Status</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {goal.key_results.map((kr) => (
                      <TR key={kr.id} style={{ borderTop: `1px solid ${T.lineSoft}` }}>
                        <TD className="px-4 py-3 align-middle" style={{ color: T.ink }}>{kr.title}</TD>
                        <TD className="px-4 py-3 align-middle">
                          {editable ? (
                            <span className="flex items-center gap-2">
                              <Label htmlFor={`val-${kr.id}`} className="sr-only">Current value for {kr.title}</Label>
                              <Input
                                id={`val-${kr.id}`}
                                type="number"
                                min="0"
                                inputMode="numeric"
                                value={kr.current_value}
                                onChange={(e) => onKrValue(goal.id, kr.id, e.target.value)}
                                className="h-9 w-[92px] rounded-[4px] border bg-transparent px-2 text-[14px]"
                                style={{ borderColor: T.line, color: T.ink, fontVariantNumeric: 'tabular-nums' }}
                              />
                              {savedKr === kr.id ? (
                                <span className="vlv-rise inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: T.accent }}>
                                  <Icons.Check className="h-3 w-3" aria-hidden="true" /> Saved
                                </span>
                              ) : null}
                            </span>
                          ) : (
                            <span style={{ color: T.ink }}>{kr.current_value}</span>
                          )}
                        </TD>
                        <TD className="px-4 py-3 align-middle" style={{ color: T.muted }}>{kr.target_value}</TD>
                        <TD className="px-4 py-3 align-middle" style={{ color: T.accent }}>{krPercent(kr)}%</TD>
                        <TD className="px-4 py-3 align-middle">
                          {editable ? (
                            <span className="block">
                              <Label htmlFor={`st-${kr.id}`} className="sr-only">Status for {kr.title}</Label>
                              <Select
                                id={`st-${kr.id}`}
                                value={kr.status}
                                onChange={(e) => onKrStatus(goal.id, kr.id, e.target.value)}
                                className="h-9 w-[138px] rounded-[4px] border px-2 text-[13px]"
                                style={{ borderColor: T.line, backgroundColor: T.bg, color: T.ink }}
                              >
                                {Object.keys(KR_STATUS).map((k) => (
                                  <option key={k} value={k} style={{ backgroundColor: T.bg, color: T.ink }}>{KR_STATUS[k]}</option>
                                ))}
                              </Select>
                            </span>
                          ) : (
                            <Chip tone={kr.status === 'at_risk' ? 'attention' : kr.status === 'done' ? 'accent' : 'muted'}>
                              {KR_STATUS[kr.status]}
                            </Chip>
                          )}
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-4 px-6 pb-6 pt-4">
          <p className="text-[12px]" style={{ color: T.muted }}>
            {goal.approval_status === 'approved' && goal.reviewed_by
              ? `Approved by ${goal.reviewed_by} on ${fmtDate(goal.reviewed_at)}`
              : goal.approval_status === 'pending'
              ? `Submitted ${goal.submitted_at ? fmtDate(goal.submitted_at) : 'today'} · waiting on ${editable ? ME.manager : ME.name}`
              : goal.approval_status === 'draft'
              ? 'Draft — visible only to you until you submit it'
              : `Owned by ${ownerName}`}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {editable && (goal.approval_status === 'draft' || goal.approval_status === 'changes') ? (
              <Button
                type="button"
                onClick={() => onSubmit(goal.id)}
                className="h-10 rounded-[5px] px-4 text-[13px] font-medium"
                style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}
              >
                Submit for approval
              </Button>
            ) : null}

            {editable && (goal.status === 'active' || goal.status === 'at_risk') ? (
              <React.Fragment>
                <Button
                  type="button"
                  onClick={() => onComplete(goal.id)}
                  className="h-10 rounded-[5px] border bg-transparent px-4 text-[13px]"
                  style={{ borderColor: T.line, color: T.ink }}
                >
                  Mark complete
                </Button>
                <Button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="h-10 rounded-[5px] border bg-transparent px-4 text-[13px]"
                  style={{ borderColor: 'transparent', color: T.muted }}
                >
                  Close objective
                </Button>
              </React.Fragment>
            ) : null}

            {canReview && goal.approval_status === 'pending' ? (
              <React.Fragment>
                <Button
                  type="button"
                  onClick={() => onApprove(goal.id)}
                  className="h-10 rounded-[5px] px-4 text-[13px] font-medium"
                  style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}
                >
                  Approve objective
                </Button>
                <Button
                  type="button"
                  onClick={() => setReviewing((v) => !v)}
                  aria-expanded={reviewing}
                  className="h-10 rounded-[5px] border bg-transparent px-4 text-[13px]"
                  style={{ borderColor: T.line, color: T.ink }}
                >
                  Request changes
                </Button>
              </React.Fragment>
            ) : null}
          </div>
        </CardFooter>

        {confirming ? (
          <div className="vlv-rise mx-6 mb-6 rounded-[6px] border px-4 py-4" style={{ borderColor: rgba(T.attention, 0.4), backgroundColor: rgba(T.attention, 0.06) }}>
            <p className="text-[14px]" style={{ color: T.ink }}>
              Close {goal.ref}? Progress is kept on the record, but it stops counting toward your active objectives this cycle.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => { onClose(goal.id); setConfirming(false); }}
                className="h-10 rounded-[5px] border bg-transparent px-4 text-[13px]"
                style={{ borderColor: rgba(T.attention, 0.6), color: T.attention }}
              >
                Yes, close it
              </Button>
              <Button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-10 rounded-[5px] border-0 bg-transparent px-4 text-[13px]"
                style={{ color: T.muted }}
              >
                Keep it open
              </Button>
            </div>
          </div>
        ) : null}

        {reviewing ? (
          <form onSubmit={submitReview} className="vlv-rise mx-6 mb-6 rounded-[6px] border px-4 py-4" style={{ borderColor: T.line, backgroundColor: T.panelUp }}>
            <Label htmlFor={`note-${goal.id}`} className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
              What should change
            </Label>
            <Textarea
              id={`note-${goal.id}`}
              rows={3}
              value={note}
              onChange={(e) => { setNote(e.target.value); if (noteError) setNoteError(''); }}
              aria-invalid={noteError ? 'true' : undefined}
              aria-describedby={noteError ? `note-err-${goal.id}` : undefined}
              placeholder={`e.g. Tie the second key result to a number ${ownerName.split(' ')[0]} can measure weekly.`}
              className="mt-2 w-full rounded-[5px] border bg-transparent px-3 py-2 text-[14px]"
              style={{ borderColor: noteError ? rgba(T.attention, 0.7) : T.line, color: T.ink }}
            />
            {noteError ? (
              <p id={`note-err-${goal.id}`} role="alert" className="mt-2 flex items-center gap-2 text-[13px]" style={{ color: T.attention }}>
                <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                {noteError}
              </p>
            ) : null}
            <div className="mt-3 flex gap-2">
              <Button type="submit" className="h-10 rounded-[5px] border bg-transparent px-4 text-[13px]" style={{ borderColor: T.line, color: T.ink }}>
                Send to {ownerName.split(' ')[0]}
              </Button>
              <Button type="button" onClick={() => { setReviewing(false); setNoteError(''); }} className="h-10 rounded-[5px] border-0 bg-transparent px-4 text-[13px]" style={{ color: T.muted }}>
                Cancel
              </Button>
            </div>
          </form>
        ) : null}
      </Card>
    </li>
  );
};

export default function Screen() {
  const navigate = useNavigate();
  const [goals, setGoals] = React.useState(INITIAL_GOALS);
  const [tab, setTab] = React.useState('mine');
  const [reportId, setReportId] = React.useState(REPORTS[0].id);
  const [denied, setDenied] = React.useState(null);
  const [lookup, setLookup] = React.useState(REPORTS[0].id);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [expanded, setExpanded] = React.useState({ 'g-041': true });
  const [savedKr, setSavedKr] = React.useState(null);
  const [banner, setBanner] = React.useState(null);
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [form, setForm] = React.useState({ title: '', description: '', krs: [{ key: 'new-1', title: '', target_value: '' }] });
  const [formErrors, setFormErrors] = React.useState([]);
  const [sync, setSync] = React.useState('stale');
  const syncTimer = React.useRef(null);
  const seq = React.useRef(59);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [tab, reportId]);

  React.useEffect(() => () => clearTimeout(syncTimer.current), []);

  const viewingOwn = tab === 'mine';
  const viewedPerson = viewingOwn ? ME : REPORTS.find((r) => r.id === reportId);
  const viewedGoals = goals[viewingOwn ? ME.id : reportId] || [];

  const myGoals = goals[ME.id] || [];
  const myActive = myGoals.filter((g) => g.status === 'active' || g.status === 'at_risk');
  const avgProgress = myActive.length
    ? Math.round(myActive.reduce((s, g) => s + goalProgress(g), 0) / myActive.length)
    : 0;
  const pendingForMe = REPORTS.reduce(
    (n, r) => n + (goals[r.id] || []).filter((g) => g.approval_status === 'pending').length,
    0
  );

  const filtered = viewedGoals.filter((g) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.ref.toLowerCase().includes(q) ||
      g.key_results.some((kr) => kr.title.toLowerCase().includes(q));
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'pending'
        ? g.approval_status === 'pending'
        : g.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const patchGoal = (ownerId, goalId, patch) =>
    setGoals((prev) => ({
      ...prev,
      [ownerId]: prev[ownerId].map((g) => (g.id === goalId ? { ...g, ...(typeof patch === 'function' ? patch(g) : patch) } : g)),
    }));

  const ownerId = viewingOwn ? ME.id : reportId;

  const handleKrValue = (goalId, krId, raw) => {
    const value = raw === '' ? 0 : Math.max(0, Number(raw));
    patchGoal(ownerId, goalId, (g) => {
      const key_results = g.key_results.map((kr) => (kr.id === krId ? { ...kr, current_value: value } : kr));
      return { key_results, progress: goalProgress({ ...g, key_results }) };
    });
    setSavedKr(krId);
  };

  const handleKrStatus = (goalId, krId, status) => {
    patchGoal(ownerId, goalId, (g) => ({
      key_results: g.key_results.map((kr) => (kr.id === krId ? { ...kr, status } : kr)),
    }));
    setSavedKr(krId);
  };

  const handleSubmitApproval = (goalId) => {
    patchGoal(ME.id, goalId, { approval_status: 'pending', submitted_at: '2026-10-30', review_note: undefined });
    const g = myGoals.find((x) => x.id === goalId);
    setBanner({ tone: 'accent', text: `${g.ref} sent to ${ME.manager} for approval. You will see the outcome here and in your notifications.` });
  };

  const handleComplete = (goalId) => {
    patchGoal(ME.id, goalId, { status: 'completed', completed_at: '2026-10-30' });
    const g = myGoals.find((x) => x.id === goalId);
    setBanner({ tone: 'accent', text: `${g.ref} marked complete. Your dashboard now counts it under completed objectives.`, action: 'dashboard' });
  };

  const handleCloseGoal = (goalId) => {
    patchGoal(ME.id, goalId, { status: 'closed' });
    const g = myGoals.find((x) => x.id === goalId);
    setBanner({ tone: 'muted', text: `${g.ref} closed. It stays on your record but no longer counts toward this cycle.` });
  };

  const handleApprove = (goalId) => {
    patchGoal(reportId, goalId, { approval_status: 'approved', reviewed_by: ME.name, reviewed_at: '2026-10-30', review_note: undefined });
    setBanner({ tone: 'accent', text: `Approved. ${viewedPerson.name.split(' ')[0]} can see the outcome on their dashboard.` });
  };

  const handleRequestChanges = (goalId, note) => {
    patchGoal(reportId, goalId, { approval_status: 'changes', reviewed_by: ME.name, reviewed_at: '2026-10-30', review_note: note });
    setBanner({ tone: 'attention', text: `Changes requested. ${viewedPerson.name.split(' ')[0]} has your note and can resubmit when it is updated.` });
  };

  const addKrRow = () =>
    setForm((f) => ({ ...f, krs: [...f.krs, { key: `new-${f.krs.length + 1}-${Date.now()}`, title: '', target_value: '' }] }));

  const removeKrRow = (key) => setForm((f) => ({ ...f, krs: f.krs.filter((k) => k.key !== key) }));

  const updateKrRow = (key, field, value) =>
    setForm((f) => ({ ...f, krs: f.krs.map((k) => (k.key === key ? { ...k, [field]: value } : k)) }));

  const saveObjective = (event) => {
    event.preventDefault();
    const errs = [];
    if (!form.title.trim()) errs.push('Give the objective a title.');
    const usable = form.krs.filter((k) => k.title.trim() && String(k.target_value).trim() !== '');
    if (!usable.length) errs.push('Add at least one key result with a title and a target value.');
    if (errs.length) {
      setFormErrors(errs);
      return;
    }
    seq.current += 1;
    const n = seq.current;
    const id = `g-0${n}`;
    const newGoal = {
      id,
      ref: `OBJ-26-0${n}`,
      employee_id: ME.id,
      title: form.title.trim(),
      description: form.description.trim() || 'No context added yet.',
      status: 'active',
      approval_status: 'draft',
      created_at: '2026-10-30',
      progress: 0,
      key_results: usable.map((k, i) => ({
        id: `kr-${n}${i + 1}`,
        goal_id: id,
        title: k.title.trim(),
        target_value: Number(k.target_value),
        current_value: 0,
        status: 'not_started',
      })),
    };
    setGoals((prev) => ({ ...prev, [ME.id]: [newGoal, ...prev[ME.id]] }));
    setForm({ title: '', description: '', krs: [{ key: `new-${Date.now()}`, title: '', target_value: '' }] });
    setFormErrors([]);
    setComposerOpen(false);
    setExpanded((e) => ({ ...e, [id]: true }));
    setTab('mine');
    setStatusFilter('all');
    setQuery('');
    setBanner({ tone: 'accent', text: `${newGoal.ref} saved as a draft. Submit it to ${ME.manager} when the key results are settled.` });
  };

  const openLookup = (event) => {
    event.preventDefault();
    const report = REPORTS.find((r) => r.id === lookup);
    if (report) {
      setDenied(null);
      setReportId(report.id);
      return;
    }
    setDenied(ELSEWHERE.find((e) => e.id === lookup));
  };

  const refreshSync = () => {
    setSync('syncing');
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => setSync('synced'), 900);
  };

  const syncCopy =
    sync === 'syncing' ? 'Syncing key results…' : sync === 'synced' ? 'Synced just now' : 'Showing values cached at 09:12';

  return (
    <div data-vlv className="min-h-full px-6 py-8 md:px-10" style={{ backgroundColor: T.bg, color: T.ink, fontFamily: brand.fontBody }}>
      <style>{`
        [data-vlv] :is(button,input,select,textarea,a,[tabindex]):focus-visible{outline:2px solid ${T.accent};outline-offset:2px;border-radius:4px;}
        [data-vlv] input::placeholder,[data-vlv] textarea::placeholder{color:${rgba(brand.neutralColor, 0.6)};}
        @keyframes vlv-rise{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
        [data-vlv] .vlv-rise{animation:vlv-rise .28s ease-out both}
        [data-vlv] .vlv-bar{transition:width .5s cubic-bezier(.2,.8,.2,1)}
        @media (prefers-reduced-motion: reduce){[data-vlv] .vlv-rise{animation:none}[data-vlv] .vlv-bar{transition:none}[data-vlv] .animate-pulse{animation:none}}
      `}</style>

      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Lbl>FY26 · Q4 cycle · closes 31 Dec 2026</Lbl>
            <h1 className="mt-2 text-[38px] leading-tight" style={{ fontFamily: brand.fontHeading, fontWeight: 400 }}>
              Goals
            </h1>
            <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed" style={{ color: T.muted }}>
              Objectives and key results for you and the four people who report to you. Values save as you change them;
              approvals go to {ME.manager}.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={refreshSync}
              className="inline-flex items-center gap-2 rounded-[4px] border px-3 py-1.5 text-[12px] transition-colors"
              style={{ borderColor: T.line, color: sync === 'synced' ? T.accent : T.muted }}
            >
              <Icons.Clock className={`h-3.5 w-3.5 ${sync === 'syncing' ? 'animate-pulse' : ''}`} aria-hidden="true" />
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{syncCopy}</span>
              {sync !== 'synced' ? <span className="underline underline-offset-2">Refresh</span> : null}
            </button>
            <Button
              type="button"
              onClick={() => { setComposerOpen(true); setTab('mine'); setDenied(null); }}
              className="inline-flex h-12 items-center gap-2 rounded-[5px] px-6 text-[14px] font-medium"
              style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}
            >
              <Icons.Plus className="h-4 w-4" aria-hidden="true" />
              New objective
            </Button>
          </div>
        </header>

        {/* Cycle figures */}
        <section aria-labelledby="cycle-figures" className="mt-8">
          <h2 id="cycle-figures" className="sr-only">This cycle at a glance</h2>
          <div className="grid grid-cols-1 rounded-[6px] border sm:grid-cols-3" style={{ borderColor: T.line, backgroundColor: T.panel }}>
            <div className="px-6 py-5">
              <Stat className="tabular-nums" label="Active objectives" value={String(myActive.length)} hint={`${myGoals.length} total on your record`} />
            </div>
            <div className="border-t px-6 py-5 sm:border-l sm:border-t-0" style={{ borderColor: T.line }}>
              <Stat className="tabular-nums" label="Average progress" value={`${avgProgress}%`} hint="Across your active objectives" />
            </div>
            <div className="border-t px-6 py-5 sm:border-l sm:border-t-0" style={{ borderColor: T.line }}>
              <Stat className="tabular-nums" label="Awaiting your review" value={String(pendingForMe)} hint={pendingForMe ? 'Submitted by direct reports' : 'Nothing from your reports'} />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-8 border-b" style={{ borderColor: T.line }}>
          <Tabs
            tabs={[
              { key: 'mine', label: 'My objectives' },
              { key: 'team', label: `Team review${pendingForMe ? ` (${pendingForMe})` : ''}` },
            ]}
            active={tab}
            onChange={(k) => { setTab(k); setDenied(null); }}
          />
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <Label htmlFor="goal-search" className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
              Search objectives
            </Label>
            <div className="relative mt-2">
              <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: T.muted }} aria-hidden="true" />
              <Input
                id="goal-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, reference or key result"
                className="h-11 w-full rounded-[5px] border bg-transparent pl-9 pr-3 text-[14px]"
                style={{ borderColor: T.line, color: T.ink }}
              />
            </div>
          </div>
          <div className="w-[220px]">
            <Label htmlFor="goal-status" className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
              Show
            </Label>
            <Select
              id="goal-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-2 h-11 w-full rounded-[5px] border px-3 text-[14px]"
              style={{ borderColor: T.line, backgroundColor: T.bg, color: T.ink }}
            >
              {STATUS_FILTERS.map((f) => (
                <option key={f.value} value={f.value} style={{ backgroundColor: T.bg, color: T.ink }}>{f.label}</option>
              ))}
            </Select>
          </div>
          <p className="pb-3 text-[12px]" style={{ color: T.muted, fontVariantNumeric: 'tabular-nums' }}>
            {filtered.length} of {viewedGoals.length} shown
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[248px,1fr]">
          {/* Team rail — only in team review */}
          {tab === 'team' ? (
            <aside>
              <h2 className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>Direct reports</h2>
              <ul className="mt-3 border-t" style={{ borderColor: T.line }}>
                {REPORTS.map((r) => {
                  const list = goals[r.id] || [];
                  const pending = list.filter((g) => g.approval_status === 'pending').length;
                  const selected = !denied && r.id === reportId;
                  return (
                    <li key={r.id} className="border-b" style={{ borderColor: T.line }}>
                      <button
                        type="button"
                        onClick={() => { setDenied(null); setReportId(r.id); setLookup(r.id); }}
                        aria-current={selected ? 'true' : undefined}
                        className="flex w-full items-center gap-3 px-2 py-3 text-left transition-colors"
                        style={{ backgroundColor: selected ? rgba(T.accent, 0.08) : 'transparent', borderLeft: `2px solid ${selected ? T.accent : 'transparent'}` }}
                      >
                        <Avatar name={r.name} className="h-9 w-9 shrink-0" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px]" style={{ color: T.ink }}>{r.name}</span>
                          <span className="block truncate text-[12px]" style={{ color: T.muted }}>{r.title}</span>
                        </span>
                        <span className="text-right text-[11px] uppercase tracking-[0.12em]" style={{ color: pending ? T.attention : T.muted, fontVariantNumeric: 'tabular-nums' }}>
                          {pending ? `${pending} to review` : `${list.length} goals`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <form onSubmit={openLookup} className="mt-6">
                <Label htmlFor="emp-lookup" className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
                  Open another employee
                </Label>
                <Select
                  id="emp-lookup"
                  value={lookup}
                  onChange={(e) => setLookup(e.target.value)}
                  className="mt-2 h-11 w-full rounded-[5px] border px-3 text-[14px]"
                  style={{ borderColor: T.line, backgroundColor: T.bg, color: T.ink }}
                >
                  {[...REPORTS, ...ELSEWHERE].map((p) => (
                    <option key={p.id} value={p.id} style={{ backgroundColor: T.bg, color: T.ink }}>
                      {p.name} — {p.title}
                    </option>
                  ))}
                </Select>
                <Button type="submit" className="mt-3 h-11 w-full rounded-[5px] border bg-transparent text-[13px]" style={{ borderColor: T.line, color: T.ink }}>
                  Open goals
                </Button>
                <p className="mt-2 text-[12px] leading-relaxed" style={{ color: T.muted }}>
                  As a Manager you can open goals for yourself and your direct reports only.
                </p>
              </form>
            </aside>
          ) : null}

          {/* Main column */}
          <section aria-label={viewingOwn ? 'My objectives' : `Objectives for ${viewedPerson ? viewedPerson.name : 'selected employee'}`} className={tab === 'team' ? '' : 'lg:col-span-2'}>
            {banner ? (
              <div
                role="status"
                className="vlv-rise mb-6 flex items-start gap-3 rounded-[6px] border px-4 py-3"
                style={{
                  borderColor: banner.tone === 'attention' ? rgba(T.attention, 0.4) : rgba(T.accent, 0.4),
                  backgroundColor: banner.tone === 'attention' ? rgba(T.attention, 0.08) : rgba(T.accent, 0.08),
                }}
              >
                <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: banner.tone === 'attention' ? T.attention : T.accent }} aria-hidden="true" />
                <p className="flex-1 text-[14px] leading-relaxed" style={{ color: T.ink }}>{banner.text}</p>
                {banner.action === 'dashboard' ? (
                  <Button type="button" onClick={() => navigate('dashboard')} className="h-8 rounded-[4px] border-0 bg-transparent px-2 text-[13px] underline underline-offset-2" style={{ color: T.accent }}>
                    View dashboard
                  </Button>
                ) : null}
                <button type="button" onClick={() => setBanner(null)} aria-label="Dismiss message" title="Dismiss message" className="rounded-[4px] p-1">
                  <Icons.X className="h-4 w-4" style={{ color: T.muted }} aria-hidden="true" />
                </button>
              </div>
            ) : null}

            {/* Composer */}
            {composerOpen && viewingOwn ? (
              <Card className="vlv-rise mb-6 rounded-[6px] border" style={{ backgroundColor: T.panelUp, borderColor: rgba(T.accent, 0.3) }}>
                <form onSubmit={saveObjective}>
                  <CardHeader className="px-6 pt-6">
                    <Lbl>New objective · FY26 Q4</Lbl>
                    <CardTitle className="mt-2 text-[22px]" style={{ fontFamily: brand.fontHeading, color: T.ink, fontWeight: 400 }}>
                      Write an objective with measurable key results
                    </CardTitle>
                    <CardDescription className="text-[14px]" style={{ color: T.muted }}>
                      It saves as a draft first. Nobody else sees it until you submit it to {ME.manager}.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-5 px-6">
                    {formErrors.length ? (
                      <div role="alert" className="rounded-[6px] border px-4 py-3" style={{ borderColor: rgba(T.attention, 0.45), backgroundColor: rgba(T.attention, 0.08) }}>
                        <p className="flex items-center gap-2 text-[13px] font-medium" style={{ color: T.attention }}>
                          <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                          This objective is not ready to save
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-6 text-[13px]" style={{ color: T.ink }}>
                          {formErrors.map((e) => <li key={e}>{e}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    <div>
                      <Label htmlFor="obj-title" className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
                        Objective title (required)
                      </Label>
                      <Input
                        id="obj-title"
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        aria-invalid={formErrors.some((e) => e.includes('title')) ? 'true' : undefined}
                        placeholder="e.g. Bring merchant onboarding under three days"
                        className="mt-2 h-11 w-full rounded-[5px] border bg-transparent px-3 text-[15px]"
                        style={{ borderColor: formErrors.some((e) => e.includes('title')) ? rgba(T.attention, 0.7) : T.line, color: T.ink }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="obj-desc" className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
                        Why this matters
                      </Label>
                      <Textarea
                        id="obj-desc"
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="One or two sentences your manager can read without context."
                        className="mt-2 w-full rounded-[5px] border bg-transparent px-3 py-2 text-[14px]"
                        style={{ borderColor: T.line, color: T.ink }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Lbl>Key results (at least one)</Lbl>
                        <Button type="button" onClick={addKrRow} className="inline-flex h-9 items-center gap-2 rounded-[4px] border bg-transparent px-3 text-[13px]" style={{ borderColor: T.line, color: T.ink }}>
                          <Icons.Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          Add key result
                        </Button>
                      </div>
                      <ul className="mt-3 space-y-3">
                        {form.krs.map((kr, i) => (
                          <li key={kr.key} className="flex flex-wrap items-end gap-3 rounded-[6px] border px-3 py-3" style={{ borderColor: T.lineSoft }}>
                            <div className="min-w-[220px] flex-1">
                              <Label htmlFor={`new-kr-${kr.key}`} className="text-[11px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>
                                Key result {i + 1}
                              </Label>
                              <Input
                                id={`new-kr-${kr.key}`}
                                value={kr.title}
                                onChange={(e) => updateKrRow(kr.key, 'title', e.target.value)}
                                placeholder="e.g. Merchants onboarded without a manual review"
                                className="mt-2 h-11 w-full rounded-[5px] border bg-transparent px-3 text-[14px]"
                                style={{ borderColor: T.line, color: T.ink }}
                              />
                            </div>
                            <div className="w-[130px]">
                              <Label htmlFor={`new-target-${kr.key}`} className="text-[11px] uppercase tracking-[0.14em]" style={{ color: T.muted }}>
                                Target
                              </Label>
                              <Input
                                id={`new-target-${kr.key}`}
                                type="number"
                                min="0"
                                inputMode="numeric"
                                value={kr.target_value}
                                onChange={(e) => updateKrRow(kr.key, 'target_value', e.target.value)}
                                placeholder="0"
                                className="mt-2 h-11 w-full rounded-[5px] border bg-transparent px-3 text-[14px]"
                                style={{ borderColor: T.line, color: T.ink, fontVariantNumeric: 'tabular-nums' }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeKrRow(kr.key)}
                              disabled={form.krs.length === 1}
                              aria-label={`Remove key result ${i + 1}`}
                              title={`Remove key result ${i + 1}`}
                              className="mb-1 rounded-[4px] border p-2 disabled:opacity-35"
                              style={{ borderColor: T.line, color: T.muted }}
                            >
                              <Icons.Trash className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-3 px-6 pb-6 pt-4">
                    <Button type="submit" className="h-12 rounded-[5px] px-6 text-[14px] font-medium" style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}>
                      Save objective
                    </Button>
                    <Button
                      type="button"
                      onClick={() => { setComposerOpen(false); setFormErrors([]); }}
                      className="h-12 rounded-[5px] border bg-transparent px-5 text-[14px]"
                      style={{ borderColor: T.line, color: T.muted }}
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : null}

            {/* Context line */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[16px]" style={{ fontFamily: brand.fontHeading, color: T.ink, fontWeight: 400 }}>
                {denied ? 'Access check' : viewingOwn ? `${ME.name} · your objectives` : `${viewedPerson.name} · ${viewedPerson.title}`}
              </h2>
              {!denied && !viewingOwn ? (
                <p className="text-[12px]" style={{ color: T.muted }}>Read-only — only {viewedPerson.name.split(' ')[0]} can edit their key results.</p>
              ) : null}
            </div>

            {/* States */}
            {denied ? (
              <Card className="rounded-[6px] border" style={{ backgroundColor: T.panel, borderColor: rgba(T.attention, 0.35) }}>
                <CardContent className="px-6 py-8">
                  <Icons.AlertCircle className="h-6 w-6" style={{ color: T.attention }} aria-hidden="true" />
                  <h3 className="mt-4 text-[22px]" style={{ fontFamily: brand.fontHeading, fontWeight: 400, color: T.ink }}>
                    {denied.name}&rsquo;s goals are closed to you
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed" style={{ color: T.muted }}>
                    You can open goals for yourself and the four people who report to you. {denied.name.split(' ')[0]} is in {denied.dept} and
                    reports to {denied.manager} — their objectives stay between them, their manager and HR Admin.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => { setDenied(null); setLookup(reportId); }}
                      className="h-11 rounded-[5px] px-5 text-[13px] font-medium"
                      style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}
                    >
                      Back to my team
                    </Button>
                    <Button
                      type="button"
                      onClick={() => navigate('employees')}
                      className="h-11 rounded-[5px] border bg-transparent px-5 text-[13px]"
                      style={{ borderColor: T.line, color: T.ink }}
                    >
                      Ask HR to check the reporting line
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : loading ? (
              <div aria-live="polite" className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: T.muted }}>
                  Loading {viewingOwn ? 'your' : `${viewedPerson.name.split(' ')[0]}’s`} objectives…
                </p>
                {[0, 1].map((i) => (
                  <div key={i} className="rounded-[6px] border px-6 py-6" style={{ borderColor: T.line, backgroundColor: T.panel }}>
                    <div className="h-3 w-28 animate-pulse rounded" style={{ backgroundColor: T.lineSoft }} />
                    <div className="mt-4 h-5 w-2/3 animate-pulse rounded" style={{ backgroundColor: T.lineSoft }} />
                    <div className="mt-4 h-[3px] w-full animate-pulse rounded" style={{ backgroundColor: T.lineSoft }} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 && viewedGoals.length === 0 ? (
              <Empty
                className="rounded-[6px] border px-6 py-12"
                title={viewingOwn ? 'No objectives in this cycle yet' : `${viewedPerson.name.split(' ')[0]} has not set objectives for Q4`}
                description={
                  viewingOwn
                    ? 'Start with one objective and two or three key results you can put a number against. You can keep it as a draft until it reads right.'
                    : `Nothing has been submitted for FY26 Q4. Raise it in your next one-to-one with ${viewedPerson.name.split(' ')[0]}, or leave feedback on what you would like to see.`
                }
                action={
                  viewingOwn ? (
                    <Button type="button" onClick={() => setComposerOpen(true)} className="h-11 rounded-[5px] px-5 text-[13px] font-medium" style={{ backgroundColor: T.accent, color: T.bg, border: 'none' }}>
                      Create your first objective
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => navigate('feedback')} className="h-11 rounded-[5px] border bg-transparent px-5 text-[13px]" style={{ borderColor: T.line, color: T.ink }}>
                      Write feedback instead
                    </Button>
                  )
                }
              />
            ) : filtered.length === 0 ? (
              <Empty
                className="rounded-[6px] border px-6 py-12"
                title="Nothing matches those filters"
                description={`No objective here matches “${query || STATUS_FILTERS.find((f) => f.value === statusFilter).label}”. Try a different reference, or widen the status filter.`}
                action={
                  <Button type="button" onClick={() => { setQuery(''); setStatusFilter('all'); }} className="h-11 rounded-[5px] border bg-transparent px-5 text-[13px]" style={{ borderColor: T.line, color: T.ink }}>
                    Clear search and filters
                  </Button>
                }
              />
            ) : (
              <ul className="space-y-4">
                {filtered.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    ownerName={viewingOwn ? ME.name : viewedPerson.name}
                    editable={viewingOwn}
                    canReview={!viewingOwn}
                    expanded={!!expanded[goal.id]}
                    onToggle={(id) => setExpanded((e) => ({ ...e, [id]: !e[id] }))}
                    onKrValue={handleKrValue}
                    onKrStatus={handleKrStatus}
                    onSubmit={handleSubmitApproval}
                    onComplete={handleComplete}
                    onClose={handleCloseGoal}
                    onApprove={handleApprove}
                    onRequestChanges={handleRequestChanges}
                    savedKr={savedKr}
                  />
                ))}
              </ul>
            )}

            <div className="mt-10" style={{ borderTop: `1px solid ${T.line}` }}>
              <p className="pt-4 text-[12px]" style={{ color: T.muted }}>
                Signed in as {ME.name} · {ME.role} · {ME.title}.{' '}
                <button type="button" onClick={() => navigate('my-profile')} className="underline underline-offset-2" style={{ color: T.accent }}>
                  View your profile
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
