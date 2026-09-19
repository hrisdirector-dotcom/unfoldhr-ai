import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import type { DecisionBriefProps } from "@/components/DecisionBriefCard";
import { supabase } from "@/lib/cloudClient";
import AgentPageNav from "@/components/AgentPageNav";

type Step = "start" | "input" | "result";

const SIZES = ["Under 50", "50–200", "200–500", "500+"];
const TRENDS = ["Improving", "Flat", "Declining"];
const CONCERNS = ["Attrition", "Manager effectiveness", "Culture"];
const SOURCES = ["Engagement survey", "Pulse survey", "Exit interviews", "Manager feedback"];
const GROUPS = ["Managers", "High performers", "New hires", "Frontline teams", "Broadly distributed", "Other"];

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
  const [source, setSource] = useState(SOURCES[0]);
  const [group, setGroup] = useState(GROUPS[4]);
  const [customGroup, setCustomGroup] = useState("");
  const [participation, setParticipation] = useState("");
  const [context, setContext] = useState("");
  const [brief, setBrief] = useState<DecisionBriefProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setStep("result");

    try {
      const resolvedGroup = group === "Other" ? (customGroup.trim() || "Other") : group;
      const { data, error: fnError } = await supabase.functions.invoke("run-agent", {
        body: {
          agentType: "listening",
          inputs: {
            workforceSize: size,
            engagementTrend: trend,
            primaryConcern: concern,
            feedbackSource: source,
            mostAffectedGroup: resolvedGroup,
            surveyParticipationRate: participation ? `${participation}%` : "Not provided",
            additionalContext: context || "No additional context provided",
          },
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      // Map the AI response to DecisionBriefProps
      const sections = data.sections || [];
      const primary = sections[0] || { title: "Sentiment Overview", items: [] };
      const secondary = sections[1] || { title: "Topic Analysis", items: [] };
      const tertiary = sections[2] || { title: "Recommended Actions", items: [] };

      setBrief({
        scenario: "Employee Listening Agent",
        contextLine: data.contextLine || "",
        summary: data.summary || "",
        primaryTitle: primary.title,
        primaryItems: primary.items.map((i: any) => ({ label: i.label, value: i.detail })),
        secondaryTitle: secondary.title,
        secondaryItems: secondary.items.map((i: any) => ({ label: i.label, value: i.detail })),
        tertiaryTitle: tertiary.title,
        tertiaryItems: tertiary.items.map((i: any) => ({ label: i.label, value: i.detail })),
        observations: (data.risks || []).map((r: string) => ({ text: r })),
        confidence: data.confidence ? { level: data.confidence.level, reason: data.confidence.reason } : undefined,
      });
    } catch (e: any) {
      setError(e.message || "Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
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
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  Tell us about your organization
                </h2>
                <p className="text-sm text-muted-foreground">
                  A few inputs. One clear picture.
                </p>
              </div>

              <OptionGroup label="Workforce Size" options={SIZES} selected={size} onSelect={setSize} />
              <OptionGroup label="Engagement Trend" options={TRENDS} selected={trend} onSelect={setTrend} />
              <OptionGroup label="Primary Concern" options={CONCERNS} selected={concern} onSelect={setConcern} />
              <OptionGroup label="Feedback Source" options={SOURCES} selected={source} onSelect={setSource} />
              <OptionGroup label="Most Affected Group" options={GROUPS} selected={group} onSelect={setGroup} />

              {group === "Other" && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                    Specify Department or Team
                  </p>
                  <input
                    type="text"
                    value={customGroup}
                    onChange={(e) => setCustomGroup(e.target.value)}
                    placeholder="e.g., Field Operations, EMEA Sales"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              )}

              <div>
                <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  Survey Participation Rate (%)
                  <span className="normal-case tracking-normal font-normal ml-1 opacity-70">(optional)</span>
                </p>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={participation}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "") return setParticipation("");
                    const n = Math.max(0, Math.min(100, Number(v)));
                    setParticipation(String(n));
                  }}
                  placeholder="e.g., 72"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  What are you seeing in your organization right now?
                  <span className="normal-case tracking-normal font-normal ml-1 opacity-70">(optional)</span>
                </p>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Example: Attrition is rising in mid-level managers and burnout is increasing."
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 rounded-lg bg-foreground text-background font-semibold text-sm cursor-pointer hover:bg-primary transition-colors"
              >
                Generate Insights
              </button>
            </div>
          </RevealDiv>
        )}

        {step === "result" && (
          <div className="space-y-10">
            {loading && (
              <RevealDiv>
                <div className="text-center py-20 space-y-4">
                  <div className="inline-block w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Agent thinking…</p>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
