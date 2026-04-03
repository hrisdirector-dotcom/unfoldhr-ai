import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "unfold_onboarding";
const TOOLTIP_WIDTH = 190;
const TOOLTIP_OFFSET = 14;
const VIEWPORT_PADDING = 12;

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
        const t = setTimeout(() => setStep(0), 1200);
        return () => clearTimeout(t);
      }

      const data = JSON.parse(saved);
      if (data.step === 1 && !data.done) {
        const t = setTimeout(() => setStep(1), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (step === null) return;

    const el = document.querySelector(`[data-tour="${STEPS[step].target}"]`) as HTMLElement | null;

    if (!el) return;

    const nextRect = el.getBoundingClientRect();
    setRect(nextRect);
  }, [step]);

  useEffect(() => {
    if (step === null) return;

    const raf = requestAnimationFrame(() => {
      updatePosition();
    });

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [step, updatePosition]);

  useEffect(() => {
    if (step !== 0) return;

    const observer = new MutationObserver(() => {
      const target = document.querySelector(`[data-tour="try-agent"]`);
      if (!target) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: 1, done: false }));
        setStep(null);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [step]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: 1, done: true }));
    setStep(null);
  };

  if (step === null || !rect) return null;

  const tooltipLeftRaw = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
  const tooltipLeft = Math.min(
    Math.max(tooltipLeftRaw, VIEWPORT_PADDING),
    window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING,
  );

  const tooltipTop = Math.max(rect.top - TOOLTIP_OFFSET - 70, VIEWPORT_PADDING);
  const arrowLeft = rect.left + rect.width / 2 - tooltipLeft - 6;

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="fixed z-[9999]"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: TOOLTIP_WIDTH,
        }}
      >
        <div className="relative rounded-lg bg-foreground text-background px-4 py-3 shadow-xl">
          <p className="font-display text-[13px] font-semibold leading-tight">{STEPS[step].title}</p>

          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={dismiss}
              className="border-none bg-transparent text-[11px] text-background/65 transition-opacity hover:text-background"
            >
              Skip
            </button>

            <button
              onClick={dismiss}
              className="rounded-md border-none bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Got it
            </button>
          </div>

          <div
            className="absolute -bottom-[6px]"
            style={{
              left: Math.min(Math.max(arrowLeft, 12), TOOLTIP_WIDTH - 24),
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
  );
}
