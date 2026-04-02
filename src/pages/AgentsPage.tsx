import { AGENTS } from "@/data/agents";
import { AgentCard } from "@/components/AgentCard";
import { RevealDiv } from "@/components/RevealDiv";

interface AgentsPageProps {
  onSelectAgent: (agentId: string) => void;
}

export default function AgentsPage({ onSelectAgent }: AgentsPageProps) {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            AI Agents
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-foreground mb-3">
            Structured decisions for every HR domain
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            Each agent delivers clear, data-driven recommendations — from workforce planning to compliance risk assessment.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map((agent, i) => (
            <RevealDiv key={agent.id} delay={i * 0.05}>
              <AgentCard agent={agent} onClick={() => onSelectAgent(agent.id)} />
            </RevealDiv>
          ))}
        </div>
      </div>
    </div>
  );
}
