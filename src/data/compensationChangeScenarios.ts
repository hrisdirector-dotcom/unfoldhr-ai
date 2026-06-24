/**
 * Compensation / Job Change Control Agent — Scenario configuration
 *
 * Source of truth for the three Compensation / Job Change scenarios
 * rendered by the Compensation / Job Change Control Agent (BambooHR
 * Edition). Each scenario powers the queue card, the launch panel,
 * the run overlay steps, and the results / verdict surface.
 *
 * Guardrails:
 *  - UnfoldHRAI evaluates structural readiness and control posture of
 *    compensation and job-change events already entered by a human.
 *  - Do NOT imply that AI decides compensation amounts, performs pay
 *    equity adjudication, executes payroll, runs market benchmarking,
 *    or autonomously releases comp / job changes.
 *  - BambooHR captures the change event. UnfoldHRAI evaluates
 *    readiness, blockers, holds, prepared workstreams, and human
 *    accountability. Humans approve and release.
 */

export type CompVerdict = "Ready" | "Approval Required" | "Held";

export type CompEventType =
  | "Compensation Change"
  | "Promotion + Compensation"
  | "Combined Job + Compensation";

export type CompWorkstreamDomain =
  | "Payroll"
  | "Manager / HRBP"
  | "Employee Communications"
  | "Systems Coordination"
  | "Documentation / Audit";

export interface CompEmployee {
  name: string;
  title: string;
  department: string;
  location: string;
  manager: string;
  eventDate: string;
  employmentType: string;
}

export interface CompWorkstream {
  domain: CompWorkstreamDomain;
  items: string[];
}

export interface CompAccountability {
  mustApprove: string[];
  mustReview: string[];
  canRelease: string[];
}

export interface CompScenario {
  /* ---------- Identity / queue metadata ---------- */
  id: string;
  eventType: CompEventType;
  label: string;
  queueTitle: string;
  queueStatus: CompVerdict;
  queueSummary: string;

  /* ---------- Employee / event summary ---------- */
  employee: CompEmployee;
  eventSummary: string;

  /* ---------- Launch-page content ---------- */
  launchTitle: string;
  launchEventSummary: string;
  evaluationFocus: string[];
  preRunNotes: string[];

  /* ---------- Run overlay steps ---------- */
  runSteps: string[];

  /* ---------- Result payload ---------- */
  verdict: CompVerdict;
  verdictSummary: string;
  recommendedNextAction: string;
  humanReviewPosture: string;
  topReasons: string[];
  blockingConditions: string[];
  preparedWorkstreams: CompWorkstream[];
  humanAccountability: CompAccountability;
}

/* ============================================================
 * Scenario 1 — Compensation Adjustment, Ready to Progress
 * ============================================================ */
const SCENARIO_COMP_READY: CompScenario = {
  id: "comp-ready",
  eventType: "Compensation Change",
  label: "Compensation Adjustment — Ready to Progress",
  queueTitle: "Compensation Adjustment — Ready to Progress",
  queueStatus: "Ready",
  queueSummary:
    "Base-pay change is structurally clean — effective date, approvals, payroll timing and communications are aligned for release.",

  employee: {
    name: "Priya Ramaswamy",
    title: "Staff Product Designer",
    department: "Product Design",
    location: "Toronto, ON",
    manager: "Daniel Okafor",
    eventDate: "Effective · Apr 1, 2027 · Next payroll cycle",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Standard base-pay adjustment with required approvals captured and payroll cycle timing aligned ahead of the effective date.",

  launchTitle: "Compensation change — ready for control review",
  launchEventSummary:
    "Control checks pending: compensation record integrity, effective-date validity, approval completion, payroll timing readiness, and manager / employee communications preparation.",
  evaluationFocus: [
    "Compensation record completeness",
    "Effective date and event integrity",
    "Approval completion status",
    "Payroll cycle timing readiness",
    "Manager / employee communications readiness",
    "Documentation and audit posture",
  ],
  preRunNotes: [
    "No exception flags on the compensation record",
    "Manager approval captured and within configured threshold",
  ],

  runSteps: [
    "Receive compensation change event from BambooHR",
    "Review compensation record and effective-date integrity",
    "Validate approvals and payroll timing readiness",
    "Confirm communications and documentation posture",
    "Prepare compensation workstreams",
    "Publish control verdict",
  ],

  verdict: "Ready",
  verdictSummary:
    "Compensation change is ready to progress — record, effective date, approvals and payroll timing are all aligned.",
  recommendedNextAction:
    "Release prepared compensation workstreams ahead of the next payroll cycle.",
  humanReviewPosture: "Recommended (light touch)",
  topReasons: [
    "Compensation record is complete and the effective date is valid",
    "Required approval is captured and within the configured threshold",
    "Payroll cycle timing is aligned to the effective date",
  ],
  blockingConditions: [],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Pay change entry prepared for the cycle covering the effective date",
        "Pay treatment summary prepared for payroll review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "Manager talking points prepared for the comp-change conversation",
        "HRBP touchpoint outlined for post-effective check-in",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Employee compensation-change letter prepared for release",
        "Effective-date confirmation message prepared for the employee",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "Downstream HRIS sync sequence prepared for the effective date",
        "Reporting / analytics refresh window noted for the comp change",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Control verdict and supporting checks logged to the audit trail",
        "Approval and rationale summary attached to the change record",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [],
    mustReview: ["Manager confirms talking points before the conversation"],
    canRelease: [
      "HR Operations / People Ops owner releases comp workstreams ahead of the payroll cycle",
    ],
  },
};

