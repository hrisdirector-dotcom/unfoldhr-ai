import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import jsPDF from "jspdf";
import { downloadPDF } from "@/lib/downloadResult";

/**
 * PDF regression tests.
 *
 * These are NOT stubbed renderers: the real jsPDF document is built by the real
 * downloadPDF code path. Only the final `save()` (a browser file write) is
 * intercepted, so the genuine document is captured and inspected — real page
 * count, real serialized PDF bytes (checked for the %PDF- signature and %%EOF
 * trailer) and the real text strings handed to the renderer.
 *
 * All fixtures below are synthetic. No customer data, no network, no database.
 */

interface Capture {
  filename: string;
  pages: number;
  bytes: Uint8Array;
  texts: string[];
}

let capture: Capture | null = null;
let texts: string[] = [];

beforeEach(() => {
  capture = null;
  texts = [];

  const realText = jsPDF.prototype.text;
  vi.spyOn(jsPDF.prototype, "text").mockImplementation(function (
    this: jsPDF,
    ...args: Parameters<typeof realText>
  ) {
    const value = args[0];
    if (typeof value === "string") texts.push(value);
    else if (Array.isArray(value)) texts.push(...value.map(String));
    return realText.apply(this, args);
  });

  vi.spyOn(jsPDF.prototype, "save").mockImplementation(function (this: jsPDF, filename?: string) {
    const raw = this.output("arraybuffer");
    capture = {
      filename: filename ?? "",
      pages: this.getNumberOfPages(),
      bytes: new Uint8Array(raw),
      texts: [...texts],
    };
    return this;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

function captured(): Capture {
  if (!capture) throw new Error("downloadPDF did not save a document");
  return capture;
}

function asText(bytes: Uint8Array): string {
  return new TextDecoder("latin1").decode(bytes);
}

function expectValidPdf(c: Capture) {
  expect(c.bytes.length).toBeGreaterThan(1000);
  const body = asText(c.bytes);
  expect(body.startsWith("%PDF-")).toBe(true);
  expect(body.trimEnd().endsWith("%%EOF")).toBe(true);
  // One /Type /Page object per rendered page.
  expect(body.split("/Type /Page\n").length - 1).toBe(c.pages);
}

const FULL_RESULT = {
  contextLine: "Synthetic scenario for regression testing",
  summary: "Hiring demand is concentrated in two functions, with limited bench depth.",
  sections: [
    {
      title: "Findings",
      items: [
        { label: "Sales coverage gap", detail: 'Two "open" senior roles carried over', tag: "High" },
        { label: "Attrition", detail: "Broadly stable across the period", tag: "Low" },
      ],
    },
    {
      title: "Recommendations",
      items: [{ label: "Sequence the backfills", detail: "Start with the revenue-facing roles." }],
    },
  ],
  timeline: [
    { phase: "Phase 1", focus: "Align owners and decision rights" },
    { phase: "Phase 2", focus: "Run the redesigned intake" },
  ],
  risks: ["Budget approval slips past the quarter", "Hiring manager capacity is thin"],
  confidence: { level: "high", score: 80, reason: "Inputs are internally consistent" },
};

describe("downloadPDF — real jsPDF output", () => {
  it("renders a full multi-section result as a valid, multi-page PDF", () => {
    expect(() => downloadPDF("Workforce Planning", FULL_RESULT)).not.toThrow();
    const c = captured();
    expectValidPdf(c);
    expect(c.pages).toBeGreaterThanOrEqual(2); // cover + content
    expect(c.texts).toContain("Decision Intelligence Report");
    expect(c.texts).toContain("EXECUTIVE SUMMARY");
    expect(c.texts).toContain("FINDINGS");
    expect(c.texts).toContain("RECOMMENDATIONS");
    expect(c.texts).toContain("IMPLEMENTATION PHASES");
    expect(c.texts).toContain("RISKS & OBSERVATIONS");
    expect(c.texts).toContain("•  Sales coverage gap");
    expect(c.texts).toContain("Phase 1");
    expect(c.texts.join("\n")).toContain("Budget approval slips");
  });

  it("surfaces confidence qualitatively, never as a numeric score", () => {
    downloadPDF("Workforce Planning", FULL_RESULT);
    const joined = captured().texts.join("\n");
    expect(joined).toContain("High Confidence");
    expect(joined).not.toContain("80");
    expect(joined).not.toContain("80%");
  });

  it("renders an empty result without throwing", () => {
    expect(() => downloadPDF("Empty Agent", {})).not.toThrow();
    const c = captured();
    expectValidPdf(c);
    expect(c.pages).toBe(2); // cover + (empty) content page
  });

  it("renders partial/missing nested values without throwing", () => {
    expect(() =>
      downloadPDF("Partial Agent", {
        sections: [{ title: "Findings", items: [{ label: "Only a label" }] }],
        timeline: [{ phase: "Phase 1" }],
        risks: [],
        confidence: {},
      }),
    ).not.toThrow();
    expectValidPdf(captured());
  });

  it("renders when every nested value is absent", () => {
    expect(() =>
      downloadPDF("Sparse Agent", {
        sections: [{ items: [{}] }],
        timeline: [{}],
        confidence: { reason: "" },
      }),
    ).not.toThrow();
    expectValidPdf(captured());
  });

  it("paginates long content across additional pages", () => {
    const longItems = Array.from({ length: 40 }, (_, i) => ({
      label: `Finding ${i + 1}`,
      detail: "A long observation that wraps across several rendered lines. ".repeat(4),
    }));
    downloadPDF("Long Agent", {
      summary: "A long summary. ".repeat(120),
      sections: [{ title: "Findings", items: longItems }],
      timeline: Array.from({ length: 12 }, (_, i) => ({ phase: `Phase ${i + 1}`, focus: "Work" })),
      risks: Array.from({ length: 12 }, (_, i) => `Risk number ${i + 1}`),
    });
    const c = captured();
    expectValidPdf(c);
    expect(c.pages).toBeGreaterThan(4);
    // Footer numbering covers every content page (cover excluded).
    expect(c.texts).toContain(`Page ${c.pages - 1} of ${c.pages - 1}`);
  });

  it("handles quotes, ampersands and accented characters", () => {
    expect(() =>
      downloadPDF("Ünicode Agent", {
        summary: 'Résumé review — "urgent" & unresolved',
        sections: [{ title: "Findings & Gaps", items: [{ label: "Café hiring", detail: "Naïve estimate" }] }],
        risks: ["Coördination risk"],
      }),
    ).not.toThrow();
    const c = captured();
    expectValidPdf(c);
    expect(c.texts.join("\n")).toContain("Résumé review");
  });

  it("derives the filename from the agent name", () => {
    downloadPDF("Workforce Planning", {});
    expect(captured().filename).toBe("Workforce_Planning_Report.pdf");
    downloadPDF("Leave of Absence  Control", {});
    expect(captured().filename).toBe("Leave_of_Absence_Control_Report.pdf");
  });
});
