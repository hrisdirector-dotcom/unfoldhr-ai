import { useEffect, useState, useCallback } from "react";
import { RotateCcw } from "lucide-react";

export default function HeroAgentSimulation() {
  const [step, setStep] = useState(0);
  const [promptText, setPromptText] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);

  const fullPrompt = "Draft a headcount plan based on growth and budget constraints.";

  const replay = useCallback(() => {
    setStep(0);
    setPromptText("");
    setOutputVisible(false);
    setTimeout(() => setStep(1), 800);
  }, []);

  useEffect(() => {
    if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setPromptText(fullPrompt.slice(0, i));
        i++;
        if (i > fullPrompt.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 800);
        }
      }, 20);
      return () => clearInterval(interval);
    }

    if (step === 2) {
      setTimeout(() => {
        setOutputVisible(true);
      }, 1000);
    }
  }, [step]);

  useEffect(() => {
    const sequence = setTimeout(() => setStep(1), 800);
    return () => clearTimeout(sequence);
  }, []);

  return (
    <div className="bg-background border border-border rounded-2xl p-6 space-y-5">
      {/* Inputs */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
          Inputs
        </p>
        <div className="space-y-2">
          <div className="bg-muted px-3 py-2 rounded text-sm">Headcount: 120</div>
          <div className="bg-muted px-3 py-2 rounded text-sm">Growth: +25%</div>
          <div className="bg-muted px-3 py-2 rounded text-sm">Budget: +15%</div>
        </div>
      </div>

      {/* Prompt */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
          Prompt
        </p>
        <div className="bg-muted p-3 rounded text-sm min-h-[60px]">
          {promptText}
        </div>
      </div>

      {/* Processing */}
      {step >= 2 && !outputVisible && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Generating output...
        </p>
      )}

      {/* Output */}
      {outputVisible && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2">
            Output
          </p>
          <div className="bg-card border border-border p-4 rounded text-sm whitespace-pre-wrap">
{`Headcount Plan Summary

• 8 Sales Reps
• 3 Engineers
• 2 HRBP

Timeline:
Q1: 5 hires
Q2: 4 hires
Q3: 4 hires`}
      {outputVisible && (
        <button
          onClick={replay}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Replay
        </button>
      )}
        </div>
      )}
    </div>
  );
}
