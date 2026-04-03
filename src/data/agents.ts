export interface Agent {
  id: string;
  icon: string;
  iconBg: string;
  name: string;
  outcome: string;
  category: string;
  valueStatement: string;
  supportingInsight: string;
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
    outcome: "Get a structured headcount plan aligned to growth, budget, and timeline — without the spreadsheet gymnastics.",
    category: "Workforce",
    valueStatement: "Turn headcount planning from reactive guesswork into a structured, data-driven recommendation.",
    supportingInsight: "This recommendation reflects current workforce composition, projected growth targets, and budget constraints. The agent models multiple scenarios and surfaces risks before they become problems.",
    briefData: {
      scenario: "Workforce Planning",
      contextLine: "120 employees · 25% growth · Fixed hiring budget",
      primaryTitle: "Recommended Hiring Plan for 25% Growth",
      summary: "To support a 25% increase in workforce capacity, hiring should be concentrated in revenue-generating roles early in the year, with supporting functions phased in as operational demand increases.",
      primaryItems: [
        { label: "Sales", value: "8 hires" },
        { label: "Engineering", value: "3 hires" },
        { label: "HR", value: "2 hires" },
      ],
      secondaryTitle: "Hiring Timeline",
      secondaryItems: [
        { label: "Q1", value: "5 hires (focus on Sales to accelerate revenue coverage)" },
        { label: "Q2", value: "4 hires (Engineering ramp begins)" },
        { label: "Q3", value: "4 hires (HR and operational support roles added)" },
      ],
      observations: [
        { text: "Sales hiring must lead to avoid revenue lag against growth targets" },
        { text: "Engineering capacity becomes a bottleneck by mid-year if delayed" },
        { text: "HR hiring is reactive and should scale with workforce expansion" },
      ],
      insights: [
        { text: "Engineering hiring risk is elevated due to limited candidate pipeline in Q2–Q3" },
        { text: "Delayed Sales hiring will directly impact revenue realization timing" },
        { text: "Budget pressure may increase if hiring is backloaded into later quarters" },
      ],
      confidence: { level: "Medium", reason: "Growth targets are clearly defined, but hiring success depends heavily on market availability and speed of execution." },
    },
    businessContext: [
      "Current workforce of 120 employees across 6 departments",
      "25% year-over-year growth target set by leadership",
      "Fixed hiring budget requiring prioritization across functions",
    ],
    howItWorks: [
      "Analyzes current workforce composition and department ratios",
      "Models hiring scenarios against budget and growth constraints",
      "Generates a prioritized plan with timeline and risk assessment",
    ],
    whatYouGet: [
      "Structured headcount plan by department and quarter",
      "Budget-aligned hiring timeline",
      "Prioritized risk assessment with mitigation recommendations",
    ],
    executionRisks: [
      "Engineering hiring depends on updated job descriptions and recruiter capacity",
      "Q3 capacity may require contractor support if attrition exceeds forecast",
      "Budget reallocation needed if market compensation shifts significantly",
    ],
  },
  {
    id: "employee-listening",
    icon: "💬",
    iconBg: "#eef2ff",
    name: "Employee Listening",
    outcome: "Turn thousands of survey responses into actionable manager-level insights and 90-day action plans.",
    category: "Talent",
    valueStatement: "Transform engagement survey data into specific, measurable action plans for every manager.",
    supportingInsight: "The agent classifies sentiment across every open-text response, maps themes to 14 dimensions, and generates tailored action plans grounded in what employees actually said.",
    briefData: {
      scenario: "Employee Engagement",
      contextLine: "1,400 responses · 14 teams · Q1 cycle",
      primaryTitle: "Engagement Action Plans for Q1",
      primaryItems: [
        { label: "Teams flagged", value: "4 teams" },
        { label: "Action plans generated", value: "14 plans" },
        { label: "Top concern", value: "Career growth" },
      ],
      secondaryTitle: "Sentiment Distribution",
      secondaryItems: [
        { label: "Positive", value: "62%" },
        { label: "Neutral", value: "24%" },
        { label: "Negative", value: "14%" },
      ],
      insights: [
        { text: "Engineering team shows declining trend in manager relationship scores" },
        { text: "Career growth concerns concentrated in mid-level roles" },
      ],
    },
    businessContext: [
      "Quarterly engagement survey across 14 teams",
      "1,400+ open-text responses requiring analysis",
      "Leadership expects manager-level action plans within 2 weeks",
    ],
    howItWorks: [
      "Ingests survey data and classifies every open-text response",
      "Tags sentiment and maps to 14 engagement dimensions",
      "Generates specific 90-day action plans per manager",
    ],
    whatYouGet: [
      "Sentiment analysis across all survey responses",
      "Theme-tagged insights by team and dimension",
      "Manager-ready 90-day action plans with measurable outcomes",
    ],
    executionRisks: [
      "Action plan effectiveness depends on manager follow-through",
      "Low response rates in some teams may limit statistical confidence",
    ],
  },
  {
    id: "learning-development",
    icon: "🎓",
    iconBg: "#fff8ee",
    name: "Learning & Development",
    outcome: "Identify skill gaps and deliver personalized learning paths with automated nudges — no manual curation.",
    category: "Talent",
    valueStatement: "Close skill gaps faster with AI-curated learning paths tailored to each employee's role and career goals.",
    supportingInsight: "The agent maps current competencies against role frameworks, identifies priority gaps, and curates content from your existing LMS — with completion nudges built in.",
    briefData: {
      scenario: "Skill Development",
      contextLine: "L3 Analyst · Senior track · 5 skill gaps identified",
      primaryTitle: "Personalized 90-Day Learning Path",
      primaryItems: [
        { label: "Priority 1", value: "Data Analysis (3 courses)" },
        { label: "Priority 2", value: "Exec Communication (2 workshops)" },
        { label: "Priority 3", value: "Stakeholder Mgmt (1 course)" },
      ],
      secondaryTitle: "Delivery Schedule",
      secondaryItems: [
        { label: "Weeks 1–2", value: "Core skills (5.5h)" },
        { label: "Month 2", value: "Advanced skills (5.5h)" },
        { label: "Month 3", value: "Application & review" },
      ],
      insights: [
        { text: "Data Analysis gap has highest business impact based on role requirements" },
        { text: "8 automated Slack nudges scheduled to drive completion" },
      ],
    },
    businessContext: [
      "Employee on Senior Analyst promotion track",
      "5 skill gaps identified against role competency framework",
      "Existing LMS catalog with 200+ relevant courses",
    ],
    howItWorks: [
      "Pulls employee profile, role level, and career goals",
      "Compares current skills against target competency framework",
      "Curates and schedules content with automated reminders",
    ],
    whatYouGet: [
      "Personalized 90-day development plan",
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
    outcome: "Draft consistent, data-grounded reviews and detect calibration anomalies before they derail your review cycle.",
    category: "Talent",
    valueStatement: "Make review cycles faster, fairer, and more consistent across every manager in your organization.",
    supportingInsight: "The agent drafts review narratives from goal data, peer feedback, and manager notes — then scans rating distributions to flag bias patterns before calibration sessions.",
    briefData: {
      scenario: "Performance Review",
      contextLine: "H2 2024 cycle · 48 reviews · 6 managers",
      primaryTitle: "Review Cycle Readiness Summary",
      primaryItems: [
        { label: "Reviews drafted", value: "48 narratives" },
        { label: "Stale goals flagged", value: "12 goals" },
        { label: "Calibration flags", value: "3 anomalies" },
      ],
      secondaryTitle: "Anomalies Detected",
      secondaryItems: [
        { label: "Manager A", value: "100% Exceeds ratings" },
        { label: "Manager C", value: "All goals marked 'on track' without updates" },
        { label: "Org-wide", value: "Rating inflation vs. prior cycle" },
      ],
      insights: [
        { text: "3 managers show statistically significant rating inflation" },
        { text: "12 goals haven't been updated since Q1 and should be reviewed" },
      ],
    },
    businessContext: [
      "Semi-annual performance cycle across 6 departments",
      "48 employees require review narratives",
      "Calibration session scheduled in 2 weeks",
    ],
    howItWorks: [
      "Ingests goal completion data, peer feedback themes, and manager notes",
      "Drafts balanced, specific review narratives per employee",
      "Scans rating distributions for calibration anomalies",
    ],
    whatYouGet: [
      "Draft review narratives ready for manager review",
      "Goal health scores with staleness flags",
      "Pre-calibration anomaly report for HRBPs",
    ],
    executionRisks: [
      "Review quality depends on completeness of manager notes and peer feedback",
      "Calibration flags may surface sensitive conversations requiring HR mediation",
    ],
  },
  {
    id: "recruiting-ats",
    icon: "🔍",
    iconBg: "#eef2ff",
    name: "Recruiting & Screening",
    outcome: "Screen candidates faster with structured summaries, personalized outreach, and real-time pipeline visibility.",
    category: "Workforce",
    valueStatement: "Help recruiters spend less time on admin and more time building relationships with top candidates.",
    supportingInsight: "The agent summarizes resumes against role requirements, drafts personalized outreach, and generates weekly pipeline health reports — all without manual data pulls.",
    briefData: {
      scenario: "Recruiting Pipeline",
      contextLine: "Senior PM role · 94 applicants · Week 3",
      primaryTitle: "Pipeline Health Summary",
      primaryItems: [
        { label: "Screened", value: "94 candidates" },
        { label: "Advance", value: "12 candidates" },
        { label: "Hold", value: "8 candidates" },
      ],
      secondaryTitle: "Stage Conversion",
      secondaryItems: [
        { label: "Applied → Screen", value: "100%" },
        { label: "Screen → Phone", value: "13%" },
        { label: "Phone → Onsite", value: "67%" },
      ],
      insights: [
        { text: "Phone-to-onsite conversion is strong; top-of-funnel needs more sourcing" },
        { text: "3 candidates in phone screen stage for >7 days — action needed" },
      ],
    },
    businessContext: [
      "Active requisition for Senior Product Manager",
      "94 applications received in first 3 weeks",
      "Hiring manager expects shortlist by end of month",
    ],
    howItWorks: [
      "Screens resumes against role requirements and generates structured summaries",
      "Drafts personalized outreach for high-match passive candidates",
      "Produces weekly pipeline reports with stage-level conversion data",
    ],
    whatYouGet: [
      "Candidate screening summaries with match scores",
      "Personalized outreach drafts ready to send",
      "Weekly pipeline health reports with action recommendations",
    ],
    executionRisks: [
      "Screening accuracy depends on clarity of job requirements",
      "Outreach personalization requires current candidate data from ATS",
    ],
  },
  {
    id: "onboarding",
    icon: "🚀",
    iconBg: "#fff8ee",
    name: "Onboarding",
    outcome: "Deliver a personalized onboarding experience with automated checklists, buddy matching, and milestone check-ins.",
    category: "Workforce",
    valueStatement: "Make every new hire's first 90 days structured, personal, and consistently excellent.",
    supportingInsight: "The agent generates role-specific onboarding plans, matches buddies based on team and experience, and schedules milestone check-ins — reducing manual coordination across HR, IT, and managers.",
    briefData: {
      scenario: "New Hire Onboarding",
      contextLine: "Product Designer · SF Office · Jan 15 start",
      primaryTitle: "Onboarding Plan Summary",
      primaryItems: [
        { label: "Pre-arrival tasks", value: "8 items" },
        { label: "Week 1 orientation", value: "12 activities" },
        { label: "30-day milestones", value: "5 checkpoints" },
      ],
      secondaryTitle: "Buddy Match",
      secondaryItems: [
        { label: "Recommended", value: "Alex Chen (Sr. Designer, 2yr)" },
        { label: "Rationale", value: "Same team, similar role trajectory" },
      ],
      insights: [
        { text: "IT provisioning request should be submitted 5 days before start" },
        { text: "Manager 1:1 should be scheduled for Day 1 afternoon" },
      ],
    },
    businessContext: [
      "New Product Designer starting January 15",
      "Cross-functional dependencies: IT, Facilities, Design team",
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
    outcome: "Stay ahead of regulatory changes with automated policy gap analysis and acknowledgment workflows.",
    category: "Compliance",
    valueStatement: "Reduce compliance risk by detecting policy gaps and surfacing regulatory changes before they become problems.",
    supportingInsight: "The agent monitors regulatory updates, audits your policy library against best practices, and generates acknowledgment workflows — keeping your organization compliant without constant manual review.",
    briefData: {
      scenario: "Compliance Review",
      contextLine: "Multi-state employer · 14 policies · Q1 audit",
      primaryTitle: "Policy Audit Summary",
      primaryItems: [
        { label: "Policies reviewed", value: "14" },
        { label: "Gaps identified", value: "3 critical, 5 medium" },
        { label: "Updates needed", value: "4 policies" },
      ],
      secondaryTitle: "Priority Actions",
      secondaryItems: [
        { label: "Critical", value: "Remote work policy (CA compliance)" },
        { label: "High", value: "Data privacy notice update" },
        { label: "Medium", value: "PTO accrual language clarification" },
      ],
      insights: [
        { text: "California remote work regulations changed in January — policy update required" },
        { text: "3 policies have not been acknowledged by 15% of employees" },
      ],
    },
    businessContext: [
      "Multi-state employer with 14 active HR policies",
      "Quarterly compliance audit cycle",
      "Recent regulatory changes in 3 jurisdictions",
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
    outcome: "Match roles to market data, flag out-of-band offers, and maintain consistent job level frameworks.",
    category: "Workforce",
    valueStatement: "Make every compensation decision defensible with real-time market data and structured pay band analysis.",
    supportingInsight: "The agent benchmarks roles against survey data, flags offers that fall outside established bands, and classifies new positions into your job architecture — reducing pay equity risk.",
    briefData: {
      scenario: "Compensation Review",
      contextLine: "Engineering team · 32 roles · Annual cycle",
      primaryTitle: "Compensation Audit Summary",
      primaryItems: [
        { label: "Roles benchmarked", value: "32" },
        { label: "Out-of-band flags", value: "4 employees" },
        { label: "Equity concerns", value: "2 identified" },
      ],
      secondaryTitle: "Market Positioning",
      secondaryItems: [
        { label: "Below market", value: "6 roles" },
        { label: "At market", value: "22 roles" },
        { label: "Above market", value: "4 roles" },
      ],
      insights: [
        { text: "Senior Engineer band is 8% below updated market median" },
        { text: "2 recent offers exceeded band maximum without approval" },
      ],
    },
    businessContext: [
      "Annual compensation review for Engineering (32 roles)",
      "Market data refresh from Radford and Pave surveys",
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
    outcome: "Surface representation gaps, track goal progress, and generate board-ready DEI reports automatically.",
    category: "Compliance",
    valueStatement: "Move DEI reporting from manual data pulls to automated, board-ready insights delivered quarterly.",
    supportingInsight: "The agent analyzes representation data across levels, compares against benchmarks, and generates structured reports — ensuring leadership has accurate, timely visibility into DEI progress.",
    briefData: {
      scenario: "DEI Reporting",
      contextLine: "500 employees · 4 dimensions · Q4 report",
      primaryTitle: "Quarterly DEI Summary",
      primaryItems: [
        { label: "Representation gaps", value: "3 identified" },
        { label: "YoY improvement", value: "+4.2% leadership diversity" },
        { label: "Hiring funnel flags", value: "2 stages" },
      ],
      secondaryTitle: "Focus Areas",
      secondaryItems: [
        { label: "Leadership", value: "Underrepresented at VP+ level" },
        { label: "Pipeline", value: "Drop-off at phone screen stage" },
        { label: "Retention", value: "Higher attrition in first 18 months" },
      ],
      insights: [
        { text: "Phone screen drop-off warrants process review with recruiting team" },
        { text: "18-month attrition pattern suggests onboarding experience gap" },
      ],
    },
    businessContext: [
      "Quarterly DEI report for board and leadership",
      "500-person organization across 4 demographic dimensions",
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
    outcome: "Automate offer letters, promotion letters, and policy documents with dynamic templates and e-signature routing.",
    category: "Workforce",
    valueStatement: "Eliminate manual document drafting with intelligent templates that adapt to role, level, and jurisdiction.",
    supportingInsight: "The agent generates compliant, personalized documents from structured inputs — then routes them for approval and e-signature automatically.",
    briefData: {
      scenario: "Document Automation",
      contextLine: "Q1 hiring cycle · 18 offers · 3 promotions",
      primaryTitle: "Document Generation Summary",
      primaryItems: [
        { label: "Offer letters drafted", value: "18" },
        { label: "Promotion letters", value: "3" },
        { label: "Avg generation time", value: "12 seconds" },
      ],
      secondaryTitle: "Routing Status",
      secondaryItems: [
        { label: "Sent for signature", value: "15" },
        { label: "Awaiting approval", value: "4" },
        { label: "Completed", value: "2" },
      ],
      insights: [
        { text: "California offers require updated at-will language per January regulation" },
        { text: "3 offers pending manager approval for >48 hours" },
      ],
    },
    businessContext: [
      "Q1 hiring cycle with 18 pending offers and 3 promotions",
      "Multi-state employment requiring jurisdiction-specific language",
      "DocuSign integration for automated routing",
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
    outcome: "Triage ER cases faster with automated classification, routing, and precedent document retrieval.",
    category: "Compliance",
    valueStatement: "Ensure every employee relations case is classified, routed, and tracked consistently from intake to resolution.",
    supportingInsight: "The agent classifies cases by type and severity, routes to the right partner, surfaces relevant precedent documentation, and tracks resolution timelines — reducing time-to-action on sensitive matters.",
    briefData: {
      scenario: "ER Case Management",
      contextLine: "Q1 intake · 23 cases · 4 categories",
      primaryTitle: "Case Triage Summary",
      primaryItems: [
        { label: "Cases classified", value: "23" },
        { label: "Critical severity", value: "2 cases" },
        { label: "Avg triage time", value: "< 30 seconds" },
      ],
      secondaryTitle: "Routing Distribution",
      secondaryItems: [
        { label: "HRBP", value: "14 cases" },
        { label: "ER Specialist", value: "6 cases" },
        { label: "Legal", value: "3 cases" },
      ],
      insights: [
        { text: "2 critical cases require immediate legal consultation" },
        { text: "Conduct-related cases up 15% vs. prior quarter" },
      ],
    },
    businessContext: [
      "23 ER cases received in Q1 across 4 categories",
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
    outcome: "Simplify open enrollment with plan comparison tools, life-event automation, and employee decision support.",
    category: "Workforce",
    valueStatement: "Reduce benefits-related tickets and improve enrollment completion with intelligent employee guidance.",
    supportingInsight: "The agent answers employee questions about plan options, generates side-by-side comparisons, and automates life-event workflows — deflecting routine tickets and improving the enrollment experience.",
    briefData: {
      scenario: "Open Enrollment",
      contextLine: "Annual OE · 340 employees · 4 plan options",
      primaryTitle: "Enrollment Support Summary",
      primaryItems: [
        { label: "Questions answered", value: "280+" },
        { label: "Plan comparisons generated", value: "190" },
        { label: "Ticket deflection", value: "72%" },
      ],
      secondaryTitle: "Enrollment Progress",
      secondaryItems: [
        { label: "Completed", value: "78%" },
        { label: "In progress", value: "15%" },
        { label: "Not started", value: "7%" },
      ],
      insights: [
        { text: "24 employees haven't started enrollment — nudge sequence triggered" },
        { text: "HSA-eligible plan adoption up 18% with decision support" },
      ],
    },
    businessContext: [
      "Annual open enrollment for 340 employees",
      "4 medical plan options with varying HSA eligibility",
      "Historical ticket volume of 400+ during OE window",
    ],
    howItWorks: [
      "Answers employee benefits questions in plain language",
      "Generates personalized plan comparisons based on employee profile",
      "Automates life-event workflows with documentation checklists",
    ],
    whatYouGet: [
      "AI-powered benefits decision support for employees",
      "Side-by-side plan comparison reports",
      "Automated enrollment nudges and completion tracking",
    ],
    executionRisks: [
      "Plan data must be updated before OE window opens",
      "Agent should not provide medical advice — guardrails required",
    ],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find(a => a.id === id);
}
