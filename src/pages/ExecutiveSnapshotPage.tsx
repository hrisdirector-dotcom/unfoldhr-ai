import { useRef, useState } from "react";
import { Download, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const STACK_LAYERS = [
  { label: "Business Outcomes", muted: true },
  { label: "AI Agent Layer", highlight: true },
  { label: "Enterprise AI Platform Layer" },
  { label: "Data + Integration Layer" },
  { label: "Process / Workflow Layer" },
  { label: "Systems of Record (HRIS, Payroll, ATS)" },
];

const DIFFERENTIATORS = [
  "Built for decisions, not dashboards",
  "Works with imperfect inputs",
  "Produces structured judgment",
  "Executive-ready output",
  "Designed for HR leaders",
];

const BRIEF_PARTS = [
  "Summary",
  "Key Themes",
  "Recommendations",
  "Risks",
  "Next Actions",
];

const FLOW_STEPS = [
  "Scenario",
  "Decision",
  "Recommendation",
  "Risks",
  "Next Actions",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-primary mb-2">
    {children}
  </p>
);

export default function ExecutiveSnapshotPage() {
  const docRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (!docRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(docRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Fit entire document on a single page (preserve aspect ratio)
      const ratio = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height
      );
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save("UnfoldHRAI-Executive-Snapshot.pdf");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-12">

      {/* Document — sized to roughly A4 portrait ratio for one-page fit */}
      <div
        ref={docRef}
        className="max-w-[900px] mx-auto bg-background px-10 md:px-12 py-10 md:py-12 shadow-sm border border-border rounded-sm"
      >
        {/* TOP — WHAT THIS IS */}
        <div className="mb-6 pb-5 border-b border-border">
          <Eyebrow>What this is</Eyebrow>
          <p className="text-foreground/80 text-[14px] leading-relaxed max-w-[640px]">
            UnfoldHRAI is a decision layer that sits on top of HR systems and
            turns fragmented workforce signals into clear, structured actions.
          </p>
        </div>

        {/* HERO */}
        <header className="mb-7">
          <Eyebrow>Executive Snapshot</Eyebrow>
          <h1 className="font-display text-[26px] md:text-[30px] leading-[1.15] text-foreground mb-3">
            UnfoldHRAI — The Decision Layer for Workforce Intelligence
          </h1>
          <p className="font-display text-[17px] md:text-[18px] text-foreground/90 leading-snug mb-2">
            See the workforce decision before you make it.
          </p>
          <p className="text-foreground/65 text-[13px] leading-relaxed">
            Turn fragmented workforce signals into clear, structured decisions.
          </p>
        </header>

        {/* TWO-COLUMN BODY */}
        <div className="grid grid-cols-12 gap-8 mb-7">
          {/* LEFT COLUMN */}
          <div className="col-span-12 md:col-span-7 space-y-5">
            <div>
              <Eyebrow>The Problem</Eyebrow>
              <p className="font-display text-foreground text-[16px] leading-snug">
                HR decisions are made across disconnected data.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <Eyebrow>The Gap</Eyebrow>
              <p className="font-display text-foreground text-[16px] leading-snug">
                Systems show what is happening, not what to do.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <Eyebrow>The Shift</Eyebrow>
              <p className="font-display text-foreground text-[16px] leading-snug">
                From dashboards → to structured decisions.
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <Eyebrow>How It Works</Eyebrow>
              <p className="text-foreground/85 text-[13px] leading-relaxed">
                {FLOW_STEPS.map((s, i) => (
                  <span key={s}>
                    <span className="font-display text-foreground font-semibold">
                      {s}
                    </span>
                    {i < FLOW_STEPS.length - 1 && (
                      <span className="text-primary mx-2">→</span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <Eyebrow>What Makes It Different</Eyebrow>
              <ul className="space-y-1.5 list-none p-0 mt-1">
                {DIFFERENTIATORS.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2.5 text-foreground/85 text-[13px] leading-snug"
                  >
                    <span className="text-primary font-bold mt-0.5">—</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN — STACK DIAGRAM */}
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>Where It Fits</Eyebrow>
            <div className="mt-2 space-y-1.5 relative">
              {STACK_LAYERS.map((layer, idx) => {
                const isHighlight = layer.highlight;
                const isMuted = layer.muted;
                return (
                  <div key={layer.label}>
                    <div
                      className={[
                        "rounded-sm px-3 py-2.5 text-[12px] leading-tight border transition-colors",
                        isHighlight
                          ? "bg-primary text-primary-foreground border-primary font-display font-semibold shadow-sm"
                          : isMuted
                          ? "bg-muted/40 text-foreground/70 border-border"
                          : "bg-background text-foreground/85 border-border",
                      ].join(" ")}
                    >
                      {layer.label}
                    </div>
                    {idx < STACK_LAYERS.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowUp
                          className={[
                            "w-3 h-3",
                            idx === STACK_LAYERS.length - 2 ||
                            STACK_LAYERS[idx + 1]?.highlight
                              ? "text-primary"
                              : "text-foreground/30",
                          ].join(" ")}
                          strokeWidth={2.5}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-foreground/50 mt-3 leading-snug">
              UnfoldHRAI operates at the AI Agent Layer — translating system
              data into business outcomes.
            </p>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="border-t border-border pt-5 mb-6">
          <Eyebrow>Output</Eyebrow>
          <p className="font-display text-foreground text-[15px] mb-2.5">
            A structured Decision Brief:
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {BRIEF_PARTS.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 text-foreground/85 text-[13px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-display font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING */}
        <footer className="border-t border-border pt-5 flex items-end justify-between gap-6">
          <p className="font-display text-[15px] md:text-[16px] text-foreground leading-snug italic max-w-[600px]">
            UnfoldHRAI doesn't wait for perfect inputs. It structures the
            decision anyway.
          </p>
          <p className="text-[10px] text-foreground/50 tracking-[2px] uppercase whitespace-nowrap">
            unfoldhrai.com
          </p>
        </footer>
      </div>
    </div>
  );
}
