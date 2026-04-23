import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Section = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-10 border-t border-border first:border-t-0">
    {eyebrow && (
      <p className="text-[11px] font-bold uppercase tracking-[3px] text-primary mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 leading-tight">
      {title}
    </h2>
    <div className="text-foreground/85 text-base leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

const STEPS = [
  { label: "Scenario", desc: "A real situation you're navigating." },
  { label: "Decision", desc: "A clear point of view." },
  { label: "Recommendation", desc: "What to do, in priority order." },
  { label: "Risks", desc: "What to watch for." },
  { label: "Next Actions", desc: "How to move forward." },
];

const DIFFERENTIATORS = [
  "Built for decisions, not dashboards.",
  "Works with imperfect, fragmented inputs.",
  "Outputs structured judgment — not raw data.",
  "Executive-ready format every time.",
  "Designed for HR leaders, not data teams.",
];

const USE_CASES = [
  "Workforce planning under hiring uncertainty.",
  "Performance management calibration.",
  "Employee listening signal interpretation.",
  "U.S. workforce policy & compliance complexity.",
  "Org design and restructuring trade-offs.",
];

const BRIEF_PARTS = [
  { label: "Strategic Summary", desc: "The decision, in one paragraph." },
  { label: "Key Themes", desc: "What's actually driving the situation." },
  { label: "Recommendations", desc: "Prioritized actions, not options." },
  { label: "Risks & Watch-outs", desc: "What could go wrong, and where." },
  { label: "Next Actions", desc: "Concrete steps to move forward." },
];

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

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("UnfoldHRAI-Executive-Snapshot.pdf");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10 md:py-16">
      {/* Toolbar (excluded from PDF) */}
      <div className="max-w-3xl mx-auto px-6 mb-6 flex justify-end">
        <Button
          onClick={handleDownload}
          disabled={generating}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          {generating ? "Generating…" : "Download PDF"}
        </Button>
      </div>

      {/* Document */}
      <div
        ref={docRef}
        className="max-w-3xl mx-auto bg-background px-10 md:px-14 py-14 md:py-16 shadow-sm border border-border rounded-sm"
      >
        {/* Title block */}
        <header className="mb-8 pb-8 border-b border-border">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-primary mb-4">
            Executive Snapshot
          </p>
          <h1 className="font-display text-3xl md:text-[40px] leading-[1.15] text-foreground mb-6">
            UnfoldHRAI — The Decision Layer for Workforce Intelligence
          </h1>
          <p className="font-display text-xl md:text-2xl text-foreground/90 leading-snug mb-3">
            See the workforce decision before you make it.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed">
            Turn fragmented workforce signals into clear, structured decisions —
            without relying on perfect data or clean inputs.
          </p>
        </header>

        <Section eyebrow="The Problem" title="HR runs on fragments.">
          <p>
            Workforce decisions are made across scattered spreadsheets, survey
            exports, HRIS reports, and meeting notes. The signal exists — it's
            just never in one place, never structured, and never timely enough to
            act on with confidence.
          </p>
          <p>
            Leaders are forced to choose between waiting for clean data or making
            the call from gut feel. Neither is good enough.
          </p>
        </Section>

        <Section eyebrow="The Gap" title="Tools show data. Leaders need decisions.">
          <p>
            Dashboards, BI tools, and HR analytics platforms surface metrics —
            but they stop short of judgment. They tell you <em>what</em> is
            happening, not <em>what to do</em> about it.
          </p>
          <p>
            The missing layer isn't more data. It's structured reasoning on top
            of the data you already have.
          </p>
        </Section>

        <Section eyebrow="The Solution" title="A decision layer, not another dashboard.">
          <p>
            UnfoldHRAI sits above your existing systems and turns messy
            workforce signals into executive-ready decisions. It reasons across
            inputs, flags trade-offs, and produces a structured recommendation
            you can act on — or challenge — in minutes.
          </p>
        </Section>

        <Section eyebrow="How It Works" title="From scenario to decision, every time.">
          <ol className="space-y-3 list-none p-0">
            {STEPS.map((s, i) => (
              <li key={s.label} className="flex gap-4">
                <span className="font-display text-sm text-primary font-bold shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-foreground font-semibold">
                    {s.label}.
                  </span>{" "}
                  <span className="text-foreground/75">{s.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="What Makes It Different" title="Judgment, not just analytics.">
          <ul className="space-y-2 list-none p-0">
            {DIFFERENTIATORS.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">—</span>
                <span className="text-foreground/85">{d}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Example Use Cases" title="Where it fits.">
          <ul className="space-y-2 list-none p-0">
            {USE_CASES.map((u) => (
              <li key={u} className="flex gap-3">
                <span className="text-primary font-bold mt-0.5">—</span>
                <span className="text-foreground/85">{u}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="The Output" title="A structured Decision Brief.">
          <p className="mb-4">
            Every agent returns the same executive-ready structure — designed to
            be read in under two minutes and acted on the same day.
          </p>
          <div className="space-y-3">
            {BRIEF_PARTS.map((b) => (
              <div
                key={b.label}
                className="border-l-2 border-primary/40 pl-4 py-1"
              >
                <p className="font-display text-foreground font-semibold text-base">
                  {b.label}
                </p>
                <p className="text-foreground/70 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Closing */}
        <footer className="mt-10 pt-8 border-t border-border">
          <p className="font-display text-xl md:text-2xl text-foreground leading-snug italic">
            UnfoldHRAI doesn't wait for perfect inputs. It structures the
            decision anyway.
          </p>
          <p className="text-xs text-foreground/50 mt-6 tracking-wider uppercase">
            unfoldhrai.com
          </p>
        </footer>
      </div>
    </div>
  );
}
