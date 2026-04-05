import { useState } from "react";
import { AGENTS, type Agent } from "@/data/agents";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";
import { ChevronDown } from "lucide-react";

/* ── Input config per agent ── */

interface InputField {
  key: string;
  label: string;
  options: string[];
}

const COMMON_SIZE: InputField = { key: "size", label: "Workforce Size", options: ["Under 50", "50–200", "200–500", "500+"] };

const AGENT_INPUTS: Record<string, InputField[]> = {
  "workforce-planning": [
    COMMON_SIZE,
    { key: "growth", label: "Growth Target", options: ["10%", "20%", "30%"] },
    { key: "budget", label: "Budget Sensitivity", options: ["Low", "Moderate", "High"] },
  ],
  "employee-listening": [
    COMMON_SIZE,
    { key: "trend", label: "Engagement Trend", options: ["Improving", "Flat", "Declining"] },
    { key: "concern", label: "Primary Concern", options: ["Attrition", "Manager effectiveness", "Culture"] },
  ],
  "performance-management": [
    COMMON_SIZE,
    { key: "distribution", label: "Performance Distribution", options: ["Top-heavy", "Balanced", "Bottom-heavy"] },
    { key: "challenge", label: "Primary Challenge", options: ["Low performance", "Goal alignment", "Manager inconsistency"] },
  ],
  "learning-development": [
    COMMON_SIZE,
    { key: "level", label: "Target Level", options: ["IC", "Manager", "Senior Leader"] },
    { key: "gap", label: "Primary Gap", options: ["Technical skills", "Leadership", "Communication"] },
  ],
  "recruiting-ats": [
    COMMON_SIZE,
    { key: "role", label: "Role Type", options: ["Engineering", "Sales", "Product", "Operations"] },
    { key: "urgency", label: "Urgency", options: ["Standard", "High priority", "Critical"] },
  ],
  "onboarding": [
    COMMON_SIZE,
    { key: "department", label: "Department", options: ["Engineering", "Sales", "Product", "Operations"] },
    { key: "location", label: "Location Model", options: ["On-site", "Hybrid", "Remote"] },
  ],
  "compliance": [
    COMMON_SIZE,
    { key: "jurisdictions", label: "Jurisdictions", options: ["Single state", "Multi-state", "International"] },
    { key: "focus", label: "Focus Area", options: ["Policy gaps", "Regulatory changes", "Acknowledgment tracking"] },
  ],
  "comp-benchmarking": [
    COMMON_SIZE,
    { key: "team", label: "Target Team", options: ["Engineering", "Sales", "All functions"] },
    { key: "concern", label: "Primary Concern", options: ["Pay equity", "Market competitiveness", "Band structure"] },
  ],
  "dei-analytics": [
    COMMON_SIZE,
    { key: "dimension", label: "Primary Dimension", options: ["Gender", "Ethnicity", "Age", "All dimensions"] },
    { key: "focus", label: "Focus", options: ["Leadership representation", "Hiring funnel", "Retention"] },
  ],
  "document-generation": [
    COMMON_SIZE,
    { key: "docType", label: "Document Type", options: ["Offer letters", "Promotion letters", "Policy documents"] },
    { key: "volume", label: "Volume", options: ["1–10", "11–50", "50+"] },
  ],
  "employee-relations": [
    COMMON_SIZE,
    { key: "caseVolume", label: "Quarterly Case Volume", options: ["Under 10", "10–30", "30+"] },
    { key: "severity", label: "Typical Severity", options: ["Routine", "Mixed", "Elevated"] },
  ],
  "benefits-admin": [
    COMMON_SIZE,
    { key: "planCount", label: "Plan Options", options: ["2–3 plans", "4–5 plans", "6+ plans"] },
    { key: "phase", label: "Current Phase", options: ["Pre-enrollment", "Open enrollment", "Off-cycle"] },
  ],
};

/* ── Generic brief generator ── */

function getBase(size: string): number {
  return size === "Under 50" ? 40 : size === "50–200" ? 130 : size === "200–500" ? 350 : 800;
}

function generateStudioBrief(agent: Agent, inputs: Record<string, string>): DecisionBriefProps {
  const base = getBase(inputs.size || "50–200");
  const id = agent.id;

  // Use existing generators for the 3 public agents
  if (id === "workforce-planning") return generateWorkforceBrief(base, inputs);
  if (id === "employee-listening") return generateListeningBrief(base, inputs);
  if (id === "performance-management") return generatePerformanceBrief(base, inputs);

  // Generic generator for admin-only agents
  return generateGenericBrief(agent, base, inputs);
}

