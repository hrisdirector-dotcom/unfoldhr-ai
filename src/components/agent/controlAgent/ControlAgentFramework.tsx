/**
 * Shared Control-Agent Framework
 * ------------------------------------------------------------
 * Reusable UI primitives + composed sections shared by every
 * Control & Readiness agent (Global Lifecycle, Leave / LOA, and
 * any future siblings).
 *
 * Goal: identical product architecture and visual treatment across
 * agents while preserving agent-specific domain copy and icons.
 *
 * Canonical verdict vocabulary:
 *   "Ready" | "Approval Required" | "Held"
 *
 * Standard display headlines:
 *   Ready              → "Ready to progress"
 *   Approval Required  → "Approval required to release"
 *   Held               → "Held for control review"
 */
import { motion } from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/* ============================================================
 * Canonical types
 * ============================================================ */
export type ControlVerdict = "Ready" | "Approval Required" | "Held";

export interface ControlEmployee {
  name: string;
  title: string;
  department: string;
  location: string;
  manager: string;
  eventDate: string;
}

export interface ControlWorkstream {
  domain: string;
  items: string[];
}

export interface ControlAccountability {
  mustApprove: string[];
  mustReview: string[];
  canRelease: string[];
}

/** Minimum shared scenario shape every Control Agent must provide. */
export interface ControlScenario {
  id: string;
  eventType: string;
  queueTitle: string;
  queueStatus: ControlVerdict;
  queueSummary: string;
  employee: ControlEmployee;
  launchEventSummary: string;
  evaluationFocus: string[];
  preRunNotes: string[];
  runSteps: string[];
  verdict: ControlVerdict;
  verdictSummary: string;
  recommendedNextAction: string;
  humanReviewPosture: string;
  topReasons: string[];
  blockingConditions: string[];
  preparedWorkstreams: ControlWorkstream[];
  humanAccountability: ControlAccountability;
}

/* ============================================================
 * Shared verdict visual system
 * ============================================================ */
export const CONTROL_VERDICT_STYLES: Record<
  ControlVerdict,
  {
    dot: string;
    text: string;
    bg: string;
    border: string;
    chip: string;
    headline: string;
    icon: LucideIcon;
  }
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

