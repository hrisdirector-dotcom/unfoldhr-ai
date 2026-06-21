import { AGENTS } from "@/data/agents";
import { AgentCard } from "@/components/AgentCard";
import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface AgentsPageProps {
  onSelectAgent: (agentId: string) => void;
  onBuildAgent: (agentId: string) => void;
  setPage: (p: string) => void;
}

export default function AgentsPage({ onSelectAgent, onBuildAgent, setPage }: AgentsPageProps) {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            AI Agents
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-foreground mb-3">
            Two families of agents for modern HR
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-16 leading-relaxed">
            UnfoldHRAI organizes its agents into two families: Control & Readiness agents that
            govern what can move forward, and Decision Agents that turn data into recommended
            action.
          </p>
        </RevealDiv>

        {/* ───────────── Section 1 — Control & Readiness ───────────── */}
        <section className="mb-24">
          <RevealDiv>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[3px] text-primary">
                Family 01 — Lead
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
              Control &amp; Readiness Agents
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-10 leading-relaxed">
              These agents evaluate workforce events and HR actions to determine what can
              progress, what must be held, and what requires approval — turning lifecycle
              activity into governed, auditable outcomes.
            </p>
          </RevealDiv>

          {/* Flagship card */}
          <RevealDiv>
            <button
              onClick={() => setPage("global-lifecycle-agent")}
              className="group w-full text-left rounded-2xl border border-border bg-card hover:border-primary/40 transition-all p-7 md:p-9 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-[2px] text-primary bg-primary/10 px-2.5 py-1 rounded">
                      Flagship
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Control &amp; Readiness
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                    Global Lifecycle Agent
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-5 max-w-2xl">
                    Evaluates pending lifecycle events — hires, transfers, exits, role changes —
                    and returns a release verdict for each: ready, hold, or approval required,
                    with the operating trail.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 max-w-2xl">
                    {[
                      "Release verdicts per event",
                      "Blockers surfaced inline",
                      "Auditable operating trail",
                    ].map((b) => (
                      <div key={b} className="text-sm text-foreground/80 leading-snug">
                        • {b}
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Try the Flagship Agent
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </button>
          </RevealDiv>
        </section>

        {/* ───────────── Section 2 — Decision Agents ───────────── */}
        <section>
          <RevealDiv>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[3px] text-muted-foreground">
                Family 02
              </span>
            </div>
            <h2 className="font-display text-xl md:text-3xl text-foreground mb-4">
              Decision Agents
            </h2>
            <p className="text-muted-foreground text-base max-w-3xl mb-10 leading-relaxed">
              Structured recommendations for specific HR domains — workforce planning,
              listening, performance, compliance, and more. Part of the Decision Support
              product.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AGENTS.map((agent, i) => (
              <RevealDiv key={agent.id} delay={i * 0.04}>
                <AgentCard
                  agent={agent}
                  onSelect={() => onSelectAgent(agent.id)}
                  onBuild={() => onBuildAgent(agent.id)}
                />
              </RevealDiv>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
