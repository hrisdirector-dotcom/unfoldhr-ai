import { RevealDiv } from "@/components/RevealDiv";
import { ArrowUp, ArrowDown } from "lucide-react";

const LAYERS = [
  { name: "Business Outcomes", desc: "Decisions that move the business forward", tone: "outcome" },
  { name: "AI Agent Layer", desc: "Reasoning, decision briefs, recommendations", tone: "highlight" },
  { name: "Enterprise AI Platform Layer", desc: "Models, governance, orchestration", tone: "platform" },
  { name: "Data + Integration Layer", desc: "Pipelines, APIs, unified context", tone: "platform" },
  { name: "Process / Workflow Layer", desc: "HR, finance, and operational workflows", tone: "platform" },
  { name: "Systems of Record", desc: "HRIS, payroll, ATS, finance, ERP", tone: "base" },
];

export default function WhereAIFitsSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Enterprise Architecture
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Where AI Actually Fits
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              AI doesn't replace systems or platforms — it connects and activates them.
            </p>
          </div>
        </RevealDiv>

        {/* Diagram */}
        <RevealDiv delay={0.1}>
          <div className="relative max-w-2xl mx-auto">
            {/* Upward arrows column on the left */}
            <div className="absolute left-2 md:left-6 top-6 bottom-6 flex flex-col items-center justify-between pointer-events-none z-10">
              {LAYERS.slice(0, -1).map((_, i) => (
                <div key={i} className="flex-1 flex items-center justify-center">
                  <ArrowUp className="w-4 h-4 text-primary/60" strokeWidth={2.5} />
                </div>
              ))}
            </div>

            {/* Downward "Actions / Automation" arrow on the right */}
            <div className="absolute right-2 md:right-6 z-10 pointer-events-none flex flex-col items-center"
              style={{ top: "8%", height: "30%" }}
            >
              <ArrowDown className="w-4 h-4 text-muted-foreground" strokeWidth={2.5} />
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[2px] text-muted-foreground writing-mode-vertical text-center max-w-[70px] leading-tight">
                Actions / Automation
              </span>
            </div>

            <div className="space-y-2.5 px-12 md:px-20">
              {LAYERS.map((layer, i) => {
                const isHighlight = layer.tone === "highlight";
                const isOutcome = layer.tone === "outcome";
                const isBase = layer.tone === "base";
                return (
                  <RevealDiv key={layer.name} delay={0.05 * i}>
                    <div
                      className={[
                        "relative rounded-xl px-5 py-4 border transition-all duration-300",
                        isHighlight
                          ? "bg-primary text-primary-foreground border-primary shadow-xl scale-[1.03] ring-4 ring-primary/15"
                          : isOutcome
                          ? "bg-foreground text-background border-foreground"
                          : isBase
                          ? "bg-muted/40 border-border"
                          : "bg-card border-border",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p
                          className={[
                            "font-display text-sm md:text-base font-semibold",
                            isHighlight || isOutcome ? "" : "text-foreground",
                          ].join(" ")}
                        >
                          {layer.name}
                        </p>
                        <span
                          className={[
                            "text-[10px] font-bold uppercase tracking-[2px] shrink-0",
                            isHighlight
                              ? "text-primary-foreground/70"
                              : isOutcome
                              ? "text-background/60"
                              : "text-muted-foreground/70",
                          ].join(" ")}
                        >
                          {String(LAYERS.length - i).padStart(2, "0")}
                        </span>
                      </div>
                      <p
                        className={[
                          "text-xs mt-1 leading-relaxed",
                          isHighlight
                            ? "text-primary-foreground/85"
                            : isOutcome
                            ? "text-background/70"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  </RevealDiv>
                );
              })}
            </div>
          </div>
        </RevealDiv>

        {/* Explanation */}
        <RevealDiv delay={0.2}>
          <div className="max-w-3xl mx-auto mt-16 text-center space-y-4">
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              Most companies don't have a technology problem.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              They already have systems for HR, payroll, finance, and operations.
              The challenge is those systems don't naturally work together in a way that drives decisions.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed font-medium">
              UnfoldHRAI sits on top — connecting signals across the enterprise and helping leaders
              make decisions that actually move the business forward.
            </p>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
