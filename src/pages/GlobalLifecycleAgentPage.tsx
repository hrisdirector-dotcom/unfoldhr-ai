import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
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
  type WorkstreamDomain,
} from "@/data/globalLifecycleScenarios";
import {
  ControlQueueCard,
  ControlQueueGroupHeader,
  ControlLaunchPanel,
  ControlResultsView,
  type WorkstreamDomainMeta,
} from "@/components/agent/controlAgent/ControlAgentFramework";
import { ArrowLeft } from "lucide-react";

interface Props {
  setPage: (p: string) => void;
}

type Stage = "queue" | "launch" | "running" | "results";

const WORKSTREAM_META: Record<WorkstreamDomain, WorkstreamDomainMeta> = {
  Payroll: { icon: Wallet },
  "Manager / HRBP": { icon: Users },
  "Employee Communications": { icon: MessageSquare },
  "Systems Coordination": { icon: Workflow },
  "Documentation / Audit": { icon: FileCheck },
};

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
      const el = document.getElementById("lifecycle-control-verdict");
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
            Workforce Event Control &amp; Readiness
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
            <ControlLaunchPanel
              scenario={selected}
              eventStreamLabel="Lifecycle Event"
              eventCategoryLabel={
                selected.eventType === "Termination"
                  ? "Employee Offboarding"
                  : "New Hire Onboarding"
              }
              runButtonLabel="Run Lifecycle Agent"
              runningLabel="Running Lifecycle Agent…"
              onBack={goQueue}
              onRun={startRun}
              running={stage === "running"}
            />
          )}
          {stage === "results" && selected && (
            <ControlResultsView
              scenario={selected}
              verdictAnchorId="lifecycle-control-verdict"
              workstreamMeta={WORKSTREAM_META}
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
          agentLabel="Global Lifecycle Agent"
        />
      )}
    </main>
  );
}

/* ============================================================
 * Queue stage (agent-specific grouping)
 * ============================================================ */
function QueueStage({ onOpen }: { onOpen: (id: string) => void }) {
  const hireItems = GLOBAL_LIFECYCLE_SCENARIOS.filter(
    (s) => s.eventType === "New Hire"
  );
  const terminationItems = GLOBAL_LIFECYCLE_SCENARIOS.filter(
    (s) => s.eventType === "Termination"
  );

  const groups = [
    {
      type: "onboarding" as const,
      title: "New Hire Onboarding",
      icon: UserPlus,
      items: hireItems,
    },
    {
      type: "offboarding" as const,
      title: "Employee Offboarding",
      icon: UserMinus,
      items: terminationItems,
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
            <ControlQueueGroupHeader
              title={g.title}
              icon={g.icon}
              count={g.items.length}
            />
            <div className="grid md:grid-cols-2 gap-5">
              {g.items.map((s) => (
                <ControlQueueCard
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
