/**
 * Leave / LOA Control Agent — Scenario configuration
 *
 * Source of truth for the three Leave / LOA scenarios rendered by the
 * Leave / LOA Control Agent (BambooHR Edition). Each scenario powers
 * the queue card, the launch panel, the run overlay steps, and the
 * results / verdict surface.
 *
 * Guardrails:
 *  - UnfoldHRAI evaluates workflow readiness and control posture only.
 *  - Do NOT imply legal leave eligibility adjudication, medical
 *    certification decisioning, disability determination, or
 *    state/federal leave law advice. Workstreams are *prepared*,
 *    never executed.
 *  - BambooHR captures the leave event. UnfoldHRAI evaluates readiness,
 *    blockers, holds, prepared workstreams, and human accountability.
 *    Humans approve, review documentation, and release the event.
 */

export type LoaVerdict = "Ready" | "Approval Required" | "Held";

export type LoaEventType = "Leave Request" | "Return / Extension";

export type LoaWorkstreamDomain =
  | "Payroll"
  | "Benefits / Leave Administration"
  | "Manager / HRBP"
  | "Employee Communications"
  | "Documentation / Audit";

export interface LoaEmployee {
  name: string;
  title: string;
  department: string;
  location: string;
  manager: string;
  eventDate: string;       // e.g. "Leave window · Mar 3 – May 26, 2027"
  employmentType: string;
}

export interface LoaWorkstream {
  domain: LoaWorkstreamDomain;
  items: string[];
}

export interface LoaAccountability {
  mustApprove: string[];
  mustReview: string[];
  canRelease: string[];
}

export interface LoaScenario {
  /* ---------- Identity / queue metadata ---------- */
  id: string;
  eventType: LoaEventType;
  label: string;
  queueTitle: string;
  queueStatus: LoaVerdict;
  queueSummary: string;

  /* ---------- Employee / event summary ---------- */
  employee: LoaEmployee;
  eventSummary: string;

  /* ---------- Launch-page content ---------- */
  launchTitle: string;
  launchEventSummary: string;
  evaluationFocus: string[];
  preRunNotes: string[];

  /* ---------- Run overlay steps ---------- */
  runSteps: string[];

  /* ---------- Result payload ---------- */
  verdict: LoaVerdict;
  verdictSummary: string;
  recommendedNextAction: string;
  humanReviewPosture: string;
  topReasons: string[];
  blockingConditions: string[];
  preparedWorkstreams: LoaWorkstream[];
  humanAccountability: LoaAccountability;
}

/* ============================================================
 * Scenario 1 — Leave Request, Ready to Progress
 * ============================================================ */
const SCENARIO_LEAVE_READY: LoaScenario = {
  id: "leave-ready",
  eventType: "Leave Request",
  label: "Leave Request — Ready to Progress",
  queueTitle: "Leave Request — Ready to Progress",
  queueStatus: "Ready",
  queueSummary:
    "Leave window, approvals, documentation and payroll posture all aligned — coverage and communications prepared for release.",

  employee: {
    name: "Hannah Becker",
    title: "Senior Account Manager",
    department: "Customer Success",
    location: "Berlin, DE",
    manager: "Marco Lindqvist",
    eventDate: "Leave window · Mar 3 – May 26, 2027",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Standard planned leave with required approvals captured and supporting documentation on file.",

  launchTitle: "Leave request — ready for control review",
  launchEventSummary:
    "Control checks pending: leave window integrity, approval completion, documentation posture, payroll / leave administration readiness, and coverage / communications preparation.",
  evaluationFocus: [
    "Leave event completeness",
    "Leave dates and event integrity",
    "Approval completion status",
    "Documentation posture",
    "Payroll and leave administration readiness",
    "Employee communications readiness",
  ],
  preRunNotes: [
    "No exception flags on the leave record",
    "Manager and HR approvals captured on the request",
  ],

  runSteps: [
    "Receive leave event from BambooHR",
    "Review leave record and date integrity",
    "Validate approvals and documentation posture",
    "Confirm payroll / leave administration readiness",
    "Prepare leave workstreams",
    "Publish control verdict",
  ],

  verdict: "Ready",
  verdictSummary:
    "Leave request is ready to progress — dates, approvals, documentation and payroll posture are all aligned.",
  recommendedNextAction:
    "Release prepared leave workstreams ahead of the leave start date.",
  humanReviewPosture: "Recommended (light touch)",
  topReasons: [
    "Leave record is complete and dates align with the approved window",
    "Manager and HR approvals are captured and documentation is on file",
    "Payroll and leave administration are aligned to the next cycle",
  ],
  blockingConditions: [],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Payroll leave entry prepared for the cycle covering the start date",
        "Pay treatment for the leave window summarized for payroll review",
      ],
    },
    {
      domain: "Benefits / Leave Administration",
      items: [
        "Leave policy assignment and accrual posture confirmed on the record",
        "Benefits continuation posture summarized for leave administration",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "Manager coverage brief prepared for the leave window",
        "HRBP touchpoint outlined for mid-leave and pre-return check-ins",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Employee leave confirmation message prepared for release",
        "Out-of-office and contact-handoff summary prepared for the team",
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
    mustReview: ["Manager confirms coverage plan for the leave window"],
    canRelease: [
      "HR Ops owner releases leave workstreams ahead of the leave start date",
    ],
  },
};

