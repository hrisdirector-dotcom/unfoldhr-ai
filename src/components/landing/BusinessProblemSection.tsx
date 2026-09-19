import { RevealDiv } from "@/components/RevealDiv";

const CAPABILITIES = [
  {
    label: "HR Operations",
    body: "Understand how the work is actually performed across people, policies, handoffs, and exceptions.",
  },
  {
    label: "HCM Architecture",
    body: "Define the systems, data, integrations, and deterministic rules required to support the workflow.",
  },
  {
    label: "Applied AI",
    body: "Identify where contextual reasoning, synthesis, recommendation, and orchestration improve the outcome.",
  },
  {
    label: "Governance",
    body: "Establish permissions, controls, auditability, escalation paths, and human accountability.",
  },
];

export default function BusinessProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">
              The Gap
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              AI tools are advancing faster than HR operating models
            </h2>
            <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              The problem is no longer access to AI. It is deciding where AI belongs, what it should be
              allowed to do, which systems it must work with, and where human accountability cannot be
              delegated.
            </p>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              UnfoldHR.ai brings together HR operations, HCM architecture, workflow design, controls, and
              applied AI to answer those questions.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((c, i) => (
            <RevealDiv key={c.label} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-7 h-full">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">{c.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
