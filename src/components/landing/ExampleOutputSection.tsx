import { RevealDiv } from "@/components/RevealDiv";
import { ArrowDown } from "lucide-react";

export default function ExampleOutputSection() {
  return (
    <section className="py-20 md:py-28 bg-card/50 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Sample Output
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              What Our Agents Deliver
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Here's an example of the clear, actionable recommendations our agents provide.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md max-w-3xl mx-auto">
            {/* Example badge */}
            <span className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              Example
            </span>

            <div className="flex items-center justify-between mb-4 pt-1">
              <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Decision Snapshot</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                Workforce Planning Agent
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-5">
              120 employees · 25% growth target · Fixed hiring budget · 3 quarters
            </p>

            <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary pl-4 mb-6">
              For a 120-person organization targeting 25% growth over 3 quarters with a fixed budget, 
              we recommend hiring approximately 30 roles. Prioritize revenue-generating positions early, 
              followed by technical capacity, with support phased in later.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Hiring Plan</p>
                <div className="space-y-1.5 text-sm text-foreground">
                  <p>Sales & Revenue <span className="text-primary font-semibold">+9</span></p>
                  <p>Engineering <span className="text-primary font-semibold">+8</span></p>
                  <p>Operations <span className="text-primary font-semibold">+6</span></p>
                  <p>HR & People <span className="text-primary font-semibold">+5</span></p>
                  <p>Support <span className="text-primary font-semibold">+3</span></p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Timeline</p>
                <div className="space-y-2">
                  {[
                    { phase: "Q1", pct: 43, focus: "Revenue roles" },
                    { phase: "Q2", pct: 30, focus: "Technical" },
                    { phase: "Q3", pct: 27, focus: "Support" },
                  ].map((t) => (
                    <div key={t.phase} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{t.phase}</span>
                        <span className="text-[10px] text-muted-foreground">{t.focus}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Key Risks</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                    Fixed budget constrains phased hiring
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                    High volume requires dedicated recruiting
                  </li>
                </ul>
                <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-border">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs font-medium text-foreground">Medium confidence (74%)</span>
                </div>
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* Transition prompt */}
        <RevealDiv delay={0.2}>
          <div className="text-center mt-10 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Now try it yourself with your own data
            </p>
            <button
              onClick={() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200"
            >
              <ArrowDown className="w-4 h-4" />
              Try the Agent Gallery
            </button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
