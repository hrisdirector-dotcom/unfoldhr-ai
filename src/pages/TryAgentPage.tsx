import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";
import AgentPageNav from "@/components/AgentPageNav";

type Step = "start" | "input" | "result";

const SIZES = ["Under 50", "50–200", "200–500", "500+"];
const GROWTH = ["10%", "20%", "30%"];
const BUDGET = ["Low", "Moderate", "High"];

function generateBrief(size: string, growth: string, budget: string): DecisionBriefProps {
  const sizeLabel = size === "Under 50" ? "small" : size === "50–200" ? "mid-size" : size === "200–500" ? "scaling" : "large";
  const growthNum = parseInt(growth);
  const isAggressive = growthNum >= 30;

  const budgetNote = budget === "High"
    ? "with careful phasing to manage cost peaks"
    : budget === "Low"
    ? "with front-loaded investment in revenue-generating roles"
    : "with supporting functions phased in as operational demand increases";

  const primaryItems: { label: string; value: string }[] = [
    { label: "Sales & Revenue", value: "Prioritize early to support revenue expansion and avoid growth lag" },
    { label: "Engineering & Product", value: isAggressive
      ? "Phase in aggressively to prevent critical capacity bottlenecks"
      : "Phase in to support delivery and maintain product velocity" },
    { label: "Operations", value: "Scale in alignment with workforce growth to maintain operational stability" },
    { label: "HR & Support", value: budget === "High"
      ? "Add selectively as headcount grows, constrained by budget sensitivity"
      : "Expand as workforce scales to support onboarding and retention" },
  ];

  const secondaryItems: { label: string; value: string }[] = [
    { label: "Early phase", value: "Prioritize revenue-generating roles to support growth targets" },
    { label: "Mid-phase", value: "Expand technical and delivery capacity to sustain scale" },
    { label: "Later phase", value: "Add operational and support functions as demand stabilizes" },
    { label: "Ongoing", value: "Backfill and adjust based on attrition patterns and emerging needs" },
  ];

  const observations = [
    { text: "Growth targets require early investment in revenue roles to avoid downstream lag" },
    { text: isAggressive
      ? "Engineering capacity becomes a critical constraint if hiring is not front-loaded"
      : "Hiring delays in technical roles may create capacity constraints by mid-year" },
    { text: budget === "High"
      ? "Budget sensitivity may limit the ability to hire ahead of demand"
      : "Supporting functions should scale proportionally to avoid operational strain" },
  ];

  const risks = [
    { text: "Delays in revenue-role hiring may directly impact growth realization timing" },
    { text: isAggressive
      ? "Aggressive growth increases attrition risk if onboarding capacity is not scaled accordingly"
      : "Candidate availability may limit speed of execution in key roles" },
    { text: budget === "High"
      ? "Over-hiring early may create cost pressure if growth targets are not met"
      : "Backloading hiring into later phases may create compounding capacity gaps" },
    { text: "Lack of phased onboarding planning may reduce new hire effectiveness" },
  ];

  return {
    scenario: "Based on your selected scenario inputs",
    contextLine: `${size} employees · ${growth} growth target · ${budget} budget sensitivity`,
    primaryTitle: `Workforce Planning Strategy for ${growth} Growth`,
    summary: `For a ${sizeLabel} organization targeting ${growth} growth, hiring should prioritize revenue-generating roles early in the cycle, ${budgetNote}. Supporting functions should be phased to align with operational demand.`,
    primaryItems,
    secondaryTitle: "Hiring Timeline",
    secondaryItems,
    observations,
    insights: risks,
    confidence: {
      level: "Medium",
      reason: "This plan is based on modeled workforce planning patterns aligned to your selected inputs, not actual organizational data.",
    },
  };
}

interface OptionGroupProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}

function OptionGroup({ label, options, selected, onSelect }: OptionGroupProps) {
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
                : "bg-background text-foreground border-border hover:border-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TryAgentPageProps {
  setPage: (p: string) => void;
}

export default function TryAgentPage({ setPage }: TryAgentPageProps) {
  const [step, setStep] = useState<Step>("start");
  const [size, setSize] = useState(SIZES[1]);
  const [growth, setGrowth] = useState(GROWTH[1]);
  const [budget, setBudget] = useState(BUDGET[1]);
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);

  const handleGenerate = () => {
    setBrief(generateBrief(size, growth, budget));
    setStep("result");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-14 py-32">
        <div className="mb-10"><AgentPageNav setPage={setPage} /></div>

        {/* START */}
        {step === "start" && (
          <RevealDiv>
            <div className="text-center space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary bg-accent px-3 py-1.5 rounded-md">
                Try It Now
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                Try the Workforce Planning Agent
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Get a hiring plan aligned to your growth and budget in seconds.
              </p>
              <button
                onClick={() => setStep("input")}
                className="px-8 py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Start
              </button>
            </div>
          </RevealDiv>
        )}

        {/* INPUT */}
        {step === "input" && (
          <RevealDiv>
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-sm text-muted-foreground">
                  Three inputs. One recommendation.
                </p>
              </div>

              <OptionGroup label="Workforce Size" options={SIZES} selected={size} onSelect={setSize} />
              <OptionGroup label="Growth Target" options={GROWTH} selected={growth} onSelect={setGrowth} />
              <OptionGroup label="Budget Sensitivity" options={BUDGET} selected={budget} onSelect={setBudget} />

              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Generate Plan
              </button>
            </div>
          </RevealDiv>
        )}

        {/* RESULT */}
        {step === "result" && brief && (
          <div className="space-y-10">
            <RevealDiv>
              <DecisionBriefCard {...brief} />
            </RevealDiv>

            <RevealDiv delay={0.15}>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">Ready to get started on your AI Agent journey?</p>
                <button
                  onClick={() => setPage("contact")}
                  className="px-8 py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
                >
                  Contact Us Now
                </button>
                <button
                  onClick={() => {
                    setStep("input");
                    setBrief(null);
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
                >
                  ← Try different inputs
                </button>
                <button
                  onClick={() => setPage("agents")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
                >
                  ← Try a different agent
                </button>
              </div>
            </RevealDiv>
          </div>
        )}

      </div>
    </div>
  );
}
