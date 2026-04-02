import { useState } from "react";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`bg-card border rounded-xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 ${
        hov ? "border-blue-mid -translate-y-1 shadow-lg shadow-primary/10" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ background: agent.iconBg }}
        >
          {agent.icon}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent text-accent-foreground">
          {agent.category}
        </span>
      </div>

      <h3 className="font-display text-lg text-foreground mb-2 leading-snug">
        {agent.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {agent.outcome}
      </p>

      {hov && (
        <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-center py-2.5 text-sm font-semibold">
          View agent →
        </div>
      )}
    </div>
  );
}
