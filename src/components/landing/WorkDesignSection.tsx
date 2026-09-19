import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import ClassificationBadge from "@/components/workflows/ClassificationBadge";
import type { Classification } from "@/data/workflows";

interface Props {
  setPage: (p: string) => void;
}

const LENSES: { key: Classification; body: string }[] = [
  {
    key: "eliminate",
    body: "Remove work, approvals, handoffs, and reporting that no longer create value.",
  },
  {
    key: "agent",
    body: "Use AI where interpretation, synthesis, recommendation, or contextual reasoning improves the outcome.",
  },
  {
    key: "deterministic",
    body: "Use policies, business rules, calculations, validations, and systems when the result must be consistent.",
  },
  {
    key: "human",
    body: "Preserve human judgment where accountability, empathy, material risk, or consequential decisions require it.",
  },
];

export default function WorkDesignSection({ setPage }: Props) {
  const uid = useId();

  return (
    <section className="bg-paper-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <RevealDiv>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-4">
            The UnfoldHR Method
          </p>

          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-[1.08] tracking-tight">
              Do not automate the process.
              <br />
              <span className="font-serif-alt italic text-primary">Redesign the work.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Every workflow is examined through four lenses to determine how the work should operate
              before technology is selected or deployed.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LENSES.map((lens) => (
              <li
                key={lens.key}
                aria-labelledby={`${uid}-${lens.key}`}
                className="bg-card border border-border rounded-2xl p-6 md:p-7 h-full"
              >
                <ClassificationBadge
                  classification={lens.key}
                  size="md"
                  id={`${uid}-${lens.key}`}
                />
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{lens.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-border pt-8">
            <p className="font-display text-xl md:text-2xl text-foreground leading-snug max-w-xl">
              AI reasons. Rules determine. Systems transact. Humans judge.
            </p>
            <button
              onClick={() => setPage("workflows")}
              className="inline-flex items-center gap-2 bg-slate text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-slate-2 transition shrink-0 self-start md:self-auto"
            >
              Explore the Workflow Library
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
