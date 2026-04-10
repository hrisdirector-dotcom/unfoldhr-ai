import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

interface PricingPageProps {
  setPage: (p: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

interface Tier {
  name: string;
  monthly: string;
  annual?: string;
  annualNote?: string;
  features: string[];
  cta: string;
  ctaAction: string;
  popular?: boolean;
  variant: "outline" | "primary" | "secondary" | "ghost";
}

const TIERS: Tier[] = [
  {
    name: "Free",
    monthly: "$0",
    features: [
      "Unlimited simulation runs in the Agent Gallery",
      "0 deployed live agents",
      "No integrations",
      "Community support",
      "Perfect for exploring what Unfold HR can do",
    ],
    cta: "Try Gallery Now",
    ctaAction: "gallery",
    variant: "outline",
  },
  {
    name: "Growth",
    monthly: "$179",
    annual: "$149",
    annualNote: "/ month billed annually",
    popular: true,
    features: [
      "500 agent runs per month",
      "Up to 3 deployed autonomous agents",
      "Basic HRIS/ATS integrations (Google Sheets, basic export)",
      "Basic autonomous actions & notifications",
      "Email support",
    ],
    cta: "Start Growth Plan",
    ctaAction: "contact",
    variant: "primary",
  },
  {
    name: "Professional",
    monthly: "$699",
    annual: "$599",
    annualNote: "/ month billed annually",
    features: [
      "Unlimited agent runs",
      "Up to 10 deployed agents",
      "Full HRIS & ATS integrations (Workday, BambooHR, Greenhouse, etc.)",
      "Full autonomous actions and multi-agent workflows",
      "Priority support + agent tuning",
    ],
    cta: "Start Professional Plan",
    ctaAction: "contact",
    variant: "secondary",
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    features: [
      "Unlimited agents and runs",
      "Advanced multi-agent orchestration",
      "Custom integrations and model fine-tuning",
      "24/7 support + dedicated success manager",
      "SOC 2, GDPR, advanced security",
    ],
    cta: "Contact Sales",
    ctaAction: "contact",
    variant: "ghost",
  },
];

type BoolOrStr = true | false | string;

interface CompRow {
  label: string;
  free: BoolOrStr;
  growth: BoolOrStr;
  pro: BoolOrStr;
  enterprise: BoolOrStr;
}

const COMPARISON: CompRow[] = [
  { label: "Access to Interactive Agent Gallery", free: true, growth: true, pro: true, enterprise: true },
  { label: "Monthly Agent Runs", free: "Unlimited (sim only)", growth: "500", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Deployed Live Agents", free: "0", growth: "Up to 3", pro: "Up to 10", enterprise: "Unlimited" },
  { label: "HRIS/ATS Integrations", free: false, growth: "Basic", pro: "Full", enterprise: "Custom" },
  { label: "Autonomous Actions", free: false, growth: "Basic", pro: "Full", enterprise: "Full" },
  { label: "Multi-Agent Orchestration", free: false, growth: false, pro: true, enterprise: "Advanced" },
  { label: "Support Level", free: "Community", growth: "Email", pro: "Priority", enterprise: "24/7 + Dedicated" },
  { label: "Security & Compliance", free: "Standard", growth: "Standard", pro: "Standard", enterprise: "SOC 2, GDPR" },
  { label: "Dedicated Success Manager", free: false, growth: false, pro: false, enterprise: true },
];

function CellValue({ val }: { val: BoolOrStr }) {
  if (val === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
  if (val === false) return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm text-foreground">{val}</span>;
}

export default function PricingPage({ setPage }: PricingPageProps) {
  const [annual, setAnnual] = useState(true);

  const handleCta = (action: string) => {
    if (action === "gallery") {
      setPage("home");
      setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      setPage(action);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-background">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[3px] text-primary mb-4"
        >
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-5"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
        >
          Start trying agents for free. Deploy real autonomous HR agents when you're ready.
        </motion.p>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-1.5 py-1.5"
        >
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all border-none cursor-pointer ${
              !annual ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all border-none cursor-pointer ${
              annual ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Annual <span className="text-xs opacity-70">(-20%)</span>
          </button>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative rounded-2xl p-7 flex flex-col h-full ${
                tier.popular
                  ? "bg-card border-2 border-primary/30 shadow-lg shadow-primary/5 lg:-mt-3 lg:pb-9"
                  : "bg-card border border-border shadow-sm"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-xl text-foreground mb-1">{tier.name}</h3>

              <div className="mb-4">
                {tier.annual && annual ? (
                  <>
                    <span className="font-display text-3xl text-foreground">{tier.annual}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ month</span>
                    <p className="text-xs text-muted-foreground mt-0.5">billed annually</p>
                  </>
                ) : tier.monthly === "Custom" ? (
                  <span className="font-display text-3xl text-foreground">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-3xl text-foreground">{tier.monthly}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ month</span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCta(tier.ctaAction)}
                className={`w-full py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors border-none ${
                  tier.variant === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : tier.variant === "secondary"
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : tier.variant === "ghost"
                    ? "bg-muted text-foreground hover:bg-accent"
                    : "bg-accent text-accent-foreground hover:bg-primary/10"
                }`}
              >
                {tier.cta}
                {tier.popular && <ArrowRight size={14} className="inline ml-1.5 -mt-px" />}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-5xl mx-auto px-6 mb-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-foreground text-center mb-10"
        >
          Compare Plans
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 text-sm font-medium text-muted-foreground w-[240px]">Feature</th>
                {["Free", "Growth", "Professional", "Enterprise"].map((h) => (
                  <th key={h} className="py-3 px-3 text-sm font-semibold text-foreground text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-3.5 pr-4 text-sm text-foreground">{row.label}</td>
                  <td className="py-3.5 px-3 text-center"><CellValue val={row.free} /></td>
                  <td className="py-3.5 px-3 text-center"><CellValue val={row.growth} /></td>
                  <td className="py-3.5 px-3 text-center"><CellValue val={row.pro} /></td>
                  <td className="py-3.5 px-3 text-center"><CellValue val={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Note */}
      <section className="max-w-3xl mx-auto px-6 mb-20 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed border border-border rounded-2xl p-6 bg-card">
          All paid plans include our three engagement models: <span className="text-foreground font-medium">Build It For Me</span>,{" "}
          <span className="text-foreground font-medium">Co-Build</span>, or{" "}
          <span className="text-foreground font-medium">Advisory</span>.
          Annual billing includes 20% discount. Pricing is per organization.
        </p>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center pb-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl text-foreground mb-6"
        >
          Ready to turn simulations into real results?
        </motion.h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleCta("gallery")}
            className="px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-colors"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => setPage("contact")}
            className="px-7 py-3.5 rounded-xl bg-transparent text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-foreground transition-colors"
          >
            Book a Demo
          </button>
        </div>
      </section>
    </div>
  );
}
