import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";
import { Textarea } from "@/components/ui/textarea";
import AgentPageNav from "@/components/AgentPageNav";
import {
  SIZES,
  DISTRIBUTIONS,
  CHALLENGES,
  CADENCES,
  BLOCKERS,
  generatePerformanceBrief,
} from "@/data/performanceAgentData";

type Step = "start" | "input" | "result";

interface OptionGroupProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}

function OptionGroup({ label, options, selected, onSelect }: OptionGroupProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
        {label}
      </p>
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
  const [cadence, setCadence] = useState(CADENCES[0]);
  const [blocker, setBlocker] = useState(BLOCKERS[0]);
  const [context, setContext] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);

  const handleGenerate = () => {
    setBrief(generatePerformanceBrief(size, distribution, challenge, cadence, blocker, context));
    setStep("result");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-14 py-32">
        <div className="mb-10"><AgentPageNav setPage={setPage} /></div>
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
                  A few inputs. One honest assessment.
                </p>
              </div>

              <OptionGroup label="Workforce Size" options={SIZES} selected={size} onSelect={setSize} />
              <OptionGroup label="Performance Distribution" options={DISTRIBUTIONS} selected={distribution} onSelect={setDistribution} />
              <OptionGroup label="Primary Challenge" options={CHALLENGES} selected={challenge} onSelect={setChallenge} />

              {/* Expandable additional context */}
              {!showMore && (
                <button
                  onClick={() => setShowMore(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
                >
                  + Add more context
                </button>
              )}

              {showMore && (
                <div className="space-y-10">
                  <OptionGroup label="Current Review Cadence" options={CADENCES} selected={cadence} onSelect={setCadence} />
                  <OptionGroup label="Biggest Blocker" options={BLOCKERS} selected={blocker} onSelect={setBlocker} />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                      What is breaking down most in your performance process right now?
                    </p>
                    <Textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Example: Managers identify low performance but rarely follow through with formal plans."
                      className="resize-none text-sm"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1.5">Optional</p>
                  </div>
                </div>
              )}

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
