import { RevealDiv } from "@/components/RevealDiv";
import AgentDemo from "@/components/AgentDemo";

export default function WorkforcePlanningAgent() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-14 py-32 space-y-20">

        {/* HEADER */}
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-5 bg-accent px-3 py-1.5 rounded-md">
            Workforce Planning Agent
          </span>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Plan your workforce before problems appear
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Turn headcount planning from reactive guesswork into a structured, data-driven process powered by AI agents.
          </p>
        </RevealDiv>

        {/* PROBLEM */}
        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">
              The problem
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Workforce planning is still driven by spreadsheets, disconnected systems, and last-minute decisions.
              HR teams are expected to align hiring with growth targets, budgets, and business strategy — without real-time visibility or predictive insight.
            </p>
          </div>
        </RevealDiv>

        {/* ASK THE AGENT */}
        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">
              Ask the agent
            </h2>

            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "How should we plan headcount for next year based on growth and budget constraints?"
            </p>
          </div>
        </RevealDiv>

        {/* DEMO */}
        <RevealDiv>
          <AgentDemo
            input={["Current headcount: 120", "Growth target: 30%", "Annual hiring budget: $2.4M"]}
            prompt={"You are an HR workforce planning agent.\n\nGiven:\n- Current headcount: 120\n- Growth target: 30%\n- Budget: $2.4M\n\nGenerate a quarterly hiring plan with budget allocation and risk flags."}
            output={"Q1: Hire 12 (Engineering 6, Sales 4, Ops 2) — $680K\nQ2: Hire 10 (Engineering 4, Marketing 3, Support 3) — $580K\nQ3: Hire 9 (Product 3, Sales 3, HR 3) — $540K\nQ4: Hire 5 (buffer + backfills) — $600K\n\n⚠ Risk: Engineering hiring in Q1 depends on updated JDs.\n⚠ Risk: Q4 buffer may be insufficient if attrition exceeds 8%."}
          />
        </RevealDiv>

        {/* OUTPUT VALUE */}
        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">
              What the agent delivers
            </h2>

            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>• Structured headcount plan aligned to business growth</li>
              <li>• Hiring timeline across quarters</li>
              <li>• Budget-aware recommendations</li>
              <li>• Identified risks before execution</li>
            </ul>
          </div>
        </RevealDiv>

        {/* CAPABILITIES */}
        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">
              How the agent works
            </h2>

            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>→ Connects to HR systems</li>
              <li>→ Analyzes workforce composition</li>
              <li>→ Models hiring scenarios</li>
              <li>→ Generates structured outputs</li>
            </ul>
          </div>
        </RevealDiv>

        {/* CTA */}
        <RevealDiv>
          <div className="text-center">
            <button className="px-7 py-3.5 rounded-lg bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-colors">
              Build this agent →
            </button>
          </div>
        </RevealDiv>

      </div>
    </div>
  );
}
