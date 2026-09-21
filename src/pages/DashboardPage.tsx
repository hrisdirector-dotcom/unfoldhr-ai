import { useState } from "react";
import { useSavedRuns, SavedRun } from "@/hooks/useSavedRuns";
import { downloadCSV, downloadPDF } from "@/lib/downloadResult";
import BrandingModal from "@/components/BrandingModal";
import { Download, Trash2, FileText, ArrowRight, ArrowLeft, Zap, Presentation, Sparkles, ChevronDown } from "lucide-react";
import ExecutionStatus, { defaultExecutionActions } from "@/components/ExecutionStatus";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardPageProps {
  currentUser: { email: string; role: string };
  onLogout: () => void;
  setPage: (p: string) => void;
  onGenerateDeck?: (run: SavedRun, branding: { logoUrl: string | null; primaryColor: string; accentColor: string }) => void;
}

const AGENTS_QUICK = [
  { id: "workforce", name: "Workforce Planning", emoji: "🏗️" },
  { id: "recruiting", name: "Recruiting", emoji: "🔍" },
  { id: "onboarding", name: "Onboarding", emoji: "🚀" },
  { id: "performance", name: "Performance Mgmt", emoji: "🎯" },
  { id: "listening", name: "Employee Listening", emoji: "💬" },
  { id: "compliance", name: "Compliance Risk", emoji: "⚖️" },
];

// Paid users and admins can generate decks.
const isPaidUser = (role: string) => role === "admin";

/** Saved-run results are free-form JSON, so narrow them before rendering. */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const asText = (v: unknown): string | null =>
  typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? String(v) : null;

