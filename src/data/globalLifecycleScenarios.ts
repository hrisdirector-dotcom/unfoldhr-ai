/**
 * Global Lifecycle Agent — Scenario configuration
 *
 * Source of truth for the three lifecycle scenarios rendered by the
 * Global Lifecycle Agent (BambooHR Edition). Each scenario powers the
 * queue card, the launch panel, the run overlay steps, and the
 * results / verdict surface.
 *
 * Guardrails:
 *  - These are configured controls, not claims about BambooHR's own
 *    governance capabilities.
 *  - Do not imply UnfoldHRAI knows the underlying reason for a
 *    termination, or that legal decisions or cross-system execution
 *    are automated. Workstreams are *prepared*, not executed.
 */

export type LifecycleVerdict = "Ready" | "Approval Required" | "Held";

export type LifecycleEventType = "New Hire" | "Termination";

export type WorkstreamDomain =
  | "Payroll"
  | "Manager / HRBP"
  | "Employee Communications"
  | "Systems Coordination"
  | "Documentation / Audit";

export interface LifecycleEmployee {
  name: string;
  title: string;
  department: string;
  location: string;
  manager: string;
  eventDate: string;       // e.g. "Start date · Jan 6, 2027"
  employmentType: string;
}

export interface LifecycleWorkstream {
  domain: WorkstreamDomain;
  items: string[];
}

export interface LifecycleAccountability {
  mustApprove: string[];
  mustReview: string[];
  canRelease: string[];
}

export interface LifecycleScenario {
  /* ---------- Identity / queue metadata ---------- */
  id: string;
  eventType: LifecycleEventType;
  label: string;             // canonical scenario label
  queueTitle: string;        // short headline shown in queue card
  queueStatus: LifecycleVerdict;
  queueSummary: string;      // one-line cue shown in queue card

  /* ---------- Employee / event summary ---------- */
  employee: LifecycleEmployee;
  eventSummary: string;      // short narrative of the event

  /* ---------- Launch-page content ---------- */
  launchTitle: string;
  launchEventSummary: string;
  evaluationFocus: string[];     // "what the agent will evaluate"
  preRunNotes: string[];         // known flags / pre-run notes (may be empty)

  /* ---------- Run overlay steps ---------- */
  runSteps: string[];

  /* ---------- Result payload ---------- */
  verdict: LifecycleVerdict;
  verdictSummary: string;        // single sentence
  recommendedNextAction: string; // one short sentence
  humanReviewPosture: string;    // e.g. "Required", "Recommended"
  topReasons: string[];          // 1–3 reasons the verdict was reached
  blockingConditions: string[];  // empty array => "no active blocking conditions"
  preparedWorkstreams: LifecycleWorkstream[];
  humanAccountability: LifecycleAccountability;
}

/* ============================================================
 * Scenario 1 — New Hire, Ready to Progress
 * ============================================================ */
