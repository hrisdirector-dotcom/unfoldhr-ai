import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  ChevronRight,
  ChevronDown,
  UserPlus,
  UserMinus,
  ShieldCheck,
  MessageSquare,
  Workflow,
  GitBranch,
} from "lucide-react";
import { LifecycleRunOverlay } from "@/components/agent/LifecycleRunOverlay";
import AgentPageNav from "@/components/AgentPageNav";

type ControlStatus =
  | "Ready"
  | "Action Required"
  | "Approval Required"
  | "Held"
  | "Escalated";

type CheckStatus = "Passed" | "Warning" | "Failed" | "Pending";

interface ReadinessCheck {
  label: string;
  status: CheckStatus;
  detail: string;
}

type GateStatus = "Open" | "Pending" | "Passed" | "Blocking" | "Escalated";

interface Gate {
  label: string;
  status: GateStatus;
  reason: string;
  blocking: boolean;
}

type ActionClass = "Communication" | "Coordination" | "Control-status";
type ActionStatus = "Prepared" | "Ready to Release" | "Held" | "Pending Approval";

interface PreparedAction {
  label: string;
  actionClass: ActionClass;
  status: ActionStatus;
  detail: string;
}

interface TrailEntry {
  time: string;
  text: string;
  emphasis?: "info" | "warn" | "critical";
}

interface ScenarioEmployee {
  name: string;
  title: string;
  department: string;
  location: string;
  manager: string;
  eventDate: string;
  employmentType: string;
  separationType?: string;
  exceptionType?: string;
  ptoNote: string;
  payrollNote: string;
  contextNote: string;
}

interface Scenario {
  id: string;
  event: "Termination" | "New Hire";
  label: string;
  one_liner: string;
  queue_status_cue: string;
  evaluation_focus: string[];
  employee: ScenarioEmployee;
  summary: { status: ControlStatus; reason: string };
  readiness: ReadinessCheck[];
  gates: Gate[];
  actions: PreparedAction[];
  trail: TrailEntry[];
}

/* ============================================================
 * QUEUE — three featured lifecycle events
 * ============================================================ */