export function VerdictPill({ status }: { status: ControlVerdict }) {
  const s = CONTROL_VERDICT_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ============================================================
 * Queue card
 * ============================================================ */
export function ControlQueueCard({
  scenario,
  onOpen,
}: {
  scenario: ControlScenario;
  onOpen: () => void;
}) {
  const v = CONTROL_VERDICT_STYLES[scenario.queueStatus];
  // Standardized visual emphasis rule: Held cards carry red emphasis.
  const isHeld = scenario.queueStatus === "Held";

  return (
    <button
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
        isHeld
          ? "border-red-200 bg-white p-6 hover:-translate-y-px hover:shadow-[0_22px_60px_-22px_rgba(220,38,38,0.45)] ring-1 ring-red-100/70"
          : "border-border/70 bg-white p-6 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_rgba(43,92,230,0.35)] hover:-translate-y-px"
      }`}
    >
      {isHeld && (
        <div
          className="absolute inset-0 pointer-events-none"
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
              isHeld
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
 * Queue group header
 * ============================================================ */
export function ControlQueueGroupHeader({
  title,
  icon: Icon,
  count,
}: {
  title: string;
  icon: LucideIcon;
  count: number;
}) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-3 font-mono">
      <Icon className="h-3.5 w-3.5" />
      {title}
      <span className="opacity-40">·</span>
      <span className="opacity-70">
        {count} event{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

/* ============================================================
 * Launch panel
 * ============================================================ */
export function ControlLaunchPanel({
  scenario,
  eventCategoryLabel,
  eventStreamLabel = "Lifecycle Event",
  runButtonLabel,
  runningLabel,
  onRun,
  onBack,
  running,
}: {
  scenario: ControlScenario;
  /** e.g. "New Hire Onboarding", "Return-to-Work / Extension" */
  eventCategoryLabel: string;
  /** small mono header label, e.g. "Lifecycle Event" or "Leave Event" */
  eventStreamLabel?: string;
  runButtonLabel: string;
  runningLabel: string;
  onRun: () => void;
  onBack: () => void;
  running: boolean;
}) {
  const e = scenario.employee;
  const isHeld = scenario.queueStatus === "Held";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
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
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-4 font-mono flex-wrap">
                <span>{eventStreamLabel}</span>
                <span className="opacity-50">·</span>
                <span className="text-primary">{eventCategoryLabel}</span>
                <span className="opacity-50">·</span>
                <VerdictPill status={scenario.queueStatus} />
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg ring-1 ${
                    isHeld
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

              <p className="mt-6 text-sm text-slate-2 leading-relaxed">
                {scenario.launchEventSummary}
              </p>

              {scenario.preRunNotes.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
                    Known control flags
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {scenario.preRunNotes.slice(0, 5).map((n) => (
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

          {/* RIGHT — Agent will evaluate + Run CTA */}
          <div className="relative flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/70 bg-gradient-to-br from-slate to-slate-2 text-white p-7 lg:p-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-blue-200/80 font-mono">
                Agent will evaluate
              </div>
              <div className="mt-4 space-y-2">
                {scenario.evaluationFocus.slice(0, 6).map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 text-xs text-blue-100/90"
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
                {running ? runningLabel : runButtonLabel}
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
 * Results view
 * ============================================================ */
export interface WorkstreamDomainMeta {
  icon: LucideIcon;
}

function BlockHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div>
      <div className="font-display text-lg text-slate">{title}</div>
      <div className="text-xs text-slate-4 mt-0.5">{caption}</div>
    </div>
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
    <div className="rounded-lg border border-border/70 bg-paper/40 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
        {label}
      </div>
      {items.length > 0 ? (
        <ul className="mt-1.5 space-y-1">
          {items.map((i) => (
            <li
              key={i}
              className="text-[12.5px] text-slate-2 leading-snug flex items-start gap-1.5"
            >
              <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-3/60 shrink-0" />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-1.5 text-[12.5px] text-slate-4 italic">{emptyText}</div>
      )}
    </div>
  );
}

export function ControlResultsView({
  scenario,
  verdictAnchorId,
  workstreamMeta,
  onBack,
  onRequest,
}: {
  scenario: ControlScenario;
  /** DOM id used to scroll to the verdict hero after run completes. */
  verdictAnchorId: string;
  /** Map of workstream domain key → metadata (icon). */
  workstreamMeta: Record<string, WorkstreamDomainMeta>;
  onBack: () => void;
  onRequest: () => void;
}) {
  const v = CONTROL_VERDICT_STYLES[scenario.verdict];
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
        id={verdictAnchorId}
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

        <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-3xl">
          <div className="rounded-xl border border-border/70 bg-white/70 p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
              Recommended next action
            </div>
            <div className="mt-1.5 text-sm text-slate leading-snug">
              {scenario.recommendedNextAction}
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-white/70 p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-4 font-mono">
              Human review
            </div>
            <div className="mt-1.5 text-sm text-slate leading-snug">
              {scenario.humanReviewPosture}
            </div>
          </div>
        </div>

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

      {/* 2 + 3 — Why & Blocking Conditions */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6 bg-white border border-border/70">
          <BlockHeader title="Why" caption="Top reasons the verdict was reached" />
          <ul className="mt-4 space-y-2">
            {scenario.topReasons.map((r) => (
              <li key={r} className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-slate-2 leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </Card>

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
                <span className="font-medium">No active blocking conditions.</span>{" "}
                <span className="text-slate-3">
                  Cleared for release on schedule.
                </span>
              </span>
            </div>
          )}
        </Card>
      </div>

      {/* 4 — Prepared workstreams */}
      <Card className="p-5 bg-white border border-border/70">
        <BlockHeader
          title="Prepared workstreams"
          caption="Operational actions prepared by domain — supporting the verdict"
        />
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {scenario.preparedWorkstreams.map((w) => {
            const meta = workstreamMeta[w.domain];
            const Icon = meta?.icon ?? ChevronRight;
            return (
              <div
                key={w.domain}
                className="rounded-lg border border-border/70 bg-paper/40 px-3 py-2.5"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <div className="text-[13px] font-medium text-slate leading-tight">
                    {w.domain}
                  </div>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {w.items.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-[12.5px] text-slate-2 leading-snug"
                    >
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-3/60 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 5 — Human accountability */}
      <Card className="p-5 bg-white border border-border/70">
        <BlockHeader
          title="Human accountability"
          caption="Who must approve, review, and release"
        />
        <div className="mt-3 grid md:grid-cols-3 gap-2.5">
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
