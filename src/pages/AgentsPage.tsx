import { AGENTS } from "@/data/agents";
import { AgentCard } from "@/components/AgentCard";
import { RevealDiv } from "@/components/RevealDiv";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Clock, Lock, GitBranch, FileCheck2, CalendarClock } from "lucide-react";
import { navLinkProps } from "@/lib/routes";

interface AgentsPageProps {
  onSelectAgent: (agentId: string) => void;
  onBuildAgent: (agentId: string) => void;
  setPage: (p: string) => void;
  onDiscussAgentImplementation?: () => void;
}

const ARCHITECTURE_LAYERS: { name: string; desc: string }[] = [
  {
    name: "HR systems and source data",
    desc: "Employee, job, pay, case, and absence records held in the HCM, payroll, and adjacent systems of record that the work depends on.",
  },
  {
    name: "Workflow orchestration",
    desc: "Sequencing of activities, handoffs, timing, and state across the redesigned end-to-end process.",
  },
  {
    name: "Deterministic rules",
    desc: "Eligibility, entitlement, policy, and threshold logic that must produce the same outcome every time and is not left to a model.",
  },
  {
    name: "AI agents and decision support",
    desc: "Interpretation of context, synthesis of scattered information, readiness assessment, and recommended next actions.",
  },
  {
    name: "Human judgment and approvals",
    desc: "The decision points that remain with people, with the agent preparing the case rather than deciding it.",
  },
  {
    name: "Governance, security, and audit",
    desc: "Permissions, data boundaries, human approval limits, traceability of each recommendation, and measurement.",
  },
];

const CONNECTION_POINTS = [
  "Core HCM and employee records",
  "Payroll and time systems",
  "Case and service management",
  "Leave and absence vendors",
  "Identity and access management",
  "Document and e-signature systems",
];

