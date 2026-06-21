import { ArrowLeft, Home } from "lucide-react";

interface AgentPageNavProps {
  setPage: (p: string) => void;
  /** Use light variant on dark backgrounds. Defaults to "auto" (dark text on light bg). */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Compact breadcrumb-style navigation shown at the top of an individual agent
 * page so users can quickly return to the agent catalog or the homepage
 * without relying solely on the global nav.
 */
export default function AgentPageNav({ setPage, variant = "dark", className = "" }: AgentPageNavProps) {
  const isLight = variant === "light";
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border";
  const styles = isLight
    ? "border-white/15 text-white/80 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white"
    : "border-border text-muted-foreground bg-background hover:bg-muted hover:text-foreground";

  return (
    <nav
      aria-label="Agent page navigation"
      className={`flex items-center gap-2 ${className}`}
    >
      <button onClick={() => setPage("agents")} className={`${base} ${styles}`}>
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Agents
      </button>
      <button onClick={() => setPage("home")} className={`${base} ${styles}`}>
        <Home className="w-3.5 h-3.5" />
        Home
      </button>
    </nav>
  );
}