export default function DashboardPage({ currentUser, onLogout, setPage, onGenerateDeck }: DashboardPageProps) {
  const { runs, loading, deleteRun } = useSavedRuns();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [brandingRun, setBrandingRun] = useState<SavedRun | null>(null);
  const [selectedRun, setSelectedRun] = useState<SavedRun | null>(null);
  
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const paid = isPaidUser(currentUser.role);

  const goToGallery = () => {
    setPage("home");
    setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const handleDeckClick = (run: SavedRun) => {
    if (!paid) return;
    setBrandingRun(run);
  };

  const handleBrandingGenerate = (branding: { logoUrl: string | null; primaryColor: string; accentColor: string }) => {
    if (brandingRun && onGenerateDeck) {
      onGenerateDeck(brandingRun, branding);
    }
    setBrandingRun(null);
  };

  if (selectedRun) {
    const res: Record<string, unknown> = isRecord(selectedRun.result) ? selectedRun.result : {};
    const summaryText = asText(res.summary);
    const confidence = isRecord(res.confidence) ? res.confidence : null;
    const confidenceScore = typeof confidence?.score === "number" ? confidence.score : 0;
    const RECOMMENDED_ACTIONS = [
      { title: "Open Sales Roles", description: "Create and prioritize new roles based on hiring gaps", button: "Generate Job Requisition" },
      { title: "Adjust Hiring Plan", description: "Refine hiring timelines and sequencing", button: "Create Hiring Plan" },
      { title: "Align Budget", description: "Review hiring impact on workforce cost", button: "View Cost Scenario" },
    ];
    const formatLabel = (k: string) =>
      k.replace(/[_-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());

    const renderPrimitive = (v: string | number | boolean) => (
      <span className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{String(v)}</span>
    );

    const renderItem = (item: unknown, i: number) => {
      if (item == null) return null;
      if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
        return (
          <li key={i} className="text-sm text-foreground leading-relaxed">
            {String(item)}
          </li>
        );
      }
      if (Array.isArray(item)) {
        return (
          <li key={i}>
            <ul className="list-disc pl-5 space-y-1">{item.map((x, j) => renderItem(x, j))}</ul>
          </li>
        );
      }
      if (!isRecord(item)) return null;
      // object item — pull common fields
      const label = item.label ?? item.title ?? item.name ?? item.heading;
      const detail = item.detail ?? item.description ?? item.text ?? item.summary ?? item.value;
      const tag = item.tag ?? item.badge ?? item.status ?? item.category;
      const knownKeys = new Set(["label", "title", "name", "heading", "detail", "description", "text", "summary", "value", "tag", "badge", "status", "category"]);
      const extra = Object.entries(item).filter(([k, v]) => !knownKeys.has(k) && v != null);

      if (label || detail || tag) {
        return (
          <li key={i} className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {label && <p className="text-sm font-semibold text-foreground">{String(label)}</p>}
                {detail != null && (
                  typeof detail === "string" || typeof detail === "number" ? (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed whitespace-pre-wrap">{String(detail)}</p>
                  ) : (
                    <div className="mt-2">{renderValue(detail)}</div>
                  )
                )}
              </div>
              {tag && (
                <span className="shrink-0 inline-flex items-center rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {String(tag)}
                </span>
              )}
            </div>
            {extra.length > 0 && (
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                {extra.map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{formatLabel(k)}</dt>
                    <dd className="text-xs text-foreground">
                      {typeof v === "string" || typeof v === "number" || typeof v === "boolean"
                        ? String(v)
                        : renderValue(v)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        );
      }

      // generic object — render keys as label/value pairs
      return (
        <li key={i} className="rounded-xl border border-border bg-background p-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
            {Object.entries(item).filter(([, v]) => v != null).map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{formatLabel(k)}</dt>
                <dd className="text-xs text-foreground">
                  {typeof v === "string" || typeof v === "number" || typeof v === "boolean"
                    ? String(v)
                    : renderValue(v)}
                </dd>
              </div>
            ))}
          </dl>
        </li>
      );
    };

    const renderValue = (value: unknown): JSX.Element | null => {
      if (value == null) return null;
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return renderPrimitive(value);
      }
      if (Array.isArray(value)) {
        if (value.length === 0) return null;
        return <ul className="space-y-2">{value.map((item, i) => renderItem(item, i))}</ul>;
      }
      if (!isRecord(value)) return null;
      // object — if it looks like a section { title, items }
      const sectionItems = value.items;
      if (Array.isArray(sectionItems)) {
        return (
          <div className="space-y-3">
            {value.title ? (
              <p className="text-sm font-semibold text-foreground">{String(value.title)}</p>
            ) : null}
            <ul className="space-y-2">{sectionItems.map((item, i) => renderItem(item, i))}</ul>
          </div>
        );
      }
      // generic object — render as label/value list
      const entries = Object.entries(value).filter(([, v]) => v != null);
      if (entries.length === 0) return null;
      return (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {entries.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{formatLabel(k)}</dt>
              <dd className="text-sm text-foreground">
                {typeof v === "string" || typeof v === "number" || typeof v === "boolean"
                  ? String(v)
                  : renderValue(v)}
              </dd>
            </div>
          ))}
        </dl>
      );
    };

    const sectionEntries = Object.entries(res).filter(
      ([k, v]) => !["summary", "confidence"].includes(k) && v != null && !(Array.isArray(v) && v.length === 0)
    );
    return (
      <div className="bg-background min-h-screen pt-28 pb-16 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedRun(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="mb-2 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
            {selectedRun.agent_name}
          </div>
          <h1 className="font-display text-3xl text-foreground mb-6">
            {selectedRun.title || selectedRun.agent_name}
          </h1>

          {summaryText && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{summaryText}</p>
            </div>
          )}

          {sectionEntries.length > 0 && (
            <div className="space-y-4 mb-6">
              {sectionEntries.map(([key, value]) => {
                // Section shape: { title, items }
                const record = isRecord(value) ? value : null;
                const sectionItems = record && Array.isArray(record.items) ? record.items : null;
                if (sectionItems && sectionItems.length === 0) return null;

                const headerLabel = formatLabel(key);
                const sectionTitle = sectionItems && record ? record.title : null;
                const body = sectionItems ? (
                  <ul className="space-y-2">
                    {sectionItems.map((item, i) => renderItem(item, i))}
                  </ul>
                ) : (
                  renderValue(value)
                );

                if (!body) return null;

                const isCollapsed = !!collapsedSections[key];
                return (
                  <div key={key} className="bg-card border border-border rounded-2xl p-6">
                    <button
                      type="button"
                      onClick={() => toggleSection(key)}
                      aria-expanded={!isCollapsed}
                      className="w-full flex items-center justify-between gap-3 text-left group"
                    >
                      <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground group-hover:text-foreground transition-colors">
                        {headerLabel}
                      </p>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${isCollapsed ? "" : "rotate-180"}`}
                      />
                    </button>
                    {!isCollapsed && (
                      <div className="mt-3">
                        {sectionTitle && (
                          <p className="text-sm font-semibold text-foreground mb-3">{String(sectionTitle)}</p>
                        )}
                        {body}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {confidence && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${confidenceScore >= 75 ? "bg-green-500" : confidenceScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`} />
              <span className="text-sm font-medium text-foreground">
                {asText(confidence.level)} confidence ({asText(confidence.score)}%)
              </span>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl p-6">
            <ExecutionStatus actions={defaultExecutionActions(RECOMMENDED_ACTIONS)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-28 pb-16 px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl text-foreground mb-1">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {currentUser.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {currentUser.role === "admin" && (
              <button
                onClick={() => setPage("admin")}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent text-accent-foreground border border-border cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-transparent text-muted-foreground border border-border cursor-pointer hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="mb-10 bg-card border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Free Plan</p>
              <p className="text-xs text-muted-foreground">Upgrade to deploy real agents with your data</p>
            </div>
          </div>
          <button
            onClick={() => setPage("pricing")}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
          >
            View Plans & Upgrade
          </button>
        </div>

        {/* Today's Decisions entry point */}
        <button
          onClick={() => setPage("today-decisions")}
          className="w-full mb-10 bg-card border border-border rounded-2xl p-6 flex items-center justify-between gap-4 cursor-pointer hover:border-primary/40 hover:bg-muted/40 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Today's Decisions</p>
              <p className="text-xs text-muted-foreground">A focused brief of the workforce calls that need your attention today</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </button>

        {/* Quick Run Section */}
        <div className="mb-10">
          <h2 className="font-display text-xl text-foreground mb-4">Run an Agent</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {AGENTS_QUICK.map(a => (
              <button
                key={a.id}
                onClick={goToGallery}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-muted transition-all cursor-pointer group"
              >
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-xs font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Runs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-foreground">Saved Results</h2>
            {runs.length > 0 && (
              <button
                onClick={goToGallery}
                className="text-xs font-medium text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                Run another agent <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
            </div>
          ) : runs.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">No saved results yet</p>
              <p className="text-xs text-muted-foreground/70 mb-4">Run an agent from the gallery and save the results here</p>
              <button
                onClick={goToGallery}
                className="px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-primary transition-colors cursor-pointer"
              >
                Go to Agent Gallery
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {runs.map(run => {
                const isExpanded = expandedId === run.id;
                const res = isRecord(run.result) ? run.result : null;
                const runSummary = asText(res?.summary);
                const runConfidenceRaw = res?.confidence;
                const runConfidence = isRecord(runConfidenceRaw) ? runConfidenceRaw : null;
                const runConfidenceScore =
                  typeof runConfidence?.score === "number" ? runConfidence.score : 0;
                return (
                  <div key={run.id} className="bg-card border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : run.id)}
                      className="w-full flex items-center justify-between p-4 cursor-pointer bg-transparent border-none text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg shrink-0">
                          {AGENTS_QUICK.find(a => a.id === run.agent_type)?.emoji || "🤖"}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {run.title || run.agent_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {run.agent_name} · {new Date(run.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{isExpanded ? "▲" : "▼"}</span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border p-4 space-y-4 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        {runSummary && (
                          <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary pl-3">{runSummary}</p>
                        )}

                        {runConfidence && (
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${runConfidenceScore >= 75 ? "bg-green-500" : runConfidenceScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`} />
                            <span className="text-xs font-medium text-foreground">
                              {asText(runConfidence.level)} confidence ({asText(runConfidence.score)}%)
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() => downloadCSV(run.agent_name, run.result)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3" /> CSV
                          </button>
                          <button
                            onClick={() => downloadPDF(run.agent_name, res)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3" /> PDF
                          </button>

                          {/* Executive Deck button */}
                          {paid ? (
                            <button
                              onClick={() => handleDeckClick(run)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                              <Presentation className="w-3 h-3" /> Generate Executive Deck
                            </button>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  disabled
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium cursor-not-allowed opacity-60"
                                >
                                  <Presentation className="w-3 h-3" /> Executive Deck
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Upgrade to Growth or above to unlock Executive Decks</p>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          <button
                            onClick={() => setSelectedRun(run)}
                            className="text-xs font-medium text-primary hover:underline cursor-pointer"
                          >
                            View Decision & Actions →
                          </button>
                          <button
                            onClick={() => deleteRun(run.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 bg-background text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BrandingModal
        open={!!brandingRun}
        onClose={() => setBrandingRun(null)}
        onGenerate={handleBrandingGenerate}
      />
    </div>
  );
}
