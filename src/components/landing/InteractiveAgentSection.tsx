import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

interface HiringResult {
  departments: { name: string; hires: number; priority: string }[];
  timeline: { phase: string; hires: number; focus: string }[];
  risks: string[];
  confidence: { level: string; score: number; reason: string };
  summary: string;
}

function simulate(employees: number, growth: number, budgetType: string, quarters: number, notes: string): HiringResult {
  const totalHires = Math.round(employees * (growth / 100));
  const isFixed = budgetType === "Fixed budget";
  const hiresPerQ = Math.ceil(totalHires / quarters);

  const depts = [
    { name: "Sales & Revenue", pct: 0.3, priority: "Critical" },
    { name: "Engineering", pct: 0.25, priority: "High" },
    { name: "Operations", pct: 0.2, priority: "Medium" },
    { name: "HR & People", pct: 0.15, priority: "Medium" },
    { name: "Support", pct: 0.1, priority: "Standard" },
  ];

  const departments = depts.map(d => ({
    name: d.name,
    hires: Math.max(1, Math.round(totalHires * d.pct)),
    priority: d.priority,
  }));

  const timeline = Array.from({ length: quarters }, (_, i) => {
    const phase = quarters <= 2 ? `Q${i + 1}` : i === 0 ? "Early phase" : i === quarters - 1 ? "Final phase" : `Mid-phase ${i}`;
    const frontLoaded = i === 0 ? Math.ceil(hiresPerQ * 1.3) : Math.floor(hiresPerQ * 0.85);
    const hires = Math.max(1, Math.min(frontLoaded, totalHires));
    const focus = i === 0 ? "Revenue-generating roles" : i === quarters - 1 ? "Support & backfill" : "Technical & delivery";
    return { phase, hires, focus };
  });

  const risks = [
    `${isFixed ? "Fixed budget constrains" : "Flexible budget enables"} phased hiring across ${quarters} quarter${quarters > 1 ? "s" : ""}`,
    totalHires > 20 ? "High volume hiring requires dedicated recruiting capacity" : "Manageable volume — existing recruiting processes should suffice",
    `Engineering hiring may face ${employees > 200 ? "competitive market pressure" : "sourcing challenges in niche roles"}`,
    growth > 30 ? "Aggressive growth targets increase attrition risk if onboarding capacity isn't scaled" : "Growth pace allows structured onboarding ramp-up",
  ];

  const confScore = isFixed ? (growth > 30 ? 62 : 74) : (growth > 30 ? 70 : 82);

  return {
    departments,
    timeline,
    risks,
    confidence: {
      level: confScore >= 75 ? "High" : confScore >= 60 ? "Medium" : "Low",
      score: confScore,
      reason: "Based on modeled workforce planning patterns aligned to your inputs — not actual organizational data.",
    },
    summary: `For a ${employees}-person organization targeting ${growth}% growth over ${quarters} quarter${quarters > 1 ? "s" : ""} with a ${budgetType.toLowerCase()}, we recommend hiring approximately ${totalHires} roles. Prioritize revenue-generating positions early, followed by technical capacity, with support functions phased in as operational demand increases.`,
  };
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-primary text-primary-foreground",
  High: "bg-accent text-accent-foreground",
  Medium: "bg-muted text-muted-foreground",
  Standard: "bg-card text-muted-foreground",
};

export default function InteractiveAgentSection() {
  const [employees, setEmployees] = useState(120);
  const [growth, setGrowth] = useState(25);
  const [budgetType, setBudgetType] = useState("Fixed budget");
  const [quarters, setQuarters] = useState(3);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HiringResult | null>(null);

  const handleRun = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(simulate(employees, growth, budgetType, quarters, notes));
      setLoading(false);
    }, 1800);
  };

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="max-w-4xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-4 bg-accent px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Interactive Demo
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Try Your Own Workforce Planning Agent
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Enter your company details and run the agent to get a custom hiring recommendation — just like the example above.
            </p>
          </div>
        </RevealDiv>

        {/* Form */}
        <RevealDiv delay={0.1}>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  Current Employees
                </label>
                <input
                  type="number"
                  min={1}
                  value={employees}
                  onChange={e => setEmployees(Math.max(1, Number(e.target.value)))}
                  className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  Expected Growth %
                </label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={growth}
                  onChange={e => setGrowth(Math.max(1, Math.min(200, Number(e.target.value))))}
                  className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  Hiring Budget Type
                </label>
                <select
                  value={budgetType}
                  onChange={e => setBudgetType(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option>Fixed budget</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  Timeframe (Quarters)
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={quarters}
                  onChange={e => setQuarters(Math.max(1, Math.min(8, Number(e.target.value))))}
                  className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                Additional Constraints or Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g., Engineering is the hardest team to hire for, we have a hiring freeze on support..."
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleRun}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Agent thinking...
                </span>
              ) : (
                "Run Agent →"
              )}
            </button>
          </div>
        </RevealDiv>

        {/* Results */}
        {result && (
          <RevealDiv delay={0.05}>
            <div className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Your Decision Snapshot</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                  Generated
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {employees} employees · {growth}% growth target · {budgetType} · {quarters} quarter{quarters > 1 ? "s" : ""}
              </p>

              {/* Summary */}
              <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary pl-4">
                {result.summary}
              </p>

              {/* Department breakdown */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Recommended Hiring by Department</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.departments.map(d => (
                    <div key={d.name} className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{d.name}</p>
                        <span className="text-primary font-bold text-sm">+{d.hires}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${PRIORITY_COLORS[d.priority] || "bg-muted text-muted-foreground"}`}>
                        {d.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Phased Timeline</p>
                <div className="space-y-2">
                  {result.timeline.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 bg-background border border-border rounded-xl p-3">
                      <span className="text-sm font-semibold text-foreground min-w-[90px]">{t.phase}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (t.hires / (employees * growth / 100)) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-[60px] text-right">+{t.hires} hires</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Key Risks & Observations</p>
                <ul className="space-y-2">
                  {result.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Confidence */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <span className={`w-2 h-2 rounded-full ${result.confidence.score >= 75 ? "bg-green-500" : result.confidence.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`} />
                <span className="text-sm font-medium text-foreground">
                  {result.confidence.level} confidence ({result.confidence.score}%)
                </span>
                <span className="text-xs text-muted-foreground">— {result.confidence.reason}</span>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-muted-foreground/70 text-center pt-2 border-t border-border">
                This is a live demo simulation. Real deployed agents can take actions and integrate with your tools.
              </p>
            </div>
          </RevealDiv>
        )}
      </div>
    </section>
  );
}
