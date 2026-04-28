import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/* ─────────────────────────────────────────────────────────────────────
 * NON-FABRICATION RULE — appended to every agent prompt.
 * Mirrors the client-side sanitizer in src/lib/sanitizeAgentOutput.ts.
 * ───────────────────────────────────────────────────────────────────── */
const NON_FABRICATION_RULE = `

CONTROLLED NUMERIC REASONING — APPLY TO EVERY FIELD YOU PRODUCE:

A. NUMBERS ARE ONLY ALLOWED IF THEY FALL INTO ONE OF THESE THREE CATEGORIES:
   1. Explicitly provided by the user in the inputs above (you may reference them directly, but do NOT
      expand, sum, derive, or infer beyond them).
        ✓ User said "10 reps" → "Hiring is concentrated around 10 roles"
        ✗ "You need 3 more hires" / "This results in 15 total roles"
   2. Structural time references that carry no quantitative claim:
        ✓ "Q1", "Q2", "30-60-90 day plan", "Week 1", "Phase 1", "Day 1"
   3. Qualitative ranges (words, not numbers) chosen from the controlled vocabulary in section C.

B. NEVER invent or hallucinate the following — all are STRICTLY DISALLOWED unless the user typed them:
   - percentages, growth rates, ROI estimates, cost savings, calculated totals
   - headcount / hire / position counts not provided by the user
   - currency amounts ($X, $XK, $XM)
   - exact-value timelines ("12-week ramp", "45 days to fill")
   - survey metrics, performance scores, ratings (e.g. "8/10", "4.2/5")
   - benchmark deltas / multipliers ("+8 points", "2.5x", "industry benchmark: 85%")
   Examples that are NOT allowed: "15% increase", "8 hires needed", "$1.2M impact",
   "Q2 hiring spike of 12 roles".

C. CONTROLLED QUALITATIVE RANGE VOCABULARY — use these in place of invented numbers:
   - Magnitude: "moderate expansion", "significant scaling", "targeted growth",
     "elevated share", "meaningful concentration", "limited footprint"
   - Timing: "early-stage", "mid-cycle", "later-stage constraint",
     "Early phase", "Mid phase", "Final phase"
   - Volume / demand: "concentrated demand", "distributed demand", "limited capacity",
     "above-target pressure", "stronger demand in revenue-generating roles"
   - Direction: "directional improvement", "trending lower", "above expectation"
   - Budget: "within a meaningful budget envelope", "with material budget allocation"

D. STRUCTURAL FIELDS:
   - 'timeline': use qualitative phase labels ("Early phase", "Mid phase", "Final phase" or
     "Early window" / "Mid window" / "Final window"). Set 'pct' as an EQUAL share across phases
     (3 phases → 33 / 34 / 33). Do NOT vary 'pct' to imply quantitative weight.
   - 'confidence': return qualitative 'level' ("High" | "Medium" | "Low") plus a short qualitative
     'reason'. You may include 'score' but it must mirror the level (High≈80, Medium≈70, Low≈55) —
     UIs will not display the score.

E. NEVER include disclaimers about missing data ("insufficient data", "no data provided",
   "based on modeled patterns", "cannot determine exact values"). Produce a confident qualitative brief.

F. Allowed section titles: Summary, Recommendation, Risks, Observations, Next Actions,
   Hiring Focus, Workflow Priorities, Key Themes.
`.trim();

