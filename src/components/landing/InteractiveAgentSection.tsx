import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import {
  Users, Search, Rocket, Target, Shield,
  ChevronRight, RotateCcw, Bookmark, ArrowRight
} from "lucide-react";

/* ─── Types ─── */

interface SnapshotResult {
  contextLine: string;
  summary: string;
  sections: { title: string; items: { label: string; detail: string; tag?: string }[] }[];
  timeline?: { phase: string; pct: number; focus: string }[];
  risks: string[];
  confidence: { level: string; score: number; reason: string };
}

type AgentId = "workforce" | "recruiting" | "onboarding" | "performance" | "compliance";

interface AgentDef {
  id: AgentId;
  name: string;
  icon: React.ReactNode;
  shortDesc: string;
}

const AGENTS: AgentDef[] = [
  { id: "workforce", name: "Workforce Planning", icon: <Users className="w-4 h-4" />, shortDesc: "Forecast hiring needs, build phased plans, and identify workforce gaps." },
  { id: "recruiting", name: "Recruiting", icon: <Search className="w-4 h-4" />, shortDesc: "Screen candidates, rank top talent, suggest interview questions and outreach strategy." },
  { id: "onboarding", name: "Onboarding", icon: <Rocket className="w-4 h-4" />, shortDesc: "Create personalized onboarding plans, checklists, timelines, and success metrics for new hires." },
  { id: "performance", name: "Performance Review", icon: <Target className="w-4 h-4" />, shortDesc: "Analyze performance data and generate fair reviews with development plans and risk flags." },
  { id: "compliance", name: "Compliance Risk", icon: <Shield className="w-4 h-4" />, shortDesc: "Identify compliance gaps, flag risks, and recommend corrective actions with timelines." },
];

/* ─── Shared UI helpers ─── */

const inputCls = "w-full h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const textareaCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none";
const labelCls = "block text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-2";

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-primary text-primary-foreground",
  High: "bg-accent text-accent-foreground",
  Medium: "bg-muted text-muted-foreground",
  Standard: "bg-card text-muted-foreground",
};

/* ─── Simulation functions ─── */

function simulateWorkforce(f: Record<string, any>): SnapshotResult {
  const { employees = 120, growth = 25, budgetType = "Fixed budget", quarters = 3 } = f;
  const total = Math.round(employees * (growth / 100));
  const isFixed = budgetType === "Fixed budget";
  const depts = [
    { name: "Sales & Revenue", pct: 0.3, priority: "Critical" },
    { name: "Engineering", pct: 0.25, priority: "High" },
    { name: "Operations", pct: 0.2, priority: "Medium" },
    { name: "HR & People", pct: 0.15, priority: "Medium" },
    { name: "Support", pct: 0.1, priority: "Standard" },
  ];
  const departments = depts.map(d => ({
    label: d.name, detail: `+${Math.max(1, Math.round(total * d.pct))} hires`, tag: d.priority,
  }));
  const timeline = Array.from({ length: quarters }, (_, i) => {
    const phase = i === 0 ? "Early phase" : i === quarters - 1 ? "Final phase" : `Mid-phase ${i}`;
    const hiresPerQ = Math.ceil(total / quarters);
    const hires = i === 0 ? Math.ceil(hiresPerQ * 1.3) : Math.floor(hiresPerQ * 0.85);
    return { phase, pct: Math.min(100, (Math.max(1, hires) / total) * 100), focus: i === 0 ? "Revenue roles" : i === quarters - 1 ? "Support & backfill" : "Technical & delivery" };
  });
  const confScore = isFixed ? (growth > 30 ? 62 : 74) : (growth > 30 ? 70 : 82);
  return {
    contextLine: `${employees} employees · ${growth}% growth · ${budgetType} · ${quarters}Q`,
    summary: `For a ${employees}-person organization targeting ${growth}% growth over ${quarters} quarter${quarters > 1 ? "s" : ""} with a ${budgetType.toLowerCase()}, we recommend hiring approximately ${total} roles. Prioritize revenue-generating positions early, followed by technical capacity, with support phased in later.`,
    sections: [{ title: "Recommended Hiring by Department", items: departments }],
    timeline,
    risks: [
      `${isFixed ? "Fixed budget constrains" : "Flexible budget enables"} phased hiring`,
      total > 20 ? "High volume requires dedicated recruiting capacity" : "Manageable volume for existing processes",
      `Engineering hiring may face ${employees > 200 ? "competitive market pressure" : "sourcing challenges in niche roles"}`,
      growth > 30 ? "Aggressive growth increases attrition risk without onboarding scale-up" : "Growth pace allows structured onboarding",
    ],
    confidence: { level: confScore >= 75 ? "High" : "Medium", score: confScore, reason: "Based on modeled workforce planning patterns — not actual organizational data." },
  };
}

