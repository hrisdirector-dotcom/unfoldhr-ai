import type { Workflow } from "@/data/workflows";

interface Props {
  workflow: Workflow;
  variant?: "light" | "dark";
}

export default function WorkflowScoreStrip({ workflow, variant = "dark" }: Props) {
  const items = [
    { label: "AI Potential", value: workflow.aiSuitability },
    { label: "Human Judgment", value: workflow.humanJudgment },
    { label: "Elimination Opportunity", value: workflow.eliminationOpportunity },
    { label: "Risk", value: workflow.risk },
    { label: "Implementation Complexity", value: workflow.implementationComplexity },
  ];

  const dark = variant === "dark";

  return (
    <dl
      className={`grid grid-cols-2 md:grid-cols-5 gap-px rounded-xl overflow-hidden border ${
        dark ? "bg-white/10 border-white/15" : "bg-border border-border"
      }`}
    >
      {items.map((i) => (
        <div key={i.label} className={`px-4 py-4 ${dark ? "bg-slate" : "bg-card"}`}>
          <dt
            className={`text-[10px] font-mono uppercase tracking-[0.16em] mb-1.5 ${
              dark ? "text-blue-200/70" : "text-muted-foreground"
            }`}
          >
            {i.label}
          </dt>
          <dd
            className={`text-sm font-semibold uppercase tracking-wide ${
              dark ? "text-white" : "text-foreground"
            }`}
          >
            {i.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
