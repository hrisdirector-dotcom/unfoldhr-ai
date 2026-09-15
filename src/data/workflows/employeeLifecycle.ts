import type { Workflow } from "./types";

export const EMPLOYEE_LIFECYCLE_WORKFLOWS: Workflow[] = [
  {
    id: "preboarding-onboarding",
    number: 5,
    domain: "employee-lifecycle",
    name: "Preboarding & Onboarding",
    shortName: "Preboarding & Onboarding",
    outcome:
      "Move a new hire from accepted offer to productive employee with minimal administrative friction.",
    description:
      "Onboarding is mostly cross-functional coordination that the new hire should never see. The parts that matter — the manager relationship and early context — are the parts usually squeezed out by admin.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "Medium",
    eliminationOpportunity: "Very High",
    risk: "Medium",
    implementationComplexity: "High",
    currentStateSummary:
      "Forms, emails, tickets, and checklists spread across HR, IT, facilities, payroll, and the manager, with the same data collected several times and status chased by everyone.",
    currentStateSteps: [
      { id: "cs1", name: "New hire completes overlapping forms", friction: "manual" },
      { id: "cs2", name: "Background check initiated and tracked", friction: "wait" },
      { id: "cs3", name: "IT ticket raised for equipment", friction: "handoff" },
      { id: "cs4", name: "Identity and access requested separately", friction: "handoff" },
      { id: "cs5", name: "Payroll record set up from re-keyed data", friction: "manual" },
      { id: "cs6", name: "Benefits enrolment communicated separately", friction: "handoff" },
      { id: "cs7", name: "HR chases outstanding tasks", friction: "coordination" },
      { id: "cs8", name: "Manager assembles their own plan", friction: "manual" },
      { id: "cs9", name: "Orientation delivered", friction: "value" },
      { id: "cs10", name: "Day-one issues resolved reactively", friction: "coordination" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Duplicate data collection and status chasing",
        description:
          "Asking the new hire for the same information more than once, and chasing functions for completion.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Duplicate collection exists because systems do not share a record. Chasing exists because completion state is invisible. Neither creates value.",
        dataRequired: [],
        systems: ["HCM", "Identity"],
        risks: ["Removing visibility without replacing it with monitored state"],
        controls: ["Single collection point; completion state monitored centrally"],
        metrics: ["New-hire effort", "HR coordination hours"],
      },
      {
        id: "fs2",
        name: "Orchestrate the preboarding plan",
        description:
          "Sequence every dependency across HR, IT, payroll, benefits, and the manager against the start date.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Coordinating many dependencies across functions and dates, and adapting when one slips, is orchestration work.",
        whyNotHuman: "Manual checklist coordination is where start dates quietly fail.",
        dataRequired: ["Start date", "Role requirements", "Location", "Dependency model"],
        systems: ["HCM", "Identity", "Case Management"],
        risks: ["A dependency slips unnoticed until day one"],
        controls: ["Escalation to a human owner before the start date is at risk"],
        metrics: ["Day-one readiness", "Escalations before start"],
      },
      {
        id: "fs3",
        name: "Execute identity, payroll, and access provisioning",
        description:
          "Create the worker record, identity, payroll setup, and role-based access.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Provisioning follows defined role-based rules and must be exact, reproducible, and auditable.",
        whyNotAI: "Access rights must never be inferred.",
        whyNotHuman: "Manual provisioning is slow and a recurring source of access errors.",
        dataRequired: ["Worker record", "Role-based access model", "Pay details"],
        systems: ["HCM", "Identity", "Payroll"],
        risks: ["Over-provisioned access"],
        controls: ["Least-privilege role templates; access reviewed at grant"],
        metrics: ["Provisioning accuracy", "Access exceptions"],
      },
      {
        id: "fs4",
        name: "Determine benefits eligibility and enrolment windows",
        description: "Apply plan rules to produce eligibility and deadlines.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Eligibility and enrolment windows are codified and carry legal deadlines.",
        whyNotAI: "Coverage eligibility cannot rest on a generated answer.",
        whyNotHuman: "Manual eligibility handling causes missed windows.",
        dataRequired: ["Plan rules", "Hire date", "Work pattern"],
        systems: ["Benefits", "HCM", "Payroll"],
        risks: ["Missed enrolment window"],
        controls: ["Deadline enforcement with proactive reminders"],
        metrics: ["Enrolment completion", "Late enrolment exceptions"],
      },
      {
        id: "fs5",
        name: "Guide and answer the new hire",
        description:
          "Personalised explanation of documents, choices, logistics, and role-specific learning, on demand.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "New hires ask context-specific questions continuously. Answering them personally, immediately, and consistently is language and retrieval work.",
        whyNotHuman: "An HR team cannot be available for every new hire's every question.",
        dataRequired: ["Onboarding state", "Policy library", "Role learning path"],
        systems: ["Policy / Knowledge", "LMS", "HCM"],
        risks: ["Answering an employment-terms question incorrectly"],
        controls: ["Contractual questions route to a human owner"],
        metrics: ["New-hire effort", "Question volume to HR"],
      },
      {
        id: "fs6",
        name: "Build the manager relationship and role context",
        description:
          "Expectation setting, team integration, early coaching, and the first real work.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Belonging, expectations, and early coaching are relational. They are also the strongest predictor of whether onboarding worked.",
        whyNotAI:
          "Integration into a team is a human relationship, not a content delivery problem.",
        dataRequired: ["Role expectations", "Team context"],
        systems: ["HCM"],
        risks: ["Manager time crowded out by administration"],
        controls: ["Administrative load removed from the manager deliberately"],
        metrics: ["Time to productivity", "New-hire retention at 90 days"],
      },
      {
        id: "fs7",
        name: "Verify readiness before day one",
        description:
          "Reconcile every dependency and surface anything that will not be ready.",
        classification: "deterministic",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Readiness is a defined check across system states, not a judgment.",
        whyNotAI: "Readiness must be read from the records, not asserted.",
        whyNotHuman: "Manual pre-start checking is duplicate verification.",
        dataRequired: ["Dependency states", "Start date"],
        systems: ["HCM", "Identity", "Payroll", "Benefits"],
        risks: ["Employee starts without pay setup or access"],
        controls: ["Named owner alerted on any unmet dependency"],
        metrics: ["Day-one readiness rate", "First-week incidents"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs3",
        name: "Background and eligibility clearance",
        proceedCondition:
          "Cleared checks and confirmed right to work allow provisioning and the start to proceed.",
        escalateCondition:
          "Adverse or incomplete checks hold the start date and route to an HR owner — never an automated withdrawal.",
        humanControl: "hitl",
        authorityBasis:
          "Employment eligibility decisions are human decisions governed by policy and law.",
      },
    ],
    aiShouldNot: [
      "Grant or infer system access rights",
      "Withdraw or delay an offer based on check results",
      "Answer contractual employment-terms questions definitively",
      "Set payroll or benefits values",
    ],
    architectureSystems: ["HCM", "Identity", "Payroll", "Benefits", "LMS", "Case Management", "Policy / Knowledge"],
    metrics: [
      { name: "Day-one readiness rate", note: "Baseline required." },
      { name: "New-hire administrative effort", note: "Measure against your current process." },
      { name: "HR coordination hours per hire", note: "Calculated from your current process model." },
      { name: "Time to productivity", note: "Baseline required." },
      { name: "90-day retention", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "global-lifecycle-agent",
        name: "Global Lifecycle Agent",
        role: "Evaluates whether a new-hire event is ready to progress, blocked, or held — one control participant within this workflow.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Elimination of duplicate collection and status chasing.",
      },
    ],
  },

  {
    id: "job-location-manager-change",
    number: 6,
    domain: "employee-lifecycle",
    name: "Employee Job / Location / Manager Change",
    shortName: "Lifecycle Change",
    outcome:
      "Execute an employee lifecycle change correctly across every downstream system.",
    description:
      "Promotions, transfers, location and manager changes look like a single event and behave like a dozen. The failure mode is rarely the decision; it is the downstream consequences nobody enumerated.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "Medium-High",
    eliminationOpportunity: "Very High",
    risk: "High",
    implementationComplexity: "High",
    currentStateSummary:
      "A change request is raised, approvals routed, and each downstream consequence — pay, tax, access, benefits, reporting lines, schedules — handled separately and discovered late.",
    currentStateSteps: [
      { id: "cs1", name: "Manager raises a change request", friction: "value" },
      { id: "cs2", name: "HRBP clarifies missing detail", friction: "wait" },
      { id: "cs3", name: "Compensation implications checked manually", friction: "manual" },
      { id: "cs4", name: "Approvals routed and chased", friction: "coordination" },
      { id: "cs5", name: "HCM record updated", friction: "value" },
      { id: "cs6", name: "Payroll and tax changes handled separately", friction: "handoff" },
      { id: "cs7", name: "Access and systems updated by ticket", friction: "handoff" },
      { id: "cs8", name: "Benefits and schedule impacts discovered later", friction: "coordination" },
      { id: "cs9", name: "Corrections raised after the effective date", friction: "manual" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual downstream discovery and correction",
        description:
          "Finding out after the effective date which systems and entitlements the change affected.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Late discovery is a symptom of fragmented execution. Correcting after the fact costs far more than sequencing correctly up front.",
        dataRequired: [],
        systems: ["HCM", "Payroll"],
        risks: ["Removing manual checks without a reliable impact model"],
        controls: ["Impact model maintained and versioned"],
        metrics: ["Post-effective-date corrections"],
      },
      {
        id: "fs2",
        name: "Understand the requested change and its scope",
        description:
          "Interpret what is actually changing — job, level, manager, location, entity, pay — and what is not.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Requests arrive as prose and often bundle several changes together. Separating them is interpretation work.",
        whyNotHuman: "Repeated clarification cycles are the main source of delay.",
        dataRequired: ["Request text", "Current worker record"],
        systems: ["HCM"],
        risks: ["A coupled change treated as a simple one"],
        controls: ["Coupled changes flagged explicitly for review"],
        metrics: ["Clarification cycles per change"],
      },
      {
        id: "fs3",
        name: "Identify downstream impacts and missing information",
        description:
          "Enumerate every consequence — tax, benefits eligibility, schedule, access, reporting lines, approvals — and what is not yet known.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Reasoning across a change's consequences in several domains at once is exactly where a system outperforms an individual's recall.",
        whyNotHuman:
          "No single person reliably holds the full downstream map for every change type and jurisdiction.",
        dataRequired: ["Change scope", "Jurisdiction rules", "Benefits and pay rules", "Access model"],
        systems: ["HCM", "Payroll", "Benefits", "Identity", "WFM"],
        risks: ["An impact missed in a cross-border change"],
        controls: ["Impact model reviewed by HR operations; unknowns block release"],
        metrics: ["Missed impact rate", "Correction volume"],
      },
      {
        id: "fs4",
        name: "Validate authority, effective dating, and payroll windows",
        description:
          "Check who may approve, whether the effective date is valid, and whether the change falls inside a payroll lock window.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Authority matrices, effective-dating rules, and payroll calendars are codified constraints.",
        whyNotAI: "Calendar and authority constraints must be evaluated, not inferred.",
        whyNotHuman: "Manual checking of cut-off calendars is duplicate verification.",
        dataRequired: ["Authority matrix", "Payroll calendar", "Proposed effective date"],
        systems: ["HCM", "Payroll", "Finance"],
        risks: ["Retroactive pay corrections caused by a late change"],
        controls: ["Changes inside a lock window are held, not forced through"],
        metrics: ["Retroactive correction rate"],
      },
      {
        id: "fs5",
        name: "Approve material change and any compensation impact",
        description:
          "A named approver accepts the change, its cost, and its structural consequences.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "Changes to a person's job, pay, or reporting line are consequential employment decisions with cost and equity implications.",
        whyNotAI: "No model holds authority over a person's role or pay.",
        dataRequired: ["Impact summary", "Cost", "Equity position"],
        systems: ["HCM", "Finance"],
        risks: ["Approval given without the full impact picture"],
        controls: ["Approval packet must include the enumerated impacts"],
        metrics: ["Approval quality", "Post-approval reversals"],
      },
      {
        id: "fs6",
        name: "Execute the change across systems of record",
        description:
          "Apply the change in the correct sequence with correct effective dates.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "These are authoritative, dated transactions that must be exact and sequenced.",
        whyNotAI: "Systems of record must be written by transactional processes.",
        whyNotHuman: "Rekeying the same change into several systems is transfer cost.",
        dataRequired: ["Approved change", "Sequencing rules", "Effective dates"],
        systems: ["HCM", "Payroll", "Benefits", "Identity", "WFM"],
        risks: ["Partial execution leaving records inconsistent"],
        controls: ["Sequenced execution with rollback on failure"],
        metrics: ["Execution accuracy", "Partial failure rate"],
      },
      {
        id: "fs7",
        name: "Communicate to employee and manager",
        description:
          "Explain what changes, when, and what it means for pay, benefits, and access.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Personalised explanation of consequences is language work and prevents a wave of follow-up questions.",
        whyNotHuman: "Repeated explanation of standard consequences is not judgment work.",
        dataRequired: ["Executed change", "Impact summary"],
        systems: ["HCM", "Case Management"],
        risks: ["Communicating a change before it is approved"],
        controls: ["Communication triggered only by confirmed execution"],
        metrics: ["Follow-up question volume"],
      },
      {
        id: "fs8",
        name: "Verify across every affected system",
        description:
          "Reconcile the executed change against pay, benefits, access, and org state.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification: "Verification is a defined reconciliation of system state.",
        whyNotAI: "Reconciliation must be read, not inferred.",
        whyNotHuman: "Manual cross-system checking is exactly the coordination to remove.",
        dataRequired: ["Expected end state", "Actual system state"],
        systems: ["HCM", "Payroll", "Benefits", "Identity"],
        risks: ["A silent failure surfaces in the employee's pay"],
        controls: ["Automated reconciliation with exception reporting"],
        metrics: ["Exception rate", "Employee-reported errors"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs4",
        name: "Ready, approval required, or held?",
        proceedCondition:
          "Complete information, valid effective date, no pay impact beyond policy — proceeds to the standard approval.",
        escalateCondition:
          "Missing information, threshold-crossing pay change, coupled changes, or a payroll lock window — held for human control review.",
        humanControl: "hitl",
        authorityBasis:
          "Authority derives from the delegation matrix, payroll calendar, and change risk class — not from the completeness of the analysis.",
      },
    ],
    aiShouldNot: [
      "Approve a job, pay, or reporting-line change",
      "Write directly to systems of record without an approval reference",
      "Force a change through a payroll lock window",
      "Communicate a change that has not been executed",
    ],
    architectureSystems: ["HCM", "Payroll", "Benefits", "Identity", "WFM", "Finance"],
    metrics: [
      { name: "Post-effective-date corrections", note: "Baseline required." },
      { name: "Retroactive pay adjustments", note: "Measure against your current process." },
      { name: "Change cycle time", note: "Baseline required." },
      { name: "Downstream impacts missed", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "global-lifecycle-agent",
        name: "Global Lifecycle Agent",
        role: "See how an UnfoldHR agent could support readiness evaluation and release control within this workflow — it participates in the control step, it does not own the operating model.",
      },
      {
        page: "compensation-change-agent",
        name: "Compensation Change Agent",
        role: "Supports control evaluation where the change carries a compensation component.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Downstream impact enumeration and the control gate on payroll windows.",
      },
    ],
  },
];
