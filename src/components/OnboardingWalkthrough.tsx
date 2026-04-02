import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "unfold_onboarding";

type TourStep = {
  target: string;       // data-tour attribute value
  title: string;
  description: string;
  arrowSide: "bottom" | "top";
};

const STEPS: TourStep[] = [
  {
    target: "try-agent",
    title: "Start here 👋",
    description: "See what an AI HR agent can do for you — try one in 60 seconds.",
    arrowSide: "bottom",
  },
  {
    target: "contact-us",
    title: "Like what you see?",
    description: "Tell us about your challenges and we'll show you what's possible.",
    arrowSide: "bottom",
  },
];

export default function OnboardingWalkthrough() {
  const [step, setStep] = useState<number | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  // Initialise from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // First visit → show step 0 after short delay
        const t = setTimeout(() => setStep(0), 1500);
        return () => clearTimeout(t);
      }
      const data = JSON.parse(saved);
      if (data.step === 1 && !data.done) {
        // Returned after trying agent → show step 1
        const t = setTimeout(() => setStep(1), 1000);
        return () => clearTimeout(t);
      }
      // Tour complete, do nothing
    } catch {
      // ignore
    }
  }, []);

  // Position the tooltip relative to the target element
  const updatePosition = useCallback(() => {
    if (step === null) return;
    const target = document.querySelector(`[data-tour="${STEPS[step].target}"]`);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    setPos({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width / 2,
      width: rect.width,
    });
  }, [step]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition]);

  const advanceToStep1 = () => {
    // User clicked "Try an Agent" — mark step 0 done, queue step 1 for after they return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: 1, done: false }));
    setStep(null);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: 1, done: true }));
    setStep(null);
  };

  const completeStep1 = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: 1, done: true }));
    setStep(null);
  };

  // Listen for navigation to try-* pages to auto-advance
  useEffect(() => {
    if (step !== 0) return;
    const observer = new MutationObserver(() => {
      // If the try-agent target disappears, user navigated away (tried an agent)
      const target = document.querySelector(`[data-tour="try-agent"]`);
      if (!target) advanceToStep1();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [step]);

  if (step === null || !pos) return null;

  const currentStep = STEPS[step];

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: currentStep.arrowSide === "bottom" ? 10 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed z-[9999] pointer-events-auto"
        style={{
          top: pos.top - 12,
          left: pos.left,
          transform: "translate(-50%, -100%)",
        }}
      >
        <div className="relative bg-foreground text-background rounded-xl px-5 py-4 shadow-2xl max-w-[280px]">
          <p className="font-display text-sm font-bold mb-1">{currentStep.title}</p>
          <p className="text-xs leading-relaxed opacity-80">{currentStep.description}</p>
          <div className="flex items-center justify-between mt-3 gap-2">
            <button
              onClick={step === 0 ? dismiss : completeStep1}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none text-background"
            >
              Skip
            </button>
            <button
              onClick={step === 0 ? dismiss : completeStep1}
              className="text-xs font-semibold px-3 py-1.5 rounded-md bg-primary text-primary-foreground cursor-pointer border-none hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
          {/* Arrow pointing down to the button */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid hsl(var(--foreground))",
            }}
          />
        </div>

        {/* Pulsing ring around target */}
        <motion.div
          className="absolute rounded-full border-2 border-primary pointer-events-none"
          style={{
            width: pos.width + 16,
            height: 52,
            left: "50%",
            top: 20,
            transform: "translateX(-50%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