/* ============================================================
 * Scenario 2 — Promotion + Compensation, Approval Required
 * ============================================================ */
const SCENARIO_PROMOTION_APPROVAL: CompScenario = {
  id: "promotion-approval",
  eventType: "Promotion + Compensation",
  label: "Promotion with Compensation Change — Approval Required",
  queueTitle: "Promotion with Compensation Change — Approval Required",
  queueStatus: "Approval Required",
  queueSummary:
    "Promotion and pay change are structurally valid, but the compensation delta exceeds the configured threshold — release held pending a second approver.",

  employee: {
    name: "Jordan Whitaker",
    title: "Senior Engineer → Engineering Manager",
    department: "Engineering",
    location: "Austin, TX",
    manager: "Renee Iwasaki",
    eventDate: "Effective · Mar 16, 2027 · Mid-cycle payroll",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Promotion with title and level change plus a compensation increase that exceeds the configured approval threshold. Release is held until a second approver clears the threshold control.",

  launchTitle: "Promotion + compensation — held for threshold approval",
  launchEventSummary:
    "Open control conditions: compensation delta exceeds the configured approval threshold, second approver (skip-level / HRBP / Total Rewards) still required, release hold active on payroll and communications workstreams.",
  evaluationFocus: [
    "Job change record completeness (title, level, manager)",
    "Compensation change record integrity",
    "Effective date validity",
    "Configured threshold approval posture",
    "Payroll cycle timing under approval hold",
    "Release-hold posture pending named approval",
  ],
  preRunNotes: [
    "Compensation delta exceeds the configured threshold",
    "Second approver (skip-level / HRBP / Total Rewards) is still open",
    "Payroll timing remains viable if approval clears in time",
  ],

  runSteps: [
    "Receive promotion change event from BambooHR",
    "Review job and compensation change record integrity",
    "Evaluate threshold approval posture",
    "Validate payroll timing and release conditions",
    "Prepare held workstreams pending approval",
    "Publish control verdict",
  ],

  verdict: "Approval Required",
  verdictSummary:
    "Promotion and compensation change are structurally valid, but the compensation delta exceeds the configured threshold — release is held until the second approver clears the threshold control.",
  recommendedNextAction:
    "Route to the named second approver (skip-level / HRBP / Total Rewards) to clear the threshold control, then release.",
  humanReviewPosture: "Required",
  topReasons: [
    "Job change record (title, level, manager) is complete and the effective date is valid",
    "Compensation delta exceeds the configured approval threshold",
    "Second approver is required and payroll timing remains viable if approval clears in time",
  ],
  blockingConditions: [
    "Compensation delta exceeds the configured approval threshold",
    "Second approver (skip-level / HRBP / Total Rewards) is missing",
    "Release hold is active pending threshold approval clearance",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Mid-cycle pay change entry prepared — release pending approval",
        "Pro-rata pay treatment summarized for payroll review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP routing notified that threshold approval is open",
        "Manager promotion talking points prepared — held pending approval",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Promotion announcement and comp-change letter drafted — held pending approval",
        "Effective-date confirmation message drafted — held pending approval",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "Title / level / reporting-line sync sequence staged for the effective date",
        "Org-chart and access-group updates prepared — held pending approval",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Open threshold condition and hold posture logged to the audit trail",
        "Approval routing and rationale summary prepared for the second approver",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [
      "Direct manager has approved",
      "Skip-level / HRBP / Total Rewards approver must clear the threshold control",
    ],
    mustReview: [
      "HRBP reviews promotion rationale and comp delta before release",
    ],
    canRelease: [
      "HR Operations owner releases workstreams once the threshold approval is recorded",
    ],
  },
};

/* ============================================================
 * Scenario 3 — Combined Job + Compensation, Held for Control Review
 * ============================================================ */
const SCENARIO_COMBINED_HELD: CompScenario = {
  id: "combined-held",
  eventType: "Combined Job + Compensation",
  label: "Combined Job + Compensation Change — Held for Control Review",
  queueTitle: "Combined Job + Compensation Change — Held for Control Review",
  queueStatus: "Held",
  queueSummary:
    "Multiple coupled changes on one employee landing close to the payroll lock window — release held pending HR / Total Rewards control review.",

  employee: {
    name: "Aisha N'Doye",
    title: "Director, Brand Marketing → Director, Integrated Marketing",
    department: "Marketing",
    location: "London, UK",
    manager: "Theo Hartmann → Mira Solberg",
    eventDate:
      "Effective · Feb 28, 2027 · Inside payroll lock window",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Combined workforce change event on a single employee — compensation change, job / scope change, and manager / reporting-line change — with an effective date inside the payroll lock window. Release is held pending HR / Total Rewards control review.",

  launchTitle: "Combined job + compensation change — held for control review",
  launchEventSummary:
    "Open control conditions: multiple simultaneous change types on one employee, effective date inside the payroll lock window, approval posture not fully reconciled across the combined changes, communications sequencing unresolved, systems coordination ordering not ready for release.",
  evaluationFocus: [
    "Combined-change conflict risk on a single employee",
    "Compensation + job change record alignment",
    "Effective date vs payroll cutoff / lock window",
    "Reconciled approval posture across the combined changes",
    "Manager / HRBP communications timing",
    "Systems coordination ordering risk",
  ],
  preRunNotes: [
    "Three coupled changes (comp, job, manager) on the same employee",
    "Effective date falls inside the payroll lock window",
    "Approval posture is not fully reconciled across the combined changes",
  ],

  runSteps: [
    "Receive combined change event from BambooHR",
    "Review compensation, job, and manager-change record integrity",
    "Evaluate effective-date and payroll cutoff timing risk",
    "Evaluate approval, communications, and sequencing conflicts",
    "Prepare held workstreams and operating trail",
    "Publish control verdict",
  ],

  verdict: "Held",
  verdictSummary:
    "Combined job + compensation change is held — multiple coupled changes on one employee land inside the payroll lock window with approval posture unreconciled and sequencing conflicts open. Workstreams are prepared but not releasable.",
  recommendedNextAction:
    "Convene HR / Total Rewards control review to reconcile approvals across the combined changes, resolve payroll-timing conflict, and sequence communications and systems coordination before release.",
  humanReviewPosture: "Required",
  topReasons: [
    "Three coupled changes (compensation, job / scope, manager) on the same employee",
    "Effective date falls inside the payroll lock window, creating timing risk",
    "Approval posture is not fully reconciled and communications / systems sequencing is unresolved",
  ],
  blockingConditions: [
    "Multiple simultaneous change types on one employee",
    "Effective date inside payroll lock window — timing risk",
    "Approval posture not fully reconciled across the combined changes",
    "Communications sequencing unresolved",
    "Systems coordination ordering not ready for release",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Combined pay change entry staged — held pending payroll-timing resolution",
        "Pro-rata and effective-date treatment summarized for payroll review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP briefing prepared on combined-change and timing risk",
        "Outgoing and incoming manager handoff outline prepared — held pending review",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Combined comp / role / reporting-line message drafted — held pending sequencing",
        "Team announcement drafted for the reporting-line change — held pending review",
      ],
    },
    {
      domain: "Systems Coordination",
      items: [
        "Reporting-line, access-group and org-chart update sequence staged — held pending ordering decision",
        "Downstream HRIS / analytics refresh window noted for the combined change",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Open control conditions and hold posture logged to the audit trail",
        "Operating trail prepared for the HR / Total Rewards review",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [
      "HR / Total Rewards control approver must reconcile approvals across the combined changes",
    ],
    mustReview: [
      "Payroll confirms effective-date treatment given the lock window",
      "HRBP reviews manager-change handoff and communications timing",
    ],
    canRelease: [
      "HR / Total Rewards approver releases combined workstreams once timing and sequencing are resolved",
    ],
  },
};

export const COMPENSATION_CHANGE_SCENARIOS: CompScenario[] = [
  SCENARIO_COMP_READY,
  SCENARIO_PROMOTION_APPROVAL,
  SCENARIO_COMBINED_HELD,
];
