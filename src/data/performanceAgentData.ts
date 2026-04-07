import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

export const SIZES = ["Under 50", "50–200", "200–500", "500+"];
export const DISTRIBUTIONS = ["Top-heavy", "Balanced", "Bottom-heavy"];
export const CHALLENGES = ["Low performance", "Goal alignment", "Manager inconsistency"];
export const CADENCES = ["Annual", "Biannual", "Quarterly", "Inconsistent"];
export const BLOCKERS = [
  "Manager follow-through",
  "Unclear expectations",
  "Weak documentation",
  "Leadership inconsistency",
];

const sizeLabel: Record<string, string> = {
  "Under 50": "smaller",
  "50–200": "mid-sized",
  "200–500": "scaling",
  "500+": "large",
};

function buildSummary(distribution: string, cadence: string, blocker: string): string {
  const distPhrase: Record<string, string> = {
    "Top-heavy":
      "Performance distribution skews heavily toward top ratings, which signals potential rating inflation and weakens the credibility of performance differentiation",
    Balanced:
      "Performance distribution appears balanced on the surface, but underlying execution may be inconsistent across teams and managers",
    "Bottom-heavy":
      "Performance distribution skews toward underperformance, suggesting systemic gaps in enablement, expectations, or management support",
  };

  const cadencePhrase: Record<string, string> = {
    Annual: "Annual review cycles limit the opportunity for timely course correction",
    Biannual: "Biannual reviews provide moderate touchpoints but may still miss early warning signals",
    Quarterly: "Quarterly cadence supports earlier intervention, though consistency of execution varies",
    Inconsistent: "Inconsistent review cadence reduces accountability and makes trend identification difficult",
  };

  const blockerPhrase: Record<string, string> = {
    "Manager follow-through": "Performance gaps are identified but rarely result in structured follow-up or formal improvement plans",
    "Unclear expectations": "Employees operate without clearly defined performance criteria, making fair assessment difficult",
    "Weak documentation": "Lack of documentation weakens the feedback loop and limits accountability across review cycles",
    "Leadership inconsistency": "Inconsistent leadership signals around performance standards create confusion at the manager level",
  };

  return `${distPhrase[distribution]}. ${cadencePhrase[cadence]}. ${blockerPhrase[blocker]}.`;
}

function buildThemes(
  challenge: string,
  blocker: string,
  cadence: string,
  distribution: string
): { label: string; value: string }[] {
  const themes: { label: string; value: string }[] = [];

  const challengeThemes: Record<string, { label: string; value: string }> = {
    "Low performance": {
      label: "Persistent underperformance",
      value: "Underperformance persists without structured intervention, suggesting systemic gaps rather than isolated issues",
    },
    "Goal alignment": {
      label: "Goal-performance disconnect",
      value: "Ratings do not consistently reflect goal completion, indicating a disconnect between objectives and evaluation criteria",
    },
    "Manager inconsistency": {
      label: "Manager-driven variance",
      value: "Performance outcomes are highly dependent on individual manager behavior, creating uneven employee experiences across teams",
    },
  };

  const blockerThemes: Record<string, { label: string; value: string }> = {
    "Manager follow-through": {
      label: "Execution gap",
      value: "Performance is identified but not consistently acted on — follow-through remains the primary constraint",
    },
    "Unclear expectations": {
      label: "Expectation clarity",
      value: "Without clear and consistently communicated expectations, employees lack a reliable benchmark for performance",
    },
    "Weak documentation": {
      label: "Documentation deficit",
      value: "The absence of consistent documentation limits the ability to track patterns, justify decisions, or support development",
    },
    "Leadership inconsistency": {
      label: "Leadership alignment",
      value: "Inconsistent signals from leadership undermine manager confidence and reduce the credibility of performance outcomes",
    },
  };

  const cadenceThemes: Record<string, { label: string; value: string }> = {
    Annual: {
      label: "Review frequency",
      value: "Annual-only reviews delay intervention and reduce the window for meaningful performance correction",
    },
    Biannual: {
      label: "Review cadence",
      value: "Biannual reviews provide moderate structure but may not catch emerging performance issues early enough",
    },
    Quarterly: {
      label: "Cadence execution",
      value: "Quarterly cadence is in place, but consistency and quality of reviews may vary significantly across managers",
    },
    Inconsistent: {
      label: "Review inconsistency",
      value: "Lack of consistent review cycles reduces accountability and makes it difficult to identify performance trends",
    },
  };

  themes.push(challengeThemes[challenge]);
  themes.push(blockerThemes[blocker]);
  themes.push(cadenceThemes[cadence]);

  return themes;
}

