import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight, CheckCircle2, AlertTriangle, Clock, ShieldCheck } from "lucide-react";

interface Props {
  setPage: (p: string) => void;
}

export default function FlagshipAgentSection({ setPage }: Props) {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealDiv>
          <div className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Featured Flagship Agent</span>
            <span className="opacity-40">·</span>
            <span className="text-slate-4">Control &amp; Readiness</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-slate leading-[1.05] tracking-tight max-w-3xl mb-4">
            Start here: the Global Lifecycle Agent
          </h2>
          <p className="text-slate-3 text-lg max-w-2xl leading-relaxed">
            If you want to understand how UnfoldHRAI works, this is the agent to explore first. It shows how Control &amp; Readiness evaluates real workforce events.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div
            onClick={() => setPage("global-lifecycle-agent")}
            className="group cursor-pointer relative mt-10 bg-white border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-[0_24px_70px_-30px_rgba(28,35,48,0.25)] hover:shadow-[0_30px_90px_-25px_rgba(43,92,230,0.35)]"
          >
            {/* slate top bar — borrows from agent-page hero */}
            <div className="relative bg-gradient-to-r from-slate via-slate to-slate-2 text-white px-8 md:px-12 py-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono">
              <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
              <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
              <span className="text-blue-200/90">Flagship Agent</span>
              <span className="text-white/30">·</span>
              <span className="text-white/80">Workforce Event Control &amp; Readiness</span>
              <span className="text-white/30">·</span>
              <span className="text-blue-200/70">BambooHR Edition</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-8 md:p-12">
                <h3 className="font-display text-3xl md:text-4xl text-slate mb-5 leading-tight tracking-tight">
                  Global Lifecycle Agent
                </h3>

                <p className="text-slate-3 leading-relaxed text-base md:text-lg mb-8 max-w-2xl">
                  In a prepared demonstration modeled on a BambooHR-style new hire or termination event, the Global Lifecycle Agent evaluates whether the event is ready to progress, what exceptions or approvals apply, and which actions should remain held or be prepared next. It uses prepared scenario data and does not connect to a live customer system.
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); setPage("global-lifecycle-agent"); }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate text-white font-semibold text-sm hover:bg-primary transition-all group-hover:gap-3 shadow-[0_18px_50px_-18px_rgba(43,92,230,0.6)]"
                >
                  Explore Agent <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right-side visual proof panel — mirrors agent-page outcome cards */}
              <div className="lg:col-span-2 relative bg-paper border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10">
                <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
                <p className="relative text-[11px] font-mono uppercase tracking-[0.22em] text-slate-4 mb-5 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Scenario event evaluation
                </p>
                <div className="relative space-y-3">
                  <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate">New hire ready to progress</p>
                      <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">All readiness checks passed</p>
                    </div>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate">Termination held — approval required</p>
                      <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Final pay policy conflict</p>
                    </div>
                  </div>
                  <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-4 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate">2 actions prepared, not yet released</p>
                      <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Awaiting manager confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