const SCENARIO_HIRE_READY: LifecycleScenario = {
  id: "hire-ready",
  eventType: "New Hire",
  label: "New Hire — Ready to Progress",
  queueTitle: "New Hire — Ready to Progress",
  queueStatus: "Ready",
  queueSummary:
    "Clean new hire. Worker record, org placement, PTO and payroll readiness all aligned.",

  employee: {
    name: "Amelia Rhodes",
    title: "Product Designer",
    department: "Design",
    location: "Remote — United Kingdom",
    manager: "Jonas Eriksen",
    eventDate: "Start date · Jan 6, 2027",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Standard remote new hire onboarding into Design (UK). No exception flags on the record.",

  launchTitle: "New hire onboarding — ready for control review",
  launchEventSummary:
    "Worker record, org placement, PTO assignment and payroll readiness all appear aligned. Run the agent to confirm release readiness.",
  evaluationFocus: [
    "Worker record integrity",
    "Start-date and org placement integrity",
    "PTO assignment readiness",
    "Payroll readiness for next cycle",
    "Manager readiness",
    "Release readiness",
  ],
  preRunNotes: [
    "No exception flags on the record",
    "Standard remote onboarding path",
  ],

  runSteps: [
    "Receive event from BambooHR",
    "Review worker record and org placement",
    "Validate PTO and payroll readiness",
    "Evaluate approval and release conditions",
    "Prepare onboarding workstreams",
    "Publish control verdict",
  ],

  verdict: "Ready",
  verdictSummary:
    "New hire is ready to progress — worker record, PTO, payroll and manager readiness are all aligned.",
  recommendedNextAction:
    "Release onboarding workstreams on the scheduled start date.",
  humanReviewPosture: "Recommended (light touch)",
  topReasons: [
    "Worker record is complete and aligned to org placement",
    "PTO policy assignment and payroll readiness confirmed for the next cycle",
    "Manager has acknowledged pre-boarding and required approvals are clean",
  ],
  blockingConditions: [],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Payroll onboarding entry prepared for cycle starting Jan 1",
        "Tax / banking profile flagged as complete on the worker record",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "Manager kickoff draft prepared for release on start date",
        "First-week 1:1 cadence outline prepared for manager review",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Welcome message draft prepared for release on start date",
        "Pre-boarding logistics summary prepared for the new hire",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "First-week calendar hold prepared for handoff",
        "Day-1 access requirements summarized for IT coordination",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Control verdict and supporting checks logged to the audit trail",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [],
    mustReview: ["Hiring manager confirms pre-boarding plan"],
    canRelease: ["HR Ops owner releases onboarding workstreams on start date"],
  },
};

/* ============================================================
 * Scenario 2 — New Hire, Compensation / Threshold Approval Hold
 * ============================================================ */
const SCENARIO_HIRE_APPROVAL: LifecycleScenario = {
  id: "hire-approval-hold",
  eventType: "New Hire",
  label: "New Hire — Compensation / Threshold Approval Hold",
  queueTitle: "New Hire — Compensation / Threshold Approval Hold",
  queueStatus: "Approval Required",
  queueSummary:
    "Hire is structurally ready, but a configured compensation / threshold approval is still open.",

  employee: {
    name: "Priya Kumar",
    title: "Director, Data Platform",
    department: "Engineering",
    location: "Toronto, CA",
    manager: "Will Okafor",
    eventDate: "Start date · Dec 30, 2026",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Director-level hire whose compensation falls above a configured approval threshold. Release is held until that approval clears.",

  launchTitle: "New hire onboarding — held for compensation approval",
  launchEventSummary:
    "Worker record and payroll readiness look mostly complete, but a configured compensation / threshold approval is still open and the event cannot be released until that approval clears.",
  evaluationFocus: [
    "Worker record integrity",
    "Payroll readiness",
    "Configured compensation / threshold approval",
    "Release-hold posture",
    "Communications hold posture",
  ],
  preRunNotes: [
    "Compensation falls above a configured approval threshold",
    "Release is held until the configured approval clears",
  ],

  runSteps: [
    "Receive event from BambooHR",
    "Review worker record and org placement",
    "Validate PTO and payroll readiness",
    "Evaluate approval and release conditions",
    "Prepare onboarding workstreams",
    "Publish control verdict",
  ],

  verdict: "Approval Required",
  verdictSummary:
    "New hire is mostly ready, but a configured compensation / threshold approval is still open — release is held until it clears.",
  recommendedNextAction:
    "Clear the configured compensation / threshold approval to release the hire.",
  humanReviewPosture: "Required",
  topReasons: [
    "Worker record and payroll readiness are largely complete",
    "Compensation falls above a configured approval threshold",
    "Release and outbound communications are held pending that approval",
  ],
  blockingConditions: [
    "Configured compensation / threshold approval is still open",
    "Release hold is active until the approval clears",
    "Outbound communications are held pending approval",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Payroll onboarding entry prepared — release pending approval",
        "Compensation profile staged at submitted level for review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP routing notified that the configured approval is open",
        "Manager kickoff draft prepared — held pending approval",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Welcome message draft prepared — held pending approval",
        "Pre-boarding logistics summary prepared — held pending approval",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "First-week calendar hold prepared — release deferred",
        "Day-1 access requirements summarized — deferred until release clears",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Approval-required verdict and open condition logged to the audit trail",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [
      "Configured threshold approver(s) must clear the compensation condition",
    ],
    mustReview: ["HRBP reviews the open approval before release"],
    canRelease: [
      "HR Ops owner releases onboarding workstreams once the approval clears",
    ],
  },
};

