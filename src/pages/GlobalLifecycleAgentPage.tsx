import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Clock,
  ArrowRight,
  Play,
  Loader2,
  Lock,
  FileCheck2,
  ChevronRight,
} from "lucide-react";

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
  employee: ScenarioEmployee;
  summary: {
    status: ControlStatus;
    reason: string;
  };
  readiness: ReadinessCheck[];
  gates: Gate[];
  actions: PreparedAction[];
  trail: TrailEntry[];
}

const SCENARIOS: Scenario[] = [
  /* =========================================================
   * TERMINATION 1 — Voluntary Termination — Ready
   * ========================================================= */
  {
    id: "term-ready",
    event: "Termination",
    label: "Voluntary Termination — Ready",
    one_liner:
      "Standard voluntary exit with clean dates, resolved PTO, payroll ready, and approved communication timing.",
    employee: {
      name: "Marcus Chen",
      title: "Senior Account Executive",
      department: "Revenue",
      location: "Austin, TX",
      manager: "Priya Natarajan",
      eventDate: "Final working day · Dec 12, 2026",
      employmentType: "Full-time · Salaried",
      separationType: "Voluntary resignation · Standard path",
      ptoNote: "3.2 days remaining · within payout policy",
      payrollNote: "Final payroll aligned to next regular cycle",
      contextNote: "Standard 14-day notice on file. No retention or sensitivity flags.",
    },
    summary: {
      status: "Ready",
      reason:
        "Termination event is ready to progress. Payroll resolution, PTO payout handling, and communication timing are all cleared.",
    },
    readiness: [
      { label: "Termination date / final working day integrity", status: "Passed", detail: "Final working day Dec 12, 2026 confirmed by manager" },
      { label: "Separation type / control path", status: "Passed", detail: "Voluntary · standard control path assigned" },
      { label: "PTO payout / leave policy check", status: "Passed", detail: "3.2 days within standard payout threshold" },
      { label: "Final payroll readiness status", status: "Passed", detail: "Aligned to regular cycle ending Dec 15" },
      { label: "Departure context captured", status: "Passed", detail: "No sensitivity flags · standard notice on file" },
      { label: "HR approval status", status: "Passed", detail: "Approved by HR Business Partner Dec 1" },
      { label: "Communication / handoff readiness", status: "Passed", detail: "Manager and team handoff plan acknowledged" },
    ],
    gates: [
      { label: "Final HR Approval Gate", status: "Passed", reason: "HRBP approval received Dec 1", blocking: false },
      { label: "Payroll Resolution Gate", status: "Passed", reason: "Final payroll aligned and ready for release", blocking: false },
      { label: "Communication Timing Gate", status: "Passed", reason: "Timing approved by manager and HRBP", blocking: false },
    ],
    actions: [
      { label: "Draft termination communication", actionClass: "Communication", status: "Ready to Release", detail: "Manager-authored draft cleared for release" },
      { label: "Prepare manager handoff instructions", actionClass: "Coordination", status: "Ready to Release", detail: "Account and pipeline handoff documented" },
      { label: "Queue calendar cleanup reminder", actionClass: "Coordination", status: "Prepared", detail: "Scheduled for final working day" },
      { label: "Flag equipment return owner", actionClass: "Control-status", status: "Prepared", detail: "Owner assigned · standard return window" },
    ],
    trail: [
      { time: "09:14", text: "Termination event received from BambooHR" },
      { time: "09:14", text: "Control path assigned: voluntary · standard" },
      { time: "09:14", text: "PTO payout rule evaluated — within policy" },
      { time: "09:15", text: "Final payroll readiness confirmed for cycle ending Dec 15" },
      { time: "09:15", text: "HR approval validated · communication timing cleared" },
      { time: "09:15", text: "Event marked ready for release", emphasis: "info" },
    ],
  },

  /* =========================================================
   * TERMINATION 2 — Final Pay / PTO Conflict
   * ========================================================= */
  {
    id: "term-pto",
    event: "Termination",
    label: "Termination — Final Pay / PTO Conflict",
    one_liner:
      "Final payroll and PTO payout cannot be cleanly resolved without payroll approval — release is held.",
    employee: {
      name: "Elena Voss",
      title: "Engineering Manager",
      department: "Product Engineering",
      location: "Berlin, DE",
      manager: "Tom Hwang",
      eventDate: "Final working day · Jan 9, 2027",
      employmentType: "Full-time · Salaried",
      separationType: "Voluntary resignation · Standard path",
      ptoNote: "Carried balance exceeds standard payout threshold",
      payrollNote: "Final pay date falls outside the configured payroll window",
      contextNote: "Manager acknowledged. Off-cycle final pay treatment required.",
    },
    summary: {
      status: "Held",
      reason:
        "Termination remains held until final payroll resolution is complete and PTO payout handling is approved.",
    },
    readiness: [
      { label: "Termination date / final working day integrity", status: "Passed", detail: "Final working day Jan 9, 2027 confirmed" },
      { label: "Separation type / control path", status: "Passed", detail: "Voluntary · standard control path assigned" },
      { label: "PTO payout / leave policy check", status: "Failed", detail: "Carried balance exceeds standard payout threshold" },
      { label: "Final payroll readiness status", status: "Pending", detail: "Final pay date falls outside configured pay window" },
      { label: "Departure context captured", status: "Passed", detail: "Standard notice on file · no sensitivity flags" },
      { label: "HR approval status", status: "Passed", detail: "Approved by HRBP Dec 18" },
      { label: "Communication / handoff readiness", status: "Pending", detail: "Held pending payroll resolution" },
    ],
    gates: [
      { label: "Payroll Resolution Gate", status: "Blocking", reason: "Payroll Lead approval required for off-cycle final pay and elevated PTO payout", blocking: true },
      { label: "Final HR Approval Gate", status: "Passed", reason: "HRBP approval already received", blocking: false },
      { label: "Communication Timing Gate", status: "Pending", reason: "Cannot release communication until payroll resolution clears", blocking: true },
    ],
    actions: [
      { label: "Draft termination communication", actionClass: "Communication", status: "Held", detail: "Held pending Payroll Resolution Gate" },
      { label: "Prepare manager handoff instructions", actionClass: "Coordination", status: "Prepared", detail: "Ready for manager review" },
      { label: "Flag equipment return owner", actionClass: "Control-status", status: "Prepared", detail: "Owner assigned · standard return window" },
      { label: "Hold release pending payroll resolution", actionClass: "Control-status", status: "Held", detail: "Hold posture applied to all outbound coordination" },
    ],
    trail: [
      { time: "10:02", text: "Termination event received from BambooHR" },
      { time: "10:02", text: "Control path assigned: voluntary · standard" },
      { time: "10:03", text: "PTO payout rule evaluated — exceeds standard threshold", emphasis: "warn" },
      { time: "10:03", text: "Final payroll readiness check pending — off-cycle final pay detected", emphasis: "warn" },
      { time: "10:03", text: "Payroll Resolution Gate raised · blocking progression", emphasis: "critical" },
      { time: "10:04", text: "Communication release held pending payroll resolution" },
    ],
  },

  /* =========================================================
   * TERMINATION 3 — Sensitive Offboarding Control Conflict
   * ========================================================= */
  {
    id: "term-sensitive",
    event: "Termination",
    label: "Termination — Sensitive Offboarding Control Conflict",
    one_liner:
      "Sensitive separation path with multiple unresolved control conditions — escalated.",
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

  /* =========================================================
   * NEW HIRE 1 — Standard New Hire — Ready
   * ========================================================= */
  {
    id: "hire-ready",
    event: "New Hire",
    label: "Standard New Hire — Ready",
    one_liner:
      "Clean new hire with aligned PTO setup, payroll readiness confirmed, manager ready, and approvals complete.",
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

  /* =========================================================
   * NEW HIRE 2 — PTO / Workforce Policy Configuration Mismatch
   * ========================================================= */
  {
    id: "hire-policy",
    event: "New Hire",
    label: "New Hire — PTO / Workforce Policy Configuration Mismatch",
    one_liner:
      "Employee record is present, but the PTO/workforce policy for this location and role is misaligned.",
    employee: {
      name: "Rafael Mendes",
      title: "Field Operations Lead",
      department: "Operations",
      location: "São Paulo, BR",
      manager: "Hannah Iwu",
      eventDate: "Start date · Jan 12, 2027",
      employmentType: "Full-time · Salaried",
      ptoNote: "Assigned PTO policy does not match BR Field role profile",
      payrollNote: "Payroll onboarding readiness impacted by policy mismatch",
      contextNote: "Manager pre-boarding outstanding. Policy correction required before release.",
    },
    summary: {
      status: "Action Required",
      reason:
        "New hire cannot progress until PTO policy configuration is corrected and payroll readiness is revalidated.",
    },
    readiness: [
      { label: "Employee record complete", status: "Passed", detail: "All required fields populated" },
      { label: "Department / location / start-date integrity", status: "Passed", detail: "Operations · São Paulo · Jan 12, 2027" },
      { label: "PTO policy assigned and aligned", status: "Failed", detail: "Policy assigned does not match BR Field role profile" },
      { label: "Payroll onboarding readiness status", status: "Pending", detail: "Cannot finalize until policy mismatch is corrected" },
      { label: "Manager readiness", status: "Warning", detail: "Manager pre-boarding acknowledgement outstanding" },
      { label: "Required approvals complete", status: "Passed", detail: "Standard approval path · no exception" },
    ],
    gates: [
      { label: "HR Ops Policy Configuration Gate", status: "Blocking", reason: "PTO/workforce policy for BR Field role must be corrected", blocking: true },
      { label: "Manager Readiness Gate", status: "Open", reason: "Manager pre-boarding acknowledgement pending", blocking: false },
      { label: "Start-Date Release Rule", status: "Pending", reason: "Cannot evaluate until policy correction is complete", blocking: true },
    ],
    actions: [
      { label: "Draft Teams welcome message", actionClass: "Communication", status: "Held", detail: "Held pending HR Ops Policy Configuration Gate" },
      { label: "Draft manager kickoff email", actionClass: "Communication", status: "Held", detail: "Held pending policy correction" },
      { label: "Create first-week calendar hold", actionClass: "Coordination", status: "Prepared", detail: "Prepared but not releasable until release rule clears" },
      { label: "Hold release pending policy correction", actionClass: "Control-status", status: "Held", detail: "Hold posture applied across coordination" },
    ],
    trail: [
      { time: "13:05", text: "New hire event received from BambooHR" },
      { time: "13:05", text: "Control path assigned: standard new hire · field" },
      { time: "13:06", text: "Policy configuration mismatch detected for BR Field role", emphasis: "warn" },
      { time: "13:06", text: "HR Ops Policy Configuration Gate raised · blocking progression", emphasis: "critical" },
      { time: "13:06", text: "Payroll onboarding readiness check held pending policy correction", emphasis: "warn" },
      { time: "13:07", text: "Communication release held across all coordination actions" },
    ],
  },

  /* =========================================================
   * NEW HIRE 3 — Exception Approval Required
   * ========================================================= */
  {
    id: "hire-exception",
    event: "New Hire",
    label: "New Hire — Exception Approval Required",
    one_liner:
      "Hire is structurally ready, but a compensation threshold exception requires approval before release.",
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


interface Props {
  setPage: (p: string) => void;
}

export default function GlobalLifecycleAgentPage({ setPage }: Props) {
  const [event, setEvent] = useState<"Termination" | "New Hire">("Termination");
  const [selectedId, setSelectedId] = useState<string>("term-ready");
  const [result, setResult] = useState<Scenario | null>(SCENARIOS[0]);
  const [loading, setLoading] = useState(false);

  const visibleScenarios = useMemo(
    () => SCENARIOS.filter((s) => s.event === event),
    [event]
  );

  const selectedScenario =
    SCENARIOS.find((s) => s.id === selectedId) ?? visibleScenarios[0];

  const handleEventChange = (val: string) => {
    const v = val as "Termination" | "New Hire";
    setEvent(v);
    const first = SCENARIOS.find((s) => s.event === v);
    if (first) setSelectedId(first.id);
    setResult(null);
  };

  const runAgent = () => {
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      setResult(selectedScenario);
      setLoading(false);
    }, 900);
  };

  return (
    <main className="bg-paper min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate text-white">
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-200/90 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              Global Lifecycle Agent
              <span className="opacity-50">·</span>
              BambooHR Edition
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight">
              Control high-impact workforce events before they create downstream risk.
            </h1>
            <p className="mt-6 text-lg text-slate-200/85 leading-relaxed max-w-xl">
              When BambooHR records a new hire or termination, UnfoldHRAI determines
              whether the event is operationally ready to progress, applies policy-aware
              gates and approvals, and prepares the next actions that follow.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => document.getElementById("agent-workspace")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Agent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={() => document.getElementById("agent-workspace")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Control Scenarios
              </Button>
            </div>
          </div>

          {/* Hero product preview */}
          <div className="lg:col-span-6">
            <HeroPreviewCard />
          </div>
        </div>
      </section>

      {/* WHAT THE AGENT DOES */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-3">How it works</div>
            <h2 className="font-display text-3xl md:text-4xl text-slate leading-tight">
              A control layer for the events that matter most.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Ingest the workforce event",
                d: "BambooHR records a new hire or termination.",
              },
              {
                n: "02",
                t: "Evaluate control & readiness",
                d: "UnfoldHRAI applies event data, configured policy logic, and readiness context to determine whether the event should progress.",
              },
              {
                n: "03",
                t: "Prepare next actions",
                d: "The agent flags what is blocked, what requires approval, and what communications or coordination actions should be prepared next.",
              },
            ].map((s) => (
              <Card key={s.n} className="p-7 bg-white border border-border/70">
                <div className="text-xs font-medium text-primary tracking-wider">{s.n}</div>
                <div className="mt-3 font-display text-xl text-slate leading-snug">{s.t}</div>
                <p className="mt-3 text-sm text-slate-3 leading-relaxed">{s.d}</p>
              </Card>
            ))}
          </div>

          {/* System boundary */}
          <Card className="mt-10 p-8 bg-white border border-border/70">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 mb-2">System of record</div>
                <div className="font-display text-2xl text-slate">BambooHR</div>
                <ul className="mt-5 space-y-3 text-sm text-slate-3">
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> System of record</li>
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> Employee and event source</li>
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> Lifecycle process administration</li>
                </ul>
              </div>
              <div className="md:border-l md:border-border/70 md:pl-8">
                <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2">Control layer</div>
                <div className="font-display text-2xl text-slate">UnfoldHRAI</div>
                <ul className="mt-5 space-y-3 text-sm text-slate-3">
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Readiness evaluation</li>
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Gates, approvals, and exception logic</li>
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Prepared communication & coordination actions</li>
                  <li className="flex gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Operating trail</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* WORKSPACE */}
      <section id="agent-workspace" className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2">Agent workspace</div>
              <h2 className="font-display text-3xl md:text-4xl text-slate leading-tight">
                Run a control scenario.
              </h2>
              <p className="mt-2 text-sm text-slate-3 max-w-2xl">
                Select an event and scenario, then run the Lifecycle Agent to see how control
                state, readiness, gates, and prepared actions are evaluated.
              </p>
            </div>
            <div className="text-xs text-slate-4">Synthetic demo data · No live system access</div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* LEFT: Scenario panel */}
            <Card className="lg:col-span-4 bg-white border border-border/70 p-6 h-fit lg:sticky lg:top-6">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-4 mb-3">
                Workforce event
              </div>
              <Tabs value={event} onValueChange={handleEventChange}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="Termination">Termination</TabsTrigger>
                  <TabsTrigger value="New Hire">New Hire</TabsTrigger>
                </TabsList>

                <TabsContent value={event} className="mt-5 space-y-2">
                  {visibleScenarios.map((s) => {
                    const active = s.id === selectedId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedId(s.id); setResult(null); }}
                        className={`w-full text-left rounded-lg border px-4 py-3 transition ${
                          active
                            ? "border-primary bg-accent"
                            : "border-border/70 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="text-sm font-medium text-slate leading-snug">{s.label}</div>
                        <div className="mt-1 text-xs text-slate-4 leading-relaxed">
                          {s.one_liner}
                        </div>
                      </button>
                    );
                  })}
                </TabsContent>
              </Tabs>

              {selectedScenario && (
                <>
                  <Separator className="my-6" />
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-4 mb-3">
                    Event summary
                  </div>
                  <div className="rounded-lg border border-border/70 bg-paper/60 p-4 space-y-1.5">
                    <div className="font-display text-base text-slate">
                      {selectedScenario.employee.name}
                    </div>
                    <div className="text-xs text-slate-3">
                      {selectedScenario.employee.title} · {selectedScenario.employee.department}
                    </div>
                    <div className="text-xs text-slate-4">{selectedScenario.employee.location}</div>
                    <div className="text-xs text-slate-4">{selectedScenario.employee.eventDate}</div>
                    <div className="text-xs text-slate-4">Manager: {selectedScenario.employee.manager}</div>
                    <div className="pt-2 mt-2 border-t border-border/60 space-y-1 text-[11px] text-slate-4">
                      <div><span className="text-slate-3 font-medium">Employment:</span> {selectedScenario.employee.employmentType}</div>
                      {selectedScenario.employee.separationType && (
                        <div><span className="text-slate-3 font-medium">Separation:</span> {selectedScenario.employee.separationType}</div>
                      )}
                      {selectedScenario.employee.exceptionType && (
                        <div><span className="text-slate-3 font-medium">Exception:</span> {selectedScenario.employee.exceptionType}</div>
                      )}
                      <div><span className="text-slate-3 font-medium">PTO:</span> {selectedScenario.employee.ptoNote}</div>
                      <div><span className="text-slate-3 font-medium">Payroll:</span> {selectedScenario.employee.payrollNote}</div>
                      <div className="italic">{selectedScenario.employee.contextNote}</div>
                    </div>
                  </div>
                </>
              )}

              <Button
                onClick={runAgent}
                disabled={loading}
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running…</>
                ) : (
                  <><Play className="mr-2 h-4 w-4" /> Run Lifecycle Agent</>
                )}
              </Button>
            </Card>

            {/* RIGHT: Results workspace */}
            <div className="lg:col-span-8 space-y-6">
              {loading && <LoadingShell />}
              {!loading && !result && <EmptyShell />}
              {!loading && result && <ResultsWorkspace scenario={result} />}
            </div>
          </div>
        </div>
      </section>

      {/* BOUNDARY */}
      <section className="py-20 lg:py-24 bg-paper-2/60 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-3">Product boundary</div>
            <h2 className="font-display text-3xl md:text-4xl text-slate leading-tight">
              Where BambooHR ends — and UnfoldHRAI begins.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white border border-border/70">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 mb-2">BambooHR</div>
              <div className="font-display text-2xl text-slate">System of record</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-3">
                <li className="flex gap-3"><FileCheck2 className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> Records the workforce event</li>
                <li className="flex gap-3"><FileCheck2 className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> Stores employee and employment data</li>
                <li className="flex gap-3"><FileCheck2 className="h-4 w-4 mt-0.5 text-slate-4 shrink-0" /> Manages lifecycle process steps and HR workflows</li>
              </ul>
            </Card>
            <Card className="p-8 bg-white border border-primary/30 ring-1 ring-primary/10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2">UnfoldHRAI</div>
              <div className="font-display text-2xl text-slate">Control layer</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-3">
                <li className="flex gap-3"><ShieldAlert className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Evaluates workforce event control & readiness</li>
                <li className="flex gap-3"><Lock className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Applies policy-aware holds, approvals, and exception logic</li>
                <li className="flex gap-3"><FileCheck2 className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Prepares communication and coordination actions</li>
                <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Records the operating trail</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h3 className="font-display text-2xl md:text-3xl text-slate leading-tight">
            Need a workforce event control agent for a different workflow?
          </h3>
          <p className="mt-3 text-sm text-slate-3">
            Request an agent for your environment.
          </p>
          <div className="mt-7">
            <Button size="lg" className="bg-slate hover:bg-slate-2 text-white" onClick={() => setPage("contact")}>
              Request an Agent <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Sub-components ---------- */

function HeroPreviewCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-emerald-400/10 blur-2xl rounded-3xl" />
      <Card className="relative bg-white text-slate border border-white/10 shadow-2xl rounded-2xl p-6 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-4">Event</div>
            <div className="font-display text-lg text-slate leading-tight">Termination · Voluntary</div>
          </div>
          <StatusPill status="Ready" />
        </div>

        <div className="rounded-lg border border-border/70 bg-paper/60 px-4 py-3 text-xs text-slate-3">
          Marcus Chen · Senior Account Executive · Effective Dec 12, 2026
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-4 mb-2">Readiness</div>
          <ul className="space-y-2 text-sm text-slate-2">
            {[
              "Notice period satisfied",
              "Final pay aligned to policy",
              "PTO balance reconciled",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/70 bg-paper/60 p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-4 mb-1">Gate</div>
            <div className="text-xs text-slate-2">No active holds</div>
          </div>
          <div className="rounded-lg border border-border/70 bg-paper/60 p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-4 mb-1">Approval</div>
            <div className="text-xs text-slate-2">Not required</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-4 mb-2">Prepared action</div>
          <div className="rounded-lg border border-border/70 bg-paper/60 p-3 flex items-center justify-between">
            <div className="text-xs text-slate-2">Departure communication — manager draft</div>
            <Badge variant="secondary" className="text-[10px]">Prepared</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

function EmptyShell() {
  return (
    <Card className="p-10 bg-white border border-dashed border-border/70 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-paper-2 flex items-center justify-center mb-4">
        <Play className="h-4 w-4 text-slate-4" />
      </div>
      <div className="font-display text-lg text-slate">No scenario run yet</div>
      <p className="mt-2 text-sm text-slate-3 max-w-md mx-auto">
        Select an event and scenario, then run the Lifecycle Agent to see the control evaluation.
      </p>
    </Card>
  );
}

function LoadingShell() {
  return (
    <Card className="p-10 bg-white border border-border/70 text-center">
      <Loader2 className="mx-auto h-5 w-5 text-primary animate-spin" />
      <div className="mt-4 font-display text-base text-slate">Evaluating workforce event…</div>
      <p className="mt-1 text-xs text-slate-4">Applying readiness checks, gates, and prepared actions</p>
    </Card>
  );
}

function ResultsWorkspace({ scenario }: { scenario: Scenario }) {
  const s = STATUS_STYLES[scenario.summary.status];
  return (
    <div className="space-y-6">
      {/* Block 1: Event Control Summary */}
      <Card className={`p-7 lg:p-8 border ${s.border} ${s.bg}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 mb-2">
              Event control summary
            </div>
            <div className="font-display text-2xl md:text-[1.65rem] text-slate leading-tight">
              {scenario.event} · {scenario.label.split("—")[1]?.trim() ?? scenario.label}
            </div>
          </div>
          <StatusPill status={scenario.summary.status} />
        </div>
        <p className="mt-4 text-sm text-slate-2 leading-relaxed max-w-3xl">
          {scenario.summary.reason}
        </p>
      </Card>

      {/* Block 2: Readiness Checks */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Readiness checks" caption="Operational conditions evaluated against policy" />
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
                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded border ${cs.bg} ${cs.text} ${cs.border}`}>
                  {c.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Block 3: Gates / Approvals / Exceptions */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Gates, approvals & exceptions" caption="What controls progression of this event" />
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
                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded border ${gs.bg} ${gs.text} ${gs.border}`}>
                  {g.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Block 4: Prepared Actions */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Prepared actions" caption="Communication, coordination, and control-status actions" />
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
              <Badge variant="outline" className={`text-[10px] shrink-0 ${ACTION_STYLES[a.status]}`}>
                {a.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* Block 5: Operating Trail */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Operating trail" caption="Concise control log of the agent's evaluation" />
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