const SCENARIOS: Scenario[] = [
  {
    id: "hire-ready",
    event: "New Hire",
    label: "Standard New Hire — Ready",
    one_liner:
      "Clean new hire with aligned PTO setup, payroll readiness confirmed, manager ready, and approvals complete.",
    queue_status_cue: "Mostly ready · awaiting evaluation",
    evaluation_focus: [
      "Employee record completeness",
      "PTO / workforce policy alignment",
      "Payroll onboarding readiness",
      "Manager readiness",
      "Communication release conditions",
    ],
    employee: {
      name: "Amelia Rhodes",
      title: "Product Designer",
      department: "Design",
      location: "Remote — United Kingdom",
      manager: "Jonas Eriksen",
      eventDate: "Start date · Jan 6, 2027",
      employmentType: "Full-time · Salaried",
      ptoNote: "UK PTO policy correctly assigned",
      payrollNote: "Payroll onboarding complete for cycle starting Jan 1",
      contextNote: "No exception flags. Standard remote onboarding path.",
    },
    summary: {
      status: "Ready",
      reason:
        "New hire is ready for release. Policy, payroll, manager readiness, and required approvals are all clean.",
    },
    readiness: [
      { label: "Employee record complete", status: "Passed", detail: "All required fields populated in BambooHR" },
      { label: "Department / location / start-date integrity", status: "Passed", detail: "Design · Remote-UK · Jan 6, 2027" },
      { label: "PTO policy assigned and aligned", status: "Passed", detail: "UK policy correctly assigned to role profile" },
      { label: "Payroll onboarding readiness status", status: "Passed", detail: "Payroll onboarding complete for cycle Jan 1–15" },
      { label: "Manager readiness", status: "Passed", detail: "Manager pre-boarding acknowledged Dec 6" },
      { label: "Required approvals complete", status: "Passed", detail: "No exceptions · standard approval path" },
    ],
    gates: [
      { label: "HR Ops Policy Configuration Gate", status: "Passed", reason: "Policy configuration aligned to location and role", blocking: false },
      { label: "Manager Readiness Gate", status: "Passed", reason: "Manager acknowledged pre-boarding plan", blocking: false },
      { label: "Start-Date Release Rule", status: "Passed", reason: "Start date aligned to pay cycle and onboarding window", blocking: false },
    ],
    actions: [
      { label: "Draft Teams welcome message", actionClass: "Communication", status: "Ready to Release", detail: "Cleared for release on start date" },
      { label: "Draft manager kickoff email", actionClass: "Communication", status: "Ready to Release", detail: "Manager-authored kickoff cleared for release" },
      { label: "Create first-week calendar hold", actionClass: "Coordination", status: "Prepared", detail: "Calendar hold prepared for first 5 working days" },
      { label: "Notify HR onboarding owner", actionClass: "Coordination", status: "Prepared", detail: "Owner notified for day-1 coordination" },
    ],
    trail: [
      { time: "11:20", text: "New hire event received from BambooHR" },
      { time: "11:20", text: "Control path assigned: standard new hire · remote" },
      { time: "11:21", text: "PTO policy configuration validated for UK · Design" },
      { time: "11:21", text: "Payroll onboarding readiness confirmed" },
      { time: "11:21", text: "Manager kickoff draft prepared", emphasis: "info" },
      { time: "11:22", text: "Event marked ready for release", emphasis: "info" },
    ],
  },
  {
    id: "hire-exception",
    event: "New Hire",
    label: "New Hire — Exception Approval Required",
    one_liner:
      "Hire is structurally ready, but a compensation threshold exception requires approval before release.",
    queue_status_cue: "Approval pending · exception triggered",
    evaluation_focus: [
      "Employee record completeness",
      "PTO / policy alignment",
      "Payroll onboarding readiness",
      "Exception approval path",
      "Communication release conditions",
    ],
    employee: {
      name: "Priya Kumar",
      title: "Director, Data Platform",
      department: "Engineering",
      location: "Toronto, CA",
      manager: "Will Okafor",
      eventDate: "Start date · Dec 30, 2026",
      employmentType: "Full-time · Salaried",
      exceptionType: "Compensation threshold exception · outside standard band",
      ptoNote: "PTO policy correctly assigned · standard CA path",
      payrollNote: "Payroll onboarding complete · pending exception approval",
      contextNote: "Off-cycle start aligned to pay cycle by 7 days. Comp profile triggers exception approval threshold.",
    },
    summary: {
      status: "Approval Required",
      reason:
        "New hire is structurally ready, but an exception approval is required before release.",
    },
    readiness: [
      { label: "Employee record complete", status: "Passed", detail: "All required fields populated" },
      { label: "Department / location / start-date integrity", status: "Passed", detail: "Engineering · Toronto · Dec 30, 2026" },
      { label: "PTO policy assigned and aligned", status: "Passed", detail: "CA policy assigned · matches role profile" },
      { label: "Payroll onboarding readiness status", status: "Passed", detail: "Payroll onboarding complete · ready on approval" },
      { label: "Manager readiness", status: "Passed", detail: "Manager pre-boarding acknowledged" },
      { label: "Required approvals complete", status: "Pending", detail: "Compensation threshold exception triggered — VP Talent + FP&A approval pending" },
    ],
    gates: [
      { label: "Exception Approval Gate", status: "Open", reason: "Compensation threshold exception — VP Talent + FP&A approval required", blocking: true },
      { label: "HR Ops Policy Configuration Gate", status: "Passed", reason: "Policy configuration aligned", blocking: false },
      { label: "Manager Readiness Gate", status: "Passed", reason: "Manager acknowledged pre-boarding", blocking: false },
      { label: "Start-Date Release Rule", status: "Pending", reason: "Will clear automatically on exception approval", blocking: true },
    ],
    actions: [
      { label: "Draft Teams welcome message", actionClass: "Communication", status: "Prepared", detail: "Prepared · not releasable until exception clears" },
      { label: "Draft manager kickoff email", actionClass: "Communication", status: "Pending Approval", detail: "Awaiting Exception Approval Gate" },
      { label: "Create first-week calendar hold", actionClass: "Coordination", status: "Prepared", detail: "Prepared for first 5 working days" },
      { label: "Hold release pending exception approval", actionClass: "Control-status", status: "Held", detail: "Hold posture applied across release path" },
    ],
    trail: [
      { time: "15:48", text: "New hire event received from BambooHR" },
      { time: "15:48", text: "Control path assigned: standard new hire · director" },
      { time: "15:49", text: "Compensation threshold exception triggered", emphasis: "warn" },
      { time: "15:49", text: "Exception Approval Gate opened · routed to VP Talent and FP&A", emphasis: "critical" },
      { time: "15:50", text: "Manager kickoff draft prepared · held pending approval" },
      { time: "15:50", text: "Start-Date Release Rule pending · will clear on approval" },
    ],
  },
  {
    id: "term-sensitive",
    event: "Termination",
    label: "Termination — Sensitive Offboarding Control Conflict",
    one_liner:
      "Sensitive separation path with multiple unresolved control conditions — escalated.",
    queue_status_cue: "Sensitive · escalation likely",
    evaluation_focus: [
      "Employment record review",
      "Final payroll & PTO payout treatment",
      "Sensitive separation control path",
      "Approval & counsel routing",
      "Communications hold conditions",
      "Operating trail",
    ],
    employee: {
      name: "Devon Pierce",
      title: "VP Finance",
      department: "Finance",
      location: "New York, NY",
      manager: "Sasha Bloom (CFO)",
      eventDate: "Final working day · Dec 22, 2026",
      employmentType: "Full-time · Executive",
      separationType: "Sensitive separation · Executive path",
      ptoNote: "Balance under review with executive comp",
      payrollNote: "Final pay treatment under counsel review",
      contextNote: "Accelerated exit. Communications must remain held pending counsel and executive review.",
    },
    summary: {
      status: "Escalated",
      reason:
        "Sensitive separation path with multiple unresolved control conditions — release is held pending executive review, counsel acknowledgement, and payroll resolution.",
    },
    readiness: [
      { label: "Termination date / final working day integrity", status: "Warning", detail: "Accelerated exit on record · timing under executive review" },
      { label: "Separation type / control path", status: "Warning", detail: "Sensitive separation · executive control path assigned" },
      { label: "PTO payout / leave policy check", status: "Pending", detail: "Held pending executive comp review" },
      { label: "Final payroll readiness status", status: "Pending", detail: "Off-cycle treatment under counsel review" },
      { label: "Departure context captured", status: "Passed", detail: "Captured · flagged sensitive · counsel notified" },
      { label: "HR approval status", status: "Pending", detail: "Awaiting executive review sign-off" },
      { label: "Communication / handoff readiness", status: "Warning", detail: "All outbound communication on hold" },
    ],
    gates: [
      { label: "Final HR Approval Gate", status: "Escalated", reason: "Routed to CEO office for executive review", blocking: true },
      { label: "Payroll Resolution Gate", status: "Pending", reason: "Off-cycle final pay treatment under counsel review", blocking: true },
      { label: "Communication Timing Gate", status: "Blocking", reason: "Communications hold in effect until counsel and executive review clear", blocking: true },
    ],
    actions: [
      { label: "Draft termination communication", actionClass: "Communication", status: "Held", detail: "Held under communications hold" },
      { label: "Prepare manager handoff instructions", actionClass: "Coordination", status: "Held", detail: "Held pending executive review" },
      { label: "Hold release pending HR approval", actionClass: "Control-status", status: "Held", detail: "Executive review in progress" },
      { label: "Hold release pending payroll resolution", actionClass: "Control-status", status: "Held", detail: "Counsel review in progress" },
    ],
    trail: [
      { time: "08:41", text: "Termination event received from BambooHR" },
      { time: "08:41", text: "Sensitive separation classification detected", emphasis: "warn" },
      { time: "08:42", text: "Executive control path assigned" },
      { time: "08:42", text: "Communications hold applied to all prepared actions", emphasis: "critical" },
      { time: "08:43", text: "Final HR Approval Gate escalated to CEO office", emphasis: "critical" },
      { time: "08:43", text: "Payroll Resolution Gate held pending counsel review" },
      { time: "08:44", text: "Event posture: held — escalated", emphasis: "critical" },
    ],
  },
];

