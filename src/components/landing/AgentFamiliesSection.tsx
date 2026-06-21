import { RevealDiv } from "@/components/RevealDiv";
import { ShieldCheck } from "lucide-react";

interface Props {
  setPage: (p: string) => void;
}

export default function AgentFamiliesSection({ setPage }: Props) {
  return (
    <section id="agent-families" className="py-20 md:py-28 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="max-w-2xl mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-3">Lead Agent Family</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
              Control &amp; Readiness Agents
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Govern workforce events and HR actions after they enter the system of record. Determine what can progress, what must be held, and what requires approval.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevealDiv delay={0.05} className="lg:col-span-2">
            <div className="relative h-full bg-background border-2 border-primary/40 rounded-3xl p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 0%, hsl(var(--blue-soft)) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-primary-foreground">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Lead Family</span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  When a workforce event hits your HRIS — a new hire, a termination, a leave request, a policy exception — these agents evaluate whether the event is ready to move forward, what is blocking it, and which actions should be prepared or held.
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">Core operating question</p>
                <p className="text-foreground font-display text-lg italic mb-6">"Can this event safely progress — and if not, what is blocking it?"</p>

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

          <RevealDiv delay={0.1} className="lg:col-span-1">
            <div className="h-full bg-background border border-border rounded-3xl p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">How they work</p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Event ingestion</p>
                  <p className="text-sm text-muted-foreground">Agent reads the workforce event from your HRIS record.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Readiness evaluation</p>
                  <p className="text-sm text-muted-foreground">Checks policy, payroll, access, and approval rules against the event.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Action routing</p>
                  <p className="text-sm text-muted-foreground">Releases prepared actions, holds blocked ones, and flags exceptions.</p>
                </div>
              </div>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
