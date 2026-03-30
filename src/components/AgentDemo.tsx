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
            <h4 className="text-sm font-semibold mb-2">Business Inputs</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {input.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              className="text-sm text-primary font-medium"
            >
              {showPrompt ? "Hide Prompt" : "View Prompt →"}
            </button>
            {showPrompt && (
              <pre className="mt-2 text-xs bg-muted p-3 rounded text-muted-foreground whitespace-pre-wrap">
                {prompt}
              </pre>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">AI Output</h4>
            <div className="text-sm text-foreground whitespace-pre-wrap bg-muted p-4 rounded">
              {output}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            AI-generated output. Review before use.
          </p>
        </>
      )}
    </div>
  );
}
