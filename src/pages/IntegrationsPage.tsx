import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

const PUBLIC_APIS = [
  {
    name: "OpenAI",
    category: "AI / LLM",
    desc: "GPT models, embeddings, and function calling",
    endpoint: "api.openai.com",
  },
  {
    name: "Anthropic",
    category: "AI / LLM",
    desc: "Claude models for reasoning and summarization",
    endpoint: "api.anthropic.com",
  },
  {
    name: "Google Gemini",
    category: "AI / LLM",
    desc: "Multimodal AI for document and workflow automation",
    endpoint: "generativelanguage.googleapis.com",
  },
  {
    name: "Pinecone",
    category: "Vector DB",
    desc: "Vector search for policy and document retrieval",
    endpoint: "*.pinecone.io",
  },
  {
    name: "Slack",
    category: "Communication",
    desc: "Notifications, nudges, and workflow automation",
    endpoint: "slack.com/api",
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    desc: "Teams integration via Microsoft Graph API",
    endpoint: "graph.microsoft.com",
  },
  { name: "SendGrid", category: "Email", desc: "Transactional email delivery", endpoint: "api.sendgrid.com" },
  {
    name: "DocuSign",
    category: "E-Signature",
    desc: "Offer letters and document workflows",
    endpoint: "docusign.net/restapi",
  },
  {
    name: "Greenhouse",
    category: "ATS",
    desc: "Recruiting pipeline and candidate data",
    endpoint: "harvest.greenhouse.io",
  },
  { name: "Lever", category: "ATS", desc: "Candidate and opportunity management", endpoint: "api.lever.co" },
  { name: "BambooHR", category: "HRIS", desc: "Employee records and time-off data", endpoint: "api.bamboohr.com" },
  {
    name: "Lattice",
    category: "Performance",
    desc: "Goals, reviews, and engagement data",
    endpoint: "api.lattice.com",
  },
  { name: "Formspree", category: "Forms", desc: "Form submission handling", endpoint: "formspree.io" },
  { name: "Airtable", category: "Data", desc: "Flexible data storage and workflows", endpoint: "api.airtable.com" },
];

const HCM_PLATFORMS = [
  { name: "Workday", modules: ["HCM", "Recruiting", "Learning", "Compensation", "Benefits", "People Analytics"] },
  { name: "SAP SuccessFactors", modules: ["Employee Central", "Recruiting", "Learning", "Performance"] },
  { name: "Oracle HCM Cloud", modules: ["Core HR", "Talent Management", "Workforce Management"] },
  { name: "UKG Pro", modules: ["HR", "Payroll", "Talent", "Time & Attendance"] },
  { name: "ADP Workforce Now", modules: ["HR", "Payroll", "Benefits", "Talent"] },
  { name: "Ceridian Dayforce", modules: ["HR", "Payroll", "Benefits", "Workforce Management"] },
  { name: "Namely", modules: ["HR", "Payroll", "Benefits", "Talent"] },
  { name: "Rippling", modules: ["HR", "IT", "Finance", "Global Workforce"] },
];

export default function IntegrationsPage() {
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...new Set(PUBLIC_APIS.map((a) => a.category))];
  const filtered = filter === "all" ? PUBLIC_APIS : PUBLIC_APIS.filter((a) => a.category === filter);

  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* HEADER */}
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            Integrations
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Built to <span className="font-serif-alt italic text-primary">connect</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-6">
            Integrate with AI, communication, and workflow platforms through public APIs — and connect to enterprise HR
            systems using secure, customer-accessible APIs.
          </p>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Enterprise platforms require existing customer access, permissions, and configuration within your HR system.
          </p>
        </RevealDiv>

        {/* FILTER */}
        <RevealDiv delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border cursor-pointer transition-colors capitalize ${
                  filter === c
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </RevealDiv>

        {/* PUBLIC APIs */}
        <RevealDiv delay={0.15}>
          <h2 className="font-display text-2xl text-foreground mb-4">Public APIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filtered.map((api) => (
              <div
                key={api.name}
                className="bg-background border border-border rounded-xl p-5 hover:border-blue-mid transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{api.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-accent text-accent-foreground">{api.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{api.desc}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground font-mono">
                  {api.endpoint}
                </code>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* HCM */}
        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Enterprise HCM Platforms</h2>
          <p className="text-muted-foreground mb-6">
            Integrations leverage secure API access provided within your existing HR platforms.
          </p>
          <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
            Access to these systems requires customer credentials, permissions, and tenant configuration. UnfoldHR
            connects using the same integration methods your organization already supports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HCM_PLATFORMS.map((p) => (
              <div key={p.name} className="bg-background border border-border rounded-xl p-5">
                <h3 className="font-display text-lg text-foreground mb-3">{p.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.modules.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2 py-1 rounded bg-muted border border-border text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}
