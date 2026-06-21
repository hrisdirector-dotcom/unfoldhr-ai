import { AGENTS } from "@/data/agents";
import { AgentCard } from "@/components/AgentCard";
import { RevealDiv } from "@/components/RevealDiv";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

interface AgentsPageProps {
  onSelectAgent: (agentId: string) => void;
  onBuildAgent: (agentId: string) => void;
  setPage: (p: string) => void;
}

export default function AgentsPage({ onSelectAgent, onBuildAgent, setPage }: AgentsPageProps) {
  return (
    <div className="bg-background">
      {/* ───────────── Hero — matches PlatformHero language ───────────── */}
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
            <span>The Agent Catalog</span>
            <span className="opacity-50">·</span>
            <span className="opacity-70">Control &amp; Readiness · Decision Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-tight max-w-4xl"
          >
            Two families of agents for
            <br />
            <span className="font-serif-alt italic text-blue-200">
              modern HR operations.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-7 text-base md:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
          >
            <span className="text-white font-medium">Control &amp; Readiness Agents</span>{" "}
            govern what can move forward.{" "}
            <span className="text-white font-medium">Decision Agents</span>{" "}
            turn workforce data into recommended action.
          </motion.p>
        </div>
      </section>

      {/* ───────────── Section 1 — Control & Readiness ───────────── */}
      <section className="py-24 md:py-32 bg-paper border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <div className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Family 01 — Lead</span>
              <span className="opacity-40">·</span>
              <span className="text-slate-4">Control &amp; Readiness</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-slate leading-[1.05] tracking-tight max-w-3xl mb-4">
              Control &amp; Readiness Agents
            </h2>
            <p className="text-slate-3 text-lg max-w-2xl leading-relaxed">
              These agents evaluate workforce events and HR actions to determine what can
              progress, what must be held, and what requires approval — turning lifecycle
              activity into governed, auditable outcomes.
            </p>
          </RevealDiv>

          <RevealDiv delay={0.1}>
            <div
              onClick={() => setPage("global-lifecycle-agent")}
              className="group cursor-pointer relative mt-10 bg-white border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-[0_24px_70px_-30px_rgba(28,35,48,0.25)] hover:shadow-[0_30px_90px_-25px_rgba(43,92,230,0.35)]"
            >
              <div className="relative bg-gradient-to-r from-slate via-slate to-slate-2 text-white px-8 md:px-12 py-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono">
                <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
                <span className="text-blue-200/90">Flagship Agent</span>
                <span className="text-white/30">·</span>
                <span className="text-white/80">Workforce Event Control &amp; Readiness</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-8 md:p-12">
                  <h3 className="font-display text-3xl md:text-4xl text-slate mb-5 leading-tight tracking-tight">
                    Global Lifecycle Agent
                  </h3>
                  <p className="text-slate-3 leading-relaxed text-base md:text-lg mb-8 max-w-2xl">
                    Evaluates pending lifecycle events — hires, transfers, exits, role changes —
                    and returns a release verdict for each: ready, hold, or approval required,
                    with the operating trail.
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setPage("global-lifecycle-agent"); }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate text-white font-semibold text-sm hover:bg-primary transition-all group-hover:gap-3 shadow-[0_18px_50px_-18px_rgba(43,92,230,0.6)]"
                  >
                    Try the Flagship Agent <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-2 relative bg-paper border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10">
                  <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
                  <p className="relative text-[11px] font-mono uppercase tracking-[0.22em] text-slate-4 mb-5 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    Sample verdicts
                  </p>
                  <div className="relative space-y-3">
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Ready for release</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">All readiness checks passed</p>
                      </div>
                    </div>
                    <div className="bg-white border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Approval required</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Policy exception detected</p>
                      </div>
                    </div>
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <Clock className="w-4 h-4 text-slate-4 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Held — awaiting input</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Manager confirmation pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ───────────── Section 2 — Decision Agents ───────────── */}
      <section className="py-24 md:py-32 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <div className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-4 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-4" />
              <span>Family 02</span>
              <span className="opacity-40">·</span>
              <span>Decision Intelligence</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl text-slate leading-[1.05] tracking-tight max-w-3xl mb-4">
              Decision Agents
            </h2>
            <p className="text-slate-3 text-base md:text-lg max-w-2xl leading-relaxed mb-12">
              Structured recommendations for specific HR domains — workforce planning,
              listening, performance, compliance, and more. Part of the Decision Support
              product.
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AGENTS.map((agent, i) => (
              <RevealDiv key={agent.id} delay={i * 0.04}>
                <AgentCard
                  agent={agent}
                  onSelect={() => onSelectAgent(agent.id)}
                  onBuild={() => onBuildAgent(agent.id)}
                />
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
