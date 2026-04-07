export interface Agent {
  id: string;
  icon: string;
  iconBg: string;
  name: string;
  outcome: string;
  bullets: string[];
  category: string;
  valueStatement: string;
  supportingInsight: string;
  access: "public" | "admin";
  viewable: boolean;
  runnable: boolean;
  briefData: {
    scenario: string;
    contextLine: string;
    primaryTitle: string;
    summary?: string;
    primaryItems: { label: string; value: string }[];
    secondaryTitle: string;
    secondaryItems: { label: string; value: string }[];
    observations?: { text: string }[];
    insights: { text: string }[];
    confidence?: { level: string; reason: string };
  };
  businessContext: string[];
  howItWorks: string[];
  whatYouGet: string[];
  executionRisks: string[];
}

export const AGENTS: Agent[] = [
  {
    id: "workforce-planning",
    icon: "🏗️",
    iconBg: "#eef4f0",
    name: "Workforce Planning",
    outcome: "Plan headcount with clear hiring priorities and risk visibility.",
    bullets: [
      "Headcount scenarios by quarter",
      "Budget-aligned hiring plans",
      "Risk flags before execution",
    ],
    category: "Workforce",
    valueStatement: "Turn headcount planning from reactive guesswork into a structured, data-driven recommendation.",
    supportingInsight: "This recommendation reflects current workforce composition, projected growth targets, and budget constraints. The agent models multiple scenarios and surfaces risks before they become problems.",
    access: "public",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Workforce Planning",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Recommended Hiring Approach",
      summary: "Hiring should prioritize revenue-generating roles early, with supporting functions phased in as operational demand increases.",
      primaryItems: [
        { label: "Revenue roles", value: "Prioritize early to support growth targets" },
        { label: "Technical roles", value: "Phase in to avoid capacity bottlenecks" },
        { label: "Support functions", value: "Scale in alignment with workforce growth" },
      ],
      secondaryTitle: "Hiring Timeline",
      secondaryItems: [
        { label: "Early phase", value: "Focus on revenue roles to accelerate growth" },
        { label: "Mid phase", value: "Expand technical capacity for delivery and scale" },
        { label: "Later phase", value: "Add operational support aligned to demand" },
      ],
      observations: [
        { text: "Growth targets require early investment in revenue roles to avoid lag" },
        { text: "Hiring delays in key roles may create downstream capacity constraints" },
        { text: "Budget sensitivity may limit ability to hire ahead of demand" },
      ],
      insights: [
        { text: "Delays in hiring may impact revenue realization timing" },
        { text: "Over-hiring early may create cost pressure if growth slows" },
        { text: "Candidate availability may limit speed of execution in key roles" },
      ],
      confidence: { level: "Medium", reason: "This plan is based on modeled workforce planning patterns aligned to your selected inputs, not actual organizational data." },
    },
    businessContext: [
      "Current workforce composition and department ratios",
      "Growth target set by leadership",
      "Hiring budget requiring prioritization across functions",
    ],
    howItWorks: [
      "Analyzes current workforce composition and department ratios",
      "Models hiring scenarios against budget and growth constraints",
      "Generates a prioritized plan with timeline and risk assessment",
    ],
    whatYouGet: [
      "Structured headcount approach by department and phase",
      "Budget-aligned hiring timeline",
      "Prioritized risk assessment with mitigation recommendations",
    ],
    executionRisks: [
      "Hiring depends on updated job descriptions and recruiter capacity",
      "Capacity may require contractor support if attrition exceeds forecast",
      "Budget reallocation needed if market compensation shifts significantly",
    ],
  },
  {
    id: "recruiting-ats",
    icon: "🔍",
    iconBg: "#eef2ff",
    name: "Recruiting & Screening",
    outcome: "Move candidates forward faster with structured screening decisions.",
    bullets: [
      "Candidate ranking and summaries",
      "Role-fit gap analysis",
      "Interview recommendations",
    ],
    category: "Workforce",
    valueStatement: "Help recruiters spend less time on admin and more time building relationships with top candidates.",
    supportingInsight: "The agent summarizes resumes against role requirements, drafts personalized outreach, and generates pipeline health reports — all without manual data pulls.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Recruiting Pipeline",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Pipeline Health Summary",
      primaryItems: [
        { label: "Screening status", value: "Candidates ranked by role fit" },
        { label: "Recommended to advance", value: "Top-ranked candidates identified" },
        { label: "On hold", value: "Candidates flagged for further review" },
      ],
      secondaryTitle: "Stage Insights",
      secondaryItems: [
        { label: "Top of funnel", value: "Sourcing volume may need adjustment" },
        { label: "Mid funnel", value: "Conversion signals are strong" },
        { label: "Late stage", value: "Candidates at risk of drop-off due to delays" },
      ],
      insights: [
        { text: "Strong mid-funnel conversion suggests effective screening criteria" },
        { text: "Candidates stalling in late stages may indicate process bottlenecks" },
      ],
    },
    businessContext: [
      "Active requisitions requiring structured candidate evaluation",
      "Applications received requiring screening and ranking",
      "Hiring manager expects shortlist within defined timeline",
    ],
    howItWorks: [
      "Screens resumes against role requirements and generates structured summaries",
      "Drafts personalized outreach for high-match passive candidates",
      "Produces pipeline reports with stage-level insights",
    ],
    whatYouGet: [
      "Candidate screening summaries with role-fit analysis",
      "Personalized outreach drafts ready to send",
      "Pipeline health reports with action recommendations",
    ],
    executionRisks: [
      "Screening accuracy depends on clarity of job requirements",
      "Outreach personalization requires current candidate data from ATS",
    ],
  },
  {
    id: "employee-listening",
    icon: "💬",
    iconBg: "#eef2ff",
    name: "Employee Listening",
    outcome: "Turn employee feedback into clear manager action.",
    bullets: [
      "Sentiment and theme analysis",
      "Team-level summaries",
      "Action plans for managers",
    ],
    category: "Talent",
    valueStatement: "Transform engagement survey data into specific, measurable action plans for every manager.",
    supportingInsight: "The agent classifies sentiment across open-text responses, maps themes to engagement dimensions, and generates tailored action plans grounded in what employees actually said.",
    access: "public",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Employee Engagement",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Engagement Action Plans",
      primaryItems: [
        { label: "Teams flagged", value: "Teams with declining signals identified" },
        { label: "Action plans", value: "Manager-level plans generated" },
        { label: "Top concern", value: "Most prominent theme surfaced" },
      ],
      secondaryTitle: "Sentiment Patterns",
      secondaryItems: [
        { label: "Positive", value: "Majority of responses signal satisfaction" },
        { label: "Neutral", value: "A portion of responses indicate ambivalence" },
        { label: "Negative", value: "Concentrated concerns in specific teams" },
      ],
      insights: [
        { text: "Declining trends in manager relationship signals warrant attention" },
        { text: "Career growth concerns concentrated in mid-level roles" },
      ],
    },
    businessContext: [
      "Engagement survey across multiple teams",
      "Open-text responses requiring analysis",
      "Leadership expects manager-level action plans",
    ],
    howItWorks: [
      "Ingests survey data and classifies every open-text response",
      "Tags sentiment and maps to engagement dimensions",
      "Generates specific action plans per manager",
    ],
    whatYouGet: [
      "Sentiment analysis across all survey responses",
      "Theme-tagged insights by team and dimension",
      "Manager-ready action plans with measurable outcomes",
    ],
    executionRisks: [
      "Action plan effectiveness depends on manager follow-through",
      "Low response rates in some teams may limit confidence",
    ],
  },
  {
    id: "learning-development",
    icon: "🎓",
    iconBg: "#fff8ee",
    name: "Learning & Development",
    outcome: "Build personalized development plans tied to real skill gaps.",
    bullets: [
      "Skill gap identification",
      "Role-based learning paths",
      "Manager-supported development plans",
    ],
    category: "Talent",
    valueStatement: "Close skill gaps faster with curated learning paths tailored to each employee's role and career goals.",
    supportingInsight: "The agent maps current competencies against role frameworks, identifies priority gaps, and curates content from your existing LMS — with completion nudges built in.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Skill Development",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Personalized Development Path",
      primaryItems: [
        { label: "Priority 1", value: "Highest-impact skill gap for current role" },
        { label: "Priority 2", value: "Communication and leadership readiness" },
        { label: "Priority 3", value: "Stakeholder management capability" },
      ],
      secondaryTitle: "Delivery Schedule",
      secondaryItems: [
        { label: "Phase 1", value: "Core skill development" },
        { label: "Phase 2", value: "Advanced capability building" },
        { label: "Phase 3", value: "Application and review" },
      ],
      insights: [
        { text: "Highest-impact gap identified based on role competency framework" },
        { text: "Automated reminders scheduled to drive completion" },
      ],
    },
    businessContext: [
      "Employees on promotion or development tracks",
      "Skill gaps identified against role competency framework",
      "Existing LMS catalog with relevant courses",
    ],
    howItWorks: [
      "Pulls employee profile, role level, and career goals",
      "Compares current skills against target competency framework",
      "Curates and schedules content with automated reminders",
    ],
    whatYouGet: [
      "Personalized development plan",
      "Priority-ranked skill gap analysis",
      "Automated completion nudges via Slack or email",
    ],
    executionRisks: [
      "Learning path effectiveness depends on content quality in LMS",
      "Manager support needed for protected learning time",
    ],
  },
  {
    id: "performance-management",
    icon: "🎯",
    iconBg: "#eef4f0",
    name: "Performance Management",
    outcome: "Bring structure and consistency to performance decisions.",
    bullets: [
      "Goal and feedback analysis",
      "Coaching guidance",
      "Performance risk signals",
    ],
    category: "Talent",
    valueStatement: "Make review cycles faster, fairer, and more consistent across every manager in your organization.",
    supportingInsight: "The agent drafts review narratives from goal data, peer feedback, and manager notes — then scans rating distributions to flag bias patterns before calibration sessions.",
    access: "public",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Performance Review",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Review Cycle Readiness Summary",
      primaryItems: [
        { label: "Reviews", value: "Narratives drafted for review" },
        { label: "Goal health", value: "Stale goals flagged for update" },
        { label: "Calibration signals", value: "Anomalies identified for review" },
      ],
      secondaryTitle: "Patterns Detected",
      secondaryItems: [
        { label: "Rating consistency", value: "Some managers show inflation patterns" },
        { label: "Goal staleness", value: "Goals without recent updates flagged" },
        { label: "Org-wide", value: "Distribution patterns warrant calibration review" },
      ],
      insights: [
        { text: "Rating patterns suggest calibration review is needed before finalization" },
        { text: "Stale goals should be reviewed and updated before the cycle closes" },
      ],
    },
    businessContext: [
      "Performance cycle across multiple departments",
      "Employees require review narratives",
      "Calibration session approaching",
    ],
    howItWorks: [
      "Ingests goal completion data, peer feedback themes, and manager notes",
      "Drafts balanced, specific review narratives per employee",
      "Scans rating distributions for calibration anomalies",
    ],
    whatYouGet: [
      "Draft review narratives ready for manager review",
      "Goal health assessment with staleness flags",
      "Pre-calibration anomaly report for HRBPs",
    ],
    executionRisks: [
      "Review quality depends on completeness of manager notes and peer feedback",
      "Calibration flags may surface sensitive conversations requiring HR mediation",
    ],
  },
  {
    id: "onboarding",
    icon: "🚀",
    iconBg: "#fff8ee",
    name: "Onboarding",
    outcome: "Ensure every new hire starts fully prepared and aligned.",
    bullets: [
      "Cross-functional onboarding tasks",
      "30-60-90 day plans",
      "Role-specific milestones",
    ],
    category: "Workforce",
    valueStatement: "Make every new hire's first 90 days structured, personal, and consistently excellent.",
    supportingInsight: "The agent generates role-specific onboarding plans, matches buddies based on team and experience, and schedules milestone check-ins — reducing manual coordination across HR, IT, and managers.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "New Hire Onboarding",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Onboarding Plan Summary",
      primaryItems: [
        { label: "Pre-arrival", value: "Tasks assigned to relevant teams" },
        { label: "Week 1", value: "Orientation activities scheduled" },
        { label: "30-day milestones", value: "Checkpoints defined" },
      ],
      secondaryTitle: "Buddy Match",
      secondaryItems: [
        { label: "Recommended", value: "Matched based on team and role similarity" },
        { label: "Rationale", value: "Same team, similar role trajectory" },
      ],
      insights: [
        { text: "IT provisioning request should be submitted before start date" },
        { text: "Manager 1:1 should be scheduled for Day 1" },
      ],
    },
    businessContext: [
      "New hire starting with cross-functional dependencies",
      "IT, Facilities, and team coordination required",
      "Manager expects structured 30-60-90 day plan",
    ],
    howItWorks: [
      "Generates role-specific onboarding checklist with responsible parties",
      "Matches buddy based on team, role similarity, and availability",
      "Schedules 30-60-90 day check-in sequences automatically",
    ],
    whatYouGet: [
      "Personalized onboarding checklist by week",
      "Buddy match recommendation with rationale",
      "Automated milestone check-in messages",
    ],
    executionRisks: [
      "IT provisioning delays may impact Day 1 readiness",
      "Buddy availability should be confirmed before assignment",
    ],
  },
  {
    id: "compliance",
    icon: "⚖️",
    iconBg: "#eef4f0",
    name: "Compliance & Policy",
    outcome: "Identify compliance risks early and take action faster.",
    bullets: [
      "Policy gap detection",
      "Regulatory change tracking",
      "Action workflow recommendations",
    ],
    category: "Compliance",
    valueStatement: "Reduce compliance risk by detecting policy gaps and surfacing regulatory changes before they become problems.",
    supportingInsight: "The agent monitors regulatory updates, audits your policy library against best practices, and generates acknowledgment workflows — keeping your organization compliant without constant manual review.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Compliance Review",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Policy Audit Summary",
      primaryItems: [
        { label: "Policies reviewed", value: "Full policy library assessed" },
        { label: "Gaps identified", value: "Critical and medium-priority gaps flagged" },
        { label: "Updates needed", value: "Policies requiring revision identified" },
      ],
      secondaryTitle: "Priority Actions",
      secondaryItems: [
        { label: "Critical", value: "Regulatory compliance gaps requiring immediate action" },
        { label: "High", value: "Policy updates needed for recent changes" },
        { label: "Medium", value: "Language clarifications recommended" },
      ],
      insights: [
        { text: "Recent regulatory changes require policy updates in affected jurisdictions" },
        { text: "Some policies have low acknowledgment rates and need follow-up" },
      ],
    },
    businessContext: [
      "Multi-state employer with active HR policies",
      "Ongoing compliance audit cycle",
      "Recent regulatory changes in multiple jurisdictions",
    ],
    howItWorks: [
      "Monitors regulatory updates across relevant jurisdictions",
      "Audits policy library against best practices and legal requirements",
      "Generates acknowledgment workflows with reminder sequences",
    ],
    whatYouGet: [
      "Policy gap analysis with priority ratings",
      "Regulatory change impact assessment",
      "Automated acknowledgment and escalation workflows",
    ],
    executionRisks: [
      "Legal review required for policy language changes",
      "Acknowledgment deadlines depend on employee responsiveness",
    ],
  },
  {
    id: "comp-benchmarking",
    icon: "💰",
    iconBg: "#eef2ff",
    name: "Compensation & Job Architecture",
    outcome: "Make pay decisions with confidence and consistency.",
    bullets: [
      "Market-aligned pay insights",
      "Offer validation",
      "Compensation risk flags",
    ],
    category: "Workforce",
    valueStatement: "Make every compensation decision defensible with market data and structured pay band analysis.",
    supportingInsight: "The agent benchmarks roles against survey data, flags offers that fall outside established bands, and classifies new positions into your job architecture — reducing pay equity risk.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Compensation Review",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Compensation Audit Summary",
      primaryItems: [
        { label: "Roles benchmarked", value: "Full team assessed against market data" },
        { label: "Out-of-band flags", value: "Employees outside pay bands identified" },
        { label: "Equity concerns", value: "Potential equity gaps surfaced" },
      ],
      secondaryTitle: "Market Positioning",
      secondaryItems: [
        { label: "Below market", value: "Roles at risk of attrition flagged" },
        { label: "At market", value: "Majority of roles aligned" },
        { label: "Above market", value: "Premium positions identified for review" },
      ],
      insights: [
        { text: "Some roles show positioning below updated market median" },
        { text: "Recent offers exceeding band maximum warrant process review" },
      ],
    },
    businessContext: [
      "Compensation review for technical roles",
      "Market data refresh from industry surveys",
      "Pay equity audit required before merit cycle",
    ],
    howItWorks: [
      "Benchmarks roles against current market survey data",
      "Flags employees and offers outside established pay bands",
      "Classifies new positions into job architecture framework",
    ],
    whatYouGet: [
      "Market positioning report by role and level",
      "Out-of-band offer alerts with approval routing",
      "Pay equity analysis with risk flags",
    ],
    executionRisks: [
      "Market data accuracy depends on survey recency and match quality",
      "Band adjustments may require budget reallocation approval",
    ],
  },
  {
    id: "dei-analytics",
    icon: "📊",
    iconBg: "#fff8ee",
    name: "DEI Analytics",
    outcome: "Turn diversity data into focused, measurable action.",
    bullets: [
      "Representation gap analysis",
      "Benchmark comparisons",
      "Priority intervention areas",
    ],
    category: "Compliance",
    valueStatement: "Move DEI reporting from manual data pulls to automated, board-ready insights delivered quarterly.",
    supportingInsight: "The agent analyzes representation data across levels, compares against benchmarks, and generates structured reports — ensuring leadership has accurate, timely visibility into DEI progress.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "DEI Reporting",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Quarterly DEI Summary",
      primaryItems: [
        { label: "Representation gaps", value: "Key gaps identified across levels" },
        { label: "Leadership diversity", value: "Trends tracked against goals" },
        { label: "Hiring funnel flags", value: "Drop-off stages surfaced" },
      ],
      secondaryTitle: "Focus Areas",
      secondaryItems: [
        { label: "Leadership", value: "Underrepresentation at senior levels" },
        { label: "Pipeline", value: "Drop-off patterns in hiring funnel" },
        { label: "Retention", value: "Higher early-tenure attrition patterns" },
      ],
      insights: [
        { text: "Hiring funnel drop-off warrants process review with recruiting team" },
        { text: "Early attrition patterns suggest onboarding experience gap" },
      ],
    },
    businessContext: [
      "Quarterly DEI report for board and leadership",
      "Organization-wide analysis across demographic dimensions",
      "Public commitments requiring measurable progress tracking",
    ],
    howItWorks: [
      "Analyzes representation data across levels and departments",
      "Compares metrics against industry benchmarks and internal goals",
      "Generates board-ready reports with trend analysis",
    ],
    whatYouGet: [
      "Representation scorecard by level and department",
      "Hiring funnel equity analysis",
      "Board-ready narrative report with recommendations",
    ],
    executionRisks: [
      "Data completeness depends on voluntary self-identification rates",
      "Benchmark comparisons require industry-matched data sets",
    ],
  },
  {
    id: "document-generation",
    icon: "📄",
    iconBg: "#eef4f0",
    name: "Document Generation",
    outcome: "Generate accurate HR documents without manual errors.",
    bullets: [
      "Offer letter generation",
      "Policy-based templates",
      "Approval-ready documents",
    ],
    category: "Workforce",
    valueStatement: "Eliminate manual document drafting with templates that adapt to role, level, and jurisdiction.",
    supportingInsight: "The agent generates compliant, personalized documents from structured inputs — then routes them for approval and e-signature automatically.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Document Automation",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Document Generation Summary",
      primaryItems: [
        { label: "Offer letters", value: "Drafted and ready for review" },
        { label: "Promotion letters", value: "Generated with role-specific language" },
        { label: "Generation speed", value: "Documents produced in seconds" },
      ],
      secondaryTitle: "Routing Status",
      secondaryItems: [
        { label: "Sent for signature", value: "Routed to signers automatically" },
        { label: "Awaiting approval", value: "Pending manager review" },
        { label: "Completed", value: "Fully executed and archived" },
      ],
      insights: [
        { text: "Jurisdiction-specific language applied automatically based on employee location" },
        { text: "Pending approvals should be reviewed to avoid candidate experience delays" },
      ],
    },
    businessContext: [
      "Hiring cycle with pending offers and promotions",
      "Multi-state employment requiring jurisdiction-specific language",
      "E-signature integration for automated routing",
    ],
    howItWorks: [
      "Generates documents from structured inputs and dynamic templates",
      "Applies jurisdiction-specific legal language automatically",
      "Routes for approval and e-signature with reminder sequences",
    ],
    whatYouGet: [
      "Compliant offer and promotion letters in seconds",
      "Automated approval and signature routing",
      "Document audit trail and archiving",
    ],
    executionRisks: [
      "Template updates needed when employment law changes",
      "Approval bottlenecks may delay candidate experience",
    ],
  },
  {
    id: "employee-relations",
    icon: "🤝",
    iconBg: "#eef2ff",
    name: "Employee Relations",
    outcome: "Handle sensitive cases with structure and consistency.",
    bullets: [
      "Case classification and routing",
      "Documentation guidance",
      "Investigation support",
    ],
    category: "Compliance",
    valueStatement: "Ensure every employee relations case is classified, routed, and tracked consistently from intake to resolution.",
    supportingInsight: "The agent classifies cases by type and severity, routes to the right partner, surfaces relevant precedent documentation, and tracks resolution timelines — reducing time-to-action on sensitive matters.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "ER Case Management",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Case Triage Summary",
      primaryItems: [
        { label: "Cases classified", value: "All cases categorized by type and severity" },
        { label: "Critical severity", value: "High-priority cases escalated" },
        { label: "Triage speed", value: "Rapid classification from intake" },
      ],
      secondaryTitle: "Routing Distribution",
      secondaryItems: [
        { label: "HRBP", value: "Routine cases assigned" },
        { label: "ER Specialist", value: "Complex cases routed" },
        { label: "Legal", value: "Legally sensitive cases escalated" },
      ],
      insights: [
        { text: "Critical cases require immediate consultation with legal partners" },
        { text: "Conduct-related cases trending upward and warrant proactive review" },
      ],
    },
    businessContext: [
      "ER cases received across multiple categories",
      "Cases range from routine conduct to legally sensitive matters",
      "Resolution tracking required for compliance reporting",
    ],
    howItWorks: [
      "Classifies cases by type, severity, and urgency from intake text",
      "Routes to appropriate partner (HRBP, ER Specialist, or Legal)",
      "Surfaces precedent documents and recommended investigation steps",
    ],
    whatYouGet: [
      "Instant case classification and severity assessment",
      "Automated routing with rationale",
      "Quarterly ER trend report for CHRO",
    ],
    executionRisks: [
      "Legally sensitive cases require human review regardless of classification",
      "Precedent matching accuracy depends on historical case documentation",
    ],
  },
  {
    id: "benefits-admin",
    icon: "🏥",
    iconBg: "#fff8ee",
    name: "Benefits Administration",
    outcome: "Help employees make better benefits decisions with less confusion.",
    bullets: [
      "Plan recommendations",
      "Enrollment guidance",
      "Life event support",
    ],
    category: "Workforce",
    valueStatement: "Reduce benefits-related tickets and improve enrollment completion with employee guidance.",
    supportingInsight: "The agent answers employee questions about plan options, generates side-by-side comparisons, and automates life-event workflows — deflecting routine tickets and improving the enrollment experience.",
    access: "admin",
    viewable: true,
    runnable: true,
    briefData: {
      scenario: "Open Enrollment",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Enrollment Support Summary",
      primaryItems: [
        { label: "Questions handled", value: "Routine benefits questions resolved" },
        { label: "Plan comparisons", value: "Side-by-side views generated for employees" },
        { label: "Ticket deflection", value: "Significant reduction in HR ticket volume" },
      ],
      secondaryTitle: "Enrollment Progress",
      secondaryItems: [
        { label: "Completed", value: "Majority of employees enrolled" },
        { label: "In progress", value: "Employees actively reviewing options" },
        { label: "Not started", value: "Reminder sequences triggered" },
      ],
      insights: [
        { text: "Employees who haven't started enrollment need targeted nudge sequences" },
        { text: "Decision support correlates with higher adoption of cost-effective plans" },
      ],
    },
    businessContext: [
      "Annual open enrollment for employees",
      "Multiple medical plan options with varying eligibility",
      "Historical high ticket volume during enrollment window",
    ],
    howItWorks: [
      "Answers employee benefits questions in plain language",
      "Generates personalized plan comparisons based on employee profile",
      "Automates life-event workflows with documentation checklists",
    ],
    whatYouGet: [
      "Benefits decision support for employees",
      "Side-by-side plan comparison reports",
      "Automated enrollment nudges and completion tracking",
    ],
    executionRisks: [
      "Plan data must be updated before enrollment window opens",
      "Agent should not provide medical advice — guardrails required",
    ],
  },
  {
    id: "payroll-payments",
    icon: "💳",
    iconBg: "#eef4f0",
    name: "Payroll & Payments",
    outcome: "Gain visibility into global payroll and identify issues faster.",
    bullets: [
      "Payroll anomaly detection",
      "Regional variance insights",
      "Consolidated reporting",
    ],
    category: "Workforce",
    valueStatement: "Surface payroll discrepancies and regional variances before they become costly errors.",
    supportingInsight: "The agent monitors payroll runs across regions, flags anomalies against historical patterns, and consolidates reporting for finance and HR leadership.",
    access: "admin",
    viewable: true,
    runnable: false,
    briefData: {
      scenario: "Payroll Review",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Payroll Health Summary",
      primaryItems: [
        { label: "Anomalies", value: "Unusual patterns flagged for review" },
        { label: "Regional variance", value: "Cross-region discrepancies surfaced" },
        { label: "Reporting", value: "Consolidated view generated" },
      ],
      secondaryTitle: "Focus Areas",
      secondaryItems: [
        { label: "Overtime patterns", value: "Departments with unusual trends" },
        { label: "Tax compliance", value: "Jurisdictions requiring attention" },
        { label: "Timing", value: "Processing delays identified" },
      ],
      insights: [
        { text: "Anomaly patterns suggest process review in flagged departments" },
        { text: "Regional variance warrants alignment discussion with local teams" },
      ],
    },
    businessContext: [
      "Multi-region payroll operations",
      "Complex tax and compliance requirements across jurisdictions",
      "Finance and HR leadership need consolidated visibility",
    ],
    howItWorks: [
      "Monitors payroll runs and flags anomalies against historical patterns",
      "Identifies regional variances and compliance risks",
      "Generates consolidated reports for leadership review",
    ],
    whatYouGet: [
      "Payroll anomaly detection and alerts",
      "Regional variance analysis",
      "Consolidated payroll reporting for leadership",
    ],
    executionRisks: [
      "Anomaly detection accuracy depends on historical data quality",
      "Regional compliance rules require ongoing updates",
    ],
  },
  {
    id: "workforce-analytics",
    icon: "📈",
    iconBg: "#eef2ff",
    name: "Workforce Analytics",
    outcome: "Turn workforce data into clear executive decisions.",
    bullets: [
      "Attrition and trend analysis",
      "Risk identification",
      "Executive summaries",
    ],
    category: "Talent",
    valueStatement: "Transform workforce data into actionable executive insights without manual report building.",
    supportingInsight: "The agent analyzes workforce trends, identifies attrition risks, and produces executive-ready summaries — giving leadership the signals they need to act before problems escalate.",
    access: "admin",
    viewable: true,
    runnable: false,
    briefData: {
      scenario: "Workforce Review",
      contextLine: "Based on your selected scenario inputs",
      primaryTitle: "Workforce Health Summary",
      primaryItems: [
        { label: "Attrition signals", value: "At-risk populations identified" },
        { label: "Trend direction", value: "Key metrics tracked over time" },
        { label: "Executive view", value: "Summary generated for leadership" },
      ],
      secondaryTitle: "Focus Areas",
      secondaryItems: [
        { label: "Retention", value: "Teams with elevated attrition risk" },
        { label: "Growth", value: "Departments scaling faster than support capacity" },
        { label: "Engagement", value: "Correlation between engagement and attrition patterns" },
      ],
      insights: [
        { text: "Attrition signals concentrated in specific teams warrant targeted intervention" },
        { text: "Growth trajectory outpacing support infrastructure in key areas" },
      ],
    },
    businessContext: [
      "Organization-wide workforce data across multiple dimensions",
      "Leadership needs regular visibility into workforce health",
      "Proactive risk identification required for strategic planning",
    ],
    howItWorks: [
      "Analyzes workforce data across attrition, engagement, and growth dimensions",
      "Identifies risk patterns and correlations across teams",
      "Generates executive-ready summaries with recommended actions",
    ],
    whatYouGet: [
      "Workforce health dashboard with trend analysis",
      "Attrition risk identification by team and role",
      "Executive summary reports with action recommendations",
    ],
    executionRisks: [
      "Data quality depends on consistent HRIS and survey data",
      "Executive summaries require validation before distribution",
    ],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find(a => a.id === id);
}
