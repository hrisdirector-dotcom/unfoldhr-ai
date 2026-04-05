import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Users, Settings } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PricingPageProps {
  setPage: (p: string) => void;
}

const tiers = [
  {
    title: "Free",
    subtitle: "Explore the platform",
    price: "$0",
    description:
      "Experience how the platform turns workforce scenarios into structured decisions.",
    includes: [
      "Access to 3 decision agents",
      "Modeled scenarios (no company data required)",
      "Instant decision outputs",
      "No login required",
    ],
    cta: "Try an Agent",
    ctaAction: "try-picker",
    featured: false,
    variant: "outline" as const,
  },
  {
    title: "Decision Session",
    subtitle: "Apply this to your organization",
    price: "$2,500",
    description:
      "Work directly with us to generate real decision outputs based on your workforce context.",
    includes: [
      "60–90 minute working session",
      "Your workforce scenario applied to agents",
      "Executive-ready decision outputs",
      "Clear recommendations and risks",
    ],
    bestFor: "Leaders who need clarity on a specific workforce decision",
    cta: "Schedule a Session",
    ctaAction: "contact",
    featured: true,
    variant: "primary" as const,
  },
  {
    title: "Build",
    subtitle: "Operationalize decisions across your organization",
    price: "Starting at $15,000",
    description:
      "We connect your HR systems and embed decision intelligence into your workflows.",
    includes: [
      "HR system integration (e.g., BambooHR)",
      "Custom agent configuration",
      "Workflow design and implementation",
      "Ongoing advisory support",
    ],
    bestFor:
      "Organizations ready to operationalize decision-making at scale",
    cta: "Talk to Us",
    ctaAction: "contact",
    featured: false,
    variant: "secondary" as const,
  },
];

const steps = [
  {
    icon: Zap,
    title: "Try the platform",
    desc: "Run agents instantly with no setup",
  },
  {
    icon: Users,
    title: "Apply to your organization",
    desc: "We tailor outputs to your workforce",
  },
  {
    icon: Settings,
    title: "Operationalize",
    desc: "We connect systems and embed workflows",
  },
];

const faqs = [
  {
    q: "Do I need to connect my HR system to try this?",
    a: "No. The free experience uses modeled scenarios so you can see decision outputs instantly — no data, no setup required.",
  },
  {
    q: "What happens during a Decision Session?",
    a: "You'll work directly with our team in a 60–90 minute session. We apply your workforce context to our decision agents and deliver executive-ready recommendations, risks, and next steps.",
  },
  {
    q: "How long does implementation take?",
    a: "Most Build engagements are operational within 4–6 weeks, depending on the number of systems involved and the scope of workflow design.",
  },
  {
    q: "Is this a subscription?",
    a: "No. The Decision Session is a one-time engagement. Build projects are scoped and priced individually based on your organization's needs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function PricingPage({ setPage }: PricingPageProps) {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4"
        >
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5"
        >
          Start with insight. Scale to execution.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto"
        >
          Experience the platform instantly, then apply it to your organization
          with expert guidance and real workforce data.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-6 mb-28">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative rounded-2xl p-7 flex flex-col ${
                tier.featured
                  ? "bg-card border-2 border-primary/30 shadow-lg shadow-primary/5 md:-mt-3 md:mb-0 md:pb-9"
                  : "bg-card border border-border shadow-sm"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Recommended
                </span>
              )}

              <p className="text-sm font-medium text-muted-foreground mb-1">
                {tier.subtitle}
              </p>
              <h3 className="font-display text-xl text-foreground mb-2">
                {tier.title}
              </h3>
              <p className="font-display text-3xl text-foreground mb-4">
                {tier.price}
              </p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {tier.description}
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {tier.bestFor && (
                <p className="text-xs text-muted-foreground mb-6 border-t border-border pt-4">
                  <span className="font-semibold text-foreground">
                    Best for:{" "}
                  </span>
                  {tier.bestFor}
                </p>
              )}

              <button
                onClick={() => setPage(tier.ctaAction)}
                className={`w-full py-3 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                  tier.variant === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : tier.variant === "secondary"
                    ? "bg-muted text-foreground border border-border hover:border-foreground"
                    : "bg-accent text-accent-foreground border border-primary/20 hover:bg-primary/10"
                }`}
              >
                {tier.cta}
                {tier.featured && (
                  <ArrowRight size={14} className="inline ml-1.5 -mt-px" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value Positioning */}
      <section className="max-w-2xl mx-auto text-center px-6 mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-foreground mb-4"
        >
          Not another HR tool
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground leading-relaxed"
        >
          A decision platform applied to your organization — not software you
          have to configure or learn. We focus on{" "}
          <span className="text-foreground font-medium">clarity</span>,{" "}
          <span className="text-foreground font-medium">speed</span>, and{" "}
          <span className="text-foreground font-medium">outcomes</span>.
        </motion.p>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 mb-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-foreground text-center mb-12"
        >
          How it works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <step.icon size={22} className="text-primary" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase mb-2">
                Step {i + 1}
              </p>
              <h3 className="font-display text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-foreground text-center mb-10"
        >
          Frequently asked questions
        </motion.h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-foreground text-sm">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
