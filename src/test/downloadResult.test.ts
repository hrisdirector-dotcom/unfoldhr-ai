import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { downloadCSV } from "@/lib/downloadResult";

/**
 * Captures the CSV payload handed to the browser download, so the exported
 * content (column order, escaping, row order) is locked against regressions.
 */
let captured: string[] = [];
const originalCreate = URL.createObjectURL;
const originalRevoke = URL.revokeObjectURL;

beforeEach(() => {
  captured = [];
  // jsdom does not implement createObjectURL; capture the blob contents instead.
  (URL as unknown as { createObjectURL: (b: Blob) => string }).createObjectURL = (blob: Blob) => {
    // Blob text is read synchronously via the internal buffer in jsdom, so fall
    // back to the constructor parts captured by the stub below.
    void blob;
    return "blob:mock";
  };
  (URL as unknown as { revokeObjectURL: (u: string) => void }).revokeObjectURL = () => {};

  const RealBlob = globalThis.Blob;
  vi.stubGlobal(
    "Blob",
    class extends RealBlob {
      constructor(parts: BlobPart[], options?: BlobPropertyBag) {
        super(parts, options);
        captured.push(parts.map(String).join(""));
      }
    },
  );
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  URL.createObjectURL = originalCreate;
  URL.revokeObjectURL = originalRevoke;
});

describe("downloadCSV", () => {
  it("renders a full, well-formed result", () => {
    downloadCSV("Workforce Planning", {
      summary: "Hiring is concentrated in sales.",
      sections: [
        {
          title: "Findings",
          items: [
            { label: "Sales gap", detail: 'Two "open" roles', tag: "High" },
            { label: "Attrition", detail: "Stable" },
          ],
        },
      ],
      timeline: [{ phase: "Phase 1", focus: "Align owners" }],
      risks: ["Budget approval slips"],
      confidence: { level: "high", score: 80, reason: "Clear inputs" },
    });
    expect(captured).toHaveLength(1);
    expect(captured[0]).toMatchSnapshot();
  });

  it("handles an empty result", () => {
    downloadCSV("Empty Agent", {});
    expect(captured[0]).toMatchSnapshot();
  });

  it("handles missing nested fields", () => {
    downloadCSV("Partial Agent", {
      sections: [{ title: "Findings", items: [{ label: "Only a label" }] }],
      timeline: [{ phase: "Phase 1" }],
      confidence: {},
    });
    expect(captured[0]).toMatchSnapshot();
  });

  it("drops non-string risks, as the sanitizer already did", () => {
    downloadCSV("Odd Agent", { risks: ["Real risk", 42, null] });
    expect(captured[0]).toMatchSnapshot();
  });
});