/* ============================================================
 * Scenario 2 — Leave Request, Documentation / Approval Hold
 * ============================================================ */
const SCENARIO_LEAVE_APPROVAL: LoaScenario = {
  id: "leave-approval-hold",
  eventType: "Leave Request",
  label: "Leave Request — Documentation / Approval Hold",
  queueTitle: "Leave Request — Documentation / Approval Hold",
  queueStatus: "Approval Required",
  queueSummary:
    "Leave window is structurally valid, but supporting documentation and approval posture are still open — release held until both clear.",

  employee: {
    name: "Marcus Tilden",
    title: "Engineering Manager",
    department: "Engineering",
    location: "Austin, TX",
    manager: "Renee Iwasaki",
    eventDate: "Leave window · Feb 10 – Apr 4, 2027",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Planned leave request with supporting documentation incomplete and approval still open. Release is held until both clear.",

  launchTitle: "Leave request — held for documentation / approval",
  launchEventSummary:
    "Open control conditions: documentation posture incomplete, leave approval not cleared, release hold and communications hold active on payroll / benefits workstreams.",
  evaluationFocus: [
    "Leave event completeness",
    "Supporting documentation status",
    "Manager / HR leave approval status",
    "Release-hold posture",
    "Communications hold posture",
  ],
  preRunNotes: [
    "Supporting documentation is incomplete on the record",
    "Manager / HR leave approval is still open",
    "Release and outbound communications are held pending clearance",
  ],

  runSteps: [
    "Receive leave event from BambooHR",
    "Review leave record and date integrity",
    "Evaluate documentation and approval status",
    "Apply release-hold conditions",
    "Prepare held workstreams and communications posture",
    "Publish control verdict",
  ],

  verdict: "Approval Required",
  verdictSummary:
    "Leave request is mostly ready, but supporting documentation and approval are still open — release is held until both clear.",
  recommendedNextAction:
    "Complete supporting documentation and clear the open leave approval to release the request.",
  humanReviewPosture: "Required",
  topReasons: [
    "Leave dates and event structure are largely complete",
    "Supporting documentation is incomplete on the record",
    "Manager / HR leave approval is still open and the communications hold is active",
  ],
  blockingConditions: [
    "Supporting documentation is missing or incomplete",
    "Leave approval is not complete",
    "Release hold is active pending documentation / approval clearance",
    "Outbound communications are held pending approval",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Payroll leave entry prepared — release pending approval",
        "Pay treatment for the leave window staged for payroll review",
      ],
    },
    {
      domain: "Benefits / Leave Administration",
      items: [
        "Leave policy assignment confirmed — release pending documentation",
        "Benefits continuation posture staged for leave administration review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP routing notified that documentation / approval is open",
        "Manager coverage brief prepared — held pending approval",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Employee confirmation message drafted — held pending approval",
        "Team handoff summary drafted — held pending approval",
      ],
    },
    {
      domain: "Documentation / Audit",
      items: [
        "Open control conditions and hold posture logged to the audit trail",
        "Documentation gap summarized for the reviewing approver",
      ],
    },
  ],
  humanAccountability: {
    mustApprove: [
      "Manager / HR approver must clear the open leave approval",
    ],
    mustReview: [
      "HRBP reviews supporting documentation before release",
    ],
    canRelease: [
      "HR Ops owner releases leave workstreams once documentation and approval clear",
    ],
  },
};

