import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AddToDailyBriefHook from "@/components/AddToDailyBriefHook";

interface BriefLine {
  label: string;
  value: string;
}

interface InsightLine {
  text: string;
}

interface ConfidenceLevel {
  level: string;
  reason: string;
}

export interface DecisionBriefProps {
  scenario: string;
  contextLine: string;
  primaryTitle: string;
  summary?: string;
  primaryItems: BriefLine[];
  secondaryTitle: string;
  secondaryItems: BriefLine[];
  tertiaryTitle?: string;
  tertiaryItems?: BriefLine[];
  observations?: InsightLine[];
  insights?: InsightLine[];
  confidence?: ConfidenceLevel;
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function DecisionBriefCard({
  scenario,
  contextLine,
  primaryTitle,
  summary,
  primaryItems,
  secondaryTitle,
  secondaryItems,
  tertiaryTitle,
  tertiaryItems,
  observations,
  insights,
  confidence,
}: DecisionBriefProps) {
  let seq = 0;
  const [openAction, setOpenAction] = useState<string | null>(null);

  const actions: {
    key: string;
    title: string;
    description: string;
    button: string;
    output: { heading: string; lines: { label: string; value: string }[]; note: string };
  }[] = [
    {
      key: "requisition",
      title: "Open Sales Roles",
      description: "Create and prioritize new roles based on hiring gaps",
      button: "Generate Job Requisition",
      output: {
        heading: "Job Requisition Draft",
        lines: [
          { label: "Role", value: primaryItems[0]?.label ?? "Sales Representative" },
          { label: "Objective", value: "Close hiring gap to support planned headcount expansion" },
          { label: "Priority", value: "High" },
          { label: "Suggested timing", value: "Open within next 2 weeks" },
        ],
        note: "Mid-market segment focus. Reports to Sales Director. Quota-carrying role aligned to revenue plan.",
      },
    },
    {
      key: "hiring-plan",
      title: "Adjust Hiring Plan",
      description: "Refine hiring timelines and sequencing",
      button: "Create Hiring Plan",
      output: {
        heading: "Hiring Plan Draft",
        lines: [
          { label: "Sequencing", value: "Phase hires across the next two quarters" },
          { label: "First wave", value: "Senior roles to anchor team capacity" },
          { label: "Second wave", value: "Mid-level roles to scale execution" },
          { label: "Review cadence", value: "Monthly check-in with Talent + Finance" },
        ],
        note: "Sequence prioritizes critical capacity first to reduce execution risk on revenue plan.",
      },
    },
    {
      key: "budget",
      title: "Align Budget",
      description: "Review hiring impact on workforce cost",
      button: "View Cost Scenario",
      output: {
        heading: "Cost Scenario Summary",
        lines: [
          { label: "Cost driver", value: "Incremental headcount across the plan period" },
          { label: "Phasing", value: "Spread across quarters to smooth burn" },
          { label: "Sensitivity", value: "Defer second wave if revenue plan slips" },
          { label: "Owner", value: "Finance + People Ops joint review" },
        ],
        note: "Directional cost view — confirm with Finance before locking the budget.",
      },
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="bg-card border border-border rounded-2xl px-8 py-9"
    >
      {/* Scenario label + context */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-[2px] text-muted-foreground mb-1.5">
          {scenario}
        </p>
        <p className="text-sm text-foreground/70">{contextLine}</p>
      </motion.div>

      {/* Divider */}
      <motion.div custom={seq++} variants={fadeUp} className="border-t border-border mb-8" />

      {/* Primary title */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-4">
        <h3 className="font-display text-lg font-bold text-foreground">
          {primaryTitle}
        </h3>
      </motion.div>

      {/* Summary */}
      {summary && (
        <motion.div custom={seq++} variants={fadeUp} className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">
            Summary
          </h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
        </motion.div>
      )}

      {/* Primary items (Headcount Plan) */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
          Headcount Plan
        </h4>
        <div className="space-y-2">
          {primaryItems.map((item) => (
            <p key={item.label} className="text-sm text-foreground/85">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-semibold text-foreground">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Secondary section (Timeline) */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
          {secondaryTitle}
        </h4>
        <div className="space-y-1.5">
          {secondaryItems.map((item) => (
            <p key={item.label} className="text-[13px] text-foreground/75">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-medium text-foreground/90">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Tertiary section */}
      {tertiaryTitle && tertiaryItems && tertiaryItems.length > 0 && (
        <motion.div custom={seq++} variants={fadeUp} className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
            {tertiaryTitle}
          </h4>
          <div className="space-y-1.5">
            {tertiaryItems.map((item) => (
              <p key={item.label} className="text-[13px] text-foreground/75">
                {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
                <span className="font-medium text-foreground/90">{item.value}</span>
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Key Observations */}
      {observations && observations.length > 0 && (
        <motion.div custom={seq++} variants={fadeUp} className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2.5">
            Key Observations
          </h4>
          <ul className="space-y-1.5">
            {observations.map((obs, i) => (
              <li key={i} className="text-xs text-foreground/75 leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                {obs.text}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Execution Risks */}
      {insights && insights.length > 0 && (
        <motion.div custom={seq++} variants={fadeUp} className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2.5">
            Execution Risks
          </h4>
          <ul className="space-y-1.5">
            {insights.map((insight, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                {insight.text}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recommended Actions */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
          Recommended Actions
        </h4>
        <div className="space-y-2.5">
          {[
            {
              title: "Open Sales Roles",
              description: "Create and prioritize new roles based on hiring gaps",
              button: "Generate Job Requisition",
            },
            {
              title: "Adjust Hiring Plan",
              description: "Refine hiring timelines and sequencing",
              button: "Create Hiring Plan",
            },
            {
              title: "Align Budget",
              description: "Review hiring impact on workforce cost",
              button: "View Cost Scenario",
            },
          ].map((action) => (
            <div
              key={action.title}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 rounded-xl border border-border bg-background p-3.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="shrink-0 inline-flex items-center justify-center rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {action.button}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Confidence Level */}
      {confidence && (
        <motion.div custom={seq++} variants={fadeUp}>
          <div className="border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-1.5">
              Confidence Level
            </p>
            <p className="text-sm font-semibold text-foreground mb-1">{confidence.level}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{confidence.reason}</p>
          </div>
        </motion.div>
      )}

      {/* Daily Decision Brief hook */}
      <AddToDailyBriefHook />
    </motion.div>
  );
}