function buildObservations(
  distribution: string,
  cadence: string,
  blocker: string,
  size: string
): { text: string }[] {
  const obs: { text: string }[] = [];

  const distObs: Record<string, string> = {
    "Top-heavy":
      "Top-heavy distributions can mask underperformance and reduce the impact of recognition for genuinely high-performing employees",
    Balanced:
      "Balanced distributions can create a false sense of health — drill into department-level patterns before assuming consistency",
    "Bottom-heavy":
      "Bottom-heavy distributions often indicate systemic enablement issues rather than widespread individual underperformance",
  };

  const cadenceObs: Record<string, string> = {
    Annual: "Infrequent review cycles increase reliance on recency bias and reduce the quality of performance data",
    Biannual: "Biannual touchpoints help, but without structured mid-cycle check-ins, critical signals may still be missed",
    Quarterly: "Frequent reviews are only effective when managers are equipped and held accountable for quality conversations",
    Inconsistent: "Irregular review cadence reduces the likelihood of early intervention and erodes employee trust in the process",
  };

  const blockerObs: Record<string, string> = {
    "Manager follow-through": "Performance systems are only as effective as the managers executing them — follow-through is the highest-leverage improvement area",
    "Unclear expectations": "When expectations are unclear, performance conversations become subjective and employees disengage from the process",
    "Weak documentation": "Without documentation, performance decisions are difficult to defend and improvement plans lack accountability",
    "Leadership inconsistency": "When leadership does not model consistent performance standards, manager behavior fragments across the organization",
  };

  obs.push({ text: distObs[distribution] });
  obs.push({ text: cadenceObs[cadence] });
  obs.push({ text: blockerObs[blocker] });

  // Forward-looking statement based on size
  const forwardLooking =
    size === "500+" || size === "200–500"
      ? "As the organization scales, performance system gaps tend to compound — early structural investment will reduce downstream cost"
      : "In smaller organizations, performance culture is shaped disproportionately by a few managers — targeted enablement can shift outcomes quickly";
  obs.push({ text: forwardLooking });

  return obs;
}

function buildActions(
  challenge: string,
  blocker: string,
  cadence: string
): { label: string; value: string }[] {
  const actions: { label: string; value: string }[] = [];

  const challengeActions: Record<string, { label: string; value: string }> = {
    "Low performance": {
      label: "Standardize performance improvement triggers",
      value: "Define clear criteria and timelines for initiating formal improvement plans to ensure consistent intervention",
    },
    "Goal alignment": {
      label: "Align goal-setting with evaluation criteria",
      value: "Ensure individual goals are clearly connected to team and organizational priorities, and that ratings reflect goal completion",
    },
    "Manager inconsistency": {
      label: "Introduce structured calibration sessions",
      value: "Implement cross-functional calibration to align rating standards and reduce manager-driven variance",
    },
  };

  const blockerActions: Record<string, { label: string; value: string }> = {
    "Manager follow-through": {
      label: "Build manager accountability mechanisms",
      value: "Create visibility into manager follow-through on performance actions — surface patterns and hold managers accountable",
    },
    "Unclear expectations": {
      label: "Deploy expectation-setting frameworks",
      value: "Provide managers with structured tools to communicate role expectations clearly at the start of each cycle",
    },
    "Weak documentation": {
      label: "Implement lightweight documentation standards",
      value: "Require minimum documentation for each review conversation to build an auditable performance record over time",
    },
    "Leadership inconsistency": {
      label: "Align leadership on performance philosophy",
      value: "Facilitate executive alignment on performance standards before cascading expectations to managers",
    },
  };

  const cadenceActions: Record<string, { label: string; value: string }> = {
    Annual: {
      label: "Increase review frequency",
      value: "Shift toward at least biannual reviews to create more opportunities for feedback and course correction",
    },
    Biannual: {
      label: "Add structured mid-cycle check-ins",
      value: "Introduce a lightweight mid-cycle review to catch emerging issues before they become entrenched",
    },
    Quarterly: {
      label: "Ensure review quality and consistency",
      value: "Focus on training managers to deliver high-quality quarterly conversations rather than treating them as compliance exercises",
    },
    Inconsistent: {
      label: "Establish a consistent review cadence",
      value: "Commit to a minimum biannual cadence with clear expectations for all managers to participate",
    },
  };

  actions.push(challengeActions[challenge]);
  actions.push(blockerActions[blocker]);
  actions.push(cadenceActions[cadence]);

  return actions;
}

