import { RevealDiv } from "@/components/RevealDiv";

const SHOWCASE_AGENTS = [
  {
    icon: "🏗️",
    name: "Workforce Planning",
    outcome: "Get a structured hiring plan with priorities, timelines, and risk flags — in minutes.",
    benefit: "Replace weeks of spreadsheet modeling",
    tag: "Try Free",
    action: "try-picker",
  },
  {
    icon: "🔍",
    name: "Recruiting & Screening",
    outcome: "Screen candidates, rank by role fit, and generate personalized outreach — automatically.",
    benefit: "Move candidates forward faster",
    tag: "Coming Soon",
    action: "agents",
  },
  {
    icon: "🚀",
    name: "Onboarding Agent",
    outcome: "Generate role-specific 30-60-90 day plans, assign tasks, and coordinate across teams.",
    benefit: "Every new hire starts fully prepared",
    tag: "Coming Soon",
    action: "agents",
  },
  {
    icon: "🎯",
    name: "Performance & Engagement",
    outcome: "Draft review narratives, flag rating bias, and turn survey data into manager action plans.",
    benefit: "Fairer, faster review cycles",
    tag: "Try Free",
    action: "try-picker",
  },
  {
    icon: "⚖️",
    name: "Compliance Risk Agent",
    outcome: "Detect policy gaps, track regulatory changes, and generate audit-ready documentation.",
    benefit: "Reduce compliance risk proactively",
    tag: "Coming Soon",
    action: "agents",
  },
];

interface AgentsShowcaseProps {
  setPage: (p: string) => void;
}

export default function AgentsShowcase({ setPage }: AgentsShowcaseProps) {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">AI Agents</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Purpose-built agents for every HR workflow
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each agent delivers clear, structured recommendations — from workforce planning to compliance risk assessment.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHOWCASE_AGENTS.map((agent, i) => (
            <RevealDiv key={i} delay={i * 0.06}>
              <div
                onClick={() => setPage(agent.action)}
                className="bg-background border border-border rounded-2xl p-7 cursor-pointer h-full flex flex-col hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{agent.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    agent.tag === "Try Free"
                      ? "bg-accent text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {agent.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{agent.outcome}</p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-primary">{agent.benefit} →</p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.3}>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage("agents")}
              className="px-7 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-primary hover:text-primary transition-all duration-200"
            >
              View All Agents →
            </button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
