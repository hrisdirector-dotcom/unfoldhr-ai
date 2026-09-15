import type { Workflow } from "./types";

export const WORKFORCE_PLANNING_WORKFLOWS: Workflow[] = [
  {
    id: "workforce-demand-capacity-planning",
    number: 18,
    domain: "workforce-planning",
    name: "Workforce Demand & Capacity Planning",
    shortName: "Demand & Capacity",
    outcome:
      "Determine the right mix of capacity to meet future business demand.",
    description:
      "Capacity is no longer just headcount. The realistic options now include employees, contractors, global workers, AI agents, and deterministic automation — and the choice between them is a strategic judgment.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "Very High",
    eliminationOpportunity: "Medium",
    risk: "High",
    implementationComplexity: "High",
    currentStateSummary:
      "Planning happens in spreadsheets, one cycle a year, on data that is stale before the plan is approved, and expressed almost entirely as headcount.",
    currentStateSteps: [
      { id: "cs1", name: "Finance issues planning templates", friction: "manual" },
      { id: "cs2", name: "Leaders estimate headcount need", friction: "value" },
      { id: "cs3", name: "HR consolidates submissions manually", friction: "manual" },
      { id: "cs4", name: "Supply data pulled and reconciled", friction: "manual" },
      { id: "cs5", name: "Gaps identified in spreadsheets", friction: "manual" },
      { id: "cs6", name: "Iterations exchanged by email", friction: "coordination" },
      { id: "cs7", name: "Plan approved", friction: "value" },
      { id: "cs8", name: "Plan diverges from reality within a quarter", friction: "coordination" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual consolidation and spreadsheet iteration",
        description: "Collecting, reconciling, and versioning plan submissions by hand.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Consolidation is transfer work created by planning outside the systems that hold the data. It also forces planning into an annual rhythm.",
        dataRequired: [],
        systems: ["HCM", "Finance"],
        risks: ["Leaders disengaging from a plan they no longer assemble"],
        controls: ["Leaders own assumptions explicitly; the arithmetic is automated"],
        metrics: ["Planning cycle effort", "Plan refresh frequency"],
      },
      {
        id: "fs2",
        name: "Interpret business demand signals",
        description:
          "Translate strategy, pipeline, and operational drivers into work and skill demand.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Demand arrives as narrative and operational data. Turning it into skill and capacity requirements is interpretation and modelling.",
        whyNotHuman: "Manual translation is slow and inconsistent between business units.",
        dataRequired: ["Business plan", "Demand drivers", "Historical ratios"],
        systems: ["Finance", "HCM"],
        risks: ["Overconfident demand models presented as fact"],
        controls: ["Assumptions stated explicitly and owned by a named leader"],
        metrics: ["Forecast accuracy", "Assumption transparency"],
      },
      {
        id: "fs3",
        name: "Analyse current supply and attrition risk",
        description:
          "Establish what capability the organisation actually has, and how it is likely to change.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Supply analysis spans skills, contingent workers, and movement patterns across several sources.",
        whyNotHuman: "Manual supply analysis is out of date by the time it is complete.",
        dataRequired: ["Workforce data", "Skills", "Contingent workforce", "Attrition history"],
        systems: ["HCM", "Finance"],
        risks: ["Individual attrition predictions used against employees"],
        controls: ["Attrition modelled at population level only"],
        metrics: ["Supply visibility", "Forecast accuracy"],
      },
      {
        id: "fs4",
        name: "Model capacity scenarios across all options",
        description:
          "Compare employee, contractor, global worker, AI agent, and deterministic automation options for each capacity gap.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Scenario modelling across several capacity types, costs, and lead times is analytical work that makes tradeoffs visible.",
        whyNotHuman: "Manual scenario comparison rarely extends past headcount.",
        dataRequired: ["Demand model", "Supply model", "Cost models", "Lead times"],
        systems: ["HCM", "Finance"],
        risks: ["Automation options presented as costless"],
        controls: ["Implementation cost, risk, and change effort included in every option"],
        metrics: ["Scenario coverage", "Decision quality"],
      },
      {
        id: "fs5",
        name: "Validate financial constraints",
        description: "Apply approved budgets, cost models, and planning constraints.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Financial constraints are codified and must be applied consistently for a plan to mean anything.",
        whyNotAI: "Financial figures must be calculated, not generated.",
        whyNotHuman: "Manual arithmetic across scenarios is slow and error-prone.",
        dataRequired: ["Budgets", "Cost rates", "Planning constraints"],
        systems: ["Finance", "HCM"],
        risks: ["Plans approved that the budget cannot support"],
        controls: ["Hard constraint enforcement with explicit override tracking"],
        metrics: ["Plan-to-budget variance"],
      },
      {
        id: "fs6",
        name: "Decide the capacity strategy",
        description:
          "Choose the mix, accept the risk, and commit the investment.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "These are strategic tradeoffs about risk appetite, organisational shape, and investment. They belong to accountable leaders.",
        whyNotAI:
          "Deciding to replace a category of work with automation, or to build capability internally, is a consequential business and human decision.",
        dataRequired: ["Scenarios", "Constraints", "Risk position"],
        systems: ["Finance", "HCM"],
        risks: ["Choosing the lowest-cost scenario without weighing capability risk"],
        controls: ["Decisions recorded with assumptions and accepted risks"],
        metrics: ["Plan accuracy", "Capability risk realised"],
      },
      {
        id: "fs7",
        name: "Track the plan continuously",
        description:
          "Monitor actuals against plan and surface divergence as it happens, not at year end.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Continuous monitoring and divergence detection is orchestration work that turns an annual plan into a live one.",
        whyNotHuman: "Manual variance tracking happens too rarely to be useful.",
        dataRequired: ["Plan", "Actual hiring and attrition", "Budget consumption"],
        systems: ["HCM", "Finance", "ATS"],
        risks: ["Alert volume drowning out significant divergence"],
        controls: ["Materiality thresholds agreed with leadership"],
        metrics: ["Time to detect divergence", "Plan adherence"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs5",
        name: "Strategic investment decision",
        proceedCondition:
          "Scenarios and constraints are delivered to leadership for decision.",
        escalateCondition:
          "Scenarios involving role displacement or significant automation require explicit leadership and HR review before any planning assumption is adopted.",
        humanControl: "human-only",
        authorityBasis:
          "Investment and organisational shape decisions sit with accountable leaders under governance.",
      },
    ],
    aiShouldNot: [
      "Decide the capacity mix or approve investment",
      "Generate individual attrition or flight-risk predictions used in decisions about people",
      "Recommend displacement of specific individuals",
      "Present automation scenarios without implementation cost and risk",
    ],
    architectureSystems: ["HCM", "Finance", "ATS", "LMS"],
    metrics: [
      { name: "Forecast accuracy", note: "Baseline required." },
      { name: "Planning cycle effort", note: "Measure against your current process." },
      { name: "Time to detect plan divergence", note: "Baseline required." },
      { name: "Capability gaps realised", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "try-agent",
        name: "Workforce Planning Agent",
        role: "See how an UnfoldHR agent could support scenario reasoning and gap analysis within this workflow — the investment decision remains with leadership.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Capacity options extended beyond headcount and the human-only strategy boundary.",
      },
    ],
  },

  {
    id: "organizational-design-restructuring",
    number: 19,
    domain: "workforce-planning",
    name: "Organisational Design & Restructuring",
    shortName: "Org Design",
    outcome:
      "Design an organisation capable of executing strategy while understanding workforce consequences.",
    description:
      "The highest-risk workflow in the library. AI can make consequences visible far earlier than they usually are. It must never be positioned anywhere near deciding who loses a job.",
    modelType: "reference",
    aiSuitability: "High",
    humanJudgment: "Very High",
    eliminationOpportunity: "Medium",
    risk: "Extreme",
    implementationComplexity: "High",
    currentStateSummary:
      "Design work happens in slides with stale org data, cost and impact analysis is manual and late, and consequences for people are understood only at the end.",
    currentStateSteps: [
      { id: "cs1", name: "Design intent set by leadership", friction: "value" },
      { id: "cs2", name: "Current structure reconstructed manually", friction: "manual" },
      { id: "cs3", name: "Options drawn in slides", friction: "manual" },
      { id: "cs4", name: "Cost modelled by finance separately", friction: "handoff" },
      { id: "cs5", name: "People impact assessed late", friction: "wait" },
      { id: "cs6", name: "Legal and consultation requirements checked", friction: "value" },
      { id: "cs7", name: "Decisions taken", friction: "value" },
      { id: "cs8", name: "Communication and execution planned", friction: "value" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual structure reconstruction and cost modelling",
        description: "Rebuilding the current organisation and its cost base by hand for every option.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "This analysis is derivable from existing data. Doing it by hand is why people impact is understood far too late in the process.",
        dataRequired: [],
        systems: ["HCM", "Finance"],
        risks: ["Faster modelling encouraging shallower deliberation"],
        controls: ["People impact shown alongside every option from the outset"],
        metrics: ["Time to option analysis"],
      },
      {
        id: "fs2",
        name: "Analyse spans, layers, and duplication",
        description:
          "Examine the current structure for span imbalance, excess layers, and duplicated capability.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Structural analysis across a large organisation is quantitative work that is impractical manually.",
        whyNotHuman: "Manual span and layer analysis is slow and partial.",
        dataRequired: ["Org structure", "Role definitions", "Reporting lines"],
        systems: ["HCM"],
        risks: ["Structural metrics treated as targets rather than indicators"],
        controls: ["Context required before any structural conclusion"],
        metrics: ["Structural clarity", "Analysis cycle time"],
      },
      {
        id: "fs3",
        name: "Model design scenarios and capability impact",
        description:
          "Compare structural options against capability, cost, and execution risk.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Scenario modelling makes tradeoffs explicit and lets leaders test more options than they could by hand.",
        whyNotHuman: "Manual modelling limits leaders to two or three options.",
        dataRequired: ["Current structure", "Capability map", "Cost model", "Strategy"],
        systems: ["HCM", "Finance"],
        risks: ["Scenarios that quietly identify individuals for removal"],
        controls: [
          "Modelling operates at role and capability level, never at named-individual level",
        ],
        metrics: ["Options considered", "Capability retention"],
      },
      {
        id: "fs4",
        name: "Summarise workforce and compliance consequences",
        description:
          "Set out affected populations, consultation obligations, notice requirements, and jurisdictional constraints.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Assembling obligations across jurisdictions is retrieval and synthesis, and getting it wrong is extremely costly.",
        whyNotHuman: "Manual compliance mapping across jurisdictions is slow and often incomplete.",
        dataRequired: ["Affected populations", "Jurisdictional requirements", "Agreements"],
        systems: ["HCM", "Policy / Knowledge"],
        risks: ["A consultation obligation missed"],
        controls: ["Legal review required before any decision is actioned"],
        metrics: ["Compliance findings", "Consultation completeness"],
      },
      {
        id: "fs5",
        name: "Decide the organisational design",
        description:
          "Leaders choose the structure and accept its consequences.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Organisational design determines how work and authority are arranged, and affects livelihoods. It requires accountable leadership judgment.",
        whyNotAI: "No model should shape an organisation's structure on its own authority.",
        dataRequired: ["Scenarios", "Consequences", "Strategy"],
        systems: ["HCM", "Finance"],
        risks: ["Choosing a structurally efficient option that destroys capability"],
        controls: ["Decisions documented with reasoning and accepted risks"],
        metrics: ["Post-change capability retention", "Execution against strategy"],
      },
      {
        id: "fs6",
        name: "Decide individual employee impact",
        description:
          "Any decision about which individuals are affected, redeployed, or leave.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "These are the most consequential decisions an employer makes. They require human judgment, legal process, fairness, and accountability.",
        whyNotAI:
          "AI must never be framed as deciding who loses their job — at any confidence level, in any scenario, with any amount of supporting evidence.",
        dataRequired: ["Selection criteria", "Legal framework", "Consultation outcomes"],
        systems: ["HCM", "Case Management"],
        risks: ["Unfair or discriminatory selection"],
        controls: [
          "Named decision-makers; documented objective criteria; legal review; consultation completed",
        ],
        metrics: ["Challenge and claim rate", "Process compliance"],
      },
      {
        id: "fs7",
        name: "Plan communication and support",
        description:
          "Prepare managers, communications, and support for everyone affected.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "How a restructure is communicated determines how people are treated. It is a leadership responsibility.",
        whyNotAI: "Messages of this weight must come from accountable people.",
        dataRequired: ["Decisions", "Timelines", "Support arrangements"],
        systems: ["HCM", "Case Management"],
        risks: ["People learning their fate from a system notification"],
        controls: ["Human conversation precedes any system action"],
        metrics: ["Employee experience through change", "Retention of unaffected staff"],
      },
      {
        id: "fs8",
        name: "Execute structural changes in the systems of record",
        description:
          "Apply approved structure, reporting lines, and role changes with correct dating.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Structural execution is a set of authoritative, dated transactions requiring an audit trail.",
        whyNotAI: "Org records must be transacted, not generated.",
        whyNotHuman: "Manual restructuring of org data at scale is error-prone.",
        dataRequired: ["Approved structure", "Effective dates"],
        systems: ["HCM", "Payroll", "Identity"],
        risks: ["Access or reporting lines changed before communication"],
        controls: ["Execution sequenced after communication, never before"],
        metrics: ["Execution accuracy", "Sequencing incidents"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs4",
        name: "Analysis ends here",
        proceedCondition:
          "Scenario and consequence analysis is delivered to leadership and legal.",
        escalateCondition:
          "Every decision affecting individuals follows the formal human process with legal review and consultation. No analysis output proceeds directly to action.",
        humanControl: "human-only",
        authorityBasis:
          "Employment law, consultation obligations, and governance define authority absolutely. Analytical confidence is irrelevant here.",
      },
    ],
    aiShouldNot: [
      "Identify or recommend specific individuals for redundancy",
      "Determine selection criteria without human and legal ownership",
      "Model scenarios at named-individual level",
      "Trigger any system change before affected people have been told",
    ],
    architectureSystems: ["HCM", "Finance", "Identity", "Case Management", "Policy / Knowledge"],
    metrics: [
      { name: "Capability retention after change", note: "Baseline required." },
      { name: "Time to complete option analysis", note: "Measure against your current process." },
      { name: "Process and consultation compliance", note: "Baseline required." },
      { name: "Retention of unaffected employees", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "try-agent",
        name: "Workforce Planning Agent",
        role: "Supports capacity and scenario context feeding this workflow — it takes no part in individual impact decisions.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "The absolute human-only boundary around individual employment impact.",
      },
    ],
  },
];