function simulateRecruiting(f: Record<string, any>): SnapshotResult {
  const { role = "Software Engineer", positions = 3, skills = "", budgetPerHire = 0 } = f;
  const hasBudget = budgetPerHire > 0;
  const totalBudget = hasBudget ? positions * budgetPerHire : positions * 8500;
  const skillList = skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean).slice(0, 5) : ["Technical aptitude", "Communication", "Problem-solving"];
  return {
    contextLine: `${positions} × ${role} · ${skillList.length} key skills${hasBudget ? ` · $${budgetPerHire.toLocaleString()}/hire` : ""}`,
    summary: `To fill ${positions} ${role} position${positions > 1 ? "s" : ""}, we recommend a structured multi-channel sourcing strategy with competency-based screening. Estimated pipeline need: ${positions * 15}-${positions * 25} qualified candidates for a target ${Math.round(positions * 0.85 * 100) / 100} offer acceptance rate.`,
    sections: [
      {
        title: "Candidate Sourcing Strategy", items: [
          { label: "LinkedIn + Professional Networks", detail: `Target ${positions * 8} passive candidates`, tag: "Primary" },
          { label: "Internal Referrals", detail: `Launch referral bonus program ($${Math.round(totalBudget * 0.05)}+)`, tag: "High ROI" },
          { label: "Job Boards & Career Pages", detail: `Active postings on ${positions > 5 ? "5+" : "3"} platforms`, tag: "Standard" },
          { label: "Agency Partnership", detail: positions > 5 ? "Engage 1-2 specialized recruiters" : "Consider for hard-to-fill roles", tag: positions > 5 ? "Recommended" : "Optional" },
        ],
      },
      {
        title: "Screening Framework", items: skillList.map((s: string, i: number) => ({
          label: s, detail: i === 0 ? "Technical assessment + portfolio review" : i === 1 ? "Behavioral interview round" : "Panel evaluation", tag: i === 0 ? "Critical" : "High",
        })),
      },
      {
        title: "Suggested Interview Questions", items: [
          { label: `${role}-specific`, detail: `"Walk me through a complex ${skillList[0]?.toLowerCase() || "technical"} challenge you solved recently."` },
          { label: "Culture fit", detail: `"How do you handle ambiguity and shifting priorities in a growing team?"` },
          { label: "Growth signal", detail: `"What's the most impactful feedback you've received and how did you act on it?"` },
        ],
      },
    ],
    timeline: [
      { phase: "Week 1-2", pct: 30, focus: "Sourcing & pipeline build" },
      { phase: "Week 3-4", pct: 60, focus: "Screening & first interviews" },
      { phase: "Week 5-6", pct: 85, focus: "Final rounds & offers" },
      { phase: "Week 7-8", pct: 100, focus: "Close & onboarding handoff" },
    ],
    risks: [
      `${role} roles are highly competitive — time-to-fill averages ${positions > 5 ? "45-60" : "30-45"} days`,
      hasBudget ? `$${budgetPerHire.toLocaleString()}/hire budget ${budgetPerHire < 5000 ? "is tight for this market" : "is within competitive range"}` : "No budget cap specified — recommend setting per-hire limits",
      "Candidate drop-off is highest between screening and final interview",
      "Ensure hiring manager alignment on must-have vs nice-to-have skills",
    ],
    confidence: { level: hasBudget && budgetPerHire >= 5000 ? "High" : "Medium", score: hasBudget && budgetPerHire >= 5000 ? 78 : 68, reason: "Based on market benchmarks for similar roles — adjust with actual talent pipeline data." },
  };
}

