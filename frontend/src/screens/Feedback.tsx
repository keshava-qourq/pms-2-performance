// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Label,
  Select,
  Switch,
  Badge,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Avatar,
  Separator,
  Tabs,
  Empty,
} = UI;

const { Search } = Icons;

const ME = { id: "emp-104", name: "Marcus Elleby", title: "Senior Product Engineer" };

const COLLEAGUES = [
  {
    id: "emp-101",
    name: "Ines Marchetti",
    title: "Engineering Manager · your manager",
    status: "active",
  },
  { id: "emp-112", name: "Amara Okafor", title: "Product Manager", status: "active" },
  { id: "emp-118", name: "Daniel Weiss", title: "Backend Engineer", status: "active" },
  { id: "emp-121", name: "Tobias Lindqvist", title: "Design Lead", status: "active" },
  { id: "emp-126", name: "Ruth Castellanos", title: "Customer Success Lead", status: "active" },
  { id: "emp-133", name: "Kenji Watanabe", title: "Frontend Engineer", status: "active" },
  { id: "emp-139", name: "Jonas Brandt", title: "QA Engineer", status: "active" },
  { id: "emp-140", name: "Hélène Dupont", title: "People Partner", status: "active" },
  {
    id: "emp-147",
    name: "Priya Raghunathan",
    title: "Data Analyst · record closed",
    status: "closed",
  },
];

const INITIAL_RECEIVED = [
  {
    id: "fb-2291",
    personId: "emp-101",
    person: "Ines Marchetti",
    role: "Engineering Manager",
    date: "28 Oct 2026",
    ts: 20261028,
    requestId: "fr-318",
    tag: "Answer to your request",
    content:
      "You asked where you stand on the pricing migration. Short answer: it landed because you wrote the handover before anyone asked for it — Kenji picked up the last three endpoints in a day and nothing came back to you. What I want next quarter is that same clarity two weeks earlier; the opening fortnight was quieter than it needed to be.",
  },
  {
    id: "fb-2274",
    personId: "emp-112",
    person: "Amara Okafor",
    role: "Product Manager",
    date: "24 Oct 2026",
    ts: 20261024,
    requestId: null,
    tag: null,
    content:
      "Thank you for pushing back on the 4.2 scope in Tuesday's planning. Cutting the bulk editor was the right call and you argued it with numbers rather than opinion, which is why it took ten minutes instead of a week.",
  },
  {
    id: "fb-2250",
    personId: "emp-140",
    person: "Hélène Dupont",
    role: "People Partner",
    date: "19 Oct 2026",
    ts: 20261019,
    requestId: null,
    tag: null,
    content:
      "Running the Kraków onboarding workshop at two days' notice was generous, and the joiners' survey came back at 4.7 out of 5. Worth putting in front of Ines at your next check-in.",
  },
  {
    id: "fb-2218",
    personId: "emp-133",
    person: "Kenji Watanabe",
    role: "Frontend Engineer",
    date: "14 Oct 2026",
    ts: 20261014,
    requestId: null,
    tag: "Constructive",
    content:
      "Honest note: your review on the billing table PR was thorough, but it arrived four days after I opened it and by then I'd built on the old approach. If something needs a rethink, two lines on day one saves me the rework.",
  },
  {
    id: "fb-2190",
    personId: "emp-126",
    person: "Ruth Castellanos",
    role: "Customer Success Lead",
    date: "7 Oct 2026",
    ts: 20261007,
    requestId: null,
    tag: null,
    content:
      "Vestbank were an hour from escalating to their CTO and you joined the call at no notice, explained the retry logic in plain language and stayed until they were satisfied. They renewed on Friday.",
  },
  {
    id: "fb-2161",
    personId: "emp-121",
    person: "Tobias Lindqvist",
    role: "Design Lead",
    date: "1 Oct 2026",
    ts: 20261001,
    requestId: null,
    tag: "Constructive",
    content:
      "Critique ran long again. Your option was the strongest in the room, but you spent fifteen minutes defending it instead of letting the group test it. Hand over the floor earlier — people agree with you faster when you do.",
  },
];

const INITIAL_GIVEN = [
  {
    id: "fb-2286",
    personId: "emp-118",
    person: "Daniel Weiss",
    role: "Backend Engineer",
    date: "27 Oct 2026",
    ts: 20261027,
    requestId: "fr-304",
    tag: "Answer to their request",
    content:
      "You asked about the migration rehearsal. The rollback script you wrote is the only reason we could run it against production data — three of us leaned on it without saying so. Next time say so in the channel; that work was invisible and shouldn't have been.",
  },
  {
    id: "fb-2241",
    personId: "emp-139",
    person: "Jonas Brandt",
    role: "QA Engineer",
    date: "21 Oct 2026",
    ts: 20261021,
    requestId: null,
    tag: null,
    content:
      "Your regression pass caught the duplicate invoice bug the evening before release. I know what that cost you in hours. If we can split the pass between two people next cycle, I'll back the request with Ines.",
  },
  {
    id: "fb-2225",
    personId: "emp-133",
    person: "Kenji Watanabe",
    role: "Frontend Engineer",
    date: "15 Oct 2026",
    ts: 20261015,
    requestId: null,
    tag: null,
    content:
      "Fair point about the late review — I've moved my PR block to the morning so you're not waiting on me. Separately: the empty states on the billing table are the cleanest thing we shipped in 4.1.",
  },
  {
    id: "fb-2185",
    personId: "emp-126",
    person: "Ruth Castellanos",
    role: "Customer Success Lead",
    date: "6 Oct 2026",
    ts: 20261006,
    requestId: null,
    tag: null,
    content:
      "The Vestbank brief you sent before the call was four bullet points and exactly what I needed. Keep doing that for engineers who join customer calls cold.",
  },
];

