import { useState, useEffect } from "react";
import { LevelBadge } from "./LevelBadge";
import AgentDemo from "@/components/AgentDemo";
import ModuleVideoEmbed from "@/components/ModuleVideoEmbed";
import { getModuleVideoById } from "@/data/moduleVideos";
import { supabase } from "@/integrations/supabase/client";
import type { Module } from "@/data/modules";

interface DrawerProps {
  mod: Module | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function ModuleDrawer({ mod, onClose, onToast }: DrawerProps) {
  const [tab, setTab] = useState<"curriculum" | "prompts" | "build">("curriculum");
  const [openPrompts, setOpenPrompts] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<Record<number, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  // Build request form state
  const [buildEmail, setBuildEmail] = useState("");
  const [buildCompany, setBuildCompany] = useState("");
  const [buildChallenge, setBuildChallenge] = useState("");

  const resetBuildForm = () => {
    setBuildEmail("");
    setBuildCompany("");
    setBuildChallenge("");
  };

  const handleBuildSubmit = async () => {
    if (!buildEmail || !buildChallenge) {
      onToast("Please fill in email and challenge fields.");
      return;
    }
    setSubmitting(true);
    try {
      const companyParts = buildCompany.split("—").map(s => s.trim());
      const { error } = await supabase.from("submissions").insert({
        request_type: "build_request",
        contact_name: companyParts[1] || companyParts[0] || "",
        email: buildEmail,
        company_name: companyParts[0] || "",
        module: mod?.title || "",
        message: buildChallenge,
      });
      if (error) throw error;
      resetBuildForm();
      onClose();
      onToast("✓ Build request received. Expect a scoping call within 48 hours.");
    } catch {
      onToast("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mod) return null;

  const togglePrompt = (i: number) => setOpenPrompts(p => ({ ...p, [i]: !p[i] }));
  const copyPrompt = (i: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(c => ({ ...c, [i]: true }));
      setTimeout(() => setCopied(c => ({ ...c, [i]: false })), 2000);
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 overlay-open"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-card z-50 drawer-open overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex items-start gap-4">
            <span className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: mod.iconBg }}>
              {mod.icon}
            </span>
            <div>
              <h2 className="font-display text-xl text-foreground mb-1">{mod.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
              <div className="mt-2">
                <LevelBadge level={mod.level} label={mod.levelLabel} />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl bg-transparent border-none cursor-pointer p-2">
            ✕
          </button>
        </div>

        {/* Video Embed */}
        <ModuleVideoEmbed url={getModuleVideoById(mod.id)} title={mod.title} />

        {/* Tabs */}
        <div className="flex border-b border-border">
          {([
            { key: "curriculum" as const, label: "📚 Curriculum" },
            { key: "prompts" as const, label: "💬 Prompt Library" },
            { key: "build" as const, label: "⚡ Request Build" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3.5 text-sm font-semibold cursor-pointer bg-transparent border-none border-b-2 transition-colors whitespace-nowrap ${
                tab === key ? "text-primary border-b-primary" : "text-muted-foreground border-b-transparent"
              }`}
              style={{ borderBottomWidth: 2, borderBottomStyle: "solid", borderBottomColor: tab === key ? "hsl(var(--primary))" : "transparent" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6">
          {/* CURRICULUM TAB */}
          {tab === "curriculum" && mod.curriculum.map((ph, pi) => (
            <div key={pi} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                  {pi + 1}
                </span>
                <span className="font-semibold text-foreground">{ph.phase}</span>
                <span className="text-xs text-muted-foreground ml-auto">{ph.duration}</span>
              </div>
              <div className="ml-10 space-y-2">
                {ph.lessons.map((l, li) => (
                  <div key={li} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                    <span className="text-base">{l.type}</span>
                    <div className="flex-1">
                      <span className="text-sm text-foreground font-medium">{l.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{l.dur}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${l.free ? "bg-emerald-50 text-emerald-600" : "text-muted-foreground"}`}>
                      {l.free ? "Free Preview" : "Enrolled"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Agent Demo for Workforce Planning */}
          {tab === "curriculum" && mod.id === "workforce-planning" && (
            <div className="mt-6">
              <AgentDemo
                situation={[
                  "Workforce of 120 employees",
                  "Growth target of 25%",
                  "Hiring budget increase capped at 15%",
                ]}
                question="How should we structure hiring to hit our growth target within budget constraints?"
                plan={
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Headcount Plan</h4>
                      <div className="space-y-1 text-sm text-foreground">
                        <p>Sales — 8 hires</p>
                        <p>Engineering — 3 hires</p>
                        <p>HR — 2 hires</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Timeline</h4>
                      <div className="space-y-1 text-sm text-foreground">
                        <p>Q1 — 5 hires</p>
                        <p>Q2 — 4 hires</p>
                        <p>Q3 — 4 hires</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Risks</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Budget overrun if hiring accelerates early</p>
                        <p>Engineering hiring constraints</p>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {/* PROMPTS TAB */}
          {tab === "prompts" && (
            <div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Production-ready prompt templates for {mod.title}. Expand, copy, and paste into your agent builder.
              </p>
              {mod.prompts.map((p, i) => (
                <div key={i} className="mb-3 border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => togglePrompt(i)}
                    className="flex items-center justify-between w-full p-4 bg-transparent border-none cursor-pointer text-left"
                  >
                    <span className="text-sm font-semibold text-foreground">💬 {p.label}</span>
                    <span className={`text-xs text-muted-foreground transition-transform ${openPrompts[i] ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {openPrompts[i] && (
                    <div className="px-4 pb-4">
                      <div className="relative bg-muted rounded-lg p-4">
                        <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">{p.text}</pre>
                        <button
                          onClick={() => copyPrompt(i, p.text)}
                          className="absolute top-2 right-2 bg-card border border-border text-muted-foreground hover:text-primary px-2.5 py-1 rounded text-xs cursor-pointer transition-colors"
                        >
                          {copied[i] ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* BUILD TAB */}
          {tab === "build" && (
            <div>
              <h3 className="font-display text-lg text-foreground mb-2">Request a Build — {mod.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Tell us your specific workflow challenge. We'll scope, advise, and work with you to deploy a production-ready agent — typically delivered in 2–4 weeks.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Work Email</label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={buildEmail}
                    onChange={e => setBuildEmail(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Company & Role</label>
                  <input
                    type="text"
                    placeholder="Acme Corp — VP People Ops"
                    value={buildCompany}
                    onChange={e => setBuildCompany(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Describe Your Challenge</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your current process…"
                    value={buildChallenge}
                    onChange={e => setBuildChallenge(e.target.value)}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleBuildSubmit}
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Build Request →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