function simulateOnboarding(f: Record<string, any>): SnapshotResult {
  const { hireRole = "New Hire", startDate = "", department = "Engineering", priorities = "" } = f;
  const deptPlans: Record<string, { week1: string; week2: string; month1: string }> = {
    Engineering: { week1: "Dev environment setup, codebase walkthrough, first PR", week2: "Pair programming, architecture deep-dive", month1: "First feature shipped, code review participation" },
    Sales: { week1: "CRM setup, product training, shadow calls", week2: "First solo outreach, pipeline building", month1: "First qualified leads, quota ramp" },
    Marketing: { week1: "Brand guidelines, tool access, campaign overview", week2: "First content draft, analytics walkthrough", month1: "First campaign contribution, metrics ownership" },
    Operations: { week1: "Process documentation review, tool access", week2: "Workflow shadowing, stakeholder introductions", month1: "Process ownership, first improvement proposal" },
    HR: { week1: "Policy review, HRIS training, team introductions", week2: "Case shadowing, compliance training", month1: "Independent case handling, first process contribution" },
    Other: { week1: "Team introductions, role-specific tool setup", week2: "Shadowing and mentorship pairing", month1: "Independent task ownership" },
  };
  const plan = deptPlans[department] || deptPlans.Other;
  return {
    contextLine: `${hireRole} · ${department}${startDate ? ` · Starting ${startDate}` : ""}`,
    summary: `Personalized 90-day onboarding plan for ${hireRole} in ${department}. The plan emphasizes early wins, structured knowledge transfer, and social integration to reach full productivity by day 60-75.`,
    sections: [
      {
        title: "Onboarding Milestones", items: [
          { label: "Day 1-5", detail: plan.week1, tag: "Foundation" },
          { label: "Day 6-14", detail: plan.week2, tag: "Immersion" },
          { label: "Day 15-30", detail: plan.month1, tag: "Contribution" },
          { label: "Day 31-60", detail: "Cross-functional projects, 1:1 with skip-level, performance baseline", tag: "Acceleration" },
          { label: "Day 61-90", detail: "Full role ownership, 90-day review, career development plan", tag: "Independence" },
        ],
      },
      {
        title: "Success Metrics", items: [
          { label: "Time to first contribution", detail: department === "Engineering" ? "First PR within 5 business days" : "First deliverable within 7 days" },
          { label: "Manager confidence score", detail: "Target 4+/5 at 30-day check-in" },
          { label: "New hire satisfaction", detail: "Survey at day 14 and day 60 — target 8+/10" },
          { label: "90-day retention", detail: "Industry benchmark: 85% — target 95%" },
        ],
      },
    ],
    risks: [
      "Delayed IT provisioning is the #1 cause of poor onboarding experience",
      `${department} teams often underestimate time needed for mentorship allocation`,
      priorities ? `Custom priority noted: "${priorities.slice(0, 80)}" — plan adjusted accordingly` : "No specific priorities set — using department defaults",
      "Remote/hybrid onboarding requires additional structured touchpoints",
    ],
    confidence: { level: "High", score: 82, reason: "Based on department-specific onboarding best practices — customize with actual role requirements." },
  };
}

