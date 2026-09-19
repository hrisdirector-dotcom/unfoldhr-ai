import { ArrowLeft, ArrowRight, Ban, Home } from "lucide-react";
import Footer from "@/components/landing/Footer";
import WorkflowMap from "./WorkflowMap";
import CurrentVsFuture from "./CurrentVsFuture";
import ArchitectureView from "./ArchitectureView";
import WorkflowScoreStrip from "./WorkflowScoreStrip";
import { PrincipleCallout } from "./FrameworkPanels";
import {
  DOMAIN_LABEL,
  WORKFLOWS,
  type Workflow,
} from "@/data/workflows";

interface Props {
  workflow: Workflow;
  onBack: () => void;
  onOpenWorkflow: (id: string) => void;
  setPage: (p: string) => void;
  onContact?: () => void;
}

const SAMPLE_WORKFLOW_ID = "leave-of-absence";

const SAMPLE_COVERAGE = [
  "Workflow objective",
  "Current-state friction",
  "Work allocation",
  "Human judgment boundaries",
  "Controls",
  "Systems and architecture",
  "Measures",
];

export default function WorkflowDetail({ workflow, onBack, onOpenWorkflow, setPage, onContact }: Props) {
  const isSample = workflow.id === SAMPLE_WORKFLOW_ID;
  const related = WORKFLOWS.filter(
    (w) => w.domain === workflow.domain && w.id !== workflow.id
  ).slice(0, 3);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate via-slate to-slate-2 text-white overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(43,92,230,0.26), transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-blue-200/90 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All workflows
            </button>
            <button
              onClick={() => setPage("home")}
              className="inline-flex items-center gap-1.5 text-blue-200/70 hover:text-white transition"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </button>
          </div>

          <p className="mt-8 text-[11px] font-mono uppercase tracking-[0.22em] text-blue-200/80">
            Workflow {String(workflow.number).padStart(2, "0")} ·{" "}
            {DOMAIN_LABEL[workflow.domain]}
          </p>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight max-w-4xl">
            {workflow.name}
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-200/85 leading-relaxed max-w-3xl">
            {workflow.description}
          </p>

          <div className="mt-8 border-l-2 border-blue-300/50 pl-5 max-w-2xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/70 mb-1.5">
              Outcome this process exists to produce
            </p>
            <p className="text-white leading-relaxed">{workflow.outcome}</p>
          </div>

          {isSample && (
            <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-7 max-w-3xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-blue-200/80">
                Sample Workflow Redesign
              </p>
              <h2 className="mt-3 font-display text-xl md:text-2xl text-white leading-snug">
                What a Leave Workflow Redesign Sprint Produces
              </h2>
              <p className="mt-4 text-sm text-slate-200/85 leading-relaxed">
                This example shows how one HR workflow can be examined across current-state friction,
                work elimination, AI reasoning, deterministic execution, human judgment, controls,
                architecture, and measurable outcomes.
              </p>
              <p className="mt-3 text-sm text-slate-300/75 leading-relaxed">
                This is a representative UnfoldHR.ai example. It is not a customer case study and does
                not contain customer or employee data.
              </p>
              <div className="mt-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-blue-200/70 mb-2.5">
                  What this example covers
                </p>
                <ul className="flex flex-wrap gap-2">
                  {SAMPLE_COVERAGE.map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200/90"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-10">
            <WorkflowScoreStrip workflow={workflow} />
          </div>
        </div>
      </section>

      {/* Current vs future */}
      <Section eyebrow="Current state and redesign" title="What changes, and why">
        <CurrentVsFuture workflow={workflow} />
      </Section>

      {/* Map */}
      <Section
        eyebrow="Work allocation map"
        title="Every activity, and who should own it"
        subtitle="Open any activity for the reasoning behind its classification, the control that holds it, and what could go wrong. Dashed blocks are control gates: points where agent authority stops."
        tone="paper-2"
      >
        <WorkflowMap workflow={workflow} />
      </Section>

      {/* AI should not */}
      <Section eyebrow="Boundaries" title="What AI should not do here">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <ul className="space-y-3">
            {workflow.aiShouldNot.map((t) => (
              <li
                key={t}
                className="flex gap-3 bg-card border border-border rounded-xl px-5 py-4"
              >
                <Ban className="h-4 w-4 text-cls-human shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
          <PrincipleCallout />
        </div>
      </Section>

      {/* Architecture */}
      <Section
        eyebrow="Architecture"
        title="Where reasoning ends and execution begins"
        tone="paper-2"
      >
        <ArchitectureView workflow={workflow} />
      </Section>

      {/* Metrics */}
      <Section
        eyebrow="Measurement"
        title="Measure outcomes, not agent activity"
        subtitle="These are the measures worth instrumenting. Baselines belong to your organisation — we do not publish benchmark figures."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflow.metrics.map((m) => (
            <div key={m.name} className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm font-semibold text-foreground mb-1.5">{m.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Related agents */}
      {workflow.relatedAgents.length > 0 && (
        <Section
          eyebrow="Related agents"
          title="Where UnfoldHR already operates in this workflow"
          subtitle="These agents participate in part of the workflow. They do not own it end to end."
          tone="paper-2"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {workflow.relatedAgents.map((a) => (
              <button
                key={a.page}
                onClick={() => setPage(a.page)}
                className="group text-left bg-card border border-border rounded-2xl p-6 transition hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
              >
                <p className="font-display text-xl text-foreground">{a.name}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.role}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Open the agent
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Provenance + related workflows */}
      <Section eyebrow="Provenance" title="Where this analysis comes from">
        <div className="grid lg:grid-cols-2 gap-6">
          <ul className="space-y-3">
            {workflow.sources.map((s) => (
              <li key={s.title} className="bg-card border border-border rounded-xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary mb-1.5">
                  {s.type === "unfoldhr-analysis"
                    ? "UnfoldHR analysis"
                    : s.type === "research"
                    ? "Research"
                    : "Practitioner"}
                </p>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {s.organization}
                  {s.date ? ` · ${s.date}` : ""}
                </p>
                {s.note && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.note}</p>
                )}
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-primary font-medium"
                  >
                    View source
                  </a>
                )}
              </li>
            ))}
          </ul>

          {related.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground mb-3">
                More in {DOMAIN_LABEL[workflow.domain]}
              </p>
              <div className="space-y-3">
                {related.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => onOpenWorkflow(w.id)}
                    className="group w-full text-left bg-card border border-border rounded-xl px-5 py-4 transition hover:border-primary/40"
                  >
                    <span className="font-mono text-[11px] text-primary mr-3">
                      {String(w.number).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{w.name}</span>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {w.outcome}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 rounded-xl text-sm font-semibold text-foreground hover:border-primary/40 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all workflows
          </button>
        </div>
      </Section>

      <Footer setPage={setPage} />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  tone = "paper",
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "paper" | "paper-2";
  children: React.ReactNode;
}) {
  return (
    <section className={`${tone === "paper" ? "bg-paper" : "bg-paper-2"} border-b border-border`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-foreground leading-tight max-w-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
        <div className="mt-9">{children}</div>
      </div>
    </section>
  );
}
