import { useState, useEffect } from "react";
import { UnfoldMark } from "./UnfoldMark";
import { Menu, X } from "lucide-react";

interface NavProps {
  page: string;
  setPage: (p: string) => void;
  currentUser: { email: string; role: string } | null;
}

const NAV_LINKS: [string, string][] = [
  ["home", "Platform"],
  ["agents", "Agents"],
  ["integrations", "Integrations"],
  ["about", "About"],
  ["contact", "Contact"],
];

export function UnfoldNav({ page, setPage, currentUser }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = (p: string) => {
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
          <span className="font-display text-lg tracking-tight text-foreground">
            unfold<span className="text-primary font-display">HR</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(([p, label]) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-none cursor-pointer transition-colors bg-transparent ${
                page === p ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <button
              onClick={() => navigate("dashboard")}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-accent text-accent-foreground border border-blue-mid hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              My Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("login")}
              className="px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer bg-transparent text-muted-foreground border border-border hover:border-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => {
              navigate("home");
              setTimeout(() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none hover:bg-primary transition-colors"
          >
            Request a Build
          </button>
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
            {NAV_LINKS.map(([p, label]) => (
              <button
                key={p}
                onClick={() => navigate(p)}
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

            {currentUser ? (
              <button
                onClick={() => navigate("dashboard")}
                className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-accent text-accent-foreground border border-blue-mid transition-colors"
              >
                My Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("login")}
                className="w-full px-4 py-3.5 text-base font-medium rounded-lg cursor-pointer bg-transparent text-foreground border border-border transition-colors"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => {
                navigate("home");
                setTimeout(() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="w-full px-4 py-3.5 text-base font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none transition-colors"
            >
              Request a Build
            </button>
          </div>
        </div>
      )}
    </>
  );
}