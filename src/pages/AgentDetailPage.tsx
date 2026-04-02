import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAgentById } from "@/data/agents";
import type { Agent } from "@/data/agents";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import { RevealDiv } from "@/components/RevealDiv";

interface AgentDetailPageProps {
  agentId: string;
  setPage: (p: string) => void;
}

function ExpandableSection({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-left"
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 space-y-2">
          {items.map((item, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed pl-0.5">
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AgentDetailPage({ agentId, setPage }: AgentDetailPageProps) {
  const agent = getAgentById(agentId);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Agent not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-14 py-32 space-y-16">
        {/* Header */}
        <RevealDiv>
          <div className="flex items-center gap-3 mb-6">
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
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4 leading-tight">
            {agent.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {agent.valueStatement}
          </p>
        </RevealDiv>

        {/* Decision Brief Card */}
        <RevealDiv>
          <DecisionBriefCard {...agent.briefData} />
        </RevealDiv>

        {/* Supporting Insight */}
        <RevealDiv>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {agent.supportingInsight}
          </p>
        </RevealDiv>

        {/* Expandable Sections */}
        <RevealDiv>
          <div className="border-t border-border">
            <ExpandableSection title="Business Context" items={agent.businessContext} />
            <ExpandableSection title="How It Works" items={agent.howItWorks} />
            <ExpandableSection title="What You Get" items={agent.whatYouGet} />
            <ExpandableSection title="Execution Risks" items={agent.executionRisks} />
          </div>
        </RevealDiv>

        {/* CTA */}
        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-5">
              See how this applies to your organization
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setPage("contact")}
                className="px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold border-none cursor-pointer hover:bg-primary transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => setPage("agents")}
                className="px-6 py-3 border border-border text-foreground rounded-lg text-sm font-semibold bg-transparent cursor-pointer hover:bg-muted transition-colors"
              >
                Back to Agents
              </button>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}
