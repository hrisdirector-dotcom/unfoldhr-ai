import { ArrowRight, PencilRuler, Bot, ShieldCheck } from "lucide-react";
import { RevealDiv } from "@/components/RevealDiv";
import { FLAGSHIP_WORKFLOW_ID } from "@/data/workflows";

interface Props {
  setPage: (p: string) => void;
  onOpenWorkflow?: (id: string) => void;
}

const STAGES = [
  {
    step: "Stage 1 — Redesign",
    title: "Leave of Absence: Request to Return",
    Icon: PencilRuler,
    body: "The redesign examines the employee experience, unnecessary handoffs, eligibility and policy rules, where human judgment is required, how exceptions are handled, and which accountability and control points must exist.",
  },
  {
    step: "Stage 2 — Enable",
    title: "Leave Control Agent",
    Icon: Bot,
    body: "An agent can support selected activities inside that design — evaluating readiness, identifying missing information, and surfacing exceptions for a person to resolve. It does not own the leave process, and the demonstration runs on prepared scenario data.",
  },
  {
    step: "Stage 3 — Implement",
    title: "Connect, govern, and measure",
    Icon: ShieldCheck,
    body: "Implementation defines the HCM, payroll, benefits, case management, integration, security, and audit requirements needed for the approved future-state design. Implementation is scoped separately.",
  },
];

export default function DesignToExecutionSection({ setPage, onOpenWorkflow }: Props) {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">
              From Design to Execution
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              Design the work. Then enable it.
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              A redesigned workflow defines what should happen, who makes decisions, and which
              controls are required. Technology then supports the activities it is suited to
              perform.
            </p>
          </div>
        </RevealDiv>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {STAGES.map((s, i) => (
            <RevealDiv key={s.step} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-7 h-full flex flex-col">
                <s.Icon aria-hidden="true" className="h-5 w-5 text-primary mb-4" />
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {s.step}
                </p>
                <h3 className="font-display text-lg text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.2}>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-t border-border pt-8">
            <p className="font-display text-xl md:text-2xl text-foreground leading-snug">
              One operating model. Multiple execution components.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPage("services")}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
              >
                Explore Workflow Redesign
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => setPage("agents")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 transition-all"
              >
                Explore the Agent Platform
              </button>
            </div>
          </div>
          {onOpenWorkflow && (
            <button
              onClick={() => onOpenWorkflow(FLAGSHIP_WORKFLOW_ID)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              See the Leave of Absence workflow redesign
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </RevealDiv>
      </div>
    </section>
  );
}
