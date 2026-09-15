import { ArrowRight } from "lucide-react";
import { DOMAIN_LABEL, type Workflow } from "@/data/workflows";

interface Props {
  workflow: Workflow;
  onOpen: (id: string) => void;
}

export default function WorkflowCard({ workflow, onOpen }: Props) {
  const scores = [
    ["AI", workflow.aiSuitability],
    ["Human", workflow.humanJudgment],
    ["Risk", workflow.risk],
    ["Eliminate", workflow.eliminationOpportunity],
  ] as const;

  return (
    <button
      onClick={() => onOpen(workflow.id)}
      className="group text-left w-full h-full bg-card border border-border rounded-2xl p-6 transition hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[11px] text-primary">
          {String(workflow.number).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
          {DOMAIN_LABEL[workflow.domain]}
        </span>
      </div>

      <h3 className="font-display text-xl leading-tight text-foreground">{workflow.name}</h3>
      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{workflow.outcome}</p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
        {scores.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-2 border-t border-border pt-2">
            <dt className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </dt>
            <dd className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Open the analysis
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
