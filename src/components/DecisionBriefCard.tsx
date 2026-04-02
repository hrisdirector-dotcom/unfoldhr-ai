import { motion } from "framer-motion";

interface BriefLine {
  label: string;
  value: string;
}

interface InsightLine {
  text: string;
}

export interface DecisionBriefProps {
  scenario: string;
  context: BriefLine[];
  primaryTitle: string;
  primaryItems: BriefLine[];
  secondaryTitle: string;
  secondaryItems: BriefLine[];
  insights?: InsightLine[];
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
  context,
  primaryTitle,
  primaryItems,
  secondaryTitle,
  secondaryItems,
  insights,
}: DecisionBriefProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="bg-card border border-border rounded-2xl p-8 space-y-6"
    >
      {/* Scenario label */}
      <motion.p
        custom={0}
        variants={fadeUp}
        className="text-xs font-semibold uppercase tracking-[2.5px] text-primary"
      >
        {scenario}
      </motion.p>

      {/* Context */}
      <motion.div custom={1} variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-1">
        {context.map((c) => (
          <p key={c.label} className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{c.label}:</span> {c.value}
          </p>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div custom={2} variants={fadeUp} className="border-t border-border" />

      {/* Primary section */}
      <motion.div custom={3} variants={fadeUp}>
        <h3 className="font-display text-base font-semibold text-foreground mb-3">
          {primaryTitle}
        </h3>
        <div className="space-y-1.5">
          {primaryItems.map((item) => (
            <p key={item.label} className="text-sm text-foreground/85">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-medium text-foreground">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Secondary section */}
      <motion.div custom={4} variants={fadeUp}>
        <h3 className="font-display text-base font-semibold text-foreground mb-3">
          {secondaryTitle}
        </h3>
        <div className="space-y-1.5">
          {secondaryItems.map((item) => (
            <p key={item.label} className="text-sm text-foreground/85">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-medium text-foreground">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      {insights && insights.length > 0 && (
        <motion.div custom={5} variants={fadeUp} className="space-y-1.5 pt-1">
          {insights.map((insight, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-relaxed">
              ⚠ {insight.text}
            </p>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
