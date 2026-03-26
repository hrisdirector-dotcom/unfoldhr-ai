import TrainingModuleDetail from "@/components/TrainingModuleDetail";
import type { TrainingModule } from "@/data/trainingModules";
import { useState, useEffect, useRef } from "react";
import { RevealDiv } from "./RevealDiv";
import type { Explainer } from "@/data/explainers";
import TrainingModuleDetail from "@/components/TrainingModuleDetail";
import type { TrainingModule } from "@/data/trainingModules";
interface ExplainerPlayerProps {
  explainer: Explainer;
  trainingModule?: TrainingModule;
  onBack: () => void;
}

// Typing animation hook
function useTypingEffect(lines: string[], active: boolean, speed = 30) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed([]);
      setDone(false);
      return;
    }
    let cancelled = false;
    const result: string[] = [];
    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        result[lineIdx] = line.slice(0, charIdx);
        setDisplayed([...result]);
        charIdx++;
        setTimeout(tick, line.trim() === "" ? 100 : speed);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 200);
      }
    };
    setTimeout(tick, 600);
    return () => {
      cancelled = true;
    };
  }, [active, lines, speed]);

  return { displayed, done };
}

export function ExplainerPlayer({ explainer: e, trainingModule, onBack }: ExplainerPlayerProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [terminalActive, setTerminalActive] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const { displayed: termLines, done: termDone } = useTypingEffect(e.terminalLines, terminalActive, 25);

  // Auto-scroll terminal
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [termLines]);

  const sections = ["Problem", "How It Works", "Steps", "Live Demo", "Results"];

  const levelColor =
    e.level === "Beginner"
      ? "bg-emerald-50 text-emerald-700"
      : e.level === "Intermediate"
        ? "bg-accent text-accent-foreground"
        : "bg-orange-50 text-orange-600";

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Back button + header */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 bg-transparent border-none cursor-pointer transition-colors"
        >
          ← Back to Explainers
        </button>

        <RevealDiv>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[2px] text-primary bg-accent px-3 py-1 rounded-md">
              Module {e.modNum}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${levelColor}`}>{e.level}</span>
            <span className="text-xs text-muted-foreground">
              {e.duration} · {e.tools}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-foreground mb-3 leading-tight whitespace-pre-line">
            {e.h1}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">{e.sub}</p>
        </RevealDiv>

        {/* Section nav */}
        <div className="flex gap-1 mb-12 overflow-x-auto pb-2">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => {
                setActiveSection(i);
                if (i === 3) setTerminalActive(true);
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border-none cursor-pointer whitespace-nowrap transition-colors ${
                activeSection === i
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Section content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* S1: Problem */}
        {activeSection === 0 && (
          <RevealDiv>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{e.s1h}</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl">{e.s1p}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {e.problemCards.map((c, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 hover:border-blue-mid transition-colors"
                >
                  <span className="text-2xl mb-3 block">{c.ico}</span>
                  <h3 className="font-display text-base text-foreground mb-2">{c.h}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.p}</p>
                  <span className="text-xs font-semibold text-primary bg-accent px-2 py-1 rounded">{c.tag}</span>
                </div>
              ))}
            </div>
          </RevealDiv>
        )}

        {/* S2: How It Works */}
        {activeSection === 1 && (
          <RevealDiv>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">{e.s2h}</h2>
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              {e.nodes.map((n, i) => (
                <div key={i} className="flex-1 flex flex-col items-center relative">
                  <div
                    className="rounded-xl p-5 text-center w-full border"
                    style={{ background: n.bg, borderColor: n.brd }}
                  >
                    <span className="text-3xl block mb-2">{n.ico}</span>
                    <div className="font-display text-sm text-foreground font-semibold">{n.lbl}</div>
                    <div className="text-xs text-muted-foreground mt-1">{n.sub}</div>
                  </div>
                  {i < e.nodes.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                      →
                    </div>
                  )}
                  {i < e.nodes.length - 1 && <div className="md:hidden text-muted-foreground text-lg my-1">↓</div>}
                </div>
              ))}
            </div>
          </RevealDiv>
        )}

        {/* S3: Steps */}
        {activeSection === 2 && (
          <RevealDiv>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">{e.s3h}</h2>
            <div className="space-y-6">
              {e.steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center mt-1">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-foreground mb-2">{s.h}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.p}</p>
                    <div className="bg-foreground/5 border border-border rounded-lg p-4">
                      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                        {s.code}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>
        )}

        {/* S4: Live Demo */}
        {activeSection === 3 && (
          <RevealDiv>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">{e.s4h}</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl">{e.s4p}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prompt panel */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/50">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Prompt</span>
                </div>
                <div className="p-4">
                  {e.promptLines.map((line, i) => (
                    <div
                      key={i}
                      className={`text-sm font-mono leading-relaxed ${
                        line.startsWith("//") ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal panel */}
              <div className="bg-foreground rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-background/20">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-destructive/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs text-background/50 ml-2 font-mono">unfold-agent</span>
                  </div>
                </div>
                <div ref={termRef} className="p-4 max-h-80 overflow-y-auto">
                  {termLines.map((line, i) => (
                    <div
                      key={i}
                      className={`text-xs font-mono leading-relaxed ${
                        line.startsWith("✓")
                          ? "text-emerald-400"
                          : line.startsWith("⚠")
                            ? "text-amber-400"
                            : line.startsWith("→")
                              ? "text-blue-300"
                              : line.startsWith("##")
                                ? "text-white font-bold"
                                : "text-white/70"
                      }`}
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}
                  {!termDone && <span className="inline-block w-2 h-4 bg-primary animate-pulse" />}
                </div>
              </div>
            </div>

            {!terminalActive && (
              <button
                onClick={() => setTerminalActive(true)}
                className="mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm border-none cursor-pointer hover:opacity-90 transition-opacity"
              >
                ▶ Run the agent
              </button>
            )}
          </RevealDiv>
        )}

        {/* S5: Results */}
        {activeSection === 4 && (
          <RevealDiv>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">{e.s5label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {e.metrics.map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="text-3xl font-display text-primary mb-1">{m.pct}</div>
                  <div className="text-lg font-bold text-foreground">
                    {m.n} <span className="text-muted-foreground font-normal text-sm">{m.u}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent/50 border border-blue-mid/30 rounded-xl p-8 text-center">
              <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic whitespace-pre-line">
                "{e.quote}"
              </p>
            </div>
          </RevealDiv>
        )}
      </div>

      {/* Bottom nav */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 flex justify-between">
        <button
          onClick={() => {
            setActiveSection(Math.max(0, activeSection - 1));
          }}
          disabled={activeSection === 0}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer border border-border bg-card text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={() => {
            const next = activeSection + 1;
            if (next < sections.length) {
              setActiveSection(next);
              if (next === 3) setTerminalActive(true);
            }
          }}
          disabled={activeSection === sections.length - 1}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer bg-foreground text-background border-none hover:bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
