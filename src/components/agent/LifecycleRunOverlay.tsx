import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  show: boolean;
  steps: string[];
  eventLabel: string;
  employeeName: string;
  onDone: () => void;
  agentLabel?: string;
}

export function LifecycleRunOverlay({ show, steps, eventLabel, employeeName, onDone, agentLabel }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <RunOverlayInner
          steps={steps}
          eventLabel={eventLabel}
          employeeName={employeeName}
          onDone={onDone}
          agentLabel={agentLabel}
        />
      )}
    </AnimatePresence>
  );
}

function RunOverlayInner({
  steps,
  eventLabel,
  employeeName,
  onDone,
  agentLabel,
}: Omit<Props, "show">) {
  const [active, setActive] = useState(0);
  const total = steps.length;
  const totalMs = 4400;
  const stepMs = totalMs / total;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => {
        if (a >= total - 1) {
          clearInterval(interval);
          setTimeout(onDone, 550);
          return a + 1;
        }
        return a + 1;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [onDone, stepMs, total]);

  const progress = Math.min(100, ((active + 1) / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{ background: "rgba(15, 23, 42, 0.78)", backdropFilter: "blur(14px)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 45%, rgba(43,92,230,0.22), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-blue-300/80 font-mono">
              {agentLabel ?? "Global Lifecycle Agent"}
            </div>
            <div className="mt-1 font-display text-white text-lg leading-tight">
              {eventLabel} · {employeeName}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-200/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            <span className="font-mono uppercase tracking-wider">executing</span>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-6 space-y-1.5">
          {steps.map((step, i) => {
            const state = i < active ? "done" : i === active ? "active" : "pending";
            return (
              <motion.div
                key={step}
                animate={{ opacity: state === "pending" ? 0.4 : 1 }}
                transition={{ duration: 0.25 }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                  state === "active" ? "bg-white/[0.04]" : ""
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center shrink-0">
                  {state === "done" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </motion.div>
                  ) : state === "active" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-blue-400 border-t-transparent"
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-white/25" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    state === "active"
                      ? "text-white font-medium"
                      : state === "done"
                      ? "text-white/80"
                      : "text-white/55"
                  }`}
                >
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-blue-200/60 font-mono uppercase tracking-wider">
          <span>Control & readiness evaluation</span>
          <span>{Math.min(active + 1, total)} / {total}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
