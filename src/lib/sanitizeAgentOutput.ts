/**
 * Shared sanitization layer for agent outputs.
 *
 * Goal: Ensure no fabricated numbers, percentages, currency amounts, durations,
 * or quantitative benchmarks ever appear in user-facing agent outputs unless
 * the user explicitly entered them.
 *
 * Used by EVERY render path: live agent results, saved runs, PDF exports,
 * Executive Deck, and any future agent surface.
 */

/* ─── 1. Build allow-list of user-entered numbers ─── */

/**
 * Walks an `inputs` object and collects every numeric token the user entered.
 * Returns a Set of stringified numbers (e.g. "120", "25", "8500") that are
 * therefore allowed to appear in the output.
 */
export function extractUserNumbers(inputs: unknown): Set<string> {
  const allowed = new Set<string>();
  if (!inputs || typeof inputs !== "object") return allowed;

  const visit = (val: unknown) => {
    if (val == null) return;
    if (typeof val === "number" && Number.isFinite(val)) {
      allowed.add(String(val));
      return;
    }
    if (typeof val === "string") {
      // Pull every numeric run (incl. decimals) out of the string
      const matches = val.match(/\d+(?:\.\d+)?/g);
      if (matches) matches.forEach((m) => allowed.add(m));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(visit);
      return;
    }
    if (typeof val === "object") {
      Object.values(val as Record<string, unknown>).forEach(visit);
    }
  };

  visit(inputs);
  return allowed;
}

/* ─── 2. Qualitative replacement phrases ─── */

const PCT_PHRASES = [
  "an elevated share",
  "a meaningful share",
  "a notable share",
  "a significant share",
];

const COUNT_PHRASES = [
  "targeted hiring focus",
  "a focused set of roles",
  "a meaningful concentration",
  "a notable concentration",
];

const MONEY_PHRASES = [
  "within a meaningful budget envelope",
  "within a substantive investment envelope",
  "with material budget allocation",
];

const DURATION_PHRASES = [
  "an early phase",
  "an extended phase",
  "a mid-cycle window",
  "a focused phase",
];

const BENCH_PHRASES = [
  "directional improvement",
  "a positive shift",
  "a meaningful uplift",
  "a notable lift",
];

const RATIO_PHRASES = [
  "a strong rating",
  "a high rating",
  "a meaningful score",
];

const MULTIPLIER_PHRASES = [
  "a meaningful uplift",
  "a notable multiplier effect",
  "an outsized impact",
];

let phraseSeed = 0;
const pick = (arr: string[]) => arr[(phraseSeed++) % arr.length];

/* ─── 3. Sentence-level pattern strippers (unsupported claims) ─── */

const FABRICATED_SENTENCE_PATTERNS: RegExp[] = [
  // "Industry benchmark: 85% — target 95%"
  /\bindustry benchmark[^.]*\d[^.]*\./gi,
  // "averages 30-45 days"
  /\baverages?\s+\d+[-–]?\d*\s+(?:days?|weeks?|months?)[^.]*\./gi,
  // "X has 2.5× flight risk"
  /\b\d+(?:\.\d+)?\s*[xX×]\s+(?:flight|attrition|retention|turnover)[^.]*\./gi,
];

const DISCLAIMER_PHRASES: RegExp[] = [
  /\bbased on modeled (?:patterns|workforce planning patterns)[^.]*\./gi,
  /\b(?:not actual|no actual) (?:organizational )?data[^.]*\./gi,
  /\binsufficient data[^.]*\./gi,
  /\bno data provided[^.]*\./gi,
  /\bcannot determine exact values?[^.]*\./gi,
  /\blimited data[^.]*\./gi,
];

/* ─── 4. Token-level number sanitizer ─── */

