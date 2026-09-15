import { ChevronDown } from "lucide-react";
import type { Workflow } from "@/data/workflows";

const LAYERS = [
  {
    key: "need",
    label: "Business / employee need",
    body: "The outcome the process exists to produce.",
  },
  { key: "context", label: "Context", body: "Authoritative data and policy, by system role." },
  {
    key: "intelligence",
    label: "Intelligence",
    body: "AI reasoning: interpretation, synthesis, monitoring, orchestration.",
  },
  {
    key: "control",
    label: "Control",
    body: "Identity, permissions, policy, risk class, approval, audit.",
  },
  {
    key: "execution",
    label: "Execution",
    body: "Authoritative transactions in the systems of record.",
  },
  {
    key: "verification",
    label: "Verification",
    body: "Outcome confirmed, exceptions surfaced, audit trail complete.",
  },
];

export default function ArchitectureView({ workflow }: { workflow: Workflow }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <div className="grid lg:grid-cols-[1fr_260px] gap-8">
        <div>
          {LAYERS.map((l, i) => (
            <div key={l.key}>
              <div className="border border-border rounded-xl px-5 py-4 bg-paper">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-1.5">
                  {l.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{l.body}</p>
                {l.key === "context" && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {workflow.architectureSystems.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-mono px-2 py-1 rounded bg-muted text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden="true">
                  <ChevronDown className="h-4 w-4 text-slate-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <aside className="bg-slate text-white rounded-xl p-5 h-fit">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/80 mb-3">
            The boundary that matters
          </p>
          <ul className="space-y-3 text-sm text-slate-200/85 leading-relaxed">
            <li>The AI model is not the system of record.</li>
            <li>The AI model is not the calculation engine.</li>
            <li>The AI model is not the decision authority.</li>
          </ul>
          <p className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-300/70 leading-relaxed">
            Systems are shown as roles, not products. The framework is vendor-neutral by design.
          </p>
        </aside>
      </div>
    </div>
  );
}
