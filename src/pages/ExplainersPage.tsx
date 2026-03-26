import { useState } from "react";
import { EXPLAINERS } from "@/data/explainers";
import { ExplainerPlayer } from "@/components/ExplainerPlayer";
import { RevealDiv } from "@/components/RevealDiv";
import type { Explainer } from "@/data/explainers";
import { getTrainingModuleById } from "@/data/trainingModules";

interface ExplainersPageProps {
  initialModuleId?: string;
}

export default function ExplainersPage({ initialModuleId }: ExplainersPageProps) {
  const [active, setActive] = useState<Explainer | null>(
    initialModuleId ? EXPLAINERS.find(e => e.id === initialModuleId) || null : null
  );

  if (active) {
  const trainingModule = getTrainingModuleById(active.id);

    return (
      <ExplainerPlayer
        explainer={active}
        trainingModule={trainingModule}
        onBack={() => setActive(null)}
      />
    );
  }

  const levelColor = (level: string) =>
    level === "Beginner"
      ? "bg-emerald-50 text-emerald-700"
      : level === "Intermediate"
      ? "bg-accent text-accent-foreground"
      : "bg-orange-50 text-orange-600";

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-14">
      <div className="max-w-5xl mx-auto">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            Animated Explainers
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-foreground mb-3">
            See every module in action
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            12 interactive walkthroughs showing exactly how each AI agent works — from the problem it solves to live prompt output.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPLAINERS.map((e, i) => (
            <RevealDiv key={e.id} delay={i * 0.04}>
              <button
                onClick={() => setActive(e)}
                className="w-full text-left bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-blue-mid hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">
                    MODULE {e.modNum}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${levelColor(e.level)}`}>
                    {e.level}
                  </span>
                </div>
                <h3 className="font-display text-base text-foreground mb-2 leading-snug">
                  {e.modTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {e.sub}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>▶ {e.duration}</span>
                  <span>· {e.tools}</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Watch explainer →
                </div>
              </button>
            </RevealDiv>
          ))}
        </div>
      </div>
    </div>
  );
}
