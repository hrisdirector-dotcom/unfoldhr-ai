import { useState } from "react";
import { ChevronRight, Diamond } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AUTHORITY_NOTE,
  AUTONOMY_LEVELS,
  CLASSIFICATION_MAP,
  HUMAN_CONTROL,
  type ControlGate,
  type Workflow,
  type WorkflowStep,
} from "@/data/workflows";
import ClassificationBadge from "./ClassificationBadge";
import { classificationStyles } from "./classificationStyles";

interface Props {
  workflow: Workflow;
}

type Selected =
  | { kind: "step"; step: WorkflowStep }
  | { kind: "gate"; gate: ControlGate }
  | null;

export default function WorkflowMap({ workflow }: Props) {
  const [selected, setSelected] = useState<Selected>(null);

  const gateAfter = (stepId: string) =>
    workflow.controlGates.find((g) => g.afterStepId === stepId);

  return (
    <div>
      <ol className="columns-1 md:columns-2 lg:columns-3 gap-3 [&>li]:mb-3" role="list">
        {workflow.futureStateSteps.map((step, i) => {
          const gate = gateAfter(step.id);
          const s = classificationStyles(step.classification);
          return (
            <li key={step.id} className="break-inside-avoid">
              <div className="flex flex-col">
                <button
                  onClick={() => setSelected({ kind: "step", step })}
                  className={`group text-left w-full h-full bg-card border ${s.ring} rounded-xl p-4 transition hover:shadow-[var(--shadow-card-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                  aria-label={`Step ${i + 1}: ${step.name}. Classified ${
                    CLASSIFICATION_MAP[step.classification].label
                  }. Open details.`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ClassificationBadge classification={step.classification} />
                  </div>
                  <p
                    className={`text-sm font-semibold leading-snug ${
                      step.classification === "eliminate"
                        ? "text-muted-foreground line-through decoration-1 decoration-cls-eliminate/50"
                        : "text-foreground"
                    }`}
                  >
                    {step.name}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    Why this classification
                    <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </span>
                </button>

                {gate && (
                  <button
                    onClick={() => setSelected({ kind: "gate", gate })}
                    className="mt-3 w-full text-left rounded-xl border-2 border-dashed border-primary/40 bg-accent/60 p-4 transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Control gate: ${gate.name}. Open details.`}
                  >
                    <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-2">
                      <Diamond className="h-3 w-3" /> Control gate
                    </span>
                    <p className="text-sm font-semibold text-foreground">{gate.name}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Proceeds:</span>{" "}
                      {gate.proceedCondition}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Escalates:</span>{" "}
                      {gate.escalateCondition}
                    </p>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected?.kind === "step" && <StepDetail step={selected.step} />}
          {selected?.kind === "gate" && <GateDetail gate={selected.gate} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-2">{label}</p>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span className="mt-[7px] h-1 w-1 rounded-full bg-slate-5 shrink-0" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function StepDetail({ step }: { step: WorkflowStep }) {
  const meta = CLASSIFICATION_MAP[step.classification];
  const control = HUMAN_CONTROL[step.humanControl];
  const autonomy = AUTONOMY_LEVELS.find((a) => a.level === step.autonomyLevel);

  return (
    <div className="space-y-5">
      <SheetHeader className="text-left space-y-3">
        <ClassificationBadge classification={step.classification} size="md" className="w-fit" />
        <SheetTitle className="font-display text-2xl leading-tight">{step.name}</SheetTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
      </SheetHeader>

      <Block label={`Why ${meta.label.toLowerCase()}?`}>{step.whyClassification}</Block>
      {step.whyNotAI && <Block label="Why not AI?">{step.whyNotAI}</Block>}
      {step.whyNotHuman && <Block label="Why not routine human work?">{step.whyNotHuman}</Block>}

      <Block label="Human control">
        <span className="font-semibold text-foreground">
          {control.short === "—" ? control.label : `${control.short} — ${control.label}`}
        </span>
        <p className="mt-1">{control.body}</p>
      </Block>

      <Block label="Autonomy level">
        <span className="font-semibold text-foreground">
          Level {step.autonomyLevel} — {autonomy?.label}
        </span>
        <p className="mt-1">{AUTHORITY_NOTE}</p>
      </Block>

      {step.dataRequired.length > 0 && (
        <Block label="Data required">
          <List items={step.dataRequired} />
        </Block>
      )}

      {step.systems.length > 0 && (
        <Block label="Systems involved">
          <div className="flex flex-wrap gap-1.5">
            {step.systems.map((s) => (
              <span
                key={s}
                className="text-[11px] font-mono px-2 py-1 rounded bg-muted text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Block>
      )}

      {step.risks.length > 0 && (
        <Block label="What could go wrong">
          <List items={step.risks} />
        </Block>
      )}
      {step.controls.length > 0 && (
        <Block label="Control that prevents it">
          <List items={step.controls} />
        </Block>
      )}
      {step.metrics.length > 0 && (
        <Block label="Measure">
          <List items={step.metrics} />
        </Block>
      )}
    </div>
  );
}

function GateDetail({ gate }: { gate: ControlGate }) {
  const control = HUMAN_CONTROL[gate.humanControl];
  return (
    <div className="space-y-5">
      <SheetHeader className="text-left space-y-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
          <Diamond className="h-3 w-3" /> Control gate
        </span>
        <SheetTitle className="font-display text-2xl leading-tight">{gate.name}</SheetTitle>
      </SheetHeader>
      <Block label="Proceeds when">{gate.proceedCondition}</Block>
      <Block label="Escalates when">{gate.escalateCondition}</Block>
      <Block label="Human control">
        <span className="font-semibold text-foreground">
          {control.short === "—" ? control.label : `${control.short} — ${control.label}`}
        </span>
        <p className="mt-1">{control.body}</p>
      </Block>
      <Block label="Where authority comes from">{gate.authorityBasis}</Block>
    </div>
  );
}
