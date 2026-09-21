import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeDollarSign,
  TrendingUp,
  Layers,
  Wallet,
  Users,
  MessageSquare,
  Network,
  FileCheck,
} from "lucide-react";
import { LifecycleRunOverlay } from "@/components/agent/LifecycleRunOverlay";
import AgentPageNav from "@/components/AgentPageNav";
import {
  COMPENSATION_CHANGE_SCENARIOS,
  type CompWorkstreamDomain,
} from "@/data/compensationChangeScenarios";
import {
  ControlQueueCard,
  ControlQueueGroupHeader,
  ControlLaunchPanel,
  ControlResultsView,
  type WorkstreamDomainMeta,
} from "@/components/agent/controlAgent/ControlAgentFramework";

interface Props {
  setPage: (p: string) => void;
}

type Stage = "queue" | "launch" | "running" | "results";

const WORKSTREAM_META: Record<CompWorkstreamDomain, WorkstreamDomainMeta> = {
  Payroll: { icon: Wallet },
  "Manager / HRBP": { icon: Users },
  "Employee Communications": { icon: MessageSquare },
  "Systems Coordination": { icon: Network },
  "Documentation / Audit": { icon: FileCheck },
};

export default function CompensationChangeAgentPage({ setPage }: Props) {
  const [stage, setStage] = useState<Stage>("queue");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const selected =
    COMPENSATION_CHANGE_SCENARIOS.find((s) => s.id === selectedId) ?? null;

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
      const el = document.getElementById("comp-control-verdict");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const caseId = selected
    ? `CASE · ${selected.id.toUpperCase()}-${new Date().getFullYear()}`
    : "";

  const eventCategoryLabel = (et: string) => {
    if (et === "Compensation Change") return "Compensation Adjustment";
    if (et === "Promotion + Compensation") return "Promotion + Compensation";
    return "Combined Job + Compensation";
  };

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
            Compensation / Job Change Control Agent
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
                Which compensation or job change requires action?
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-200/85 max-w-2xl leading-relaxed">
                Prepared demonstration scenarios covering compensation changes,
                promotions, and combined job changes, modeled on a
                BambooHR-style workflow, are queued here for control &amp;
                readiness evaluation. Open an event to review and run the agent.
              </p>
            </>
          )}

          {stage !== "queue" && selected && (
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <button
                onClick={goQueue}
                className="inline-flex items-center gap-1.5 text-sm text-blue-200/90 hover:text-white transition"
              >
                <ArrowLeft className="h-4 w-4" /> Comp / Job Change queue
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

      {/* Demonstration notice */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Demonstration:</span>{" "}
          This experience uses prepared scenario data. It does not connect to a
          live customer system or execute production transactions.
        </div>
      </div>

      {/* Stage content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {stage === "queue" && <QueueStage onOpen={openEvent} />}
          {(stage === "launch" || stage === "running") && selected && (
            <ControlLaunchPanel
              scenario={selected}
              eventStreamLabel="Workforce Change Event"
              eventCategoryLabel={eventCategoryLabel(selected.eventType)}
              runButtonLabel="Run Comp / Job Change Agent"
              runningLabel="Running Comp / Job Change Agent…"
              onBack={goQueue}
              onRun={startRun}
              running={stage === "running"}
            />
          )}
          {stage === "results" && selected && (
            <ControlResultsView
              scenario={selected}
              verdictAnchorId="comp-control-verdict"
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
          agentLabel="Compensation / Job Change Control Agent"
        />
      )}
    </main>
  );
}

/* ============================================================
 * Queue stage (agent-specific grouping)
 * ============================================================ */
function QueueStage({ onOpen }: { onOpen: (id: string) => void }) {
  const compItems = COMPENSATION_CHANGE_SCENARIOS.filter(
    (s) => s.eventType === "Compensation Change"
  );
  const promoItems = COMPENSATION_CHANGE_SCENARIOS.filter(
    (s) => s.eventType === "Promotion + Compensation"
  );
  const combinedItems = COMPENSATION_CHANGE_SCENARIOS.filter(
    (s) => s.eventType === "Combined Job + Compensation"
  );

  const groups = [
    {
      type: "comp" as const,
      title: "Compensation Adjustments",
      icon: BadgeDollarSign,
      items: compItems,
    },
    {
      type: "promo" as const,
      title: "Promotions + Compensation",
      icon: TrendingUp,
      items: promoItems,
    },
    {
      type: "combined" as const,
      title: "Combined Job + Compensation",
      icon: Layers,
      items: combinedItems,
    },
  ];

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary mb-2 font-mono">
            Comp / Job Change queue · standing by
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-slate leading-tight">
            Compensation &amp; job-change events awaiting control evaluation
          </h2>
        </div>
        <div className="text-xs text-slate-4">
          <span className="font-mono">
            {COMPENSATION_CHANGE_SCENARIOS.length} events queued
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
        {groups
          .filter((g) => g.items.length > 0)
          .map((g, gi) => (
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
