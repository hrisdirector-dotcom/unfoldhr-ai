import { RevealDiv } from "@/components/RevealDiv";
import { ArrowDown } from "lucide-react";

const TIMELINE = [
  { phase: "Early phase", focus: "Revenue-generating roles" },
  { phase: "Mid phase", focus: "Technical & delivery capacity" },
  { phase: "Final phase", focus: "Support & operational backfill" },
];

const HIRING = [
  { dept: "Sales & Revenue", focus: "Front-load to support growth", tag: "Critical" },
  { dept: "Engineering", focus: "Phase in to avoid bottlenecks", tag: "High" },
  { dept: "Operations", focus: "Scale alongside workforce", tag: "Medium" },
  { dept: "HR & People", focus: "Expand to support onboarding", tag: "Medium" },
  { dept: "Support", focus: "Add as demand stabilizes", tag: "Standard" },
];

const RISKS = [
  "Budget sensitivity may limit ability to hire ahead of demand",
  "Higher hiring volume requires dedicated recruiting capacity",
  "Engineering roles may face elevated competitive pressure",
];

export default function ExampleOutputSection() {
  return (
    <section id="sample-output" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "24px 24px" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Example Output
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              See What Our Agents Deliver
            </h2>
            <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
              Here's an example of the clear, structured recommendations you'll get from Unfold HR agents.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.08}>
          <div className="relative bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm max-w-2xl mx-auto">
            <span className="absolute -top-2.5 right-5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
              Example
            </span>

            <div className="flex items-center gap-2 mb-3">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-primary">Decision Snapshot</p>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                Workforce Planning
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground mb-3">
              Mid-size organization · Growth-focused planning cycle · Budget-aware
            </p>

            <p className="text-xs text-foreground leading-relaxed border-l-2 border-primary pl-3 mb-5">
              Hiring should prioritize revenue-generating roles in the early phase,
              followed by technical capacity in the middle, with support functions phased in later as operational demand increases.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-background border border-border rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-2.5">Recommended Hiring Focus</p>
                <div className="space-y-1.5">
                  {HIRING.map((h) => (
                    <div key={h.dept} className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-foreground font-medium leading-tight">{h.dept}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{h.focus}</p>
                      </div>
                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                        h.tag === "Critical" ? "bg-primary/10 text-primary"
                        : h.tag === "High" ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}>{h.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-2.5">Hiring Phases</p>
                <div className="space-y-2.5">
                  {TIMELINE.map((t) => (
                    <div key={t.phase}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{t.phase}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-0.5">
                        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${100 / TIMELINE.length}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{t.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <div className="bg-background border border-border rounded-xl p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-2">Key Risks & Observations</p>
                <ul className="space-y-1.5">
                  {RISKS.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-foreground leading-relaxed">
                      <span className="mt-1 w-1 h-1 rounded-full bg-accent-foreground/50 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background border border-border rounded-xl p-3.5 flex flex-col items-center justify-center min-w-[120px]">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-2">Confidence</p>
                <div className="relative w-14 h-14">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <span className="text-base font-bold text-primary">M</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">Medium</span>
              </div>
            </div>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.15}>
          <div className="text-center mt-8 flex flex-col items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground tracking-wide">
              Now try it yourself with your own data
            </p>
            <button
              onClick={() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              Scroll to Agent Gallery
            </button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
