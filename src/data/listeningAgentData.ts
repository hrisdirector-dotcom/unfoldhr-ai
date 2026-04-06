import type { DecisionBriefProps } from "@/components/DecisionBriefCard";

export function generateListeningBrief(
  size: string,
  trend: string,
  concern: string,
  source: string,
  group: string,
  context: string
): DecisionBriefProps {
  const sizeLabel = size === "Under 50" ? "a small" : size === "50–200" ? "a mid-size" : size === "200–500" ? "a growing" : "a large";

  const sentimentMap: Record<string, Record<string, { summary: string; direction: string }>> = {
    Improving: {
      Attrition: { summary: "Engagement signals are trending positively", direction: "Upward movement suggests recent initiatives are gaining traction" },
      "Manager effectiveness": { summary: "Manager sentiment is showing signs of improvement", direction: "Upward trend indicates growing confidence in leadership support" },
      Culture: { summary: "Culture-related signals are strengthening", direction: "Positive momentum suggests culture initiatives are resonating" },
    },
    Flat: {
      Attrition: { summary: "Engagement signals have plateaued", direction: "No meaningful movement — stagnation may mask emerging risks" },
      "Manager effectiveness": { summary: "Manager effectiveness signals remain unchanged", direction: "Stagnant patterns suggest feedback loops are underutilized" },
      Culture: { summary: "Culture signals are neither improving nor declining", direction: "Flat trajectory — employees may be reporting mixed signals on values" },
    },
    Declining: {
      Attrition: { summary: "Engagement signals are trending downward", direction: "Declining patterns suggest worsening sentiment in exit feedback" },
      "Manager effectiveness": { summary: "Manager effectiveness signals are weakening", direction: "Downward trend indicates rising frustration with leadership support" },
      Culture: { summary: "Culture-related signals are deteriorating", direction: "Declining trajectory — trust and belonging patterns are weakening" },
    },
  };

  const themesMap: Record<string, Record<string, { label: string; value: string }[]>> = {
    Attrition: {
      Managers: [
        { label: "Management burnout", value: "A significant proportion of managers report unsustainable workloads" },
        { label: "Span of control", value: "Manager-to-IC ratios appear elevated in key departments" },
        { label: "Compensation gap", value: "Manager pay bands may lag market rates in high-turnover roles" },
      ],
      "High performers": [
        { label: "Compensation concerns", value: "Pay is frequently cited as a contributing factor in top-performer exits" },
        { label: "Career growth gaps", value: "Many departing high performers report limited advancement opportunities" },
        { label: "Recognition deficit", value: "High performers may receive less formal recognition relative to their contributions" },
      ],
      "New hires": [
        { label: "Onboarding gaps", value: "A notable share of new hires report unclear role expectations early on" },
        { label: "Early attrition", value: "Voluntary exits appear concentrated in the first six months of tenure" },
        { label: "Buddy program gaps", value: "Peer mentor assignment rates suggest inconsistent onboarding support" },
      ],
      "Frontline teams": [
        { label: "Schedule inflexibility", value: "Rigid scheduling is a commonly cited concern among frontline workers" },
        { label: "Wage compression", value: "Tenure-based pay gaps are narrowing, creating potential retention risk" },
        { label: "Safety and workload", value: "Incident patterns suggest a link between workload and turnover in certain units" },
      ],
      "Broadly distributed": [
        { label: "Compensation concerns", value: "Pay is a recurring theme in exit feedback across roles" },
        { label: "Career growth gaps", value: "Limited advancement paths are frequently cited by departing employees" },
        { label: "Workload imbalance", value: "Top contributors appear to carry disproportionate workload in key teams" },
      ],
    },
    "Manager effectiveness": {
      Managers: [
        { label: "Self-awareness gap", value: "A noticeable gap exists between manager self-perception and team feedback" },
        { label: "Coaching skill deficit", value: "A significant portion of managers lack formal coaching training" },
        { label: "Administrative overload", value: "Managers spend a substantial share of their time on non-people tasks" },
      ],
      "High performers": [
        { label: "Feedback quality", value: "Top performers rate the usefulness of manager feedback as low" },
        { label: "Development neglect", value: "High performers are less likely to have active individual development plans" },
        { label: "Autonomy friction", value: "Micromanagement is cited as a frustration among high-performing employees" },
      ],
      "New hires": [
        { label: "Inconsistent onboarding", value: "Manager-led onboarding quality varies significantly across departments" },
        { label: "Check-in cadence", value: "Many new hires lack regular one-on-one meetings in their first months" },
        { label: "Expectation clarity", value: "A meaningful share of new hires remain unclear on success metrics early on" },
      ],
      "Frontline teams": [
        { label: "Supervisor accessibility", value: "Frontline teams report limited face time with their direct managers" },
        { label: "Feedback timeliness", value: "Feedback often arrives well after the events it addresses" },
        { label: "Shift-based gaps", value: "Night and weekend teams report notably less manager contact" },
      ],
      "Broadly distributed": [
        { label: "Inconsistent 1:1 cadence", value: "Regular check-ins are not consistently maintained across managers" },
        { label: "Feedback quality", value: "Employees generally rate manager feedback as having limited usefulness" },
        { label: "New manager readiness", value: "Many first-time managers report receiving no onboarding support" },
      ],
    },
    Culture: {
      Managers: [
        { label: "Values modeling gap", value: "Employees often report that their manager does not consistently model company values" },
        { label: "Psychological safety", value: "Teams with low-trust managers tend to score significantly lower on safety" },
        { label: "Decision transparency", value: "Manager communication is rated poorly on clarity of rationale" },
      ],
      "High performers": [
        { label: "Meritocracy perception", value: "High performers perceive advancement criteria as less fair than peers do" },
        { label: "Innovation barriers", value: "Top contributors cite bureaucracy as the primary culture frustration" },
        { label: "Recognition equity", value: "Visibility for contributions tends to skew toward tenure rather than impact" },
      ],
      "New hires": [
        { label: "Culture shock", value: "Some new hires report that lived culture differs from what was presented during hiring" },
        { label: "Belonging gap", value: "New hire belonging signals trail those of tenured peers" },
        { label: "Social integration", value: "Remote new hires report fewer cross-team connections" },
      ],
      "Frontline teams": [
        { label: "Disconnection from HQ", value: "Frontline employees often feel overlooked — engagement signals lag corporate teams" },
        { label: "Communication gaps", value: "Key updates tend to reach frontline staff later than corporate teams" },
        { label: "Inclusion perception", value: "DEI-related signals among frontline workers trail corporate benchmarks" },
      ],
      "Broadly distributed": [
        { label: "Values–behavior gap", value: "Employees report that stated values are not consistently practiced" },
        { label: "Inclusion perception", value: "Underrepresented groups report notably lower belonging signals" },
        { label: "Cross-team trust", value: "Inter-departmental collaboration is rated poorly by individual contributors" },
      ],
    },
  };

  const actionsMap: Record<string, Record<string, { label: string; value: string }[]>> = {
    Attrition: {
      Managers: [
        { label: "Reduce manager admin burden", value: "Audit and eliminate low-value reporting requirements" },
        { label: "Launch manager wellness program", value: "Pilot burnout prevention cohort in highest-risk teams" },
        { label: "Recalibrate spans of control", value: "Target sustainable ratios in departments with elevated spans" },
      ],
      "High performers": [
        { label: "Launch stay interviews", value: "Target top performers in highest-risk departments" },
        { label: "Audit compensation bands", value: "Benchmark against market for roles with elevated turnover" },
        { label: "Create internal mobility program", value: "Pilot lateral movement paths in high-attrition functions" },
      ],
      "New hires": [
        { label: "Redesign 90-day onboarding", value: "Add structured milestones and manager check-in cadence" },
        { label: "Assign peer mentors", value: "Ensure all new hires have a buddy by week one" },
        { label: "Track early warning signals", value: "Flag new hires with limited manager touchpoints in the first month" },
      ],
      "Frontline teams": [
        { label: "Pilot flexible scheduling", value: "Test shift-swap and preference-based scheduling in select units" },
        { label: "Address wage compression", value: "Review pay equity for long-tenured frontline roles" },
        { label: "Improve working conditions", value: "Conduct safety and workload audit in high-turnover sites" },
      ],
      "Broadly distributed": [
        { label: "Launch stay interviews", value: "Target top performers in highest-risk departments" },
        { label: "Audit compensation bands", value: "Benchmark against market for roles with elevated turnover" },
        { label: "Create internal mobility program", value: "Pilot lateral movement paths in high-attrition functions" },
      ],
    },
    "Manager effectiveness": {
      Managers: [
        { label: "Launch self-assessment calibration", value: "Pair 360 feedback with facilitated reflection sessions" },
        { label: "Invest in coaching training", value: "Require coaching skills certification for all people managers" },
        { label: "Reduce administrative load", value: "Automate or delegate recurring non-people-management tasks" },
      ],
      "High performers": [
        { label: "Upgrade feedback practices", value: "Train managers on high-performer coaching conversations" },
        { label: "Mandate active IDPs", value: "Require development plans for all top-rated employees" },
        { label: "Calibrate autonomy levels", value: "Coach managers on delegation frameworks for top talent" },
      ],
      "New hires": [
        { label: "Standardize manager onboarding", value: "Create playbook with required touchpoints for first 90 days" },
        { label: "Mandate weekly 1:1s", value: "Require weekly check-ins for all new hires through month three" },
        { label: "Set clear success metrics", value: "Publish role-specific 30/60/90 day expectations" },
      ],
      "Frontline teams": [
        { label: "Increase supervisor presence", value: "Restructure shifts to guarantee dedicated one-on-one time" },
        { label: "Enable real-time feedback", value: "Deploy mobile-friendly feedback tool for shift-based teams" },
        { label: "Equalize coverage", value: "Assign dedicated support for night and weekend supervisors" },
      ],
      "Broadly distributed": [
        { label: "Mandate structured 1:1s", value: "Roll out cadence template with lightweight tracking" },
        { label: "Launch manager coaching cohort", value: "Targeted program for managers with the weakest signals" },
        { label: "Introduce upward feedback loops", value: "Periodic anonymous pulse on manager effectiveness" },
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
    "Engagement survey": "Annual engagement data may lag real-time sentiment — patterns could reflect outdated conditions",
    "Pulse survey": "Frequent pulsing risks survey fatigue if results are not visibly acted upon",
    "Exit interviews": "Exit data skews toward voluntary leavers and may underrepresent silent disengagement",
    "Manager feedback": "Manager-reported insights carry inherent bias — triangulate with direct employee data",
  };

  const trendRisksMap: Record<string, { text: string }[]> = {
    Improving: [
      { text: "Positive momentum may mask emerging pockets of disengagement in specific teams" },
      { text: "Over-reliance on aggregate patterns can obscure manager-level variance" },
    ],
    Flat: [
      { text: "Stagnation often precedes decline — without intervention, sentiment may weaken within a few quarters" },
      { text: "Lack of visible action on prior feedback may reduce participation and trust over time" },
    ],
    Declining: [
      { text: "Continued decline may increase attrition risk — voluntary exits often lag sentiment shifts" },
      { text: "Leadership credibility is at stake if listening efforts are not paired with visible, fast action" },
    ],
  };

  const sentiment = sentimentMap[trend][concern];
  const themes = themesMap[concern][group] || themesMap[concern]["Broadly distributed"];
  const actions = actionsMap[concern][group] || actionsMap[concern]["Broadly distributed"];

  const risks = [
    ...trendRisksMap[trend],
    { text: sourceRiskMap[source] },
  ];

  if (context.trim()) {
    risks.push({
      text: `User-reported signal: "${context.trim().slice(0, 120)}${context.trim().length > 120 ? "…" : ""}" — validate with quantitative data before acting`,
    });
  }

  const groupLabel = group === "Broadly distributed" ? "across the organization" : `among ${group.toLowerCase()}`;
  const sourceLabel = source.toLowerCase();

  return {
    scenario: "Employee Listening",
    contextLine: `Based on your selected scenario inputs · ${sizeLabel} organization · ${trend.toLowerCase()} engagement trend · Focus: ${concern.toLowerCase()} ${groupLabel} · Source: ${sourceLabel}`,
    primaryTitle: "Sentiment Summary",
    primaryItems: [
      { label: "Overall pattern", value: sentiment.summary },
      { label: "Trend direction", value: sentiment.direction },
      { label: "Most affected group", value: group },
      { label: "Primary data source", value: source },
    ],
    secondaryTitle: "Key Themes",
    secondaryItems: themes,
    tertiaryTitle: "Recommended Actions",
    tertiaryItems: actions,
    insights: risks,
    confidence: {
      level: "Medium",
      reason: "This output is based on modeled patterns aligned to your selected inputs, not actual organizational data.",
    },
  };
}
