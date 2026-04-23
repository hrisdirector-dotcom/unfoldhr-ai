import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";

export default function AddToDailyBriefHook() {
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 px-5 py-5 md:px-6 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <CalendarPlus className="w-4 h-4" />
        </div>
        <div>
          <p className="font-display text-sm md:text-base font-semibold text-foreground leading-snug">
            Want this surfaced automatically each day?
          </p>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-0.5">
            Add it to your Daily Decision Brief and see it before your inbox.
          </p>
        </div>
      </div>
      <button
        onClick={() => setAdded(true)}
        disabled={added}
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-70 disabled:cursor-default"
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            Added
          </>
        ) : (
          <>
            Add to Daily Decision Brief
            <span className="ml-0.5">→</span>
          </>
        )}
      </button>
    </div>
  );
}
