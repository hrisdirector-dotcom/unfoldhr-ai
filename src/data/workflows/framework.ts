import type {
  AutonomyLevel,
  Classification,
  DomainId,
  HumanControl,
  Rating,
} from "./types";

/** Outcome → Question → Eliminate → Allocate → Control → Orchestrate → Execute → Verify → Measure */
export const DESIGN_SEQUENCE: { key: string; label: string; body: string }[] = [
  {
    key: "outcome",
    label: "Outcome",
    body: "What business or employee outcome is this process actually supposed to produce?",
  },
  {
    key: "question",
    label: "Question",
    body: "Why does each current activity exist at all?",
  },
  {
    key: "eliminate",
    label: "Eliminate",
    body: "Remove work created by legacy systems, silos, handoffs, status checking, and duplicate entry.",
  },
  {
    key: "allocate",
    label: "Allocate",
    body: "Decide the right executor for every activity that survives.",
  },
  {
    key: "control",
    label: "Control",
    body: "Define authority, risk boundaries, approvals, escalation, and accountability.",
  },
  {
    key: "orchestrate",
    label: "Orchestrate",
    body: "Coordinate across people, agents, policy, data, and systems.",
  },
  {
    key: "execute",
    label: "Execute",
    body: "Perform authoritative transactions in the systems of record.",
  },
  {
    key: "verify",
    label: "Verify",
    body: "Confirm the transaction happened correctly and detect exceptions.",
  },
  {
    key: "measure",
    label: "Measure",
    body: "Measure business outcomes, not agent activity.",
  },
];

/**
 * Deliberately ordered Eliminate-first. These are not four equivalent
 * automation choices: the first question is whether the work should exist.
 */
export const CLASSIFICATIONS: {
  key: Classification;
  letter: "X" | "H" | "D" | "A";
  label: string;
  question: string;
  reasoning: string;
}[] = [
  {
    key: "eliminate",
    letter: "X",
    label: "Eliminate",
    question: "Should this activity exist?",
    reasoning:
      "This activity exists because information historically had to be manually transferred or coordinated between systems. It does not create meaningful business or employee value.",
  },
  {
    key: "human",
    letter: "H",
    label: "Human",
    question: "Does this require consequential judgment?",
    reasoning:
      "This activity involves judgment, discretion, empathy, or accountability that should remain human-owned.",
  },
  {
    key: "deterministic",
    letter: "D",
    label: "Deterministic",
    question: "Must the result be exactly reproducible?",
    reasoning:
      "The outcome is determined from codified rules and authoritative data. The same inputs should always produce the same result.",
  },
  {
    key: "agent",
    letter: "A",
    label: "AI Agent",
    question: "Does this require interpretation or orchestration?",
    reasoning:
      "The work requires understanding intent, synthesising unstructured context, personalising communication, monitoring, or coordinating across systems.",
  },
];

export const CLASSIFICATION_MAP = Object.fromEntries(
  CLASSIFICATIONS.map((c) => [c.key, c])
) as Record<Classification, (typeof CLASSIFICATIONS)[number]>;

export const HUMAN_CONTROL: Record<
  HumanControl,
  { short: string; label: string; body: string }
> = {
  hitl: {
    short: "HITL",
    label: "Human in the loop",
    body: "AI prepares or recommends, but a human must approve before consequential execution.",
  },
  hotl: {
    short: "HOTL",
    label: "Human on the loop",
    body: "AI operates inside defined boundaries. Humans monitor and intervene when needed.",
  },
  hovl: {
    short: "HOVL",
    label: "Human over the loop",
    body: "Humans set policy, authority, risk limits, and governance without reviewing routine transactions.",
  },
  "human-only": {
    short: "Human Only",
    label: "Human only",
    body: "The consequential judgment stays human-led. AI may support preparation but cannot own the decision.",
  },
  none: {
    short: "—",
    label: "No control point",
    body: "No consequential decision occurs at this step.",
  },
};

