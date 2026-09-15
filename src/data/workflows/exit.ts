import type { Workflow } from "./types";

export const EXIT_WORKFLOWS: Workflow[] = [
  {
    id: "offboarding-final-close",
    number: 20,
    domain: "exit",
    name: "Offboarding — Resignation / Termination to Final Close",
    shortName: "Offboarding",
    outcome:
      "Separate the worker securely, respectfully, compliantly, and accurately.",
    description:
      "Offboarding is where fragmentation is most expensive: access left open, final pay wrong, assets unreturned, and a person's last experience of the organisation defined by administration.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "High",
    eliminationOpportunity: "Very High",
    risk: "Very High",
    implementationComplexity: "High",
    currentStateSummary:
      "A leaving date triggers a scatter of emails and tickets across HR, IT, payroll, benefits, facilities, and the manager, each tracked separately and chased individually.",
    currentStateSteps: [
      { id: "cs1", name: "Departure notified to HR", friction: "value" },
      { id: "cs2", name: "HR notifies each function by email", friction: "handoff" },
      { id: "cs3", name: "IT ticket raised for access removal", friction: "handoff" },
      { id: "cs4", name: "Final pay calculated with manual inputs", friction: "manual" },
      { id: "cs5", name: "Benefits termination handled separately", friction: "handoff" },
      { id: "cs6", name: "Asset return chased by the manager", friction: "coordination" },
      { id: "cs7", name: "Knowledge transfer arranged informally", friction: "coordination" },
      { id: "cs8", name: "Exit interview held, if capacity allows", friction: "value" },
      { id: "cs9", name: "Completion confirmed by chasing each function", friction: "coordination" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Cross-functional chasing and status coordination",
        description:
          "Notifying each function separately and following up until everything is done.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Chasing exists because completion state is spread across functions. It is the reason access stays open and assets go missing.",
        dataRequired: [],
        systems: ["HCM", "Identity"],
        risks: ["Losing accountability if no single owner replaces the chasing"],
        controls: ["Single orchestrated checklist with a named HR owner"],
        metrics: ["HR coordination hours", "Open items after last day"],
      },
      {
        id: "fs2",
        name: "Decide the separation",
        description:
          "Any decision to terminate employment, and the terms of it.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "Ending someone's employment is the most consequential decision in the employment relationship. It requires human judgment, fair process, and accountability.",
        whyNotAI:
          "No model may decide, recommend, or trigger a termination, regardless of the evidence or confidence behind it.",
        dataRequired: ["Case file", "Policy", "Legal position"],
        systems: ["HCM", "Case Management"],
        risks: ["Unfair dismissal exposure"],
        controls: ["Named decision-maker; legal review; documented process"],
        metrics: ["Claim rate", "Process compliance"],
      },
      {
        id: "fs3",
        name: "Hold the separation conversation",
        description: "The conversation with the employee, handled with care.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "This is a moment of significant personal consequence. It demands empathy and accountable human presence.",
        whyNotAI: "A person must hear this from a person.",
        dataRequired: ["Decision", "Support arrangements"],
        systems: ["Case Management"],
        risks: ["Employee learns of the decision from a system action"],
        controls: ["All system actions sequenced after the conversation"],
        metrics: ["Sequencing incidents", "Employee experience"],
      },
      {
        id: "fs4",
        name: "Orchestrate the separation checklist",
        description:
          "Sequence every dependency across payroll, benefits, access, assets, and knowledge transfer against the last working day.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Coordinating many dependencies across functions against a fixed date, and reacting when one slips, is orchestration.",
        whyNotHuman: "Manual coordination is precisely what leaves access open and pay wrong.",
        dataRequired: ["Last working day", "Role and access profile", "Asset register"],
        systems: ["HCM", "Identity", "Case Management"],
        risks: ["An item missed on a sensitive or high-risk exit"],
        controls: ["High-risk exits routed to a named HR and security owner"],
        metrics: ["Checklist completion by last day", "Open items after exit"],
      },
      {
        id: "fs5",
        name: "Execute access removal, final pay triggers, and benefit termination",
        description:
          "Remove access, trigger final pay processing, and terminate coverage on the correct dates.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "These are dated, authoritative, security-critical transactions that must be exact and auditable.",
        whyNotAI: "Access and pay actions must never be inferred.",
        whyNotHuman: "Manual removal is slow and is how accounts stay live for months.",
        dataRequired: ["Termination record", "Access inventory", "Pay and benefit rules"],
        systems: ["Identity", "Payroll", "Benefits", "HCM"],
        risks: ["Access remaining active after departure", "Final pay incorrect"],
        controls: ["Timed execution tied to the termination record; verification required"],
        metrics: ["Access removal timeliness", "Final pay accuracy"],
      },
      {
        id: "fs6",
        name: "Explain obligations, options, and next steps",
        description:
          "Personalised explanation of final pay, coverage continuation, equity treatment, and any ongoing obligations.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Leavers need clear, personalised explanation at a moment when generic documents fail them completely.",
        whyNotHuman: "HR rarely has capacity to explain this properly to every leaver.",
        dataRequired: ["Final pay detail", "Coverage options", "Equity and obligations"],
        systems: ["Payroll", "Benefits", "HCM"],
        risks: ["Explaining terms incorrectly at a legally sensitive moment"],
        controls: ["Explanations bounded by the executed terms; disputes route to a human"],
        metrics: ["Post-exit queries", "Correction rate"],
      },
      {
        id: "fs7",
        name: "Handle sensitive exits and disputes",
        description:
          "Employee relations context, settlement discussions, grievances, and anything contested.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Contested exits carry legal exposure and require discretion and accountable ownership.",
        whyNotAI: "Settlement and dispute handling is a human negotiation with legal consequence.",
        dataRequired: ["Case file", "Legal position"],
        systems: ["Case Management", "HCM"],
        risks: ["Inconsistent handling of comparable exits"],
        controls: ["Legal involvement; documented rationale"],
        metrics: ["Claim rate", "Settlement consistency"],
      },
      {
        id: "fs8",
        name: "Monitor completion and verify final close",
        description:
          "Confirm access removed, assets returned, final pay correct, and records closed.",
        classification: "deterministic",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Final close is a defined reconciliation across security, payroll, and asset records.",
        whyNotAI: "Closure must be verified against records, not asserted.",
        whyNotHuman: "Manual completion chasing is the work being removed.",
        dataRequired: ["Checklist state", "Access state", "Asset register", "Final pay result"],
        systems: ["Identity", "Payroll", "HCM", "Finance"],
        risks: ["Exit recorded as complete with access still live"],
        controls: ["Closure blocked until every critical item is confirmed"],
        metrics: ["Access exceptions after exit", "Asset recovery rate", "Days to final close"],
      },
      {
        id: "fs9",
        name: "Capture and act on exit insight",
        description:
          "Gather departure reasons and surface patterns worth acting on.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Synthesising themes across many exit conversations is analysis that individual interviews never produce.",
        whyNotHuman: "Individual exit interviews rarely aggregate into anything actionable.",
        dataRequired: ["Exit responses", "Tenure and role data"],
        systems: ["HCM", "Case Management"],
        risks: ["Attribution of comments to identifiable individuals"],
        controls: ["Aggregate reporting with minimum group sizes"],
        metrics: ["Regretted attrition drivers", "Action taken on themes"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs3",
        name: "Conversation before any system action",
        proceedCondition:
          "Once the conversation has happened and the date is confirmed, orchestration and execution proceed.",
        escalateCondition:
          "High-risk, contested, or security-sensitive exits route to named HR, legal, and security owners before anything executes.",
        humanControl: "hitl",
        authorityBasis:
          "Employment law and security policy set the sequence. No system action may precede the human conversation.",
      },
    ],
    aiShouldNot: [
      "Decide, recommend, or trigger a termination",
      "Hold the separation conversation",
      "Remove access or trigger final pay before the decision and conversation are confirmed",
      "Negotiate settlement terms",
      "Attribute exit feedback to identifiable individuals",
    ],
    architectureSystems: [
      "HCM",
      "Identity",
      "Payroll",
      "Benefits",
      "Finance",
      "Case Management",
    ],
    metrics: [
      { name: "Access removal timeliness", note: "Baseline required." },
      { name: "Final pay accuracy", note: "Measure against your current process." },
      { name: "Asset recovery rate", note: "Baseline required." },
      { name: "Days to final close", note: "Measure against your current process." },
      { name: "HR coordination hours per exit", note: "Calculated from your current process model." },
    ],
    relatedAgents: [
      {
        page: "global-lifecycle-agent",
        name: "Global Lifecycle Agent",
        role: "See how an UnfoldHR agent could support readiness evaluation and release control on a termination event within this workflow — the decision and the conversation remain human.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "The conversation-before-execution sequencing control.",
      },
    ],
  },
];
