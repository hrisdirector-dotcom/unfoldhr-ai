import type { Workflow } from "./types";

export const REWARDS_WORKFLOWS: Workflow[] = [
  {
    id: "compensation-merit-cycle",
    number: 17,
    domain: "rewards",
    name: "Compensation / Merit Cycle",
    shortName: "Merit Cycle",
    outcome:
      "Allocate compensation fairly, competitively, consistently, and within budget.",
    description:
      "The merit cycle is a large volume of small, consequential decisions made by managers with uneven context. AI can make the context excellent. The decisions must stay human.",
    modelType: "reference",
    aiSuitability: "High",
    humanJudgment: "Very High",
    eliminationOpportunity: "High",
    risk: "Very High",
    implementationComplexity: "High",
    currentStateSummary:
      "Spreadsheets distributed, budget arithmetic done by hand, managers deciding with little market or equity context, and compensation teams reconciling and chasing.",
    currentStateSteps: [
      { id: "cs1", name: "Budget allocated and cascaded", friction: "value" },
      { id: "cs2", name: "Planning sheets distributed", friction: "manual" },
      { id: "cs3", name: "Manager gathers context ad hoc", friction: "manual" },
      { id: "cs4", name: "Allocations entered and re-checked", friction: "manual" },
      { id: "cs5", name: "Budget breaches corrected by hand", friction: "manual" },
      { id: "cs6", name: "Compensation team reviews for equity", friction: "value" },
      { id: "cs7", name: "Approvals chased up the hierarchy", friction: "coordination" },
      { id: "cs8", name: "Changes keyed into payroll", friction: "manual" },
      { id: "cs9", name: "Letters produced and distributed", friction: "manual" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Spreadsheet distribution, budget arithmetic, and approval chasing",
        description: "Manual planning mechanics around the actual decisions.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Budget arithmetic and version control are codified work performed by hand because planning happens outside the system of record. None of it is judgment.",
        dataRequired: [],
        systems: ["HCM", "Finance"],
        risks: ["Removing the manager's sense of ownership over the budget"],
        controls: ["Budget position shown live during planning"],
        metrics: ["Manager planning hours", "Version errors"],
      },
      {
        id: "fs2",
        name: "Calculate budget, eligibility, and range position",
        description:
          "Determine eligibility, budget pools, compa-ratio, and range constraints.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Budgets, eligibility, and range mechanics are codified and must be identical across the organisation.",
        whyNotAI: "Compensation arithmetic must be exact, reproducible, and auditable.",
        whyNotHuman: "Manual calculation is the main source of cycle errors and rework.",
        dataRequired: ["Budget pools", "Eligibility rules", "Salary structure", "Current pay"],
        systems: ["HCM", "Payroll", "Finance"],
        risks: ["Budget overrun discovered after approval"],
        controls: ["Hard budget enforcement; range breaches require an exception"],
        metrics: ["Budget adherence", "Correction volume"],
      },
      {
        id: "fs3",
        name: "Assemble decision context for each employee",
        description:
          "Bring together performance evidence, range position, time since last change, market context, and internal comparators.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Synthesising several context sources into a clear picture for each person is exactly where managers currently make decisions blind.",
        whyNotHuman: "No manager has time to assemble this properly for a whole team.",
        dataRequired: ["Performance record", "Pay history", "Market data", "Comparators"],
        systems: ["HCM", "Finance"],
        risks: ["Context framing that pushes toward a particular allocation"],
        controls: ["No suggested amount; context presented neutrally"],
        metrics: ["Manager decision time", "Decision quality review"],
      },
      {
        id: "fs4",
        name: "Detect pay-equity patterns and anomalies",
        description:
          "Surface unexplained differences and drift across groups and teams, before decisions are finalised.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Pattern detection across a population is analytical work that individuals cannot perform on their own team in isolation.",
        whyNotHuman: "Equity patterns are invisible from inside a single team.",
        dataRequired: ["Pay data", "Role and level", "Demographics for equity review"],
        systems: ["HCM", "Finance"],
        risks: ["Statistical patterns treated as conclusions about individuals"],
        controls: ["Patterns raised for human investigation; never auto-adjusted"],
        metrics: ["Unexplained pay gaps", "Equity review actions"],
      },
      {
        id: "fs5",
        name: "Decide each compensation allocation",
        description:
          "Managers make the calls, with compensation partners advising.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "Pay decisions are consequential, contestable, and carry legal and equity exposure. They must have a named human owner who can explain them.",
        whyNotAI:
          "A recommended number becomes the decision in practice. Compensation judgment must remain visibly human.",
        dataRequired: ["Decision context", "Budget", "Equity signals"],
        systems: ["HCM"],
        risks: ["Anchoring on any system-suggested figure"],
        controls: ["No suggested amounts; rationale recorded for every allocation"],
        metrics: ["Rationale completeness", "Equity outcomes"],
      },
      {
        id: "fs6",
        name: "Guide managers through the decision",
        description:
          "Explain policy, range mechanics, and the consequences of a proposed allocation in plain terms.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Explaining mechanics and consequences on demand is language work, and it is what compensation partners spend the cycle repeating.",
        whyNotHuman: "Compensation teams cannot be available to every manager continuously.",
        dataRequired: ["Policy", "Range mechanics", "Proposed allocation"],
        systems: ["HCM", "Policy / Knowledge"],
        risks: ["Guidance drifting into recommending an amount"],
        controls: ["Explanation only; consequences described, never a number proposed"],
        metrics: ["Manager confidence", "Policy query volume"],
      },
      {
        id: "fs7",
        name: "Review and approve exceptions",
        description:
          "Out-of-range, out-of-budget, and equity-flagged allocations reviewed by compensation governance.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Exceptions set precedent and carry the greatest equity risk in the cycle.",
        whyNotAI: "Precedent-setting decisions require accountable ownership.",
        dataRequired: ["Exception detail", "Equity position", "Precedent"],
        systems: ["HCM", "Finance"],
        risks: ["Exceptions accumulating into structural inequity"],
        controls: ["Governance review; exception patterns reported"],
        metrics: ["Exception rate", "Equity drift"],
      },
      {
        id: "fs8",
        name: "Execute changes and verify in payroll",
        description:
          "Apply approved changes with correct effective dates and confirm they landed.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Pay changes are authoritative, dated transactions requiring an audit trail.",
        whyNotAI: "Pay records must be transacted, not generated.",
        whyNotHuman: "Rekeying approved allocations is transfer cost and a common error source.",
        dataRequired: ["Approved allocations", "Effective dates"],
        systems: ["HCM", "Payroll"],
        risks: ["Wrong effective date creating retroactive corrections"],
        controls: ["Reconciliation against approvals before the pay run"],
        metrics: ["Execution accuracy", "Retroactive corrections"],
      },
      {
        id: "fs9",
        name: "Communicate the outcome",
        description:
          "Personalised statements explaining the change, and the manager conversation that should accompany it.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Producing a clear personalised statement is language work; the conversation around it remains the manager's.",
        whyNotHuman: "Manual letter production adds nothing and delays communication.",
        dataRequired: ["Approved change", "Total reward context"],
        systems: ["HCM", "Payroll"],
        risks: ["Employee learns of a pay decision from a document rather than their manager"],
        controls: ["Statement released only after the manager conversation is confirmed"],
        metrics: ["Communication timeliness", "Pay-related queries"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs4",
        name: "Every allocation is a human decision",
        proceedCondition:
          "Context and equity signals are delivered to the manager. Nothing allocates itself.",
        escalateCondition:
          "Out-of-range, out-of-budget, or equity-flagged proposals route to compensation governance before approval.",
        humanControl: "human-only",
        authorityBasis:
          "Compensation authority derives from delegation, budget, and equity policy. No degree of analytical confidence transfers it.",
      },
    ],
    aiShouldNot: [
      "Recommend or set an individual compensation amount",
      "Adjust pay to close a statistical gap without human review",
      "Determine eligibility outside the codified rules",
      "Release a pay decision before the manager has had the conversation",
    ],
    architectureSystems: ["HCM", "Payroll", "Finance", "Policy / Knowledge"],
    metrics: [
      { name: "Budget adherence", note: "Baseline required." },
      { name: "Manager planning hours", note: "Measure against your current process." },
      { name: "Unexplained pay gaps", note: "Baseline required — monitor continuously." },
      { name: "Exception rate", note: "Measure against your current process." },
      { name: "Retroactive corrections after the cycle", note: "Baseline required." },
    ],
    relatedAgents: [
      {
        page: "compensation-change-agent",
        name: "Compensation Change Agent",
        role: "See how an UnfoldHR agent could support control and readiness evaluation on individual compensation actions within this workflow — it does not decide amounts.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "The no-suggested-amount boundary and equity pattern detection role.",
      },
    ],
  },
];
