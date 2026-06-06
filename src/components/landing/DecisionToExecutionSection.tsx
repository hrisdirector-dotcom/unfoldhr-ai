import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight, Globe, CheckCircle } from "lucide-react";

export default function DecisionToExecutionSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Execution Capability
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              From Decision to Execution
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Some workforce moments do not stop at a recommendation. They require action, communication, compliance, and accountability.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-primary-foreground mb-2">
                    New
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-foreground">
                    Global Lifecycle Agent
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                An execution agent for global onboarding and offboarding workflows — designed to coordinate employee communication, HRIS updates, workflow actions, compliance review, and audit trails.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Executes onboarding and offboarding workflows",
                  "Communicates with employees in a warm, professional tone",
                  "Coordinates across HRIS, collaboration, task, and calendar systems",
                  "Escalates sensitive actions to a human handler",
                  "Maintains auditability and data-protection controls",
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://calendly.com/eric-weaver-unfoldhrai/unfold-hr-ai-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View Lifecycle Agent Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