/* ============================================================
 * Scenario 3 — Termination, Held for Control Review
 * ============================================================ */
const SCENARIO_TERM_HELD: LifecycleScenario = {
  id: "term-held",
  eventType: "Termination",
  label: "Termination — Held for Control Review",
  queueTitle: "Termination — Held for Control Review",
  queueStatus: "Held",
  queueSummary:
    "Separation event with multiple unresolved control conditions — workstreams are held pending review.",

  employee: {
    name: "Devon Pierce",
    title: "VP Finance",
    department: "Finance",
    location: "New York, NY",
    manager: "Sasha Bloom (CFO)",
    eventDate: "Final working day · Dec 22, 2026",
    employmentType: "Full-time · Executive",
  },
  eventSummary:
    "Separation event flagged for control review. Final pay, PTO payout, and HR / control approval are unresolved, and communications are on hold.",

  launchTitle: "Separation event — held for control review",
  launchEventSummary:
    "Final pay, PTO payout handling, and HR / control approval are unresolved. Communications are held and offboarding coordination is held pending review.",
  evaluationFocus: [
    "Separation event integrity",
    "Final pay readiness",
    "PTO payout handling",
    "HR / control approval status",
    "Communications timing hold",
    "Offboarding coordination hold",
  ],
  preRunNotes: [
    "Final pay treatment is under review",
    "Communications are held pending control review",
    "Offboarding coordination is held pending control review",
  ],

  runSteps: [
    "Receive event from BambooHR",
    "Review separation record and control path",
    "Evaluate final pay and PTO payout readiness",
    "Evaluate approval and communications hold conditions",
    "Prepare offboarding workstreams and operating trail",
    "Publish control verdict",
  ],

  verdict: "Held",
  verdictSummary:
    "Separation event is held — final pay, PTO payout, and HR / control approval are unresolved, and communications remain on hold.",
  recommendedNextAction:
    "Resolve final pay and PTO payout review, then obtain HR / control release approval.",
  humanReviewPosture: "Required",
  topReasons: [
    "Final pay treatment has not been resolved",
    "PTO payout handling is unresolved",
    "HR / control approval is incomplete and the communications hold is still active",
  ],
  blockingConditions: [
    "Final pay review is unresolved",
    "PTO payout handling is unresolved",
    "HR / control approval is incomplete",
    "Communications hold is active",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Final pay worksheet prepared for payroll review",
        "PTO payout calculation staged for HR / payroll review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP briefing prepared on the open control conditions",
        "Manager handoff outline prepared — held pending review",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Separation communications drafted — held under communications hold",
        "Internal team notification drafted — held pending review",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "Access offboarding checklist prepared — held pending review",
        "Asset return summary prepared — held pending review",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Open control conditions and hold posture logged to the audit trail",
        "Operating trail prepared for the reviewing approver",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [
      "HR / control approver must clear the open control conditions",
    ],
    mustReview: [
      "Payroll reviews final pay and PTO payout",
      "HRBP reviews the separation and communications posture",
    ],
    canRelease: [
      "HR / control approver releases the communications and offboarding holds",
    ],
  },
};

export const GLOBAL_LIFECYCLE_SCENARIOS: LifecycleScenario[] = [
  SCENARIO_HIRE_READY,
  SCENARIO_HIRE_APPROVAL,
  SCENARIO_TERM_HELD,
];
