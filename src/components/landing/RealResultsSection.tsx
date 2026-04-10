import { RevealDiv } from "@/components/RevealDiv";
import { CheckCircle } from "lucide-react";

const RESULTS = [
  {
    company: "IBM AskHR Agent",
    result:
      "Resolves up to 94% of employee queries autonomously, cutting HR ticket volume significantly while freeing teams for strategic work.",
  },
  {
    company: "AMD Global HR Support",
    result:
      "Achieved 80% faster resolution times and 70% higher employee satisfaction with a lean HR team.",
  },
  {
    company: "LinkedIn Recruitment Agents",
    result:
      "Saves recruiters one full workday per week, allowing more time for candidate relationships and innovation.",
  },
  {
    company: "Enterprise Deployments (Moveworks)",
    result:
      "Organizations like Johnson Controls and Ciena shifted HR from reactive support to proactive, with major reductions in manual processes.",
  },
];

export default function RealResultsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="max-w-5xl mx-auto px-6">
        <RevealDiv>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Real Results HR Teams Are Seeing with Agentic AI
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
            Leading organizations are already using agentic AI to reduce admin
            work and deliver faster, better workforce outcomes. Here are a few
            proven examples:
          </p>
        </RevealDiv>

        <div className="grid gap-4 md:grid-cols-2">
          {RESULTS.map((r, i) => (
            <RevealDiv key={r.company} delay={0.1 * i}>
              <div className="flex gap-4 rounded-xl border border-border bg-card p-5 h-full">
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {r.company}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.result}
                  </p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.5}>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mt-12 text-sm md:text-base leading-relaxed">
            unfoldHR builds on these proven capabilities with specialized agents
            for workforce planning, recruiting, performance, employee listening,
            and compliance — purpose-built for HR teams that want trustworthy,
            actionable results.
          </p>
        </RevealDiv>
      </div>
    </section>
  );
}