const INITIAL_SENT = [
  {
    id: "fr-331",
    personId: "emp-121",
    person: "Tobias Lindqvist",
    role: "Design Lead",
    sent: "26 Oct 2026",
    status: "pending",
  },
  {
    id: "fr-318",
    personId: "emp-101",
    person: "Ines Marchetti",
    role: "Engineering Manager",
    sent: "21 Oct 2026",
    status: "answered",
    restricted: false,
    reply:
      "You asked where you stand on the pricing migration. Short answer: it landed because you wrote the handover before anyone asked for it — Kenji picked up the last three endpoints in a day and nothing came back to you.",
    replyDate: "28 Oct 2026",
  },
  {
    id: "fr-297",
    personId: "emp-118",
    person: "Daniel Weiss",
    role: "Backend Engineer",
    sent: "12 Oct 2026",
    status: "answered",
    restricted: true,
  },
  {
    id: "fr-271",
    personId: "emp-139",
    person: "Jonas Brandt",
    role: "QA Engineer",
    sent: "2 Oct 2026",
    status: "declined",
    note: "Jonas passed — he hasn't worked with you since the 4.0 cycle.",
  },
];

const INITIAL_INCOMING = [
  {
    id: "fr-329",
    personId: "emp-112",
    person: "Amara Okafor",
    role: "Product Manager",
    asked: "22 Oct 2026",
    state: "pending",
  },
  {
    id: "fr-336",
    personId: "emp-140",
    person: "Hélène Dupont",
    role: "People Partner",
    asked: "29 Oct 2026",
    state: "pending",
  },
];

const SORTS = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
];