function generateWorkforceBrief(base: number, inputs: Record<string, string>): DecisionBriefProps {
  const growthNum = parseInt(inputs.growth || "20");
  const budget = inputs.budget || "Moderate";
  const totalHires = Math.round(base * (growthNum / 100));
  const sales = Math.round(totalHires * 0.35);
  const eng = Math.round(totalHires * 0.28);
  const ops = Math.round(totalHires * 0.2);
  const hr = totalHires - sales - eng - ops;
  const q1 = Math.round(totalHires * 0.35);
  const q2 = Math.round(totalHires * 0.28);
  const q3 = Math.round(totalHires * 0.22);
  const q4 = totalHires - q1 - q2 - q3;

  return {
    scenario: "Workforce Planning",
    contextLine: `${base} employees · ${inputs.growth} growth · ${budget} budget sensitivity`,
    primaryTitle: `Recommended Hiring Plan for ${inputs.growth} Growth`,
    summary: `To support a ${inputs.growth} increase in workforce capacity, hiring should be concentrated in revenue-generating roles early in the year.`,
    primaryItems: [
      { label: "Sales", value: `${sales} hires` },
      { label: "Engineering", value: `${eng} hires` },
      { label: "Operations", value: `${ops} hires` },
      { label: "HR & Support", value: `${hr} hires` },
    ],
    secondaryTitle: "Hiring Timeline",
    secondaryItems: [
      { label: "Q1", value: `${q1} hires` },
      { label: "Q2", value: `${q2} hires` },
      { label: "Q3", value: `${q3} hires` },
      { label: "Q4", value: `${q4} hires` },
    ],
    observations: [
      { text: "Sales hiring must lead to avoid revenue lag against growth targets" },
      { text: "Engineering capacity becomes a bottleneck by mid-year if delayed" },
    ],
    insights: [
      { text: "Engineering hiring risk is elevated due to limited candidate pipeline" },
      { text: "Budget pressure may increase if hiring is backloaded" },
    ],
    confidence: {
      level: growthNum >= 30 ? "Low–Medium" : "Medium",
      reason: "Growth targets are defined, but execution depends on market availability.",
    },
  };
}

function generateListeningBrief(base: number, inputs: Record<string, string>): DecisionBriefProps {
  const trend = inputs.trend || "Flat";
  const concern = inputs.concern || "Attrition";
  const scoreMap: Record<string, number> = { Improving: 74, Flat: 61, Declining: 47 };
  const score = scoreMap[trend] || 61;

  return {
    scenario: "Employee Listening",
    contextLine: `${base} employees · ${trend} trend · Focus: ${concern}`,
    primaryTitle: "Sentiment Summary",
    summary: `Overall engagement is ${trend.toLowerCase()} with ${concern.toLowerCase()} emerging as the primary area requiring action.`,
    primaryItems: [
      { label: "Overall score", value: `${score} / 100` },
      { label: "Trend", value: trend },
      { label: "Survey coverage", value: `${Math.round(base * 0.78)} of ${base} responded` },
    ],
    secondaryTitle: "Key Themes",
    secondaryItems: [
      { label: concern, value: "Primary driver of engagement variance" },
      { label: "Manager effectiveness", value: "Secondary factor across 3 teams" },
    ],
    observations: [
      { text: `${concern} is the dominant theme across open-text responses` },
      { text: "Survey fatigue may reduce response quality in future cycles" },
    ],
    insights: [
      { text: trend === "Declining" ? "Rapid decline increases attrition risk within 60–90 days" : "Maintaining momentum requires visible action from leadership" },
    ],
    confidence: {
      level: trend === "Declining" ? "Low" : "Medium",
      reason: "Confidence depends on response rate quality and manager follow-through.",
    },
  };
}

function generatePerformanceBrief(base: number, inputs: Record<string, string>): DecisionBriefProps {
  const dist = inputs.distribution || "Balanced";
  const challenge = inputs.challenge || "Low performance";
  const pcts: Record<string, { top: number; meets: number; below: number }> = {
    "Top-heavy": { top: 45, meets: 40, below: 15 },
    Balanced: { top: 22, meets: 58, below: 20 },
    "Bottom-heavy": { top: 12, meets: 38, below: 50 },
  };
  const d = pcts[dist] || pcts["Balanced"];

  return {
    scenario: "Performance Management",
    contextLine: `${base} employees · ${dist} distribution · Focus: ${challenge}`,
    primaryTitle: "Performance Summary",
    summary: `The current ${dist.toLowerCase()} distribution reveals ${challenge.toLowerCase()} as the most pressing concern requiring structured intervention.`,
    primaryItems: [
      { label: "Exceeds expectations", value: `${Math.round(base * d.top / 100)} employees (${d.top}%)` },
      { label: "Meets expectations", value: `${Math.round(base * d.meets / 100)} employees (${d.meets}%)` },
      { label: "Below expectations", value: `${Math.round(base * d.below / 100)} employees (${d.below}%)` },
    ],
    secondaryTitle: "Key Observations",
    secondaryItems: [
      { label: "Primary challenge", value: challenge },
      { label: "Calibration status", value: dist === "Top-heavy" ? "Rating inflation detected" : "Within normal variance" },
    ],
    observations: [
      { text: `${challenge} is concentrated in teams with newest management` },
    ],
    insights: [
      { text: "Calibration enforcement may surface manager resistance" },
      { text: "Aggressive correction without support systems accelerates unwanted attrition" },
    ],
    confidence: {
      level: dist === "Bottom-heavy" ? "Low–Medium" : "Medium",
      reason: "Assessment accuracy depends on completeness of manager notes and peer feedback.",
    },
  };
}

