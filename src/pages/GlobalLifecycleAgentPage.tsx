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
  UserPlus,
  UserMinus,
  ShieldCheck,
  MessageSquare,
  Workflow,
  GitBranch,
} from "lucide-react";
import { LifecycleRunOverlay } from "@/components/agent/LifecycleRunOverlay";

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
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const completeRun = () => {
    setStage("results");
  };

  return (
    <main className="bg-paper min-h-screen">
      {/* Identity band */}
      <section className="bg-gradient-to-b from-slate text-white">
        <div className="absolute inset-x-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 lg:pt-16 lg:pb-12">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
            Global Lifecycle Agent
            <span className="opacity-50">·</span>
            BambooHR Edition
            <span className="opacity-50">·</span>
            Workforce Event Control & Readiness
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
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={goQueue}
                className="inline-flex items-center gap-1.5 text-sm text-blue-200/90 hover:text-white transition"
              >
                <ArrowLeft className="h-4 w-4" /> Lifecycle queue
              </button>
              <span className="text-slate-400/60">/</span>
              <span className="text-sm text-white/90">{selected.employee.name}</span>
            </div>
          )}
        </div>
      </section>

      {/* Stage content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {stage === "queue" && <QueueStage onOpen={openEvent} />}
          {stage === "launch" && selected && (
            <LaunchStage scenario={selected} onBack={goQueue} onRun={startRun} />
          )}
          {stage === "running" && selected && (
            <RunStage scenario={selected} onComplete={completeRun} />
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
    </main>
  );
}

/* ============================================================
 * STAGE 1 — QUEUE
 * ============================================================ */
function QueueStage({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2">
            Lifecycle queue
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-slate leading-tight">
            Events awaiting control evaluation
          </h2>
        </div>
        <div className="text-xs text-slate-4">Synthetic demo data · 3 events queued</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCENARIOS.map((s) => (
          <QueueCard key={s.id} scenario={s} onOpen={() => onOpen(s.id)} />
        ))}
      </div>
    </div>
  );
}

