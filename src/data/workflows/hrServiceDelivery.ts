import type { Workflow } from "./types";

export const HR_SERVICE_DELIVERY_WORKFLOWS: Workflow[] = [
  {
    id: "employee-inquiry-case-resolution",
    number: 7,
    domain: "hr-service-delivery",
    name: "Employee HR Inquiry & Case Resolution",
    shortName: "Inquiry to Resolution",
    outcome:
      "Resolve employee questions accurately at the lowest appropriate level of effort.",
    description:
      "Most HR service volume is not complex. It is repetitive interpretation of policy against one employee's circumstances, followed by routing, status checking, and re-explaining. Very little of that coordination needs to exist.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "Medium",
    eliminationOpportunity: "Very High",
    risk: "Medium",
    implementationComplexity: "Medium",
    currentStateSummary:
      "An employee searches a portal, fails to find a personalised answer, raises a ticket, waits, is routed between tiers, and follows up for status.",
    currentStateSteps: [
      { id: "cs1", name: "Employee searches the policy portal", friction: "manual" },
      { id: "cs2", name: "Employee raises a ticket describing the issue", friction: "value" },
      { id: "cs3", name: "Tier 1 triages and categorises", friction: "manual" },
      { id: "cs4", name: "Ticket routed to the specialist team", friction: "handoff" },
      { id: "cs5", name: "Specialist re-reads the case from scratch", friction: "manual" },
      { id: "cs6", name: "Specialist requests missing information", friction: "wait" },
      { id: "cs7", name: "Employee chases for status", friction: "coordination" },
      { id: "cs8", name: "Specialist answers and closes the case", friction: "value" },
      { id: "cs9", name: "Downstream transaction raised separately", friction: "handoff" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Portal searching by the employee",
        description:
          "The employee should not have to locate, read, and interpret policy written for a general population.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Self-service search exists because policy could not previously be applied to one person's circumstances on demand. It transfers interpretation effort to the least-informed party.",
        dataRequired: [],
        systems: ["Policy / Knowledge"],
        risks: ["Employees act on a policy that does not apply to them"],
        controls: ["Answers are generated against the employee's own record and policy version"],
        metrics: ["Employee effort", "Self-service abandonment"],
      },
      {
        id: "fs2",
        name: "Ticket triage, categorisation, and tier routing",
        description:
          "Manual routing between service tiers exists because of team structure, not because of employee need.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Routing is coordination created by organisational design. Where a case does need a specialist, that should be a classification of the case, not a queue of human handoffs.",
        dataRequired: [],
        systems: ["Case Management"],
        risks: ["Sensitive cases mis-routed"],
        controls: ["Sensitive categories route directly to a named human owner"],
        metrics: ["Handoffs per case", "Time to first substantive response"],
      },
      {
        id: "fs3",
        name: "Understand the employee's actual question",
        description:
          "Interpret a free-text description, identify the underlying need, and detect sensitivity or distress.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Employees describe situations, not policy categories. Interpreting intent from unstructured language is exactly what language models are suited to.",
        whyNotHuman:
          "Reading and categorising a routine question adds no judgment; it only adds delay.",
        dataRequired: ["Employee message", "Worker profile", "Case history"],
        systems: ["Case Management", "HCM"],
        risks: ["Misreading a sensitive or safeguarding concern as routine"],
        controls: ["Sensitivity detection escalates immediately to a human owner"],
        metrics: ["Intent accuracy", "Escalation appropriateness"],
      },
      {
        id: "fs4",
        name: "Assemble personalised policy and worker context",
        description:
          "Retrieve the policy version, jurisdiction, entitlement balances, and history that apply to this specific worker.",
        classification: "agent",
        humanControl: "hovl",
        autonomyLevel: 4,
        whyClassification:
          "Assembling and reconciling context across policy, jurisdiction, and worker data is synthesis work across unstructured and structured sources.",
        whyNotHuman:
          "Gathering context is preparation, not judgment. It is the largest single cost in a typical case.",
        dataRequired: ["Policy library", "Jurisdiction", "Worker record", "Entitlement balances"],
        systems: ["Policy / Knowledge", "HCM", "Benefits"],
        risks: ["Superseded policy version applied"],
        controls: ["Policy retrieval is version-pinned and cited in the response"],
        metrics: ["Answer accuracy", "Policy citation coverage"],
      },
      {
        id: "fs5",
        name: "Determine entitlement where rules are codified",
        description:
          "Balances, eligibility windows, and threshold rules are calculated by the system of record, not inferred.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Entitlement is determined from codified rules and authoritative worker data. The same inputs must always produce the same result.",
        whyNotAI:
          "A generated answer is not reproducible or auditable. Entitlement figures must come from the system that owns them.",
        whyNotHuman: "Manual balance lookups are rekeying, not service.",
        dataRequired: ["Accrual rules", "Service dates", "Balances"],
        systems: ["HCM", "Payroll", "Benefits"],
        risks: ["Incorrect entitlement communicated to an employee"],
        controls: ["Figures sourced only from the system of record"],
        metrics: ["Correction rate", "Rework"],
      },
      {
        id: "fs6",
        name: "Answer, and act where the case is routine",
        description:
          "Give a personalised, cited answer and initiate the associated transaction where the case is routine and within policy.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Personalising an explanation and orchestrating the follow-on transaction is reasoning and coordination work.",
        whyNotHuman:
          "Re-typing a standard explanation for the hundredth time is not a use of HR expertise.",
        dataRequired: ["Assembled context", "Entitlement result", "Transaction templates"],
        systems: ["Case Management", "HCM"],
        risks: ["An answer implies a commitment the organisation has not made"],
        controls: ["Response scope limited to published policy; no discretionary commitments"],
        metrics: ["First-contact resolution", "Employee effort"],
      },
      {
        id: "fs7",
        name: "Handle sensitive, disputed, or ambiguous cases",
        description:
          "Employee relations concerns, disputed policy interpretation, hardship, and anything requiring discretion.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "These cases involve discretion, empathy, and accountability. The employee also has a legitimate expectation of reaching a person.",
        whyNotAI:
          "Discretion and duty of care cannot be delegated to a system that holds no accountability for the outcome.",
        dataRequired: ["Case history", "Prepared chronology", "Applicable policy"],
        systems: ["Case Management", "Policy / Knowledge"],
        risks: ["Sensitive matters handled inconsistently"],
        controls: ["Named human owner; documented rationale"],
        metrics: ["Escalation quality", "Employee experience"],
      },
      {
        id: "fs8",
        name: "Verify the outcome and close the loop",
        description:
          "Confirm the downstream transaction completed, and detect cases that reopen or recur.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Verification is a defined check against system state. It either completed or it did not.",
        whyNotAI: "Confirmation of record state must be read, not inferred.",
        whyNotHuman: "Status checking is the clearest example of work that should not exist.",
        dataRequired: ["Transaction status", "Case state"],
        systems: ["Case Management", "HCM"],
        risks: ["Case closed without the underlying change being made"],
        controls: ["Closure blocked until the downstream record is confirmed"],
        metrics: ["Reopen rate", "Exception rate"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs5",
        name: "Routine or sensitive?",
        proceedCondition:
          "Routine, within published policy, no dispute, no sensitivity indicators — the agent answers and acts.",
        escalateCondition:
          "Sensitivity, dispute, hardship, ambiguity, or anything requiring discretion — a named HR owner takes the case.",
        humanControl: "hotl",
        authorityBasis:
          "Case risk classification and published policy scope determine whether the agent may act, not how confident the model is.",
      },
    ],
    aiShouldNot: [
      "Make discretionary exceptions to policy",
      "Handle employee relations allegations or safeguarding concerns",
      "State entitlement figures it has generated rather than retrieved",
      "Close a case that involves an unresolved dispute",
    ],
    architectureSystems: ["Case Management", "HCM", "Policy / Knowledge", "Benefits", "Payroll"],
    metrics: [
      { name: "First-contact resolution", note: "Measure against your current process." },
      { name: "Employee effort per query", note: "Baseline required." },
      { name: "Handoffs per case", note: "Calculated from your current routing model." },
      { name: "Time to resolution", note: "Baseline required." },
      { name: "Reopen rate", note: "Measure against your current process." },
    ],
    relatedAgents: [],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Step classifications, control gate placement, and elimination judgments.",
      },
    ],
  },

  /* ============================================================
   * FLAGSHIP — Leave of Absence
   * ============================================================ */
  {
    id: "leave-of-absence",
    number: 8,
    domain: "hr-service-delivery",
    name: "Leave of Absence — Request to Return",
    shortName: "Leave of Absence",
    outcome:
      "Give an eligible employee the correct leave, pay, benefits, and return-to-work treatment while maintaining compliance and minimising employee effort.",
    description:
      "Leave is the clearest example of a process where almost all of the effort is coordination rather than judgment. An employee in a difficult personal moment is asked to become an expert in policy, chase documents, and re-explain their situation to several teams. The judgment that genuinely matters — ambiguous eligibility, accommodation, conflicting documentation — is a small fraction of the work and is often the part that gets least attention.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "High",
    eliminationOpportunity: "Very High",
    risk: "Very High",
    implementationComplexity: "High",
    currentStateSummary:
      "The employee drives the process. Each function operates a tollbooth: HR, leave administration, payroll, benefits, and the manager each hold a piece, and the employee carries information between them.",
    currentStateSteps: [
      { id: "cs1", name: "Employee searches policy to work out what they may be entitled to", friction: "manual" },
      { id: "cs2", name: "Employee emails HR describing the situation", friction: "value" },
      { id: "cs3", name: "HR asks clarifying questions over several exchanges", friction: "wait" },
      { id: "cs4", name: "HR identifies possible leave programmes manually", friction: "manual" },
      { id: "cs5", name: "HR emails a documentation request", friction: "manual" },
      { id: "cs6", name: "Employee obtains and returns documentation", friction: "value" },
      { id: "cs7", name: "HR chases missing documents", friction: "coordination" },
      { id: "cs8", name: "Leave administrator checks eligibility by hand", friction: "manual" },
      { id: "cs9", name: "Case handed to payroll for pay treatment", friction: "handoff" },
      { id: "cs10", name: "Case handed to benefits for coverage treatment", friction: "handoff" },
      { id: "cs11", name: "Manager notified separately and asks for details", friction: "coordination" },
      { id: "cs12", name: "Employee chases status during the leave", friction: "coordination" },
      { id: "cs13", name: "Deadlines and extensions tracked on a spreadsheet", friction: "manual" },
      { id: "cs14", name: "Return date coordinated over email between four parties", friction: "coordination" },
      { id: "cs15", name: "Return processed in each system separately", friction: "handoff" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Employee researching policy",
        description:
          "The employee should describe their circumstances, not diagnose their own leave entitlement.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "This activity exists because policy could not previously be applied to an individual's situation on demand. It places the heaviest interpretive burden on the person least equipped and often least able to carry it.",
        dataRequired: [],
        systems: ["Policy / Knowledge"],
        risks: ["Employee misses an entitlement they qualified for"],
        controls: ["All potentially applicable programmes surfaced from the worker's own context"],
        metrics: ["Employee effort", "Missed entitlement rate"],
      },
      {
        id: "fs2",
        name: "Manual document chasing and routine status email",
        description:
          "Reminder emails, status updates, and cross-team notification are coordination artefacts.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Chasing and status reporting exist only because state is fragmented across systems and teams. When state is visible and monitored, the work disappears rather than being automated.",
        dataRequired: [],
        systems: ["Case Management"],
        risks: ["Employee feels abandoned if replaced with silence rather than proactive updates"],
        controls: ["Proactive status is pushed, not requested"],
        metrics: ["Status enquiries received", "HR touches per case"],
      },
      {
        id: "fs3",
        name: "Understand the employee's circumstance",
        description:
          "Interpret a natural-language description of a personal situation, identify what is actually being asked, and detect sensitivity.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Interpreting an employee's description of their circumstances requires understanding intent, context, and potentially ambiguous or incomplete information. This is reasoning, not lookup.",
        whyNotHuman:
          "The initial interpretation adds no discretion. Requiring a specialist for it is what creates the queue.",
        dataRequired: ["Employee description", "Worker profile", "Prior leave history"],
        systems: ["HCM", "Case Management"],
        risks: [
          "A medical or safeguarding sensitivity is treated as an administrative request",
          "Inferring health information beyond what the employee disclosed",
        ],
        controls: [
          "Sensitive categories flagged for human ownership from the outset",
          "No inference of diagnosis or protected characteristics",
        ],
        metrics: ["Intake accuracy", "Employee effort"],
      },
      {
        id: "fs4",
        name: "Assemble worker and policy context",
        description:
          "Bring together tenure, jurisdiction, work pattern, prior leave usage, applicable statutory and company programmes, and any bargaining agreement terms.",
        classification: "agent",
        humanControl: "hovl",
        autonomyLevel: 4,
        whyClassification:
          "Leave context spans several systems and several policy documents at once, in versions that vary by jurisdiction. Assembling and reconciling it is synthesis work.",
        whyNotHuman:
          "Context assembly is the single largest manual cost in the current process and involves no judgment.",
        dataRequired: [
          "Tenure and service dates",
          "Work location and jurisdiction",
          "Scheduled hours and work pattern",
          "Prior leave usage",
          "Policy and statutory programme library",
        ],
        systems: ["HCM", "WFM", "Policy / Knowledge", "Benefits"],
        risks: ["Wrong jurisdiction's rules applied to a mobile or remote worker"],
        controls: ["Jurisdiction resolved from the authoritative work location record"],
        metrics: ["Context completeness", "Correction rate"],
      },
      {
        id: "fs5",
        name: "Identify candidate leave programmes",
        description:
          "Surface every programme the circumstance could plausibly touch, including concurrent and stacked entitlements.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Identifying which programmes might apply — and how they may run concurrently — requires interpretation across overlapping statutory, company, and local rules.",
        whyNotHuman:
          "Recall of the full programme landscape is exactly where human administration is inconsistent between cases.",
        dataRequired: ["Assembled context", "Programme catalogue", "Concurrency rules"],
        systems: ["Policy / Knowledge", "HCM"],
        risks: ["An applicable protected leave is not surfaced"],
        controls: ["Candidate set is recommended, never treated as a determination"],
        metrics: ["Programme identification accuracy", "Appeal or correction rate"],
      },
      {
        id: "fs6",
        name: "Explain requirements to the employee",
        description:
          "Set out in plain language what the leave means for pay and benefits, what is needed, and by when.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Personalising an explanation to one person's situation and reading level is language work, and it is where the employee experience is actually won or lost.",
        whyNotHuman:
          "Writing the same explanation repeatedly is not a use of specialist expertise.",
        dataRequired: ["Candidate programmes", "Documentation requirements", "Deadlines"],
        systems: ["Case Management", "Policy / Knowledge"],
        risks: ["Explanation reads as a determination of entitlement before one exists"],
        controls: ["Language distinguishes what is possible from what has been approved"],
        metrics: ["Employee comprehension", "Repeat questions per case"],
      },
      {
        id: "fs7",
        name: "Collect and check documentation",
        description:
          "Request, receive, and check documents for completeness — not for clinical meaning.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Reading a submitted document to check whether the required fields are present and legible is document analysis.",
        whyNotHuman: "Completeness checking and reminders are administrative, not clinical.",
        dataRequired: ["Required document types", "Submitted documents", "Deadlines"],
        systems: ["Case Management", "Policy / Knowledge"],
        risks: [
          "Medical content interpreted beyond completeness",
          "Sensitive documents stored or shared too widely",
        ],
        controls: [
          "Completeness only — never clinical interpretation",
          "Restricted access; documentation visible only to the leave owner",
        ],
        metrics: ["Documentation cycle time", "Incomplete submission rate"],
      },
      {
        id: "fs8",
        name: "Validate codifiable eligibility",
        description:
          "Apply service, hours, and entitlement rules that are fully codified to produce a reproducible eligibility result.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Eligibility is determined from codified rules and authoritative worker data. The same inputs should produce the same result, every time, for every employee.",
        whyNotAI:
          "A generated eligibility answer is neither reproducible nor defensible. Where a rule is codified, a rules engine must own it.",
        whyNotHuman:
          "Manual eligibility calculation introduces inconsistency between administrators and between cases.",
        dataRequired: ["Hours worked", "Service length", "Prior entitlement usage", "Rule set version"],
        systems: ["HCM", "WFM", "Payroll"],
        risks: ["Statutory entitlement miscalculated"],
        controls: ["Versioned rule sets; full calculation audit trail"],
        metrics: ["Eligibility accuracy", "Rework"],
      },
      {
        id: "fs9",
        name: "Specialist review of ambiguity and exceptions",
        description:
          "Conflicting documentation, accommodation questions, disputed eligibility, hardship, and anything discretionary.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "These decisions carry legal consequence and affect a person during a difficult period. They require discretion, empathy, and accountable ownership.",
        whyNotAI:
          "Accommodation and eligibility disputes involve balancing competing obligations and the organisation's duty of care. No model can hold that accountability.",
        dataRequired: ["Full case file", "Documentation", "Policy and legal position"],
        systems: ["Case Management", "Policy / Knowledge"],
        risks: ["Inconsistent treatment between comparable cases"],
        controls: ["Documented rationale; second review for precedent-setting decisions"],
        metrics: ["Exception rate", "Consistency of outcome", "Time to decision"],
      },
      {
        id: "fs10",
        name: "Create the authoritative leave record",
        description:
          "Write the approved leave, dates, and programme designation to the system of record.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "This is an authoritative transaction. It must be exact, dated, and auditable.",
        whyNotAI: "The model is not the system of record and must not become one.",
        whyNotHuman: "Rekeying approved data between systems is pure transfer cost.",
        dataRequired: ["Approved programme", "Effective dates", "Approval reference"],
        systems: ["HCM"],
        risks: ["Incorrect effective dating cascades into pay and benefits"],
        controls: ["Written only after the approval gate; change history retained"],
        metrics: ["Transaction accuracy", "Downstream correction rate"],
      },
      {
        id: "fs11",
        name: "Apply payroll treatment",
        description:
          "Paid, partially paid, or unpaid treatment, top-ups, and statutory payments calculated by the payroll engine.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Pay treatment follows codified rules and must be reproducible, auditable, and statutorily correct.",
        whyNotAI:
          "An LLM must never calculate authoritative pay. AI may explain and investigate pay; the payroll engine calculates it.",
        whyNotHuman: "Manual payroll adjustment for a known leave type invites error.",
        dataRequired: ["Leave record", "Pay rules", "Statutory rates"],
        systems: ["Payroll", "HCM"],
        risks: ["Underpayment or overpayment during leave"],
        controls: ["Payroll engine is the sole calculation authority; pre-commit validation"],
        metrics: ["Pay accuracy during leave", "Off-cycle corrections"],
      },
      {
        id: "fs12",
        name: "Apply benefits treatment",
        description:
          "Continuation, contribution handling, and carrier notification driven by eligibility rules.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Coverage continuation is rules-based and must execute in the benefits system of record and with carriers.",
        whyNotAI: "Coverage cannot depend on a generated interpretation.",
        whyNotHuman: "Manual carrier updates are a well-known source of coverage lapses.",
        dataRequired: ["Leave record", "Plan rules", "Contribution arrangements"],
        systems: ["Benefits", "Payroll"],
        risks: ["Coverage lapse during leave"],
        controls: ["Carrier confirmation required before the case advances"],
        metrics: ["Coverage lapse incidents", "Carrier exception rate"],
      },
      {
        id: "fs13",
        name: "Notify employee and manager appropriately",
        description:
          "Tell each party what they need to know — and nothing they should not know.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Communication must be personalised and, critically, scoped differently for the employee and the manager.",
        whyNotHuman: "Routine notification is not judgment work.",
        dataRequired: ["Leave dates", "Coverage arrangements", "Role-based disclosure rules"],
        systems: ["Case Management", "HCM"],
        risks: ["Medical or sensitive detail disclosed to a manager"],
        controls: ["Manager view limited to dates, coverage, and work impact"],
        metrics: ["Disclosure incidents", "Manager preparedness"],
      },
      {
        id: "fs14",
        name: "Monitor the leave, deadlines, and extensions",
        description:
          "Track certification expiry, entitlement exhaustion, extension requests, and quiet drift.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Continuous monitoring across dates, documents, and entitlement balances is orchestration — the kind of attention that spreadsheets fail at.",
        whyNotHuman: "Manual deadline tracking is where leave programmes most often break down.",
        dataRequired: ["Certification dates", "Entitlement balances", "Extension requests"],
        systems: ["HCM", "Case Management"],
        risks: ["A deadline passes unnoticed and affects pay or job protection"],
        controls: ["Escalation to the human owner before, not after, a deadline"],
        metrics: ["Missed deadline rate", "Extension handling time"],
      },
      {
        id: "fs15",
        name: "Orchestrate return to work",
        description:
          "Confirm the return date, reinstate pay and benefits, restore access and schedule, and prepare the manager.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Return requires coordinating several systems and several people on one date — the definition of orchestration.",
        whyNotHuman:
          "Coordinating the return by email between four parties is exactly the work worth removing.",
        dataRequired: ["Confirmed return date", "Any restrictions", "Schedule and access state"],
        systems: ["HCM", "Payroll", "Benefits", "WFM", "Identity"],
        risks: ["Employee returns without pay, access, or schedule restored"],
        controls: ["Return is released by a human; restrictions reviewed by a specialist"],
        metrics: ["Clean return rate", "Day-one issues on return"],
      },
      {
        id: "fs16",
        name: "Verify and close",
        description:
          "Confirm every downstream record matches the approved leave and surface anything that did not land.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Verification is a defined reconciliation between the leave record and downstream system state.",
        whyNotAI: "Reconciliation must be read from the records, not inferred.",
        whyNotHuman: "Manual cross-system checking is duplicate verification.",
        dataRequired: ["Leave record", "Payroll results", "Benefits state"],
        systems: ["HCM", "Payroll", "Benefits"],
        risks: ["A silent failure in one system is discovered by the employee"],
        controls: ["Automated reconciliation with exception reporting"],
        metrics: ["Exception rate", "Employee-reported errors"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs8",
        name: "Routine or specialist review?",
        proceedCondition:
          "Eligibility fully determined by codified rules, documentation complete, no accommodation question, no dispute — the case proceeds for approval.",
        escalateCondition:
          "Ambiguous eligibility, conflicting or incomplete documentation, accommodation implications, sensitivity, or dispute — an HR specialist owns the decision.",
        humanControl: "hitl",
        authorityBasis:
          "Routing is set by case type, policy scope, and risk classification. A confident rules result does not confer authority over an accommodation question.",
      },
      {
        id: "g2",
        afterStepId: "fs9",
        name: "Approval before any authoritative transaction",
        proceedCondition:
          "An accountable human approves the leave designation, dates, and pay treatment.",
        escalateCondition:
          "Precedent-setting or legally sensitive cases receive a second review before release.",
        humanControl: "hitl",
        authorityBasis:
          "Leave carries statutory and job-protection consequence. No transaction is written on model output alone.",
      },
      {
        id: "g3",
        afterStepId: "fs14",
        name: "Extension or restriction on return",
        proceedCondition:
          "A straightforward return on the planned date with no restrictions is orchestrated automatically.",
        escalateCondition:
          "Extension requests, phased return, or medical restrictions go to a specialist before anything is released.",
        humanControl: "hitl",
        authorityBasis:
          "Return conditions can involve accommodation obligations, which are human decisions by design.",
      },
    ],
    aiShouldNot: [
      "Determine eligibility where the rule is codified — that belongs to a rules engine",
      "Interpret medical documentation clinically or infer a diagnosis",
      "Decide accommodation questions or resolve disputed eligibility",
      "Calculate authoritative pay or statutory payments",
      "Disclose medical or sensitive detail to a manager",
      "Release a return to work where restrictions are present",
    ],
    architectureSystems: [
      "HCM",
      "Payroll",
      "Benefits",
      "WFM",
      "Case Management",
      "Policy / Knowledge",
      "Identity",
    ],
    metrics: [
      { name: "Employee effort to initiate leave", note: "Baseline required." },
      { name: "Time to leave decision", note: "Measure against your current process." },
      { name: "HR touches per leave case", note: "Calculated from your current process model." },
      { name: "Pay accuracy during leave", note: "Baseline required." },
      { name: "Coverage lapse incidents", note: "Measure against your current process." },
      { name: "Missed deadline and certification lapse rate", note: "Baseline required." },
      { name: "Clean return-to-work rate", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "leave-control-agent",
        name: "Leave Control Agent",
        role: "See how an UnfoldHR agent could support selected reasoning, monitoring, and orchestration activities within this workflow — readiness evaluation and release control, not ownership of the whole process.",
      },
    ],
    sources: [
      {
        title: "Redesigning HR workflows before selecting technology",
        organization: "PwC and AT&T",
        type: "practitioner",
        note: "Inspiration for the work-design-first sequence. Not an endorsement of UnfoldHR.",
        supports: "The principle that elimination precedes allocation.",
      },
      {
        title: "Leave workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports:
          "Step classifications, control gate placement, elimination judgments, and the boundary between AI reasoning and deterministic eligibility.",
      },
    ],
  },

  {
    id: "employee-relations-investigation",
    number: 9,
    domain: "hr-service-delivery",
    name: "Employee Relations Intake & Investigation",
    shortName: "ER Intake & Investigation",
    outcome:
      "Handle employee concerns consistently, sensitively, and defensibly.",
    description:
      "This workflow is deliberately the least agentic in the library. AI can materially reduce the administrative weight of an investigation while owning none of its conclusions.",
    modelType: "reference",
    aiSuitability: "Medium",
    humanJudgment: "Very High",
    eliminationOpportunity: "Medium",
    risk: "Very High",
    implementationComplexity: "High",
    currentStateSummary:
      "Intake quality varies by who receives the concern; chronology and evidence are assembled by hand, and consistency between investigators is difficult to demonstrate.",
    currentStateSteps: [
      { id: "cs1", name: "Concern raised through an inconsistent channel", friction: "value" },
      { id: "cs2", name: "Intake notes captured in free form", friction: "manual" },
      { id: "cs3", name: "Case assigned and re-read from scratch", friction: "handoff" },
      { id: "cs4", name: "Investigator assembles chronology manually", friction: "manual" },
      { id: "cs5", name: "Relevant policy located by hand", friction: "manual" },
      { id: "cs6", name: "Interviews conducted", friction: "value" },
      { id: "cs7", name: "Notes transcribed and organised", friction: "manual" },
      { id: "cs8", name: "Findings formed and documented", friction: "value" },
      { id: "cs9", name: "Outcome communicated and recorded", friction: "value" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual chronology assembly and note transcription",
        description:
          "Rebuilding a timeline by hand from emails, notes, and records adds no investigative value.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "This work exists because evidence sits in disconnected places. It consumes the time that should go into the interviews themselves.",
        dataRequired: [],
        systems: ["Case Management"],
        risks: ["Over-reliance on an assembled timeline without verification"],
        controls: ["Every assembled fact is traceable to its source record"],
        metrics: ["Investigator time on administration"],
      },
      {
        id: "fs2",
        name: "Structure the intake",
        description:
          "Capture the concern consistently, identify the policy areas potentially engaged, and flag urgency or safeguarding risk.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Consistent intake structure from an unstructured account is language work, and inconsistency at intake is a known source of unfair outcomes.",
        whyNotHuman:
          "Whoever happens to receive the concern should not determine the quality of the record.",
        dataRequired: ["Reported account", "Policy taxonomy"],
        systems: ["Case Management", "Policy / Knowledge"],
        risks: ["Mischaracterising the concern at intake shapes the whole investigation"],
        controls: ["Intake is a draft record confirmed by a human before assignment"],
        metrics: ["Intake completeness", "Time to triage"],
      },
      {
        id: "fs3",
        name: "Assemble chronology and organise evidence",
        description:
          "Build a source-linked timeline and organise documents for the investigator.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Organising unstructured evidence into a reviewable structure is synthesis and does not touch the findings.",
        whyNotHuman: "Manual assembly is slow and inconsistent between cases.",
        dataRequired: ["Case documents", "Relevant records", "Timeline data"],
        systems: ["Case Management"],
        risks: ["Framing effects from the order or emphasis of assembled evidence"],
        controls: ["Neutral presentation; no inference of credibility or intent"],
        metrics: ["Preparation time", "Evidence completeness"],
      },
      {
        id: "fs4",
        name: "Retrieve applicable policy and precedent structure",
        description:
          "Surface the policy versions in force at the relevant time and how comparable matters were structured.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Retrieval and summarisation across a policy corpus is well suited to AI and improves consistency.",
        whyNotHuman: "Manual policy search is slow and depends on individual recall.",
        dataRequired: ["Policy library with version history", "Case taxonomy"],
        systems: ["Policy / Knowledge", "Case Management"],
        risks: ["Applying a current policy to historic conduct"],
        controls: ["Version-pinned retrieval by date of the conduct"],
        metrics: ["Consistency of process", "Preparation time"],
      },
      {
        id: "fs5",
        name: "Prepare interviews and identify gaps",
        description:
          "Draft question frameworks and point out where the evidence is thin or accounts diverge.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Identifying unexplored areas and divergences between accounts is analysis that supports — and never substitutes for — the investigator.",
        whyNotHuman: "Gap identification benefits from systematic comparison across the file.",
        dataRequired: ["Assembled evidence", "Accounts given"],
        systems: ["Case Management"],
        risks: ["Divergence presented as an assessment of credibility"],
        controls: ["Output is limited to factual divergence; no credibility language"],
        metrics: ["Investigation quality review scores"],
      },
      {
        id: "fs6",
        name: "Conduct interviews",
        description: "The investigative conversations themselves.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "Interviews require empathy, judgment in the moment, and accountability for how a person is treated during a process that affects their livelihood.",
        whyNotAI:
          "An interview is an exercise of organisational authority over a person. It cannot be delegated to a system.",
        dataRequired: ["Prepared framework", "Case file"],
        systems: ["Case Management"],
        risks: ["Procedural unfairness"],
        controls: ["Trained investigators; representation rights observed"],
        metrics: ["Procedural compliance", "Appeal rate"],
      },
      {
        id: "fs7",
        name: "Reach findings and determine outcome",
        description:
          "Assess credibility, reach findings of fact, and determine any disciplinary outcome.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "Findings and discipline are consequential, contestable, and ethically weighted decisions with legal exposure. They must have a named human owner.",
        whyNotAI:
          "Credibility assessment and proportionality of sanction are not pattern-matching problems. No model should determine them, at any confidence level.",
        dataRequired: ["Full evidence file", "Policy position", "Comparable outcomes"],
        systems: ["Case Management"],
        risks: ["Inconsistent or disproportionate outcomes"],
        controls: ["Second-reviewer sign-off; documented reasoning"],
        metrics: ["Consistency of outcome", "Appeal and overturn rate"],
      },
      {
        id: "fs8",
        name: "Document and close the record",
        description:
          "Produce the case record, retention treatment, and any system actions arising.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Record creation and retention follow defined rules and must be exact and auditable.",
        whyNotAI: "The case record is a legal artefact, not generated content.",
        whyNotHuman: "Manual filing and retention handling is error-prone administration.",
        dataRequired: ["Findings", "Outcome", "Retention rules"],
        systems: ["Case Management", "HCM"],
        risks: ["Retention or access breach on a sensitive record"],
        controls: ["Restricted access; retention enforced by rule"],
        metrics: ["Audit findings", "Record completeness"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs2",
        name: "Risk and sensitivity triage",
        proceedCondition:
          "Low-risk matters follow the standard preparation path with an assigned investigator.",
        escalateCondition:
          "Safeguarding, harassment, discrimination, retaliation, or senior-leader matters escalate immediately to a senior ER owner, and often to legal.",
        humanControl: "human-only",
        authorityBasis:
          "Case category and legal exposure determine handling. No part of the agent's involvement extends to findings, regardless of confidence.",
      },
    ],
    aiShouldNot: [
      "Determine credibility",
      "Make findings of misconduct",
      "Determine discipline or sanction",
      "Conduct interviews with employees",
      "Infer protected characteristics or health information",
    ],
    architectureSystems: ["Case Management", "Policy / Knowledge", "HCM", "Identity"],
    metrics: [
      { name: "Time to resolution", note: "Baseline required." },
      { name: "Investigator time on administration", note: "Measure against your current process." },
      { name: "Procedural consistency", note: "Baseline required." },
      { name: "Appeal and overturn rate", note: "Measure against your current process." },
    ],
    relatedAgents: [],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports:
          "The deliberately constrained agent role and the human-only boundary around findings.",
      },
    ],
  },
];
