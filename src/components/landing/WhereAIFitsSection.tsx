import { RevealDiv } from "@/components/RevealDiv";
import { ArrowUp, ArrowDown } from "lucide-react";

const LAYERS = [
  { name: "Business Outcomes", desc: "Decisions executed across the business", tone: "outcome" },
  { name: "AI Agent Layer", desc: "Where decisions are formed and actions are triggered", tone: "highlight" },
  { name: "Enterprise AI Platform Layer", desc: "Models, governance, and orchestration", tone: "platform" },
  { name: "Data + Integration Layer", desc: "Connected data, APIs, and unified context", tone: "platform" },
  { name: "Process / Workflow Layer", desc: "Operational workflows across HR, finance, and operations", tone: "platform" },
  { name: "Systems of Record", desc: "Core systems: HRIS, payroll, ATS, ERP", tone: "base" },
];

export default function WhereAIFitsSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Enterprise Architecture
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Where Decisions Actually Happen
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              AI doesn't replace systems or platforms — it connects and activates them.
            </p>
          </div>
        </RevealDiv>

        {/* Context label above stack */}
        <RevealDiv delay={0.05}>
          <p className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-muted-foreground mb-5">
            Enterprise Stack <span className="text-primary/70">(Bottom → Top)</span>
          </p>
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

            <div className="space-y-2.5 px-12 md:px-20">
              {LAYERS.map((layer, i) => {
                const isHighlight = layer.tone === "highlight";
                const isOutcome = layer.tone === "outcome";
                const isBase = layer.tone === "base";
                return (
                  <div key={layer.name}>
                    <RevealDiv delay={0.05 * i}>
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

                    {/* Action flow indicator directly under AI Agent Layer */}
                    {isHighlight && (
                      <RevealDiv delay={0.05 * i + 0.05}>
                        <div className="flex items-center justify-center gap-1.5 py-2">
                          <ArrowDown className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                          <span className="text-[11px] font-semibold text-primary tracking-wide">
                            Actions triggered across systems
                          </span>
                        </div>
                      </RevealDiv>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </RevealDiv>

        {/* Bottom insight line */}
        <RevealDiv delay={0.2}>
          <p className="max-w-2xl mx-auto mt-10 text-center text-foreground text-base md:text-lg leading-relaxed font-medium">
            Most companies already have the stack — what's missing is the
            <span className="text-primary"> decision layer </span>
            on top.
          </p>
        </RevealDiv>

        {/* Explanation */}
        <RevealDiv delay={0.25}>
          <div className="max-w-3xl mx-auto mt-12 text-center space-y-4">
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
