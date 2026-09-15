import {
  AUTHORITY_NOTE,
  AUTONOMY_LEVELS,
  AUTONOMY_NOTE,
  CLASSIFICATIONS,
  DECISION_FRAMEWORK,
  HUMAN_CONTROL,
  METHODOLOGY_NOTE,
  PRINCIPLE_LINES,
} from "@/data/workflows";
import ClassificationBadge from "./ClassificationBadge";

export function PrincipleCallout({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dark = variant === "dark";
  return (
    <div
      className={`rounded-2xl px-6 py-7 md:px-10 md:py-9 ${
        dark ? "bg-slate text-white" : "bg-paper-2 border border-border text-foreground"
      }`}
    >
      <p
        className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-4 ${
          dark ? "text-blue-200/80" : "text-primary"
        }`}
      >
        The principle
      </p>
      <p className="font-display text-2xl md:text-4xl leading-[1.15]">
        {PRINCIPLE_LINES.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
    </div>
  );
}

export function ClassificationLegend() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CLASSIFICATIONS.map((c, i) => (
        <div key={c.key} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <ClassificationBadge classification={c.key} size="md" />
            <span className="font-mono text-[11px] text-slate-5">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="text-sm font-semibold text-foreground mb-1.5">{c.question}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{c.reasoning}</p>
        </div>
      ))}
    </div>
  );
}

export function DecisionFrameworkPanel() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-2xl text-foreground mb-1.5">Should AI do this?</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        The sequence matters. The first question is not where AI fits — it is whether the activity
        should exist at all.
      </p>
      <ol className="space-y-4">
        {DECISION_FRAMEWORK.map((d) => (
          <li key={d.step} className="grid sm:grid-cols-[48px_1fr] gap-x-4 gap-y-2 border-t border-border pt-4">
            <span className="font-mono text-sm text-primary">{d.step}</span>
            <div>
              <p className="text-sm font-semibold text-foreground leading-snug">{d.question}</p>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Yes:</span> {d.yes}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">No:</span> {d.no}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AutonomyScalePanel() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-2xl text-foreground mb-5">Autonomy and authority</h3>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {AUTONOMY_LEVELS.map((a) => (
          <li key={a.level} className="border border-border rounded-xl px-4 py-3 bg-paper">
            <span className="font-mono text-xs text-primary">Level {a.level}</span>
            <p className="text-sm text-foreground mt-1 leading-snug">{a.label}</p>
          </li>
        ))}
      </ol>
      <div className="grid md:grid-cols-2 gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {AUTONOMY_NOTE}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {AUTHORITY_NOTE}
        </p>
      </div>
    </div>
  );
}

export function HumanControlLegend() {
  const keys = ["hitl", "hotl", "hovl", "human-only"] as const;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {keys.map((k) => (
        <div key={k} className="bg-card border border-border rounded-2xl p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary mb-2">
            {HUMAN_CONTROL[k].short}
          </p>
          <p className="text-sm font-semibold text-foreground mb-1.5">{HUMAN_CONTROL[k].label}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{HUMAN_CONTROL[k].body}</p>
        </div>
      ))}
    </div>
  );
}

export function MethodologyNote() {
  return (
    <p className="text-xs text-slate-4 leading-relaxed max-w-3xl">{METHODOLOGY_NOTE}</p>
  );
}
