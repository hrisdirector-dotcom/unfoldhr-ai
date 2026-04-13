import { useState, useEffect, useRef } from "react";
import type { BrandConfig } from "@/components/BrandingModal";
import {
  ChevronLeft, ChevronRight, X, Maximize2, Minimize2, ExternalLink,
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2,
  Clock, DollarSign, Users, Target, Shield, BarChart3, Zap,
} from "lucide-react";

/* ── agent-specific metric definitions ── */

const AGENT_METRICS: Record<string, { label: string; icon: React.ReactNode; key: string }[]> = {
  workforce: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Projected Headcount Change", icon: <Users className="w-5 h-5" />, key: "headcount" },
    { label: "Budget Impact", icon: <DollarSign className="w-5 h-5" />, key: "budget" },
    { label: "Time to Impact", icon: <Clock className="w-5 h-5" />, key: "time" },
    { label: "Risk Level", icon: <AlertTriangle className="w-5 h-5" />, key: "risk" },
    { label: "ROI Estimate", icon: <TrendingUp className="w-5 h-5" />, key: "roi" },
  ],
  recruiting: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Time to Fill", icon: <Clock className="w-5 h-5" />, key: "timeToFill" },
    { label: "Candidate Quality", icon: <CheckCircle2 className="w-5 h-5" />, key: "quality" },
    { label: "Cost per Hire", icon: <DollarSign className="w-5 h-5" />, key: "cost" },
    { label: "Pipeline Health", icon: <BarChart3 className="w-5 h-5" />, key: "pipeline" },
    { label: "Offer Accept Rate", icon: <TrendingUp className="w-5 h-5" />, key: "acceptRate" },
  ],
  onboarding: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Time to Productivity", icon: <Clock className="w-5 h-5" />, key: "productivity" },
    { label: "Completion Rate", icon: <CheckCircle2 className="w-5 h-5" />, key: "completion" },
    { label: "Satisfaction Score", icon: <TrendingUp className="w-5 h-5" />, key: "satisfaction" },
    { label: "Retention Impact", icon: <Users className="w-5 h-5" />, key: "retention" },
    { label: "Cost Savings", icon: <DollarSign className="w-5 h-5" />, key: "savings" },
  ],
  performance: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Team Performance", icon: <BarChart3 className="w-5 h-5" />, key: "teamPerformance" },
    { label: "At-Risk Employees", icon: <AlertTriangle className="w-5 h-5" />, key: "atRisk" },
    { label: "Goal Completion", icon: <CheckCircle2 className="w-5 h-5" />, key: "goalCompletion" },
    { label: "Development ROI", icon: <DollarSign className="w-5 h-5" />, key: "devRoi" },
    { label: "Engagement Trend", icon: <TrendingUp className="w-5 h-5" />, key: "engagement" },
  ],
  listening: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Engagement Score", icon: <BarChart3 className="w-5 h-5" />, key: "engagementScore" },
    { label: "Sentiment Trend", icon: <TrendingUp className="w-5 h-5" />, key: "sentiment" },
    { label: "Response Rate", icon: <CheckCircle2 className="w-5 h-5" />, key: "responseRate" },
    { label: "Top Concern", icon: <AlertTriangle className="w-5 h-5" />, key: "topConcern" },
    { label: "Action Urgency", icon: <Zap className="w-5 h-5" />, key: "urgency" },
  ],
  compliance: [
    { label: "Overall Confidence", icon: <Target className="w-5 h-5" />, key: "confidence" },
    { label: "Risk Score", icon: <Shield className="w-5 h-5" />, key: "riskScore" },
    { label: "Open Violations", icon: <AlertTriangle className="w-5 h-5" />, key: "violations" },
    { label: "Audit Readiness", icon: <CheckCircle2 className="w-5 h-5" />, key: "auditReady" },
    { label: "Remediation Time", icon: <Clock className="w-5 h-5" />, key: "remediationTime" },
    { label: "Compliance Rate", icon: <BarChart3 className="w-5 h-5" />, key: "complianceRate" },
  ],
};