const STATUS_STYLES: Record<ControlStatus, { dot: string; text: string; bg: string; border: string }> = {
  Ready:               { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200" },
  "Action Required":   { dot: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200" },
  "Approval Required": { dot: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50",     border: "border-blue-200" },
  Held:                { dot: "bg-slate-500",   text: "text-slate-700",   bg: "bg-slate-50",    border: "border-slate-200" },
  Escalated:           { dot: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50",      border: "border-red-200" },
};

const CHECK_STYLES: Record<CheckStatus, { text: string; bg: string; border: string }> = {
  Passed:  { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  Warning: { text: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
  Failed:  { text: "text-red-700",     bg: "bg-red-50",     border: "border-red-200" },
  Pending: { text: "text-slate-600",   bg: "bg-slate-50",   border: "border-slate-200" },
};

const GATE_STYLES: Record<GateStatus, { text: string; bg: string; border: string }> = {
  Open:      { text: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
  Pending:   { text: "text-slate-600",   bg: "bg-slate-50",   border: "border-slate-200" },
  Passed:    { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  Blocking:  { text: "text-red-700",     bg: "bg-red-50",     border: "border-red-200" },
  Escalated: { text: "text-red-700",     bg: "bg-red-50",     border: "border-red-300" },
};

const ACTION_STYLES: Record<ActionStatus, string> = {
  Prepared:           "border-slate-200 text-slate-700 bg-slate-50",
  "Ready to Release": "border-emerald-200 text-emerald-700 bg-emerald-50",
  Held:               "border-amber-200 text-amber-700 bg-amber-50",
  "Pending Approval": "border-blue-200 text-blue-700 bg-blue-50",
};

function CheckIcon({ status }: { status: CheckStatus }) {
  if (status === "Passed") return <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />;
  if (status === "Warning") return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
  if (status === "Failed") return <ShieldAlert className="h-4 w-4 text-red-600 shrink-0" />;
  return <Clock className="h-4 w-4 text-slate-500 shrink-0" />;
}

function StatusPill({ status }: { status: ControlStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

/* ---------- Run step definitions per event type ---------- */
function runStepsFor(event: "New Hire" | "Termination"): string[] {
  if (event === "Termination") {
    return [
      "Receiving lifecycle event from BambooHR",
      "Reviewing employment record & separation type",
      "Evaluating PTO payout & final payroll readiness",
      "Reviewing approvals, exceptions & sensitivity gates",
      "Preparing communications, handoff & operating trail",
      "Publishing lifecycle control result",
    ];
  }
  return [
    "Receiving lifecycle event from BambooHR",
    "Reviewing employee & employment record",
    "Evaluating PTO, policy & payroll readiness",
    "Reviewing approvals & exception conditions",
    "Preparing communications & coordination actions",
    "Publishing lifecycle control result",
  ];
}

/* ============================================================
 * MAIN PAGE
 * ============================================================ */
interface Props {
  setPage: (p: string) => void;
}

type Stage = "queue" | "launch" | "running" | "results";

export default function GlobalLifecycleAgentPage({ setPage }: Props) {
  const [stage, setStage] = useState<Stage>("queue");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const selected = SCENARIOS.find((s) => s.id === selectedId) ?? null;

  const goQueue = () => {
    setStage("queue");
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const openEvent = (id: string) => {
    setSelectedId(id);
    setStage("launch");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const startRun = () => {
    setStage("running");
  };

  const completeRun = () => {
    setStage("results");
    requestAnimationFrame(() => {
      const el = document.getElementById("lifecycle-outcome");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const caseId = selected
    ? `CASE · ${selected.id.toUpperCase()}-${new Date().getFullYear()}`
    : "";

  return (
    <main className="bg-paper min-h-screen">
      {/* Identity band */}
      <section className="bg-gradient-to-b from-slate text-white relative">
        <div className="absolute inset-x-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 lg:pt-16 lg:pb-12">
          <div className="mb-6"><AgentPageNav setPage={setPage} variant="light" /></div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-200/90 flex-wrap">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
            Global Lifecycle Agent
            <span className="opacity-50">·</span>
            BambooHR Edition
            <span className="opacity-50">·</span>
            Workforce Event Control & Readiness
            {stage !== "queue" && selected && (
              <>
                <span className="opacity-50">·</span>
                <span className="font-mono text-blue-100/70">{caseId}</span>
              </>
            )}
          </div>

          {stage === "queue" && (
            <>
              <h1 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
                What lifecycle event requires action?
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-200/85 max-w-2xl leading-relaxed">
                Workforce events ingested from BambooHR are queued here for control & readiness
                evaluation. Open an event to review and run the agent.
              </p>
            </>
          )}

          {stage !== "queue" && selected && (
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <button
                onClick={goQueue}
                className="inline-flex items-center gap-1.5 text-sm text-blue-200/90 hover:text-white transition"
              >
                <ArrowLeft className="h-4 w-4" /> Lifecycle queue
              </button>
              <span className="text-slate-400/60">/</span>
              <span className="text-sm text-white/90">{selected.employee.name}</span>
              <span className="text-slate-400/60">·</span>
              <span className="text-xs text-blue-200/70">{selected.event}</span>
            </div>
          )}
        </div>
      </section>

      {/* Stage content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {stage === "queue" && <QueueStage onOpen={openEvent} />}
          {(stage === "launch" || stage === "running") && selected && (
            <LaunchStage scenario={selected} onBack={goQueue} onRun={startRun} running={stage === "running"} />
          )}
          {stage === "results" && selected && (
            <ResultsStage
              scenario={selected}
              onBack={goQueue}
              onRequest={() => setPage("contact")}
            />
          )}
        </div>
      </section>

      {/* Run overlay */}
      {selected && (
        <LifecycleRunOverlay
          show={stage === "running"}
          steps={runStepsFor(selected.event)}
          eventLabel={selected.event}
          employeeName={selected.employee.name}
          onDone={completeRun}
        />
      )}
    </main>
  );
}

/* ============================================================
 * STAGE 1 — QUEUE
 * ============================================================ */
function QueueStage({ onOpen }: { onOpen: (id: string) => void }) {
  const groups = useMemo(
    () => [
      {
        type: "onboarding" as const,
        title: "New Hire Onboarding",
        icon: UserPlus,
        items: SCENARIOS.filter((s) => s.event === "New Hire"),
      },
      {
        type: "offboarding" as const,
        title: "Employee Offboarding",
        icon: UserMinus,
        items: SCENARIOS.filter((s) => s.event === "Termination"),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2 font-mono">
            Lifecycle queue · standing by
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-slate leading-tight">
            Events awaiting control evaluation
          </h2>
        </div>
        <div className="text-xs text-slate-4">
          <span className="font-mono">3 events queued</span> · synthetic demo data
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-4 font-mono">
        <span>Synthetic workforce only</span>
        <span className="opacity-50">·</span>
        <span>No real PII</span>
        <span className="opacity-50">·</span>
        <span>Simulated integrations</span>
        <span className="opacity-50">·</span>
        <span>Human-in-the-loop</span>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((g, gi) => (
          <motion.section
            key={g.type}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + gi * 0.08 }}
          >
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-3 font-mono">
              <g.icon className="h-3.5 w-3.5" />
              {g.title}
              <span className="opacity-40">·</span>
              <span className="opacity-70">
                {g.items.length} event{g.items.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {g.items.map((s) => (
                <QueueCard key={s.id} scenario={s} onOpen={() => onOpen(s.id)} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function urgencyForStatus(status: ControlStatus): {
  label: string;
  cls: string;
  dot: string;
} {
  switch (status) {
    case "Ready":
      return {
        label: "Ready to Review",
        cls: "border-emerald-200 text-emerald-700 bg-emerald-50",
        dot: "bg-emerald-500",
      };
    case "Approval Required":
      return {
        label: "Approval Blocked",
        cls: "border-blue-200 text-blue-700 bg-blue-50",
        dot: "bg-blue-500",
      };
    case "Action Required":
      return {
        label: "Action Required",
        cls: "border-amber-200 text-amber-700 bg-amber-50",
        dot: "bg-amber-500",
      };
    case "Held":
      return {
        label: "Payroll Hold",
        cls: "border-slate-300 text-slate-700 bg-slate-50",
        dot: "bg-slate-500",
      };
    case "Escalated":
      return {
        label: "Escalated",
        cls: "border-red-200 text-red-700 bg-red-50",
        dot: "bg-red-500",
      };
  }
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function QueueCard({ scenario, onOpen }: { scenario: Scenario; onOpen: () => void }) {
  const urgency = urgencyForStatus(scenario.summary.status);
  const isTerm = scenario.event === "Termination";

  return (
    <button
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-white p-6 text-left transition-all hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(43,92,230,0.35)] hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(43,92,230,0.08), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-display ring-1 ${
              isTerm
                ? "bg-slate-50 text-slate-700 ring-slate-200"
                : "bg-blue-50 text-blue-700 ring-blue-200"
            }`}
          >
            {initialsOf(scenario.employee.name)}
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-slate truncate">
              {scenario.employee.name}
            </div>
            <div className="text-xs text-slate-3 truncate">
              {scenario.employee.title} · {scenario.employee.department}
            </div>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border/70 bg-paper/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-4">
          via BambooHR
        </span>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-4">
        <span>{scenario.employee.location}</span>
        <span className="opacity-50">·</span>
        <span>{scenario.employee.eventDate}</span>
      </div>

      <ul className="relative mt-4 space-y-1.5">
        {scenario.evaluation_focus.slice(0, 3).map((it) => (
          <li key={it} className="flex items-start gap-2 text-xs text-slate-3 leading-relaxed">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-3/60 shrink-0" />
            {it}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wider ${urgency.cls}`}
        >
          <span className={`h-1 w-1 rounded-full ${urgency.dot}`} />
          {urgency.label}
        </span>
        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
          Open event <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

/* ============================================================
 * STAGE 2 — LAUNCH (also visible behind run overlay)
 * ============================================================ */
function LaunchStage({
  scenario,
  onBack,
  onRun,
  running,
}: {
  scenario: Scenario;
  onBack: () => void;
  onRun: () => void;
  running: boolean;
}) {
  const e = scenario.employee;
  const isSensitive = Boolean(e.separationType);
  const isTerm = scenario.event === "Termination";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {isSensitive && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 flex items-center gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
          <div className="text-sm text-amber-900">
            <span className="font-medium">Sensitive separation path.</span>{" "}
            Communications and downstream actions are held pending counsel and executive review.
          </div>
        </div>
      )}

      {/* Two-column event header / launch panel */}
      <Card className="overflow-hidden border border-border/70">
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          {/* LEFT — event detail */}
          <div className="relative p-7 lg:p-8">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(43,92,230,0.06), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-4 font-mono">
                <span>01 · Lifecycle Event</span>
                <span className="opacity-50">·</span>
                <span className="text-primary">{isTerm ? "Employee Offboarding" : "New Hire Onboarding"}</span>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg ring-1 ${
                    isTerm
                      ? "bg-slate-50 text-slate-700 ring-slate-200"
                      : "bg-blue-50 text-blue-700 ring-blue-200"
                  }`}
                >
                  {initialsOf(e.name)}
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-3xl text-slate leading-tight">{e.name}</h1>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-3">
                    <span>{e.title}</span>
                    <span className="text-slate-300">·</span>
                    <span>{e.department}</span>
                    <span className="text-slate-300">·</span>
                    <span>{e.location}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-4">
                    <span>Manager: {e.manager}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono">{e.eventDate}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-slate-4">Employment</dt>
                  <dd className="text-slate mt-0.5">{e.employmentType}</dd>
                </div>
                {e.separationType && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-slate-4">Separation</dt>
                    <dd className="text-slate mt-0.5">{e.separationType}</dd>
                  </div>
                )}
                {e.exceptionType && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-slate-4">Exception</dt>
                    <dd className="text-slate mt-0.5">{e.exceptionType}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-slate-4">PTO</dt>
                  <dd className="text-slate mt-0.5">{e.ptoNote}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-slate-4">Payroll</dt>
                  <dd className="text-slate mt-0.5">{e.payrollNote}</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-xl border border-border/70 bg-paper/50 p-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
                  Why this event is flagged
                </div>
                <p className="mt-1.5 text-sm text-slate-2 leading-relaxed">{scenario.one_liner}</p>
                <p className="mt-2 text-sm text-slate-3 italic leading-relaxed">{e.contextNote}</p>
              </div>
            </div>
          </div>

          {/* RIGHT — agent-ready / Run CTA */}
          <div className="relative flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/70 bg-gradient-to-br from-slate to-slate-2 text-white p-7 lg:p-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-blue-200/80 font-mono">
                Agent ready
              </div>
              <p className="mt-3 text-sm text-blue-100/90 leading-relaxed">
                I'll evaluate this {scenario.event.toLowerCase()} against policy alignment, payroll
                readiness, approvals, and release conditions — and surface anything that needs your
                attention.
              </p>

              <div className="mt-5 space-y-2">
                {scenario.evaluation_focus.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 text-xs text-blue-100/85"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-blue-300 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <Button
                onClick={onRun}
                disabled={running}
                size="lg"
                className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-[0_10px_30px_-10px_rgba(43,92,230,0.7)] hover:shadow-[0_18px_40px_-12px_rgba(43,92,230,0.8)] hover:-translate-y-px transition-all"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {running ? "Running Lifecycle Agent…" : "Run Lifecycle Agent"}
                {!running && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </Button>
              <button
                onClick={onBack}
                className="mt-3 w-full text-xs text-blue-200/70 hover:text-white transition"
              >
                ← Back to queue
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ============================================================
 * STAGE 3 — RESULTS (orchestrated outcome surface)
 * ============================================================ */
function ResultsStage({
  scenario,
  onBack,
  onRequest,
}: {
  scenario: Scenario;
  onBack: () => void;
  onRequest: () => void;
}) {
  const s = STATUS_STYLES[scenario.summary.status];
  const blockers = scenario.gates.filter((g) => g.blocking);
  const passedCount = scenario.readiness.filter((c) => c.status === "Passed").length;
  const totalChecks = scenario.readiness.length;
  const readinessPct = Math.round((passedCount / totalChecks) * 100);

  const actionsByClass = useMemo(() => {
    const groups: Record<ActionClass, PreparedAction[]> = {
      Communication: [],
      Coordination: [],
      "Control-status": [],
    };
    scenario.actions.forEach((a) => groups[a.actionClass].push(a));
    return groups;
  }, [scenario]);

  const classMeta: Record<ActionClass, { title: string; caption: string; icon: typeof MessageSquare }> = {
    Communication: { title: "Communications", caption: "Drafts & messages prepared", icon: MessageSquare },
    Coordination: { title: "Coordination", caption: "Workstreams & handoffs", icon: Workflow },
    "Control-status": { title: "Control posture", caption: "Release & hold state", icon: GitBranch },
  };

  const primaryBlocker = blockers[0];
  const extraBlockers = blockers.slice(1);
  const verdict = verdictFor(scenario.summary.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* 1 — Lifecycle Control Verdict (dominant) */}
      <Card
        id="lifecycle-outcome"
        className={`relative overflow-hidden p-7 lg:p-9 border-2 ${s.border} ${s.bg}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 font-mono">
            Lifecycle control result · {scenario.event} · {scenario.employee.name}
          </div>
          <StatusPill status={scenario.summary.status} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-slate tracking-tight">
            {verdict.headline}
          </h2>
        </div>

        <p className="mt-4 text-base text-slate-2 leading-relaxed max-w-3xl">
          {scenario.summary.reason}
        </p>

        {/* Primary blocker — inline so the user sees it within the verdict */}
        {primaryBlocker ? (
          <div className="mt-6 rounded-xl border border-amber-300/80 bg-white/80 backdrop-blur-sm px-4 py-3 flex items-start gap-3">
            <Lock className="h-4 w-4 mt-0.5 shrink-0 text-amber-700" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-amber-800 font-mono mb-0.5">
                Primary blocking condition
              </div>
              <div className="text-sm text-slate font-medium leading-snug">
                {primaryBlocker.label}
              </div>
              <div className="text-xs text-slate-3 mt-0.5 leading-relaxed">{primaryBlocker.reason}</div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-emerald-300/80 bg-white/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <div className="text-sm text-slate">
              <span className="font-medium">Cleared for release.</span>{" "}
              <span className="text-slate-3">No blocking gates · all approvals and policy checks satisfied.</span>
            </div>
          </div>
        )}

        {/* Compact readiness strip */}
        <div className="mt-5 flex items-center gap-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-4 font-mono shrink-0">
            Readiness
          </div>
          <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
              style={{ width: `${readinessPct}%` }}
            />
          </div>
          <div className="text-sm font-display text-slate tabular-nums shrink-0">
            {readinessPct}<span className="text-xs text-slate-4">%</span>
          </div>
          <div className="text-[11px] text-slate-4 font-mono shrink-0 hidden sm:block">
            {passedCount}/{totalChecks} checks
          </div>
        </div>

        {/* Additional blockers — compact chips */}
        {extraBlockers.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-4 font-mono">
              Also blocking
            </span>
            {extraBlockers.map((g) => {
              const gs = GATE_STYLES[g.status];
              return (
                <span
                  key={g.label}
                  className={`text-xs px-2 py-1 rounded-md border ${gs.bg} ${gs.text} ${gs.border}`}
                  title={g.reason}
                >
                  {g.label}
                </span>
              );
            })}
          </div>
        )}
      </Card>

      {/* 2 — Readiness outcomes (compact two-column) */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader
          title="Readiness outcomes"
          caption={`${passedCount} passed · ${totalChecks - passedCount} require attention`}
        />
        <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {scenario.readiness.map((c) => {
            const cs = CHECK_STYLES[c.status];
            return (
              <li key={c.label} className="py-1.5 flex items-start gap-2.5">
                <CheckIcon status={c.status} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate font-medium leading-snug">{c.label}</div>
                  <div className="text-xs text-slate-4 mt-0.5 leading-snug">{c.detail}</div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded border ${cs.bg} ${cs.text} ${cs.border} shrink-0`}
                >
                  {c.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 3 — Prepared workstreams */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader
          title="Prepared workstreams"
          caption="Grouped by operational domain · subordinate to control state"
        />
        <div className="mt-5 grid md:grid-cols-3 gap-3">
          {(Object.keys(actionsByClass) as ActionClass[]).map((k) => {
            const meta = classMeta[k];
            const items = actionsByClass[k];
            if (!items.length) return null;
            const Icon = meta.icon;
            return (
              <div
                key={k}
                className="rounded-xl border border-border/70 bg-paper/40 p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="text-sm font-display text-slate">{meta.title}</div>
                </div>
                <ul className="mt-3 space-y-2">
                  {items.map((a) => (
                    <li
                      key={a.label}
                      className="rounded-lg border border-border/60 bg-white p-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-[13px] text-slate font-medium leading-snug">{a.label}</div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] shrink-0 ${ACTION_STYLES[a.status]}`}
                        >
                          {a.status}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-slate-4 mt-1 leading-snug">{a.detail}</div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4 — Operating trail (collapsible to reduce sprawl) */}
      <details className="group rounded-xl border border-border/70 bg-white">
        <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-base text-slate">Operating trail</div>
            <div className="text-xs text-slate-4 mt-0.5">
              {scenario.trail.length} steps · how the agent reached this result
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-6 pb-6">
          <ol className="relative border-l border-border/70 ml-2">
            {scenario.trail.map((t, i) => {
              const dot =
                t.emphasis === "critical"
                  ? "bg-red-500"
                  : t.emphasis === "warn"
                  ? "bg-amber-500"
                  : "bg-primary";
              return (
                <li key={i} className="ml-4 pb-3 last:pb-0">
                  <span className={`absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full ${dot}`} />
                  <div className="text-xs text-slate-4 font-mono">{t.time}</div>
                  <div className="text-sm text-slate mt-0.5">{t.text}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </details>

      {/* Closing actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to queue
        </Button>
        <Button className="bg-slate hover:bg-slate-2 text-white" onClick={onRequest}>
          Request this agent for your team <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function verdictFor(status: ControlStatus): { headline: string } {
  switch (status) {
    case "Ready":              return { headline: "Ready for release" };
    case "Approval Required":  return { headline: "Approval required to release" };
    case "Action Required":    return { headline: "Action required before release" };
    case "Held":               return { headline: "Release held" };
    case "Escalated":          return { headline: "Escalated · release held" };
  }
}

function BlockHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div>
      <div className="font-display text-lg text-slate">{title}</div>
      <div className="text-xs text-slate-4 mt-0.5">{caption}</div>
    </div>
  );
}
