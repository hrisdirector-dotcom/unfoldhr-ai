import { useState } from "react";
import { LevelBadge } from "./LevelBadge";
import type { Module } from "@/data/modules";

interface ModuleCardProps {
  mod: Module;
  onClick: () => void;
}

export function ModuleCard({ mod, onClick }: ModuleCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`bg-card border rounded-xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 ${
        hov ? "border-blue-mid -translate-y-1 shadow-lg shadow-primary/10" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: mod.iconBg }}>
          {mod.icon}
        </span>
        <LevelBadge level={mod.level} label={mod.levelLabel} />
      </div>

      <h3 className="font-display text-lg text-foreground mb-2 leading-snug">{mod.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{mod.desc}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span>📚 {mod.lessons} lessons</span>
        <span>⏱ {mod.duration}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {mod.tools.slice(0, 3).map(t => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground border border-border">
            {t}
          </span>
        ))}
      </div>

      {hov && (
        <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-center py-2.5 text-sm font-semibold">
          Open module →
        </div>
      )}
    </div>
  );
}
