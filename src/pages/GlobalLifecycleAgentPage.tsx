import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  UserPlus,
  UserMinus,
  Wallet,
  Users,
  MessageSquare,
  Workflow,
  FileCheck,
} from "lucide-react";
import { LifecycleRunOverlay } from "@/components/agent/LifecycleRunOverlay";
import AgentPageNav from "@/components/AgentPageNav";
import {
  GLOBAL_LIFECYCLE_SCENARIOS,
  type LifecycleScenario,
  type LifecycleVerdict,
  type WorkstreamDomain,
} from "@/data/globalLifecycleScenarios";

/* ---------- shared verdict styling ---------- */
const VERDICT_STYLES: Record<
  LifecycleVerdict,
  { dot: string; text: string; bg: string; border: string; chip: string; headline: string; icon: typeof CheckCircle2 }
> = {
  Ready: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    chip: "border-emerald-200 text-emerald-700 bg-emerald-50",
    headline: "Ready to progress",
    icon: CheckCircle2,
  },
  "Approval Required": {
    dot: "bg-blue-500",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    chip: "border-blue-200 text-blue-700 bg-blue-50",
    headline: "Approval required to release",
    icon: AlertTriangle,
  },
  Held: {
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    chip: "border-red-200 text-red-700 bg-red-50",
    headline: "Held for control review",
    icon: ShieldAlert,
  },
};

