import { RevealDiv } from "@/components/RevealDiv";

const TESTIMONIALS = [
  {
    quote: "Unfold HR gave us a workforce plan in minutes that would have taken our team two weeks to build manually.",
    name: "VP of People",
    company: "Series B SaaS Company",
  },
  {
    quote: "The compliance agent flagged a policy gap we didn't even know existed. That alone paid for the engagement.",
    name: "HR Director",
    company: "Healthcare Tech (200 employees)",
  },
  {
    quote: "We finally have a structured approach to performance reviews instead of every manager doing their own thing.",
    name: "Chief People Officer",
    company: "FinTech Scale-up",
  },
];

const TRUST_BADGES = [
  "SOC 2 Compliant",
  "GDPR Ready",
  "Enterprise-grade encryption",
  "No employee PII stored",
];

export default function TrustSection() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Trusted by HR Leaders</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Built for teams that take people seriously
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              HR leaders at growing companies trust Unfold HR to bring clarity to their most complex decisions.
            </p>
          </div>
        </RevealDiv>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div className="bg-background border border-border rounded-2xl p-7 h-full flex flex-col">
                <p className="text-sm text-foreground leading-relaxed mb-6 flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Trust badges */}
        <RevealDiv delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-background border border-border rounded-full px-4 py-2"
              >
                <span className="text-primary">🛡️</span>
                {badge}
              </span>
            ))}
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