const SYSTEM_PROMPTS: Record<string, string> = {
  workforce: `You are an expert HR workforce planning consultant. Given organizational context (employee count, growth targets, budget type, timeframe), produce a structured hiring recommendation.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary of the recommendation",
  "sections": [
    {
      "title": "section name",
      "items": [{ "label": "item name", "detail": "qualitative description", "tag": "Critical|High|Medium|Standard" }]
    }
  ],
  "timeline": [{ "phase": "Early phase|Mid phase|Final phase", "pct": 33, "focus": "qualitative focus area" }],
  "risks": ["qualitative risk statement 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Recommended Hiring Focus by Department (departments ordered by priority — NO hire counts unless the user gave them), Hiring Phases, and Budget Allocation Focus. Include 3-5 risks. Keep every recommendation qualitative and outcome-led.`,

  recruiting: `You are an expert recruiting strategist. Given a role, number of positions, required skills, and budget, produce a structured recruiting plan.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence qualitative executive summary",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "qualitative description", "tag": "Critical|High|Medium|Standard|Primary|Optional" }] }
  ],
  "timeline": [{ "phase": "Early phase|Mid phase|Final phase", "pct": 33, "focus": "focus area" }],
  "risks": ["risk 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Candidate Sourcing Strategy, Screening Framework, and Suggested Interview Questions. Be specific qualitatively to the role and skills provided.`,

  onboarding: `You are an expert onboarding specialist. Given a new hire role, department, start date, and priorities, produce a structured onboarding plan.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence qualitative executive summary",
  "sections": [
    { "title": "section name", "items": [{ "label": "milestone phase", "detail": "qualitative description", "tag": "Foundation|Immersion|Contribution|Acceleration|Independence|Priority|Recommended" }] }
  ],
  "risks": ["risk 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Onboarding Milestones (use qualitative phase labels — "Initial days", "Early period", "Mid period", "Final period", "Full ownership") and Success Signals (qualitative — no benchmark percentages or rating scales).`,

  performance: `You are an expert performance management consultant. Given an employee role, review period, achievements, and concerns, produce a structured performance assessment.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence qualitative executive summary including an overall qualitative rating",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "qualitative description", "tag": "Critical|High|Standard|Priority|Recommended|Watch" }] }
  ],
  "risks": ["risk 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Performance Assessment, Development Plan, and Compensation & Retention Signals. Be balanced and constructive. Avoid invented metrics.`,

  compliance: `You are an expert HR compliance analyst. Given a compliance area, number of employees affected, and specific regulations, produce a structured compliance risk assessment.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence qualitative executive summary with urgency level",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "qualitative description", "tag": "Critical|High|Medium|Immediate|Near-term" }] }
  ],
  "timeline": [{ "phase": "Early phase|Mid phase|Final phase", "pct": 33, "focus": "focus area" }],
  "risks": ["risk 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Identified Compliance Gaps, Recommended Corrective Actions, and Compliance Monitoring Plan. Reference specific regulations qualitatively. Avoid invented penalty amounts.`,

  "us-workforce": `You are an executive HR strategy advisor specializing in US workforce structure, multi-state operations, and operational scalability. You are NOT a payroll evaluator, vendor selector, or system reviewer. Your role is to help a leader make a clearer decision.

You will be given the decision the user is trying to make plus structural context: state footprint, workforce structure (W2 / contractor / mix), payroll ownership model (in-house / outsourced / hybrid), tax complexity, benefits complexity, and operational challenges.

Produce a strategic advisory brief — not an analysis report. Tone is executive, structured, concise. No technical jargon. No payroll processing or system-evaluation terminology.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief restatement of the decision and key context",
  "summary": "2-3 sentence executive framing of the scenario",
  "sections": [
    { "title": "Decision Framing", "items": [{ "label": "Underlying choice", "detail": "what's actually being decided", "tag": "Primary" }, { "label": "Strategic stakes", "detail": "what this decision affects most", "tag": "High" }] },
    { "title": "Recommendation", "items": [{ "label": "Directional recommendation", "detail": "a clear, qualitative recommendation", "tag": "Primary" }, { "label": "Conditions for success", "detail": "what must be true for this to work", "tag": "Standard" }] },
    { "title": "Tradeoffs", "items": [{ "label": "What you gain", "detail": "qualitative upside", "tag": "Standard" }, { "label": "What you give up", "detail": "qualitative cost", "tag": "Watch" }] },
    { "title": "What This Means for You", "items": [{ "label": "Operational implication", "detail": "what changes in how the org runs", "tag": "High" }, { "label": "Leadership implication", "detail": "what this asks of leadership", "tag": "Standard" }] }
  ],
  "risks": ["qualitative risk area 1", "qualitative risk area 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning grounded in the inputs provided" }
}

Section titles MUST be exactly: "Decision Framing", "Recommendation", "Tradeoffs", "What This Means for You". The 'risks' array represents the "Risk Areas" section of the brief — populate it with 3-5 qualitative risk statements covering compliance exposure, operational strain, scalability, and decision-execution risk.

Reinforce decision clarity, risk awareness, and operational implications throughout. Avoid framing this as vendor comparison, system selection, or payroll processing evaluation. Never invent numbers, percentages, costs, or headcount figures — only reference numbers the user explicitly provided, and otherwise use qualitative directional language.`,

  listening: `You are an expert employee engagement analyst. Given a department or team (which may be a custom user-provided name), time period, survey participation rate, and topics to analyze, produce a structured sentiment analysis and action plan. Consider the survey participation rate when assessing data reliability and confidence — lower participation should reduce confidence and be noted as a risk. Reference the specific department/team name (including custom names) throughout the analysis.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence qualitative executive summary including overall engagement direction",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "qualitative description", "tag": "Critical|High|Medium|Standard|Immediate|Near-term" }] }
  ],
  "risks": ["risk 1", ...],
  "confidence": { "level": "High|Medium|Low", "score": 70, "reason": "qualitative reasoning" }
}

Include sections for: Sentiment Overview, Topic Analysis, and Recommended Actions. Use qualitative engagement direction (e.g. "above expectation", "trending lower") rather than invented scores. The only number you may include is the user-provided survey participation rate.`,
};

