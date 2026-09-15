import { computeCounts, type Workflow } from "@/data/workflows";

interface Props {
  workflow: Workflow;
}

export default function CurrentVsFuture({ workflow }: Props) {
  const c = computeCounts(workflow);

  const changed = [
    { label: "Eliminated", value: c.eliminated, tone: "text-cls-eliminate" },
    { label: "AI-led", value: c.agent, tone: "text-cls-agent" },
    { label: "Deterministic", value: c.deterministic, tone: "text-cls-deterministic" },
    { label: "Human-led", value: c.human, tone: "text-cls-human" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-2xl p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Typical current state
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {workflow.currentStateSummary}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm">
          <Stat value={c.currentActivities} label="activities" />
          <Stat value={c.currentHandoffs} label="handoffs" />
          <Stat value={c.currentCoordination} label="coordination or wait steps" />
        </div>
        <ol className="space-y-2">
          {workflow.currentStateSteps.map((s, i) => (
            <li key={s.id} className="flex gap-3 text-sm">
              <span className="font-mono text-[11px] text-slate-5 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={
                  s.friction === "value" ? "text-foreground" : "text-muted-foreground"
                }
              >
                {s.name}
                {s.friction !== "value" && (
                  <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-slate-5">
                    {s.friction}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs text-slate-4 leading-relaxed">
          This is one typical process, modelled by UnfoldHR. Real processes vary between
          organisations — compare it with your own rather than treating it as a benchmark.
        </p>
      </div>

      <div className="bg-slate text-white rounded-2xl p-6 relative overflow-hidden self-start">
        <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/80 mb-3">
            Agentic design
          </p>
          <p className="text-sm text-slate-200/85 leading-relaxed mb-5">
            {c.futureActivities} activities remain, {c.humanDecisionPoints} of them carrying a human
            decision point, with {c.controlGates} explicit control{" "}
            {c.controlGates === 1 ? "gate" : "gates"} on agent authority.
          </p>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/80 mb-3">
            What changed
          </p>
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
            {changed.map((x) => (
              <div key={x.label} className="bg-slate px-4 py-4">
                <p className="font-display text-3xl leading-none">{x.value}</p>
                <p className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-blue-200/70">
                  {x.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-slate-300/70 leading-relaxed">
            Every count here is calculated from the modelled steps below. The most interesting
            number is usually the first one: how much work no longer needs to happen.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <span className="text-foreground">
      <span className="font-display text-2xl mr-1.5">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </span>
  );
}