export default function AgentsPage({
  onSelectAgent,
  onBuildAgent,
  setPage,
  onDiscussAgentImplementation,
}: AgentsPageProps) {
  // Anchor inside a clickable card: keep the card from handling the same click.
  const cardLink = (page: string) => {
    const props = navLinkProps(page, setPage);
    return {
      href: props.href,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        props.onClick(e);
      },
      onAuxClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation(),
    };
  };

  // Card body click: plain primary clicks only, and never over a nested control.
  const cardClick = (page: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    setPage(page);
  };

  return (
    <div className="bg-background">
      {/* ───────────── Hero — matches PlatformHero language ───────────── */}
      <section className="relative bg-gradient-to-b from-slate via-slate to-slate-2 text-white overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(43,92,230,0.28), transparent 65%), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(43,92,230,0.15), transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-40 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/90 flex-wrap font-mono"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
            <span>UnfoldHR Agent Platform</span>
            <span className="opacity-50">·</span>
            <span className="opacity-70">Control &amp; Readiness · Decision Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-tight max-w-4xl"
          >
            Purpose-built intelligence for
            <br />
            <span className="font-serif-alt italic text-blue-200">
              redesigned HR work.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-7 text-base md:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
          >
            <span className="text-white font-medium">Control &amp; Readiness Agents</span>{" "}
            support what can move forward.{" "}
            <span className="text-white font-medium">Decision Agents</span>{" "}
            turn workforce information into recommended action. The platform is one possible way to
            enable a redesigned workflow — never a substitute for the redesign itself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[2px] text-blue-200 mb-2">
              Demonstration
            </p>
            <p className="text-sm text-slate-200/80 leading-relaxed">
              Every interactive agent on this site is a demonstration running on prepared scenario
              data. Demonstrations do not connect to live customer systems, do not execute
              transactions, and do not represent a deployed production service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() =>
                onDiscussAgentImplementation ? onDiscussAgentImplementation() : setPage("home")
              }
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate font-semibold text-sm hover:bg-blue-50 transition-all"
            >
              Discuss Agent Implementation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              {...navLinkProps("global-lifecycle-agent", setPage)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:border-white/40 transition-all no-underline"
            >
              Explore Agent Demos
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-4 text-xs text-slate-200/60 max-w-xl"
          >
            "Discuss Agent Implementation" starts a qualified conversation about fit and
            feasibility. It is not a deployment order or a purchase.
          </motion.p>
        </div>
      </section>

      {/* ───────────── Section 1 — Control & Readiness (LEAD, dominant) ───────────── */}
      <section className="relative py-28 md:py-40 bg-slate text-white overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 80% 0%, rgba(43,92,230,0.22), transparent 65%), radial-gradient(ellipse 45% 35% at 0% 100%, rgba(43,92,230,0.14), transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <div className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/90 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
              <span>Family 01 — Lead</span>
              <span className="opacity-40">·</span>
              <span className="text-white/70">Control &amp; Readiness</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-[3.75rem] leading-[1.03] tracking-tight max-w-4xl mb-6">
              Control &amp; Readiness Agents
              <br />
              <span className="font-serif-alt italic text-blue-200">govern what moves forward.</span>
            </h2>
            <p className="text-slate-200/80 text-lg md:text-xl max-w-2xl leading-relaxed">
              Evaluate workforce events and HR actions to determine what can progress,
              what must be held, and what requires approval — turning lifecycle activity
              into governed, auditable outcomes.
            </p>
          </RevealDiv>

          {/* Flagship card */}
          <RevealDiv delay={0.1}>
            <div
              onClick={cardClick("global-lifecycle-agent")}
              className="group cursor-pointer relative mt-20 bg-white border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] hover:shadow-[0_50px_140px_-25px_rgba(43,92,230,0.55)]"
            >
              <div className="relative bg-gradient-to-r from-slate via-slate to-slate-2 text-white px-8 md:px-12 py-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono">
                <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
                <span className="text-blue-200/90">Flagship Agent</span>
                <span className="text-white/30">·</span>
                <span className="text-white/80">Workforce Event Control &amp; Readiness</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-10 md:p-14 lg:p-16">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-slate mb-6 leading-[1.05] tracking-tight">
                    Global Lifecycle Agent
                  </h3>
                  <p className="text-slate-3 leading-relaxed text-base md:text-lg lg:text-xl mb-10 max-w-2xl">
                    Evaluates pending lifecycle events — hires, transfers, exits, role changes —
                    and returns a release verdict for each: ready, hold, or approval required,
                    with the operating trail.
                  </p>
                  <a
                    {...cardLink("global-lifecycle-agent")}
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-slate text-white font-semibold text-sm hover:bg-primary transition-all group-hover:gap-3.5 shadow-[0_18px_50px_-18px_rgba(43,92,230,0.6)] no-underline"
                  >
                    Try the Flagship Agent <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="lg:col-span-2 relative bg-paper border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10">
                  <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
                  <p className="relative text-[11px] font-mono uppercase tracking-[0.22em] text-slate-4 mb-5 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    Sample verdicts
                  </p>
                  <div className="relative space-y-3">
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Ready for release</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">All readiness checks passed</p>
                      </div>
                    </div>
                    <div className="bg-white border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Approval required</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Policy exception detected</p>
                      </div>
                    </div>
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <Clock className="w-4 h-4 text-slate-4 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Held — awaiting input</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Manager confirmation pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealDiv>

          {/* Second flagship — Leave / LOA Control Agent */}
          <RevealDiv delay={0.14}>
            <div
              onClick={cardClick("leave-control-agent")}
              className="group cursor-pointer relative mt-10 bg-white border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.55)] hover:shadow-[0_40px_120px_-25px_rgba(43,92,230,0.45)]"
            >
              <div className="relative bg-gradient-to-r from-slate via-slate to-slate-2 text-white px-8 md:px-12 py-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono">
                <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                <CalendarClock className="h-3.5 w-3.5 text-blue-200" />
                <span className="text-blue-200/90">Control Agent</span>
                <span className="text-white/30">·</span>
                <span className="text-white/80">Leave &amp; LOA Readiness — BambooHR Edition</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-10 md:p-12 lg:p-14">
                  <h3 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-slate mb-5 leading-[1.05] tracking-tight">
                    Leave / LOA Control Agent
                  </h3>
                  <p className="text-slate-3 leading-relaxed text-base md:text-lg mb-8 max-w-2xl">
                    Evaluates leave requests, return-to-work events, and extensions — and returns
                    a readiness verdict: ready to progress, documentation hold, or held for
                    control review, with payroll and benefits coordination prepared.
                  </p>
                  <a
                    {...cardLink("leave-control-agent")}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate text-white font-semibold text-sm hover:bg-primary transition-all group-hover:gap-3.5 shadow-[0_14px_40px_-14px_rgba(43,92,230,0.55)] no-underline"
                  >
                    Try the Leave Control Agent <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="lg:col-span-2 relative bg-paper border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10">
                  <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
                  <p className="relative text-[11px] font-mono uppercase tracking-[0.22em] text-slate-4 mb-5 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    Sample verdicts
                  </p>
                  <div className="relative space-y-3">
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Ready to progress</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Leave record &amp; coverage aligned</p>
                      </div>
                    </div>
                    <div className="bg-white border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Documentation hold</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Supporting docs / approval pending</p>
                      </div>
                    </div>
                    <div className="bg-white border border-border rounded-xl p-4 flex items-start gap-3">
                      <Clock className="w-4 h-4 text-slate-4 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate">Held for control review</p>
                        <p className="text-xs text-slate-4 mt-0.5 font-mono uppercase tracking-wider">Return / payroll coordination unresolved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealDiv>

          {/* Secondary roster — makes the family feel intentional */}
          <RevealDiv delay={0.22}>
            <div className="mt-20">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-blue-300/30 to-transparent" />
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-blue-200/80 flex items-center gap-2 shrink-0">
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  More Control &amp; Readiness agents
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-blue-300/30 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Lock, name: "Access &amp; Entitlement Agent", note: "Governs role-based access readiness across systems." },
                  { icon: GitBranch, name: "Org Change Readiness Agent", note: "Validates reorgs, M&amp;A moves, and structural changes." },
                  { icon: FileCheck2, name: "Compliance Release Agent", note: "Confirms regulatory and policy readiness before action." },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        <a.icon className="h-4 w-4 text-blue-200" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-200/70 px-2 py-1 rounded border border-blue-300/20 bg-blue-300/[0.06]">
                        Coming soon
                      </span>
                    </div>
                    <h4
                      className="font-display text-lg text-white leading-snug mb-1.5"
                      dangerouslySetInnerHTML={{ __html: a.name }}
                    />
                    <p
                      className="text-sm text-slate-200/65 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: a.note }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ───────────── Interstitial — Family Transition ───────────── */}
      <section className="relative py-20 md:py-28 bg-slate-2 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(43,92,230,0.12), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="md:flex-1">
              <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/80 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                <span>Family 01 — Complete</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight leading-[1.1]">
                Control &amp; Readiness Agents
              </h3>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            <div className="md:flex-1 md:text-right">
              <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-4 font-mono md:justify-end">
                <span>Family 02 — Up Next</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-4" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight leading-[1.1]">
                Decision Agents
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Section 2 — Decision Agents (secondary catalog) ───────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-4 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-4" />
              <span>Family 02</span>
              <span className="opacity-40">·</span>
              <span>Decision Intelligence</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-slate leading-[1.1] tracking-tight max-w-2xl">
                Decision Agents
              </h2>
              <p className="text-slate-3 text-sm md:text-base max-w-md leading-relaxed">
                Structured recommendations for specific HR domains. Part of the Decision Support product.
              </p>
            </div>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((agent, i) => (
              <RevealDiv key={agent.id} delay={i * 0.04}>
                <AgentCard
                  agent={agent}
                  onSelect={() => onSelectAgent(agent.id)}
                  onBuild={() => onBuildAgent(agent.id)}
                />
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Conceptual architecture ───────────── */}
      <section className="py-20 md:py-28 bg-muted/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Conceptual model
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              A six-layer view of how redesigned HR work is enabled
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-8">
              This is a conceptual architecture used to structure design decisions during a workflow
              redesign. It describes how the layers relate — it does not describe a deployed
              production system or completed integrations.
            </p>
          </RevealDiv>
          <ol className="space-y-3">
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <RevealDiv key={layer.name} delay={i * 0.05}>
                <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="font-mono text-xs text-primary pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{layer.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{layer.desc}</p>
                  </div>
                </li>
              </RevealDiv>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Connection points ───────────── */}
      <section className="py-20 md:py-28 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <RevealDiv>
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Connection points
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              Where a redesigned workflow typically connects
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
              These are potential connection points identified during redesign, not live customer
              integrations. Specific integration work is scoped separately.
            </p>
            <a
              {...navLinkProps("integrations", setPage)}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline no-underline"
            >
              View the integrations catalog — potential integration options, not completed or
              deployed customer connections
              <ArrowRight className="h-4 w-4" />
            </a>
          </RevealDiv>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CONNECTION_POINTS.map((c) => (
              <li
                key={c}
                className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() =>
                onDiscussAgentImplementation ? onDiscussAgentImplementation() : setPage("home")
              }
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
            >
              Discuss Agent Implementation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              {...navLinkProps("services", setPage)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/40 transition-all no-underline"
            >
              Start with Workflow Redesign
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