export const AUTONOMY_LEVELS: { level: AutonomyLevel; label: string }[] = [
  { level: 0, label: "Human executes" },
  { level: 1, label: "AI assists" },
  { level: 2, label: "AI recommends" },
  { level: 3, label: "AI executes after approval" },
  { level: 4, label: "AI executes; humans manage exceptions" },
  { level: 5, label: "Autonomous within defined policy boundaries" },
];

export const AUTONOMY_NOTE =
  "Higher autonomy is not inherently better. The right level depends on risk, consequence, reversibility, policy, evidence, and organisational trust. A compensation decision may correctly stay at Level 2 while a routine onboarding reminder operates at Level 5.";

export const AUTHORITY_NOTE =
  "Authority derives from policy, permissions, risk classification, transaction type, and governance — never from model confidence. A system can be highly confident about a termination recommendation and still hold zero authority to act on it.";

export const DOMAINS: { id: DomainId; label: string }[] = [
  { id: "talent-acquisition", label: "Talent Acquisition" },
  { id: "employee-lifecycle", label: "Employee Lifecycle" },
  { id: "hr-service-delivery", label: "HR Service Delivery" },
  { id: "payroll-time-benefits", label: "Payroll, Time & Benefits" },
  { id: "talent-development", label: "Talent & Development" },
  { id: "rewards", label: "Rewards" },
  { id: "workforce-planning", label: "Workforce Planning" },
  { id: "exit", label: "Exit" },
];

export const DOMAIN_LABEL = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.label])
) as Record<DomainId, string>;

export const RATING_ORDER: Rating[] = [
  "Medium",
  "Medium-High",
  "High",
  "Very High",
  "Extreme",
];

export const DECISION_FRAMEWORK: { step: string; question: string; yes: string; no: string }[] = [
  {
    step: "01",
    question: "Should the activity exist?",
    yes: "Continue to the next question.",
    no: "Eliminate it. Do not automate work that shouldn't happen.",
  },
  {
    step: "02",
    question: "Must the output be exactly reproducible from defined rules?",
    yes: "A deterministic system should own it.",
    no: "Continue.",
  },
  {
    step: "03",
    question:
      "Does it require consequential judgment, empathy, ethical accountability, negotiation, or sensitive discretion?",
    yes: "A human should own it.",
    no: "Continue.",
  },
  {
    step: "04",
    question:
      "Does it require interpretation, synthesis, personalisation, monitoring, or orchestration?",
    yes: "An AI agent is well suited to it.",
    no: "Re-examine whether the activity is necessary.",
  },
  {
    step: "05",
    question: "What authority should the agent hold?",
    yes: "Assist · Recommend · Execute after approval · Execute with exception management · Autonomous within policy.",
    no: "Set authority from risk and policy, not from confidence.",
  },
];

export const DESIGN_RULES: string[] = [
  "Don't automate work that shouldn't exist.",
  "Use AI for reasoning, not deterministic calculation.",
  "Keep authoritative transactions in authoritative systems.",
  "Human judgment should become more valuable, not merely more frequent.",
  "Autonomy must increase with evidence and trust.",
  "Every agent needs defined authority.",
  "Every consequential action needs an audit trail.",
  "Design the exception path before the happy path.",
  "Measure outcomes, not prompts or agent activity.",
  "The model should be replaceable. The business context should not be.",
];

export const METHODOLOGY_NOTE =
  "UnfoldHR's workflow design framework is informed by emerging research and practitioner thinking on agentic operating models, including PwC and AT&T's work on redesigning HR workflows before selecting technology. Workflow decomposition, classifications, control models, architecture views, and recommendations shown here represent UnfoldHR analysis.";

export const PRINCIPLE_LINES = [
  "AI reasons.",
  "Rules determine.",
  "Systems transact.",
  "Humans judge.",
];
