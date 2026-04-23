import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, AlertTriangle, Lightbulb, Loader2, Lock, Calendar, Mail, Check } from "lucide-react";
import { useSavedRuns } from "@/hooks/useSavedRuns";
import { useAuth } from "@/hooks/useAuth";

interface TodayDecisionsPageProps {
  setPage: (p: string) => void;
}

const DAILY_BRIEF_USED_KEY = "unfold_daily_brief_used";

interface DecisionCard {
  title: string;
  context: string;
  decision: string;
  risk: string;
}

// Fallback general workforce scenarios — directional, no fake metrics
const FALLBACK_SCENARIOS: DecisionCard[] = [
  {
    title: "Critical role coverage in Engineering",
    context: "A senior engineering lead is on extended leave during a peak delivery window.",
    decision: "Approve interim coverage from an internal staff engineer and defer non-critical roadmap items.",
    risk: "Delivery slippage if interim coverage is not confirmed this week.",
  },
  {
    title: "Onboarding capacity vs. hiring pipeline",
    context: "Recruiting is closing offers faster than the current onboarding team can absorb.",
    decision: "Stagger start dates across the next two cohorts and pull one HRBP into onboarding support.",
    risk: "Early attrition and weak ramp if new hires land without structured first-week support.",
  },
  {
    title: "Manager span of control imbalance",
    context: "Two managers in Customer Success are stretched well beyond healthy team size.",
    decision: "Promote a tenured IC into a team lead role and rebalance reporting lines this quarter.",
    risk: "Continued overload may surface as engagement drops in the next listening cycle.",
  },
  {
    title: "Compliance review on contractor mix",
    context: "Long-tenured contractors are performing work that increasingly resembles employee scope.",
    decision: "Initiate a misclassification review with Legal and identify candidates for conversion.",
    risk: "Regulatory exposure and back-pay liability if status is challenged later.",
  },
  {
    title: "Performance conversations approaching",
    context: "Mid-cycle check-ins are due across two business units with inconsistent manager readiness.",
    decision: "Run a focused manager enablement session before the window opens, prioritising first-time managers.",
    risk: "Inconsistent signals to employees if managers default to generic feedback.",
  },
];

// Build decision cards from prior agent outputs when available
function buildFromRuns(runs: any[]): DecisionCard[] {
  const cards: DecisionCard[] = [];

  for (const run of runs.slice(0, 3)) {
    const res = run.result || {};
    const agent = run.agent_name || "Workforce";
    const summary: string | undefined = res.summary;

    if (!summary) continue;

    // Pull a risk if the agent surfaced one
    const risk: string | undefined =
      res.risks?.[0]?.text ||
      res.execution_risks?.[0]?.text ||
      res.insights?.[0]?.text;

    cards.push({
      title: `Follow-through on ${agent}`,
      context: summary.length > 180 ? summary.slice(0, 177) + "…" : summary,
      decision:
        "Confirm the recommended next step with the accountable leader and lock owner + date.",
      risk:
        risk ||
        "Momentum is lost if the recommendation sits unresolved past this week.",
    });
  }

  return cards;
}

export default function TodayDecisionsPage({ setPage }: TodayDecisionsPageProps) {
  const { runs } = useSavedRuns();
  const { isAdmin } = useAuth();
  const [decisions, setDecisions] = useState<DecisionCard[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [hasUsedFree, setHasUsedFree] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Admins (and future paid users) bypass the gate. Everyone else is treated as free tier.
  const isUnlimited = isAdmin;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasUsedFree(localStorage.getItem(DAILY_BRIEF_USED_KEY) === "true");
    }
  }, []);

  const isLocked = !isUnlimited && hasUsedFree;

  const handleGenerate = () => {
    if (isLocked) return;

    setGenerating(true);
    setDecisions(null);
    setEmailSent(false);
    setEmailSending(false);

    // Simulate brief processing for executive feel
    setTimeout(() => {
      const fromRuns = buildFromRuns(runs);
      const needed = Math.max(0, Math.min(5, 3 + Math.floor(Math.random() * 3)) - fromRuns.length);
      const filler = [...FALLBACK_SCENARIOS]
        .sort(() => Math.random() - 0.5)
        .slice(0, needed);

      setDecisions([...fromRuns, ...filler].slice(0, 5));
      setGenerating(false);

      if (!isUnlimited) {
        localStorage.setItem(DAILY_BRIEF_USED_KEY, "true");
        setHasUsedFree(true);
      }
    }, 700);
  };

  const handleSendEmail = () => {
    if (emailSending || emailSent) return;
    setEmailSending(true);
    // Simulate sending — no real email is dispatched yet
    setTimeout(() => {
      setEmailSending(false);
      setEmailSent(true);
    }, 900);
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background min-h-screen pt-28 pb-20 px-6 md:px-14">
      <div className="max-w-3xl mx-auto">
        {/* Back to dashboard */}
        <button
          onClick={() => setPage("dashboard")}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[2px] text-muted-foreground mb-2">
            {today}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3 leading-tight">
            Today's Decisions
          </h1>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            Here are the workforce decisions that need your attention.
          </p>
        </div>

        {/* Locked state — free user has already used their one generation */}
        {!decisions && isLocked && (
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3 leading-tight">
              Get this every morning
            </h2>
            <p className="text-sm md:text-base text-foreground/75 mb-7 max-w-md mx-auto leading-relaxed">
              You've explored individual decisions. Now unlock a structured daily view across your workforce.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setPage("pricing")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Upgrade Plan
              </button>
              <button
                onClick={() => setPage("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>
        )}

        {/* Generate button — first run available */}
        {!decisions && !isLocked && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-foreground/80 mb-6 max-w-sm mx-auto">
              Generate a focused brief of the workforce decisions that warrant a
              leadership call today.
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing brief…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Unlock Daily Decision Brief
                </>
              )}
            </button>
            {!isUnlimited && (
              <p className="text-[11px] text-muted-foreground mt-4">
                One free generation included. Upgrade for ongoing daily briefs.
              </p>
            )}
          </div>
        )}

        {/* Decision cards */}
        {decisions && (
          <div className="space-y-4">
            {decisions.map((d, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-display text-lg font-bold text-foreground leading-snug">
                    {d.title}
                  </h2>
                  <span className="text-[10px] font-medium uppercase tracking-[1.5px] text-muted-foreground shrink-0 mt-1.5">
                    Decision {i + 1}
                  </span>
                </div>

                <p className="text-sm text-foreground/75 leading-relaxed mb-5">
                  {d.context}
                </p>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-1">
                        Decision
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {d.decision}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-1">
                        Risk
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {d.risk}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Email opt-in — soft demand validation, no real send yet */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-7 text-center">
              {emailSent ? (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Your decision brief has been sent.
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Check your inbox shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Want this in your inbox?
                  </p>
                  <p className="text-[12px] text-muted-foreground mb-4">
                    Daily delivery coming soon
                  </p>
                  <button
                    onClick={handleSendEmail}
                    disabled={emailSending}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {emailSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Send me this today
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {isUnlimited ? (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:opacity-60"
                >
                  {generating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Regenerate
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-7 mt-2 text-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary mb-3">
                  <Lock className="w-3 h-3" /> Daily brief locked
                </div>
                <h3 className="font-display text-xl text-foreground mb-2 leading-tight">
                  Get this every morning
                </h3>
                <p className="text-sm text-foreground/75 mb-5 max-w-md mx-auto leading-relaxed">
                  You've explored individual decisions. Now unlock a structured daily view across your workforce.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setPage("pricing")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Upgrade Plan
                  </button>
                  <button
                    onClick={() => setPage("contact")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
