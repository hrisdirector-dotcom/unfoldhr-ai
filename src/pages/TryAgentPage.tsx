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

  const eng = Math.round(totalHires * 0.35);
  const sales = Math.round(totalHires * 0.28);
  const ops = Math.round(totalHires * 0.2);
  const hr = totalHires - eng - sales - ops;

  const q1 = Math.round(totalHires * 0.35);
  const q2 = Math.round(totalHires * 0.28);
  const q3 = Math.round(totalHires * 0.22);
  const q4 = totalHires - q1 - q2 - q3;

  const risks = [
    { text: budget === "High" ? "Tight budget may require phased onboarding" : "Hiring velocity may outpace onboarding capacity" },
    { text: growthNum >= 30 ? "Aggressive growth increases attrition risk in Q3–Q4" : "Pipeline readiness is critical for Q1 execution" },
  ];

  if (budget === "High") {
    risks.push({ text: "Consider contractor support to manage cost peaks" });
  }

  return {
    scenario: "Workforce Planning",
    contextLine: `${base} employees · ${growth} growth · ${budget} budget sensitivity`,
    primaryTitle: `Recommended Hiring Plan for ${growth} Growth`,
    primaryItems: [
      { label: "Engineering", value: `${eng} hires` },
      { label: "Sales", value: `${sales} hires` },
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
    insights: risks,
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
                <button
                  onClick={() => setPage("contact")}
                  className="px-8 py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
                >
                  Request a Demo
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
                  onClick={() => setPage("home")}
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
