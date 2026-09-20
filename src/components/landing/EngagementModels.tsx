import { RevealDiv } from "@/components/RevealDiv";
import { Button } from "@/components/ui/button";
import { Compass, PencilRuler, ShieldCheck } from "lucide-react";

interface EngagementModelsProps {
  setPage: (p: string) => void;
  onDiscussWorkflow?: () => void;
}

export default function EngagementModels({ setPage, onDiscussWorkflow }: EngagementModelsProps) {
  const scrollToForm = () => {
    if (onDiscussWorkflow) {
      onDiscussWorkflow();
      return;
    }
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const STAGES = [
    {
      stage: "Explore",
      icon: Compass,
      title: "Explore HR Work Reimagined",
      desc: "Use the public workflow library and interactive agents to see how HR work can be redesigned across human judgment, AI reasoning, deterministic rules, system transactions, and elimination.",
      cta: "Explore Workflows",
      action: () => setPage("workflows"),
      variant: "outline" as const,
      primary: false,
    },
    {
      stage: "Redesign",
      icon: PencilRuler,
      title: "Agentic HR Workflow Redesign Sprint",
      desc: "Redesign one high-value HR workflow and receive an implementation-ready operating model, controls framework, architecture requirements, measurement baseline, and 90-day pilot roadmap.",
      cta: "Book a Confidential Introduction",
      action: scrollToForm,
      variant: "default" as const,
      primary: true,
    },
    {
      stage: "Implement",
      icon: ShieldCheck,
      title: "Pilot and Implementation Advisory",
      desc: "Support the transition from an approved workflow blueprint to a governed pilot, including solution architecture, stakeholder alignment, vendor coordination, evaluation design, and operating-model adoption.",
      cta: "Discuss an Implementation",
      action: scrollToForm,
      variant: "outline" as const,
      primary: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30" id="engagement-models">
      <div className="max-w-5xl mx-auto px-6">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Engagement Models
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Three ways to work with UnfoldHR
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start by exploring the work, redesign one material workflow, or move an approved
              operating model toward a governed pilot.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STAGES.map((s, i) => (
            <RevealDiv key={s.stage} delay={i * 0.1}>
              <div
                className={`rounded-2xl bg-card p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  s.primary
                    ? "border-2 border-primary/50 shadow-sm"
                    : "border border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <s.icon className="w-5 h-5 text-primary" aria-hidden="true" focusable="false" />
                  </div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest uppercase">
                    {s.stage}
                  </span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-auto">{s.desc}</p>
                <Button variant={s.variant} className="mt-6 w-full" onClick={s.action}>
                  {s.cta}
                </Button>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
