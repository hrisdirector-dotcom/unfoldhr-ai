import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight } from "lucide-react";

export default function RealWorldDecisionsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              The Reality Gap
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Built for Real-World Decisions
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Most AI tools assume clean inputs and perfect context. Real work doesn't look like that.
            </p>
          </div>
        </RevealDiv>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Structured */}
          <RevealDiv delay={0.05}>
            <div className="h-full bg-card border border-border rounded-2xl p-7">
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground mb-3">
                Structured Environment
              </p>
              <p className="font-display text-lg md:text-xl text-foreground mb-5 leading-snug">
                "What's my PTO balance?"
              </p>
              <ul className="space-y-2 mb-6">
                {["Clear request", "Known context", "Simple retrieval"].map((item) => (
                  <li key={item} className="text-sm text-foreground/75 flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-foreground/60" strokeWidth={2.5} />
                  Answer provided
                </p>
              </div>
            </div>
          </RevealDiv>

          {/* Unstructured */}
          <RevealDiv delay={0.1}>
            <div className="h-full bg-card border-2 border-primary/30 rounded-2xl p-7 relative">
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary mb-3">
                Unstructured Environment
              </p>
              <p className="font-display text-lg md:text-xl text-foreground mb-5 leading-snug">
                "Need Friday off… I've got patients… not sure coverage…"
              </p>
              <ul className="space-y-2">
                {["Fragmented input", "Missing context", "Real-world constraints"].map((item) => (
                  <li key={item} className="text-sm text-foreground/75 flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealDiv>
        </div>

        {/* Output panel */}
        <RevealDiv delay={0.15}>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary">
                UnfoldHRAI Response
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">
                  Summary
                </h4>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  Request for time off during an active care schedule where coverage is not yet confirmed.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">
                  Recommendation
                </h4>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  Proceed if coverage can be secured without disrupting scheduled care.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2.5">
                  Risks
                </h4>
                <ul className="space-y-1.5">
                  {[
                    "Gaps in continuity",
                    "Last-minute staffing constraints",
                    "Operational strain",
                  ].map((item) => (
                    <li key={item} className="text-sm text-foreground/75 flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2.5">
                  Observations
                </h4>
                <ul className="space-y-1.5">
                  {[
                    "Timing suggests active shift responsibility",
                    "Coverage is the primary constraint",
                    "Decision depends on staffing, not policy alone",
                  ].map((item) => (
                    <li key={item} className="text-sm text-foreground/75 flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 border-t border-border pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  Next Actions
                </h4>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                  {[
                    "Identify available staff",
                    "Confirm reassignment",
                    "Validate PTO eligibility",
                    "Notify supervisor",
                  ].map((item) => (
                    <p key={item} className="text-sm text-foreground/85 flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/50 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* Closing line */}
        <RevealDiv delay={0.2}>
          <p className="text-center mt-12 text-foreground text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            UnfoldHRAI doesn't wait for perfect inputs.{" "}
            <span className="text-primary">It structures the decision anyway.</span>
          </p>
        </RevealDiv>
      </div>
    </section>
  );
}
