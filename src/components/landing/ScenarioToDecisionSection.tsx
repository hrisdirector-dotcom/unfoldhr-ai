import { RevealDiv } from "@/components/RevealDiv";
import { ChevronRight, HelpCircle, Compass, Lightbulb, AlertTriangle, ArrowRightCircle } from "lucide-react";

const STEPS = [
  { label: "Scenario", icon: HelpCircle, desc: "A real situation you're navigating" },
  { label: "Decision", icon: Compass, desc: "A clear point of view" },
  { label: "Recommendation", icon: Lightbulb, desc: "What to do, in priority order" },
  { label: "Risks", icon: AlertTriangle, desc: "What to watch for" },
  { label: "Next Actions", icon: ArrowRightCircle, desc: "How to move forward" },
];

export default function ScenarioToDecisionSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Core Product Experience
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              From Scenario to Decision
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Every agent follows the same executive-ready structure.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 lg:gap-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col lg:flex-row items-center gap-3 lg:gap-2 flex-1">
                  <div className="flex-1 w-full bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/40 hover:shadow-md transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <p className="font-display text-sm md:text-base font-semibold text-foreground mb-1">
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50 shrink-0 rotate-90 lg:rotate-0" />
                  )}
                </div>
              );
            })}
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
