import { useState } from "react";
import { MODULES } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { ModuleDrawer } from "@/components/ModuleDrawer";
import { Toast } from "@/components/Toast";
import type { Module } from "@/data/modules";

interface DashboardPageProps {
  currentUser: { email: string; role: string };
  onLogout: () => void;
  setPage: (p: string) => void;
}

export default function DashboardPage({ currentUser, onLogout, setPage }: DashboardPageProps) {
  const [activeMod, setActiveMod] = useState<Module | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 5000); };

  return (
    <div className="bg-background min-h-screen pt-28 pb-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl text-foreground mb-1">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {currentUser.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {currentUser.role === "admin" && (
              <button
                onClick={() => setPage("admin")}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent text-accent-foreground border border-border cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-transparent text-muted-foreground border border-border cursor-pointer hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <h2 className="font-display text-xl text-foreground mb-5">Your Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map(mod => (
            <ModuleCard key={mod.id} mod={mod} onClick={() => setActiveMod(mod)} />
          ))}
        </div>
      </div>

      <ModuleDrawer mod={activeMod} onClose={() => setActiveMod(null)} onToast={showToast} />
      <Toast message={toast} />
    </div>
  );
}