function VerdictPill({ status }: { status: LifecycleVerdict }) {
  const s = VERDICT_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
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

  const selected =
    GLOBAL_LIFECYCLE_SCENARIOS.find((s) => s.id === selectedId) ?? null;

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

  const startRun = () => setStage("running");

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
          <div className="mb-6">
            <AgentPageNav setPage={setPage} variant="light" />
          </div>
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
                Workforce events ingested from BambooHR are queued here for
                control &amp; readiness evaluation. Open an event to review and
                run the agent.
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
              <span className="text-sm text-white/90">
                {selected.employee.name}
              </span>
              <span className="text-slate-400/60">·</span>
              <span className="text-xs text-blue-200/70">
                {selected.eventType}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Stage content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {stage === "queue" && <QueueStage onOpen={openEvent} />}
          {(stage === "launch" || stage === "running") && selected && (
            <LaunchStage
              scenario={selected}
              onBack={goQueue}
              onRun={startRun}
              running={stage === "running"}
            />
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
          steps={selected.runSteps}
          eventLabel={selected.eventType}
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
  // Group by event type, termination first so the heaviest event leads.
  const terminationItems = GLOBAL_LIFECYCLE_SCENARIOS.filter(
    (s) => s.eventType === "Termination"
  );
  const hireItems = GLOBAL_LIFECYCLE_SCENARIOS.filter(
    (s) => s.eventType === "New Hire"
  );

  const groups = [
    {
      type: "offboarding" as const,
      title: "Employee Offboarding",
      icon: UserMinus,
      items: terminationItems,
    },
    {
      type: "onboarding" as const,
      title: "New Hire Onboarding",
      icon: UserPlus,
      items: hireItems,
    },
  ];

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
          <span className="font-mono">
            {GLOBAL_LIFECYCLE_SCENARIOS.length} events queued
          </span>{" "}
          · synthetic demo data
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
                <QueueCard
                  key={s.id}
                  scenario={s}
                  onOpen={() => onOpen(s.id)}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function QueueCard({
  scenario,
  onOpen,
}: {
  scenario: LifecycleScenario;
  onOpen: () => void;
}) {
  const v = VERDICT_STYLES[scenario.queueStatus];
  const isTerm = scenario.eventType === "Termination";

  return (
    <button
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
        isTerm
          ? "border-red-200 bg-white p-6 hover:-translate-y-px hover:shadow-[0_22px_60px_-22px_rgba(220,38,38,0.45)] ring-1 ring-red-100/70"
          : "border-border/70 bg-white p-6 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(43,92,230,0.35)] hover:-translate-y-px"
      }`}
    >
      {isTerm && (
        <div
          className="absolute inset-0 pointer-events-none opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(220,38,38,0.06), transparent 60%)",
          }}
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-display ring-1 ${
              isTerm
                ? "bg-red-50 text-red-700 ring-red-200"
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

      <div className="relative mt-4">
        <div className="text-sm font-medium text-slate leading-snug">
          {scenario.queueTitle}
        </div>
        <p className="mt-1 text-xs text-slate-3 leading-relaxed">
          {scenario.queueSummary}
        </p>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wider ${v.chip}`}
        >
          <span className={`h-1 w-1 rounded-full ${v.dot}`} />
          {scenario.queueStatus}
        </span>
        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
          Open event{" "}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

/* ============================================================
 * STAGE 2 — LAUNCH
 * ============================================================ */
function LaunchStage({
  scenario,
  onBack,
  onRun,
  running,
}: {
  scenario: LifecycleScenario;
  onBack: () => void;
  onRun: () => void;
  running: boolean;
}) {
  const e = scenario.employee;
  const isTerm = scenario.eventType === "Termination";
  const isHeld = scenario.verdict === "Held";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {isHeld && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 flex items-center gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
          <div className="text-sm text-amber-900">
            <span className="font-medium">Held for control review.</span>{" "}
            Communications and offboarding coordination are held pending review.
          </div>
        </div>
      )}

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
                <span className="text-primary">
                  {isTerm ? "Employee Offboarding" : "New Hire Onboarding"}
                </span>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg ring-1 ${
                    isTerm
                      ? "bg-red-50 text-red-700 ring-red-200"
                      : "bg-blue-50 text-blue-700 ring-blue-200"
                  }`}
                >
                  {initialsOf(e.name)}
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-3xl text-slate leading-tight">
                    {e.name}
                  </h1>
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

              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
                  {scenario.launchTitle}
                </div>
                <p className="mt-2 text-sm text-slate-2 leading-relaxed">
                  {scenario.launchEventSummary}
                </p>
                <p className="mt-2 text-sm text-slate-3 italic leading-relaxed">
                  {scenario.eventSummary}
                </p>
              </div>

              {scenario.preRunNotes.length > 0 && (
                <div className="mt-6 rounded-xl border border-border/70 bg-paper/50 p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
                    Known flags / pre-run notes
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {scenario.preRunNotes.map((n) => (
                      <li
                        key={n}
                        className="flex items-start gap-2 text-sm text-slate-2 leading-snug"
                      >
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-3/60 shrink-0" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — agent-ready / Run CTA */}
          <div className="relative flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/70 bg-gradient-to-br from-slate to-slate-2 text-white p-7 lg:p-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-blue-200/80 font-mono">
                Agent ready
              </div>
              <p className="mt-3 text-sm text-blue-100/90 leading-relaxed">
                I'll evaluate this{" "}
                {scenario.eventType.toLowerCase()} against worker record
                integrity, payroll readiness, approvals, and release conditions —
                and surface anything that needs your attention.
              </p>

              <div className="mt-5 space-y-2">
                {scenario.evaluationFocus.map((f) => (
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
 * STAGE 3 — RESULTS (5-part verdict-driven model)
 * ============================================================ */
const WORKSTREAM_META: Record<
  WorkstreamDomain,
  { icon: typeof Wallet; caption: string }
> = {
  Payroll: { icon: Wallet, caption: "Pay & comp handling" },
  "Manager / HRBP": { icon: Users, caption: "Manager & HRBP coordination" },
  "Employee Communications": {
    icon: MessageSquare,
    caption: "Drafts & messages",
  },
  "Systems Coordination": {
    icon: Workflow,
    caption: "Access, calendars, handoffs",
  },
  "Documentation / Audit": {
    icon: FileCheck,
    caption: "Audit trail & operating record",
  },
};

function ResultsStage({
  scenario,
  onBack,
  onRequest,
}: {
  scenario: LifecycleScenario;
  onBack: () => void;
  onRequest: () => void;
}) {
  const v = VERDICT_STYLES[scenario.verdict];
  const VerdictIcon = v.icon;
  const e = scenario.employee;
  const hasBlockers = scenario.blockingConditions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* 1 — Control Verdict (dominant) */}
      <Card
        id="lifecycle-outcome"
        className={`relative overflow-hidden p-7 lg:p-9 border-2 ${v.border} ${v.bg}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-4 font-mono">
            Control verdict · {scenario.eventType} · {e.name}
          </div>
          <VerdictPill status={scenario.verdict} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <VerdictIcon className={`h-7 w-7 ${v.text}`} />
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-slate tracking-tight">
            {v.headline}
          </h2>
        </div>

        <p className="mt-4 text-base text-slate-2 leading-relaxed max-w-3xl">
          {scenario.verdictSummary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-3">
          <span className="font-medium text-slate">{e.name}</span>
          <span className="opacity-50">·</span>
          <span>
            {e.title} · {e.department}
          </span>
          <span className="opacity-50">·</span>
          <span className="font-mono">{e.eventDate}</span>
        </div>
      </Card>

      {/* 2 — Why */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader title="Why" caption="Top reasons the verdict was reached" />
        <ul className="mt-4 space-y-2.5">
          {scenario.topReasons.map((r) => (
            <li key={r} className="flex items-start gap-2.5">
              <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span className="text-sm text-slate-2 leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3 — Blocking Conditions */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader
          title="Blocking conditions"
          caption={
            hasBlockers
              ? "Conditions that must clear before release"
              : "Conditions preventing release"
          }
        />
        {hasBlockers ? (
          <ul className="mt-4 space-y-2">
            {scenario.blockingConditions.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2"
              >
                <Lock className="h-4 w-4 mt-0.5 text-amber-700 shrink-0" />
                <span className="text-sm text-slate leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="text-sm text-slate">
              <span className="font-medium">
                No active blocking conditions.
              </span>{" "}
              <span className="text-slate-3">
                Cleared for release on schedule.
              </span>
            </span>
          </div>
        )}
      </Card>

      {/* 4 — Prepared workstreams */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader
          title="Prepared workstreams"
          caption="Operational actions prepared and grouped by domain — subordinate to the control verdict"
        />
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {scenario.preparedWorkstreams.map((w) => {
            const meta = WORKSTREAM_META[w.domain];
            const Icon = meta.icon;
            return (
              <div
                key={w.domain}
                className="rounded-xl border border-border/70 bg-paper/40 p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="text-sm font-display text-slate">
                    {w.domain}
                  </div>
                </div>
                <div className="text-[11px] text-slate-4 mt-0.5">
                  {meta.caption}
                </div>
                <ul className="mt-3 space-y-2">
                  {w.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border/60 bg-white px-2.5 py-2 text-[13px] text-slate leading-snug"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 5 — Human accountability */}
      <Card className="p-6 bg-white border border-border/70">
        <BlockHeader
          title="Human accountability"
          caption="Who must approve, review, and release"
        />
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <AccountabilityColumn
            label="Must approve"
            items={scenario.humanAccountability.mustApprove}
            emptyText="No additional approval required"
          />
          <AccountabilityColumn
            label="Must review"
            items={scenario.humanAccountability.mustReview}
            emptyText="No additional review required"
          />
          <AccountabilityColumn
            label="Can release"
            items={scenario.humanAccountability.canRelease}
            emptyText="—"
          />
        </div>
      </Card>

      {/* Closing actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to queue
        </Button>
        <Button
          className="bg-slate hover:bg-slate-2 text-white"
          onClick={onRequest}
        >
          Request this agent for your team{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function AccountabilityColumn({
  label,
  items,
  emptyText,
}: {
  label: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-paper/40 p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
        {label}
      </div>
      {items.length > 0 ? (
        <ul className="mt-2 space-y-1.5">
          {items.map((i) => (
            <li
              key={i}
              className="text-sm text-slate-2 leading-snug flex items-start gap-2"
            >
              <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-3/60 shrink-0" />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 text-sm text-slate-4 italic">{emptyText}</div>
      )}
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
