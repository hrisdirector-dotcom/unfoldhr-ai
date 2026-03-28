export interface Lesson {
  name: string;
  type: string;
  dur: string;
  free: boolean;
}

export interface Phase {
  phase: string;
  duration: string;
  lessons: Lesson[];
}

export interface Prompt {
  label: string;
  text: string;
}

export interface Module {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
  level: "beg" | "int" | "adv";
  levelLabel: string;
  lessons: number;
  duration: string;
  tools: string[];
  curriculum: Phase[];
  prompts: Prompt[];
}

export const MODULES: Module[] = [
  {
    id: "workforce-planning", icon: "🏗️", iconBg: "#eef4f0",
    title: "Workforce Planning & Headcount",
    desc: "Build AI agents that draft headcount proposals, model org scenarios, and translate business plans into people strategies.",
    level: "int", levelLabel: "Intermediate", lessons: 7, duration: "3.5h",
    tools: ["Anaplan", "Planful", "Pigment", "Workday HCM"],
    curriculum: [
      { phase: "Foundations", duration: "45 min", lessons: [
        { name: "What is a Workforce Planning Agent?", type: "▶", dur: "12 min", free: true },
        { name: "Connecting to Anaplan / Planful APIs", type: "⚙️", dur: "15 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "90 min", lessons: [
        { name: "Drafting headcount proposal prompts", type: "💬", dur: "20 min", free: false },
        { name: "Scenario modeling: hire vs. defer logic", type: "⚙️", dur: "25 min", free: false },
        { name: "Auto-generating org chart summaries", type: "▶", dur: "18 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "45 min", lessons: [
        { name: "Connecting to Slack for notifications", type: "⚙️", dur: "22 min", free: false },
        { name: "Review cycle automation", type: "▶", dur: "23 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Headcount Proposal Drafter", text: "You are an HR Workforce Planning Agent. Given the following business unit growth plan: {business_plan}, and current headcount data: {headcount_data}, draft a headcount proposal for the next fiscal year. Include: role additions by function, estimated hire timeline, cost impact summary, and top 3 risks. Format as an executive-ready memo." },
      { label: "Scenario Comparison Generator", text: "Compare two headcount scenarios for {team_name}:\n\nScenario A: {scenario_a}\nScenario B: {scenario_b}\n\nFor each: total headcount delta, annualized cost, capability gaps addressed, recommendation with rationale. Output as a comparison table." },
      { label: "Reorg Impact Summarizer", text: "Given proposed reorg: {reorg_data} and current reporting lines: {current_structure}, summarize key changes, affected employees by level, manager span-of-control concerns, and a suggested communication timeline." }
    ]
  },
  {
    id: "employee-listening", icon: "💬", iconBg: "#eef2ff",
    title: "Employee Listening & Engagement",
    desc: "Automate survey analysis, sentiment tagging, and action-plan generation from Glint, Qualtrics, or Lattice pulse data.",
    level: "beg", levelLabel: "Beginner", lessons: 6, duration: "3h",
    tools: ["Glint", "Qualtrics", "Lattice", "Workday Peakon"],
    curriculum: [
      { phase: "Foundations", duration: "40 min", lessons: [
        { name: "How engagement surveys generate agent opportunities", type: "▶", dur: "14 min", free: true },
        { name: "Intro to sentiment classification with AI", type: "💬", dur: "14 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "80 min", lessons: [
        { name: "Auto-summarizing survey results by team", type: "💬", dur: "22 min", free: false },
        { name: "Sentiment tagging open-text responses", type: "⚙️", dur: "25 min", free: false },
        { name: "Drafting manager action plans from low scores", type: "▶", dur: "33 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "40 min", lessons: [
        { name: "Scheduling post-survey report delivery", type: "⚙️", dur: "20 min", free: false },
        { name: "Dashboard integration with Power BI", type: "📄", dur: "20 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Survey Results Summarizer", text: "You are an HR Engagement Agent. Given survey results for {team_name} ({survey_date}): {survey_data}\n\nProduce a 1-page manager summary: top 3 strengths, top 3 concerns, most common themes (workload/leadership/growth/culture/tools), and overall sentiment score." },
      { label: "Manager Action Plan Generator", text: "Based on low-scoring dimensions for {manager_name}'s team: {low_scores}\n\nGenerate a 90-day action plan with 3 specific, measurable actions per dimension. Include: what to do, cadence, accountability, and how to measure progress." },
      { label: "Open-Text Sentiment Tagger", text: "Classify each survey response with sentiment (Positive/Neutral/Negative) and theme tags from [Workload, Manager Relationship, Career Growth, Team Culture, Tools, Benefits, Recognition, Communication, Work-Life Balance].\n\nResponses: {responses}\n\nOutput as JSON: response_id, sentiment, themes." }
    ]
  },
  {
    id: "learning-development", icon: "🎓", iconBg: "#fff8ee",
    title: "Learning & Development (LMS)",
    desc: "Create agents that curate learning paths, identify skill gaps, and recommend content based on role, level, or business need.",
    level: "int", levelLabel: "Intermediate", lessons: 8, duration: "4h",
    tools: ["Cornerstone", "360Learning", "Docebo", "Workday Learning"],
    curriculum: [
      { phase: "Foundations", duration: "50 min", lessons: [
        { name: "Mapping skills frameworks to content libraries", type: "▶", dur: "18 min", free: true },
        { name: "Connecting to Cornerstone / Docebo APIs", type: "⚙️", dur: "16 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "100 min", lessons: [
        { name: "Auto-building role-specific learning paths", type: "💬", dur: "28 min", free: false },
        { name: "Skill gap → content recommendation pipeline", type: "▶", dur: "26 min", free: false },
        { name: "Mandatory training reminder automation", type: "⚙️", dur: "22 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "50 min", lessons: [
        { name: "Integrating agent with Slack for nudges", type: "⚙️", dur: "24 min", free: false },
        { name: "L&D reporting agent for CHRO dashboard", type: "📄", dur: "26 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Learning Path Builder", text: "For {job_title} at {company_size} in {industry}, level {level}: create a 90-day onboarding learning path. Week 1 (orientation), Month 1 (role skills), Month 2–3 (advanced). Per item: topic, format, duration, priority (must/should/nice-to-have)." },
      { label: "Skill Gap Analyzer", text: "Given employee profile: {employee_data} and role competency framework for {job_title}: {framework}\n\nIdentify top 5 skill gaps by business impact. For each, recommend 2–3 resources from {lms_platform}. Output as a structured development plan table." },
      { label: "Completion Nudge Drafter", text: "Draft 3 nudge messages for employees who haven't completed {training_name} (deadline: {deadline}):\n(1) First reminder — friendly\n(2) Second reminder — more urgent\n(3) Final notice — escalation tone\nUnder 80 words each, suitable for Slack or email." }
    ]
  },
  {
    id: "performance-management", icon: "🎯", iconBg: "#eef4f0",
    title: "Performance Management",
    desc: "Build agents to draft reviews, flag stale goals, generate coaching nudges, and surface calibration anomalies.",
    level: "adv", levelLabel: "Advanced", lessons: 9, duration: "4.5h",
    tools: ["Betterworks", "Leapsome", "15Five", "Lattice"],
    curriculum: [
      { phase: "Foundations", duration: "45 min", lessons: [
        { name: "Understanding rating distributions", type: "▶", dur: "16 min", free: true },
        { name: "Betterworks / Lattice API primer", type: "⚙️", dur: "14 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "120 min", lessons: [
        { name: "Manager review narrative generator", type: "💬", dur: "28 min", free: false },
        { name: "Goal health scoring & staleness detection", type: "⚙️", dur: "24 min", free: false },
        { name: "Calibration anomaly detection agent", type: "⚙️", dur: "26 min", free: false },
        { name: "Coaching conversation prep agent", type: "▶", dur: "20 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "45 min", lessons: [
        { name: "Performance cycle automation scheduler", type: "⚙️", dur: "22 min", free: false },
        { name: "HRBP calibration summary report builder", type: "📄", dur: "23 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Manager Review Narrative Drafter", text: "Using data for {employee_name} ({job_title}, {tenure}):\n- Goal completion: {goal_data}\n- Peer feedback themes: {peer_themes}\n- Manager notes: {manager_notes}\n- Rating: {rating}\n\nDraft a 3-paragraph review: accomplishments, development areas, forward-looking goals. Professional, specific, direct." },
      { label: "Goal Health Checker", text: "Review OKRs for {team_name} (date: {date}): {okr_list}\n\nFor each goal: on track / at risk / stale? Measurable? Output Green/Yellow/Red health score + 1-sentence rationale + recommended action for Red/Yellow goals." },
      { label: "Calibration Anomaly Spotter", text: "Analyze rating distribution for {org_name} ({review_cycle}): {rating_data}\n\nFlag: managers who rate all employees the same, significant deviation from org curves, all-Exceeds patterns, potential bias signals. Output as HRBP briefing." }
    ]
  },
  {
    id: "recruiting-ats", icon: "🔍", iconBg: "#eef2ff",
    title: "Recruiting & ATS",
    desc: "Automate candidate screening summaries, outreach personalization, pipeline status reporting, and interview prep briefs.",
    level: "beg", levelLabel: "Beginner", lessons: 6, duration: "3h",
    tools: ["Greenhouse", "Lever", "Ashby", "Workday Recruiting"],
    curriculum: [
      { phase: "Foundations", duration: "35 min", lessons: [
        { name: "Where AI adds value in recruiting", type: "▶", dur: "12 min", free: true },
        { name: "Greenhouse & Lever API setup", type: "⚙️", dur: "11 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "80 min", lessons: [
        { name: "Resume screening summary generator", type: "💬", dur: "22 min", free: false },
        { name: "Personalized outreach message drafter", type: "💬", dur: "20 min", free: false },
        { name: "Pipeline health report automation", type: "⚙️", dur: "20 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "25 min", lessons: [
        { name: "Weekly recruiting digest automation", type: "📄", dur: "25 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Resume Screening Summarizer", text: "Review resume for {job_title} at {company}:\n{resume_text}\n\nRequirements: {job_requirements}\n\nProvide: 3-sentence candidate summary, top 3 matching qualifications, top 2 gaps, recommended next step (advance/hold/pass) with rationale." },
      { label: "Outreach Message Personalizer", text: "Draft personalized LinkedIn outreach for:\nName: {name} | Current role: {current_role} at {current_company}\n\nRole: {job_title} at {our_company}. Value prop: {value_prop}\n\n4-sentence message, specific to their background, soft ask at end." },
      { label: "Pipeline Health Reporter", text: "Weekly pipeline report for {hiring_manager}, req {req_id} ({job_title}):\n{pipeline_data}\n\nInclude: candidates by stage, conversion rates, time-in-stage flags (>7 days), top 3 recommendations. Format for Slack." }
    ]
  },
  {
    id: "onboarding", icon: "🚀", iconBg: "#fff8ee",
    title: "Onboarding Automation",
    desc: "Design multi-step agents handling checklists, buddy matching, IT provisioning reminders, and 30-60-90 day check-ins.",
    level: "beg", levelLabel: "Beginner", lessons: 5, duration: "2.5h",
    tools: ["Enboarder", "Sapling", "Talmundo", "Workday"],
    curriculum: [
      { phase: "Foundations", duration: "30 min", lessons: [
        { name: "Cross-functional dependencies: IT, payroll, facilities", type: "▶", dur: "16 min", free: true }
      ]},
      { phase: "Building the Agent", duration: "80 min", lessons: [
        { name: "Dynamic onboarding checklist generator", type: "💬", dur: "22 min", free: false },
        { name: "Buddy matching algorithm design", type: "⚙️", dur: "20 min", free: false },
        { name: "30-60-90 day check-in sequences", type: "💬", dur: "20 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "20 min", lessons: [
        { name: "New hire experience feedback loop", type: "▶", dur: "20 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Dynamic Onboarding Checklist", text: "Create a personalized onboarding checklist for:\nName: {name} | Role: {job_title} | Dept: {department}\nStart: {start_date} | Location: {location} | Manager: {manager}\n\nWeek-by-week for 30 days: Day 1 (pre-arrival), Week 1 (orientation), Weeks 2–4 (ramp-up). Include responsible party for each task." },
      { label: "30-60-90 Check-In Drafter", text: "Draft check-in messages for {manager} to send to {employee} ({job_title}) at 30, 60, and 90 days.\n\nEach: acknowledge milestone, 2 open-ended questions specific to that stage, offer support. Warm but professional. Under 120 words." },
      { label: "Buddy Matching Recommender", text: "New hire profile: {new_hire_profile}\nAvailable buddy pool: {buddy_pool}\n\nRecommend top 2 matches. For each: why the pairing works, what the buddy can help with, suggested first conversation agenda." }
    ]
  },
  {
    id: "compliance", icon: "⚖️", iconBg: "#eef4f0",
    title: "Compliance & Policy Management",
    desc: "Build agents that monitor policy gaps, surface regulatory updates, and auto-draft acknowledgment workflows.",
    level: "adv", levelLabel: "Advanced", lessons: 7, duration: "3.5h",
    tools: ["Navex", "PolicyStat", "Ethena", "DocuSign"],
    curriculum: [
      { phase: "Foundations", duration: "40 min", lessons: [
        { name: "Policy lifecycle: creation → attestation", type: "▶", dur: "14 min", free: true },
        { name: "Navex & PolicyStat API integration", type: "⚙️", dur: "12 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "90 min", lessons: [
        { name: "Regulatory change monitoring agent", type: "⚙️", dur: "28 min", free: false },
        { name: "Policy gap analysis automation", type: "💬", dur: "24 min", free: false },
        { name: "Acknowledgment workflow generator", type: "⚙️", dur: "20 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "30 min", lessons: [
        { name: "Compliance dashboard + CHRO briefing agent", type: "📄", dur: "30 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Regulatory Change Monitor", text: "Given regulatory update: {regulation_summary} (jurisdiction: {jurisdiction}, effective: {effective_date}),\n\nAnalyze impact on HR policy areas: {policy_areas}.\n\nOutput: which policies need updates, new policies needed, affected populations, action timeline, draft communications. Flag items requiring legal review." },
      { label: "Policy Gap Analyzer", text: "Review HR policies: {policy_list}\n\nAudit against best practices for {company_size} in {industry} operating in {jurisdictions}.\n\nIdentify: missing, outdated, ambiguous, or conflicting policies. Gap analysis matrix with priority ratings (Critical/High/Medium/Low)." },
      { label: "Acknowledgment Workflow Drafter", text: "Create acknowledgment workflow for {policy_name} (v{version}, effective {date}).\n\nInclude: notification message, reminder sequence (Day 1/7/14), manager escalation at Day 14, HR escalation at Day 21. Full draft text for each touchpoint." }
    ]
  },
  {
    id: "comp-benchmarking", icon: "💰", iconBg: "#eef2ff",
    title: "Job Architecture & Comp Benchmarking",
    desc: "Create agents that match roles to market data, flag out-of-band offers, and auto-draft job level frameworks.",
    level: "adv", levelLabel: "Advanced", lessons: 8, duration: "4h",
    tools: ["Radford/Aon", "Mercer", "Pave", "Workday Comp"],
    curriculum: [
      { phase: "Foundations", duration: "50 min", lessons: [
        { name: "Salary survey methodology & market positioning", type: "▶", dur: "18 min", free: true },
        { name: "Connecting to Radford / Pave APIs", type: "⚙️", dur: "14 min", free: false }
      ]},
      { phase: "Building the Agent", duration: "105 min", lessons: [
        { name: "Pay band generator from market data", type: "💬", dur: "25 min", free: false },
        { name: "Offer flag agent: in-band vs. exception", type: "⚙️", dur: "24 min", free: false },
        { name: "Job description → job level classifier", type: "💬", dur: "28 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "45 min", lessons: [
        { name: "Annual comp review cycle automation", type: "▶", dur: "22 min", free: false },
        { name: "Pay equity analysis summary agent", type: "📄", dur: "23 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Pay Band Generator", text: "Using market data for {job_title} at {job_level} in {location} ({survey_source}, {survey_year}): {market_data}\n\nGenerate pay band: minimum, midpoint, maximum, range spread %, compa-ratio for current employees, rationale for positioning at target {target_percentile}." },
      { label: "Offer Flag Checker", text: "Review offer:\nCandidate: {name} | Role: {job_title} | Level: {level} | Location: {location}\nProposed base: {salary} | Proposed equity: {equity}\n\nVs. current band: {pay_band} | Equity range: {equity_range}\n\nFlag: in/below/above band, % deviation, approval routing recommendation." },
      { label: "Job Level Classifier", text: "Classify this JD using {company_name} job architecture: {framework}\n\nJD: {job_description}\n\nProvide: recommended job family, level with confidence score, key classification signals, alternative level to consider. Flag ambiguities." }
    ]
  },
  {
    id: "dei-analytics", icon: "📊", iconBg: "#fff8ee",
    title: "DEI Analytics & Reporting",
    desc: "Build agents that surface representation gaps, auto-generate board-ready reports, and track goal progress.",
    level: "int", levelLabel: "Intermediate", lessons: 6, duration: "3h",
    tools: ["Visier", "Dandi", "Included", "Workday People Analytics"],
    curriculum: [
      { phase: "Foundations", duration: "35 min", lessons: [
        { name: "Representation vs. equity vs. inclusion: what to measure", type: "▶", dur: "19 min", free: true }
      ]},
      { phase: "Building the Agent", duration: "85 min", lessons: [
        { name: "Representation gap analysis automation", type: "⚙️", dur: "24 min", free: false },
        { name: "DEI board report auto-generator", type: "💬", dur: "28 min", free: false },
        { name: "Goal tracking & progress narrative agent", type: "💬", dur: "22 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "20 min", lessons: [
        { name: "Quarterly DEI dashboard narrative generator", type: "📄", dur: "20 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Representation Gap Analyzer", text: "Given workforce representation by {dimension} across levels: {representation_data},\nAnd benchmarks: {benchmark_data},\n\nIdentify: levels with largest gaps vs. benchmark, pipeline vs. leadership disparity, year-over-year trend, top 3 focus areas. Present as briefing. No causal claims without data." },
      { label: "DEI Board Report Generator", text: "Quarterly DEI board report for {company_name}, {quarter}.\nData: {dei_data} | Commitments: {public_commitments}\n\nStructure: Executive Summary (4 sentences), Representation Scorecard, Highlights, Areas Requiring Attention, Next Quarter Actions." },
      { label: "Hiring Funnel Equity Auditor", text: "Analyze hiring funnel for {job_family} over {time_period}: {funnel_data}\n\nFor each stage: pass-through rates by {demographic_dimension}. Flag significant drop-off disparities. Recommend 2 process interventions per flagged stage." }
    ]
  },
  {
    id: "document-generation", icon: "📄", iconBg: "#eef4f0",
    title: "Document & Offer Letter Generation",
    desc: "Automate offer letter drafting, addendum generation, document routing, and e-signature triggers.",
    level: "beg", levelLabel: "Beginner", lessons: 5, duration: "2.5h",
    tools: ["DocuSign CLM", "PandaDoc", "Ironclad", "Workday"],
    curriculum: [
      { phase: "Foundations", duration: "30 min", lessons: [
        { name: "Offer letter anatomy: required vs. optional elements", type: "▶", dur: "16 min", free: true }
      ]},
      { phase: "Building the Agent", duration: "75 min", lessons: [
        { name: "Dynamic offer letter template engine", type: "💬", dur: "26 min", free: false },
        { name: "Addendum & amendment generator", type: "💬", dur: "22 min", free: false },
        { name: "DocuSign routing automation", type: "⚙️", dur: "27 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "25 min", lessons: [
        { name: "Document audit trail & archiving automation", type: "⚙️", dur: "25 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Offer Letter Drafter", text: "Draft offer letter for:\nCandidate: {name} | Role: {job_title} | Level: {level} | Dept: {department}\nManager: {manager} | Start: {start_date} | Base: {salary} | Bonus: {bonus}%\nEquity: {equity} | Location: {location} | Entity: {legal_entity}\n\nInclude welcome paragraph, role details, comp summary, contingencies, at-will language, next steps. Comply with {state} law." },
      { label: "Promotion Letter Generator", text: "Promotion letter for {employee} ({current_title} → {new_title}, effective {date}).\nNew comp: Base {salary}, Bonus {bonus}%, Equity refresh {equity}.\n\nAcknowledge performance, describe new scope, comp change summary, next steps. Warm and celebratory. Under 300 words." },
      { label: "DocuSign Routing Workflow", text: "Design routing workflow for {document_type}.\nSignatories: {signatories} | Order: {signing_order} | Deadline: {deadline}\n\nOutput: routing sequence, reminder schedule (Days 1/3/5), escalation contacts, post-completion actions." }
    ]
  },
  {
    id: "employee-relations", icon: "🤝", iconBg: "#eef2ff",
    title: "Employee Relations Case Mgmt",
    desc: "Build triage agents that classify ER cases, route to the right partner, surface precedent docs, and track resolution.",
    level: "adv", levelLabel: "Advanced", lessons: 8, duration: "3.5h",
    tools: ["HR Acuity", "Dovetail", "ServiceNow HR", "Workday Case Mgmt"],
    curriculum: [
      { phase: "Foundations", duration: "40 min", lessons: [
        { name: "Privilege, confidentiality & documentation guardrails", type: "▶", dur: "24 min", free: true }
      ]},
      { phase: "Building the Agent", duration: "100 min", lessons: [
        { name: "Case intake triage classifier", type: "⚙️", dur: "28 min", free: false },
        { name: "Case routing logic by type & severity", type: "⚙️", dur: "24 min", free: false },
        { name: "Precedent document retrieval agent", type: "💬", dur: "24 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "30 min", lessons: [
        { name: "ER case trend reporting for CHRO", type: "📄", dur: "30 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Case Triage Classifier", text: "Classify ER intake: \"{intake_text}\"\n\nClassify:\n(1) Case type: [Harassment/Discrimination/Retaliation/Performance/Conduct/Leave/Compensation/Other]\n(2) Severity: [Critical/High/Medium/Low]\n(3) Urgency: [Immediate/Within 48h/Routine]\n(4) Routing: [HRBP/ER Specialist/Legal/CHRO]\n(5) Recommended initial action\n\nRationale + flag legally sensitive elements." },
      { label: "Investigation Timeline Builder", text: "Build investigation timeline:\nCase type: {case_type} | Reported: {report_date}\nParties: {parties} | Allegation: {allegation}\n\nGenerate: investigation steps in sequence, timeline per step, who conducts each step, documentation required, typical resolution path." },
      { label: "ER Trend Report Generator", text: "Quarterly ER trend report for {org_name}, {quarter}.\nCase data: {case_data}\n\nInclude: case volume by type vs. prior quarter, average resolution time, departments with elevated volumes, risk signals for CHRO/Legal, 3 recommended process improvements." }
    ]
  },
  {
    id: "benefits-admin", icon: "🏥", iconBg: "#fff8ee",
    title: "Benefits Administration",
    desc: "Create open enrollment assistants, coverage comparison agents, life-event automation, and ticket deflection bots.",
    level: "int", levelLabel: "Intermediate", lessons: 7, duration: "3h",
    tools: ["Benefitfocus", "PlanSource", "Workday Benefits", "bswift"],
    curriculum: [
      { phase: "Foundations", duration: "35 min", lessons: [
        { name: "Open enrollment cycle & life event triggers", type: "▶", dur: "19 min", free: true }
      ]},
      { phase: "Building the Agent", duration: "85 min", lessons: [
        { name: "Open enrollment FAQ & decision assistant", type: "💬", dur: "26 min", free: false },
        { name: "Plan comparison generator", type: "💬", dur: "22 min", free: false },
        { name: "Life event workflow automation", type: "⚙️", dur: "20 min", free: false }
      ]},
      { phase: "Deploy & Operationalize", duration: "20 min", lessons: [
        { name: "OE completion tracking & nudge automation", type: "📄", dur: "20 min", free: false }
      ]}
    ],
    prompts: [
      { label: "Open Enrollment Decision Assistant", text: "Employee question during OE: \"{employee_question}\"\nPlan options: {plan_options} | Employee profile: {profile}\n\nProvide: plain-language answer, plan recommendation with cost comparison, deadline reminders. Do not provide medical advice." },
      { label: "Plan Comparison Generator", text: "Side-by-side comparison of medical plans for {company} {plan_year}: {plan_data}\n\nTable covering: monthly premium, deductible, OOP max, copay structure, HSA eligibility, network type.\n\nBelow: 3-sentence recommendation for (a) rarely-uses-healthcare, (b) family/chronic conditions, (c) expecting major medical event." },
      { label: "Life Event Workflow Automator", text: "Automated workflow for life event: {life_event} triggered for {employee} on {event_date}.\n\nOutput: available benefits changes + deadlines, required documentation, employee instructions, HR action items, confirmation message template." }
    ]
  }
];
