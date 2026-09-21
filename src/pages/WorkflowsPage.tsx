import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Footer from "@/components/landing/Footer";
import WorkflowCard from "@/components/workflows/WorkflowCard";
import WorkflowDetail from "@/components/workflows/WorkflowDetail";
import {
  AutonomyScalePanel,
  ClassificationLegend,
  DecisionFrameworkPanel,
  HumanControlLegend,
  MethodologyNote,
  PrincipleCallout,
} from "@/components/workflows/FrameworkPanels";
import {
  DESIGN_RULES,
  DESIGN_SEQUENCE,
  DOMAINS,
  FLAGSHIP_WORKFLOW_ID,
  RATING_ORDER,
  WORKFLOWS,
  computeCounts,
  getWorkflow,
  type DomainId,
  type Rating,
} from "@/data/workflows";

interface Props {
  setPage: (p: string) => void;
  initialWorkflowId?: string;
  /** When supplied, the open workflow is driven by the address. */
  onSelectWorkflow?: (id: string | null) => void;
}

type SortKey = "number" | "ai" | "elimination" | "risk";

export default function WorkflowsPage({ setPage, initialWorkflowId, onSelectWorkflow }: Props) {
  const [selected, setSelected] = useState<string | null>(initialWorkflowId ?? null);
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [sort, setSort] = useState<SortKey>("number");

  useEffect(() => {
    setSelected(initialWorkflowId ?? null);
  }, [initialWorkflowId]);

  const open = (id: string) => {
    if (onSelectWorkflow) {
      onSelectWorkflow(id);
      return;
    }
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const close = () => {
    if (onSelectWorkflow) {
      onSelectWorkflow(null);
      return;
    }
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };


  const totals = useMemo(() => {
    return WORKFLOWS.reduce(
      (acc, w) => {
        const c = computeCounts(w);
        acc.current += c.currentActivities;
        acc.eliminated += c.eliminated;
        acc.gates += c.controlGates;
        acc.human += c.human;
        return acc;
      },
      { current: 0, eliminated: 0, gates: 0, human: 0 }
    );
  }, []);

  const rank = (r: Rating) => RATING_ORDER.indexOf(r);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = WORKFLOWS.filter((w) => {
      if (domain !== "all" && w.domain !== domain) return false;
      if (!q) return true;
      return (
        w.name.toLowerCase().includes(q) ||
        w.outcome.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === "ai") return rank(b.aiSuitability) - rank(a.aiSuitability);
      if (sort === "elimination")
        return rank(b.eliminationOpportunity) - rank(a.eliminationOpportunity);
      if (sort === "risk") return rank(b.risk) - rank(a.risk);
      return a.number - b.number;
    });
    return list;
  }, [query, domain, sort]);

  const flagship = getWorkflow(FLAGSHIP_WORKFLOW_ID);
  const selectedWorkflow = selected ? getWorkflow(selected) : null;

  if (selectedWorkflow) {
    return (
      <WorkflowDetail
        workflow={selectedWorkflow}
        onBack={close}
        onOpenWorkflow={open}
        setPage={setPage}
        onContact={() => setPage("contact")}
      />
    );
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate via-slate to-slate-2 text-white overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(43,92,230,0.28), transparent 65%), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(43,92,230,0.15), transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-40 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/90 flex-wrap font-mono"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
            <span>HR Work, Reimagined</span>
            <span className="opacity-50">·</span>
            <span className="opacity-70">{WORKFLOWS.length} workflows · {DOMAINS.length} domains</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-tight max-w-4xl"
          >
            Most HR work isn&apos;t waiting to be automated.
            <br />
            <span className="font-serif-alt italic text-blue-200">
              It&apos;s waiting to be redesigned.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-7 text-base md:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
          >
            Each workflow below is decomposed activity by activity, then rebuilt: what should stop
            happening, what a rule should decide, what a system should execute, and what a person
            must still own.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-3xl">
            {[
              { v: WORKFLOWS.length, l: "workflows modelled" },
              { v: totals.eliminated, l: "activities eliminated" },
              { v: totals.gates, l: "control gates" },
              { v: totals.human, l: "human-led decisions kept" },
            ].map((s) => (
              <div key={s.l} className="bg-slate px-5 py-5">
                <p className="font-display text-3xl leading-none">{s.v}</p>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-blue-200/70">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design sequence */}
      <section className="bg-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-4">
            The design sequence
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl leading-tight">
            Design the work first. Choose the technology last.
          </h2>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DESIGN_SEQUENCE.map((s, i) => (
              <li key={s.key} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Classification legend */}
      <section className="bg-paper-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-4">
            How every activity is classified
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl leading-tight mb-10">
            The first question is never &ldquo;can AI do this?&rdquo;
          </h2>
          <ClassificationLegend />
          <div className="mt-6">
            <PrincipleCallout />
          </div>
        </div>
      </section>

      {/* Flagship */}
      {flagship && (
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="bg-slate text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
              <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-blue-200/80 mb-4">
                    Reference implementation · Workflow {String(flagship.number).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-3xl md:text-5xl leading-tight">
                    {flagship.name}
                  </h2>
                  <p className="mt-5 text-slate-200/85 leading-relaxed max-w-xl">
                    {flagship.description}
                  </p>
                  <button
                    onClick={() => open(flagship.id)}
                    className="mt-8 inline-flex items-center gap-2 bg-white text-slate px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-100 transition"
                  >
                    Read the full analysis
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
                  {(() => {
                    const c = computeCounts(flagship);
                    return [
                      { v: c.currentActivities, l: "current activities" },
                      { v: c.eliminated, l: "eliminated" },
                      { v: c.controlGates, l: "control gates" },
                      { v: c.humanDecisionPoints, l: "human decision points" },
                    ].map((s) => (
                      <div key={s.l} className="bg-slate px-5 py-6">
                        <p className="font-display text-4xl leading-none">{s.v}</p>
                        <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-blue-200/70">
                          {s.l}
                        </p>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Library */}
      <section className="bg-paper border-b border-border" id="workflow-library">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-4">
            The library
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl leading-tight">
            {WORKFLOWS.length} HR workflows, decomposed and redesigned.
          </h2>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workflows"
                aria-label="Search workflows"
                className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="flex items-center gap-2 lg:ml-auto">
              <label
                htmlFor="workflow-sort"
                className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground"
              >
                Sort
              </label>
              <select
                id="workflow-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="number">Workflow order</option>
                <option value="elimination">Elimination opportunity</option>
                <option value="ai">AI potential</option>
                <option value="risk">Risk</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
            <FilterChip active={domain === "all"} onClick={() => setDomain("all")}>
              All domains
            </FilterChip>
            {DOMAINS.map((d) => (
              <FilterChip
                key={d.id}
                active={domain === d.id}
                onClick={() => setDomain(d.id)}
              >
                {d.label}
              </FilterChip>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            Showing {visible.length} of {WORKFLOWS.length} workflows
            {(query || domain !== "all") && (
              <button
                onClick={() => {
                  setQuery("");
                  setDomain("all");
                }}
                className="ml-3 inline-flex items-center gap-1 text-primary font-medium"
              >
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </p>

          {visible.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">
              No workflows match that search. Try a different term or clear the filters.
            </p>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((w) => (
                <WorkflowCard key={w.id} workflow={w} onOpen={open} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Framework detail */}
      <section className="bg-paper-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 space-y-6">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
            The framework
          </p>
          <DecisionFrameworkPanel />
          <HumanControlLegend />
          <AutonomyScalePanel />

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-2xl text-foreground mb-5">Design rules</h3>
            <ol className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {DESIGN_RULES.map((r, i) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground border-t border-border pt-3">
                  <span className="font-mono text-[11px] text-primary pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <MethodologyNote />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
            Three of these workflows already run as Control &amp; Readiness agents.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setPage("agents")}
              className="inline-flex items-center gap-2 bg-white text-slate px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-100 transition"
            >
              See the agents <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage("contact")}
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-2 rounded-full text-xs font-medium transition border ${
        active
          ? "bg-slate text-white border-slate"
          : "bg-card text-muted-foreground border-border hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