function QueueCard({ scenario, onOpen }: { scenario: Scenario; onOpen: () => void }) {
  const accent =
    scenario.event === "Termination"
      ? "from-red-50 to-transparent"
      : "from-blue-50 to-transparent";
  return (
    <Card
      onClick={onOpen}
      className="group relative cursor-pointer p-6 bg-white border border-border/70 hover:border-primary/40 hover:shadow-lg transition flex flex-col"
    >
      <div className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${accent} opacity-60 rounded-t-lg pointer-events-none`} />
      <div className="relative flex items-center justify-between">
        <Badge
          variant="outline"
          className={`text-[10px] uppercase tracking-wider ${
            scenario.event === "Termination"
              ? "border-red-200 text-red-700 bg-red-50"
              : "border-blue-200 text-blue-700 bg-blue-50"
          }`}
        >
          {scenario.event}
        </Badge>
        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition" />
      </div>

      <div className="relative mt-4 font-display text-lg text-slate leading-snug">
        {scenario.employee.name}
      </div>
      <div className="text-xs text-slate-3 mt-1">
        {scenario.employee.title} · {scenario.employee.department}
      </div>
      <div className="text-xs text-slate-4">{scenario.employee.location}</div>

      <Separator className="my-4" />

      <div className="text-xs text-slate-4 mb-1">{scenario.employee.eventDate}</div>
      <p className="text-sm text-slate-2 leading-relaxed line-clamp-3">
        {scenario.one_liner}
      </p>

      <div className="mt-5 flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wider text-slate-4">
          {scenario.queue_status_cue}
        </span>
        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition">
          Open event →
        </span>
      </div>
    </Card>
  );
}

/* ============================================================
 * STAGE 2 — LAUNCH
 * ============================================================ */
function LaunchStage({
  scenario,
  onBack,
  onRun,
}: {
  scenario: Scenario;
  onBack: () => void;
  onRun: () => void;
}) {
  const e = scenario.employee;
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <Card className="p-7 lg:p-8 bg-white border border-border/70">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Badge
              variant="outline"
              className={`text-[10px] uppercase tracking-wider ${
                scenario.event === "Termination"
                  ? "border-red-200 text-red-700 bg-red-50"
                  : "border-blue-200 text-blue-700 bg-blue-50"
              }`}
            >
              {scenario.event}
            </Badge>
            <div className="text-xs text-slate-4">{e.eventDate}</div>
          </div>
          <h2 className="mt-5 font-display text-3xl text-slate leading-tight">{e.name}</h2>
          <div className="mt-1 text-sm text-slate-3">
            {e.title} · {e.department} · {e.location}
          </div>
          <div className="mt-1 text-xs text-slate-4">Manager: {e.manager}</div>

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
        </Card>

        <Card className="p-7 bg-white border border-border/70">
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2">
            Event context
          </div>
          <h3 className="font-display text-xl text-slate leading-snug">
            Why this event is notable
          </h3>
          <p className="mt-3 text-sm text-slate-2 leading-relaxed">
            {scenario.one_liner}
          </p>
          <p className="mt-3 text-sm text-slate-3 italic leading-relaxed">
            {e.contextNote}
          </p>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 h-fit">
        <Card className="p-6 bg-white border border-border/70">
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-3">
            What the agent will evaluate
          </div>
          <ul className="space-y-2.5">
            {scenario.evaluation_focus.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-2">
                <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate to-slate-2 text-white border border-slate/20">
          <div className="text-[11px] uppercase tracking-[0.18em] text-blue-200/80 mb-2">
            Launch evaluation
          </div>
          <div className="font-display text-lg leading-snug mb-4">
            Run the Lifecycle Agent against this event.
          </div>
          <Button
            onClick={onRun}
            size="lg"
            className="w-full bg-white text-slate-900 hover:bg-slate-100"
          >
            <Play className="mr-2 h-4 w-4" /> Run Agent
          </Button>
          <button
            onClick={onBack}
            className="mt-3 w-full text-xs text-blue-200/80 hover:text-white transition"
          >
            ← Back to queue
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
 * STAGE 3A — LIVE RUN
 * ============================================================ */
function RunStage({
  scenario,
  onComplete,
}: {
  scenario: Scenario;
  onComplete: () => void;
}) {
  const steps = runStepsFor(scenario.event);
  const [currentStep, setCurrentStep] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      const t = setTimeout(() => setCurrentStep((s) => s + 1), 850);
      return () => clearTimeout(t);
    }
    if (!completedRef.current) {
      completedRef.current = true;
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 lg:p-10 bg-white border border-border/70">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary">
            Agent running
          </div>
          <Badge
            variant="outline"
            className={`text-[10px] uppercase tracking-wider ${
              scenario.event === "Termination"
                ? "border-red-200 text-red-700 bg-red-50"
                : "border-blue-200 text-blue-700 bg-blue-50"
            }`}
          >
            {scenario.event} · {scenario.employee.name}
          </Badge>
        </div>

        <h2 className="mt-4 font-display text-2xl md:text-3xl text-slate leading-tight">
          Evaluating lifecycle control conditions…
        </h2>
        <p className="mt-2 text-sm text-slate-3">
          The agent is working through control & readiness checks for this event.
        </p>

        <ol className="mt-8 space-y-3">
          {steps.map((label, i) => {
            const state =
              i < currentStep ? "done" : i === currentStep ? "active" : "pending";
            return (
              <li
                key={label}
                className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition ${
                  state === "done"
                    ? "border-emerald-200 bg-emerald-50/60"
                    : state === "active"
                    ? "border-primary/40 bg-accent"
                    : "border-border/70 bg-paper/40"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {state === "done" && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  {state === "active" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                  {state === "pending" && (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${
                      state === "pending" ? "text-slate-400" : "text-slate"
                    }`}
                  >
                    {label}
                  </div>
                  <div className="text-[11px] text-slate-4 mt-0.5">
                    {state === "done" && "Complete"}
                    {state === "active" && "In progress…"}
                    {state === "pending" && "Queued"}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-4">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}

/* ============================================================
 * STAGE 3B — RESULTS
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
  const passed = scenario.readiness.filter((c) => c.status === "Passed");
  const failedOrPending = scenario.readiness.filter(
    (c) => c.status !== "Passed"
  );

  return (
    <div className="space-y-6">
      {/* 1 — Lifecycle Control Summary (dominant) */}
      <Card className={`p-8 lg:p-10 border-2 ${s.border} ${s.bg}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 mb-3">
              Lifecycle control result
            </div>
            <h2 className="font-display text-3xl md:text-[2.2rem] text-slate leading-tight">
              {scenario.event} · {scenario.employee.name}
            </h2>
          </div>
          <StatusPill status={scenario.summary.status} />
        </div>
        <p className="mt-5 text-base text-slate-2 leading-relaxed max-w-3xl">
          {scenario.summary.reason}
        </p>
      </Card>

      {/* 2 — Readiness / validation outcomes */}
      <Card className="p-6 lg:p-7 bg-white border border-border/70">
        <BlockHeader
          title="Readiness & validation outcomes"
          caption={`${passed.length} passed · ${failedOrPending.length} require attention`}
        />
        <ul className="mt-5 divide-y divide-border/60">
          {scenario.readiness.map((c) => {
            const cs = CHECK_STYLES[c.status];
            return (
              <li key={c.label} className="py-3 flex items-start gap-3">
                <CheckIcon status={c.status} />
                <div className="flex-1">
                  <div className="text-sm text-slate font-medium">{c.label}</div>
                  <div className="text-xs text-slate-4 mt-0.5">{c.detail}</div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded border ${cs.bg} ${cs.text} ${cs.border}`}
                >
                  {c.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 3 — Blocking gates / approvals / exception path */}
      <Card className="p-6 lg:p-7 bg-white border border-border/70">
        <BlockHeader
          title="Blocking gates, approvals & exceptions"
          caption={
            blockers.length
              ? `${blockers.length} control${blockers.length === 1 ? "" : "s"} actively blocking progression`
              : "No active blockers — event is cleared to progress"
          }
        />
        <ul className="mt-5 space-y-3">
          {scenario.gates.map((g) => {
            const gs = GATE_STYLES[g.status];
            const Icon =
              g.status === "Blocking" || g.status === "Escalated"
                ? ShieldAlert
                : g.status === "Passed"
                ? CheckCircle2
                : g.status === "Open"
                ? AlertTriangle
                : Lock;
            const iconColor =
              g.status === "Blocking" || g.status === "Escalated"
                ? "text-red-600"
                : g.status === "Passed"
                ? "text-emerald-600"
                : g.status === "Open"
                ? "text-amber-600"
                : "text-slate-500";
            return (
              <li
                key={g.label}
                className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
                  g.blocking ? `${gs.border} ${gs.bg}` : "border-border/70 bg-paper/40"
                }`}
              >
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${iconColor}`} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-slate font-medium">{g.label}</span>
                    {g.blocking && (
                      <span className="text-[10px] uppercase tracking-wider font-medium text-red-700 bg-red-50 border border-red-200 rounded px-1.5 py-0.5">
                        Blocking
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-4 mt-0.5">{g.reason}</div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded border ${gs.bg} ${gs.text} ${gs.border}`}
                >
                  {g.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 4 — Prepared actions / communications */}
      <Card className="p-6 lg:p-7 bg-white border border-border/70">
        <BlockHeader
          title="Prepared actions & communications"
          caption="What the agent prepared next — subordinate to control state"
        />
        <ul className="mt-5 space-y-2">
          {scenario.actions.map((a) => (
            <li
              key={a.label}
              className="flex items-start gap-3 rounded-lg border border-border/70 bg-white px-4 py-3"
            >
              <div className="flex-1">
                <div className="text-sm text-slate font-medium">{a.label}</div>
                <div className="text-xs text-slate-4 mt-0.5">
                  <span className="text-slate-3 font-medium">{a.actionClass}</span> · {a.detail}
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] shrink-0 ${ACTION_STYLES[a.status]}`}
              >
                {a.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5 — Operating trail */}
      <Card className="p-6 lg:p-7 bg-white border border-border/70">
        <BlockHeader
          title="Operating trail"
          caption="How the agent reached this result"
        />
        <ol className="mt-5 relative border-l border-border/70 ml-2">
          {scenario.trail.map((t, i) => {
            const dot =
              t.emphasis === "critical"
                ? "bg-red-500"
                : t.emphasis === "warn"
                ? "bg-amber-500"
                : "bg-primary";
            return (
              <li key={i} className="ml-4 pb-4 last:pb-0">
                <span className={`absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full ${dot}`} />
                <div className="text-xs text-slate-4">{t.time}</div>
                <div className="text-sm text-slate mt-0.5">{t.text}</div>
              </li>
            );
          })}
        </ol>
      </Card>

      {/* Closing actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to queue
        </Button>
        <Button className="bg-slate hover:bg-slate-2 text-white" onClick={onRequest}>
          Request an Agent <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function BlockHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div>
      <div className="font-display text-lg text-slate">{title}</div>
      <div className="text-xs text-slate-4 mt-0.5">{caption}</div>
    </div>
  );
}
