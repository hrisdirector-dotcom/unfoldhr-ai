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

  const scrollToAgents = () => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" });
  const scrollToExample = () => document.getElementById("sample-output")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background layers */}
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

      <div className="relative w-full max-w-4xl mx-auto px-6 md:px-14 pt-32 pb-20 text-center">
        <RevealDiv>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-8 bg-accent px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Decision Layer for the Enterprise
          </span>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05] text-foreground mb-6">
            See the workforce decision
            <br />
            <span className="font-serif-alt italic text-primary">before you make it.</span>
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            Decision briefs that turn workforce signals into clear actions.
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto mb-10">
            UnfoldHRAI connects signals across your workforce systems — and turns them into clear, actionable decisions.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.3}>
          <div className="flex flex-col items-center gap-4">
            {/* Primary CTAs */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={scrollToAgents}
                className="px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Try an Agent
              </button>
              <button
                onClick={() => setPage("snapshot")}
                className="px-7 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-primary/50 hover:bg-accent transition-all duration-200"
              >
                View Executive Snapshot
              </button>
            </div>
            {/* Secondary links */}
            <div className="flex flex-wrap justify-center gap-6 mt-2">
              <button
                onClick={scrollToExample}
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                See a Decision Brief
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
              <a
                href="https://calendly.com/eric-weaver-unfoldhrai/unfold-hr-ai-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                Book a Demo
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
            {/* Daily Decision Brief teaser */}
            <button
              onClick={() => document.getElementById("daily-brief-teaser")?.scrollIntoView({ behavior: "smooth" }) ?? setPage("today-decisions")}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground/90 hover:text-primary transition-colors group"
            >
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">New</span>
              Get your daily workforce decision brief before you even ask
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </RevealDiv>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
