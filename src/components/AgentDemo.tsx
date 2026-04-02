import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
  situation: string[];
  question: string;
  plan: ReactNode;
};

export default function AgentDemo({ situation, question, plan }: Props) {
  const [run, setRun] = useState(false);

  return (
    <div>
      {!run && (
        <button
          onClick={() => setRun(true)}
          className="px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-primary transition-colors"
        >
          See the plan →
        </button>
      )}

      {run && (
        <div className="space-y-10">
          {/* Your Situation */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-4">Your Situation</h3>
            <div className="space-y-2">
              {situation.map((s) => (
                <p key={s} className="text-sm text-muted-foreground leading-relaxed">{s}</p>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* The Question */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-4">The Question</h3>
            <p className="text-base text-foreground/90 leading-relaxed italic">
              "{question}"
            </p>
          </div>

          <div className="h-px bg-border" />

          {/* Recommended Plan */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Recommended Plan</h3>
            {plan}
          </div>
        </div>
      )}
    </div>
  );
}