const AGENT_LABELS: Record<string, string> = {
  workforce: "Workforce Planning",
  recruiting: "Recruiting",
  onboarding: "Onboarding",
  performance: "Performance Management",
  listening: "Employee Listening",
  compliance: "Compliance Risk",
};

/* ── helpers ── */

function extractMetricValue(result: any, key: string, agentType: string): string {
  const confidence = result?.confidence;
  const sections = result?.sections || [];
  const timeline = result?.timeline || [];
  const risks = result?.risks || [];

  // Confidence is universal
  if (key === "confidence" && confidence) {
    return `${confidence.score ?? confidence.level ?? "—"}%`;
  }

  // Workforce-specific derived metrics
  if (agentType === "workforce") {
    const hiringSection = sections.find((s: any) => s.title?.toLowerCase().includes("hiring") && !s.title?.toLowerCase().includes("timeline"));
    const budgetSection = sections.find((s: any) => s.title?.toLowerCase().includes("budget"));
    const timelineSection = sections.find((s: any) => s.title?.toLowerCase().includes("timeline"));

    if (key === "headcount" && hiringSection) {
      const totalHires = (hiringSection.items || []).length;
      const deptSummary = (hiringSection.items || []).slice(0, 3).map((i: any) => {
        const match = i.detail?.match(/(\d+)\s*new\s*(hires|professionals|team members|specialists)/i);
        return match ? parseInt(match[1]) : 0;
      });
      const total = deptSummary.reduce((a: number, b: number) => a + b, 0);
      return total > 0 ? `+${total} across ${totalHires} depts` : `${totalHires} departments`;
    }
    if (key === "budget" && budgetSection) {
      const items = budgetSection.items || [];
      const topItem = items[0];
      return topItem ? topItem.label : "See budget section";
    }
    if (key === "time") {
      return timeline.length > 0 ? `${timeline.length} phases` : "—";
    }
    if (key === "risk") {
      if (risks.length >= 4) return "Elevated";
      if (risks.length >= 2) return "Moderate";
      if (risks.length >= 1) return "Low";
      return "Minimal";
    }
    if (key === "roi") {
      const score = confidence?.score || 0;
      if (score >= 80) return "Strong positive";
      if (score >= 60) return "Moderate positive";
      return "Under evaluation";
    }
  }

  // Generic: try to match by section/item labels
  if (result?.sections) {
    for (const s of result.sections) {
      for (const item of s.items || []) {
        if (item.label?.toLowerCase().includes(key.toLowerCase())) return item.detail?.slice(0, 60) || item.value || "—";
      }
    }
  }

  // Fallback: try to derive from risks/timeline for other agent types
  if (key === "risk" || key === "riskScore") {
    if (risks.length >= 4) return "Elevated";
    if (risks.length >= 2) return "Moderate";
    return risks.length >= 1 ? "Low" : "Minimal";
  }
  if (key === "time" || key === "timeToFill" || key === "remediationTime" || key === "productivity") {
    return timeline.length > 0 ? `${timeline.length} phases` : "—";
  }
  if (key === "roi" || key === "savings" || key === "devRoi") {
    const score = confidence?.score || 0;
    if (score >= 80) return "Strong positive";
    if (score >= 60) return "Moderate positive";
    return "Under evaluation";
  }

  // Try sections by title matching
  for (const s of sections) {
    if (s.title?.toLowerCase().includes(key.toLowerCase())) {
      const count = (s.items || []).length;
      return count > 0 ? `${count} items identified` : "—";
    }
  }

  return "—";
}

function getMetricColor(value: string): string {
  const lower = value.toLowerCase();
  if (lower.includes("high") || lower.includes("strong") || lower.includes("green") || lower.includes("positive")) return "#10b981";
  if (lower.includes("medium") || lower.includes("moderate") || lower.includes("amber")) return "#f59e0b";
  if (lower.includes("low") || lower.includes("weak") || lower.includes("red") || lower.includes("critical")) return "#ef4444";
  return "#6b7280";
}

