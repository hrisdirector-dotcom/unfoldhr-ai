import { useState, useEffect } from "react";
import { UnfoldMark } from "./UnfoldMark";

interface NavProps {
  page: string;
  setPage: (p: string) => void;
  currentUser: { email: string; role: string } | null;
}

const NAV_LINKS: [string, string][] = [
  ["home", "Platform"],
  ["integrations", "Integrations"],
  ["about", "About"],
  ["contact", "Contact"],
];

export function UnfoldNav({ page, setPage, currentUser }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0"
      >
        <UnfoldMark size={28} />
        <span className="font-display text-lg tracking-tight text-foreground">
          unfold<span className="text-primary font-display">HR</span>
        </span>
      </button>

      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(([p, label]) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border-none cursor-pointer transition-colors bg-transparent ${
              page === p ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <button
            onClick={() => setPage("dashboard")}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-accent text-accent-foreground border border-blue-mid hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            My Dashboard
          </button>
        ) : (
          <button
            onClick={() => setPage("login")}
            className="px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer bg-transparent text-muted-foreground border border-border hover:border-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </button>
        )}
        <button
          onClick={() => {
            setPage("home");
            setTimeout(() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" }), 100);
          }}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none hover:bg-primary transition-colors"
        >
          Request a Build
        </button>
      </div>
    </nav>
  );
}