/* ============================================================
 * Scenario 3 — Return-to-Work / Extension, Held for Control Review
 * ============================================================ */
const SCENARIO_RETURN_HELD: LoaScenario = {
  id: "return-held",
  eventType: "Return / Extension",
  label: "Return-to-Work / Extension — Held for Control Review",
  queueTitle: "Return-to-Work / Extension — Held for Control Review",
  queueStatus: "Held",
  queueSummary:
    "Return / extension release conditions unresolved — payroll, benefits and communications workstreams held pending HR / control review.",

  employee: {
    name: "Aisha N'Doye",
    title: "Director, Brand Marketing",
    department: "Marketing",
    location: "London, UK",
    manager: "Theo Hartmann",
    eventDate: "Planned return · Apr 28, 2027 · Extension under review",
    employmentType: "Full-time · Salaried",
  },
  eventSummary:
    "Return-to-work event with a possible extension flagged. Documentation, payroll / benefits coordination, HR control review and communications timing are unresolved.",

  launchTitle: "Return / extension event — held for control review",
  launchEventSummary:
    "Open control conditions: return-to-work / extension posture unresolved, return documentation incomplete, payroll / benefits coordination not releasable, HR / control review open, communications hold active.",
  evaluationFocus: [
    "Return / extension event integrity",
    "Return date and extension detail clarity",
    "Documentation completeness for the return event",
    "Payroll / benefits coordination readiness",
    "Manager / HRBP communications timing",
    "HR / control review status",
  ],
  preRunNotes: [
    "Return / extension details are not fully resolved on the record",
    "Payroll / benefits coordination is still in progress",
    "Communications are held pending HR / control review",
  ],

  runSteps: [
    "Receive leave update from BambooHR",
    "Review return / extension event integrity",
    "Evaluate documentation and return / extension details",
    "Evaluate payroll / benefits / communications readiness",
    "Prepare held workstreams and operating trail",
    "Publish control verdict",
  ],

  verdict: "Held",
  verdictSummary:
    "Return-to-work / extension event is held — return posture, documentation, payroll / benefits coordination and HR / control review are unresolved, and the communications hold remains active. Workstreams are prepared but not releasable.",
  recommendedNextAction:
    "Resolve return / extension posture and documentation, complete payroll / benefits coordination, then clear HR / control review before releasing the communications hold.",
  humanReviewPosture: "Required",
  topReasons: [
    "Return / extension details are not fully resolved on the record",
    "Return documentation is incomplete and payroll / benefits coordination is open",
    "HR / control review is incomplete and the communications hold is still active",
  ],
  blockingConditions: [
    "Return / extension details are unresolved",
    "Documentation or return materials are incomplete",
    "Payroll / benefits coordination is not complete",
    "HR / control review is still open",
    "Communications hold is active",
  ],
  preparedWorkstreams: [
    {
      domain: "Payroll",
      items: [
        "Return-cycle payroll entry prepared — held pending review",
        "Pay treatment transition staged for payroll review",
      ],
    },
    {
      domain: "Benefits / Leave Administration",
      items: [
        "Benefits continuation / reinstatement posture staged for review",
        "Leave administration close-out checklist prepared — held pending review",
      ],
    },
    {
      domain: "Manager / HRBP",
      items: [
        "HRBP briefing prepared on the open control conditions",
        "Manager return-planning outline prepared — held pending review",
      ],
    },
    {
      domain: "Employee Communications",
      items: [
        "Employee return / extension message drafted — held under communications hold",
        "Team re-onboarding note drafted — held pending review",
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
      "HR / control approver must clear the open return / extension conditions",
    ],
    mustReview: [
      "Payroll and benefits / leave administration confirm coordination is complete",
      "HRBP reviews the return / extension posture and communications timing",
    ],
    canRelease: [
      "HR / control approver releases the communications hold and return workstreams",
    ],
  },
};

export const LEAVE_CONTROL_SCENARIOS: LoaScenario[] = [
  SCENARIO_LEAVE_READY,
  SCENARIO_LEAVE_APPROVAL,
  SCENARIO_RETURN_HELD,
];