function generateGenericBrief(agent: Agent, base: number, inputs: Record<string, string>): DecisionBriefProps {
  const inputEntries = Object.entries(inputs).filter(([k]) => k !== "size");
  const contextParts = [`${base} employees`, ...inputEntries.map(([, v]) => v)];

  // Pull from the agent's existing brief data as a template and customize
  const brief = agent.briefData;
  return {
    scenario: brief.scenario,
    contextLine: contextParts.join(" · "),
    primaryTitle: brief.primaryTitle,
    summary: `Analysis for a ${base}-employee organization, tailored to the selected parameters. ${agent.valueStatement}`,
    primaryItems: brief.primaryItems.map(item => ({
      label: item.label,
      value: scaleValue(item.value, base),
    })),
    secondaryTitle: brief.secondaryTitle,
    secondaryItems: brief.secondaryItems,
    observations: brief.observations || [
      { text: `Outputs are calibrated for the specified organizational context` },
      { text: `${inputEntries.map(([, v]) => v).join(" and ")} factors shape the recommendation` },
    ],
    insights: brief.insights,
    confidence: brief.confidence || {
      level: "Medium",
      reason: "Recommendation quality increases with connected data sources and validated inputs.",
    },
  };
}

function scaleValue(value: string, base: number): string {
  const num = parseInt(value);
  if (isNaN(num)) return value;
  const scale = base / 130;
  return `${Math.round(num * scale)}`;
}

/* ── Option Group UI ── */

function OptionGroup({ label, options, selected, onSelect }: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
              selected === opt
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground border-border hover:border-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function AdminAgentStudio() {
  const runnableAgents = AGENTS.filter(a => a.runnable);
  const [selectedId, setSelectedId] = useState(runnableAgents[0]?.id || "");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedAgent = AGENTS.find(a => a.id === selectedId);
  const fields = AGENT_INPUTS[selectedId] || [COMMON_SIZE];

  const handleSelectAgent = (id: string) => {
    setSelectedId(id);
    setInputs({});
    setBrief(null);
    setDropdownOpen(false);
  };

  const handleGenerate = () => {
    if (!selectedAgent) return;
    // Fill defaults for any missing inputs
    const filled = { ...inputs };
    for (const field of fields) {
      if (!filled[field.key]) filled[field.key] = field.options[0];
    }
    setBrief(generateStudioBrief(selectedAgent, filled));
  };

  const updateInput = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setBrief(null);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[3px] text-primary mb-2">
            Agent Studio
          </span>
          <h1 className="font-display text-3xl text-foreground mb-1">
            Run an Agent
          </h1>
          <p className="text-sm text-muted-foreground">
            Select an agent, configure inputs, and generate live advisory outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Agent selector + inputs */}
          <div className="space-y-8">
            {/* Agent selector */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                Select Agent
              </p>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-card border border-border rounded-xl text-sm font-medium text-foreground cursor-pointer hover:border-foreground/30 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {selectedAgent && (
                      <>
                        <span className="text-lg">{selectedAgent.icon}</span>
                        <span>{selectedAgent.name}</span>
                      </>
                    )}
                  </span>
                  <ChevronDown size={16} className={`text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg max-h-80 overflow-y-auto">
                    {runnableAgents.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => handleSelectAgent(agent.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left cursor-pointer border-none transition-colors ${
                          agent.id === selectedId
                            ? "bg-accent text-primary"
                            : "bg-transparent text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="text-lg">{agent.icon}</span>
                        <div>
                          <span className="font-medium">{agent.name}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{agent.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic inputs */}
            {fields.map(field => (
              <OptionGroup
                key={`${selectedId}-${field.key}`}
                label={field.label}
                options={field.options}
                selected={inputs[field.key] || field.options[0]}
                onSelect={(v) => updateInput(field.key, v)}
              />
            ))}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="w-full py-4 rounded-xl bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
            >
              Generate Output
            </button>
          </div>

          {/* RIGHT: Output */}
          <div>
            {brief ? (
              <div className="space-y-6">
                <DecisionBriefCard {...brief} />
                <div className="flex justify-center">
                  <button
                    onClick={() => setBrief(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
                  >
                    ← Adjust inputs
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] border border-dashed border-border rounded-2xl">
                <div className="text-center px-8">
                  <p className="text-lg text-muted-foreground/60 mb-2">
                    {selectedAgent?.icon}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Configure inputs and click <span className="font-medium text-foreground">Generate Output</span> to see the decision brief.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
