import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { RevealDiv } from "@/components/RevealDiv";
import { FLAGSHIP_WORKFLOW_ID } from "@/data/workflows";
import { BOOKING_URL } from "@/lib/booking";

export const DELIVERABLES = [
  "Current-state workflow and friction analysis",
  "Eliminate, AI, deterministic, and human work allocation",
  "Human judgment and escalation boundaries",
  "Required data, systems, and integrations",
  "Risk, control, permission, and audit requirements",
  "Target operating model",
  "Business-value hypothesis and measurement baseline",
  "90-day pilot roadmap",
  "Executive decision readout",
];

interface SprintOfferSectionProps {
  onOpenWorkflow?: (id: string) => void;
  onDiscussWorkflow?: () => void;
}

export default function SprintOfferSection({ onOpenWorkflow, onDiscussWorkflow }: SprintOfferSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <RevealDiv>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">
                Work With UnfoldHR
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                Agentic HR Workflow Redesign Sprint
              </h2>
              <p className="mt-5 text-base md:text-lg text-foreground/90 leading-relaxed">
                Redesign one high-value HR workflow in ten business days.
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                We work with your HR, technology, and business stakeholders to examine how the work
                operates today and build a practical target model for how it should operate with AI.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The sprint is an advisory and work-design engagement: analysis, facilitation,
                recommendations, architecture requirements, controls, and a pilot roadmap. It does not
                include production software, a production AI agent, or completed integrations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => (onDiscussWorkflow ? onDiscussWorkflow() : scrollTo("final-cta"))}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Discuss Your Workflow
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 transition-all"
                >
                  <CalendarCheck2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  Book a Discovery Call
                </a>
                {onOpenWorkflow && (
                  <button
                    onClick={() => onOpenWorkflow(FLAGSHIP_WORKFLOW_ID)}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    See a Sample Workflow Redesign
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>
          </RevealDiv>

          <div className="space-y-5">
            <RevealDiv delay={0.08}>
              <div className="bg-card border border-border rounded-2xl p-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                  What you receive
                </h3>
                <ul className="space-y-2.5">
                  {DELIVERABLES.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealDiv>

            <RevealDiv delay={0.16}>
              <div className="bg-card border border-border rounded-2xl p-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Founding-client engagement
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The first three organizations can participate for{" "}
                  <span className="font-semibold text-foreground">$7,500</span> in exchange for
                  structured feedback and permission to develop an approved or anonymized case study.
                </p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
