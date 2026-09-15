/**
 * UnfoldHR Work Design Framework — reference workflow model.
 *
 * These structures describe the UnfoldHR *reference* model for a workflow.
 * A future organization-specific layer (customer current state, gap analysis,
 * proposed design) is expected to sit alongside this, not replace it — hence
 * `modelType` and the deliberately additive shape.
 */

export type Classification = "eliminate" | "human" | "deterministic" | "agent";

export type HumanControl = "hitl" | "hotl" | "hovl" | "human-only" | "none";

export type AutonomyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type Rating =
  | "Medium"
  | "Medium-High"
  | "High"
  | "Very High"
  | "Extreme";

export type DomainId =
  | "talent-acquisition"
  | "employee-lifecycle"
  | "hr-service-delivery"
  | "payroll-time-benefits"
  | "talent-development"
  | "rewards"
  | "workforce-planning"
  | "exit";

export type SystemRole =
  | "HCM"
  | "Payroll"
  | "WFM"
  | "ATS"
  | "Benefits"
  | "LMS"
  | "Identity"
  | "Finance"
  | "Policy / Knowledge"
  | "Case Management";

/** A step in the typical (not universal) current-state process. */
export interface CurrentStateStep {
  id: string;
  name: string;
  /** What this step actually costs the organization or the employee. */
  friction: "manual" | "handoff" | "wait" | "coordination" | "value";
  note?: string;
}

/** A step in the redesigned, agentic future state. */
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  classification: Classification;
  humanControl: HumanControl;
  autonomyLevel: AutonomyLevel;
  /** Why this actor — the defensible reasoning, not a label. */
  whyClassification: string;
  /** Required for human + deterministic steps. */
  whyNotAI?: string;
  /** Required for agent + deterministic steps. */
  whyNotHuman?: string;
  dataRequired: string[];
  systems: SystemRole[];
  risks: string[];
  controls: string[];
  metrics: string[];
}

/** An explicit, visible boundary on agent authority inside the flow. */
export interface ControlGate {
  id: string;
  /** Rendered immediately after this future-state step. */
  afterStepId: string;
  name: string;
  proceedCondition: string;
  escalateCondition: string;
  humanControl: HumanControl;
  /** Authority derives from policy and risk class — never model confidence. */
  authorityBasis: string;
}

export interface WorkflowMetric {
  name: string;
  /** Always a baseline instruction, never a fabricated benchmark. */
  note: string;
}

export interface RelatedAgent {
  /** Page-state route used by the existing navigation. */
  page: string;
  name: string;
  /** What part of the workflow the agent participates in — it never owns it. */
  role: string;
}

export interface WorkflowSource {
  title: string;
  organization: string;
  url?: string;
  date?: string;
  type: "research" | "practitioner" | "unfoldhr-analysis";
  note?: string;
  supports?: string;
}

export interface Workflow {
  id: string;
  number: number;
  domain: DomainId;
  name: string;
  shortName: string;
  outcome: string;
  description: string;
  modelType: "reference";
  aiSuitability: Rating;
  humanJudgment: Rating;
  eliminationOpportunity: Rating;
  risk: Rating;
  implementationComplexity: Rating;
  currentStateSummary: string;
  currentStateSteps: CurrentStateStep[];
  futureStateSteps: WorkflowStep[];
  controlGates: ControlGate[];
  aiShouldNot: string[];
  architectureSystems: SystemRole[];
  metrics: WorkflowMetric[];
  relatedAgents: RelatedAgent[];
  sources: WorkflowSource[];
}
