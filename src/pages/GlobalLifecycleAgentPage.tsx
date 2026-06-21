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

interface ReadinessCheck {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}
interface Gate {
  label: string;
  type: "Approval" | "Hold" | "Exception";
  detail: string;
}
interface PreparedAction {
  label: string;
  audience: string;
  state: "Prepared" | "Held" | "Awaiting Approval";
}
interface TrailEntry {
  time: string;
  text: string;
}

interface Scenario {
  id: string;
  event: "Termination" | "New Hire";
  label: string;
  one_liner: string;
  employee: {
    name: string;
    role: string;
    department: string;
    location: string;
    date: string;
    manager: string;
  };
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
  {
    id: "term-ready",
    event: "Termination",
    label: "Voluntary Termination — Ready",
    one_liner:
      "Standard voluntary exit with clean policy alignment and prepared coordination actions.",
    employee: {
      name: "Marcus Chen",
      role: "Senior Account Executive",
      department: "Revenue",
      location: "Austin, TX",
      date: "Effective Dec 12, 2026",
      manager: "Priya Natarajan",
    },
    summary: {
      status: "Ready",
      reason:
        "All readiness checks pass. No policy conflicts detected. Coordination actions prepared for manager review.",
    },
    readiness: [
      { label: "Notice period satisfied", status: "pass", detail: "14-day notice on file" },
      { label: "Final pay window aligned to policy", status: "pass", detail: "On next pay cycle" },
      { label: "PTO balance reconciled", status: "pass", detail: "3.2 days payout calculated" },
      { label: "Manager acknowledgement captured", status: "pass", detail: "Acknowledged Dec 1" },
    ],
    gates: [
      { label: "No active holds", type: "Approval", detail: "No gates required for this scenario" },
    ],
    actions: [
      { label: "Departure communication — manager draft", audience: "People Manager", state: "Prepared" },
      { label: "Knowledge transfer checklist", audience: "Manager + Team Lead", state: "Prepared" },
      { label: "Coordination handoff to People Ops", audience: "People Ops", state: "Prepared" },
    ],
    trail: [
      { time: "09:14", text: "Termination event received from BambooHR" },
      { time: "09:14", text: "Readiness evaluation completed — 4 of 4 checks passed" },
      { time: "09:15", text: "No gates triggered" },
      { time: "09:15", text: "Coordination actions prepared and held for manager review" },
    ],
  },
  {
    id: "term-pto",
    event: "Termination",
    label: "Termination — Final Pay / PTO Conflict",
    one_liner:
      "Final pay timing and PTO payout exceed configured policy threshold — payroll approval required.",
    employee: {
      name: "Elena Voss",
      role: "Engineering Manager",
      department: "Product Engineering",
      location: "Berlin, DE",
      date: "Effective Jan 9, 2027",
      manager: "Tom Hwang",
    },
    summary: {
      status: "Approval Required",
      reason:
        "PTO payout exceeds standard threshold and final pay date falls outside the configured window. Payroll approval is required before progression.",
    },
    readiness: [
      { label: "Notice period satisfied", status: "pass", detail: "30-day notice on file" },
      { label: "Final pay window aligned to policy", status: "warn", detail: "Falls 4 days outside policy window" },
      { label: "PTO balance reconciled", status: "fail", detail: "Payout exceeds €5,000 threshold" },
      { label: "Manager acknowledgement captured", status: "pass", detail: "Acknowledged Dec 18" },
    ],
    gates: [
      { label: "Payroll exception approval", type: "Approval", detail: "Required from Payroll Lead" },
      { label: "Final pay timing review", type: "Hold", detail: "Held pending finance sign-off" },
    ],
    actions: [
      { label: "Departure communication — manager draft", audience: "People Manager", state: "Held" },
      { label: "Knowledge transfer checklist", audience: "Manager + Team Lead", state: "Prepared" },
      { label: "Payroll exception request", audience: "Payroll Lead", state: "Awaiting Approval" },
    ],
    trail: [
      { time: "10:02", text: "Termination event received from BambooHR" },
      { time: "10:02", text: "Readiness evaluation flagged 2 conditions" },
      { time: "10:03", text: "Gates raised: Payroll exception approval, Final pay timing review" },
      { time: "10:03", text: "Departure communication held pending approval" },
    ],
  },
  {
    id: "term-sensitive",
    event: "Termination",
    label: "Termination — Sensitive Offboarding Control Conflict",
    one_liner:
      "Sensitive role exit requires escalated review and coordinated communications hold.",
    employee: {
      name: "Devon Pierce",
      role: "VP Finance",
      department: "Finance",
      location: "New York, NY",
      date: "Effective Dec 22, 2026",
      manager: "Sasha Bloom (CFO)",
    },
    summary: {
      status: "Escalated",
      reason:
        "Sensitive role exit. Communications and coordination actions held pending executive review and legal acknowledgement.",
    },
    readiness: [
      { label: "Notice period satisfied", status: "warn", detail: "Accelerated exit on record" },
      { label: "Sensitive role classification", status: "fail", detail: "Executive / Finance — escalation required" },
      { label: "Legal acknowledgement", status: "fail", detail: "Pending counsel sign-off" },
      { label: "Manager acknowledgement captured", status: "pass", detail: "Acknowledged Dec 15" },
    ],
    gates: [
      { label: "Executive review", type: "Approval", detail: "Required from CEO office" },
      { label: "Legal acknowledgement", type: "Hold", detail: "Counsel review in progress" },
      { label: "Communications hold", type: "Exception", detail: "All outbound comms blocked" },
    ],
    actions: [
      { label: "Internal announcement draft", audience: "Comms", state: "Held" },
      { label: "Team coordination plan", audience: "People Manager", state: "Held" },
      { label: "Legal acknowledgement request", audience: "Legal", state: "Awaiting Approval" },
    ],
    trail: [
      { time: "08:41", text: "Termination event received from BambooHR" },
      { time: "08:41", text: "Sensitive role classification detected" },
      { time: "08:42", text: "Escalation raised to executive review" },
      { time: "08:42", text: "Communications hold applied to all prepared actions" },
    ],
  },
  {
    id: "hire-ready",
    event: "New Hire",
    label: "Standard New Hire — Ready",
    one_liner: "Clean new-hire event with all readiness checks passing.",
    employee: {
      name: "Amelia Rhodes",
      role: "Product Designer",
      department: "Design",
      location: "Remote — UK",
      date: "Start date Jan 6, 2027",
      manager: "Jonas Eriksen",
    },
    summary: {
      status: "Ready",
      reason:
        "All readiness checks pass. Coordination actions prepared for manager and onboarding partner.",
    },
    readiness: [
      { label: "Offer accepted in BambooHR", status: "pass", detail: "Signed Dec 4" },
      { label: "Work eligibility on file", status: "pass", detail: "Verified" },
      { label: "Start date aligned to pay cycle", status: "pass", detail: "Pay cycle Jan 1–15" },
      { label: "Manager pre-boarding acknowledged", status: "pass", detail: "Acknowledged Dec 6" },
    ],
    gates: [
      { label: "No active holds", type: "Approval", detail: "No gates required for this scenario" },
    ],
    actions: [
      { label: "Welcome communication — manager draft", audience: "People Manager", state: "Prepared" },
      { label: "Day-1 coordination plan", audience: "Onboarding Partner", state: "Prepared" },
      { label: "Team intro brief", audience: "Team Lead", state: "Prepared" },
    ],
    trail: [
      { time: "11:20", text: "New hire event received from BambooHR" },
      { time: "11:20", text: "Readiness evaluation completed — 4 of 4 checks passed" },
      { time: "11:21", text: "Coordination actions prepared and held for manager review" },
    ],
  },
  {
    id: "hire-policy",
    event: "New Hire",
    label: "New Hire — PTO / Workforce Policy Configuration Mismatch",
    one_liner:
      "Configured PTO accrual policy for this location does not match the new-hire profile.",
    employee: {
      name: "Rafael Mendes",
      role: "Field Operations Lead",
      department: "Operations",
      location: "São Paulo, BR",
      date: "Start date Jan 12, 2027",
      manager: "Hannah Iwu",
    },
    summary: {
      status: "Action Required",
      reason:
        "PTO accrual policy for São Paulo does not match this role profile. HR Ops review required before progression.",
    },
    readiness: [
      { label: "Offer accepted in BambooHR", status: "pass", detail: "Signed Dec 9" },
      { label: "Work eligibility on file", status: "pass", detail: "Verified" },
      { label: "PTO policy configuration", status: "fail", detail: "Location/role mismatch detected" },
      { label: "Manager pre-boarding acknowledged", status: "warn", detail: "Pending acknowledgement" },
    ],
    gates: [
      { label: "HR Ops policy review", type: "Hold", detail: "Required before pre-boarding can progress" },
    ],
    actions: [
      { label: "Welcome communication — manager draft", audience: "People Manager", state: "Held" },
      { label: "HR Ops review request", audience: "HR Ops", state: "Awaiting Approval" },
      { label: "Day-1 coordination plan", audience: "Onboarding Partner", state: "Held" },
    ],
    trail: [
      { time: "13:05", text: "New hire event received from BambooHR" },
      { time: "13:05", text: "Policy configuration mismatch detected" },
      { time: "13:06", text: "HR Ops review requested" },
      { time: "13:06", text: "Coordination actions held pending review" },
    ],
  },
  {
    id: "hire-exception",
    event: "New Hire",
    label: "New Hire — Exception Approval Required",
    one_liner:
      "Off-cycle start date and non-standard compensation profile require leadership approval.",
    employee: {
      name: "Priya Kumar",
      role: "Director, Data Platform",
      department: "Engineering",
      location: "Toronto, CA",
      date: "Start date Dec 30, 2026",
      manager: "Will Okafor",
    },
    summary: {
      status: "Approval Required",
      reason:
        "Off-cycle start and non-standard compensation profile require Talent + Finance approval.",
    },
    readiness: [
      { label: "Offer accepted in BambooHR", status: "pass", detail: "Signed Dec 11" },
      { label: "Work eligibility on file", status: "pass", detail: "Verified" },
      { label: "Start date aligned to pay cycle", status: "warn", detail: "Off-cycle by 7 days" },
      { label: "Compensation profile", status: "fail", detail: "Outside standard band" },
    ],
    gates: [
      { label: "Talent leadership approval", type: "Approval", detail: "Required from VP Talent" },
      { label: "Finance approval", type: "Approval", detail: "Required from FP&A" },
    ],
    actions: [
      { label: "Welcome communication — manager draft", audience: "People Manager", state: "Held" },
      { label: "Talent approval request", audience: "VP Talent", state: "Awaiting Approval" },
      { label: "Finance approval request", audience: "FP&A", state: "Awaiting Approval" },
    ],
    trail: [
      { time: "15:48", text: "New hire event received from BambooHR" },
      { time: "15:48", text: "Off-cycle start and non-standard comp flagged" },
      { time: "15:49", text: "Approvals routed to VP Talent and FP&A" },
      { time: "15:49", text: "Coordination actions held pending approvals" },
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

function CheckIcon({ status }: { status: "pass" | "warn" | "fail" }) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />;
  if (status === "warn") return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
  return <ShieldAlert className="h-4 w-4 text-red-600 shrink-0" />;
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
                        onClick={() => setSelectedId(s.id)}
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
                      {selectedScenario.employee.role} · {selectedScenario.employee.department}
                    </div>
                    <div className="text-xs text-slate-4">{selectedScenario.employee.location}</div>
                    <div className="text-xs text-slate-4">{selectedScenario.employee.date}</div>
                    <div className="text-xs text-slate-4">Manager: {selectedScenario.employee.manager}</div>
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
          {scenario.readiness.map((c) => (
            <li key={c.label} className="py-3 flex items-start gap-3">
              <CheckIcon status={c.status} />
              <div className="flex-1">
                <div className="text-sm text-slate font-medium">{c.label}</div>
                <div className="text-xs text-slate-4 mt-0.5">{c.detail}</div>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-medium ${
                c.status === "pass" ? "text-emerald-700" : c.status === "warn" ? "text-amber-700" : "text-red-700"
              }`}>
                {c.status === "pass" ? "Pass" : c.status === "warn" ? "Review" : "Fail"}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Block 3: Gates / Approvals / Exceptions */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Gates, approvals & exceptions" caption="What is currently blocking progression" />
        <ul className="mt-5 space-y-3">
          {scenario.gates.map((g) => (
            <li key={g.label} className="flex items-start gap-3 rounded-lg border border-border/70 bg-paper/40 px-4 py-3">
              {g.type === "Approval" ? (
                <Lock className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              ) : g.type === "Hold" ? (
                <Clock className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              )}
              <div className="flex-1">
                <div className="text-sm text-slate font-medium">{g.label}</div>
                <div className="text-xs text-slate-4 mt-0.5">{g.detail}</div>
              </div>
              <Badge variant="outline" className="text-[10px] border-border/70">
                {g.type}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* Block 4: Prepared Actions */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Prepared actions" caption="Coordination and communication actions held for review" />
        <ul className="mt-5 space-y-2">
          {scenario.actions.map((a) => (
            <li
              key={a.label}
              className="flex items-center gap-3 rounded-lg border border-border/70 bg-white px-4 py-3"
            >
              <div className="flex-1">
                <div className="text-sm text-slate font-medium">{a.label}</div>
                <div className="text-xs text-slate-4 mt-0.5">For: {a.audience}</div>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  a.state === "Prepared"
                    ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                    : a.state === "Held"
                    ? "border-slate-200 text-slate-700 bg-slate-50"
                    : "border-blue-200 text-blue-700 bg-blue-50"
                }`}
              >
                {a.state}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      {/* Block 5: Operating Trail */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Operating trail" caption="Audit-style record of the agent's evaluation" />
        <ol className="mt-5 relative border-l border-border/70 ml-2">
          {scenario.trail.map((t, i) => (
            <li key={i} className="ml-4 pb-4 last:pb-0">
              <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-primary" />
              <div className="text-xs text-slate-4">{t.time}</div>
              <div className="text-sm text-slate mt-0.5">{t.text}</div>
            </li>
          ))}
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
