import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

type Step = "start" | "input" | "result";

const SIZES = ["Under 50", "50–200", "200–500", "500+"];
const DISTRIBUTIONS = ["Top-heavy", "Balanced", "Bottom-heavy"];
const CHALLENGES = ["Low performance", "Goal alignment", "Manager inconsistency"];

function generateBrief(size: string, distribution: string, challenge: string): DecisionBriefProps {
  const base = size === "Under 50" ? 40 : size === "50–200" ? 130 : size === "200–500" ? 350 : 800;

  const distPcts: Record<string, { top: number; meets: number; below: number }> = {
    "Top-heavy": { top: 45, meets: 40, below: 15 },
    Balanced: { top: 22, meets: 58, below: 20 },
    "Bottom-heavy": { top: 12, meets: 38, below: 50 },
  };

  const d = distPcts[distribution];
  const topCount = Math.round(base * (d.top / 100));
  const meetsCount = Math.round(base * (d.meets / 100));
  const belowCount = base - topCount - meetsCount;

  const summaryMap: Record<string, Record<string, { label: string; value: string }[]>> = {
    "Top-heavy": {
      "Low performance": [
        { label: "Rating inflation detected", value: `${d.top}% rated "Exceeds" — significantly above industry norms of 15–20%` },
        { label: "Low-performer identification gap", value: `Only ${belowCount} employees flagged — likely undercounting by 2–3×` },
        { label: "Calibration variance", value: "3 departments show >25% deviation from company-wide averages" },
      ],
      "Goal alignment": [
        { label: "Rating inflation detected", value: `${d.top}% rated top tier despite inconsistent goal completion` },
        { label: "Goal-to-rating disconnect", value: "42% of high-rated employees completed fewer than 60% of objectives" },
        { label: "Cascade gap", value: "Only 35% of individual goals trace clearly to team or company priorities" },
      ],
      "Manager inconsistency": [
        { label: "Rating inflation driven by managers", value: `Top 10 managers account for 68% of "Exceeds" ratings` },
        { label: "Calibration not enforced", value: "5 of 12 departments skipped formal calibration last cycle" },
        { label: "Experience bias", value: "Managers with <2 years tenure rate 30% higher than experienced peers" },
      ],
    },
    Balanced: {
      "Low performance": [
        { label: "Distribution appears healthy", value: `${d.top}% Exceeds · ${d.meets}% Meets · ${d.below}% Below` },
        { label: "PIP conversion rate", value: "Only 22% of below-expectations employees entered a formal improvement plan" },
        { label: "Repeat low performers", value: `${Math.round(belowCount * 0.4)} employees rated below expectations for 2+ consecutive cycles` },
      ],
      "Goal alignment": [
        { label: "Distribution is stable", value: `${d.top}% Exceeds · ${d.meets}% Meets · ${d.below}% Below` },
        { label: "Goal clarity gap", value: "31% of employees report unclear expectations from their manager" },
        { label: "OKR adoption", value: "Only 48% of teams use a structured goal framework consistently" },
      ],
      "Manager inconsistency": [
        { label: "Distribution looks balanced", value: `${d.top}% Exceeds · ${d.meets}% Meets · ${d.below}% Below` },
        { label: "Manager spread variance", value: "Standard deviation across managers is 18% — moderate inconsistency" },
        { label: "Feedback frequency gap", value: "36% of employees received formal feedback only during annual review" },
      ],
    },
    "Bottom-heavy": {
      "Low performance": [
        { label: "Systemic underperformance", value: `${d.below}% of workforce rated below expectations — well above the 10–15% norm` },
        { label: "Root cause indicators", value: "Correlated with low onboarding completion (58%) and manager vacancy rate (14%)" },
        { label: "Turnover risk", value: `${Math.round(belowCount * 0.35)} below-expectations employees are also flagged as flight risks` },
      ],
      "Goal alignment": [
        { label: "Goal-setting failure", value: `${d.below}% rated below expectations — 71% of those had no documented goals at cycle start` },
        { label: "Mid-cycle check-in gap", value: "Only 29% of managers conducted a formal mid-cycle review" },
        { label: "Outcome misalignment", value: "Top-rated employees show no stronger goal completion than mid-tier" },
      ],
      "Manager inconsistency": [
        { label: "Manager-driven underrating", value: `Bottom-heavy distribution concentrated in 4 departments with newest leadership` },
        { label: "Calibration absent", value: "No cross-functional calibration occurred in last 2 review cycles" },
        { label: "Rating confidence", value: "52% of managers report feeling 'uncertain' about their performance assessments" },
      ],
    },
  };

  const actionsMap: Record<string, { label: string; value: string }[]> = {
    "Low performance": [
      { label: "Implement structured PIP framework", value: "Standardize timelines, milestones, and exit criteria across all departments" },
      { label: "Launch manager calibration sessions", value: "Quarterly cross-functional reviews to align rating standards" },
      { label: "Introduce performance coaching program", value: "Pair below-expectations employees with trained coaches for 90-day sprints" },
    ],
    "Goal alignment": [
      { label: "Deploy goal-setting workshops", value: "Train managers on cascading company objectives into individual goals" },
      { label: "Mandate mid-cycle check-ins", value: "Require documented goal review at cycle midpoint for all employees" },
      { label: "Adopt shared goal framework", value: "Pilot OKR methodology in 3 departments before company-wide rollout" },
    ],
    "Manager inconsistency": [
      { label: "Require calibration participation", value: "Make cross-team calibration mandatory for all people managers" },
      { label: "Provide rating rubrics", value: "Distribute clear behavioral anchors for each performance level" },
      { label: "Launch new-manager onboarding", value: "Include performance management training in first 60 days for all new managers" },
    ],
  };

  const risksMap: Record<string, { text: string }[]> = {
    "Top-heavy": [
      { text: "Deflating ratings without clear communication risks damaging trust and increasing attrition among high performers" },
      { text: "Calibration enforcement may surface manager resistance — executive sponsorship is critical" },
    ],
    Balanced: [
      { text: "Balanced distributions can mask inconsistency at the department level — drill down before assuming health" },
      { text: "Maintaining calibration discipline requires ongoing investment; regression is common after initial effort" },
    ],
    "Bottom-heavy": [
      { text: "Aggressive performance management without support systems accelerates unwanted attrition alongside managed exits" },
      { text: "If root causes are systemic (onboarding, management gaps), individual PIPs alone will not move the distribution" },
    ],
  };

  return {
    scenario: "Performance Management",
    contextLine: `${base} employees · ${distribution} distribution · Focus: ${challenge}`,
    primaryTitle: "Performance Summary",
    primaryItems: summaryMap[distribution][challenge],
    secondaryTitle: "Key Observations",
    secondaryItems: [
      { label: "Exceeds expectations", value: `${topCount} employees (${d.top}%)` },
      { label: "Meets expectations", value: `${meetsCount} employees (${d.meets}%)` },
      { label: "Below expectations", value: `${belowCount} employees (${d.below}%)` },
    ],
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: actionsMap[challenge],
    insights: risksMap[distribution],
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

interface TryPerformanceAgentPageProps {
  setPage: (p: string) => void;
}

export default function TryPerformanceAgentPage({ setPage }: TryPerformanceAgentPageProps) {
  const [step, setStep] = useState<Step>("start");
  const [size, setSize] = useState(SIZES[1]);
  const [distribution, setDistribution] = useState(DISTRIBUTIONS[1]);
  const [challenge, setChallenge] = useState(CHALLENGES[0]);
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);

  const handleGenerate = () => {
    setBrief(generateBrief(size, distribution, challenge));
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
                Try the Performance Management Agent
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                See where your performance system is working — and where it's failing your people.
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
                  Three inputs. One honest assessment.
                </p>
              </div>

              <OptionGroup label="Workforce Size" options={SIZES} selected={size} onSelect={setSize} />
              <OptionGroup label="Performance Distribution" options={DISTRIBUTIONS} selected={distribution} onSelect={setDistribution} />
              <OptionGroup label="Primary Challenge" options={CHALLENGES} selected={challenge} onSelect={setChallenge} />

              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Generate Assessment
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
              <p className="text-sm text-muted-foreground mb-4">Ready to get started on your AI Agent journey?</p>
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
