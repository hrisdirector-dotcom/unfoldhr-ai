import { useState } from "react";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const [hov, setHov] = useState(false);
  const isFree = agent.access === "public" && agent.runnable;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`bg-card border rounded-xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col ${
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
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {agent.outcome}
      </p>

      {agent.bullets && agent.bullets.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {agent.bullets.map((bullet, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-3 flex items-center gap-2">
        {isFree ? (
          <span className="text-xs font-semibold text-primary">Run Agent →</span>
        ) : (
          <>
            <span className="text-xs font-semibold text-foreground">View Agent →</span>
            <span className="text-xs text-muted-foreground ml-auto">Build this agent</span>
          </>
        )}
      </div>
    </div>
  );
}
