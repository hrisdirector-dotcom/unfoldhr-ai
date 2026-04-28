import { useState } from "react";
import { useSavedRuns, SavedRun } from "@/hooks/useSavedRuns";
import { downloadCSV, downloadPDF } from "@/lib/downloadResult";
import BrandingModal from "@/components/BrandingModal";
import { Download, Trash2, FileText, ArrowRight, ArrowLeft, Zap, Presentation, Sparkles } from "lucide-react";
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

export default function DashboardPage({ currentUser, onLogout, setPage, onGenerateDeck }: DashboardPageProps) {
  const { runs, loading, deleteRun } = useSavedRuns();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [brandingRun, setBrandingRun] = useState<SavedRun | null>(null);
  const [selectedRun, setSelectedRun] = useState<SavedRun | null>(null);

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
                const res = run.result as any;
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
                        {res?.summary && (
                          <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary pl-3">{res.summary}</p>
                        )}

                        {res?.confidence && (
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${res.confidence.score >= 75 ? "bg-green-500" : res.confidence.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`} />
                            <span className="text-xs font-medium text-foreground">
                              {res.confidence.level} confidence ({res.confidence.score}%)
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                          <button
                            onClick={() => downloadCSV(run.agent_name, res)}
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
                            onClick={() => {
                              setPage(run.agent_type === "workforce" ? "try-agent" : "agents");
                            }}
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
