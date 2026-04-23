import { RevealDiv } from "@/components/RevealDiv";
import { useAuth } from "@/hooks/useAuth";
import { Sunrise, ArrowRight } from "lucide-react";

const MOCK_DECISIONS = [
  {
    title: "Hiring timing risk",
    area: "Sales",
    note: "Pipeline coverage tightening ahead of Q2 ramp.",
  },
  {
    title: "Engagement signal",
    area: "Operations",
    note: "Sentiment shift in two regional teams worth a closer look.",
  },
  {
    title: "Compliance exposure",
    area: "Multi-state",
    note: "New filings affect remote workers across three states.",
  },
];

interface Props {
  setPage: (p: string) => void;
}

export default function DailyDecisionBriefSection({ setPage }: Props) {
  const { user } = useAuth();

  const handleClick = () => {
    if (user) setPage("today-decisions");
    else setPage("auth");
  };

  return (
    <section id="daily-brief-teaser" className="py-20 md:py-28 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              <Sunrise className="w-3.5 h-3.5" />
              Daily Decision Brief
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Start your day with clarity
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Before you open your inbox, know what decisions need your attention.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-muted-foreground">
                Today · 3 decisions need attention
              </p>
              <span className="text-[10px] font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                Preview
              </span>
            </div>

            <ul className="divide-y divide-border">
              {MOCK_DECISIONS.map((d, i) => (
                <li key={i} className="py-4 flex items-start gap-4">
                  <span className="mt-1 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                      <p className="font-display text-sm md:text-base font-semibold text-foreground">
                        {d.title}
                      </p>
                      <span className="text-xs text-muted-foreground">— {d.area}</span>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                      {d.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-border flex justify-center">
              <button
                onClick={handleClick}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
              >
                See your daily decision brief
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
