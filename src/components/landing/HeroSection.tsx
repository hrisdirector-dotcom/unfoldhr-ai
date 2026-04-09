import { useState, useEffect } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import heroBg from "@/assets/hero-bg.jpg";

const BENEFIT_TAGS = [
  { icon: "🏗️", text: "Workforce Planning" },
  { icon: "🔍", text: "Recruiting" },
  { icon: "🚀", text: "Onboarding" },
  { icon: "🎯", text: "Performance" },
  { icon: "⚖️", text: "Compliance" },
];

interface HeroSectionProps {
  setPage: (p: string) => void;
}

export default function HeroSection({ setPage }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.15)` }}
      >
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>
      <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 70% 45%, hsl(var(--blue-soft)) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 50% at 20% 80%, hsl(var(--green-soft)) 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          <RevealDiv>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-6 bg-accent px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI Decision Platform for HR
            </span>
          </RevealDiv>

          <RevealDiv delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl leading-[1.08] text-foreground mb-6">
              Stop managing spreadsheets.
              <br />
              <span className="font-serif-alt italic text-primary">Start making decisions.</span>
            </h1>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
              Unfold HR turns chaotic HR workflows into autonomous AI agents that deliver clear, 
              structured recommendations — so your team can focus on strategy and people, not admin.
            </p>
          </RevealDiv>

          <RevealDiv delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <button
                data-tour="try-agent"
                onClick={() => setPage("try-picker")}
                className="px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Try an Agent — Free
              </button>
              <button
                onClick={() => setPage("agents")}
                className="px-7 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-primary hover:text-primary transition-all duration-200"
              >
                Explore Agents
              </button>
              <button
                data-tour="contact-us"
                onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-xl bg-transparent text-muted-foreground font-medium text-sm border-none cursor-pointer hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                Contact Us
              </button>
            </div>
          </RevealDiv>

          <RevealDiv delay={0.4}>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              {BENEFIT_TAGS.map((b) => (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-card border border-border rounded-full px-3 py-1.5"
                >
                  <span>{b.icon}</span> {b.text}
                </span>
              ))}
            </div>
          </RevealDiv>
        </div>

        {/* Right: Decision Snapshot Demo */}
        <RevealDiv delay={0.3} className="hidden lg:block">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Decision Snapshot</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">Live Preview</span>
            </div>
            <p className="text-xs text-muted-foreground">120 employees · 25% growth target · Fixed hiring budget</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Hiring Plan</p>
                <div className="space-y-1.5 text-sm text-foreground">
                  <p>Sales <span className="text-primary font-semibold">+8</span></p>
                  <p>Engineering <span className="text-primary font-semibold">+3</span></p>
                  <p>HR <span className="text-primary font-semibold">+2</span></p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Timeline</p>
                <div className="space-y-1.5 text-sm text-foreground">
                  <p>Q1 <span className="text-muted-foreground">+5 hires</span></p>
                  <p>Q2 <span className="text-muted-foreground">+4 hires</span></p>
                  <p>Q3 <span className="text-muted-foreground">+4 hires</span></p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Risk</p>
                <p className="text-sm text-foreground leading-relaxed">Engineering hiring bottleneck in Q2–Q3</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span className="text-[10px] text-muted-foreground font-medium">Medium confidence</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setPage("try-picker")}
              className="w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200"
            >
              Try this agent →
            </button>
          </div>
        </RevealDiv>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
