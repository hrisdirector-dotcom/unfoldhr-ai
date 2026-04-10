import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  workforce: `You are an expert HR workforce planning consultant. Given organizational context (employee count, growth targets, budget type, timeframe), produce a structured hiring recommendation.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary of the recommendation",
  "sections": [
    {
      "title": "section name",
      "items": [{ "label": "item name", "detail": "description", "tag": "Critical|High|Medium|Standard" }]
    }
  ],
  "timeline": [{ "phase": "phase name", "pct": 0-100, "focus": "what to focus on" }],
  "risks": ["risk statement 1", "risk statement 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "why this confidence level" }
}

Include sections for: Recommended Hiring by Department (5-6 departments with hire counts), Hiring Timeline (3-4 phases), and Budget Allocation. Include 3-5 risks. Be specific with numbers based on the inputs. Make recommendations practical and actionable.`,

  recruiting: `You are an expert recruiting strategist. Given a role, number of positions, required skills, and budget, produce a structured recruiting plan.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "description", "tag": "Critical|High|Medium|Standard|Primary|Optional" }] }
  ],
  "timeline": [{ "phase": "phase name", "pct": 0-100, "focus": "focus area" }],
  "risks": ["risk 1", "risk 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "reasoning" }
}

Include sections for: Candidate Sourcing Strategy, Screening Framework, and Suggested Interview Questions. Be specific to the role and skills provided.`,

  onboarding: `You are an expert onboarding specialist. Given a new hire role, department, start date, and priorities, produce a structured 90-day onboarding plan.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "description", "tag": "Foundation|Immersion|Contribution|Acceleration|Independence|Priority|Recommended" }] }
  ],
  "risks": ["risk 1", "risk 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "reasoning" }
}

Include sections for: Onboarding Milestones (Day 1-5, Day 6-14, Day 15-30, Day 31-60, Day 61-90) and Success Metrics. Tailor to the specific department and role.`,

  performance: `You are an expert performance management consultant. Given an employee role, review period, achievements, and concerns, produce a structured performance assessment.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary with overall rating",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "description", "tag": "Critical|High|Standard|Priority|Recommended|Watch" }] }
  ],
  "risks": ["risk 1", "risk 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "reasoning" }
}

Include sections for: Performance Assessment, Development Plan, and Compensation & Retention Signals. Be balanced and constructive.`,

  compliance: `You are an expert HR compliance analyst. Given a compliance area, number of employees affected, and specific regulations, produce a structured compliance risk assessment.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary with urgency level",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "description", "tag": "Critical|High|Medium|Immediate|30 days" }] }
  ],
  "timeline": [{ "phase": "phase name", "pct": 0-100, "focus": "focus area" }],
  "risks": ["risk 1", "risk 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "reasoning" }
}

Include sections for: Identified Compliance Gaps, Recommended Corrective Actions, and Compliance Monitoring Plan. Be specific about regulations and potential penalties.`,

  listening: `You are an expert employee engagement analyst. Given a department, time period, and topics to analyze, produce a structured sentiment analysis and action plan.

Return ONLY valid JSON matching this schema:
{
  "contextLine": "brief summary of inputs",
  "summary": "2-3 sentence executive summary with engagement score",
  "sections": [
    { "title": "section name", "items": [{ "label": "item name", "detail": "description", "tag": "Critical|High|Medium|Standard|Immediate|30 days" }] }
  ],
  "risks": ["risk 1", "risk 2", ...],
  "confidence": { "level": "High|Medium|Low", "score": 50-95, "reason": "reasoning" }
}

Include sections for: Sentiment Overview, Topic Analysis, and Recommended Actions. Be specific about engagement metrics and interventions.`,
};

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

    const systemPrompt = SYSTEM_PROMPTS[agentType];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: `Unknown agent type: ${agentType}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = `Here are the inputs for this ${agentType} analysis:\n\n${JSON.stringify(inputs, null, 2)}\n\nGenerate a detailed, specific recommendation based on these inputs. Use realistic numbers and specific actionable advice.`;

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

    // Parse JSON from the response (strip markdown code fences if present)
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    const result = JSON.parse(jsonStr);

    return new Response(JSON.stringify(result), {
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
