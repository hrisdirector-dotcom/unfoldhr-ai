import { MODULES } from "@/data/modules";

interface AdminPageProps {
  setPage: (p: string) => void;
}

export default function AdminPage({ setPage }: AdminPageProps) {
  return (
    <div className="bg-background min-h-screen pt-28 pb-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl text-foreground mb-1">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Module engagement and platform stats</p>
          </div>
          <button
            onClick={() => setPage("dashboard")}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-transparent text-muted-foreground border border-border cursor-pointer hover:text-foreground transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Modules", value: "12" },
            { label: "Agent Prompts", value: "36" },
            { label: "API Integrations", value: "23" },
            { label: "HCM Platforms", value: "8" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="font-display text-2xl text-foreground mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Module Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-lg text-foreground">Module Engagement</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-semibold">Module</th>
                <th className="text-left px-6 py-3 font-semibold">Level</th>
                <th className="text-left px-6 py-3 font-semibold">Lessons</th>
                <th className="text-left px-6 py-3 font-semibold">Duration</th>
                <th className="text-left px-6 py-3 font-semibold">Prompts</th>
              </tr>
            </thead>
            <tbody>
              {MODULES.map(mod => (
                <tr key={mod.id} className="border-b border-border last:border-none hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="text-sm font-medium text-foreground">{mod.icon} {mod.title}</span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{mod.levelLabel}</td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{mod.lessons}</td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{mod.duration}</td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{mod.prompts.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
