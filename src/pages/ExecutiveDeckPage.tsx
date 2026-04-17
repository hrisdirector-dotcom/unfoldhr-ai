import { ArrowLeft, Share2, TrendingUp, TrendingDown, Minus, Shield, Target, AlertTriangle, CheckCircle, Clock, Users, BarChart3, Zap, DollarSign, Star, Activity } from "lucide-react";
import type { SavedRun } from "@/hooks/useSavedRuns";
import { sanitizeResult, qualitativeConfidence } from "@/lib/sanitizeAgentOutput";

interface ExecutiveDeckPageProps {
  run: SavedRun;
  branding: { logoUrl: string | null; primaryColor: string; accentColor: string };
  onBack: () => void;
}

const AGENT_METRICS: Record<string, { label: string; icon: string }[]> = {
  workforce: [
    { label: "Headcount Gap", icon: "users" },
    { label: "Time to Fill (avg)", icon: "clock" },
    { label: "Cost per Hire", icon: "dollar" },
    { label: "Attrition Risk", icon: "alert" },
    { label: "Bench Strength", icon: "bar" },
    { label: "Readiness Score", icon: "target" },
  ],
  recruiting: [
    { label: "Pipeline Health", icon: "activity" },
    { label: "Source Effectiveness", icon: "bar" },
    { label: "Candidate Quality", icon: "star" },
    { label: "Offer Accept Rate", icon: "check" },
    { label: "Time to Hire", icon: "clock" },
    { label: "Diversity Index", icon: "users" },
  ],
  onboarding: [
    { label: "30-Day Retention", icon: "users" },
    { label: "Ramp-Up Time", icon: "clock" },
    { label: "Satisfaction Score", icon: "star" },
    { label: "Training Completion", icon: "check" },
    { label: "Mentor Assignment", icon: "target" },
    { label: "Productivity Index", icon: "zap" },
  ],
  performance: [
    { label: "Review Completion", icon: "check" },
    { label: "Rating Distribution", icon: "bar" },
    { label: "Goal Alignment", icon: "target" },
    { label: "Flight Risk", icon: "alert" },
    { label: "Development Plans", icon: "zap" },
    { label: "Calibration Score", icon: "star" },
  ],
  listening: [
    { label: "eNPS Score", icon: "bar" },
    { label: "Engagement Index", icon: "activity" },
    { label: "Response Rate", icon: "check" },
    { label: "Key Themes", icon: "target" },
    { label: "Action Confidence", icon: "star" },
    { label: "Trend Direction", icon: "zap" },
  ],
  compliance: [
    { label: "Risk Exposure", icon: "alert" },
    { label: "Open Findings", icon: "bar" },
    { label: "Policy Coverage", icon: "check" },
    { label: "Audit Readiness", icon: "target" },
    { label: "Training Gaps", icon: "users" },
    { label: "Resolution Time", icon: "clock" },
  ],
};

const ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  dollar: <DollarSign className="w-5 h-5" />,
  alert: <AlertTriangle className="w-5 h-5" />,
  bar: <BarChart3 className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  check: <CheckCircle className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getContrastText(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? "#1a1a2e" : "#ffffff";
}

