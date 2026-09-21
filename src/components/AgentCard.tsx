import { useState } from "react";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  onSelect: () => void;
  onBuild?: () => void;
}

export function AgentCard({ agent, onSelect, onBuild }: AgentCardProps) {
  const [hov, setHov] = useState(false);
  const isFree = agent.access === "public" && agent.runnable;

  return (
    <div
      onClick={onSelect}
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
        <a
          href={`/agents/${agent.id}`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            onSelect();
          }}
          className={`text-xs font-semibold no-underline hover:underline ${
            isFree ? "text-primary" : "text-foreground"
          }`}
          aria-label={isFree ? `Run the ${agent.name} agent` : `View the ${agent.name} agent`}
        >
          {isFree ? "Run Agent →" : "View Agent →"}
        </a>
        {!isFree && (
          <button
            type="button"
            className="text-xs text-muted-foreground ml-auto hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"
            aria-label={`Discuss building the ${agent.name} agent`}
            onClick={(e) => {
              e.stopPropagation();
              onBuild?.();
            }}
          >
            Build this agent
          </button>
        )}
      </div>
    </div>
  );
}
