import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

type Step = "start" | "input" | "result";

const SIZES = ["Under 50", "50–200", "200–500", "500+"];
const GROWTH = ["10%", "20%", "30%"];
const BUDGET = ["Low", "Moderate", "High"];

function generateBrief(size: string, growth: string, budget: string): DecisionBriefProps {
  const growthNum = parseInt(growth);
  const base = size === "Under 50" ? 40 : size === "50–200" ? 120 : size === "200–500" ? 350 : 800;
  const totalHires = Math.round(base * (growthNum / 100));

  const sales = Math.round(totalHires * 0.35);
  const eng = Math.round(totalHires * 0.28);
  const ops = Math.round(totalHires * 0.2);
  const hr = totalHires - sales - eng - ops;

  const q1 = Math.round(totalHires * 0.35);
  const q2 = Math.round(totalHires * 0.28);
  const q3 = Math.round(totalHires * 0.22);
  const q4 = totalHires - q1 - q2 - q3;

  const budgetNote = budget === "High"
    ? "with careful phasing to manage cost peaks"
    : budget === "Low"
    ? "with front-loaded investment in revenue-generating roles"
    : "with supporting functions phased in as operational demand increases";

  const observations = [
    { text: "Sales hiring must lead to avoid revenue lag against growth targets" },
    { text: growthNum >= 30
      ? "Engineering capacity becomes a critical bottleneck if hiring is delayed past Q1"
      : "Engineering capacity becomes a bottleneck by mid-year if delayed" },
    { text: "HR hiring is reactive and should scale with workforce expansion" },
  ];

  const risks = [
    { text: budget === "High" ? "Tight budget may require phased onboarding and contractor support" : "Hiring velocity may outpace onboarding capacity" },
    { text: `Engineering hiring risk is elevated due to limited candidate pipeline in Q2–Q3` },
    { text: growthNum >= 30 ? "Aggressive growth increases attrition risk in Q3–Q4" : "Delayed Sales hiring will directly impact revenue realization timing" },
    { text: "Budget pressure may increase if hiring is backloaded into later quarters" },
  ];

  const confidenceLevel = growthNum >= 30 ? "Low–Medium" : budget === "High" ? "Medium" : "Medium–High";
  const confidenceReason = growthNum >= 30
    ? "Aggressive growth targets introduce significant execution risk across pipeline, onboarding, and retention."
    : "Growth targets are clearly defined, but hiring success depends heavily on market availability and speed of execution.";

  return {
    scenario: "Workforce Planning",
    contextLine: `${base} employees · ${growth} growth · ${budget} budget sensitivity`,
    primaryTitle: `Recommended Hiring Plan for ${growth} Growth`,
    summary: `To support a ${growth} increase in workforce capacity, hiring should be concentrated in revenue-generating roles early in the year, ${budgetNote}.`,
    primaryItems: [
      { label: "Sales", value: `${sales} hires` },
      { label: "Engineering", value: `${eng} hires` },
      { label: "Operations", value: `${ops} hires` },
      { label: "HR & Support", value: `${hr} hires` },
    ],
    secondaryTitle: "Hiring Timeline",
    secondaryItems: [
      { label: "Q1", value: `${q1} hires (focus on Sales to accelerate revenue coverage)` },
      { label: "Q2", value: `${q2} hires (Engineering ramp begins)` },
      { label: "Q3", value: `${q3} hires (HR and operational support roles added)` },
      { label: "Q4", value: `${q4} hires (remaining capacity and backfill)` },
    ],
    observations,
    insights: risks,
    confidence: { level: confidenceLevel, reason: confidenceReason },
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
                  onClick={() => setPage("try-picker")}
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
