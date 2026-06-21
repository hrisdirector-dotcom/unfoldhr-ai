import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

interface Props {
  setPage: (p: string) => void;
}

export default function FlagshipAgentSection({ setPage }: Props) {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Featured Flagship Agent</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              The first agent to see in action.
            </h2>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div
            onClick={() => setPage("global-lifecycle-agent")}
            className="group cursor-pointer relative bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Flagship</span>
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full bg-accent text-primary">Control &amp; Readiness</span>
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">BambooHR Edition</span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-3 leading-tight">
                  Global Lifecycle Agent
                </h3>
                <p className="text-xs font-bold uppercase tracking-[2.5px] text-primary/80 mb-5">
                  Workforce Event Control &amp; Readiness
                </p>

                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8 max-w-2xl">
                  When BambooHR records a new hire or termination, the Global Lifecycle Agent evaluates whether the event is ready to progress, what exceptions or approvals apply, and which actions should remain held or be prepared next.
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); setPage("global-lifecycle-agent"); }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-primary transition-all group-hover:gap-3"
                >
                  Explore Agent <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right-side visual proof panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-accent/40 to-card border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-muted-foreground mb-4">Live event evaluation</p>
                <div className="space-y-3">
                  <div className="bg-background border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">New hire ready to progress</p>
                        <p className="text-xs text-muted-foreground mt-0.5">All readiness checks passed</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Termination held — approval required</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Final pay policy conflict detected</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">2 actions prepared, not yet released</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Awaiting manager confirmation</p>
                      </div>
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
