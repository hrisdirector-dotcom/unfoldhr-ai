import { RevealDiv } from "@/components/RevealDiv";
import { Compass } from "lucide-react";

interface AgentTile {
  icon: string;
  name: string;
  subtitle?: string;
  outcome: string;
  status: "Available" | "Coming Soon";
  pageId?: string;
}

const DECISION_AGENTS: AgentTile[] = [
  {
    pageId: "workforce-planning",
    icon: "🏗️",
    name: "Workforce Planning",
    outcome: "Structured hiring plan with priorities, timelines, and risk flags.",
    status: "Available",
  },
  {
    pageId: "performance-management",
    icon: "🎯",
    name: "Performance Management",
    outcome: "Draft review narratives, flag rating bias, and turn survey data into manager action.",
    status: "Available",
  },
  {
    pageId: "employee-listening",
    icon: "👂",
    name: "Employee Listening",
    outcome: "Prioritize listening signals into targeted manager and HR actions.",
    status: "Available",
  },
  {
    pageId: "us-workforce-complexity",
    icon: "🇺🇸",
    name: "US Workforce Complexity",
    outcome: "Map state footprint, payroll model, and operational gaps into a decision brief.",
    status: "Available",
  },
];

interface Props {
  setPage: (p: string) => void;
}

function Tile({ a, onClick }: { a: AgentTile; onClick: () => void }) {
  const clickable = !!a.pageId;
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`bg-background border border-border rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
        clickable
          ? "cursor-pointer hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
          : "opacity-75"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{a.icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
          a.status === "Available" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>{a.status}</span>
      </div>
      <h4 className="font-display text-base text-foreground mb-1">{a.name}</h4>
      {a.subtitle && <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 mb-2">{a.subtitle}</p>}
      <p className="text-sm text-muted-foreground leading-relaxed">{a.outcome}</p>
    </div>
  );
}

export default function ExploreAgentsByType({ setPage }: Props) {
  return (
    <section id="agent-gallery" className="py-24 md:py-32 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="max-w-2xl mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">Secondary Family</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
              Decision Agents
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Turn workforce questions into recommendations, tradeoffs, and decision briefs for HR leaders.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-primary">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display text-xl text-foreground">Decision Agents</h3>
              <p className="text-xs text-muted-foreground">Turn workforce questions into recommendations.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DECISION_AGENTS.map((a, i) => (
              <Tile key={i} a={a} onClick={() => a.pageId && setPage(a.pageId)} />
            ))}
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
