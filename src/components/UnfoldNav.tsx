import { useState, useEffect } from "react";
import { UnfoldMark } from "./UnfoldMark";
import { Menu, X } from "lucide-react";
import { pathForPage } from "@/lib/routes";

const DARK_HERO_PAGES = new Set(["home", "global-lifecycle-agent", "leave-control-agent", "compensation-change-agent", "agents", "workflows"]);

interface NavProps {
  page: string;
  setPage: (p: string) => void;
  currentUser: { email: string; role: string } | null;
  onDiscussWorkflow?: () => void;
}

const NAV_LINKS: [string, string, boolean][] = [
  ["services", "Services", false],
  ["agents", "Agent Platform", false],
  ["workflows", "Workflow Library", false],
  ["our-method", "Our Method", false],
  ["about", "About", false],
];

export function UnfoldNav({ page, setPage, currentUser, onDiscussWorkflow }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overDark = !scrolled && !mobileOpen && DARK_HERO_PAGES.has(page);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = (p: string, scrollToGallery = false) => {
    // "Try an Agent" routes directly to the flagship Global Lifecycle Agent
    if (p === "try-agents") {
      setMobileOpen(false);
      setPage("global-lifecycle-agent");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    if (scrollToGallery) {
      setPage("home");
      setMobileOpen(false);
      setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 150);
      return;
    }
    if (p === "our-method") {
      setMobileOpen(false);
      setPage("our-method");
      return;
    }
    setPage(p);
    setMobileOpen(false);
  };

  const discuss = () => {
    setMobileOpen(false);
    if (onDiscussWorkflow) onDiscussWorkflow();
    else setPage("services");
  };

  const linkProps = (p: string, scrollToGallery = false) => ({
    href: pathForPage(p),
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(p, scrollToGallery);
    },
  });


  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300 ${
          scrolled || mobileOpen ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <a
          {...linkProps("home")}
          className={`flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-0 no-underline ${overDark ? "text-white" : "text-foreground"}`}
        >
          <UnfoldMark size={30} />
          <div className="flex flex-col items-start">
            <span className="font-display text-[1.25rem] tracking-tight">
              UnfoldHRAI
            </span>
            <span className={`text-[11px] hidden lg:block ${overDark ? "text-white/60" : "text-muted-foreground"}`}>
              Decision Layer for Workforce Intelligence
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(([p, label, isScroll]) => (
            <a
              key={p}
              {...linkProps(p, !!isScroll)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-none cursor-pointer transition-colors bg-transparent no-underline ${
                page === p
                  ? (overDark ? "text-white" : "text-foreground")
                  : (overDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground")
              }`}
            >
              {label}
            </a>
          ))}
        </div>


        <div className="hidden md:flex items-center gap-3">
          {/* Primary CTA - Discuss a Workflow */}
          <button
            onClick={discuss}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-primary text-primary-foreground border-none hover:bg-primary/90 transition-colors"
          >
            Discuss a Workflow →
          </button>

          {/* Secondary CTA - Explore Agent Demos */}
          <a
            {...linkProps("agents")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer border-none transition-colors inline-flex items-center no-underline ${
              overDark
                ? "bg-white text-slate hover:bg-blue-50"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            Explore Agent Demos
          </a>


          {/* Tertiary - private workspace */}
          {(
            <a
              {...linkProps(currentUser ? "dashboard" : "login")}
              className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer bg-transparent border transition-colors no-underline ${
                overDark
                  ? "text-white/80 border-white/20 hover:text-white hover:border-white/40"
                  : "text-muted-foreground border-border hover:text-foreground hover:border-foreground"
              }`}
            >
              {currentUser ? "My Dashboard" : "Client Workspace"}
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-transparent border cursor-pointer transition-colors ${
            overDark ? "text-white border-white/20 hover:border-white/40" : "text-foreground border-border"
          }`}
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
              <a
                key={p}
                {...linkProps(p, !!isScroll)}
                className={`w-full text-left px-4 py-3.5 text-base font-medium rounded-lg border-none cursor-pointer transition-colors no-underline ${
                  page === p
                    ? "bg-accent text-primary"
                    : "bg-transparent text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </a>
            ))}

            <div className="h-px bg-border my-3" />

            {/* Primary CTA - Discuss a Workflow */}
            <button
              onClick={discuss}
              className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-primary text-primary-foreground border-none transition-colors"
            >
              Discuss a Workflow →
            </button>

            {/* Secondary CTA - Explore Agent Demos */}
            <a
              {...linkProps("agents")}
              className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none transition-colors text-center no-underline"
            >
              Explore Agent Demos
            </a>


            {/* Tertiary - private workspace */}
            {(
              <a
                {...linkProps(currentUser ? "dashboard" : "login")}
                className="w-full px-4 py-3.5 text-base font-medium rounded-lg cursor-pointer bg-transparent text-muted-foreground border border-border transition-colors no-underline"
              >
                {currentUser ? "My Dashboard" : "Client Workspace"}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}