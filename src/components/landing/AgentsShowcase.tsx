import { RevealDiv } from "@/components/RevealDiv";

const SHOWCASE_AGENTS = [
  {
    icon: "🏗️",
    name: "Workforce Planning",
    outcome: "Get a structured hiring plan with priorities, timelines, and risk flags — in minutes.",
    benefit: "Replace weeks of spreadsheet modeling",
    tag: "Try Free",
  },
  {
    icon: "🔍",
    name: "Recruiting & Screening",
    outcome: "Screen candidates, rank by role fit, and generate personalized outreach — automatically.",
    benefit: "Move candidates forward faster",
    tag: "Try Free",
  },
  {
    icon: "🚀",
    name: "Onboarding Agent",
    outcome: "Generate role-specific 30-60-90 day plans, assign tasks, and coordinate across teams.",
    benefit: "Every new hire starts fully prepared",
    tag: "Try Free",
  },
  {
    icon: "🎯",
    name: "Performance Management",
    outcome: "Draft review narratives, flag rating bias, and turn survey data into manager action plans.",
    benefit: "Fairer, faster review cycles",
    tag: "Featured",
  },
  {
    icon: "👂",
    name: "Employee Listening",
    outcome: "Analyze sentiment, surface engagement trends, and suggest targeted improvements.",
    benefit: "Understand what your workforce really needs",
    tag: "Featured",
  },
  {
    icon: "⚖️",
    name: "Compliance Risk",
    outcome: "Detect policy gaps, track regulatory changes, and generate audit-ready documentation.",
    benefit: "Reduce compliance risk proactively",
    tag: "Try Free",
  },
];

interface AgentsShowcaseProps {
  setPage: (p: string) => void;
}

export default function AgentsShowcase({ setPage }: AgentsShowcaseProps) {
  const scrollToGallery = () => {
    setPage("home");
    setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

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
                onClick={scrollToGallery}
                className="bg-background border border-border rounded-2xl p-7 cursor-pointer h-full flex flex-col hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{agent.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    agent.tag === "Featured"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary"
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
              onClick={scrollToGallery}
              className="px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200"
            >
              Try All Agents →
            </button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
