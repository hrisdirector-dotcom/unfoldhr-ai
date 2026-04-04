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
  const responded = Math.round(base * 0.78);
  const responseRate = Math.round((responded / base) * 100);

  const scoreMap: Record<string, number> = { Improving: 72, Flat: 61, Declining: 47 };
  const engagementScore = scoreMap[trend];

  const compExitPct = trend === "Declining" ? 42 : trend === "Flat" ? 38 : 29;
  const careerGrowthPct = trend === "Declining" ? 68 : trend === "Flat" ? 62 : 54;
  const workloadTopPct = trend === "Declining" ? 22 : trend === "Flat" ? 18 : 14;

  // --- Summary ---
  const summaryMap: Record<string, string> = {
    Improving: `Overall engagement sits at ${engagementScore}/100, up from prior quarter — but the improvement is uneven. ${responseRate}% participation suggests reasonable coverage, though pockets of disengagement in high-turnover teams remain obscured by aggregate gains. Momentum is real, but fragile.`,
    Flat: `Engagement holds at ${engagementScore}/100 with no meaningful movement in two quarters. A ${responseRate}% response rate signals adequate coverage, but stagnation at this level is not neutral — it typically precedes decline within 1–2 cycles. The organization is coasting, not stabilizing.`,
    Declining: `Engagement has dropped to ${engagementScore}/100, down 9 pts from prior quarter. With ${responseRate}% participation, the signal is strong and the direction is clear. This trajectory suggests voluntary attrition will spike within 60–90 days if no visible action is taken.`,
  };

  // --- Key Themes (always Compensation, Career Growth, Workload) ---
  const themesByTrend: Record<string, { label: string; value: string }[]> = {
    Improving: [
      { label: "Compensation Pressure", value: `Cited in ${compExitPct}% of exit interviews. Recent adjustments have slowed departures, but mid-level IC bands remain 8–12% below market in competitive roles` },
      { label: "Career Growth Gaps", value: `${careerGrowthPct}% of departing employees cite limited advancement. Internal promotion velocity has improved in Engineering but remains stalled in Operations and Sales` },
      { label: "Workload Imbalance", value: `Top ${workloadTopPct}% of performers carry 2.4× the project load of median contributors. Without redistribution, retention risk concentrates in exactly the people you can least afford to lose` },
    ],
    Flat: [
      { label: "Compensation Pressure", value: `${compExitPct}% of exits reference pay as a contributing factor — unchanged from last quarter. The issue is not dramatic enough to trigger urgent action, which is precisely why it persists` },
      { label: "Career Growth Gaps", value: `${careerGrowthPct}% of voluntary leavers report limited advancement paths. Lateral movement is underutilized — only 11% of open roles were filled internally this year` },
      { label: "Workload Imbalance", value: `High performers absorb ${workloadTopPct}% more project volume than peers. Burnout signals are emerging in sprint velocity data and PTO usage patterns among tenured ICs` },
    ],
    Declining: [
      { label: "Compensation Pressure", value: `Now cited in ${compExitPct}% of exits, up from 34% last quarter. The gap is widening fastest in Engineering and Product roles where external offers are 15–20% above current bands` },
      { label: "Career Growth Gaps", value: `${careerGrowthPct}% of departing employees flag growth as a primary driver — the highest reading in 4 quarters. Promotion timelines average 2.8 years vs. 1.9 at peer companies` },
      { label: "Workload Imbalance", value: `Top contributors carry ${workloadTopPct}% more volume than median and are also the most actively recruited externally. This is the highest-risk intersection in the workforce` },
    ],
  };

  // --- Key Observations ---
  const observationsMap: Record<string, { text: string }[]> = {
    Improving: [
      { text: "Compensation improvements are reducing exits in junior bands, but mid-career attrition risk is now the primary exposure — a segment where career growth matters more than pay" },
      { text: "If workload redistribution doesn't follow headcount gains, the next 2 quarters will see burnout-driven attrition among the exact high performers driving current momentum" },
      { text: "The uncomfortable truth: improving aggregate scores are masking a widening gap between well-managed teams and underperforming managers — variance is the real story" },
    ],
    Flat: [
      { text: "Compensation and career growth signals are reinforcing each other — employees who feel underpaid and stuck are 3.2× more likely to leave within 6 months" },
      { text: "Flat engagement after two quarters without visible action suggests survey fatigue is imminent. The next pulse risks lower participation, not just lower scores" },
      { text: "The uncomfortable truth: your highest performers are your highest flight risk right now. They have the most options and the most reason to exercise them" },
    ],
    Declining: [
      { text: "The convergence of compensation pressure and career stagnation signals a systemic retention problem — this is not isolated to one team or function" },
      { text: "At this trajectory, expect voluntary attrition to increase 15–25% within 90 days. The lag between sentiment decline and actual exits is closing fast" },
      { text: "The uncomfortable truth: leadership credibility is eroding. Employees see listening efforts without follow-through as performative, which accelerates disengagement" },
    ],
  };

  // --- Recommended Actions ---
  const actionsMap: Record<string, { label: string; value: string }[]> = {
    Improving: [
      { label: "Target mid-career retention", value: "Launch stay interviews for ICs with 2–4 years tenure in top-quartile performance bands — this is where silent attrition risk lives" },
      { label: "Audit comp bands against live market data", value: "Focus on Engineering, Product, and Sales roles where external offers are actively pulling talent" },
      { label: "Pilot workload rebalancing in 2 highest-output teams", value: "Redistribute project ownership to reduce single-point-of-failure risk on top performers" },
    ],
    Flat: [
      { label: "Launch targeted stay interviews within 30 days", value: "Focus on top 15% performers in departments with >18% TTM turnover — do not wait for the next survey cycle" },
      { label: "Close the internal mobility gap", value: "Set a 25% internal fill rate target for open roles. Current rate of 11% signals a broken internal talent market" },
      { label: "Make one visible, fast action from this data", value: "Choose one theme and act visibly within 2 weeks. Credibility depends on speed, not comprehensiveness" },
    ],
    Declining: [
      { label: "Emergency comp review for highest-risk roles", value: "Benchmark and adjust bands for roles with >25% TTM attrition. Speed matters more than perfection here" },
      { label: "Accelerate promotion timelines for blocked high performers", value: "Identify ICs overdue for advancement and fast-track decisions — every month of delay increases exit probability" },
      { label: "Deploy skip-level listening sessions this quarter", value: "Structured 1:1s between senior leaders and front-line ICs to rebuild trust. Surveys alone won't restore credibility" },
    ],
  };

  // --- Execution Risks ---
  const risksMap: Record<string, { text: string }[]> = {
    Improving: [
      { text: "Over-indexing on aggregate improvement creates blind spots. Manager-level variance is high, and the lowest-performing managers are not improving at the same rate" },
      { text: "Comp adjustments without career path clarity will produce short-term retention gains that reverse within 12 months" },
      { text: "Transparency about workload data may surface uncomfortable conversations about team-level performance gaps — but avoiding them is more expensive" },
    ],
    Flat: [
      { text: "Taking no action is itself a decision — and employees will interpret silence as indifference. Expect scores to decline 4–6 pts next quarter if nothing changes" },
      { text: "Comp transparency initiatives may temporarily increase dissatisfaction as employees discover internal inequities. This is necessary pain, not a reason to delay" },
      { text: "Survey fatigue is a real risk. If this data doesn't lead to visible action within 30 days, future participation rates will drop, degrading your signal quality" },
    ],
    Declining: [
      { text: "Rapid intervention without clear communication risks appearing reactive rather than strategic — framing matters as much as action" },
      { text: "Emergency comp adjustments will create internal equity complaints from recently-hired employees paid at market. Plan for this second-order effect" },
      { text: "Leadership visibility in response efforts is non-negotiable. Delegating the response to HR alone will be read as abdication, not empowerment" },
    ],
  };

  // --- Confidence ---
  const confidenceMap: Record<string, { level: string; reason: string }> = {
    Improving: { level: "Medium–High", reason: `${responseRate}% participation and consistent trend direction provide a reliable signal. Confidence is tempered by limited visibility into manager-level variance and mid-career sentiment specifically.` },
    Flat: { level: "Medium", reason: `Adequate response rate at ${responseRate}%, but two quarters of stagnation make it difficult to distinguish between genuine stability and pre-decline plateaus. Forward-looking confidence is lower than backward-looking.` },
    Declining: { level: "High", reason: `Strong participation (${responseRate}%), consistent multi-quarter decline, and corroborating exit interview data all point in the same direction. The signal is clear — the only uncertainty is speed of impact.` },
  };

  return {
    scenario: "Employee Listening",
    contextLine: `${base} employees · ${responded} responded (${responseRate}%) · Trend: ${trend} · Focus: ${concern}`,
    primaryTitle: "Employee Sentiment Summary",
    summary: summaryMap[trend],
    primaryItems: themesByTrend[trend],
    secondaryTitle: "Key Observations",
    secondaryItems: [],
    observations: observationsMap[trend],
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: actionsMap[trend],
    insights: risksMap[trend],
    confidence: confidenceMap[trend],
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
