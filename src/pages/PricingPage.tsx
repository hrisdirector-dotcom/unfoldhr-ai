import { motion } from "framer-motion";
import { ArrowRight, Compass, PencilRuler, ShieldCheck } from "lucide-react";

interface PricingPageProps {
  setPage: (p: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface Engagement {
  stage: string;
  heading: string;
  treatment: string;
  note?: string;
  copy: string;
  cta: string;
  action: "workflows" | "contact";
  Icon: typeof Compass;
  emphasis?: boolean;
}

const ENGAGEMENTS: Engagement[] = [
  {
    stage: "Explore",
    heading: "Explore HR Work Reimagined",
    treatment: "Public access",
    copy:
      "Use the public workflow library and interactive agents to examine how HR work can be redesigned across elimination, AI reasoning, deterministic execution, system transactions, and human judgment.",
    cta: "Explore the Workflow Library",
    action: "workflows",
    Icon: Compass,
  },
  {
    stage: "Redesign",
    heading: "Agentic HR Workflow Redesign Sprint",
    treatment: "$7,500 founding-client engagement",
    note: "Available to the first three organizations.",
    copy:
      "Redesign one high-value HR workflow in ten business days and receive an implementation-ready operating model, controls framework, architecture requirements, measurement baseline, and 90-day pilot roadmap.",
    cta: "Book a Confidential Introduction",
    action: "contact",
    Icon: PencilRuler,
    emphasis: true,
  },
  {
    stage: "Implement",
    heading: "Pilot and Implementation Advisory",
    treatment: "Scoped individually",
    copy:
      "Support the transition from an approved workflow blueprint to a governed pilot through solution architecture, stakeholder alignment, vendor coordination, evaluation design, controls, and operating-model adoption.",
    cta: "Discuss an Implementation",
    action: "contact",
    Icon: ShieldCheck,
  },
];

export default function PricingPage({ setPage }: PricingPageProps) {
  return (
    <div className="pt-24 pb-20 bg-background">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[3px] text-primary mb-4"
        >
          Pricing and Engagements
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-5"
        >
          Start with the workflow, not a software plan
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="space-y-3"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            UnfoldHR.ai engagements are scoped around the HR work that needs to change—not seats,
            agent-run quotas, or software tiers.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Start by exploring the methodology, redesign one material workflow, or scope advisory
            support for a governed pilot.
          </p>
        </motion.div>
      </section>

      {/* Engagements */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {ENGAGEMENTS.map((e, i) => (
            <motion.div
              key={e.stage}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative rounded-2xl p-7 flex flex-col h-full ${
                e.emphasis
                  ? "bg-card border-2 border-primary/30 shadow-lg shadow-primary/5"
                  : "bg-card border border-border shadow-sm"
              }`}
            >
              <e.Icon aria-hidden="true" className="w-5 h-5 text-primary mb-4" />
              <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                {e.stage}
              </p>
              <h2 className="font-display text-xl text-foreground mb-3">{e.heading}</h2>

              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground">{e.treatment}</p>
                {e.note && <p className="text-xs text-muted-foreground mt-1">{e.note}</p>}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-7">{e.copy}</p>

              <button
                onClick={() => setPage(e.action === "workflows" ? "workflows" : "contact")}
                className={`w-full py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors border-none ${
                  e.emphasis
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-accent text-accent-foreground hover:bg-primary/10"
                }`}
              >
                {e.cta}
                {e.emphasis && <ArrowRight size={14} className="inline ml-1.5 -mt-px" />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Decision Support note */}
      <section className="max-w-3xl mx-auto px-6 text-center pb-8">
        <p className="text-sm text-muted-foreground leading-relaxed border border-border rounded-2xl p-6 bg-card">
          Existing authorized users can access Decision Support through My Dashboard.
        </p>
      </section>
    </div>
  );
}
