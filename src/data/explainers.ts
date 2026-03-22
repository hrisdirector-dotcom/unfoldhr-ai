export interface ExplainerProblemCard {
  ico: string;
  h: string;
  p: string;
  tag: string;
}

export interface ExplainerNode {
  ico: string;
  lbl: string;
  sub: string;
  bg: string;
  brd: string;
}

export interface ExplainerStep {
  h: string;
  p: string;
  code: string;
}

export interface ExplainerMetric {
  pct: string;
  n: string;
  u: string;
  l: string;
}

export interface Explainer {
  id: string;
  modNum: string;
  modTitle: string;
  badge: string;
  h1: string;
  sub: string;
  duration: string;
  level: string;
  tools: string;
  s1h: string;
  s1p: string;
  problemCards: ExplainerProblemCard[];
  s2h: string;
  nodes: ExplainerNode[];
  s3h: string;
  steps: ExplainerStep[];
  s4h: string;
  s4p: string;
  promptLines: string[];
  terminalLines: string[];
  s5label: string;
  metrics: ExplainerMetric[];
  quote: string;
}

export const EXPLAINERS: Explainer[] = [
  {
    id: "workforce-planning",
    modNum: "01",
    modTitle: "Workforce Planning & Headcount",
    badge: "Workforce Planning & Headcount",
    h1: "What is a\nWorkforce Planning Agent?",
    sub: "How AI agents transform manual headcount work into intelligent, automated strategy — so your team focuses on decisions, not data wrangling.",
    duration: "12 min",
    level: "Beginner",
    tools: "Anaplan · Workday · Pigment",
    s1h: "Your HR team spends weeks on work that takes minutes.",
    s1p: "Workforce planning requires pulling data from multiple systems, reconciling spreadsheets, and formatting executive proposals — before any actual strategic thinking happens. That's the problem agents solve.",
    problemCards: [
      { ico: "📊", h: "Manual data extraction", p: "Pulling headcount actuals from Workday, budget data from Anaplan, and org structure from spreadsheets — every single planning cycle.", tag: "~4 hours per cycle" },
      { ico: "📝", h: "Writing proposals from scratch", p: "Drafting headcount justifications, cost impact summaries, and risk sections for every business unit request.", tag: "~6 hours per proposal" },
      { ico: "🔄", h: "Endless revision cycles", p: "Reformatting and re-sending updated versions every time a leader asks \"what if we hired 2 fewer in Q3?\"", tag: "~3 hours per scenario" },
    ],
    s2h: "A Workforce Planning Agent handles all of it.",
    nodes: [
      { ico: "📥", lbl: "Data Sources", sub: "Workday · Anaplan · Excel · Pigment", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🤖", lbl: "Your Agent", sub: "unfold HR powered", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "📋", lbl: "Outputs", sub: "Proposals · Scenarios · Summaries", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "👤", lbl: "You", sub: "Focus on decisions, not formatting", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps. One agent. Done.",
    steps: [
      { h: "Connect your data sources", p: "The agent connects to Workday REST API, Anaplan, or your Excel exports via one-time configuration. No ongoing manual data work.", code: "const data = await workday.getWorkers({ tenant: YOUR_TENANT });" },
      { h: "Describe what you need in plain language", p: "You give the agent business context — growth targets, budget constraints, timeline. No spreadsheet formulas, no SQL, no engineering required.", code: "\"Draft a headcount proposal for Engineering.\n Target: +12 FTE in H1. Budget: $2.4M.\n Include 2 scenarios and flag risks.\"" },
      { h: "Receive executive-ready output instantly", p: "Structured headcount proposal, scenario comparisons, cost impact table, and prioritized risks — ready to share with leadership in seconds.", code: "→ headcount_proposal_v1.pdf\nScenarios: 3 · Risks flagged: 4 · Time: 8 sec" },
    ],
    s4h: "Watch the agent work.",
    s4p: "This is the actual prompt you'd give your Workforce Planning Agent. The output is generated live — no templates, no copy-paste, no manual formatting.",
    promptLines: ["// Your prompt", "You are a Workforce Planning Agent.", "Business unit: {Engineering}", "Growth target: {+12 FTE, H1 2025}", "Budget ceiling: {$2.4M annualized}", "Draft an exec headcount proposal", "with 2 scenarios and top risks."],
    terminalLines: ["✓ Connected to Workday REST API", "✓ Fetched 847 worker records", "→ Analyzing Engineering headcount…", " ", "## HEADCOUNT PROPOSAL — ENGINEERING", "Prepared by: unfold HR agent · Q1 2025", " ", "SCENARIO A: Full Hire — 12 FTE in H1", "  Cost impact: $2.38M · Timeline: Feb–Jun", "SCENARIO B: Phased — 8 FTE H1, 4 FTE H2", "  Cost impact: $2.41M · Lower ramp risk", " ", "⚠ RISKS (4 identified):", "  1. Q1 recruiter capacity constraint", "  2. Manager span exceeds 8:1 in 2 teams", "✓ Proposal complete"],
    s5label: "What your team gets back.",
    metrics: [{ pct: "88%", n: "13", u: "hrs", l: "" }, { pct: "96%", n: "8", u: "sec", l: "" }, { pct: "72%", n: "∞", u: "", l: "" }],
    quote: "Direct the agent to run the numbers.\nYour job is to make the decision.",
  },
  {
    id: "employee-listening",
    modNum: "02",
    modTitle: "Employee Listening & Engagement",
    badge: "Employee Listening",
    h1: "Automating Survey Analysis",
    sub: "How AI agents read every survey response, tag sentiment, and generate manager action plans — so no employee voice goes unheard.",
    duration: "14 min",
    level: "Beginner",
    tools: "Glint · Qualtrics · Lattice",
    s1h: "Survey data piles up. Action plans never get written.",
    s1p: "Quarterly engagement surveys generate thousands of open-text responses. Most go unread. Action plans are written once, filed, and forgotten — not because HR doesn't care, but because the volume is simply unmanageable manually.",
    problemCards: [
      { ico: "📬", h: "Thousands of unread responses", p: "A 500-person company survey generates 1,500+ open-text responses. HR reads summaries. Individual voices disappear.", tag: "~40 hrs to read manually" },
      { ico: "📋", h: "Generic action plans", p: "Without time to analyze themes, action plans end up generic — 'improve communication' — with no connection to what employees actually said.", tag: "Low follow-through rate" },
      { ico: "⏳", h: "Insights arrive months late", p: "By the time analysis is complete and plans are drafted, the moment has passed and employees assume nothing will change.", tag: "3–6 month lag" },
    ],
    s2h: "The agent reads every response, tags every theme, and writes every action plan.",
    nodes: [
      { ico: "📥", lbl: "Survey Export", sub: "Glint · Qualtrics", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🧠", lbl: "Sentiment Engine", sub: "NLP classification", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "🏷️", lbl: "Theme Tagger", sub: "14 dimensions", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📋", lbl: "Action Plans", sub: "Per manager", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from survey close to manager-ready action plans.",
    steps: [
      { h: "Connect the survey platform", p: "The agent connects directly to Glint, Qualtrics, or Lattice via API. No CSV export, no manual download.", code: "const survey = await glint.getSurveyResults({ cycle: \"Q1-2025\" });" },
      { h: "Tag sentiment across every open-text response", p: "The agent classifies each response as positive, neutral, or negative, then maps it to 14 theme dimensions — workload, leadership, growth, and more.", code: "\"She never listens to our concerns\"\n→ Sentiment: Negative · Theme: Manager Relationship" },
      { h: "Generate a manager action plan for each team", p: "For every manager with low-scoring dimensions, the agent writes a specific, measurable 90-day action plan tied to actual employee language.", code: "→ action_plan_sarah_chen_team.pdf\nActions: 3 · Dimensions: 2 · Time: 4 sec" },
    ],
    s4h: "Watch the agent analyze a real survey cycle.",
    s4p: "This is what your agent does with 1,400 survey responses in under 10 seconds — something that would take your HR team two weeks.",
    promptLines: ["// Your prompt", "You are an Engagement Analysis Agent.", "Survey platform: {Glint}", "Cycle: {Q1-2025}", "For each manager team: classify sentiment,", "tag themes, and generate a 90-day action plan."],
    terminalLines: ["✓ Connected to Glint API", "✓ Loaded 1,412 responses · Q1 2025", "→ Running sentiment classification…", " ", "## TEAM: Sarah Chen (Engineering, 12 reports)", "Low scores: Manager Relationship (3.1), Career Growth (3.4)", " ", "TOP THEMES IN OPEN TEXT:", "  • \"Not enough 1:1 time\" — 7 mentions", "  • \"Unclear promotion criteria\" — 5 mentions", " ", "ACTION PLAN — 90 DAYS:", "  1. Establish weekly 1:1s (owner: Sarah, Week 1)", "  2. Share promotion rubric at team meeting (Week 2)", "  3. Mid-cycle check-in survey (Day 45)", "✓ Plan ready"],
    s5label: "What your team gets back.",
    metrics: [{ pct: "92%", n: "1,400", u: "responses", l: "" }, { pct: "88%", n: "14", u: "plans", l: "" }, { pct: "95%", n: "10", u: "sec", l: "" }],
    quote: "The agent reads every word. You have the conversation.",
  },
  {
    id: "learning-development",
    modNum: "03",
    modTitle: "Learning & Development (LMS)",
    badge: "Learning & Development",
    h1: "Building Learning Paths with AI",
    sub: "How AI agents identify skill gaps, curate personalized learning paths, and automate completion nudges — so every employee gets the development they need.",
    duration: "16 min",
    level: "Intermediate",
    tools: "Cornerstone · Docebo · 360Learning",
    s1h: "Learning programs exist. Employees don't finish them.",
    s1p: "Most LMS platforms are full of content that nobody is guided to. Without personalized paths and intelligent nudges, completion rates stay low and skill gaps go unaddressed.",
    problemCards: [
      { ico: "📚", h: "Generic learning catalogs", p: "One-size-fits-all content libraries with no connection to individual roles, skill levels, or career goals.", tag: "Low engagement" },
      { ico: "📉", h: "Poor completion rates", p: "Without contextual nudges and deadline reminders, mandatory training deadlines are missed and development stalls.", tag: "~30% avg completion" },
      { ico: "🎯", h: "No skill gap visibility", p: "HR can't see which teams have critical capability gaps until a business problem surfaces — by then it's too late.", tag: "Reactive, not proactive" },
    ],
    s2h: "The agent maps skills, curates paths, and nudges completion automatically.",
    nodes: [
      { ico: "👤", lbl: "Employee Profile", sub: "Role · Level · Skills", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🧩", lbl: "Gap Analyzer", sub: "Skills vs. target", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "🗺️", lbl: "Path Builder", sub: "Curated content", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📲", lbl: "Nudge Engine", sub: "Slack · Email", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Four steps from employee profile to completed development.",
    steps: [
      { h: "Ingest employee data and role framework", p: "The agent pulls current skills, job level, and career goals from Workday Learning or your LMS, then maps against the role competency framework.", code: "const profile = await cornerstone.getEmployee({ id: \"emp_4421\" });" },
      { h: "Identify skill gaps by business priority", p: "Agent compares current competencies against target framework, ranks gaps by business impact, and selects the right content from the LMS catalog.", code: "Gap: Data Analysis (P1) → 3 courses matched\nGap: Stakeholder Comms (P2) → 2 workshops" },
      { h: "Deliver personalized path and automate nudges", p: "Agent builds a 90-day learning plan and schedules Slack nudges, deadline reminders, and manager updates — no manual follow-up.", code: "→ learning_path_j_smith.pdf\nCourses: 5 · Nudges scheduled: 8 · Time: 6 sec" },
    ],
    s4h: "Watch the agent build a learning path.",
    s4p: "This is what your agent produces for a mid-level analyst in seconds — a personalized 90-day path with automated nudges already scheduled.",
    promptLines: ["// Your prompt", "You are an L&D Curriculum Agent.", "Employee: {Jamie Smith, L3 Analyst}", "Role framework: {Senior Analyst track}", "Identify top skill gaps and build a", "90-day personalized learning path."],
    terminalLines: ["✓ Connected to Cornerstone LMS", "✓ Loaded employee profile: Jamie Smith, L3 Analyst", "→ Running gap analysis against role framework…", " ", "## 90-DAY LEARNING PLAN — JAMIE SMITH", "Top gaps: Data Analysis (P1), Executive Comms (P2)", " ", "WEEK 1–2:", "  • Data Analysis Fundamentals (3.5h) — must", "  • SQL for Non-Engineers (2h) — must", "MONTH 2:", "  • Executive Storytelling Workshop (4h) — should", "  • Stakeholder Influence (1.5h) — should", "Nudges: 8 scheduled via Slack", "✓ Path ready"],
    s5label: "What your L&D function gets back.",
    metrics: [{ pct: "90%", n: "90", u: "day", l: "" }, { pct: "78%", n: "8✕", u: "more", l: "" }, { pct: "96%", n: "0", u: "hrs", l: "" }],
    quote: "The agent curates the path. You develop the person.",
  },
  {
    id: "performance-management",
    modNum: "04",
    modTitle: "Performance Management",
    badge: "Performance Management",
    h1: "AI-Powered Review Cycles",
    sub: "How AI agents draft performance reviews, detect calibration anomalies, flag stale goals, and prepare managers for coaching conversations.",
    duration: "18 min",
    level: "Advanced",
    tools: "Betterworks · Leapsome · Lattice",
    s1h: "Review cycles consume weeks. Quality is inconsistent.",
    s1p: "Performance reviews are one of the highest-stakes HR processes — and the most time-consuming. Managers write inconsistently, goals go stale, and calibration bias goes undetected.",
    problemCards: [
      { ico: "✍️", h: "Inconsistent review quality", p: "Managers write reviews in wildly different styles — some specific and useful, others vague and legally risky. HR spends weeks editing.", tag: "~3 hrs per manager" },
      { ico: "🎯", h: "Stale goals nobody tracks", p: "OKRs are set in January and rarely updated. By review time, nobody can remember what was agreed — or whether it was achieved.", tag: "60%+ goals never updated" },
      { ico: "⚖️", h: "Calibration bias undetected", p: "Rating inflation, leniency bias, and manager-level inconsistencies only surface during calibration sessions — too late to fix.", tag: "~40% sessions overrun" },
    ],
    s2h: "The agent drafts, scores, detects anomalies, and preps coaching.",
    nodes: [
      { ico: "📊", lbl: "Performance Data", sub: "Goals · Ratings · Feedback", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🤖", lbl: "Review Agent", sub: "Narrative drafts", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "🔍", lbl: "Anomaly Detector", sub: "Calibration flags", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
      { ico: "💬", lbl: "Coaching Prep", sub: "Manager briefs", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
    ],
    s3h: "Three steps from raw data to calibration-ready reviews.",
    steps: [
      { h: "Pull goal completion, peer feedback, and manager notes", p: "Agent ingests structured data from Betterworks or Lattice — goal scores, peer themes, manager notes — and builds a data profile for each employee.", code: "const data = await lattice.getReviewData({ emp: \"emp_881\", cycle: \"H2-2024\" });" },
      { h: "Draft a balanced, specific review narrative", p: "Agent generates a 3-paragraph narrative: accomplishments grounded in data, development areas with examples, and forward-looking goals. Consistent, professional, reviewable.", code: "P1: Accomplished: Led migration delivering $420K savings…\nP2: Growth area: Executive communication visibility…" },
      { h: "Detect calibration anomalies before the session", p: "Agent scans rating distributions across managers, flags inflation patterns, all-Exceeds teams, and statistical outliers before calibration begins.", code: "⚠ Manager Webb: 100% \"Exceeds\" ratings\nFlag: Significant deviation from org curve" },
    ],
    s4h: "Watch the agent draft a complete review.",
    s4p: "This is a real review narrative the agent generates in seconds — grounded in goal data, peer feedback, and manager notes. Ready to review, not to start from scratch.",
    promptLines: ["// Your prompt", "You are a Performance Review Agent.", "Employee: {Marcus Webb, Sr. Engineer}", "Cycle: {H2 2024}", "Rating: {Exceeds Expectations}", "Draft a 3-paragraph review narrative."],
    terminalLines: ["✓ Connected to Lattice Performance API", "✓ Loaded review data: Marcus Webb, Senior Engineer", "→ Drafting performance narrative…", " ", "## PERFORMANCE REVIEW — MARCUS WEBB", "Cycle: H2 2024 · Rating: Exceeds Expectations", " ", "ACCOMPLISHMENTS:", "  Led platform migration, $420K cost reduction.", "  Mentored 3 junior engineers to L2 promotion.", "DEVELOPMENT AREAS:", "  Increase exec visibility on cross-functional work.", "FORWARD-LOOKING GOALS:", "  Own architecture for Q2 product launch.", "✓ Review ready"],
    s5label: "What your HR and manager teams get back.",
    metrics: [{ pct: "85%", n: "3", u: "min", l: "" }, { pct: "92%", n: "100%", u: "covered", l: "" }, { pct: "80%", n: "4", u: "flags", l: "" }],
    quote: "The agent drafts the review. You make the call on the person.",
  },
  {
    id: "recruiting-ats",
    modNum: "05",
    modTitle: "Recruiting & ATS",
    badge: "Recruiting",
    h1: "Automating Candidate Screening",
    sub: "How AI agents summarize resumes, personalize outreach, report pipeline health, and prepare interview briefs — so recruiters focus on relationships.",
    duration: "12 min",
    level: "Beginner",
    tools: "Greenhouse · Lever · Ashby",
    s1h: "Recruiters spend more time on admin than on candidates.",
    s1p: "The average recruiter spends 60% of their time on tasks that don't require human judgment — formatting screen notes, sending follow-ups, chasing pipeline status.",
    problemCards: [
      { ico: "📄", h: "Resume screening volume", p: "100+ applications per role. Summarizing each one takes 10–15 minutes. That's 25 hours of reading before a single decision is made.", tag: "25+ hrs per role" },
      { ico: "📧", h: "Generic outreach messages", p: "Copy-paste outreach gets ignored. Personalizing each message takes time most recruiters don't have.", tag: "~18% response rate" },
      { ico: "📊", h: "No pipeline visibility", p: "Hiring managers ask for updates. Recruiters have to manually compile pipeline data from the ATS every time.", tag: "2–3 hrs per update" },
    ],
    s2h: "The agent screens, personalizes, and reports — while you connect.",
    nodes: [
      { ico: "📥", lbl: "ATS Pipeline", sub: "Greenhouse · Lever", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🔍", lbl: "Screen Agent", sub: "Resume summaries", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "✉️", lbl: "Outreach Writer", sub: "Personalized msgs", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📊", lbl: "Pipeline Reporter", sub: "Hiring manager brief", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from application to hiring manager update.",
    steps: [
      { h: "Connect to the ATS and pull candidate data", p: "Agent connects to Greenhouse or Lever via Harvest API, pulling structured application data, resumes, and stage history.", code: "const candidates = await greenhouse.getCandidates({ job_id: \"req_4421\" });" },
      { h: "Generate a screening summary for each candidate", p: "Agent reads the resume, compares against job requirements, and produces a 5-line summary: qualifications, gaps, and a recommended next step.", code: "Match: 4/5 requirements · Gap: No enterprise exp\nRecommendation: Advance to phone screen" },
      { h: "Deliver the weekly pipeline health report", p: "Agent compiles conversion rates by stage, flags candidates stuck more than 7 days without movement, and surfaces 3 actions to accelerate the hire.", code: "→ pipeline_report_week_12.pdf\nStuck candidates: 3 · Actions: 3 · Time: 5 sec" },
    ],
    s4h: "Watch the agent screen a candidate.",
    s4p: "This is what your agent produces for every application — in seconds, consistently, with no reviewer fatigue by candidate 50.",
    promptLines: ["// Your prompt", "You are a Recruiting Screen Agent.", "Req: {Senior Product Manager}", "Candidate: {Priya Nair}", "Summarize qualifications, gaps,", "and recommend next step."],
    terminalLines: ["✓ Connected to Greenhouse Harvest API", "✓ Loaded req: Senior Product Manager (req_4421)", "→ Screening candidate: Priya Nair…", " ", "## SCREEN SUMMARY — PRIYA NAIR", "Current: PM at Stripe (3 yrs) | Prior: Atlassian (2 yrs)", " ", "QUALIFICATIONS MET (4/5):", "  ✓ B2B SaaS product experience", "  ✓ Led 0→1 product launches", "  ✓ Strong technical fluency", "GAP: No payments/fintech domain experience", " ", "RECOMMENDATION: Advance to phone screen", "  Domain gap bridgeable with context.", "✓ Summary ready"],
    s5label: "What your recruiting team gets back.",
    metrics: [{ pct: "88%", n: "15", u: "min", l: "" }, { pct: "92%", n: "3✕", u: "pipeline", l: "" }, { pct: "95%", n: "100", u: "%", l: "" }],
    quote: "The agent screens every application. You build the relationship.",
  },
  {
    id: "onboarding",
    modNum: "06",
    modTitle: "Onboarding Automation",
    badge: "Onboarding",
    h1: "Automating the New Hire Experience",
    sub: "How AI agents generate personalized checklists, match buddies, send 30-60-90 day check-ins, and coordinate IT provisioning — so new hires feel the care from day one.",
    duration: "10 min",
    level: "Beginner",
    tools: "Enboarder · Sapling · Workday",
    s1h: "Onboarding is critical. Most of it still runs on spreadsheets.",
    s1p: "First impressions determine retention. Yet onboarding coordination still relies on manual checklists, forgotten emails, and IT tickets that take two weeks to resolve.",
    problemCards: [
      { ico: "📋", h: "Generic checklists", p: "Every new hire gets the same checklist regardless of role, location, or department. Relevant steps are missed. Irrelevant ones add confusion.", tag: "50% of steps missed" },
      { ico: "🤝", h: "No buddy matching", p: "Buddy programs exist on paper. In practice, the same 3 volunteers get assigned to everyone — or nobody gets assigned at all.", tag: "Inconsistent coverage" },
      { ico: "📅", h: "Check-ins that never happen", p: "Managers intend to check in at 30, 60, and 90 days. Without automated prompts, it rarely happens consistently.", tag: "60% missed by Day 90" },
    ],
    s2h: "The agent coordinates every step of onboarding automatically.",
    nodes: [
      { ico: "📝", lbl: "Hire Profile", sub: "Role · Location · Start date", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "⚙️", lbl: "Checklist Builder", sub: "Personalized steps", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "🤝", lbl: "Buddy Matcher", sub: "Best-fit pairing", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📅", lbl: "Check-in Scheduler", sub: "30-60-90 messages", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from offer accept to 90-day success.",
    steps: [
      { h: "Ingest the new hire profile and generate a custom checklist", p: "Agent reads role, department, location, and work arrangement, then builds a week-by-week checklist with responsible parties for each task.", code: "const hire = await workday.getNewHire({ id: \"nh_2241\" });\nconst checklist = agent.buildChecklist(hire);" },
      { h: "Match the new hire to the best onboarding buddy", p: "Agent scores buddy candidates by role proximity, seniority gap, shared background, and availability — then recommends the top two matches.", code: "Match 1: Jordan Lee (score: 94/100)\nReason: Same function, 18mo tenure, prev. onboarding volunteer" },
      { h: "Schedule 30-60-90 day check-in messages for the manager", p: "Agent drafts and schedules three contextual check-in messages, each tailored to the milestone, delivered automatically on the right day.", code: "→ Day 30, Day 60, Day 90 messages scheduled\nChannel: Slack · Manager: auto-CC'd at Day 90" },
    ],
    s4h: "Watch the agent build a full onboarding plan.",
    s4p: "This is what the agent produces in seconds for a new Remote Senior Engineer — a personalized checklist, buddy recommendation, and 90-day check-in sequence.",
    promptLines: ["// Your prompt", "You are an Onboarding Orchestration Agent.", "New hire: {Alex Rivera, Sr. Engineer}", "Start date: {March 3, 2025}", "Work arrangement: {Remote}", "Build checklist, match buddy, schedule check-ins."],
    terminalLines: ["✓ New hire detected: Alex Rivera, Sr. Engineer (Remote)", "✓ Start date: March 3, 2025", "→ Building personalized onboarding plan…", " ", "## ONBOARDING PLAN — ALEX RIVERA", "DAY 1: Equipment delivery · Workday access · Team intro", "WEEK 1: 1:1 with manager · Codebase orientation · IT setup", "MONTH 1: First PR merged · Meet 5 stakeholders", " ", "BUDDY MATCH: Jordan Lee (score: 94/100)", "CHECK-INS: Day 30, 60, 90 — scheduled in Slack", "IT TICKETS: Laptop, GitHub, AWS access — auto-created", "✓ Plan complete"],
    s5label: "What your HR team and new hires get back.",
    metrics: [{ pct: "94%", n: "100", u: "%", l: "" }, { pct: "88%", n: "Day 1", u: "ready", l: "" }, { pct: "82%", n: "3✕", u: "retention", l: "" }],
    quote: "The agent handles every coordination step. You build the welcome.",
  },
  {
    id: "compliance",
    modNum: "07",
    modTitle: "Compliance & Policy Management",
    badge: "Compliance",
    h1: "AI-Powered Compliance Monitoring",
    sub: "How AI agents monitor regulatory changes, audit policy gaps, generate acknowledgment workflows, and track completion — so your org stays ahead of risk.",
    duration: "14 min",
    level: "Advanced",
    tools: "Navex · PolicyStat · Ethena",
    s1h: "Compliance is reactive until it isn't.",
    s1p: "Most organizations discover a policy gap when something goes wrong — not before. Regulatory monitoring, policy auditing, and acknowledgment tracking are critical but chronically underfunded in HR ops.",
    problemCards: [
      { ico: "⚖️", h: "Regulatory blind spots", p: "New federal and state employment regulations are published constantly. HR teams find out about changes from legal bills, not proactive monitoring.", tag: "Avg 6-month lag" },
      { ico: "📁", h: "Outdated policy libraries", p: "PolicyStat and similar platforms have hundreds of documents. Without audits, stale policies create legal exposure that nobody knows about.", tag: "~30% policies outdated" },
      { ico: "✍️", h: "Manual acknowledgment chasing", p: "Open enrollment, policy updates, and new hire acknowledgments require HR to manually track who has and hasn't signed — in spreadsheets.", tag: "~4 hrs per policy cycle" },
    ],
    s2h: "The agent monitors, audits, and routes — before risk becomes reality.",
    nodes: [
      { ico: "📡", lbl: "Regulatory Feed", sub: "eCFR · Regulations.gov", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🔍", lbl: "Gap Auditor", sub: "Policy comparison", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "📋", lbl: "Workflow Builder", sub: "Acknowledgment routing", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📊", lbl: "Completion Tracker", sub: "Real-time dashboard", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from regulatory update to signed acknowledgment.",
    steps: [
      { h: "Monitor regulatory feeds and flag relevant changes", p: "Agent watches eCFR, Regulations.gov, and state employment law feeds. When a relevant change is detected, it maps impact to your existing policy library.", code: "const updates = await ecfr.getChanges({ title: \"29\", since: \"2025-01-01\" });" },
      { h: "Audit current policies against updated requirements", p: "Agent compares your policy library to the new regulatory requirements, flags gaps and outdated language, and prioritizes by risk level.", code: "⚠ Remote Work Policy: Missing CA Pay Transparency clause\nPriority: Critical · Effective: Jan 1, 2025" },
      { h: "Generate and route the acknowledgment workflow", p: "Agent creates the policy notification, schedules reminders at Day 1, 7, and 14, and routes manager escalations for non-completers automatically.", code: "→ Acknowledgment workflow deployed\nRecipients: 847 · Reminders: 3 · Escalation: Day 14" },
    ],
    s4h: "Watch the agent run a policy gap audit.",
    s4p: "This is what your agent surfaces when California AB 2693 is published — a gap analysis, affected employee count, and a ready-to-deploy acknowledgment workflow.",
    promptLines: ["// Your prompt", "You are a Compliance Monitoring Agent.", "Regulation: {CA AB 2693}", "Policy library: {current_policies}", "Identify gaps and generate an", "acknowledgment workflow for affected employees."],
    terminalLines: ["✓ Monitoring eCFR Title 29 — Employment", "✓ New rule detected: CA AB 2693 (Pay Transparency)", "→ Auditing policy library against new requirement…", " ", "## COMPLIANCE GAP REPORT", "Regulation: CA AB 2693 · Effective Jan 1, 2025", " ", "GAPS IDENTIFIED (2):", "  1. Offer letters missing salary range disclosure", "  2. Job postings lack required pay band language", "Employees affected: 312 CA-based workers", "Legal exposure: High — immediate action required", " ", "RECOMMENDED ACTIONS:", "  1. Update offer letter template (owner: HR Ops)", "  2. Deploy acknowledgment to 312 employees", "✓ Gap report ready"],
    s5label: "What your compliance team gets back.",
    metrics: [{ pct: "90%", n: "<1", u: "day", l: "" }, { pct: "93%", n: "100", u: "%", l: "" }, { pct: "88%", n: "0", u: "surprises", l: "" }],
    quote: "The agent monitors every regulation. You make the risk call.",
  },
  {
    id: "comp-benchmarking",
    modNum: "08",
    modTitle: "Job Architecture & Comp Benchmarking",
    badge: "Comp & Job Architecture",
    h1: "Market Data Meets AI",
    sub: "How AI agents match roles to survey cuts, generate pay bands, flag out-of-band offers, and classify job descriptions — so compensation decisions are grounded in real market data.",
    duration: "16 min",
    level: "Advanced",
    tools: "Radford · Mercer · Pave · Compaas",
    s1h: "Comp decisions are made on intuition when data exists.",
    s1p: "Salary survey data is expensive, complex, and locked in Excel. Without automated matching and flagging, out-of-band offers slip through and pay equity gaps accumulate quietly.",
    problemCards: [
      { ico: "💰", h: "Manual survey cut matching", p: "Mapping internal roles to Radford or Mercer survey cuts requires a compensation specialist. Without automation, it takes days per req.", tag: "~4 hrs per role" },
      { ico: "🚩", h: "Out-of-band offers go undetected", p: "Hiring managers negotiate above-band without a real-time flag. By the time comp reviews it, the offer is extended.", tag: "15-20% above band avg" },
      { ico: "📋", h: "Inconsistent job leveling", p: "The same job description gets leveled differently by different managers — creating internal equity gaps over time.", tag: "High audit risk" },
    ],
    s2h: "The agent matches, generates, flags, and classifies automatically.",
    nodes: [
      { ico: "📊", lbl: "Market Survey Data", sub: "Radford · Mercer · Pave", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🔗", lbl: "Survey Matcher", sub: "Role → cut mapping", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "💵", lbl: "Band Generator", sub: "Min · Mid · Max", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "🚩", lbl: "Offer Flagger", sub: "Real-time alerts", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from job description to approved offer.",
    steps: [
      { h: "Match the role to the right survey cut", p: "Agent reads the job description, maps it to the correct Radford or Mercer cut using O*NET taxonomy, and pulls current market data at your target percentile.", code: "const market = await radford.getSurveyData({ cut: \"21-1121.00\", pct: 50 });" },
      { h: "Generate a calibrated pay band", p: "Agent calculates minimum, midpoint, and maximum using your range spread policy, and compares current employees in the range against the compa-ratio midpoint.", code: "Band (P50): $142K — $168K — $198K\nRange spread: 39% · Current avg compa: 0.94" },
      { h: "Flag out-of-band offers in real time", p: "Every offer request is checked against the current band. Deviations trigger an alert with routing instructions — manager, CHRO, or comp committee depending on the percentage.", code: "⚠ Offer $212K — 7% above band max\nRoute to: CHRO approval required" },
    ],
    s4h: "Watch the agent process an offer request.",
    s4p: "This is what your agent does when a hiring manager submits an offer for a Senior Product Manager in New York — in seconds, with full approval routing.",
    promptLines: ["// Your prompt", "You are a Compensation Analysis Agent.", "Role: {Senior Product Manager}", "Location: {New York, NY}", "Proposed offer: {$212,000}", "Analyze vs. market band and flag exceptions."],
    terminalLines: ["✓ Connected to Radford Survey API", "✓ Role: Senior Product Manager · NYC", "→ Matching to survey cut…", " ", "## OFFER ANALYSIS — SR. PRODUCT MANAGER", "Survey cut: Product Mgmt P3 · NYC Metro · Rfd 2024", " ", "PAY BAND (P50 target):", "  Min: $142,000 · Mid: $168,000 · Max: $198,000", "  Range spread: 39.4%", " ", "OFFER SUBMITTED: $212,000", "⚠ STATUS: 7.1% ABOVE BAND MAXIMUM", "Approval required: CHRO sign-off", " ", "✓ Analysis complete"],
    s5label: "What your compensation team gets back.",
    metrics: [{ pct: "92%", n: "4", u: "min", l: "" }, { pct: "96%", n: "100", u: "%", l: "" }, { pct: "88%", n: "0", u: "gaps", l: "" }],
    quote: "The agent prices every role. You decide what it's worth to the business.",
  },
  {
    id: "dei-analytics",
    modNum: "09",
    modTitle: "DEI Analytics & Reporting",
    badge: "DEI Analytics",
    h1: "Turning DEI Data Into Action",
    sub: "How AI agents surface representation gaps, generate board-ready DEI reports, track goal progress, and audit hiring funnel equity — so DEI commitments become measurable outcomes.",
    duration: "12 min",
    level: "Intermediate",
    tools: "Visier · Dandi · Workday People Analytics",
    s1h: "DEI data exists. Actionable insights rarely reach leadership.",
    s1p: "Most organizations have diversity data. Few have the infrastructure to turn that data into regular, credible, board-ready reports that drive accountability.",
    problemCards: [
      { ico: "📊", h: "Data is there. Insights aren't.", p: "Headcount, hiring, and promotion data sits in Workday or Visier — but converting it into representation analysis takes specialized skills and hours of work.", tag: "2-3 days per report" },
      { ico: "🎯", h: "Goals without tracking", p: "DEI commitments are made publicly. Without automated tracking, progress is reviewed annually at best — and surprises surface at board meetings.", tag: "Reactive reporting" },
      { ico: "🔍", h: "Hiring funnel blind spots", p: "Representation drops at specific pipeline stages. Without funnel analysis by demographic dimension, the cause stays invisible.", tag: "Unknown drop-off points" },
    ],
    s2h: "The agent surfaces gaps, tracks goals, and audits the funnel automatically.",
    nodes: [
      { ico: "📥", lbl: "People Data", sub: "Workday · Visier · Dandi", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "📊", lbl: "Gap Analyzer", sub: "Representation vs. benchmark", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "📋", lbl: "Report Builder", sub: "Board-ready output", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "🔍", lbl: "Funnel Auditor", sub: "Stage-by-stage equity", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from workforce data to board-ready report.",
    steps: [
      { h: "Pull workforce representation data and external benchmarks", p: "Agent ingests headcount by level, function, and demographic from Workday or Visier, and compares against industry benchmarks from Census ACS and BLS.", code: "const data = await visier.getRepresentation({ dims: [\"gender\", \"ethnicity\"], asOf: \"2025-Q1\" });" },
      { h: "Surface gaps and trend analysis", p: "Agent identifies levels and functions with the largest gaps versus benchmark, calculates year-over-year momentum, and ranks areas for focus by business impact.", code: "Gap: Women in VP+ roles: 22% vs. 35% benchmark\nTrend: +2pp YoY · Priority: High" },
      { h: "Generate a board-ready DEI report and funnel audit", p: "Agent formats findings into an executive summary, scorecard, highlights, and next quarter actions — ready to present, not just to compile.", code: "→ dei_board_report_Q1_2025.pdf\nSections: 5 · Charts: 4 · Time: 12 sec" },
    ],
    s4h: "Watch the agent generate a quarterly DEI report.",
    s4p: "This is what your agent produces for Q1 board reporting — a complete representation scorecard with gap analysis, trend lines, and next quarter recommendations.",
    promptLines: ["// Your prompt", "You are a DEI Analytics Agent.", "Period: {Q1 2025}", "Dimensions: {gender, ethnicity}", "Benchmarks: {industry_data}", "Generate a board-ready DEI scorecard."],
    terminalLines: ["✓ Connected to Workday People Analytics", "✓ Loaded Q1 2025 workforce data: 2,847 employees", "→ Running representation analysis…", " ", "## DEI BOARD REPORT — Q1 2025", "REPRESENTATION SCORECARD:", "  Women (all levels): 43% → Goal: 50% (↑2pp YoY)", "  Women VP+: 22% → Goal: 35% (↑1pp YoY)", "  URM all levels: 28% → Goal: 32% (↑3pp YoY)", " ", "HIRING FUNNEL — ENGINEERING (Q1):", "  Applied: 42% women · Hired: 31% women", "⚠ Drop-off at interview stage (42% → 28%)", "Recommendation: Review interview panel composition", "✓ Report ready"],
    s5label: "What your people team and board get back.",
    metrics: [{ pct: "94%", n: "2", u: "min", l: "" }, { pct: "90%", n: "100", u: "%", l: "" }, { pct: "85%", n: "3", u: "stages", l: "" }],
    quote: "The agent finds the gaps. You close them.",
  },
  {
    id: "document-generation",
    modNum: "10",
    modTitle: "Document & Offer Letter Generation",
    badge: "Document Generation",
    h1: "Automating HR Document Workflows",
    sub: "How AI agents generate offer letters, amendments, and HR documents instantly — then route them through e-signature workflows without a single manual step.",
    duration: "10 min",
    level: "Beginner",
    tools: "DocuSign CLM · PandaDoc · Ironclad",
    s1h: "Every offer letter is a manual document from scratch.",
    s1p: "HR teams draft hundreds of offer letters, amendments, and employment documents per year. Most are created manually from templates that go out of date — with compliance risks hiding in the gaps.",
    problemCards: [
      { ico: "✍️", h: "Manual drafting at scale", p: "Each offer letter requires pulling data from the ATS, filling a Word template, and customizing for location-specific legal language. Every time.", tag: "~45 min per letter" },
      { ico: "⚠️", h: "Compliance language drift", p: "Templates get copied and modified informally. Outdated at-will language, missing state disclosures, and incorrect entity names create legal exposure.", tag: "High audit risk" },
      { ico: "🔄", h: "Signature routing delays", p: "After drafting, documents need to be uploaded to DocuSign, routing set up, and reminders managed manually — adding days to the hire timeline.", tag: "3-5 day avg delay" },
    ],
    s2h: "The agent drafts, populates, routes, and tracks — in seconds.",
    nodes: [
      { ico: "📥", lbl: "Hire/Change Data", sub: "ATS · HRIS · Comp system", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "📝", lbl: "Doc Generator", sub: "Role-specific templates", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "⚖️", lbl: "Compliance Checker", sub: "State law validation", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "✍️", lbl: "E-Sign Router", sub: "DocuSign automation", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from approved offer to signed document.",
    steps: [
      { h: "Pull hire data and select the right template", p: "Agent pulls candidate name, role, compensation, and location from the ATS or HRIS, then selects the correct offer letter template for the state and employment type.", code: "const hire = await ats.getOffer({ req: \"req_4421\", candidate: \"c_881\" });" },
      { h: "Generate a compliant, populated offer letter", p: "Agent drafts the full offer letter with correct compensation, start date, benefits eligibility, state-specific at-will language, and entity legal name.", code: "→ offer_letter_priya_nair_CA.pdf\nTemplate: CA Exempt · Clauses: CA Pay Trans. included" },
      { h: "Route through DocuSign with automated reminders", p: "Agent creates the DocuSign envelope, sets the signing order, schedules reminders at Day 1, 3, and 5, and notifies HR on completion.", code: "→ DocuSign envelope created\nSigners: 3 · Reminders: Day 1/3/5 · Auto-archive" },
    ],
    s4h: "Watch the agent generate and route an offer letter.",
    s4p: "This is what your agent produces for a new hire in California — a fully compliant offer letter routed for signature in seconds.",
    promptLines: ["// Your prompt", "You are a Document Generation Agent.", "Candidate: {Priya Nair}", "Role: {Senior PM · L5 · NYC}", "Comp: {$185K base · 15% bonus · 5K RSU}", "Generate offer letter and route for signature."],
    terminalLines: ["✓ Connected to Greenhouse ATS", "✓ Loaded offer: Priya Nair, Senior PM", "→ Selecting template: CA Exempt Full-Time…", " ", "## OFFER LETTER — PRIYA NAIR", "Role: Senior Product Manager · L5", "Base: $185,000 · Bonus: 15% · RSU: 5,000", " ", "COMPLIANCE CHECKS:", "  ✓ CA Pay Transparency clause included", "  ✓ At-will language (CA version)", "  ✓ Entity: Acme Corp, Inc. (Delaware)", " ", "DOCUSIGN ROUTING:", "  1. Hiring Manager → 2. CHRO → 3. Candidate", "  Reminders: Day 1, 3, 5", "✓ Envelope created"],
    s5label: "What your HR ops team gets back.",
    metrics: [{ pct: "95%", n: "45", u: "min", l: "" }, { pct: "100%", n: "0", u: "errors", l: "" }, { pct: "90%", n: "<1", u: "day", l: "" }],
    quote: "The agent drafts every document. You make the hire.",
  },
  {
    id: "employee-relations",
    modNum: "11",
    modTitle: "Employee Relations Case Mgmt",
    badge: "Employee Relations",
    h1: "AI-Powered Case Triage",
    sub: "How AI agents classify ER cases, route to the right partner, surface precedent documents, and track resolution — so sensitive matters get the right response, fast.",
    duration: "14 min",
    level: "Advanced",
    tools: "HR Acuity · Dovetail · ServiceNow HR",
    s1h: "ER cases need speed and precision. Most get neither.",
    s1p: "Employee relations cases are sensitive, time-critical, and legally consequential. Yet triage still relies on email chains and institutional memory — creating delays and inconsistency.",
    problemCards: [
      { ico: "📩", h: "Slow intake triage", p: "Cases arrive via email, chat, and forms. Classification and routing depend on whoever reads it first — leading to inconsistent handling.", tag: "~24 hr avg response" },
      { ico: "📁", h: "No precedent lookup", p: "ER specialists rely on memory to recall how similar cases were handled. Institutional knowledge walks out the door with every departure.", tag: "Knowledge loss risk" },
      { ico: "📊", h: "No trend visibility", p: "Without automated reporting, systemic patterns — repeat offenders, hotspot departments — stay invisible until a crisis surfaces.", tag: "Reactive by design" },
    ],
    s2h: "The agent classifies, routes, retrieves precedent, and tracks trends.",
    nodes: [
      { ico: "📩", lbl: "Case Intake", sub: "Email · Form · Chat", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "🏷️", lbl: "Triage Classifier", sub: "Type · Severity · Urgency", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "📁", lbl: "Precedent Finder", sub: "Similar case lookup", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📊", lbl: "Trend Reporter", sub: "Quarterly CHRO brief", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from intake to resolution tracking.",
    steps: [
      { h: "Classify the case by type, severity, and urgency", p: "Agent reads the intake text and classifies by case type (harassment, conduct, leave, etc.), severity, urgency, and recommended routing — instantly.", code: "const triage = agent.classify({ intake: caseText });\n// → Type: Harassment · Severity: High · Route: ER Specialist" },
      { h: "Surface precedent cases and recommended actions", p: "Agent searches historical case data for similar situations, surfaces how they were resolved, and recommends an initial investigation approach.", code: "Precedent: Case #ER-2024-047 (similar type)\nResolution: Formal investigation · 22 days · Outcome: Sustained" },
      { h: "Generate quarterly ER trend reports for CHRO", p: "Agent aggregates case data by type, department, resolution time, and trends — producing a board-ready brief without manual compilation.", code: "→ er_trend_report_Q1_2025.pdf\nCases: 47 · Avg resolution: 18 days · Hotspot: Sales" },
    ],
    s4h: "Watch the agent triage a case.",
    s4p: "This is what your agent does with a new ER intake — classification, routing, and precedent lookup in seconds.",
    promptLines: ["// Your prompt", "You are an ER Case Triage Agent.", "Intake: {employee reports manager retaliation", "after filing a safety complaint}", "Classify, route, and surface precedent."],
    terminalLines: ["✓ Case intake received", "→ Classifying case…", " ", "## TRIAGE RESULT", "Type: Retaliation · Severity: Critical", "Urgency: Immediate · Route: ER Specialist + Legal", " ", "PRECEDENT CASES (2 similar):", "  #ER-2024-047: Retaliation claim (sustained)", "  #ER-2023-112: Retaliation claim (not sustained)", " ", "RECOMMENDED ACTIONS:", "  1. Preserve all communications immediately", "  2. Separate reporting lines within 24h", "  3. Begin formal investigation (Day 1)", "✓ Triage complete"],
    s5label: "What your ER team gets back.",
    metrics: [{ pct: "90%", n: "<1", u: "hr", l: "" }, { pct: "95%", n: "100", u: "%", l: "" }, { pct: "85%", n: "3", u: "precedents", l: "" }],
    quote: "The agent triages every case. You protect every person.",
  },
  {
    id: "benefits-admin",
    modNum: "12",
    modTitle: "Benefits Administration",
    badge: "Benefits Admin",
    h1: "Automating Benefits Support",
    sub: "How AI agents answer open enrollment questions, compare plans, automate life event workflows, and track completion — so employees get the support they need, when they need it.",
    duration: "12 min",
    level: "Intermediate",
    tools: "Benefitfocus · PlanSource · bswift",
    s1h: "Open enrollment overwhelms HR. Employees feel unsupported.",
    s1p: "Benefits questions spike 10x during open enrollment. HR teams answer the same questions hundreds of times while trying to ensure every employee makes an election before the deadline.",
    problemCards: [
      { ico: "❓", h: "Repetitive questions at scale", p: "\"What's the deductible on Plan B?\" gets asked 200 times. HR answers each one individually — by email, chat, or walk-up.", tag: "200+ tickets per OE cycle" },
      { ico: "📊", h: "Plan confusion", p: "Employees can't easily compare plans. Without side-by-side breakdowns, they default to last year's election — even when it's wrong for them.", tag: "~40% don't compare" },
      { ico: "📅", h: "Missed life events", p: "Marriage, birth, or address changes trigger benefits eligibility windows. Without automation, events are missed and employees lose coverage options.", tag: "30-day window risk" },
    ],
    s2h: "The agent answers, compares, routes, and tracks — automatically.",
    nodes: [
      { ico: "❓", lbl: "Employee Questions", sub: "Chat · Email · Portal", bg: "rgba(43,92,230,.14)", brd: "rgba(43,92,230,.28)" },
      { ico: "📊", lbl: "Plan Comparator", sub: "Side-by-side analysis", bg: "rgba(43,92,230,.22)", brd: "rgba(43,92,230,.4)" },
      { ico: "📋", lbl: "Life Event Router", sub: "Auto-triggered workflows", bg: "rgba(16,185,129,.1)", brd: "rgba(16,185,129,.22)" },
      { ico: "📈", lbl: "Completion Tracker", sub: "OE dashboard", bg: "rgba(245,158,11,.09)", brd: "rgba(245,158,11,.22)" },
    ],
    s3h: "Three steps from employee question to resolved election.",
    steps: [
      { h: "Answer employee benefits questions instantly", p: "Agent responds to plan questions using current plan documents — deductibles, copays, HSA eligibility, network details — with no manual lookup.", code: "Q: \"Is Plan B HSA-eligible?\"\nA: \"Yes. Plan B (HDHP) qualifies for HSA. Your employer contributes $750/yr.\"" },
      { h: "Generate personalized plan comparisons", p: "Agent builds a side-by-side comparison based on the employee's profile — family size, expected utilization, and cost sensitivity — with a plain-language recommendation.", code: "→ Plan A: $180/mo · $2K deductible · Best for low utilization\n→ Plan B: $320/mo · $500 deductible · Best for families" },
      { h: "Automate life event workflows and deadline tracking", p: "When a life event is reported, the agent triggers the correct workflow — available changes, required documents, deadlines, and confirmation.", code: "→ Life event: Marriage (reported Mar 15)\nDeadline: Apr 14 · Changes available: Add spouse, dental, vision" },
    ],
    s4h: "Watch the agent handle an open enrollment question.",
    s4p: "This is what your agent produces when an employee asks about plan options during OE — instant, accurate, personalized.",
    promptLines: ["// Your prompt", "You are a Benefits Assistant Agent.", "Employee: {Sarah Chen, family of 4}", "Question: {Which plan is best for us?}", "Current plans: {Plan A, Plan B, Plan C}", "Provide a personalized recommendation."],
    terminalLines: ["✓ Loaded plan data: 3 medical plans (2025 OE)", "✓ Employee profile: Sarah Chen, family of 4", "→ Analyzing plan fit…", " ", "## PLAN RECOMMENDATION — SARAH CHEN", "Family size: 4 · Expected utilization: High", " ", "RECOMMENDED: Plan B (PPO)", "  Premium: $320/mo · Deductible: $500", "  OOP Max: $3,000 · Copay: $25 PCP / $50 Specialist", "  Why: Lowest total cost for high-utilization families", " ", "COMPARISON:", "  Plan A: $180/mo but $6K OOP max — risky for families", "  Plan C: $450/mo — overinsured for your profile", "✓ Recommendation ready"],
    s5label: "What your benefits team and employees get back.",
    metrics: [{ pct: "92%", n: "200+", u: "tickets", l: "" }, { pct: "88%", n: "100", u: "%", l: "" }, { pct: "95%", n: "<5", u: "sec", l: "" }],
    quote: "The agent answers every question. You design the benefits experience.",
  },
];
