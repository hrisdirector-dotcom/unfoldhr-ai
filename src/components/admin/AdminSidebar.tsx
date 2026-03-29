import { UnfoldMark } from "@/components/UnfoldMark";
import { LayoutDashboard, Hammer, Mail, ArrowLeft, LogOut } from "lucide-react";

interface AdminSidebarProps {
  activeView: "all" | "builds" | "contacts";
  setActiveView: (v: "all" | "builds" | "contacts") => void;
  onBack: () => void;
  onLogout: () => void;
  stats: { total: number; builds: number; contacts: number; newCount: number };
}

const navItems = [
  { key: "all" as const, label: "All Submissions", icon: LayoutDashboard },
  { key: "builds" as const, label: "Build Requests", icon: Hammer },
  { key: "contacts" as const, label: "Contact Inquiries", icon: Mail },
];

export function AdminSidebar({ activeView, setActiveView, onBack, onLogout, stats }: AdminSidebarProps) {
  const counts = { all: stats.total, builds: stats.builds, contacts: stats.contacts };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <UnfoldMark size={24} />
        <div>
          <span className="font-display text-sm tracking-tight text-foreground">
            unfold<span className="text-primary">HR</span>
          </span>
          <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveView(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer border-none transition-colors ${
              activeView === key
                ? "bg-accent text-primary"
                : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon size={18} />
            <span className="flex-1 text-left">{label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeView === key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <button
          onClick={onBack}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer bg-transparent text-muted-foreground border-none hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer bg-transparent text-muted-foreground border-none hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
