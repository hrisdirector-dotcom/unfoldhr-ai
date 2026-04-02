import { useState } from "react";

type Props = {
  input: string[];
  prompt: string;
  output: string;
};

export default function AgentDemo({ input, prompt, output }: Props) {
  const [run, setRun] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="bg-background border border-border rounded-xl p-6 space-y-6">
      {!run && (
        <button
          onClick={() => setRun(true)}
          className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold"
        >
          Run Demo →
        </button>
      )}

      {run && (
        <>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Business Context</h4>
            <div className="space-y-1.5">
              {input.map((i) => (
                <p key={i} className="text-sm text-foreground">{i}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">You Ask</h4>
            <p className="text-sm text-foreground/90 bg-muted p-3 rounded leading-relaxed">
              {prompt}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">What You Get</h4>
            <div className="text-sm text-foreground whitespace-pre-wrap bg-muted p-4 rounded">
              {output}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Illustrative example based on the scenario above.
          </p>
        </>
      )}
    </div>
  );
}