function simulatePerformance(f: Record<string, any>): SnapshotResult {
  const { empRole = "Team Member", period = "Quarterly", achievements = "", concerns = "" } = f;
  const hasAchievements = achievements.trim().length > 0;
  const hasConcerns = concerns.trim().length > 0;
  const overallRating = hasConcerns && !hasAchievements ? "Needs Improvement" : hasAchievements && !hasConcerns ? "Exceeds Expectations" : "Meets Expectations";
  return {
    contextLine: `${empRole} · ${period} review`,
    summary: `${period} performance assessment for ${empRole}. Overall rating: ${overallRating}. ${hasAchievements ? "Notable contributions have been identified. " : ""}${hasConcerns ? "Development areas require structured support and follow-up." : "Continue current trajectory with stretch goals."}`,
    sections: [
      {
        title: "Performance Assessment", items: [
          { label: "Overall Rating", detail: overallRating, tag: overallRating === "Exceeds Expectations" ? "High" : overallRating === "Meets Expectations" ? "Standard" : "Critical" },
          { label: "Key Strengths", detail: hasAchievements ? achievements.slice(0, 120) : "Consistent delivery, team collaboration, professional growth" },
          { label: "Growth Areas", detail: hasConcerns ? concerns.slice(0, 120) : "Strategic thinking, cross-functional leadership, technical depth" },
        ],
      },
      {
        title: "Development Plan", items: [
          { label: "Skill development", detail: hasConcerns ? `Targeted coaching on: ${concerns.slice(0, 60)}` : "Stretch assignments in cross-functional projects", tag: "Priority" },
          { label: "Mentorship", detail: "Pair with senior leader for monthly 1:1 coaching sessions", tag: "Recommended" },
          { label: "Training", detail: period === "Annual" ? "Allocate learning budget for 2 courses/certifications" : "Identify 1 skill-building opportunity this cycle" },
          { label: "Check-in cadence", detail: period === "Quarterly" ? "Bi-weekly progress check-ins" : "Monthly progress reviews with documented goals" },
        ],
      },
      {
        title: "Compensation & Retention Signals", items: [
          { label: "Retention risk", detail: overallRating === "Exceeds Expectations" ? "Medium — high performers require recognition and growth" : "Low — standard engagement patterns", tag: overallRating === "Exceeds Expectations" ? "Watch" : "Standard" },
          { label: "Compensation alignment", detail: "Review market data for role — ensure within 10% of median" },
          { label: "Career pathing", detail: "Discuss next-role aspirations in upcoming 1:1" },
        ],
      },
    ],
    risks: [
      overallRating === "Exceeds Expectations" ? "High performers have 2.5× flight risk if not recognized within 60 days" : "Ensure development plan has measurable milestones",
      `${period} review cycle may miss emerging performance trends — consider continuous feedback`,
      hasConcerns ? "Documented concerns require formal PIP consideration if unresolved next cycle" : "No critical concerns — maintain positive momentum",
      "Bias check: ensure rating consistency across team and demographic groups",
    ],
    confidence: { level: hasAchievements || hasConcerns ? "Medium" : "Low", score: hasAchievements || hasConcerns ? 71 : 58, reason: "Limited data — real reviews should incorporate 360 feedback, OKR data, and manager assessments." },
  };
}

function simulateCompliance(f: Record<string, any>): SnapshotResult {
  const { area = "Data privacy", affected = 50, regulation = "" } = f;
  const areaData: Record<string, { risks: string[]; actions: string[]; urgency: string }> = {
    "Data privacy": {
      risks: ["Employee PII exposure in shared drives", "Consent records incomplete for 30%+ of workforce", "Cross-border data transfer gaps"],
      actions: ["Audit all PII storage locations within 14 days", "Implement consent management workflow", "Review data processing agreements with vendors"],
      urgency: "High",
    },
    "Employment law": {
      risks: ["Inconsistent offer letter terms across states/regions", "Missing I-9 re-verification for expired authorizations", "Overtime classification gaps for hybrid roles"],
      actions: ["Standardize employment agreements by jurisdiction", "Audit I-9 compliance for all employees", "Review FLSA classification for remote/hybrid positions"],
      urgency: "Critical",
    },
    "Benefits": {
      risks: ["ACA reporting gaps for part-time to full-time transitions", "COBRA notification delays exceeding 14-day window", "Benefits eligibility tracking gaps"],
      actions: ["Automate ACA measurement period tracking", "Implement COBRA notification workflow with escalation", "Audit benefits eligibility rules against current headcount"],
      urgency: "Medium",
    },
    "Training records": {
      risks: ["Mandatory training completion below 80% threshold", "Missing records for safety-critical certifications", "No automated expiration tracking"],
      actions: ["Deploy automated training completion reminders", "Digitize all certification records with expiry alerts", "Establish quarterly compliance training audit"],
      urgency: "Medium",
    },
    "Compensation equity": {
      risks: ["Pay gap analysis not conducted in 12+ months", "Inconsistent promotion criteria across departments", "Missing documentation for pay decisions"],
      actions: ["Commission third-party pay equity audit", "Standardize promotion rubrics and document decisions", "Implement compensation band transparency policy"],
      urgency: "High",
    },
  };
  const data = areaData[area] || areaData["Data privacy"];
  return {
    contextLine: `${area} · ${affected} employees affected${regulation ? ` · ${regulation.slice(0, 40)}` : ""}`,
    summary: `Compliance risk assessment for ${area} affecting ${affected} employees. Urgency level: ${data.urgency}. ${regulation ? `Specific regulation noted: "${regulation.slice(0, 60)}" — recommendations tailored accordingly.` : "General compliance best practices applied."} Immediate action recommended to mitigate exposure.`,
    sections: [
      {
        title: "Identified Compliance Gaps", items: data.risks.map((r, i) => ({
          label: `Risk ${i + 1}`, detail: r, tag: i === 0 ? "Critical" : "High",
        })),
      },
      {
        title: "Recommended Corrective Actions", items: data.actions.map((a, i) => ({
          label: `Action ${i + 1}`, detail: a, tag: i === 0 ? "Immediate" : "30 days",
        })),
      },
      {
        title: "Compliance Monitoring Plan", items: [
          { label: "Audit frequency", detail: data.urgency === "Critical" ? "Monthly until resolved" : "Quarterly reviews", tag: data.urgency },
          { label: "Responsible party", detail: "HR Compliance Lead + Legal counsel" },
          { label: "Documentation", detail: "All findings and remediation steps logged in compliance register" },
          { label: "Escalation", detail: affected > 100 ? "Board-level reporting required" : "VP-level reporting recommended" },
        ],
      },
    ],
    timeline: [
      { phase: "Week 1-2", pct: 25, focus: "Gap assessment & documentation" },
      { phase: "Week 3-4", pct: 55, focus: "Priority remediation" },
      { phase: "Month 2", pct: 80, focus: "Process implementation" },
      { phase: "Month 3", pct: 100, focus: "Verification & ongoing monitoring" },
    ],
    risks: [
      `${area} violations can result in fines of $${affected > 100 ? "100K-500K+" : "10K-100K"} depending on jurisdiction`,
      `${affected} employees affected increases exposure surface significantly`,
      "Regulatory landscape is evolving — automated monitoring strongly recommended",
      "Historical non-compliance may require retroactive remediation and disclosure",
    ],
    confidence: { level: regulation ? "Medium" : "Low", score: regulation ? 69 : 55, reason: "Based on general compliance frameworks — real assessment requires document review and legal counsel." },
  };
}

