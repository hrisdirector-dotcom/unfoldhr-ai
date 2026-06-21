import { useState, useEffect } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import heroBg from "@/assets/hero-bg.jpg";

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
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.15)` }}
      >
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.06]" />
      </div>
      <div className="dot-grid absolute inset-0 opacity-15 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 40%, hsl(var(--blue-soft)) 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 md:px-14 pt-32 pb-20 text-center">
        <RevealDiv>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-8 bg-accent px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The HR Agent Platform
          </span>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] text-foreground mb-6">
            Purpose-built AI agents for
            <br />
            <span className="font-serif-alt italic text-primary">HR decisions and workforce event control.</span>
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            UnfoldHRAI deploys two families of HR agents: <span className="text-foreground font-medium">Control &amp; Readiness Agents</span> that determine whether workforce events and HR actions are ready to move forward, and <span className="text-foreground font-medium">Decision Agents</span> that help leaders evaluate workforce, talent, and operating decisions.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.3}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setPage("global-lifecycle-agent")}
                className="px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                See the Flagship Agent →
              </button>
              <button
                onClick={() => scrollTo("agent-families")}
                className="px-7 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-primary/50 hover:bg-accent transition-all duration-200"
              >
                Explore All Agents
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Start with the Global Lifecycle Agent to see how Control &amp; Readiness works.
            </p>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
