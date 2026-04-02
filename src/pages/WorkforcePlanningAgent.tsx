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
            situation={[
              "Workforce of 120 employees",
              "Planning for 30% growth next year",
              "Operating within a $2.4M annual hiring budget",
            ]}
            question="How should we structure hiring to support growth while staying within budget and avoiding risk?"
            plan={
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Headcount Plan</h4>
                  <div className="space-y-1.5 text-sm text-foreground">
                    <p>Engineering — 14 hires</p>
                    <p>Sales — 10 hires</p>
                    <p>Marketing — 3 hires</p>
                    <p>Product — 3 hires</p>
                    <p>HR &amp; Support — 6 hires</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Hiring Timeline</h4>
                  <div className="space-y-1.5 text-sm text-foreground">
                    <p>Q1 — 12 hires · $680K</p>
                    <p>Q2 — 10 hires · $580K</p>
                    <p>Q3 — 9 hires · $540K</p>
                    <p>Q4 — 5 hires (buffer + backfills) · $600K</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Risks Identified</h4>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p>Engineering hiring in Q1 depends on updated job descriptions</p>
                    <p>Q4 buffer may be insufficient if attrition exceeds 8%</p>
                  </div>
                </div>
              </div>
            }
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
