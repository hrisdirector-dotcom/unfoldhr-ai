import { RevealDiv } from "@/components/RevealDiv";
import { ShieldCheck, Compass } from "lucide-react";

interface AgentTile {
  icon: string;
  name: string;
  subtitle?: string;
  outcome: string;
  status: "Available" | "Coming Soon";
  pageId?: string;
}

const CONTROL_READINESS: AgentTile[] = [
  {
    pageId: "global-lifecycle-agent",
    icon: "🌐",
    name: "Global Lifecycle Agent",
    subtitle: "BambooHR Edition",
    outcome: "Evaluates new-hire and termination events for readiness, exceptions, and held actions.",
    status: "Available",
  },
  {
    icon: "🚀",
    name: "New Hire Readiness",
    outcome: "Determines whether a new hire is ready to start: equipment, access, payroll, manager prep.",
    status: "Coming Soon",
  },
  {
    icon: "🛑",
    name: "Termination Control",
    outcome: "Sequences final pay, access revocation, and policy exceptions before release.",
    status: "Coming Soon",
  },
  {
    icon: "💸",
    name: "Payroll Exception Handling",
    outcome: "Catches off-cycle, retro, and policy-conflict pay events before they hit the run.",
    status: "Coming Soon",
  },
];

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
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Explore Agents by Type</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              The UnfoldHRAI agent library.
            </h2>
          </div>
        </RevealDiv>

        {/* Control & Readiness group */}
        <RevealDiv delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display text-xl text-foreground">Control &amp; Readiness Agents</h3>
              <p className="text-xs text-muted-foreground">Determine whether workforce events can progress.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {CONTROL_READINESS.map((a, i) => (
              <Tile key={i} a={a} onClick={() => a.pageId && setPage(a.pageId)} />
            ))}
          </div>
        </RevealDiv>

        {/* Decision Agents group */}
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