export default function ExecutiveDeckPage({ run, branding, onBack }: ExecutiveDeckPageProps) {
  const res = sanitizeResult(run.result as any, run.inputs);
  const dateStr = new Date(run.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const pc = branding.primaryColor;
  const ac = branding.accentColor;
  const metrics = AGENT_METRICS[run.agent_type] || AGENT_METRICS.workforce;

  const sections = res?.sections || [];
  const risks = res?.risks || [];
  const timeline = res?.timeline || [];
  const confidence = res?.confidence;
  const qConf = confidence ? qualitativeConfidence(confidence.level, confidence.score) : null;

  // Extract metric-like items from sections
  const metricItems = sections.flatMap((s: any) => s.items || []).slice(0, 6);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-20 pb-16 px-6">
        {/* ─── SLIDE 1: Cover ─── */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center py-20 mb-16">
          {branding.logoUrl && (
            <img src={branding.logoUrl} alt="Company Logo" className="h-16 max-w-[240px] object-contain mb-10" />
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: pc }}>
            {run.agent_name} Executive Recommendation
          </h1>
          <p className="text-lg text-muted-foreground mb-2">{dateStr}</p>
          <p className="text-sm text-muted-foreground/60">Powered by unfoldHR AI</p>
          <div className="w-24 h-1 rounded-full mt-10" style={{ backgroundColor: pc }} />
        </section>

        {/* ─── SLIDE 2: Executive Summary ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="01" title="Executive Summary" />
          {res?.summary && (
            <p className="text-lg leading-relaxed text-foreground max-w-3xl mt-6">{res.summary}</p>
          )}
          {qConf && (
            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: pc, color: getContrastText(pc) }}>
                {qConf.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{qConf.level} Confidence</p>
                {confidence?.reason && (
                  <p className="text-sm text-muted-foreground max-w-sm">{confidence.reason}</p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ─── SLIDE 3: Key Metrics ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="02" title="Key Metrics at a Glance" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {metrics.map((m, i) => {
              const item = metricItems[i];
              const tag = item?.tag?.toLowerCase() || "";
              const isHigh = tag.includes("high") || tag.includes("critical");
              const isMed = tag.includes("medium") || tag.includes("moderate");
              const statusColor = isHigh ? "#dc2626" : isMed ? "#d97706" : "#059669";
              const TrendIcon = isHigh ? TrendingDown : isMed ? Minus : TrendingUp;

              return (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${pc}15`, color: pc }}>
                      {ICON_MAP[m.icon] || <BarChart3 className="w-5 h-5" />}
                    </div>
                    {item?.tag && <TrendIcon className="w-4 h-4" style={{ color: statusColor }} />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{m.label}</p>
                    <p className="text-lg font-bold text-foreground mt-1">{item?.label || "—"}</p>
                    {item?.tag && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${statusColor}18`, color: statusColor }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SLIDE 4: The Challenge ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="03" title="The Challenge" />
          {res?.contextLine && (
            <p className="text-lg leading-relaxed text-foreground max-w-3xl mt-6">{res.contextLine}</p>
          )}
          {run.inputs && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-4">Inputs Provided</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(run.inputs as Record<string, any>).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}</span>
                    <span className="text-sm font-medium text-foreground">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ─── SLIDE 5: Our Recommendation ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="04" title="Our Recommendation" />
          {sections.map((sec: any, si: number) => (
            <div key={si} className="mt-6">
              <h3 className="text-base font-semibold text-foreground mb-3">{sec.title}</h3>
              <div className="space-y-3">
                {(sec.items || []).map((item: any, ii: number) => (
                  <div key={ii} className="flex gap-3 items-start rounded-xl border border-border bg-card p-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5" style={{ backgroundColor: `${pc}15`, color: pc }}>
                      {ii + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
                      {item.tag && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase border" style={{ borderColor: `${pc}40`, color: pc }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {timeline.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-semibold text-foreground mb-4">Implementation Phases</h3>
              <div className="space-y-3">
                {timeline.map((t: any, i: number) => {
                  const equalPct = 100 / timeline.length;
                  return (
                    <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs" style={{ backgroundColor: ac, color: getContrastText(ac) }}>
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{t.phase}</p>
                        <p className="text-sm text-muted-foreground">{t.focus}</p>
                      </div>
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden shrink-0">
                        <div className="h-full rounded-full" style={{ width: `${equalPct}%`, backgroundColor: pc }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* ─── SLIDE 6: Expected Impact & ROI ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="05" title="Expected Impact & ROI" />
          {risks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base font-semibold text-foreground mb-4">Risks & Mitigations</h3>
              <div className="space-y-3">
                {risks.map((r: string, i: number) => {
                  const isHigh = r.toLowerCase().includes("high") || r.toLowerCase().includes("critical");
                  const isMed = r.toLowerCase().includes("medium") || r.toLowerCase().includes("moderate");
                  const level = isHigh ? "High" : isMed ? "Medium" : "Low";
                  const col = isHigh ? "#dc2626" : isMed ? "#d97706" : "#059669";
                  return (
                    <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4" style={{ borderColor: `${col}30` }}>
                      <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: col }} />
                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1" style={{ backgroundColor: `${col}15`, color: col }}>
                          {level} Priority
                        </span>
                        <p className="text-sm text-foreground">{r}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* ─── SLIDE 7: Next Steps ─── */}
        <section className="mb-20">
          <SectionLabel color={pc} number="06" title="Next Steps" />
          <div className="mt-6 rounded-2xl p-8 text-center" style={{ backgroundColor: `${pc}08`, border: `1px solid ${pc}20` }}>
            <p className="text-lg font-semibold text-foreground mb-2">Ready to move from recommendation to execution?</p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
              Deploy live agents connected to your tools to turn this qualitative recommendation into continuously refreshed, action-ready guidance.
            </p>
            <div className="flex justify-center gap-3">
              <button className="px-6 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer" style={{ backgroundColor: pc, color: getContrastText(pc) }}>
                Upgrade to Deploy
              </button>
              <button onClick={onBack} className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
                Back to Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">Generated by unfoldHR  •  www.unfoldhrai.com  •  Confidential</p>
        </footer>
      </div>
    </div>
  );
}

function SectionLabel({ color, number, title }: { color: string; number: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: `${color}15`, color }}>{number}</span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
  );
}