function sanitizeString(input: string, allowed: Set<string>): string {
  if (!input) return input;
  let out = input;

  // First strip whole-sentence fabricated claims and disclaimers
  for (const pat of FABRICATED_SENTENCE_PATTERNS) out = out.replace(pat, "");
  for (const pat of DISCLAIMER_PHRASES) out = out.replace(pat, "");

  const isAllowed = (n: string) => allowed.has(n) || allowed.has(n.replace(/^0+/, "") || "0");

  // Currency: $1.2M, $680K, $8,500, $12, $100K-500K
  out = out.replace(
    /\$\s*\d[\d,]*(?:\.\d+)?\s*[KMmk]?(?:\s*[-–]\s*\d[\d,]*(?:\.\d+)?\s*[KMmk]?)?/g,
    (m) => {
      const nums = m.match(/\d+(?:\.\d+)?/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(MONEY_PHRASES);
    }
  );

  // Percentages: 25%, 30-45%
  out = out.replace(
    /\b\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*%/g,
    (m) => {
      const nums = m.match(/\d+(?:\.\d+)?/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(PCT_PHRASES);
    }
  );

  // Multipliers: 2.5×, 3x
  out = out.replace(
    /\b\d+(?:\.\d+)?\s*[xX×]\b/g,
    (m) => {
      const nums = m.match(/\d+(?:\.\d+)?/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(MULTIPLIER_PHRASES);
    }
  );

  // Date ranges with units: "30-45 days", "Week 1-2", "Day 1-5", "Month 1", "Q1"
  out = out.replace(
    /\b(?:Q|Quarter\s+|Week\s+|Day\s+|Month\s+|Year\s+)\d+(?:\s*[-–]\s*\d+)?\b/gi,
    (m) => {
      const nums = m.match(/\d+/g) || [];
      if (nums.every(isAllowed)) return m;
      // Map to qualitative phase labels
      const lower = m.toLowerCase();
      if (lower.startsWith("q") || lower.startsWith("quarter")) return pick(["Early phase", "Mid phase", "Final phase"]);
      if (lower.startsWith("week")) return pick(["Early window", "Mid window", "Final window"]);
      if (lower.startsWith("day")) return pick(["Initial days", "Early period", "Mid period", "Final period"]);
      if (lower.startsWith("month")) return pick(["Early month", "Mid month", "Final month"]);
      return pick(DURATION_PHRASES);
    }
  );

  // Standalone duration phrases: "30-45 days", "60-90 days", "12 months"
  out = out.replace(
    /\b\d+(?:\s*[-–]\s*\d+)?\s+(days?|weeks?|months?|years?)\b/gi,
    (m) => {
      const nums = m.match(/\d+/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(DURATION_PHRASES);
    }
  );

  // Ratios: 8/10, 4+/5
  out = out.replace(
    /\b\d+\+?\s*\/\s*\d+\b/g,
    (m) => {
      const nums = m.match(/\d+/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(RATIO_PHRASES);
    }
  );

  // Benchmark deltas: "+8 points", "-12 points"
  out = out.replace(
    /[+\-]\s*\d+(?:\.\d+)?\s*(?:points?|pts?|bps)\b/gi,
    (m) => {
      const nums = m.match(/\d+(?:\.\d+)?/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(BENCH_PHRASES);
    }
  );

  // Quantity counts: "+8 hires", "8 hires", "3 engineers", "5 reps", "+12 candidates"
  out = out.replace(
    /[+\-]?\s*\d+\s+(hires?|engineers?|reps?|managers?|candidates?|positions?|roles?|employees?|people|new hires?|leaders?|partners?)\b/gi,
    (m) => {
      const nums = m.match(/\d+/g) || [];
      if (nums.every(isAllowed)) return m;
      return pick(COUNT_PHRASES);
    }
  );

  // Bare benchmark fragments left over (e.g. "—", lonely separators created by removals)
  out = out.replace(/\s+[—–-]\s*$/g, "");
  out = out.replace(/\(\s*\)/g, "");
  // Collapse double spaces
  out = out.replace(/\s{2,}/g, " ").trim();

  return out;
}

/* ─── 5. Walk and sanitize a result object ─── */

interface AgentResultLike {
  contextLine?: string;
  summary?: string;
  sections?: Array<{
    title?: string;
    items?: Array<{ label?: string; detail?: string; tag?: string }>;
  }>;
  timeline?: Array<{ phase?: string; pct?: number; focus?: string }>;
  risks?: string[];
  confidence?: { level?: string; score?: number; reason?: string };
  [key: string]: unknown;
}

/**
 * Sanitize an agent result against the user's input allow-list.
 * Returns a new object — does not mutate the input.
 *
 * Numeric `confidence.score` is preserved internally for downstream filtering
 * but UI surfaces should display only `confidence.level` (qualitative).
 */
export function sanitizeResult<T extends AgentResultLike>(
  result: T,
  inputs: unknown
): T {
  if (!result || typeof result !== "object") return result;
  const allowed = extractUserNumbers(inputs);
  phraseSeed = 0; // reset so output is deterministic per call

  const clean = (s: string | undefined) =>
    typeof s === "string" ? sanitizeString(s, allowed) : s;

  const sanitized: AgentResultLike = { ...result };

  if (typeof sanitized.contextLine === "string") sanitized.contextLine = clean(sanitized.contextLine);
  if (typeof sanitized.summary === "string") sanitized.summary = clean(sanitized.summary);

  if (Array.isArray(sanitized.sections)) {
    sanitized.sections = sanitized.sections.map((sec) => ({
      ...sec,
      items: Array.isArray(sec.items)
        ? sec.items.map((it) => ({
            ...it,
            label: clean(it.label),
            detail: clean(it.detail),
          }))
        : sec.items,
    }));
  }

  if (Array.isArray(sanitized.timeline)) {
    sanitized.timeline = sanitized.timeline.map((t) => ({
      ...t,
      phase: clean(t.phase),
      focus: clean(t.focus),
    }));
  }

  if (Array.isArray(sanitized.risks)) {
    sanitized.risks = sanitized.risks
      .map((r) => clean(r) as string)
      .filter((r) => r && r.length > 0);
  }

  if (sanitized.confidence) {
    sanitized.confidence = {
      ...sanitized.confidence,
      reason: clean(sanitized.confidence.reason),
    };
  }

  return sanitized as T;
}

/* ─── 6. Helper for DecisionBriefProps shape (Try pages) ─── */

interface DecisionBriefLike {
  scenario?: string;
  contextLine?: string;
  summary?: string;
  primaryTitle?: string;
  primaryItems?: Array<{ label: string; value: string }>;
  secondaryTitle?: string;
  secondaryItems?: Array<{ label: string; value: string }>;
  tertiaryTitle?: string;
  tertiaryItems?: Array<{ label: string; value: string }>;
  observations?: Array<{ text: string }>;
  insights?: Array<{ text: string }>;
  confidence?: { level?: string; reason?: string };
  [key: string]: unknown;
}

export function sanitizeBrief<T extends DecisionBriefLike>(
  brief: T,
  inputs: unknown
): T {
  if (!brief || typeof brief !== "object") return brief;
  const allowed = extractUserNumbers(inputs);
  phraseSeed = 0;

  const clean = (s: string | undefined) =>
    typeof s === "string" ? sanitizeString(s, allowed) : s;

  const cleanItems = (items?: Array<{ label: string; value: string }>) =>
    items?.map((i) => ({ label: clean(i.label) as string, value: clean(i.value) as string }));

  const cleanText = (items?: Array<{ text: string }>) =>
    items?.map((i) => ({ text: clean(i.text) as string })).filter((i) => i.text);

  const out: DecisionBriefLike = { ...brief };
  out.contextLine = clean(out.contextLine);
  out.summary = clean(out.summary);
  out.primaryItems = cleanItems(out.primaryItems);
  out.secondaryItems = cleanItems(out.secondaryItems);
  out.tertiaryItems = cleanItems(out.tertiaryItems);
  out.observations = cleanText(out.observations);
  out.insights = cleanText(out.insights);
  if (out.confidence) {
    out.confidence = { ...out.confidence, reason: clean(out.confidence.reason) };
  }
  return out as T;
}

/* ─── 7. Qualitative confidence helper ─── */

/**
 * Convert any numeric confidence score into a qualitative level.
 * UI components should NEVER show the raw score number.
 */
export function qualitativeConfidence(
  level?: string,
  score?: number
): { level: "High" | "Medium" | "Low"; initial: "H" | "M" | "L" } {
  const normalized = (level || "").toLowerCase();
  let final: "High" | "Medium" | "Low" = "Medium";
  if (normalized.includes("high")) final = "High";
  else if (normalized.includes("low")) final = "Low";
  else if (normalized.includes("medium") || normalized.includes("moderate")) final = "Medium";
  else if (typeof score === "number") {
    if (score >= 75) final = "High";
    else if (score < 60) final = "Low";
    else final = "Medium";
  }
  return { level: final, initial: final[0] as "H" | "M" | "L" };
}