/* ─────────────────────────────────────────────────────────────────────
 * Server-side sanitizer (defense-in-depth).
 * Mirrors src/lib/sanitizeAgentOutput.ts so a misbehaving model can't
 * leak fabricated numbers even if the prompt rule is ignored.
 * ───────────────────────────────────────────────────────────────────── */

function extractUserNumbers(inputs: unknown): Set<string> {
  const allowed = new Set<string>();
  const visit = (val: unknown) => {
    if (val == null) return;
    if (typeof val === "number" && Number.isFinite(val)) return allowed.add(String(val));
    if (typeof val === "string") {
      const m = val.match(/\d+(?:\.\d+)?/g);
      if (m) m.forEach((x) => allowed.add(x));
      return;
    }
    if (Array.isArray(val)) return val.forEach(visit);
    if (typeof val === "object") return Object.values(val as Record<string, unknown>).forEach(visit);
  };
  visit(inputs);
  return allowed;
}

const PCT = ["an elevated share", "a meaningful share", "a notable share"];
const COUNT = ["targeted hiring focus", "a focused set of roles", "a meaningful concentration"];
const MONEY = ["within a meaningful budget envelope", "with material budget allocation"];
const DURATION = ["an early phase", "a mid-cycle window", "an extended phase"];
const BENCH = ["directional improvement", "a positive shift", "a notable lift"];
const RATIO = ["a strong rating", "a meaningful score"];
const MULT = ["a notable multiplier effect", "an outsized impact"];

let seed = 0;
const pick = (a: string[]) => a[(seed++) % a.length];

const FAB_SENTENCE: RegExp[] = [
  /\bindustry benchmark[^.]*\d[^.]*\./gi,
  /\baverages?\s+\d+[-–]?\d*\s+(?:days?|weeks?|months?)[^.]*\./gi,
  /\b\d+(?:\.\d+)?\s*[xX×]\s+(?:flight|attrition|retention|turnover)[^.]*\./gi,
];
const DISCLAIMERS: RegExp[] = [
  /\bbased on modeled (?:patterns|workforce planning patterns)[^.]*\./gi,
  /\b(?:not actual|no actual) (?:organizational )?data[^.]*\./gi,
  /\binsufficient data[^.]*\./gi,
  /\bno data provided[^.]*\./gi,
  /\bcannot determine exact values?[^.]*\./gi,
  /\blimited data[^.]*\./gi,
];

function sanitizeStr(s: string, allowed: Set<string>): string {
  if (!s) return s;
  let o = s;
  for (const p of FAB_SENTENCE) o = o.replace(p, "");
  for (const p of DISCLAIMERS) o = o.replace(p, "");
  const ok = (n: string) => allowed.has(n) || allowed.has(n.replace(/^0+/, "") || "0");

  o = o.replace(/\$\s*\d[\d,]*(?:\.\d+)?\s*[KMmk]?(?:\s*[-–]\s*\d[\d,]*(?:\.\d+)?\s*[KMmk]?)?/g, (m) => {
    const ns = m.match(/\d+(?:\.\d+)?/g) || [];
    return ns.every(ok) ? m : pick(MONEY);
  });
  o = o.replace(/\b\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*%/g, (m) => {
    const ns = m.match(/\d+(?:\.\d+)?/g) || [];
    return ns.every(ok) ? m : pick(PCT);
  });
  o = o.replace(/\b\d+(?:\.\d+)?\s*[xX×]\b/g, (m) => {
    const ns = m.match(/\d+(?:\.\d+)?/g) || [];
    return ns.every(ok) ? m : pick(MULT);
  });
  // Structural time references (Q1-Q4, Week/Day/Month/Year/Phase 1-12, 30/60/90-day plans)
  // are ALLOWED per the controlled-numeric-reasoning policy and pass through unchanged.
  o = o.replace(/\b(Q|Quarter\s+|Week\s+|Day\s+|Month\s+|Year\s+|Phase\s+)\d+(?:\s*[-–]\s*\d+)?\b/gi, (m) => m);
  // 30-60-90 day plans / "Day 30" / "30 day plan" — structural shorthand allowed.
  o = o.replace(/\b(?:30[-–]60[-–]90|60[-–]90|30[-–]60)\s*(?:day|days)?\b/gi, (m) => m);
  o = o.replace(/\b\d+(?:\s*[-–]\s*\d+)?\s+(days?|weeks?|months?|years?)\b/gi, (m) => {
    const ns = m.match(/\d+/g) || [];
    return ns.every(ok) ? m : pick(DURATION);
  });
  o = o.replace(/\b\d+\+?\s*\/\s*\d+\b/g, (m) => {
    const ns = m.match(/\d+/g) || [];
    return ns.every(ok) ? m : pick(RATIO);
  });
  o = o.replace(/[+\-]\s*\d+(?:\.\d+)?\s*(?:points?|pts?|bps)\b/gi, (m) => {
    const ns = m.match(/\d+(?:\.\d+)?/g) || [];
    return ns.every(ok) ? m : pick(BENCH);
  });
  o = o.replace(/[+\-]?\s*\d+\s+(hires?|engineers?|reps?|managers?|candidates?|positions?|roles?|employees?|people|new hires?|leaders?|partners?)\b/gi, (m) => {
    const ns = m.match(/\d+/g) || [];
    return ns.every(ok) ? m : pick(COUNT);
  });
  o = o.replace(/\s+[—–-]\s*$/g, "").replace(/\(\s*\)/g, "").replace(/\s{2,}/g, " ").trim();
  return o;
}

