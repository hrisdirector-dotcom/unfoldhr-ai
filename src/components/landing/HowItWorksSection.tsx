import { RevealDiv } from "@/components/RevealDiv";

const STEPS = [
  {
    num: "01",
    title: "Describe your workflow",
    desc: "Tell us about your HR challenge — workforce planning, onboarding, compliance, or anything in between.",
    icon: "💬",
  },
  {
    num: "02",
    title: "We build your agent",
    desc: "Our team configures an AI agent tailored to your data, policies, and processes. No prompt engineering required.",
    icon: "⚙️",
  },
  {
    num: "03",
    title: "Deploy & integrate",
    desc: "Your agent connects to your HRIS, ATS, and communication tools. It starts working with your real data.",
    icon: "🔗",
  },
  {
    num: "04",
    title: "Get recommendations & take action",
    desc: "Receive structured, prioritized recommendations. Review, refine, and operationalize — with full transparency.",
    icon: "🎯",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              From challenge to clarity in four steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No complex setup. No months of integration. Get structured HR decisions fast.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div className="relative bg-card border border-border rounded-2xl p-7 h-full group hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-xs font-bold text-primary/60 tracking-widest">{step.num}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-border text-xl z-10">→</div>
                )}
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
