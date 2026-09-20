import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { RevealDiv } from "@/components/RevealDiv";
import { DELIVERABLES } from "@/components/landing/SprintOfferSection";
import { BOOKING_URL } from "@/lib/booking";

interface ServicesPageProps {
  setPage: (p: string) => void;
  onDiscussWorkflow: () => void;
}

const PROBLEMS = [
  "Unnecessary approvals that no longer manage real risk",
  "Fragmented handoffs between HR, managers, payroll, and vendors",
  "Unclear accountability for consequential decisions",
  "Duplicated work across systems, spreadsheets, and inboxes",
];

export default function ServicesPage({ setPage, onDiscussWorkflow }: ServicesPageProps) {
  return (
    <div className="pt-24 pb-20 bg-background">
      {/* Header */}
      <section className="max-w-3xl mx-auto text-center px-6 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[3px] text-primary mb-4"
        >
          HR Workflow Redesign Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-5"
        >
          Don't automate the existing process. Redesign the work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We work with HR leaders to rethink high-value workflows before deciding what should be
          eliminated, automated, supported by AI, or retained for human judgment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={onDiscussWorkflow}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
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
        </motion.div>
      </section>

      {/* Technology independence */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <RevealDiv>
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-3">
              Technology independent
            </p>
            <p className="font-display text-xl md:text-2xl text-foreground leading-snug">
              UnfoldHR's redesign services are technology-independent. A redesigned workflow may use
              your existing HCM systems, deterministic automation, third-party AI capabilities,
              UnfoldHR agents, or no AI at all.
            </p>
          </div>
        </RevealDiv>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <RevealDiv>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">The problem</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Organizations often introduce AI into existing processes without first addressing the
            reasons those processes are difficult:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </RevealDiv>
      </section>

      {/* The service */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <RevealDiv>
          <div className="rounded-2xl bg-card border border-border p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-3">
              The service
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Agentic HR Workflow Redesign Sprint
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed">
              One high-value HR workflow redesigned over ten business days.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We work with your HR, technology, and business stakeholders to examine how the work
              operates today and build a practical target model for how it should operate with AI.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The sprint is an advisory and work-design engagement: analysis, facilitation,
              recommendations, architecture requirements, controls, and a pilot roadmap. It does not
              include production software, a production AI agent, or completed integrations.
            </p>

            <div className="mt-7 rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">$7,500</span> — founding-client engagement,
                available to the first three organizations, in exchange for structured feedback and
                permission to develop an approved or anonymized case study.
              </p>
            </div>
          </div>
        </RevealDiv>
      </section>

      {/* Deliverables */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <RevealDiv>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-5">
            What you receive
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DELIVERABLES.map((d) => (
              <li
                key={d}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl p-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            Implementation — controls, integrations, change management, and technology delivery — is
            scoped separately after the redesign is approved.
          </p>
        </RevealDiv>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <RevealDiv>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              Bring us one HR workflow that needs to change
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-7">
              Tell us where the work is breaking down. We will use the initial conversation to
              determine the most appropriate next step.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={onDiscussWorkflow}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
              >
                Discuss Your Workflow
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-background text-foreground font-semibold text-sm hover:border-primary/40 transition-all"
              >
                <CalendarCheck2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Book a Discovery Call
              </a>
            </div>
            <button
              onClick={() => setPage("workflows")}
              className="mt-6 text-sm font-semibold text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              Explore the Workflow Library →
            </button>
          </div>
        </RevealDiv>
      </section>
    </div>
  );
}
