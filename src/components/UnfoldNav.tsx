import { useState, useEffect } from "react";
import { UnfoldMark } from "./UnfoldMark";
import { Menu, X } from "lucide-react";

const DARK_HERO_PAGES = new Set(["home", "global-lifecycle-agent"]);

interface NavProps {
  page: string;
  setPage: (p: string) => void;
  currentUser: { email: string; role: string } | null;
}

const NAV_LINKS: [string, string, boolean][] = [
  ["how-it-works", "How It Works", false],
  ["try-agents", "Try an Agent", true],
  ["integrations", "Integrations", false],
  ["pricing", "Pricing", false],
  ["about", "About", false],
];

export function UnfoldNav({ page, setPage, currentUser }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overDark = !scrolled && !mobileOpen && DARK_HERO_PAGES.has(page);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = (p: string, scrollToGallery = false) => {
    if (scrollToGallery || p === "try-agents") {
      setPage("home");
      setMobileOpen(false);
      setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 150);
      return;
    }
    if (p === "how-it-works") {
      setPage("home");
      setMobileOpen(false);
      setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }), 150);
      return;
    }
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300 ${
          scrolled || mobileOpen ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0"
        >
          <UnfoldMark size={28} />
          <div className="flex flex-col items-start">
            <span className="font-display text-lg tracking-tight text-foreground">
              unfold<span className="text-primary font-display">HR</span>
            </span>
            <span className="text-[11px] text-muted-foreground hidden lg:block">
              Decision Layer for Workforce Intelligence
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(([p, label, isScroll]) => (
            <button
              key={p}
              onClick={() => navigate(p, !!isScroll)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-none cursor-pointer transition-colors bg-transparent ${
                page === p ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Primary CTA - Try an Agent */}
          <button
            onClick={() => navigate("try-agents", true)}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-primary text-primary-foreground border-none hover:bg-primary/90 transition-colors"
          >
            Try an Agent
          </button>

          {/* Secondary CTA - Book a Demo */}
          <a
            href="https://calendly.com/eric-weaver-unfoldhrai/unfold-hr-ai-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none hover:bg-foreground/90 transition-colors inline-flex items-center"
          >
            Book a Demo
          </a>

          {/* Tertiary - Dashboard (if logged in) */}
          {currentUser && (
            <button
              onClick={() => navigate("dashboard")}
              className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer bg-transparent text-muted-foreground border border-border hover:text-foreground hover:border-foreground transition-colors"
            >
              My Dashboard
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border border-border cursor-pointer text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-[72px] bg-card backdrop-blur-md animate-fade-in">
          <div className="flex flex-col p-6 gap-2">
            {NAV_LINKS.map(([p, label, isScroll]) => (
              <button
                key={p}
                onClick={() => navigate(p, !!isScroll)}
                className={`w-full text-left px-4 py-3.5 text-base font-medium rounded-lg border-none cursor-pointer transition-colors ${
                  page === p
                    ? "bg-accent text-primary"
                    : "bg-transparent text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}

            <div className="h-px bg-border my-3" />

            {/* Primary CTA - Try an Agent */}
            <button
              onClick={() => navigate("try-agents", true)}
              className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-primary text-primary-foreground border-none transition-colors"
            >
              Try an Agent
            </button>

            {/* Secondary CTA - Book a Demo */}
            <a
              href="https://calendly.com/eric-weaver-unfoldhrai/unfold-hr-ai-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none transition-colors text-center"
            >
              Book a Demo
            </a>

            {/* Tertiary - Dashboard (if logged in) */}
            {currentUser && (
              <button
                onClick={() => navigate("dashboard")}
                className="w-full px-4 py-3.5 text-base font-medium rounded-lg cursor-pointer bg-transparent text-muted-foreground border border-border transition-colors"
              >
                My Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}