/* ─── Per-agent form components ─── */

function WorkforceForm({ onRun, loading }: { onRun: (f: Record<string, any>) => void; loading: boolean }) {
  const [employees, setEmployees] = useState(120);
  const [growth, setGrowth] = useState(25);
  const [budgetType, setBudgetType] = useState("Fixed budget");
  const [quarters, setQuarters] = useState(3);
  const [notes, setNotes] = useState("");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>Current Employees</label><input type="number" min={1} value={employees} onChange={e => setEmployees(Math.max(1, Number(e.target.value)))} className={inputCls} /></div>
        <div><label className={labelCls}>Expected Growth %</label><input type="number" min={1} max={200} value={growth} onChange={e => setGrowth(Math.max(1, Math.min(200, Number(e.target.value))))} className={inputCls} /></div>
        <div><label className={labelCls}>Hiring Budget Type</label>
          <select value={budgetType} onChange={e => setBudgetType(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
            <option>Fixed budget</option><option>Flexible</option>
          </select>
        </div>
        <div><label className={labelCls}>Timeframe (Quarters)</label><input type="number" min={1} max={8} value={quarters} onChange={e => setQuarters(Math.max(1, Math.min(8, Number(e.target.value))))} className={inputCls} /></div>
      </div>
      <div><label className={labelCls}>Additional Constraints</label><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Engineering is hardest to hire for..." rows={3} className={textareaCls} /></div>
      <RunButton loading={loading} onClick={() => onRun({ employees, growth, budgetType, quarters, notes })} label="Run Workforce Agent" />
    </div>
  );
}

function RecruitingForm({ onRun, loading }: { onRun: (f: Record<string, any>) => void; loading: boolean }) {
  const [role, setRole] = useState("Software Engineer");
  const [positions, setPositions] = useState(3);
  const [skills, setSkills] = useState("");
  const [budgetPerHire, setBudgetPerHire] = useState(0);
  const [notes, setNotes] = useState("");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>Job Title / Role</label><input type="text" value={role} onChange={e => setRole(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Open Positions</label><input type="number" min={1} value={positions} onChange={e => setPositions(Math.max(1, Number(e.target.value)))} className={inputCls} /></div>
      </div>
      <div><label className={labelCls}>Key Skills Required</label><textarea value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g., React, TypeScript, System design, Leadership..." rows={2} className={textareaCls} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>Budget per Hire (optional)</label><input type="number" min={0} value={budgetPerHire || ""} onChange={e => setBudgetPerHire(Number(e.target.value))} placeholder="e.g., 8000" className={inputCls} /></div>
      </div>
      <div><label className={labelCls}>Additional Notes</label><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Prefer remote candidates, urgent timeline..." rows={2} className={textareaCls} /></div>
      <RunButton loading={loading} onClick={() => onRun({ role, positions, skills, budgetPerHire, notes })} label="Run Recruiting Agent" />
    </div>
  );
}

function OnboardingForm({ onRun, loading }: { onRun: (f: Record<string, any>) => void; loading: boolean }) {
  const [hireRole, setHireRole] = useState("Senior Engineer");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [priorities, setPriorities] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>New Hire Role</label><input type="text" value={hireRole} onChange={e => setHireRole(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Department</label>
          <select value={department} onChange={e => setDepartment(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
            {["Engineering", "Sales", "Marketing", "Operations", "HR", "Other"].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div><label className={labelCls}>Key Priorities</label><textarea value={priorities} onChange={e => setPriorities(e.target.value)} placeholder="e.g., Must complete security training before day 3..." rows={2} className={textareaCls} /></div>
      <div><label className={labelCls}>Additional Notes</label><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Remote hire, needs equipment shipped..." rows={2} className={textareaCls} /></div>
      <RunButton loading={loading} onClick={() => onRun({ hireRole, startDate, department, priorities, notes })} label="Run Onboarding Agent" />
    </div>
  );
}

function PerformanceForm({ onRun, loading }: { onRun: (f: Record<string, any>) => void; loading: boolean }) {
  const [empRole, setEmpRole] = useState("Product Manager");
  const [period, setPeriod] = useState("Quarterly");
  const [achievements, setAchievements] = useState("");
  const [concerns, setConcerns] = useState("");
  const [context, setContext] = useState("");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>Employee Role</label><input type="text" value={empRole} onChange={e => setEmpRole(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Review Period</label>
          <select value={period} onChange={e => setPeriod(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
            {["Quarterly", "Semi-annual", "Annual"].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div><label className={labelCls}>Recent Achievements</label><textarea value={achievements} onChange={e => setAchievements(e.target.value)} placeholder="e.g., Led product launch, exceeded Q3 targets by 15%..." rows={2} className={textareaCls} /></div>
      <div><label className={labelCls}>Areas of Concern</label><textarea value={concerns} onChange={e => setConcerns(e.target.value)} placeholder="e.g., Missed deadlines, communication with stakeholders..." rows={2} className={textareaCls} /></div>
      <div><label className={labelCls}>Additional Context</label><textarea value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., Recently changed teams, first management role..." rows={2} className={textareaCls} /></div>
      <RunButton loading={loading} onClick={() => onRun({ empRole, period, achievements, concerns, context })} label="Run Performance Agent" />
    </div>
  );
}

function ComplianceForm({ onRun, loading }: { onRun: (f: Record<string, any>) => void; loading: boolean }) {
  const [area, setArea] = useState("Data privacy");
  const [affected, setAffected] = useState(50);
  const [regulation, setRegulation] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label className={labelCls}>Area of Concern</label>
          <select value={area} onChange={e => setArea(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
            {["Data privacy", "Employment law", "Benefits", "Training records", "Compensation equity"].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div><label className={labelCls}>Employees Affected</label><input type="number" min={1} value={affected} onChange={e => setAffected(Math.max(1, Number(e.target.value)))} className={inputCls} /></div>
      </div>
      <div><label className={labelCls}>Specific Regulation / Policy</label><textarea value={regulation} onChange={e => setRegulation(e.target.value)} placeholder="e.g., GDPR Article 15, CCPA, state-specific laws..." rows={2} className={textareaCls} /></div>
      <div><label className={labelCls}>Additional Notes</label><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Recent audit findings, upcoming deadline..." rows={2} className={textareaCls} /></div>
      <RunButton loading={loading} onClick={() => onRun({ area, affected, regulation, notes })} label="Run Compliance Agent" />
    </div>
  );
}

function RunButton({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="w-full py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
          Agent thinking...
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">{label} <ChevronRight className="w-4 h-4" /></span>
      )}
    </button>
  );
}

/* ─── Result card ─── */

function ResultCard({ result, agentName, onTryAnother, onScrollToEngagement }: {
  result: SnapshotResult; agentName: string;
  onTryAnother: () => void; onScrollToEngagement: () => void;
}) {
  return (
    <div className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Your Decision Snapshot</p>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{agentName}</span>
      </div>

      <p className="text-xs text-muted-foreground">{result.contextLine}</p>

      <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary pl-4">{result.summary}</p>

      {result.sections.map((sec, si) => (
        <div key={si}>
          <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">{sec.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sec.items.map((item, ii) => (
              <div key={ii} className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                {item.tag && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${PRIORITY_COLORS[item.tag] || "bg-muted text-muted-foreground"}`}>
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {result.timeline && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Timeline</p>
          <div className="space-y-2">
            {result.timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-4 bg-background border border-border rounded-xl p-3">
                <span className="text-sm font-semibold text-foreground min-w-[90px]">{t.phase}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${t.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground min-w-[100px] text-right">{t.focus}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Key Risks & Observations</p>
        <ul className="space-y-2">
          {result.risks.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <span className={`w-2 h-2 rounded-full ${result.confidence.score >= 75 ? "bg-green-500" : result.confidence.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`} />
        <span className="text-sm font-medium text-foreground">{result.confidence.level} confidence ({result.confidence.score}%)</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">— {result.confidence.reason}</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <button onClick={onTryAnother} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Try another agent
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Bookmark className="w-3.5 h-3.5" /> Save plan
        </button>
        <button onClick={onScrollToEngagement} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <ArrowRight className="w-3.5 h-3.5" /> Turn into a real deployed agent
        </button>
      </div>

      <p className="text-[11px] text-muted-foreground/70 text-center pt-2 border-t border-border">
        This is a live simulation demo. Real Unfold HR agents can take autonomous actions, integrate with your HRIS/ATS, and run continuously.
      </p>
    </div>
  );
}

/* ─── Main section ─── */

const SIMULATORS: Record<AgentId, (f: Record<string, any>) => SnapshotResult> = {
  workforce: simulateWorkforce,
  recruiting: simulateRecruiting,
  onboarding: simulateOnboarding,
  performance: simulatePerformance,
  compliance: simulateCompliance,
};

export default function InteractiveAgentSection() {
  const [activeAgent, setActiveAgent] = useState<AgentId>("workforce");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SnapshotResult | null>(null);

  const handleRun = (agentId: AgentId, fields: Record<string, any>) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(SIMULATORS[agentId](fields));
      setLoading(false);
    }, 2200);
  };

  const handleTabChange = (id: AgentId) => {
    setActiveAgent(id);
    setResult(null);
  };

  const scrollToEngagement = () => {
    document.getElementById("engagement-models")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeDef = AGENTS.find(a => a.id === activeAgent)!;

  return (
    <section className="py-24 md:py-32 bg-background relative" id="agent-gallery">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-primary mb-4 bg-accent px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Interactive Demo
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Agent Gallery — Try Any HR Agent Now
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Choose an agent below, enter your details, and get instant structured recommendations — just like your real Unfold HR agents will deliver in production.
            </p>
          </div>
        </RevealDiv>

        {/* Agent tabs */}
        <RevealDiv delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {AGENTS.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleTabChange(agent.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeAgent === agent.id
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted"
                }`}
              >
                {agent.icon}
                <span className="hidden sm:inline">{agent.name}</span>
                <span className="sm:hidden">{agent.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </RevealDiv>

        {/* Agent description + form */}
        <RevealDiv delay={0.1} key={activeAgent}>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{activeDef.shortDesc}</p>
            {activeAgent === "workforce" && <WorkforceForm onRun={f => handleRun("workforce", f)} loading={loading} />}
            {activeAgent === "recruiting" && <RecruitingForm onRun={f => handleRun("recruiting", f)} loading={loading} />}
            {activeAgent === "onboarding" && <OnboardingForm onRun={f => handleRun("onboarding", f)} loading={loading} />}
            {activeAgent === "performance" && <PerformanceForm onRun={f => handleRun("performance", f)} loading={loading} />}
            {activeAgent === "compliance" && <ComplianceForm onRun={f => handleRun("compliance", f)} loading={loading} />}
          </div>
        </RevealDiv>

        {/* Results */}
        {result && (
          <ResultCard
            result={result}
            agentName={activeDef.name}
            onTryAnother={() => { setResult(null); }}
            onScrollToEngagement={scrollToEngagement}
          />
        )}
      </div>
    </section>
  );
}
