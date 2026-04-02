import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "unfold_onboarding";

type TourStep = {
  target: string;
  title: string;
};

const STEPS: TourStep[] = [
  { target: "try-agent", title: "Start here 👋" },
  { target: "contact-us", title: "Like what you see?" },
];

export default function OnboardingWalkthrough() {
  const [step, setStep] = useState<number | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const t = setTimeout(() => setStep(0), 1500);
        return () => clearTimeout(t);
      }
      const data = JSON.parse(saved);
      if (data.step === 1 && !data.done) {
        const t = setTimeout(() => setStep(1), 1000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const updatePosition = useCallback(() => {
    if (step === null) return;
    const el = document.querySelector(`[data-tour="${STEPS[step].target}"]`);
    if (!el) return;
    setRect(el.getBoundingClientRect());
  }, [step]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);

  const advanceToStep1 = () => {
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

  useEffect(() => {
    if (step !== 0) return;
    const observer = new MutationObserver(() => {
      const target = document.querySelector(`[data-tour="try-agent"]`);
      if (!target) advanceToStep1();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [step]);

  if (step === null || !rect) return null;

  const currentStep = STEPS[step];
  const handleAction = step === 0 ? dismiss : completeStep1;

  return (
    <>
      {/* Subtle dot indicator under the button */}
      <motion.div
        key={`dot-${step}`}
        className="fixed z-[9998] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          top: rect.top - 10,
          left: rect.left + rect.width / 2 - 3,
        }}
        animate={{ opacity: [0.9, 0.4, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-primary" />
      </motion.div>

      {/* Tooltip anchored above the specific button, left-aligned */}
      <AnimatePresence>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed z-[9999]"
          style={{
            bottom: `calc(100vh - ${rect.top}px + 12px)`,
            left: rect.left,
          }}
        >
          <div className="relative bg-foreground text-background rounded-lg px-4 py-2.5 shadow-xl max-w-[180px]">
            <p className="font-display text-[13px] font-semibold leading-tight">{currentStep.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleAction}
                className="text-[11px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none text-background"
              >
                Skip
              </button>
              <button
                onClick={handleAction}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary text-primary-foreground cursor-pointer border-none hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
            {/* Arrow */}
            <div
              className="absolute -bottom-[6px]"
              style={{
                left: Math.min(rect.width / 2, 60),
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid hsl(var(--foreground))",
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
