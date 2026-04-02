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
  contextLine: string;
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
  contextLine,
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
      className="bg-card border border-border rounded-2xl px-8 py-9"
    >
      {/* Scenario label + context */}
      <motion.div custom={0} variants={fadeUp} className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-[2px] text-muted-foreground mb-1.5">
          {scenario}
        </p>
        <p className="text-sm text-foreground/70">{contextLine}</p>
      </motion.div>

      {/* Divider */}
      <motion.div custom={1} variants={fadeUp} className="border-t border-border mb-8" />

      {/* Primary section */}
      <motion.div custom={2} variants={fadeUp} className="mb-8">
        <h3 className="font-display text-lg font-bold text-foreground mb-4">
          {primaryTitle}
        </h3>
        <div className="space-y-2">
          {primaryItems.map((item) => (
            <p key={item.label} className="text-sm text-foreground/85">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-semibold text-foreground">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Secondary section */}
      <motion.div custom={3} variants={fadeUp} className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">
          {secondaryTitle}
        </h3>
        <div className="space-y-1.5">
          {secondaryItems.map((item) => (
            <p key={item.label} className="text-[13px] text-foreground/75">
              {item.label} <span className="text-muted-foreground mx-1.5">→</span>{" "}
              <span className="font-medium text-foreground/90">{item.value}</span>
            </p>
          ))}
        </div>
      </motion.div>

      {/* Risks */}
      {insights && insights.length > 0 && (
        <motion.div custom={4} variants={fadeUp}>
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
    </motion.div>
  );
}