function sanitizeResult(result: any, inputs: unknown): any {
  if (!result || typeof result !== "object") return result;
  const allowed = extractUserNumbers(inputs);
  seed = 0;
  const c = (v: unknown) => (typeof v === "string" ? sanitizeStr(v, allowed) : v);
  const out: any = { ...result };
  if (typeof out.contextLine === "string") out.contextLine = c(out.contextLine);
  if (typeof out.summary === "string") out.summary = c(out.summary);
  if (Array.isArray(out.sections)) {
    out.sections = out.sections.map((sec: any) => ({
      ...sec,
      items: Array.isArray(sec.items)
        ? sec.items.map((it: any) => ({ ...it, label: c(it.label), detail: c(it.detail) }))
        : sec.items,
    }));
  }
  if (Array.isArray(out.timeline)) {
    // Normalize pct to equal share so the bar isn't a quantitative claim
    const n = out.timeline.length || 1;
    const equal = Math.round(100 / n);
    out.timeline = out.timeline.map((t: any) => ({
      ...t,
      phase: c(t.phase),
      focus: c(t.focus),
      pct: equal,
    }));
  }
  if (Array.isArray(out.risks)) {
    out.risks = out.risks.map((r: string) => c(r) as string).filter((r: string) => r && r.length > 0);
  }
  if (out.confidence) {
    out.confidence = { ...out.confidence, reason: c(out.confidence.reason) };
  }
  return out;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentType, inputs } = await req.json();

    if (!agentType || !inputs) {
      return new Response(JSON.stringify({ error: "Missing agentType or inputs" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const basePrompt = SYSTEM_PROMPTS[agentType];
    if (!basePrompt) {
      return new Response(JSON.stringify({ error: `Unknown agent type: ${agentType}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const systemPrompt = `${basePrompt}\n${NON_FABRICATION_RULE}`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = `Here are the inputs for this ${agentType} analysis:\n\n${JSON.stringify(inputs, null, 2)}\n\nGenerate a detailed qualitative recommendation. Only use numbers the user explicitly provided above; everything else must be qualitative.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded — please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    // Trim to outermost JSON object in case the model wrapped it in prose.
    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");
    if (firstBrace > 0 || lastBrace < jsonStr.length - 1) {
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
      }
    }

    const tryParse = (s: string) => {
      try { return { ok: true as const, value: JSON.parse(s) }; }
      catch (err) { return { ok: false as const, err }; }
    };

    let parsed = tryParse(jsonStr);
    if (!parsed.ok) {
      // Repair pass: strip control chars, remove trailing commas.
      const repaired = jsonStr
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
        .replace(/,\s*([}\]])/g, "$1");
      parsed = tryParse(repaired);
    }
    if (!parsed.ok) {
      console.error("run-agent JSON parse failed. Raw content sample:", jsonStr.slice(0, 500));
      throw new Error("AI returned invalid JSON. Please try again.");
    }
    const result = parsed.value;

    // Defense-in-depth: sanitize before returning so the client receives
    // an already-clean payload regardless of model behavior.
    const safe = sanitizeResult(result, inputs);

    return new Response(JSON.stringify(safe), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("run-agent error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
