import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import DecisionBriefCard from "@/components/DecisionBriefCard";
import { RevealDiv } from "@/components/RevealDiv";
import { Toast } from "@/components/Toast";

interface HomePageProps {
  setPage: (p: string) => void;
}

const OUTCOMES = [
  { icon: "🏗️", text: "Workforce planning clarity" },
  { icon: "🔍", text: "Recruiting insights" },
  { icon: "🎯", text: "Performance visibility" },
  { icon: "⚖️", text: "Compliance risk awareness" },
];

const PATHS = [
  { icon: "🏗️", title: "Build It For Me", desc: "We scope, build, and deploy your AI agent end to end. You get a production-ready tool, not a prototype.", tag: "Most popular" },
  { icon: "🤝", title: "Co-Build", desc: "Your team works alongside ours. We handle architecture and integrations while you own the domain logic.", tag: "Collaborative" },
  { icon: "🎓", title: "Advisory", desc: "Strategic guidance on where AI fits in your HR operations, with a clear roadmap to implementation.", tag: "Strategy first" },
];

const AGENTS = [
  { id: "try-agent", name: "Workforce Planning", desc: "Get a hiring plan aligned to your growth targets and budget constraints." },
  { id: "try-listening-agent", name: "Employee Listening", desc: "Surface what your workforce is really saying — and what to do about it." },
  { id: "try-performance-agent", name: "Performance Management", desc: "Identify performance gaps and get a structured action plan." },
];

export default function HomePage({ setPage }: HomePageProps) {
  const [toast, setToast] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
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
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <RevealDiv>
              <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-5 bg-accent px-3 py-1.5 rounded-md">
                AI Decision Platform for HR
              </span>
            </RevealDiv>
            <RevealDiv delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-foreground mb-6">
                Make better workforce decisions
                <br />
                <span className="font-serif-alt italic text-primary">— instantly.</span>
              </h1>
            </RevealDiv>
            <RevealDiv delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                From hiring plans to compliance risks, UnfoldHR gives your team clear, structured
                recommendations without the complexity of building AI.
              </p>
            </RevealDiv>
            <RevealDiv delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowPicker(true)}
                  className="px-7 py-3.5 rounded-lg bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-colors"
                >
                  Try an Agent
                </button>
                <button
                  onClick={() => setPage("agents")}
                  className="px-7 py-3.5 rounded-lg bg-transparent text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-foreground transition-colors"
                >
                  Explore Agents
                </button>
                <button
                  onClick={() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-3.5 rounded-lg bg-transparent text-foreground font-semibold text-sm border-none cursor-pointer hover:text-primary transition-colors underline-offset-4 underline decoration-border hover:decoration-foreground"
                >
                  Request a Demo
                </button>
              </div>
            </RevealDiv>
            <RevealDiv delay={0.4}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-muted-foreground">
                {OUTCOMES.map((o) => (
                  <span key={o.text} className="flex items-center gap-1.5">
                    <span>{o.icon}</span> {o.text}
                  </span>
                ))}
              </div>
            </RevealDiv>
          </div>
          <RevealDiv delay={0.3} className="hidden lg:block">
            <DecisionBriefCard
              scenario="Workforce Planning"
              contextLine="120 employees · 25% growth · Fixed hiring budget"
              primaryTitle="Recommended Hiring Plan for 25% Growth"
              primaryItems={[
                { label: "Sales", value: "8 hires" },
                { label: "Engineering", value: "3 hires" },
                { label: "HR", value: "2 hires" },
              ]}
              secondaryTitle="Hiring Timeline"
              secondaryItems={[
                { label: "Q1", value: "5 hires" },
                { label: "Q2", value: "4 hires" },
                { label: "Q3", value: "4 hires" },
              ]}
              insights={[
                { text: "Engineering hiring depends on pipeline readiness" },
                { text: "Q3 capacity may require contractor support" },
              ]}
            />
          </RevealDiv>
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
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">Request a Demo</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Tell us about your HR workflow challenge and we'll show you how UnfoldHR can help.
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
        <p className="text-sm text-muted-foreground">© 2025 unfoldHR. AI-powered HR decision platform.</p>
      </footer>

      <Toast message={toast} />
    </div>
  );
}
