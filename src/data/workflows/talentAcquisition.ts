import type { Workflow } from "./types";

export const TALENT_ACQUISITION_WORKFLOWS: Workflow[] = [
  {
    id: "requisition-to-approved-opening",
    number: 1,
    domain: "talent-acquisition",
    name: "Requisition to Approved Opening",
    shortName: "Requisition to Opening",
    outcome:
      "Authorise the right role, at the right level and cost, based on a real business need.",
    description:
      "Most of the elapsed time in opening a role is spent assembling context and moving an approval between inboxes. The investment decision itself takes minutes and should stay firmly human.",
    modelType: "reference",
    aiSuitability: "High",
    humanJudgment: "High",
    eliminationOpportunity: "High",
    risk: "High",
    implementationComplexity: "Medium-High",
    currentStateSummary:
      "A manager identifies a need, raises a requisition, and the request then travels through HRBP, finance, compensation, and recruiting reviews, each re-gathering the same context.",
    currentStateSteps: [
      { id: "cs1", name: "Manager identifies a resourcing need", friction: "value" },
      { id: "cs2", name: "Manager assembles justification manually", friction: "manual" },
      { id: "cs3", name: "HRBP reviews and requests missing detail", friction: "wait" },
      { id: "cs4", name: "Finance validates budget separately", friction: "handoff" },
      { id: "cs5", name: "Compensation checks level and range", friction: "handoff" },
      { id: "cs6", name: "Recruiter reviews feasibility", friction: "handoff" },
      { id: "cs7", name: "Approvals routed and chased", friction: "coordination" },
      { id: "cs8", name: "Requisition opened", friction: "value" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual justification assembly and approval chasing",
        description:
          "Collecting headcount plan data, comparable roles, and budget position by hand, then chasing signatures.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "This work exists because plan, budget, and compensation data live apart. It is transfer and coordination cost, not decision-making.",
        dataRequired: [],
        systems: ["HCM", "Finance"],
        risks: ["Approvers lose visibility if the packet becomes a black box"],
        controls: ["Every assembled figure is traceable to its source system"],
        metrics: ["Manager effort", "Approval cycle time"],
      },
      {
        id: "fs2",
        name: "Assemble the business case context",
        description:
          "Bring together the workforce plan position, comparable roles, attrition and vacancy context, skills required, and market conditions.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Pulling a coherent picture from plan data, org data, and role history requires synthesis across structured and unstructured sources.",
        whyNotHuman: "Context assembly consumes the approvers' time without improving the decision.",
        dataRequired: ["Workforce plan", "Org structure", "Comparable roles", "Attrition history"],
        systems: ["HCM", "Finance", "ATS"],
        risks: ["An incomplete picture makes a weak case look strong"],
        controls: ["Gaps and uncertainty stated explicitly in the packet"],
        metrics: ["Time to decision-ready packet"],
      },
      {
        id: "fs3",
        name: "Validate budget and approval authority",
        description:
          "Check funding availability, cost centre, level, and who is actually authorised to approve.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Budget availability and delegation of authority are codified. The same inputs must always produce the same answer.",
        whyNotAI: "Financial authority cannot depend on a generated interpretation.",
        whyNotHuman: "Manual budget checking is duplicate verification.",
        dataRequired: ["Budget position", "Cost centre", "Delegation of authority matrix"],
        systems: ["Finance", "HCM"],
        risks: ["A role is opened without funding"],
        controls: ["Hard block where funding or authority is absent"],
        metrics: ["Unfunded requisition rate"],
      },
      {
        id: "fs4",
        name: "Position the role in the level and range structure",
        description: "Apply job architecture and compensation range rules to the proposed role.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Levelling rules and ranges are codified structures; consistent application is the point of having them.",
        whyNotAI: "Range and level assignment must be reproducible and defensible.",
        whyNotHuman: "Case-by-case manual levelling causes drift across the organisation.",
        dataRequired: ["Job architecture", "Range structure", "Location differentials"],
        systems: ["HCM", "Payroll"],
        risks: ["Level inflation over time"],
        controls: ["Out-of-structure proposals require compensation review"],
        metrics: ["Levelling consistency"],
      },
      {
        id: "fs5",
        name: "Decide the workforce investment",
        description:
          "Approve, reshape, defer, or decline the role against business priorities.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "This is a capital allocation decision about people, with consequences for cost, structure, and strategy. It requires accountable human ownership.",
        whyNotAI:
          "No model should authorise the creation of a permanent cost commitment or a new position in the organisation.",
        dataRequired: ["Assembled case", "Budget position", "Plan priorities"],
        systems: ["Finance", "HCM"],
        risks: ["Approving headcount that the plan cannot sustain"],
        controls: ["Named approver within delegated authority; recorded rationale"],
        metrics: ["Plan adherence", "Requisition cancellation rate"],
      },
      {
        id: "fs6",
        name: "Open the requisition and brief the recruiter",
        description:
          "Create the authoritative requisition record and generate the sourcing brief.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Requisition creation is an authoritative transaction in the ATS with defined fields and approvals attached.",
        whyNotAI: "The ATS is the system of record, not the model.",
        whyNotHuman: "Rekeying the approved packet into the ATS is transfer cost.",
        dataRequired: ["Approved case", "Level and range", "Approval reference"],
        systems: ["ATS", "HCM"],
        risks: ["Requisition opened with terms that differ from what was approved"],
        controls: ["Requisition fields locked to the approved decision"],
        metrics: ["Requisition accuracy", "Time from approval to open"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs4",
        name: "Investment approval",
        proceedCondition:
          "Within plan, funded, and within the manager's delegated authority — proceeds to the named approver with a complete packet.",
        escalateCondition:
          "Off-plan, unfunded, out-of-range level, or above delegated authority — escalates to senior finance and HR review.",
        humanControl: "human-only",
        authorityBasis:
          "Delegation of authority and budget policy set who may approve. A strong business case never transfers authority to the agent.",
      },
    ],
    aiShouldNot: [
      "Approve headcount or create positions",
      "Set compensation ranges outside the approved structure",
      "Suppress or soften a weak business case to speed approval",
    ],
    architectureSystems: ["HCM", "Finance", "ATS", "Policy / Knowledge"],
    metrics: [
      { name: "Time from need to open requisition", note: "Baseline required." },
      { name: "Approval touches per requisition", note: "Calculated from your current routing model." },
      { name: "Unfunded or cancelled requisition rate", note: "Measure against your current process." },
      { name: "Plan adherence", note: "Baseline required." },
    ],
    relatedAgents: [
      {
        page: "try-agent",
        name: "Workforce Planning Agent",
        role: "Supports the plan context this decision is made against — it does not own the approval.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Step classifications and the human-only investment boundary.",
      },
    ],
  },

  {
    id: "candidate-screening-shortlisting",
    number: 2,
    domain: "talent-acquisition",
    name: "Candidate Screening & Shortlisting",
    shortName: "Screening & Shortlisting",
    outcome:
      "Identify qualified candidates fairly and efficiently while preserving accountable hiring decisions.",
    description:
      "AI is well suited to organising evidence against explicit criteria and surfacing what is missing. It is not suited to deciding who is out of the running.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "High",
    eliminationOpportunity: "High",
    risk: "Very High",
    implementationComplexity: "Medium",
    currentStateSummary:
      "High-volume resume review, keyword filtering, inconsistent screening notes, and candidate comparison held in a recruiter's head or a spreadsheet.",
    currentStateSteps: [
      { id: "cs1", name: "Keyword filter applied to the applicant pool", friction: "manual" },
      { id: "cs2", name: "Recruiter reviews resumes individually", friction: "manual" },
      { id: "cs3", name: "Screening calls held and noted in free form", friction: "value" },
      { id: "cs4", name: "Candidates ranked informally", friction: "manual" },
      { id: "cs5", name: "Shortlist packet assembled by hand", friction: "manual" },
      { id: "cs6", name: "Hiring manager re-reviews from raw resumes", friction: "handoff" },
      { id: "cs7", name: "Selection decision made", friction: "value" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Keyword filtering and manual packet assembly",
        description:
          "Blunt keyword exclusion and hand-built comparison documents.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Keyword filtering was a workaround for volume. It excludes qualified people for reasons nobody can defend, and packet assembly is pure preparation cost.",
        dataRequired: [],
        systems: ["ATS"],
        risks: ["Replacing a crude filter with an opaque one"],
        controls: ["No automated exclusion of any candidate at any stage"],
        metrics: ["Qualified candidates lost at filter stage"],
      },
      {
        id: "fs2",
        name: "Define explicit, testable job criteria",
        description:
          "Agree what actually predicts success in the role before any candidate is assessed.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Criteria encode what the organisation values and where bias enters. Defining them is an accountable human act.",
        whyNotAI:
          "Inferring criteria from previous hires reproduces whatever pattern previous hiring already contained.",
        dataRequired: ["Role requirements", "Success profile", "Legal constraints"],
        systems: ["ATS", "Policy / Knowledge"],
        risks: ["Criteria that proxy for protected characteristics"],
        controls: ["Criteria reviewed for job-relatedness before use"],
        metrics: ["Criteria clarity", "Adverse impact monitoring"],
      },
      {
        id: "fs3",
        name: "Summarise evidence against the criteria",
        description:
          "For each candidate, set out what the application evidences, what it does not, and where the evidence is unclear.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Reading unstructured applications and mapping them to explicit criteria is document analysis and synthesis.",
        whyNotHuman:
          "Manual review at volume is where consistency collapses and where the strongest evidence gets missed.",
        dataRequired: ["Applications", "Explicit criteria"],
        systems: ["ATS"],
        risks: [
          "Inferring protected characteristics from names, schools, or gaps",
          "Summary framing that advantages certain writing styles",
        ],
        controls: [
          "No inference of protected characteristics",
          "Evidence cited to the source text; uncertainty stated",
        ],
        metrics: ["Screening consistency", "Adverse impact monitoring"],
      },
      {
        id: "fs4",
        name: "Structure the comparison and surface uncertainty",
        description:
          "Present candidates side by side against the criteria, with gaps and unknowns marked rather than smoothed over.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Structuring a comparison improves the quality of the human decision without making it.",
        whyNotHuman: "A consistent comparison structure is hard to maintain manually at volume.",
        dataRequired: ["Evidence summaries", "Criteria weighting"],
        systems: ["ATS"],
        risks: ["An ordered list is read as a ranking recommendation"],
        controls: ["No overall score or ranking; ordering is neutral"],
        metrics: ["Hiring manager decision time", "Decision quality review"],
      },
      {
        id: "fs5",
        name: "Decide the shortlist",
        description: "Choose who advances, and take accountability for it.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "Advancing or rejecting a candidate is a consequential employment decision that must have a named human owner.",
        whyNotAI:
          "Rejection affects a person's livelihood and carries legal exposure. It cannot be delegated, at any level of model confidence.",
        dataRequired: ["Structured comparison", "Role context"],
        systems: ["ATS"],
        risks: ["Deferring to the presented structure without independent judgment"],
        controls: ["Decision recorded with reasons; adverse impact reviewed periodically"],
        metrics: ["Shortlist quality", "Adverse impact", "Offer acceptance"],
      },
      {
        id: "fs6",
        name: "Communicate outcomes to candidates",
        description: "Timely, respectful, personalised responses to everyone who applied.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Personalised communication at volume is language work, and silence is the most common candidate-experience failure.",
        whyNotHuman: "The alternative in practice is no response at all.",
        dataRequired: ["Decision outcome", "Communication templates"],
        systems: ["ATS"],
        risks: ["Feedback that implies a reason not supported by the decision record"],
        controls: ["Messages reflect the recorded decision only"],
        metrics: ["Candidate response rate", "Candidate experience"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs4",
        name: "Human selection point",
        proceedCondition:
          "Nothing advances or is rejected without an accountable human decision. There is no automatic path past this gate.",
        escalateCondition:
          "Adverse impact signals or criteria disputes go to talent acquisition leadership before the process continues.",
        humanControl: "human-only",
        authorityBasis:
          "Employment decisions sit with named humans by policy and by law, irrespective of the quality of the analysis.",
      },
    ],
    aiShouldNot: [
      "Independently reject or advance candidates",
      "Infer protected characteristics",
      "Produce an overall suitability score used as a decision",
      "Make final hiring decisions",
    ],
    architectureSystems: ["ATS", "HCM", "Policy / Knowledge"],
    metrics: [
      { name: "Time to shortlist", note: "Baseline required." },
      { name: "Screening consistency between recruiters", note: "Measure against your current process." },
      { name: "Adverse impact by stage", note: "Baseline required — monitor continuously." },
      { name: "Candidate response rate", note: "Measure against your current process." },
    ],
    relatedAgents: [],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "The no-automatic-rejection boundary and evidence-summary role for AI.",
      },
    ],
  },

  {
    id: "interview-orchestration",
    number: 3,
    domain: "talent-acquisition",
    name: "Interview Orchestration & Decision Support",
    shortName: "Interview Orchestration",
    outcome:
      "Produce a timely, evidence-based hiring decision with a good candidate experience.",
    description:
      "Nearly all of the pain in interviewing is scheduling, preparation, and feedback chasing. The interviews and the decision are the work worth protecting.",
    modelType: "reference",
    aiSuitability: "Very High",
    humanJudgment: "Very High",
    eliminationOpportunity: "Very High",
    risk: "High",
    implementationComplexity: "Medium",
    currentStateSummary:
      "Scheduling ping-pong across calendars, interviewers arriving unprepared, feedback chased for days, and a decision meeting that reconstructs the evidence from memory.",
    currentStateSteps: [
      { id: "cs1", name: "Recruiter coordinates availability by email", friction: "coordination" },
      { id: "cs2", name: "Interviews rescheduled repeatedly", friction: "wait" },
      { id: "cs3", name: "Interviewers prepare ad hoc, or not at all", friction: "manual" },
      { id: "cs4", name: "Interviews conducted", friction: "value" },
      { id: "cs5", name: "Feedback chased from interviewers", friction: "coordination" },
      { id: "cs6", name: "Recruiter compiles a decision packet", friction: "manual" },
      { id: "cs7", name: "Debrief and decision", friction: "value" },
      { id: "cs8", name: "Candidate updated, often late", friction: "wait" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Scheduling ping-pong and feedback chasing",
        description: "Calendar negotiation by email and reminders for overdue feedback.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "This coordination exists only because availability and feedback state are not visible in one place. It is the single largest source of candidate delay.",
        dataRequired: [],
        systems: ["ATS"],
        risks: ["Automated scheduling that ignores interviewer load"],
        controls: ["Load and fairness constraints applied when scheduling"],
        metrics: ["Scheduling cycle time", "Recruiter coordination hours"],
      },
      {
        id: "fs2",
        name: "Schedule the interview loop",
        description:
          "Book the panel against availability, interviewer load, and candidate preference.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Scheduling is a constraint-satisfaction problem with defined rules, not an interpretive one.",
        whyNotAI: "A generated schedule is not reliable; constraints should be solved, not written.",
        whyNotHuman: "Manual coordination is the classic example of work to remove.",
        dataRequired: ["Calendars", "Panel composition rules", "Candidate availability"],
        systems: ["ATS", "Identity"],
        risks: ["Panel composition that undermines fairness"],
        controls: ["Panel rules enforced by configuration"],
        metrics: ["Time to schedule", "Reschedule rate"],
      },
      {
        id: "fs3",
        name: "Prepare interviewers",
        description:
          "Give each interviewer their focus area, competency-based questions, and the evidence already gathered so ground is not re-covered.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Tailoring preparation to a specific candidate, role, and interviewer is synthesis and personalisation work.",
        whyNotHuman: "Preparation is where interviewers most often run out of time.",
        dataRequired: ["Role criteria", "Candidate evidence", "Panel assignments"],
        systems: ["ATS"],
        risks: ["Preparation material biasing the interviewer toward a conclusion"],
        controls: ["Neutral framing; no suitability signalling in the brief"],
        metrics: ["Interview quality", "Evidence coverage"],
      },
      {
        id: "fs4",
        name: "Conduct interviews and form judgment",
        description: "The interviews themselves and the assessment each interviewer forms.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 0,
        whyClassification:
          "Assessing a person for a role involves judgment about capability, context, and fit that carries accountability.",
        whyNotAI: "Assessment of a candidate is an exercise of employment decision-making.",
        dataRequired: ["Prepared framework"],
        systems: ["ATS"],
        risks: ["Unstructured interviews producing unreliable evidence"],
        controls: ["Structured competency framework; independent scoring before debrief"],
        metrics: ["Interviewer reliability", "Quality of hire"],
      },
      {
        id: "fs5",
        name: "Synthesise feedback and identify missing evidence",
        description:
          "Consolidate panel feedback against the criteria and name what was not tested.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Consolidating several written assessments into a comparable structure and spotting untested criteria is analysis that improves the debrief.",
        whyNotHuman: "Manual packet assembly delays the decision by days.",
        dataRequired: ["Panel feedback", "Criteria coverage"],
        systems: ["ATS"],
        risks: ["Synthesis reading as a recommendation"],
        controls: ["No hiring recommendation produced; divergence preserved, not averaged"],
        metrics: ["Time to decision", "Evidence coverage"],
      },
      {
        id: "fs6",
        name: "Make the selection decision",
        description: "Decide who to hire, with accountability for the decision.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 2,
        whyClassification:
          "Hiring is a consequential employment decision with legal and cultural weight.",
        whyNotAI: "No model holds authority over who joins the organisation.",
        dataRequired: ["Synthesised evidence", "Role context"],
        systems: ["ATS"],
        risks: ["Panel deferring to the synthesis rather than their own evidence"],
        controls: ["Recorded rationale; hiring manager accountability"],
        metrics: ["Quality of hire", "Time to decision"],
      },
      {
        id: "fs7",
        name: "Keep the candidate informed",
        description: "Proactive, personalised updates at every stage.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Timely personalised communication is language work and directly drives acceptance rates.",
        whyNotHuman: "Updates are the first thing dropped when recruiters are busy.",
        dataRequired: ["Process state", "Candidate preferences"],
        systems: ["ATS"],
        risks: ["Communicating an outcome before it is decided"],
        controls: ["Messages driven by confirmed process state only"],
        metrics: ["Candidate experience", "Offer acceptance"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs5",
        name: "Debrief and decision",
        proceedCondition:
          "The panel decides. There is no automatic advancement past this point.",
        escalateCondition:
          "Significant panel divergence or thin evidence triggers an additional assessment rather than a forced decision.",
        humanControl: "human-only",
        authorityBasis: "Hiring authority is held by the hiring manager under policy.",
      },
    ],
    aiShouldNot: [
      "Score or rank candidates as a decision input",
      "Make or recommend the hiring decision",
      "Assess candidates from video or voice characteristics",
      "Communicate an outcome that has not been decided",
    ],
    architectureSystems: ["ATS", "HCM", "Identity"],
    metrics: [
      { name: "Time from application to decision", note: "Baseline required." },
      { name: "Recruiter coordination hours per hire", note: "Measure against your current process." },
      { name: "Interview evidence coverage", note: "Baseline required." },
      { name: "Offer acceptance rate", note: "Measure against your current process." },
    ],
    relatedAgents: [],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "Elimination of scheduling coordination and the human-only assessment boundary.",
      },
    ],
  },

  {
    id: "offer-creation-acceptance",
    number: 4,
    domain: "talent-acquisition",
    name: "Offer Creation & Acceptance",
    shortName: "Offer to Acceptance",
    outcome: "Deliver a compliant, competitive offer quickly and accurately.",
    description:
      "Offer mechanics are highly codified. What is not codified — negotiation and discretion on exceptions — is precisely where humans should spend their attention.",
    modelType: "reference",
    aiSuitability: "High",
    humanJudgment: "High",
    eliminationOpportunity: "High",
    risk: "High",
    implementationComplexity: "Medium",
    currentStateSummary:
      "Offer terms assembled manually, approvals chased, documents produced by hand, and the candidate left waiting during the most fragile moment of the process.",
    currentStateSteps: [
      { id: "cs1", name: "Recruiter drafts proposed terms", friction: "manual" },
      { id: "cs2", name: "Compensation validates against range", friction: "handoff" },
      { id: "cs3", name: "Approvals routed and chased", friction: "coordination" },
      { id: "cs4", name: "Offer document produced manually", friction: "manual" },
      { id: "cs5", name: "Offer delivered and explained", friction: "value" },
      { id: "cs6", name: "Negotiation", friction: "value" },
      { id: "cs7", name: "Re-approval for any change", friction: "wait" },
      { id: "cs8", name: "Signature collected and filed", friction: "manual" },
    ],
    futureStateSteps: [
      {
        id: "fs1",
        name: "Manual offer assembly and approval chasing",
        description: "Hand-built offer terms, documents, and signature follow-up.",
        classification: "eliminate",
        humanControl: "none",
        autonomyLevel: 0,
        whyClassification:
          "Offer mechanics are fully codified. Performing them manually introduces delay and error at the point where candidates are most likely to disengage.",
        dataRequired: [],
        systems: ["ATS", "HCM"],
        risks: ["Speed pressure pushing offers out before approval"],
        controls: ["Generation blocked until approval is recorded"],
        metrics: ["Offer cycle time", "Document error rate"],
      },
      {
        id: "fs2",
        name: "Apply range, equity, and approval rules",
        description:
          "Determine the permissible offer envelope from level, location, and policy.",
        classification: "deterministic",
        humanControl: "hovl",
        autonomyLevel: 5,
        whyClassification:
          "Ranges, differentials, equity guidelines, and thresholds are codified and must apply identically to everyone.",
        whyNotAI: "Offer terms must be reproducible and auditable, not generated.",
        whyNotHuman: "Manual range checking is duplicate verification.",
        dataRequired: ["Level", "Location", "Range structure", "Equity guidelines"],
        systems: ["HCM", "Payroll", "Finance"],
        risks: ["Inconsistent offers creating internal equity problems"],
        controls: ["Out-of-envelope terms cannot be generated without an approved exception"],
        metrics: ["Offer consistency", "Exception rate"],
      },
      {
        id: "fs3",
        name: "Assemble context and flag acceptance risk",
        description:
          "Bring together the candidate's stated expectations, competing situation, and process signals; identify where the offer may fall short.",
        classification: "agent",
        humanControl: "hitl",
        autonomyLevel: 2,
        whyClassification:
          "Reading the signals across a recruitment conversation and summarising acceptance risk is interpretation of unstructured context.",
        whyNotHuman:
          "The signals are scattered across notes and messages; nobody reliably reassembles them under time pressure.",
        dataRequired: ["Process notes", "Stated expectations", "Offer envelope"],
        systems: ["ATS"],
        risks: ["Risk framing used to justify inequitable premiums"],
        controls: ["Any premium must pass the standard compensation exception route"],
        metrics: ["Offer acceptance", "Decline reasons"],
      },
      {
        id: "fs4",
        name: "Decide exceptions and negotiate",
        description:
          "Exercise discretion on terms and hold the negotiation conversation.",
        classification: "human",
        humanControl: "human-only",
        autonomyLevel: 1,
        whyClassification:
          "Negotiation is a judgment-laden, relational act with direct equity consequences for existing employees.",
        whyNotAI:
          "Compensation discretion is a consequential decision that must sit with an accountable person.",
        dataRequired: ["Offer envelope", "Internal equity position", "Budget"],
        systems: ["HCM", "Finance"],
        risks: ["Ad hoc premiums damaging internal equity"],
        controls: ["Exceptions approved through compensation governance and recorded"],
        metrics: ["Exception rate", "Internal equity drift"],
      },
      {
        id: "fs5",
        name: "Generate documents and run signature",
        description: "Produce the compliant offer pack and manage execution.",
        classification: "deterministic",
        humanControl: "hitl",
        autonomyLevel: 3,
        whyClassification:
          "Contractual documents must be produced from approved terms and templates, exactly.",
        whyNotAI: "Contract language must not be generated freehand.",
        whyNotHuman: "Manual document production is slow and error-prone.",
        dataRequired: ["Approved terms", "Jurisdictional templates"],
        systems: ["ATS", "HCM", "Identity"],
        risks: ["Non-compliant terms for the jurisdiction"],
        controls: ["Jurisdictional template library; legal-reviewed clauses only"],
        metrics: ["Document error rate", "Time to signature"],
      },
      {
        id: "fs6",
        name: "Explain the offer and stay in contact",
        description:
          "Help the candidate understand the whole package and keep contact warm through to start.",
        classification: "agent",
        humanControl: "hotl",
        autonomyLevel: 4,
        whyClassification:
          "Explaining benefits, equity, and pay mechanics in plain language is exactly the kind of personalised explanation AI does well.",
        whyNotHuman:
          "Recruiters rarely have capacity to keep contact warm across the whole pre-start period.",
        dataRequired: ["Offer terms", "Benefits summary", "Start logistics"],
        systems: ["ATS", "Benefits"],
        risks: ["Explanations implying commitments not in the contract"],
        controls: ["Explanations bounded by the executed offer and published plans"],
        metrics: ["Acceptance rate", "Pre-start attrition"],
      },
    ],
    controlGates: [
      {
        id: "g1",
        afterStepId: "fs3",
        name: "Inside the envelope or an exception?",
        proceedCondition:
          "Terms inside the approved envelope proceed to document generation after the recorded approval.",
        escalateCondition:
          "Any term outside range, equity guideline, or threshold goes to compensation governance.",
        humanControl: "hitl",
        authorityBasis:
          "Compensation policy and approval thresholds define authority. Confidence in an acceptance-risk assessment grants none.",
      },
    ],
    aiShouldNot: [
      "Set or approve compensation terms",
      "Negotiate with a candidate",
      "Generate contractual language outside approved templates",
      "Commit to benefits or terms not in the executed offer",
    ],
    architectureSystems: ["ATS", "HCM", "Payroll", "Benefits", "Finance", "Identity"],
    metrics: [
      { name: "Time from decision to offer delivered", note: "Baseline required." },
      { name: "Offer acceptance rate", note: "Measure against your current process." },
      { name: "Compensation exception rate", note: "Baseline required." },
      { name: "Offer document error rate", note: "Measure against your current process." },
    ],
    relatedAgents: [
      {
        page: "compensation-change-agent",
        name: "Compensation Change Agent",
        role: "Supports control and readiness evaluation on compensation actions — it does not decide offer terms.",
      },
    ],
    sources: [
      {
        title: "Workflow decomposition and classification",
        organization: "UnfoldHR",
        type: "unfoldhr-analysis",
        supports: "The deterministic offer envelope and human-only negotiation boundary.",
      },
    ],
  },
];
