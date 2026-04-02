import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

type Step = "start" | "input" | "result";

const SIZES = ["Under 50", "50–200", "200–500", "500+"];
const TRENDS = ["Improving", "Flat", "Declining"];
const CONCERNS = ["Attrition", "Manager effectiveness", "Culture"];

function generateBrief(size: string, trend: string, concern: string): DecisionBriefProps {
  const base = size === "Under 50" ? 40 : size === "50–200" ? 130 : size === "200–500" ? 350 : 800;

  const sentimentMap: Record<string, Record<string, { score: string; direction: string }>> = {
    Improving: {
      Attrition: { score: "72 / 100", direction: "Up 6 pts from prior quarter" },
      "Manager effectiveness": { score: "74 / 100", direction: "Up 5 pts — manager NPS rising" },
      Culture: { score: "76 / 100", direction: "Up 8 pts — culture initiatives gaining traction" },
    },
    Flat: {
      Attrition: { score: "61 / 100", direction: "No meaningful change in 2 quarters" },
      "Manager effectiveness": { score: "58 / 100", direction: "Stagnant — manager feedback loops underutilized" },
      Culture: { score: "63 / 100", direction: "Flat — employees report mixed signals on values" },
    },
    Declining: {
      Attrition: { score: "47 / 100", direction: "Down 9 pts — exit survey themes worsening" },
      "Manager effectiveness": { score: "44 / 100", direction: "Down 11 pts — skip-level complaints rising" },
      Culture: { score: "49 / 100", direction: "Down 7 pts — trust and belonging scores dropping" },
    },
  };

  const themesMap: Record<string, { label: string; value: string }[]> = {
    Attrition: [
      { label: "Compensation concerns", value: "Cited in 38% of exit interviews as a contributing factor" },
      { label: "Career growth gaps", value: "62% of departing employees report limited advancement paths" },
      { label: "Workload imbalance", value: "High performers carry disproportionate load in key teams" },
    ],
    "Manager effectiveness": [
      { label: "Inconsistent 1:1 cadence", value: "Only 41% of managers hold regular check-ins" },
      { label: "Feedback quality", value: "Employees rate manager feedback 2.8 / 5 on usefulness" },
      { label: "New manager readiness", value: "34% of first-time managers received no onboarding support" },
    ],
    Culture: [
      { label: "Values–behavior gap", value: "Employees see stated values practiced only 55% of the time" },
      { label: "Inclusion perception", value: "Underrepresented groups score belonging 18 pts lower than average" },
      { label: "Cross-team trust", value: "Inter-departmental collaboration rated 2.4 / 5 by ICs" },
    ],
  };

  const actionsMap: Record<string, { label: string; value: string }[]> = {
    Attrition: [
      { label: "Launch stay interviews", value: "Target top 15% performers in highest-risk departments" },
      { label: "Audit compensation bands", value: "Benchmark against market for roles with >20% turnover" },
      { label: "Create internal mobility program", value: "Pilot lateral movement paths in Engineering and Sales" },
    ],
    "Manager effectiveness": [
      { label: "Mandate structured 1:1s", value: "Roll out cadence template with lightweight tracking" },
      { label: "Launch manager coaching cohort", value: "6-week program for managers scoring below 3.0" },
      { label: "Introduce upward feedback loops", value: "Quarterly anonymous pulse on manager effectiveness" },
    ],
    Culture: [
      { label: "Run values alignment workshops", value: "Facilitated sessions per department over 60 days" },
      { label: "Establish ERG sponsorship model", value: "Assign executive sponsors with defined accountability" },
      { label: "Redesign onboarding for culture integration", value: "Add values immersion in first 30 days" },
    ],
  };

  const risksMap: Record<string, { text: string }[]> = {
    Improving: [
      { text: "Momentum may mask emerging pockets of disengagement in specific teams" },
      { text: "Over-reliance on aggregate scores can obscure manager-level variance" },
    ],
    Flat: [
      { text: "Stagnation often precedes decline — without intervention, scores may drop within 1–2 quarters" },
      { text: "Survey fatigue is likely if employees don't see visible action from prior feedback" },
    ],
    Declining: [
      { text: "Rapid score decline increases attrition risk — expect a 60–90 day lag before voluntary exits spike" },
      { text: "Leadership credibility is at stake if listening efforts aren't paired with visible, fast action" },
    ],
  };

  const sentiment = sentimentMap[trend][concern];

  return {
    scenario: "Employee Listening",
    contextLine: `${base} employees · ${trend} engagement trend · Focus: ${concern}`,
    primaryTitle: "Sentiment Summary",
    primaryItems: [
      { label: "Overall engagement score", value: sentiment.score },
      { label: "Trend", value: sentiment.direction },
      { label: "Survey coverage", value: `${Math.round(base * 0.78)} of ${base} employees responded` },
    ],
    secondaryTitle: "Key Themes",
    secondaryItems: themesMap[concern],
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: actionsMap[concern],
    insights: risksMap[trend],
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

interface TryListeningAgentPageProps {
  setPage: (p: string) => void;
}

export default function TryListeningAgentPage({ setPage }: TryListeningAgentPageProps) {
  const [step, setStep] = useState<Step>("start");
  const [size, setSize] = useState(SIZES[1]);
  const [trend, setTrend] = useState(TRENDS[1]);
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);

  const handleGenerate = () => {
    setBrief(generateBrief(size, trend, concern));
    setStep("result");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-14 py-32">
        {step === "start" && (
          <RevealDiv>
            <div className="text-center space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary bg-accent px-3 py-1.5 rounded-md">
                Try It Now
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                Try the Employee Listening Agent
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Surface what your workforce is really saying — and what to do about it.
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

        {step === "input" && (
          <RevealDiv>
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-sm text-muted-foreground">
                  Three inputs. One clear picture.
                </p>
              </div>

              <OptionGroup label="Workforce Size" options={SIZES} selected={size} onSelect={setSize} />
              <OptionGroup label="Engagement Trend" options={TRENDS} selected={trend} onSelect={setTrend} />
              <OptionGroup label="Primary Concern" options={CONCERNS} selected={concern} onSelect={setConcern} />

              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Generate Insights
              </button>
            </div>
          </RevealDiv>
        )}

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
