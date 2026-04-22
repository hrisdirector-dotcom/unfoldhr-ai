import { useMemo, useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { downloadCSV, downloadPDF } from "@/lib/downloadResult";
import { Bookmark, Download, RotateCcw, Presentation } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Step = "start" | "decision" | "guided" | "result";

interface TryUSWorkforceAgentPageProps {
  setPage: (p: string) => void;
}

const DECISIONS = [
  { id: "expand", label: "Expand into new US states", helper: "Evaluate the implications of broadening your state footprint." },
  { id: "consolidate", label: "Consolidate payroll providers", helper: "Decide whether to unify your payroll ownership model." },
  { id: "risk", label: "Evaluate compliance risk", helper: "Surface where exposure may be growing across jurisdictions." },
  { id: "operations", label: "Improve payroll operations", helper: "Identify operational gaps slowing down execution." },
  { id: "cost", label: "Reduce cost or inefficiency", helper: "Find structural inefficiencies to address." },
  { id: "scale", label: "Prepare for scale or acquisition", helper: "Pressure-test readiness for the next stage." },
] as const;

const FOOTPRINTS = ["1 state", "2–5 states", "6–15 states", "16+ states"];
const STRUCTURES = ["Mostly W2", "Mostly contractors", "Balanced W2 / contractor mix", "Highly distributed (W2 + 1099 + agency)"];
const OWNERSHIP = ["In-house", "Fully outsourced", "Hybrid (in-house + provider)"];
const TAX_COMPLEXITY = ["Single-state, simple", "Multi-state, no local taxes", "Multi-state with local taxes", "Multi-state + local + reciprocity"];
const BENEFITS = ["Standard, single carrier", "Multiple plans, single carrier", "Multi-carrier, multi-plan", "Highly customized by group"];
const CHALLENGE_OPTIONS = [
  "Manual processes",
  "Frequent errors or corrections",
  "Delays in close or payments",
  "Limited visibility into data",
  "Compliance gaps",
  "Difficulty scaling",
];

interface ChipGroupProps {
  label: string;
  options: readonly string[];
  selected: string;
  onSelect: (v: string) => void;
}

function ChipGroup({ label, options, selected, onSelect }: ChipGroupProps) {
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

interface MultiChipGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}

function MultiChipGroup({ label, options, selected, onToggle }: MultiChipGroupProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TryUSWorkforceAgentPage({ setPage }: TryUSWorkforceAgentPageProps) {
  const [step, setStep] = useState<Step>("start");
  const [decision, setDecision] = useState<typeof DECISIONS[number] | null>(null);

  // Guided flow state
  const [phase, setPhase] = useState(0);
  const [footprint, setFootprint] = useState(FOOTPRINTS[1]);
  const [structure, setStructure] = useState(STRUCTURES[0]);
  const [ownership, setOwnership] = useState(OWNERSHIP[2]);
  const [taxComplexity, setTaxComplexity] = useState(TAX_COMPLEXITY[1]);
  const [benefits, setBenefits] = useState(BENEFITS[1]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [context, setContext] = useState("");

  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);
  const [rawResult, setRawResult] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();

  const agentName = "US Workforce Complexity & Risk Model";
  const agentId = "us-workforce-complexity";

  const totalPhases = 4;
  const progress = useMemo(() => Math.round(((phase + 1) / totalPhases) * 100), [phase]);

  const buildInputs = () => ({
    decision: decision?.label,
    stateFootprint: footprint,
    workforceStructure: structure,
    payrollOwnershipModel: ownership,
    taxComplexity,
    benefitsComplexity: benefits,
    operationalChallenges: challenges.length > 0 ? challenges : ["None specified"],
    additionalContext: context || "No additional context provided",
  });

  const handleSave = async () => {
    if (!rawResult) return;
    if (!user) {
      toast.info("Sign in to save runs to your dashboard.");
      setPage("login");
      return;
    }
    setSaving(true);
    const title = `${agentName} — ${new Date().toLocaleDateString()}`;
    const { error: saveErr } = await supabase.from("saved_agent_runs").insert({
      user_id: user.id,
      agent_type: agentId,
      agent_name: agentName,
      title,
      inputs: buildInputs() as any,
      result: rawResult as any,
    });
    setSaving(false);
    if (saveErr) {
      toast.error("Failed to save — please try again.");
    } else {
      toast.success("Saved to your dashboard!");
    }
  };

  const toggleChallenge = (v: string) => {
    setChallenges((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const handleGenerate = async () => {
    if (!decision) return;
    setLoading(true);
    setError(null);
    setStep("result");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("run-agent", {
        body: {
          agentType: "us-workforce",
          inputs: {
            decision: decision.label,
            stateFootprint: footprint,
            workforceStructure: structure,
            payrollOwnershipModel: ownership,
            taxComplexity,
            benefitsComplexity: benefits,
            operationalChallenges: challenges.length > 0 ? challenges : ["None specified"],
            additionalContext: context || "No additional context provided",
          },
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      const sections = data.sections || [];
      const framing = sections.find((s: any) => s.title === "Decision Framing") || sections[0] || { title: "Decision Framing", items: [] };
      const recommendation = sections.find((s: any) => s.title === "Recommendation") || sections[1] || { title: "Recommendation", items: [] };
      const tradeoffs = sections.find((s: any) => s.title === "Tradeoffs") || sections[2] || { title: "Tradeoffs", items: [] };
      const implications = sections.find((s: any) => s.title === "What This Means for You") || sections[3] || { title: "What This Means for You", items: [] };

      const mapItems = (items: any[] = []) =>
        items.map((i: any) => ({ label: i.label, value: i.detail }));

      // Combine Recommendation + Decision Framing into primary, Tradeoffs into secondary,
      // Implications into tertiary so the existing DecisionBriefCard renders cleanly.
      setBrief({
        scenario: `US Workforce Decision Brief — ${decision.label}`,
        contextLine: data.contextLine || `${footprint} · ${structure} · ${ownership}`,
        summary: data.summary || "",
        primaryTitle: "Decision Framing & Recommendation",
        primaryItems: [...mapItems(framing.items), ...mapItems(recommendation.items)],
        secondaryTitle: "Tradeoffs",
        secondaryItems: mapItems(tradeoffs.items),
        tertiaryTitle: "What This Means for You",
        tertiaryItems: mapItems(implications.items),
        observations: (data.risks || []).map((r: string) => ({ text: r })),
        confidence: data.confidence ? { level: data.confidence.level, reason: data.confidence.reason } : undefined,
      });
    } catch (e: any) {
      setError(e.message || "Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => {
    if (phase < totalPhases - 1) setPhase(phase + 1);
    else handleGenerate();
  };

  const goBack = () => {
    if (phase > 0) setPhase(phase - 1);
    else setStep("decision");
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
                US Workforce Complexity & Risk
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                A guided decision conversation for leaders navigating multi-state workforce structure, compliance exposure, and operational scalability.
              </p>
              <button
                onClick={() => setStep("decision")}
                className="px-8 py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Begin
              </button>
            </div>
          </RevealDiv>
        )}

        {step === "decision" && (
          <RevealDiv>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  What decision are you trying to make?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pick the one that's most on your mind. We'll guide the rest.
                </p>
              </div>

              <div className="space-y-3">
                {DECISIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setDecision(d);
                      setPhase(0);
                      setStep("guided");
                    }}
                    className="w-full text-left bg-card border border-border rounded-xl px-5 py-4 cursor-pointer hover:border-foreground transition-colors group"
                  >
                    <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {d.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">{d.helper}</span>
                  </button>
                ))}
              </div>
            </div>
          </RevealDiv>
        )}

        {step === "guided" && decision && (
          <RevealDiv>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-2">
                  Decision · {decision.label}
                </p>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {phase === 0 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                      Let's start with your footprint.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Where does the workforce live today?
                    </p>
                  </div>
                  <ChipGroup label="State Footprint" options={FOOTPRINTS} selected={footprint} onSelect={setFootprint} />
                  <ChipGroup label="Workforce Structure" options={STRUCTURES} selected={structure} onSelect={setStructure} />
                </div>
              )}

              {phase === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                      How is payroll owned today?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This shapes where complexity actually sits.
                    </p>
                  </div>
                  <ChipGroup label="Payroll Ownership Model" options={OWNERSHIP} selected={ownership} onSelect={setOwnership} />
                </div>
              )}

              {phase === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                      Where does the complexity show up?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Tax and benefits patterns drive most of the exposure.
                    </p>
                  </div>
                  <ChipGroup label="Tax Complexity" options={TAX_COMPLEXITY} selected={taxComplexity} onSelect={setTaxComplexity} />
                  <ChipGroup label="Benefits & Deduction Complexity" options={BENEFITS} selected={benefits} onSelect={setBenefits} />
                </div>
              )}

              {phase === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                      What's actually slowing you down?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Select any operational challenges that apply.
                    </p>
                  </div>
                  <MultiChipGroup
                    label="Operational Challenges"
                    options={CHALLENGE_OPTIONS}
                    selected={challenges}
                    onToggle={toggleChallenge}
                  />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                      Anything else worth knowing?
                      <span className="normal-case tracking-normal font-normal ml-1 opacity-70">(optional)</span>
                    </p>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Example: Recently acquired a 40-person team in two new states; close has slipped two cycles."
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={goBack}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
                >
                  ← Back
                </button>
                <button
                  onClick={goNext}
                  className="px-6 py-3 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
                >
                  {phase < totalPhases - 1 ? "Continue" : "Generate Decision Brief"}
                </button>
              </div>
            </div>
          </RevealDiv>
        )}

        {step === "result" && (
          <div className="space-y-10">
            {loading && (
              <RevealDiv>
                <div className="text-center py-20 space-y-4">
                  <div className="inline-block w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Structuring your decision…</p>
                </div>
              </RevealDiv>
            )}

            {error && !loading && (
              <RevealDiv>
                <div className="text-center py-16 space-y-4">
                  <p className="text-sm text-destructive">{error}</p>
                  <button
                    onClick={handleGenerate}
                    className="px-6 py-3 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </RevealDiv>
            )}

            {brief && !loading && !error && (
              <>
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
                        setStep("guided");
                        setBrief(null);
                        setPhase(0);
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
