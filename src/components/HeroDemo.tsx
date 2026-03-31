import { useState } from "react";
import { Play, Sparkles } from "lucide-react";

export default function HeroDemo() {
  const [run, setRun] = useState(false);

  return (
    <div className="relative">
      <div className="rounded-3xl border border-border bg-background/80 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-1">
              Live AI Demo
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Workforce Planning Agent
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
              Inputs
            </p>
            <div className="space-y-2">
              <div className="rounded-xl bg-muted px-3 py-2 text-sm text-foreground">
                Current headcount: 120
              </div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm text-foreground">
                Growth target: +25%
              </div>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm text-foreground">
                Budget constraint: +15%
              </div>
            </div>
          </div>

          {!run ? (
            <button
              onClick={() => setRun(true)}
              className="w-full h-11 rounded-xl bg-foreground text-background font-semibold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run Demo
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  Prompt
                </p>
                <div className="rounded-xl bg-muted p-3 text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  Draft a headcount plan based on current workforce size, growth
                  targets, and budget constraints.
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
                  AI Output
                </p>
                <div className="rounded-xl bg-card border border-border p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
{`Headcount Plan Summary

Recommended hires:
• 8 Sales Reps
• 3 Engineers
• 2 HR Business Partners

Timeline:
• Q1: 5 hires
• Q2: 4 hires
• Q3: 4 hires

Risks:
• Budget overrun if hiring accelerates early
• Engineering pipeline constraints`}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Example output for demonstration only.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
