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
          <span>The HR Agent Platform</span>
          <span className="opacity-50">·</span>
          <span className="opacity-70">Control &amp; Readiness · Decision Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.02] tracking-tight max-w-5xl"
        >
          Purpose-built AI agents for
          <br />
          <span className="font-serif-alt italic text-blue-200">
            HR decisions and workforce event control.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-7 text-base md:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
        >
          UnfoldHRAI deploys two families of HR agents:{" "}
          <span className="text-white font-medium">Control &amp; Readiness Agents</span>{" "}
          that determine whether workforce events and HR actions are ready to move forward, and{" "}
          <span className="text-white font-medium">Decision Agents</span>{" "}
          that help leaders evaluate workforce, talent, and operating decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => setPage("global-lifecycle-agent")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate font-semibold text-sm shadow-[0_18px_50px_-12px_rgba(43,92,230,0.55)] hover:bg-blue-50 transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            See the Flagship Agent
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("agent-families")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:border-white/40 hover:bg-white/10 transition-all"
          >
            Explore All Agents
          </button>
        </motion.div>

        {/* breadcrumb-style hint line — mirrors agent-page sub-meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-blue-200/70 font-mono"
        >
          <span>Start path</span>
          <span className="opacity-40">/</span>
          <span className="text-white/85">Global Lifecycle Agent</span>
          <span className="opacity-40">·</span>
          <span>BambooHR Edition</span>
          <span className="opacity-40">·</span>
          <span>Live evaluation demo</span>
        </motion.div>
      </div>
    </section>
  );
}
