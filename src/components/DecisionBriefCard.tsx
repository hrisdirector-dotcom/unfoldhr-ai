import { motion } from "framer-motion";

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
  primarySectionTitle?: string;
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
  primarySectionTitle,
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

      {/* Primary items */}
      <motion.div custom={seq++} variants={fadeUp} className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
          Key Themes
        </h4>
        <div className="space-y-4">
          {primaryItems.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-semibold text-foreground mb-0.5">{item.label}</p>
              <p className="text-[13px] text-foreground/75 leading-relaxed">{item.value}</p>
            </div>
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
    </motion.div>
  );
}