function buildRisks(
  distribution: string,
  blocker: string,
  challenge: string
): { text: string }[] {
  const risks: { text: string }[] = [];

  const distRisks: Record<string, string> = {
    "Top-heavy":
      "Introducing stricter calibration may surface more underperformance than expected — prepare leadership for uncomfortable conversations",
    Balanced:
      "Maintaining perceived balance without deeper investigation may allow systemic issues to persist undetected",
    "Bottom-heavy":
      "Aggressive performance management without adequate support systems may accelerate unwanted attrition alongside managed exits",
  };

  const blockerRisks: Record<string, string> = {
    "Manager follow-through":
      "Manager resistance may slow adoption of new accountability structures — executive sponsorship is critical",
    "Unclear expectations":
      "Clarifying expectations may initially increase dissatisfaction as employees confront gaps between perception and reality",
    "Weak documentation":
      "Documentation requirements may be perceived as bureaucratic — framing and training are essential to adoption",
    "Leadership inconsistency":
      "If leadership alignment is surface-level, inconsistency will re-emerge quickly once attention shifts elsewhere",
  };

  const challengeRisks: Record<string, string> = {
    "Low performance":
      "Increased structure may surface more underperformance than the organization is prepared to address simultaneously",
    "Goal alignment":
      "Over-standardization of goals may reduce flexibility in high-performing teams that operate with greater autonomy",
    "Manager inconsistency":
      "Calibration enforcement without manager buy-in may create compliance behavior rather than genuine alignment",
  };

  risks.push({ text: distRisks[distribution] });
  risks.push({ text: blockerRisks[blocker] });
  risks.push({ text: challengeRisks[challenge] });

  return risks;
}

function applyContext(brief: DecisionBriefProps, context: string): DecisionBriefProps {
  if (!context.trim()) return brief;

  const lower = context.toLowerCase();
  const extra: { text: string }[] = [];

  if (lower.includes("burnout") || lower.includes("stress") || lower.includes("overwhelm")) {
    extra.push({ text: "Reported burnout signals suggest performance issues may be symptoms of capacity or workload problems rather than individual shortcomings" });
  }
  if (lower.includes("attrition") || lower.includes("turnover") || lower.includes("leaving")) {
    extra.push({ text: "Elevated attrition signals indicate that performance system gaps may be driving disengagement before formal intervention occurs" });
  }
  if (lower.includes("pip") || lower.includes("improvement plan")) {
    extra.push({ text: "Concerns around formal improvement plans suggest the current PIP process may lack consistency, follow-through, or perceived fairness" });
  }
  if (lower.includes("bias") || lower.includes("fairness") || lower.includes("equity")) {
    extra.push({ text: "Fairness concerns indicate that performance outcomes may be perceived as inconsistent or influenced by factors beyond individual contribution" });
  }
  if (lower.includes("remote") || lower.includes("hybrid") || lower.includes("distributed")) {
    extra.push({ text: "Distributed work patterns may reduce manager visibility into performance, increasing reliance on documentation and structured check-ins" });
  }

  if (extra.length === 0) {
    extra.push({ text: "Additional organizational context suggests nuances that should be explored further with real performance data and stakeholder input" });
  }

  return {
    ...brief,
    observations: [...(brief.observations || []), ...extra],
  };
}

export function generatePerformanceBrief(
  size: string,
  distribution: string,
  challenge: string,
  cadence: string,
  blocker: string,
  context: string
): DecisionBriefProps {
  const org = sizeLabel[size] || "mid-sized";

  const brief: DecisionBriefProps = {
    scenario: "Based on your selected scenario inputs",
    contextLine: `${org} organization · ${distribution} distribution · ${cadence} reviews · Focus: ${challenge}`,
    primaryTitle: "Performance Management Assessment",
    summary: buildSummary(distribution, cadence, blocker),
    primaryItems: buildThemes(challenge, blocker, cadence, distribution),
    secondaryTitle: "Key Observations",
    secondaryItems: buildObservations(distribution, cadence, blocker, size).map((o) => ({
      label: "Signal",
      value: o.text,
    })),
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: buildActions(challenge, blocker, cadence),
    insights: buildRisks(distribution, blocker, challenge),
    confidence: {
      level: "Medium",
      reason:
        "This output is based on modeled performance management patterns aligned to your selected inputs, not actual organizational data.",
    },
  };

  return applyContext(brief, context);
}
