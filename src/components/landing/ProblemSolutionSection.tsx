import { RevealDiv } from "@/components/RevealDiv";

const PAINS = [
  {
    icon: "📊",
    title: "Drowning in spreadsheets",
    desc: "Headcount models, comp analysis, survey exports — HR runs on scattered spreadsheets that nobody trusts.",
  },
  {
    icon: "🐌",
    title: "Slow, reactive decisions",
    desc: "By the time data is gathered and analyzed, the window for action has passed. HR is always catching up.",
  },
  {
    icon: "⚠️",
    title: "Compliance blind spots",
    desc: "Policy gaps, regulatory changes, and audit risks surface too late — usually when something goes wrong.",
  },
  {
    icon: "🔄",
    title: "Repetitive manual work",
    desc: "Review cycles, onboarding checklists, survey analysis — your team spends hours on work that should be automated.",
  },
];

const SOLUTIONS = [
  {
    icon: "⚡",
    title: "Instant structured recommendations",
    desc: "Every agent delivers clear, prioritized recommendations — not raw data. Decisions are ready in seconds, not days.",
  },
  {
    icon: "🤖",
    title: "Autonomous HR workflows",
    desc: "Agents handle the analysis, drafting, and coordination so your team can focus on what matters: people and strategy.",
  },
  {
    icon: "🔗",
    title: "Integrates with your stack",
    desc: "Connect your HRIS, ATS, and survey tools. Agents work with your existing data — no migration required.",
  },
  {
    icon: "🛡️",
    title: "Built-in compliance awareness",
    desc: "Agents flag risks proactively, track regulatory changes, and generate audit-ready documentation automatically.",
  },
];

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Problem */}
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-destructive/70 mb-4">The Problem</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              HR teams are buried in process, not building strategy
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Growing companies hit the same wall: more employees, more complexity, same manual tools.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {PAINS.map((p, i) => (
            <RevealDiv key={i} delay={i * 0.08}>
              <div className="bg-background border border-border rounded-xl p-6 h-full hover:border-destructive/30 transition-colors">
                <span className="text-2xl mb-4 block">{p.icon}</span>
                <h3 className="font-display text-base text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Solution */}
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">The Solution</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              AI agents that think, recommend, and act
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unfold HR gives your team autonomous agents that handle the complexity — delivering clear outcomes, not dashboards.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOLUTIONS.map((s, i) => (
            <RevealDiv key={i} delay={i * 0.08}>
              <div className="bg-background border border-border rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <span className="text-2xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-base text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