export default function Screen() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("give");
  const [recipient, setRecipient] = React.useState("");
  const [content, setContent] = React.useState("");
  const [linkedRequest, setLinkedRequest] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [banner, setBanner] = React.useState(null);

  const [tab, setTab] = React.useState("received");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("new");

  const [received] = React.useState(INITIAL_RECEIVED);
  const [given, setGiven] = React.useState(INITIAL_GIVEN);
  const [sent, setSent] = React.useState(INITIAL_SENT);
  const [incoming, setIncoming] = React.useState(INITIAL_INCOMING);

  const [openReq, setOpenReq] = React.useState(null);
  const [confirmDecline, setConfirmDecline] = React.useState(null);
  const [synced, setSynced] = React.useState("11:42 today");

  const timers = React.useRef([]);
  const bodyRef = React.useRef(null);
  const recipientRef = React.useRef(null);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const ink = brand.primaryColor;
  const muted = brand.neutralColor;
  const accent = brand.accentColor;

  const css = `
.vel-root{
  --accent:${accent};
  --ink:${ink};
  --muted:${muted};
  --bg:${brand.backgroundColor};
  --hairline:rgba(255,255,255,0.11);
  --panel:rgba(255,255,255,0.035);
  --panel-2:rgba(255,255,255,0.065);
  --danger:hsl(8 46% 68%);
  --warn:hsl(38 42% 68%);
  --r:${brand.radius};
  --serif:${brand.fontHeading};
}
.vel-root :focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
.vel-row{transition:background-color 170ms ease}
.vel-row:hover{background-color:var(--panel-2)}
.vel-btn{transition:background-color 170ms ease,border-color 170ms ease,color 170ms ease}
.vel-btn:hover:not(:disabled){background-color:var(--panel-2)}
.vel-primary{transition:filter 170ms ease}
.vel-primary:hover:not(:disabled){filter:brightness(1.08)}
.vel-primary:active:not(:disabled){filter:brightness(.94)}
.vel-primary:disabled{opacity:.55;cursor:not-allowed}
.vel-field{transition:border-color 170ms ease}
.vel-field:hover{border-color:rgba(255,255,255,0.2)}
@keyframes velIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
@keyframes velFade{from{opacity:0}to{opacity:1}}
@keyframes velDot{0%,100%{opacity:.22}50%{opacity:1}}
.vel-enter{animation:velIn 360ms cubic-bezier(.2,.7,.3,1) both}
.vel-fade{animation:velFade 240ms ease both}
.vel-dot{animation:velDot 1s ease-in-out infinite}
.vel-dot:nth-child(2){animation-delay:.16s}
.vel-dot:nth-child(3){animation-delay:.32s}
.vel-tabs{color:var(--muted)}
.vel-tabs button{color:var(--muted);background:transparent;border-radius:var(--r)}
.vel-tabs button:hover{color:var(--ink)}
.vel-tabs button[aria-selected="true"],.vel-tabs button[data-state="active"]{color:var(--ink);background:var(--panel-2);box-shadow:inset 0 -2px 0 0 var(--accent)}
.vel-empty{border:1px solid var(--hairline);border-radius:var(--r);background:var(--panel);padding:40px 24px}
.vel-empty,.vel-empty p,.vel-empty span,.vel-empty div{color:var(--muted)}
.vel-empty h1,.vel-empty h2,.vel-empty h3,.vel-empty h4,.vel-empty strong{color:var(--ink);font-family:var(--serif);font-size:19px}
.vel-empty button{background:transparent;border:1px solid var(--hairline);color:var(--ink);border-radius:var(--r)}
.vel-av{border:1px solid var(--hairline);border-radius:999px;overflow:hidden}
.vel-av,.vel-av>*{background-color:rgba(255,255,255,0.07);color:var(--ink)}
@media (prefers-reduced-motion:reduce){
  .vel-enter,.vel-fade,.vel-dot{animation:none!important}
  .vel-root *{transition:none!important}
}
`;

  const panel = {
    backgroundColor: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.11)",
    borderRadius: brand.radius,
  };
  const fieldStyle = {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: brand.radius,
    color: ink,
    width: "100%",
    padding: "10px 12px",
    fontFamily: brand.fontBody,
    fontSize: "15px",
  };
  const ghostBtn = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: brand.radius,
    color: ink,
    padding: "9px 14px",
    fontSize: "13px",
    minHeight: "40px",
  };
  const primaryBtn = {
    backgroundColor: accent,
    color: brand.backgroundColor,
    border: "1px solid " + accent,
    borderRadius: brand.radius,
    padding: "11px 20px",
    fontWeight: 600,
    fontSize: "14px",
    minHeight: "44px",
  };
  const label = {
    color: muted,
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  };

  const waiting = incoming.filter((r) => r.state === "pending");

  function resetValidation() {
    setErrors({});
    setFormError(null);
  }

  function startReply(req) {
    setMode("give");
    setRecipient(req.personId);
    setLinkedRequest({ id: req.id, person: req.person, asked: req.asked });
    resetValidation();
    setBanner(null);
    const t = setTimeout(() => bodyRef.current && bodyRef.current.focus(), 60);
    timers.current.push(t);
  }

  function writeBack(personId) {
    setMode("give");
    setRecipient(personId);
    setLinkedRequest(null);
    resetValidation();
    setBanner(null);
    const t = setTimeout(() => bodyRef.current && bodyRef.current.focus(), 60);
    timers.current.push(t);
  }

  function declineRequest(id) {
    setIncoming((prev) => prev.map((r) => (r.id === id ? { ...r, state: "declined" } : r)));
    setConfirmDecline(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!recipient)
      next.recipient =
        mode === "give" ? "Choose who this feedback is for." : "Choose who you're asking.";
    if (mode === "give" && !content.trim())
      next.content = "Write a few lines first — an empty note can't be sent.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) {
      if (next.recipient && recipientRef.current) recipientRef.current.focus();
      else if (bodyRef.current) bodyRef.current.focus();
      return;
    }

    setSending(true);
    const t = setTimeout(() => {
      setSending(false);
      const person = COLLEAGUES.find((c) => c.id === recipient);
      if (person.status === "closed") {
        setFormError(
          person.name +
            "'s employee record was closed on 12 October, so nothing can be filed against it. Your draft is kept — pick another colleague, or ask People Ops to reopen the record.",
        );
        return;
      }

      if (mode === "give") {
        const item = {
          id: "fb-" + Math.floor(Math.random() * 9000 + 2300),
          personId: person.id,
          person: person.name,
          role: person.title.split(" · ")[0],
          date: "Just now",
          ts: 20261030,
          requestId: linkedRequest ? linkedRequest.id : null,
          tag: linkedRequest ? "Answer to their request" : null,
          content: content.trim(),
          isNew: true,
        };
        setGiven((prev) => [item, ...prev]);
        if (linkedRequest) {
          setIncoming((prev) =>
            prev.map((r) => (r.id === linkedRequest.id ? { ...r, state: "answered" } : r)),
          );
        }
        setBanner({
          kind: "sent",
          text:
            "Feedback sent to " +
            person.name +
            ". Only the two of you and your managers can read it.",
        });
        setTab("given");
      } else {
        const req = {
          id: "fr-" + Math.floor(Math.random() * 400 + 340),
          personId: person.id,
          person: person.name,
          role: person.title.split(" · ")[0],
          sent: "30 Oct 2026",
          status: "pending",
          isNew: true,
        };
        setSent((prev) => [req, ...prev]);
        setBanner({
          kind: "sent",
          text:
            "Request sent to " +
            person.name +
            ". It's in their inbox now; you'll be notified when they answer.",
        });
        setTab("requests");
      }
      setContent("");
      setRecipient("");
      setLinkedRequest(null);
      setSynced("just now");
      setQuery("");
    }, 760);
    timers.current.push(t);
  }

  function matches(item) {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.person.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q)
    );
  }

  function ordered(list) {
    const copy = list.filter(matches).slice();
    copy.sort((a, b) => (sort === "new" ? b.ts - a.ts : a.ts - b.ts));
    return copy;
  }

  const visibleReceived = ordered(received);
  const visibleGiven = ordered(given);
  const visibleSent = sent.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return r.person.toLowerCase().includes(q) || r.status.includes(q);
  });

  const tabs = [
    { key: "received", label: "Received · " + received.length },
    { key: "given", label: "Given · " + given.length },
    { key: "requests", label: "Requests you sent · " + sent.length },
  ];

  const statusChip = (status) => {
    if (status === "answered") return { text: "Answered", color: accent, Icon: Icons.CheckCircle };
    if (status === "pending")
      return { text: "Awaiting reply", color: "var(--warn)", Icon: Icons.Clock };
    return { text: "Declined", color: muted, Icon: Icons.X };
  };

  const metric = (value, labelText, hint, strong) => (
    <div
      className="px-5 py-3"
      style={{ borderLeft: "1px solid rgba(255,255,255,0.11)", fontVariantNumeric: "tabular-nums" }}
    >
      <div
        style={{
          fontFamily: brand.fontHeading,
          fontSize: "28px",
          lineHeight: 1.1,
          color: strong ? accent : ink,
        }}
      >
        {value}
      </div>
      <div className="mt-1" style={label}>
        {labelText}
      </div>
      <div className="mt-0.5 text-xs" style={{ color: muted }}>
        {hint}
      </div>
    </div>
  );

  const feedbackList = (items, kind) => (
    <ul className="list-none m-0 p-0">
      {items.map((item) => (
        <li
          key={item.id}
          className={"vel-row " + (item.isNew ? "vel-enter" : "")}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.11)" }}
        >
          <article className="px-6 py-6 sm:px-8">
            <div className="flex items-start gap-4">
              <Avatar name={item.person} className="vel-av shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[15px] font-semibold m-0" style={{ color: ink }}>
                    {kind === "given" ? "To " + item.person : item.person}
                  </h3>
                  <span style={{ ...label, letterSpacing: "0.1em" }}>{item.role}</span>
                  <span
                    className="ml-auto text-xs"
                    style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                  >
                    {item.date}
                  </span>
                </div>
                {item.tag ? (
                  <div className="mt-2">
                    <Badge
                      style={{
                        backgroundColor: "transparent",
                        border:
                          "1px solid " +
                          (item.tag === "Constructive" ? "rgba(255,255,255,0.18)" : accent),
                        color: item.tag === "Constructive" ? muted : accent,
                        borderRadius: brand.radius,
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                      }}
                    >
                      {item.tag}
                    </Badge>
                  </div>
                ) : null}
                <p
                  className="mt-3 mb-0 text-[15px] leading-[1.65] max-w-[68ch]"
                  style={{ color: ink, opacity: 0.92 }}
                >
                  {item.content}
                </p>
                {kind === "received" ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="vel-btn"
                      style={ghostBtn}
                      onClick={() => writeBack(item.personId)}
                    >
                      Write back to {item.person.split(" ")[0]}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="vel-root"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0">
            <p className="m-0" style={{ ...label, color: accent }}>
              Continuous feedback
            </p>
            <h1
              className="mt-3 mb-0"
              style={{
                fontFamily: brand.fontHeading,
                fontSize: "38px",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: ink,
              }}
            >
              Feedback
            </h1>
            <p
              className="mt-3 mb-0 text-[15px] leading-relaxed max-w-[62ch]"
              style={{ color: muted }}
            >
              Notes you've written, notes written about you, and the requests waiting on a reply.
              None of this is tied to a review cycle.
            </p>
            <p className="mt-3 mb-0 flex items-center gap-2 text-xs" style={{ color: muted }}>
              <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>Inbox synced {synced}</span>
            </p>
          </div>
          <div className="flex flex-wrap">
            {metric(received.length, "Received", "This quarter", false)}
            {metric(given.length, "Given", "This quarter", false)}
            {metric(
              waiting.length,
              "Waiting on you",
              waiting.length === 0 ? "All answered" : "Needs a reply",
              waiting.length > 0,
            )}
          </div>
        </header>

        <div className="mt-8" style={{ height: "1px", backgroundColor: accent, opacity: 0.5 }} />

        {/* Composer + waiting rail */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <Card style={panel}>
            <CardHeader className="px-6 pt-6 pb-0 sm:px-8 sm:pt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2
                    className="m-0"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "25px",
                      lineHeight: 1.2,
                      color: ink,
                    }}
                  >
                    {mode === "give" ? "Give feedback" : "Ask for feedback"}
                  </h2>
                  <CardDescription className="mt-2 text-[14px]" style={{ color: muted }}>
                    {mode === "give"
                      ? "Specific, recent, and something they can act on this week."
                      : "They'll see your request in their inbox and can answer or pass."}
                  </CardDescription>
                </div>
                <div
                  role="group"
                  aria-label="What would you like to do"
                  className="flex gap-1 p-1"
                  style={{ border: "1px solid rgba(255,255,255,0.11)", borderRadius: brand.radius }}
                >
                  {[
                    { key: "give", text: "Write" },
                    { key: "request", text: "Request" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      className="vel-btn px-4 text-[13px]"
                      aria-pressed={mode === m.key}
                      onClick={() => {
                        setMode(m.key);
                        resetValidation();
                      }}
                      style={{
                        minHeight: "36px",
                        borderRadius: "4px",
                        border: "1px solid transparent",
                        backgroundColor: mode === m.key ? "rgba(255,255,255,0.08)" : "transparent",
                        color: mode === m.key ? ink : muted,
                        fontWeight: mode === m.key ? 600 : 400,
                      }}
                    >
                      {m.text}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit} noValidate>
              <CardContent className="px-6 pt-6 sm:px-8">
                {linkedRequest ? (
                  <div
                    className="vel-fade mb-5 flex items-start gap-3 px-4 py-3"
                    style={{
                      border: "1px solid " + accent,
                      borderRadius: brand.radius,
                      backgroundColor: "rgba(255,255,255,0.035)",
                    }}
                  >
                    <Icons.ArrowLeft
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                      style={{ color: accent }}
                    />
                    <p className="m-0 flex-1 text-[13px] leading-relaxed" style={{ color: ink }}>
                      Replying to <strong>{linkedRequest.person}</strong>'s request from{" "}
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>
                        {linkedRequest.asked}
                      </span>{" "}
                      · <span style={{ color: muted }}>{linkedRequest.id}</span>
                    </p>
                    <button
                      type="button"
                      aria-label="Unlink this feedback request"
                      className="vel-btn"
                      style={{ ...ghostBtn, padding: "4px", minHeight: "32px", width: "32px" }}
                      onClick={() => setLinkedRequest(null)}
                    >
                      <Icons.X className="h-4 w-4 mx-auto" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}

                <div className="grid gap-5">
                  <div>
                    <Label htmlFor="colleague" style={label}>
                      {mode === "give" ? "Who is it for" : "Who are you asking"}
                    </Label>
                    <Select
                      id="colleague"
                      ref={recipientRef}
                      className="vel-field mt-2"
                      value={recipient}
                      onChange={(e) => {
                        setRecipient(e.target.value);
                        setErrors((p) => ({ ...p, recipient: null }));
                        setFormError(null);
                      }}
                      aria-invalid={errors.recipient ? "true" : "false"}
                      aria-describedby={errors.recipient ? "colleague-error" : undefined}
                      style={{
                        ...fieldStyle,
                        borderColor: errors.recipient ? "var(--danger)" : "rgba(255,255,255,0.14)",
                        minHeight: "44px",
                      }}
                    >
                      <option value="">Choose a colleague…</option>
                      {COLLEAGUES.map((c) => (
                        <option key={c.id} value={c.id} style={{ color: "#111" }}>
                          {c.name} — {c.title}
                        </option>
                      ))}
                    </Select>
                    {errors.recipient ? (
                      <p
                        id="colleague-error"
                        className="vel-fade mt-2 mb-0 flex items-center gap-2 text-[13px]"
                        style={{ color: "var(--danger)" }}
                      >
                        <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {errors.recipient}
                      </p>
                    ) : null}
                  </div>

                  {mode === "give" ? (
                    <div>
                      <Label htmlFor="content" style={label}>
                        Your feedback
                      </Label>
                      <Textarea
                        id="content"
                        ref={bodyRef}
                        rows={6}
                        className="vel-field mt-2"
                        placeholder="What did they do, what difference did it make, and what would you like next time?"
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                          setErrors((p) => ({ ...p, content: null }));
                        }}
                        aria-invalid={errors.content ? "true" : "false"}
                        aria-describedby={
                          errors.content ? "content-error content-hint" : "content-hint"
                        }
                        style={{
                          ...fieldStyle,
                          lineHeight: 1.6,
                          resize: "vertical",
                          borderColor: errors.content ? "var(--danger)" : "rgba(255,255,255,0.14)",
                        }}
                      />
                      <p
                        id="content-hint"
                        className="mt-2 mb-0 text-xs"
                        style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                      >
                        {content.trim().length} characters ·{" "}
                        {COLLEAGUES.find((c) => c.id === recipient)
                          ? COLLEAGUES.find((c) => c.id === recipient).name.split(" ")[0] +
                            " and their manager will see this."
                          : "The recipient and their manager will see this."}
                      </p>
                      {errors.content ? (
                        <p
                          id="content-error"
                          className="vel-fade mt-2 mb-0 flex items-center gap-2 text-[13px]"
                          style={{ color: "var(--danger)" }}
                        >
                          <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {errors.content}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p
                      className="m-0 px-4 py-3 text-[14px] leading-relaxed"
                      style={{
                        color: muted,
                        border: "1px dashed rgba(255,255,255,0.14)",
                        borderRadius: brand.radius,
                      }}
                    >
                      A request carries no message — just your name and the date. Keep the context
                      for the conversation itself; most people answer within a week.
                    </p>
                  )}
                </div>

                {formError ? (
                  <div
                    className="vel-fade mt-5 flex items-start gap-3 px-4 py-3"
                    role="alert"
                    style={{
                      border: "1px solid var(--danger)",
                      borderRadius: brand.radius,
                      backgroundColor: "rgba(255,255,255,0.035)",
                    }}
                  >
                    <Icons.AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                      style={{ color: "var(--danger)" }}
                    />
                    <div>
                      <p
                        className="m-0 text-[13px] font-semibold"
                        style={{ color: "var(--danger)" }}
                      >
                        Not sent
                      </p>
                      <p
                        className="mt-1 mb-0 text-[13px] leading-relaxed"
                        style={{ color: ink, opacity: 0.9 }}
                      >
                        {formError}
                      </p>
                    </div>
                  </div>
                ) : null}
              </CardContent>

              <CardFooter className="flex flex-wrap items-center gap-4 px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
                <button type="submit" className="vel-primary" style={primaryBtn} disabled={sending}>
                  {sending ? (
                    <span className="inline-flex items-center gap-2">
                      Sending
                      <span aria-hidden="true" className="inline-flex gap-1">
                        <span className="vel-dot">·</span>
                        <span className="vel-dot">·</span>
                        <span className="vel-dot">·</span>
                      </span>
                    </span>
                  ) : mode === "give" ? (
                    "Send feedback"
                  ) : (
                    "Send request"
                  )}
                </button>
                <button
                  type="button"
                  className="vel-btn"
                  style={ghostBtn}
                  disabled={sending}
                  onClick={() => {
                    setContent("");
                    setRecipient("");
                    setLinkedRequest(null);
                    resetValidation();
                  }}
                >
                  Clear draft
                </button>
                <p className="m-0 ml-auto text-xs" style={{ color: muted }}>
                  Writing about a goal?{" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    style={{
                      color: accent,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("goals")}
                  >
                    Open Goals
                  </button>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Waiting on you */}
          <Card style={panel}>
            <CardHeader className="px-6 pt-6 pb-0">
              <h2
                className="m-0"
                style={{ fontFamily: brand.fontHeading, fontSize: "21px", color: ink }}
              >
                Waiting on you
              </h2>
              <CardDescription className="mt-2 text-[13px]" style={{ color: muted }}>
                Colleagues who asked you for feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5">
              {incoming.length === 0 ||
              waiting.length + incoming.filter((r) => r.state === "declined").length === 0 ? (
                <Empty
                  className="vel-empty"
                  title="No one's waiting on you"
                  description="Requests from colleagues land here. You've answered everything that came in this week."
                />
              ) : (
                <ul className="list-none m-0 p-0 flex flex-col gap-3">
                  {incoming.map((r) => (
                    <li
                      key={r.id}
                      className={r.state === "answered" ? "vel-fade" : ""}
                      style={{
                        border: "1px solid rgba(255,255,255,0.11)",
                        borderRadius: brand.radius,
                        padding: "16px",
                        opacity: r.state === "pending" ? 1 : 0.72,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar name={r.person} className="vel-av shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="m-0 text-[14px] font-semibold" style={{ color: ink }}>
                            {r.person}
                          </h3>
                          <p
                            className="mt-0.5 mb-0 text-xs"
                            style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                          >
                            {r.role} · asked {r.asked}
                          </p>
                        </div>
                      </div>

                      {r.state === "pending" ? (
                        confirmDecline === r.id ? (
                          <div className="vel-fade mt-4">
                            <p className="m-0 text-[13px] leading-relaxed" style={{ color: ink }}>
                              Decline {r.person.split(" ")[0]}'s request? They'll see that you
                              passed, and can ask again later.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                className="vel-btn"
                                style={{
                                  ...ghostBtn,
                                  borderColor: "var(--danger)",
                                  color: "var(--danger)",
                                }}
                                onClick={() => declineRequest(r.id)}
                              >
                                Yes, decline
                              </button>
                              <button
                                type="button"
                                className="vel-btn"
                                style={ghostBtn}
                                onClick={() => setConfirmDecline(null)}
                              >
                                Keep it open
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="vel-primary"
                              style={{
                                ...primaryBtn,
                                padding: "9px 16px",
                                fontSize: "13px",
                                minHeight: "40px",
                              }}
                              onClick={() => startReply(r)}
                            >
                              Write reply
                            </button>
                            <button
                              type="button"
                              className="vel-btn"
                              style={ghostBtn}
                              onClick={() => setConfirmDecline(r.id)}
                            >
                              Decline
                            </button>
                          </div>
                        )
                      ) : (
                        <p
                          className="mt-3 mb-0 flex items-center gap-2 text-[13px]"
                          style={{ color: r.state === "answered" ? accent : muted }}
                        >
                          {r.state === "answered" ? (
                            <Icons.CheckCircle className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Icons.X className="h-4 w-4" aria-hidden="true" />
                          )}
                          {r.state === "answered" ? "Answered — it's in Given" : "Declined"}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Success banner */}
        {banner ? (
          <div
            className="vel-enter mt-8 flex items-start gap-3 px-5 py-4"
            role="status"
            style={{
              border: "1px solid " + accent,
              borderRadius: brand.radius,
              backgroundColor: "rgba(255,255,255,0.045)",
            }}
          >
            <Icons.CheckCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
              style={{ color: accent }}
            />
            <p className="m-0 flex-1 text-[14px]" style={{ color: ink }}>
              {banner.text}
            </p>
            <button
              type="button"
              aria-label="Dismiss confirmation"
              className="vel-btn"
              style={{ ...ghostBtn, padding: "4px", minHeight: "32px", width: "32px" }}
              onClick={() => setBanner(null)}
            >
              <Icons.X className="h-4 w-4 mx-auto" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        {/* Archive */}
        <section className="mt-10" aria-labelledby="archive-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="archive-heading"
              className="m-0"
              style={{ fontFamily: brand.fontHeading, fontSize: "25px", color: ink }}
            >
              Your record
            </h2>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <Label htmlFor="feedback-search" className="sr-only">
                  Search feedback by colleague or wording
                </Label>
                <div className="relative">
                  <Icons.Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    aria-hidden="true"
                    style={{ color: muted }}
                  />
                  <Input
                    id="feedback-search"
                    type="search"
                    className="vel-field"
                    placeholder="Search a name or a phrase"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      ...fieldStyle,
                      paddingLeft: "36px",
                      minHeight: "44px",
                      width: "260px",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sort" className="sr-only">
                  Sort feedback
                </Label>
                <Select
                  id="sort"
                  className="vel-field"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ ...fieldStyle, minHeight: "44px", width: "170px" }}
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value} style={{ color: "#111" }}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="vel-tabs mt-6">
            <Tabs tabs={tabs} active={tab} onChange={setTab} />
          </div>
          <Separator className="opacity-0 h-0" />

          <div className="mt-5" style={panel}>
            {tab === "received" ? (
              <section aria-label="Feedback you have received">
                {visibleReceived.length === 0 ? (
                  <div className="p-6">
                    <Empty
                      className="vel-empty"
                      title={"Nothing matches “" + query + "”"}
                      description="Try a colleague's name, a role, or a word you remember from the note."
                      action={
                        <button type="button" onClick={() => setQuery("")}>
                          Clear the search
                        </button>
                      }
                    />
                  </div>
                ) : (
                  feedbackList(visibleReceived, "received")
                )}
              </section>
            ) : null}

            {tab === "given" ? (
              <section aria-label="Feedback you have given">
                {visibleGiven.length === 0 ? (
                  <div className="p-6">
                    {query.trim() ? (
                      <Empty
                        className="vel-empty"
                        title={"Nothing matches “" + query + "”"}
                        description="Try a colleague's name, a role, or a word you remember from the note."
                        action={
                          <button type="button" onClick={() => setQuery("")}>
                            Clear the search
                          </button>
                        }
                      />
                    ) : (
                      <Empty
                        className="vel-empty"
                        title="You haven't written any feedback yet"
                        description="Pick a colleague above and write the thing you'd say in a 1:1. Two specific sentences beat a page of general praise."
                      />
                    )}
                  </div>
                ) : (
                  feedbackList(visibleGiven, "given")
                )}
              </section>
            ) : null}

            {tab === "requests" ? (
              <section
                aria-label="Feedback requests you have sent"
                className="px-2 py-2 sm:px-4 sm:py-4"
              >
                {visibleSent.length === 0 ? (
                  <div className="p-4">
                    <Empty
                      className="vel-empty"
                      title={
                        query.trim()
                          ? "No requests match that search"
                          : "You haven't asked anyone yet"
                      }
                      description={
                        query.trim()
                          ? "Search by colleague name, or by pending, answered or declined."
                          : "Switch the panel above to Request and pick a colleague. Asking is the fastest way to find out what you're missing."
                      }
                      action={
                        query.trim() ? (
                          <button type="button" onClick={() => setQuery("")}>
                            Clear the search
                          </button>
                        ) : undefined
                      }
                    />
                  </div>
                ) : (
                  <Table className="w-full" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <THead>
                      <TR style={{ borderBottom: "1px solid rgba(255,255,255,0.11)" }}>
                        <TH
                          scope="col"
                          className="px-4 py-3 text-left"
                          style={{ ...label, fontWeight: 500 }}
                        >
                          Colleague
                        </TH>
                        <TH
                          scope="col"
                          className="px-4 py-3 text-left"
                          style={{ ...label, fontWeight: 500 }}
                        >
                          Request
                        </TH>
                        <TH
                          scope="col"
                          className="px-4 py-3 text-left"
                          style={{ ...label, fontWeight: 500 }}
                        >
                          Sent
                        </TH>
                        <TH
                          scope="col"
                          className="px-4 py-3 text-left"
                          style={{ ...label, fontWeight: 500 }}
                        >
                          Status
                        </TH>
                        <TH
                          scope="col"
                          className="px-4 py-3 text-right"
                          style={{ ...label, fontWeight: 500 }}
                        >
                          Reply
                        </TH>
                      </TR>
                    </THead>
                    <TBody>
                      {visibleSent.map((r) => {
                        const chip = statusChip(r.status);
                        const open = openReq === r.id;
                        return (
                          <React.Fragment key={r.id}>
                            <TR
                              className={"vel-row " + (r.isNew ? "vel-enter" : "")}
                              style={{
                                borderBottom: open ? "none" : "1px solid rgba(255,255,255,0.11)",
                              }}
                            >
                              <TD className="px-4 py-4" style={{ color: ink }}>
                                <span className="font-medium">{r.person}</span>
                                <span className="block text-xs" style={{ color: muted }}>
                                  {r.role}
                                </span>
                              </TD>
                              <TD className="px-4 py-4 text-[13px]" style={{ color: accent }}>
                                {r.id}
                              </TD>
                              <TD className="px-4 py-4 text-[13px]" style={{ color: muted }}>
                                {r.sent}
                              </TD>
                              <TD className="px-4 py-4">
                                <span
                                  className="inline-flex items-center gap-2 px-2 py-1 text-[12px]"
                                  style={{
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    borderRadius: brand.radius,
                                    color: chip.color,
                                  }}
                                >
                                  <chip.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                  {chip.text}
                                </span>
                              </TD>
                              <TD className="px-4 py-4 text-right">
                                {r.status === "answered" ? (
                                  <button
                                    type="button"
                                    className="vel-btn"
                                    style={{ ...ghostBtn, padding: "7px 12px", minHeight: "36px" }}
                                    aria-expanded={open}
                                    aria-controls={"reply-" + r.id}
                                    onClick={() => setOpenReq(open ? null : r.id)}
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      {open ? "Hide reply" : "Read reply"}
                                      {open ? (
                                        <Icons.ChevronDown className="h-4 w-4" aria-hidden="true" />
                                      ) : (
                                        <Icons.ChevronRight
                                          className="h-4 w-4"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </button>
                                ) : (
                                  <span className="text-[13px]" style={{ color: muted }}>
                                    {r.status === "pending" ? "—" : "No reply"}
                                  </span>
                                )}
                              </TD>
                            </TR>

                            {open ? (
                              <TR style={{ borderBottom: "1px solid rgba(255,255,255,0.11)" }}>
                                <TD colSpan={5} className="px-4 pb-6 pt-0">
                                  <div
                                    id={"reply-" + r.id}
                                    className="vel-fade px-5 py-5"
                                    style={{
                                      border: "1px solid rgba(255,255,255,0.11)",
                                      borderRadius: brand.radius,
                                      backgroundColor: "rgba(255,255,255,0.03)",
                                    }}
                                  >
                                    {r.restricted ? (
                                      <div className="flex items-start gap-3">
                                        <Icons.AlertCircle
                                          className="mt-0.5 h-4 w-4 shrink-0"
                                          aria-hidden="true"
                                          style={{ color: "var(--warn)" }}
                                        />
                                        <div className="max-w-[68ch]">
                                          <h3
                                            className="m-0 text-[14px] font-semibold"
                                            style={{ color: "var(--warn)" }}
                                          >
                                            Restricted — you can't open this reply
                                          </h3>
                                          <p
                                            className="mt-2 mb-0 text-[14px] leading-relaxed"
                                            style={{ color: ink, opacity: 0.9 }}
                                          >
                                            {r.person} marked the answer confidential to your
                                            manager. <strong>Ines Marchetti</strong> can read it and
                                            will summarise it in your next 1:1. If you need it
                                            sooner, ask Ines, or Hélène Dupont in People Ops.
                                          </p>
                                          <button
                                            type="button"
                                            className="vel-btn mt-4"
                                            style={ghostBtn}
                                            onClick={() => navigate("my-profile")}
                                          >
                                            See who your manager is
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        <p className="m-0 text-xs" style={{ ...label }}>
                                          {r.person} ·{" "}
                                          <span style={{ fontVariantNumeric: "tabular-nums" }}>
                                            {r.replyDate}
                                          </span>
                                        </p>
                                        <p
                                          className="mt-3 mb-0 max-w-[68ch] text-[15px] leading-[1.65]"
                                          style={{ color: ink, opacity: 0.92 }}
                                        >
                                          {r.reply}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </TD>
                              </TR>
                            ) : null}

                            {r.status === "declined" && r.note ? (
                              <TR style={{ borderBottom: "1px solid rgba(255,255,255,0.11)" }}>
                                <TD
                                  colSpan={5}
                                  className="px-4 pb-4 pt-0 text-[13px]"
                                  style={{ color: muted }}
                                >
                                  {r.note}
                                </TD>
                              </TR>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                    </TBody>
                  </Table>
                )}
              </section>
            ) : null}
          </div>

          <p className="mt-6 mb-0 max-w-[70ch] text-xs leading-relaxed" style={{ color: muted }}>
            Feedback is visible to the author, the recipient and the recipient's manager. Everything
            else in the directory stays closed to you.{" "}
            <button
              type="button"
              className="underline underline-offset-4"
              style={{
                color: accent,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              onClick={() => navigate("dashboard")}
            >
              Back to my dashboard
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}
