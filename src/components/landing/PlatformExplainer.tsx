import { RevealDiv } from "@/components/RevealDiv";

const POINTS = [
  {
    label: "A platform, not a chatbot",
    body: "UnfoldHRAI is a platform of purpose-built HR agents, each scoped to a concrete workforce use case — not a generic prompt box.",
  },
  {
    label: "Agents that decide what to do",
    body: "Decision Agents convert workforce, talent, and operating questions into structured recommendations and tradeoffs.",
  },
  {
    label: "Agents that decide what can move",
    body: "Control & Readiness Agents evaluate whether a workforce event or HR action is ready to progress, blocked, or held for approval.",
  },
];

export default function PlatformExplainer() {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">What UnfoldHRAI Is</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              One platform. Two families of HR agents. Built for concrete workforce work.
            </h2>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POINTS.map((p, i) => (
            <RevealDiv key={i} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-7 h-full">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">{p.label}</p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