function getTrendIcon(value: string) {
  const lower = value.toLowerCase();
  if (lower.includes("up") || lower.includes("increas") || lower.includes("positive") || lower.includes("improv")) return <TrendingUp className="w-4 h-4" />;
  if (lower.includes("down") || lower.includes("decreas") || lower.includes("declin")) return <TrendingDown className="w-4 h-4" />;
  return <Minus className="w-4 h-4" />;
}

/* ── page component ── */

interface ExecutiveDeckPageProps {
  run: {
    agent_type: string;
    agent_name: string;
    title: string;
    inputs: Record<string, any>;
    result: Record<string, any>;
    created_at: string;
  };
  brand: BrandConfig;
  onClose: () => void;
}

export default function ExecutiveDeckPage({ run, brand, onClose }: ExecutiveDeckPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const res = run.result as any;
  const agentType = run.agent_type;
  const agentLabel = AGENT_LABELS[agentType] || run.agent_name;
  const metrics = AGENT_METRICS[agentType] || AGENT_METRICS.workforce;
  const dateStr = new Date(run.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const primary = brand.primaryColor;
  const accent = brand.accentColor;

  // Extract sections
  const summary = res?.summary || "No summary available.";
  const confidence = res?.confidence || { level: "Medium", score: 65, reason: "" };
  const sections = res?.sections || [];
  const risks = res?.risks || [];
  const timeline = res?.timeline || [];

  const recommendationSection = sections.find((s: any) => 
    s.title?.toLowerCase().includes("recommend") || s.title?.toLowerCase().includes("action")
  );
  const challengeSection = sections.find((s: any) => 
    s.title?.toLowerCase().includes("challenge") || s.title?.toLowerCase().includes("current") || s.title?.toLowerCase().includes("situation")
  );
  const impactSection = sections.find((s: any) => 
    s.title?.toLowerCase().includes("impact") || s.title?.toLowerCase().includes("roi") || s.title?.toLowerCase().includes("benefit")
  );

  // Build slides
  const slides = [
    "cover",
    "executive-summary",
    "key-metrics",
    "challenge",
    "recommendation",
    "impact",
    "next-steps",
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setCurrentSlide((s) => Math.max(s - 1, 0)); }
      if (e.key === "Escape") { if (isFullscreen) toggleFullscreen(); else onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalSlides, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const slideStyle = {
    "--deck-primary": primary,
    "--deck-accent": accent,
  } as React.CSSProperties;

  const renderSlide = (slideKey: string) => {
    switch (slideKey) {
      case "cover":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12" style={{ background: `linear-gradient(135deg, ${primary}08, ${accent}08)` }}>
            {brand.logoUrl && (
              <img src={brand.logoUrl} alt="Company logo" className="max-h-16 max-w-[240px] object-contain mb-10" />
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: primary }}>
              {agentLabel} Executive Recommendation
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{dateStr}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
              <span>Powered by</span>
              <span className="font-semibold" style={{ color: primary }}>unfoldHR AI</span>
            </div>
          </div>
        );

      case "executive-summary":
        return (
          <div className="flex flex-col h-full px-12 py-10">
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>Executive Summary</h2>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-foreground mb-8 max-w-3xl">{summary}</p>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card max-w-md">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                  style={{ backgroundColor: confidence.score >= 75 ? "#10b981" : confidence.score >= 60 ? "#f59e0b" : "#ef4444" }}
                >
                  {confidence.score}%
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{confidence.level} Confidence</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{confidence.reason}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "key-metrics":
        return (
          <div className="flex flex-col h-full px-12 py-10">
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>Key Metrics at a Glance</h2>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 content-center">
              {metrics.map((m) => {
                const val = extractMetricValue(res, m.key, agentType);
                const color = getMetricColor(val);
                return (
                  <div key={m.key} className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primary}15`, color: primary }}>
                        {m.icon}
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold" style={{ color }}>{val}</span>
                      <span style={{ color }}>{getTrendIcon(val)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "challenge":
        return (
          <div className="flex flex-col h-full px-12 py-10">
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>The Challenge</h2>
            <div className="flex-1 flex flex-col justify-center max-w-3xl">
              {challengeSection ? (
                <ul className="space-y-4">
                  {challengeSection.items?.map((item: any, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <div>
                        <span className="font-semibold text-foreground">{item.label}: </span>
                        <span className="text-muted-foreground">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">Based on the inputs provided:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(run.inputs || {}).map(([k, v]) => (
                      <div key={k} className="p-3 rounded-lg border border-border bg-card">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.replace(/_/g, " ")}</p>
                        <p className="text-sm font-medium text-foreground mt-1">{String(v)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "recommendation":
        return (
          <div className="flex flex-col h-full px-12 py-10 overflow-auto">
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>Our Recommendation</h2>
            <div className="flex-1 space-y-6 max-w-3xl">
              {recommendationSection ? (
                recommendationSection.items?.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: primary }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                      {item.tag && (
                        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full" style={{ backgroundColor: `${accent}20`, color: accent }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                sections.map((s: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items?.map((item: any, j: number) => (
                        <li key={j} className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{item.label}:</span> {item.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              {timeline.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-foreground mb-3">Timeline</h3>
                  <div className="space-y-2">
                    {timeline.map((t: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-full max-w-[200px]">
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${t.pct}%`, backgroundColor: primary }} />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{t.phase}</span>
                        <span className="text-xs text-muted-foreground">{t.focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "impact":
        return (
          <div className="flex flex-col h-full px-12 py-10">
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>Expected Impact & ROI</h2>
            <div className="flex-1 space-y-8 max-w-3xl flex flex-col justify-center">
              {impactSection ? (
                <ul className="space-y-3">
                  {impactSection.items?.map((item: any, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accent }} />
                      <div>
                        <span className="font-semibold text-foreground">{item.label}: </span>
                        <span className="text-muted-foreground">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-muted-foreground">Detailed impact analysis available in the full report.</p>
              )}

              {risks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Risks & Mitigations</h3>
                  <div className="space-y-2">
                    {risks.map((risk: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "next-steps":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12" style={{ background: `linear-gradient(135deg, ${primary}08, ${accent}08)` }}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: primary }}>Next Steps</h2>
            <div className="text-left max-w-2xl space-y-4 mb-10">
              {(recommendationSection?.items || sections[0]?.items || []).slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: primary }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/70 mt-auto pb-6">
              <span>Generated by</span>
              <span className="font-semibold" style={{ color: primary }}>unfoldHR AI</span>
              <span>· {dateStr}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col"
      style={slideStyle}
    >
      {/* Top bar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <X className="w-5 h-5 text-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">{run.title || agentLabel} — Executive Deck</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={() => {
              const popout = window.open("", "_blank", "width=1280,height=720,menubar=no,toolbar=no,location=no,status=no");
              if (popout) {
                // Copy stylesheets
                const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
                  .map(el => el.outerHTML).join("\n");
                const slideContainer = containerRef.current;
                if (slideContainer) {
                  popout.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${run.title || agentLabel} — Executive Deck</title>${stylesheets}</head><body>${slideContainer.innerHTML}</body></html>`);
                  popout.document.close();
                }
              }
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4 text-foreground" />
          </button>
          <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center p-6 bg-muted/30 overflow-hidden">
        <div className="w-full max-w-5xl aspect-[16/9] bg-background rounded-2xl border border-border shadow-xl overflow-hidden relative">
          {renderSlide(slides[currentSlide])}

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1">
            <div className="h-full transition-all duration-300" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%`, backgroundColor: primary }} />
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="h-14 border-t border-border flex items-center justify-center gap-4 bg-card shrink-0">
        <button
          onClick={() => setCurrentSlide((s) => Math.max(s - 1, 0))}
          disabled={currentSlide === 0}
          className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
              style={{
                backgroundColor: i === currentSlide ? primary : undefined,
                opacity: i === currentSlide ? 1 : 0.3,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1))}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
