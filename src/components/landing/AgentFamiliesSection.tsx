import { RevealDiv } from "@/components/RevealDiv";
import { ShieldCheck, Compass } from "lucide-react";

interface Props {
  setPage: (p: string) => void;
}

export default function AgentFamiliesSection({ setPage }: Props) {
  return (
    <section id="agent-families" className="py-24 md:py-32 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Two Agent Families</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Built for two different HR questions.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Some agents help leaders decide what to do. Others determine whether a workforce event is ready to move forward.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Lead family — wider */}
          <RevealDiv delay={0.05} className="lg:col-span-3">
            <div className="relative h-full bg-background border-2 border-primary/40 rounded-3xl p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 0%, hsl(var(--blue-soft)) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-primary-foreground">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Lead Agent Family</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">Control &amp; Readiness Agents</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Evaluate workforce events and HR actions to determine what can progress, what must be held, what requires approval, and what actions should be prepared next.
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Core question</p>
                <p className="text-foreground font-display text-lg italic mb-6">"Can this event safely move forward — and if not, what is blocking it?"</p>

                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Agents in this family</p>
                <ul className="space-y-2 mb-7">
                  {[
                    "Global Lifecycle Agent",
                    "New Hire Readiness",
                    "Termination Control",
                    "Payroll / Policy Exception Handling",
                    "Leave / Return-to-Work",
                  ].map((n) => (
                    <li key={n} className="text-sm text-foreground/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {n}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setPage("global-lifecycle-agent")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-primary transition-all"
                >
                  See the Flagship: Global Lifecycle Agent →
                </button>
              </div>
            </div>
          </RevealDiv>

          {/* Secondary family */}
          <RevealDiv delay={0.12} className="lg:col-span-2">
            <div className="h-full bg-background border border-border rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent text-primary">
                  <Compass className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full bg-accent text-primary">Secondary Family</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">Decision Agents</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Turn workforce questions into recommendations, tradeoffs, and decision briefs for HR leaders.
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Core question</p>
              <p className="text-foreground font-display text-lg italic mb-6">"What should we do?"</p>

              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Agents in this family</p>
              <ul className="space-y-2">
                {[
                  "Workforce Planning",
                  "Compensation Strategy",
                  "Employee Listening Action Prioritization",
                  "Talent / Skills Decision Support",
                ].map((n) => (
                  <li key={n} className="text-sm text-foreground/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
