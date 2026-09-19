import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface PlatformHeroProps {
  setPage: (p: string) => void;
}

export default function PlatformHero({ setPage }: PlatformHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative bg-gradient-to-b from-slate via-slate to-slate-2 text-white overflow-hidden">
      {/* dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
      {/* ambient blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(43,92,230,0.28), transparent 65%), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(43,92,230,0.15), transparent 70%)",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
      {/* hairline bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24 lg:pt-36 lg:pb-32">
        {/* eyebrow — mono, agent-page style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/90 flex-wrap font-mono"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
          <span>Agentic HR Work Design</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.02] tracking-tight max-w-4xl"
        >
          Redesign HR work
          <br />
          <span className="font-serif-alt italic text-blue-200">
            before you automate it
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-7 text-base md:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
        >
          UnfoldHR.ai helps HR leaders determine what work should be eliminated, where AI
          should reason, where rules should determine, where systems should transact, and
          where humans must retain judgment.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 text-base md:text-lg text-slate-200/70 leading-relaxed max-w-2xl"
        >
          Move from scattered AI experiments to a governed, implementation-ready HR
          operating model.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => setPage("workflows")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate font-semibold text-sm shadow-[0_18px_50px_-12px_rgba(43,92,230,0.55)] hover:bg-blue-50 transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            Explore HR Work Reimagined
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("final-cta")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:border-white/40 hover:bg-white/10 transition-all"
          >
            Book a Workflow Redesign Sprint
          </button>
        </motion.div>

      </div>
    </section>
  );
}
