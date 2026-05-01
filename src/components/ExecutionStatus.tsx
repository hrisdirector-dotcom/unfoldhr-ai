import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

export interface ExecutionAction {
  id: string;
  title: string;
  owner: string;
  /** ISO date string or any Date-parseable string */
  dueDate: string;
  /** What's at stake if this action is missed */
  impactIfMissed: string;
}

type ComputedStatus = "On Track" | "At Risk" | "Missed";

function computeStatus(dueDate: string): ComputedStatus {
  const due = new Date(dueDate).getTime();
  if (Number.isNaN(due)) return "On Track";
  const now = Date.now();
  const diffDays = (due - now) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "Missed";
  if (diffDays <= 2) return "At Risk";
  return "On Track";
}

function formatDue(dueDate: string): string {
  const due = new Date(dueDate).getTime();
  if (Number.isNaN(due)) return dueDate;
  const diffMs = due - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"}`;
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}

function statusClasses(status: ComputedStatus) {
  switch (status) {
    case "On Track":
      return {
        dot: "bg-green-500",
        pill: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      };
    case "At Risk":
      return {
        dot: "bg-yellow-500",
        pill: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
      };
    case "Missed":
      return {
        dot: "bg-red-500",
        pill: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      };
  }
}

interface ExecutionStatusProps {
  actions: ExecutionAction[];
  className?: string;
}

export default function ExecutionStatus({ actions, className }: ExecutionStatusProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const enriched = useMemo(
    () =>
      actions.map((a) => ({
        ...a,
        status: computeStatus(a.dueDate),
        done: !!completed[a.id],
      })),
    [actions, completed],
  );

  const incomplete = enriched.filter((a) => !a.done);
  const total = enriched.length;
  const incompleteCount = incomplete.length;

  // Section-level rollup: worst non-completed status wins
  const rollup: ComputedStatus = incomplete.some((a) => a.status === "Missed")
    ? "Missed"
    : incomplete.some((a) => a.status === "At Risk")
      ? "At Risk"
      : "On Track";

  // Pinned next required: earliest due among incomplete
  const nextRequired = [...incomplete].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
  )[0];

  const rollupClasses = statusClasses(rollup);

  return (
    <div className={className}>
      <div className="mb-1">
        <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
          Next Actions
        </p>
        <p className="text-sm font-semibold text-foreground mt-1">Execution Status</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          What must happen next — and what's at risk if it doesn't
        </p>
      </div>

      {/* Section-level summary */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${rollupClasses.pill}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${rollupClasses.dot}`} />
          Execution Status: {rollup}
        </span>
        <span className="text-xs text-muted-foreground">
          {incompleteCount} of {total} action{total === 1 ? "" : "s"} incomplete
        </span>
      </div>

      {/* Pinned Next Required Action */}
      {nextRequired && (
        <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-1.5">
            Next Required Action
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">{nextRequired.title}</p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                statusClasses(nextRequired.status).pill
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusClasses(nextRequired.status).dot}`} />
              {nextRequired.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {nextRequired.owner} · {formatDue(nextRequired.dueDate)}
          </p>
        </div>
      )}

      {/* Action list */}
      <div className="mt-4 space-y-3">
        {enriched.map((action) => {
          const cls = statusClasses(action.status);
          const showEscalation = action.status === "Missed" && !action.done;
          return (
            <motion.div
              key={action.id}
              layout
              className={`rounded-xl border bg-background p-4 transition-opacity ${
                action.done ? "opacity-60" : ""
              } border-border`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={action.done}
                  onCheckedChange={(v) =>
                    setCompleted((prev) => ({ ...prev, [action.id]: !!v }))
                  }
                  className="mt-0.5"
                  aria-label={`Mark "${action.title}" complete`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p
                      className={`text-sm font-semibold text-foreground ${
                        action.done ? "line-through" : ""
                      }`}
                    >
                      {action.title}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${cls.pill}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cls.dot}`} />
                      {action.done ? "Complete" : action.status}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Owner:</span> {action.owner}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Due:</span>{" "}
                      {formatDue(action.dueDate)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    <span className="font-semibold text-foreground/80">Impact if missed:</span>{" "}
                    {action.impactIfMissed}
                  </p>
                  <AnimatePresence initial={false}>
                    {showEscalation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-400">
                          This action is past due — risk of outcome failure is increasing.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Helper to convert legacy {title, description} action arrays into ExecutionAction[]
 * with sensible default scheduling so the status logic has data to work with.
 */
export function defaultExecutionActions(
  base: { title: string; description: string }[],
  options?: { startOffsetDays?: number; spacingDays?: number; owner?: string },
): ExecutionAction[] {
  const start = options?.startOffsetDays ?? -1; // first one slightly past due → demonstrates Missed state
  const spacing = options?.spacingDays ?? 3;
  const owner = options?.owner ?? "People Ops";
  return base.map((a, i) => {
    const due = new Date();
    due.setDate(due.getDate() + start + i * spacing);
    return {
      id: `${i}-${a.title}`,
      title: a.title,
      owner,
      dueDate: due.toISOString(),
      impactIfMissed: a.description,
    };
  });
}
