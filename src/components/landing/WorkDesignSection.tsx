import { ArrowRight } from "lucide-react";
import { RevealDiv } from "@/components/RevealDiv";
import ClassificationBadge from "@/components/workflows/ClassificationBadge";
import { CLASSIFICATIONS, DOMAINS, WORKFLOWS, computeCounts } from "@/data/workflows";

interface Props {
  setPage: (p: string) => void;
}

export default function WorkDesignSection({ setPage }: Props) {
  const eliminated = WORKFLOWS.reduce((n, w) => n + computeCounts(w).eliminated, 0);

  return (
    <section className="bg-paper-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <RevealDiv>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-4">
            HR Work, Reimagined
          </p>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-foreground leading-[1.08] tracking-tight">
                Before choosing an agent,
                <br />
                <span className="font-serif-alt italic text-primary">redesign the work.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                We decomposed {WORKFLOWS.length} HR workflows across {DOMAINS.length} domains,
                activity by activity. Each one names what should stop happening, what a rule should
                decide, what a system should execute, and what a person must still own.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {CLASSIFICATIONS.map((c) => (
                  <ClassificationBadge key={c.key} classification={c.key} size="md" />
                ))}
              </div>

              <button
                onClick={() => setPage("workflows")}
                className="mt-9 inline-flex items-center gap-2 bg-slate text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-slate-2 transition"
              >
                Explore the workflow library
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-7 md:p-8">
              <p className="font-display text-2xl text-foreground leading-snug">
                AI reasons. Rules determine. Systems transact. Humans judge.
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  { v: WORKFLOWS.length, l: "workflows modelled" },
                  { v: DOMAINS.length, l: "HR domains" },
                  { v: eliminated, l: "activities eliminated" },
                  { v: 3, l: "already live as agents" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-border pt-3">
                    <dt className="font-display text-3xl text-foreground leading-none">{s.v}</dt>
                    <dd className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 text-xs text-slate-4 leading-relaxed">
                Counts are calculated from the modelled activities in each workflow, not from
                industry benchmarks.
              </p>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
