import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

export function generateListeningBrief(
  size: string,
  trend: string,
  concern: string,
  source: string,
  group: string,
  context: string
): DecisionBriefProps {
  const base = size === "Under 50" ? 40 : size === "50–200" ? 130 : size === "200–500" ? 350 : 800;

  const sentimentMap: Record<string, Record<string, { score: string; direction: string }>> = {
    Improving: {
      Attrition: { score: "72 / 100", direction: "Up 6 pts from prior quarter" },
      "Manager effectiveness": { score: "74 / 100", direction: "Up 5 pts — manager NPS rising" },
      Culture: { score: "76 / 100", direction: "Up 8 pts — culture initiatives gaining traction" },
    },
    Flat: {
      Attrition: { score: "61 / 100", direction: "No meaningful change in 2 quarters" },
      "Manager effectiveness": { score: "58 / 100", direction: "Stagnant — manager feedback loops underutilized" },
      Culture: { score: "63 / 100", direction: "Flat — employees report mixed signals on values" },
    },
    Declining: {
      Attrition: { score: "47 / 100", direction: "Down 9 pts — exit survey themes worsening" },
      "Manager effectiveness": { score: "44 / 100", direction: "Down 11 pts — skip-level complaints rising" },
      Culture: { score: "49 / 100", direction: "Down 7 pts — trust and belonging scores dropping" },
    },
  };

  const themesMap: Record<string, Record<string, { label: string; value: string }[]>> = {
    Attrition: {
      Managers: [
        { label: "Management burnout", value: "47% of managers report unsustainable workloads" },
        { label: "Span of control", value: "Average manager-to-IC ratio exceeds 1:12 in key departments" },
        { label: "Compensation gap", value: "Manager pay bands lag market by 8–12% in high-turnover roles" },
      ],
      "High performers": [
        { label: "Compensation concerns", value: "Cited in 42% of exit interviews from top-rated employees" },
        { label: "Career growth gaps", value: "68% of departing high performers report limited advancement" },
        { label: "Recognition deficit", value: "High performers receive formal recognition 30% less than peers" },
      ],
      "New hires": [
        { label: "Onboarding gaps", value: "34% of new hires report unclear role expectations after 90 days" },
        { label: "Early attrition", value: "22% of voluntary exits occur within first 6 months" },
        { label: "Buddy program gaps", value: "Only 40% of new hires were assigned a peer mentor" },
      ],
      "Frontline teams": [
        { label: "Schedule inflexibility", value: "61% of frontline workers cite rigid scheduling as top concern" },
        { label: "Wage compression", value: "Tenure-based pay gaps narrowing, creating retention risk" },
        { label: "Safety and workload", value: "Incident reports up 15% in units with highest turnover" },
      ],
      "Broadly distributed": [
        { label: "Compensation concerns", value: "Cited in 38% of exit interviews as a contributing factor" },
        { label: "Career growth gaps", value: "62% of departing employees report limited advancement paths" },
        { label: "Workload imbalance", value: "High performers carry disproportionate load in key teams" },
      ],
    },
    "Manager effectiveness": {
      Managers: [
        { label: "Self-awareness gap", value: "Only 29% of managers rate themselves accurately vs. team feedback" },
        { label: "Coaching skill deficit", value: "58% of managers received no formal coaching training" },
        { label: "Administrative overload", value: "Managers spend 40% of time on non-people tasks" },
      ],
      "High performers": [
        { label: "Feedback quality", value: "Top performers rate manager feedback 2.4 / 5 on usefulness" },
        { label: "Development neglect", value: "High performers are 35% less likely to have active IDPs" },
        { label: "Autonomy friction", value: "Micromanagement cited by 28% of high performers as frustration" },
      ],
      "New hires": [
        { label: "Inconsistent onboarding", value: "Manager-led onboarding varies by 3x across departments" },
        { label: "Check-in cadence", value: "Only 38% of new hires have weekly 1:1s in first 90 days" },
        { label: "Expectation clarity", value: "42% of new hires unclear on success metrics after month one" },
      ],
      "Frontline teams": [
        { label: "Supervisor accessibility", value: "Frontline teams see managers for < 15 min / week on average" },
        { label: "Feedback timeliness", value: "Feedback arrives 2+ weeks after events in 55% of cases" },
        { label: "Shift-based gaps", value: "Night and weekend teams report 40% less manager contact" },
      ],
      "Broadly distributed": [
        { label: "Inconsistent 1:1 cadence", value: "Only 41% of managers hold regular check-ins" },
        { label: "Feedback quality", value: "Employees rate manager feedback 2.8 / 5 on usefulness" },
        { label: "New manager readiness", value: "34% of first-time managers received no onboarding support" },
      ],
    },
    Culture: {
      Managers: [
        { label: "Values modeling gap", value: "Only 48% of employees say their manager models company values" },
        { label: "Psychological safety", value: "Teams with low-trust managers score 22 pts lower on safety" },
        { label: "Decision transparency", value: "Manager communication rated 2.6 / 5 on clarity of rationale" },
      ],
      "High performers": [
        { label: "Meritocracy perception", value: "High performers score fairness of advancement 18% lower" },
        { label: "Innovation barriers", value: "Top contributors cite bureaucracy as #1 culture frustration" },
        { label: "Recognition equity", value: "Visibility for contributions skews toward tenure, not impact" },
      ],
      "New hires": [
        { label: "Culture shock", value: "28% of new hires say lived culture differs from interview promise" },
        { label: "Belonging gap", value: "New hire belonging scores trail tenured peers by 24 pts" },
        { label: "Social integration", value: "Remote new hires report 40% fewer cross-team connections" },
      ],
      "Frontline teams": [
        { label: "Disconnection from HQ", value: "Frontline employees feel 'forgotten' — engagement 20 pts lower" },
        { label: "Communication gaps", value: "Key updates reach frontline 3–5 days after corporate teams" },
        { label: "Inclusion perception", value: "Frontline DEI scores lag corporate by 15 pts" },
      ],
      "Broadly distributed": [
        { label: "Values–behavior gap", value: "Employees see stated values practiced only 55% of the time" },
        { label: "Inclusion perception", value: "Underrepresented groups score belonging 18 pts lower than avg" },
        { label: "Cross-team trust", value: "Inter-departmental collaboration rated 2.4 / 5 by ICs" },
      ],
    },
  };

  const actionsMap: Record<string, Record<string, { label: string; value: string }[]>> = {
    Attrition: {
      Managers: [
        { label: "Reduce manager admin burden", value: "Audit and eliminate 2–3 low-value reporting requirements" },
        { label: "Launch manager wellness program", value: "Pilot burnout prevention cohort in highest-risk teams" },
        { label: "Recalibrate spans of control", value: "Target 1:8 ratio in departments exceeding 1:12" },
      ],
      "High performers": [
        { label: "Launch stay interviews", value: "Target top 15% performers in highest-risk departments" },
        { label: "Audit compensation bands", value: "Benchmark against market for roles with >20% turnover" },
        { label: "Create internal mobility program", value: "Pilot lateral movement paths in Engineering and Sales" },
      ],
      "New hires": [
        { label: "Redesign 90-day onboarding", value: "Add structured milestones and manager check-in cadence" },
        { label: "Assign peer mentors", value: "Ensure 100% of new hires have a buddy by week one" },
        { label: "Track early warning signals", value: "Flag new hires with < 3 manager touchpoints by day 30" },
      ],
      "Frontline teams": [
        { label: "Pilot flexible scheduling", value: "Test shift-swap and preference-based scheduling in 2 units" },
        { label: "Address wage compression", value: "Review pay equity for frontline roles with 3+ years tenure" },
        { label: "Improve working conditions", value: "Conduct safety and workload audit in high-turnover sites" },
      ],
      "Broadly distributed": [
        { label: "Launch stay interviews", value: "Target top 15% performers in highest-risk departments" },
        { label: "Audit compensation bands", value: "Benchmark against market for roles with >20% turnover" },
        { label: "Create internal mobility program", value: "Pilot lateral movement paths in Engineering and Sales" },
      ],
    },
    "Manager effectiveness": {
      Managers: [
        { label: "Launch self-assessment calibration", value: "Pair 360 feedback with facilitated reflection sessions" },
        { label: "Invest in coaching training", value: "Require coaching skills certification for all people managers" },
        { label: "Reduce administrative load", value: "Automate or delegate 2 recurring non-people-management tasks" },
      ],
      "High performers": [
        { label: "Upgrade feedback practices", value: "Train managers on high-performer coaching conversations" },
        { label: "Mandate active IDPs", value: "Require development plans for all employees rated 4+ " },
        { label: "Calibrate autonomy levels", value: "Coach managers on delegation frameworks for top talent" },
      ],
      "New hires": [
        { label: "Standardize manager onboarding", value: "Create playbook with required touchpoints for first 90 days" },
        { label: "Mandate weekly 1:1s", value: "Require weekly check-ins for all new hires through month 3" },
        { label: "Set clear success metrics", value: "Publish role-specific 30/60/90 day expectations" },
      ],
      "Frontline teams": [
        { label: "Increase supervisor presence", value: "Restructure shifts to guarantee 30 min/week 1:1 time" },
        { label: "Enable real-time feedback", value: "Deploy mobile-friendly feedback tool for shift-based teams" },
        { label: "Equalize coverage", value: "Assign dedicated support for night and weekend supervisors" },
      ],
      "Broadly distributed": [
        { label: "Mandate structured 1:1s", value: "Roll out cadence template with lightweight tracking" },
        { label: "Launch manager coaching cohort", value: "6-week program for managers scoring below 3.0" },
        { label: "Introduce upward feedback loops", value: "Quarterly anonymous pulse on manager effectiveness" },
      ],
    },
    Culture: {
      Managers: [
        { label: "Launch values-leadership program", value: "Train managers to model and reinforce values in daily work" },
        { label: "Measure psychological safety", value: "Add team-level safety questions to next pulse survey" },
        { label: "Improve decision transparency", value: "Require managers to share reasoning in team communications" },
      ],
      "High performers": [
        { label: "Audit promotion criteria", value: "Ensure advancement criteria are impact-based, not tenure-based" },
        { label: "Reduce innovation friction", value: "Create fast-track approval for cross-functional experiments" },
        { label: "Recognize impact visibly", value: "Launch peer-nominated spotlight program tied to outcomes" },
      ],
      "New hires": [
        { label: "Align interview and onboarding messaging", value: "Audit EVP claims against actual new hire experience" },
        { label: "Accelerate belonging", value: "Launch structured social onboarding in first 30 days" },
        { label: "Bridge remote connection gap", value: "Pair remote new hires with cross-team mentors" },
      ],
      "Frontline teams": [
        { label: "Close the HQ-frontline gap", value: "Monthly leadership visits and town halls at frontline sites" },
        { label: "Accelerate communications", value: "Deploy real-time updates via mobile for frontline teams" },
        { label: "Invest in frontline DEI", value: "Tailor inclusion programs for site-specific demographics" },
      ],
      "Broadly distributed": [
        { label: "Run values alignment workshops", value: "Facilitated sessions per department over 60 days" },
        { label: "Establish ERG sponsorship model", value: "Assign executive sponsors with defined accountability" },
        { label: "Redesign onboarding for culture integration", value: "Add values immersion in first 30 days" },
      ],
    },
  };

  const sourceRiskMap: Record<string, string> = {
    "Engagement survey": "Annual engagement data may lag real-time sentiment by 3–6 months",
    "Pulse survey": "Frequent pulsing risks survey fatigue if results aren't visibly acted upon",
    "Exit interviews": "Exit data skews toward voluntary leavers and may underrepresent silent disengagement",
    "Manager feedback": "Manager-reported insights carry bias — triangulate with direct employee data",
  };

  const trendRisksMap: Record<string, { text: string }[]> = {
    Improving: [
      { text: "Momentum may mask emerging pockets of disengagement in specific teams" },
      { text: "Over-reliance on aggregate scores can obscure manager-level variance" },
    ],
    Flat: [
      { text: "Stagnation often precedes decline — without intervention, scores may drop within 1–2 quarters" },
      { text: "Survey fatigue is likely if employees don't see visible action from prior feedback" },
    ],
    Declining: [
      { text: "Rapid score decline increases attrition risk — expect a 60–90 day lag before voluntary exits spike" },
      { text: "Leadership credibility is at stake if listening efforts aren't paired with visible, fast action" },
    ],
  };

  const sentiment = sentimentMap[trend][concern];
  const themes = themesMap[concern][group] || themesMap[concern]["Broadly distributed"];
  const actions = actionsMap[concern][group] || actionsMap[concern]["Broadly distributed"];

  const risks = [
    ...trendRisksMap[trend],
    { text: sourceRiskMap[source] },
  ];

  // If user provided context, add a contextual risk/observation
  if (context.trim()) {
    risks.push({
      text: `User-reported signal: "${context.trim().slice(0, 120)}${context.trim().length > 120 ? "…" : ""}" — validate with quantitative data before acting`,
    });
  }

  const groupLabel = group === "Broadly distributed" ? "across the organization" : `among ${group.toLowerCase()}`;
  const sourceLabel = source.toLowerCase();

  return {
    scenario: "Employee Listening",
    contextLine: `${base} employees · ${trend} engagement trend · Focus: ${concern} ${groupLabel} · Source: ${sourceLabel}`,
    primaryTitle: "Sentiment Summary",
    primaryItems: [
      { label: "Overall engagement score", value: sentiment.score },
      { label: "Trend", value: sentiment.direction },
      { label: "Survey coverage", value: `${Math.round(base * 0.78)} of ${base} employees responded` },
      { label: "Most affected group", value: group },
    ],
    secondaryTitle: "Key Themes",
    secondaryItems: themes,
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: actions,
    insights: risks,
  };
}
