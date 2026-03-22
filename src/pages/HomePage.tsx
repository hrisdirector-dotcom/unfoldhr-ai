import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { MODULES } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { ModuleDrawer } from "@/components/ModuleDrawer";
import { RevealDiv } from "@/components/RevealDiv";
import { Toast } from "@/components/Toast";
import type { Module } from "@/data/modules";

interface HomePageProps {
  setPage: (p: string) => void;
}

const PATHS = [
  { icon: "🏗️", title: "Build It For Me", desc: "We scope, build, and deploy your AI agent end to end. You get a production-ready tool, not a prototype.", tag: "Most popular" },
  { icon: "🤝", title: "Co-Build", desc: "Your team works alongside ours. We handle architecture and integrations while you own the domain logic.", tag: "Collaborative" },
  { icon: "🎓", title: "Train My Team", desc: "Structured workshops that take your HR ops team from AI-curious to shipping production agents.", tag: "Capability building" },
];

export default function HomePage({ setPage }: HomePageProps) {
  const [activeMod, setActiveMod] = useState<Module | null>(null);
  const [toast, setToast] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 5000); };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-card">
      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 md:px-14 pt-36 pb-24 relative overflow-hidden bg-background">
        <div
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.15)` }}
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.12]" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 75% 50%, hsl(var(--blue-soft)) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl">
          <RevealDiv>
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-5 bg-accent px-3 py-1.5 rounded-md">
              AI Agent Platform for HR
            </span>
          </RevealDiv>
          <RevealDiv delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-foreground mb-6">
              Build AI agents<br />
              <span className="font-serif-alt italic text-primary">for every HR workflow</span>
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              12 modules. 36 production-ready prompts. From workforce planning to benefits admin — 
              unfoldHR gives your People team the playbook to ship AI agents that actually work.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-lg bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-colors"
              >
                Explore Modules
              </button>
              <button
                onClick={() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-lg bg-transparent text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-foreground transition-colors"
              >
                Request a Build
              </button>
            </div>
          </RevealDiv>
          <RevealDiv delay={0.4}>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <span>✓ 12 HR modules</span>
              <span>✓ 36 agent prompts</span>
              <span>✓ 23 API integrations</span>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="max-w-7xl mx-auto px-6 md:px-14 py-24">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Platform Modules</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            12 modules. Every HR domain.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12">
            Each module includes a structured curriculum, production-ready prompts, and a direct path to request a custom build.
          </p>
        </RevealDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod, i) => (
            <RevealDiv key={mod.id} delay={i * 0.05}>
              <ModuleCard mod={mod} onClick={() => setActiveMod(mod)} />
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT PATHS */}
      <section className="bg-background py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-14">
          <RevealDiv>
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Engagement Models</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">Three ways to work with us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">Choose the model that fits your team's capacity and ambition.</p>
          </RevealDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PATHS.map((p, i) => (
              <RevealDiv key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-7 hover:border-blue-mid transition-colors h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent text-accent-foreground">{p.tag}</span>
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section id="request" className="max-w-2xl mx-auto px-6 md:px-14 py-24">
        <RevealDiv>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Get Started</span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">Request a Build</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Tell us about your HR workflow challenge and we'll scope a custom AI agent for you.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); showToast("✓ Request received! We'll be in touch within 48 hours."); }}
              className="space-y-4"
            >
              <input placeholder="Work email" type="email" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors" />
              <input placeholder="Company & role" type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors" />
              <textarea placeholder="Describe your HR workflow challenge…" rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none" />
              <button type="submit" className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors">
                Submit Request →
              </button>
            </form>
          </div>
        </RevealDiv>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6 md:px-14 text-center">
        <p className="text-sm text-muted-foreground">© 2025 unfoldHR. AI-powered HR agent platform.</p>
      </footer>

      <ModuleDrawer mod={activeMod} onClose={() => setActiveMod(null)} onToast={showToast} />
      <Toast message={toast} />
    </div>
  );
}
