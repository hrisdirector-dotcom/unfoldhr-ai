import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

const PUBLIC_APIS = [
  { name: "OpenAI", category: "AI / LLM", desc: "GPT-4, embeddings, function calling", endpoint: "api.openai.com/v1/chat/completions" },
  { name: "Anthropic", category: "AI / LLM", desc: "Claude models for complex reasoning", endpoint: "api.anthropic.com/v1/messages" },
  { name: "Google Gemini", category: "AI / LLM", desc: "Multimodal AI for document processing", endpoint: "generativelanguage.googleapis.com" },
  { name: "Pinecone", category: "Vector DB", desc: "Vector search for policy & document retrieval", endpoint: "*.pinecone.io" },
  { name: "Slack", category: "Communication", desc: "Notifications, nudges, and bot workflows", endpoint: "slack.com/api" },
  { name: "Microsoft Teams", category: "Communication", desc: "Teams bot integration for HR workflows", endpoint: "graph.microsoft.com" },
  { name: "SendGrid", category: "Email", desc: "Transactional emails and notifications", endpoint: "api.sendgrid.com/v3/mail/send" },
  { name: "DocuSign", category: "E-Signature", desc: "Offer letter & policy acknowledgment workflows", endpoint: "docusign.net/restapi" },
  { name: "Greenhouse", category: "ATS", desc: "Recruiting pipeline and candidate data", endpoint: "harvest.greenhouse.io/v1" },
  { name: "Lever", category: "ATS", desc: "Candidate and opportunity management", endpoint: "api.lever.co/v1" },
  { name: "BambooHR", category: "HRIS", desc: "Employee records and time-off management", endpoint: "api.bamboohr.com/api/gateway.php" },
  { name: "Lattice", category: "Performance", desc: "Goals, reviews, and engagement data", endpoint: "api.lattice.com" },
  { name: "Formspree", category: "Forms", desc: "Contact form submissions", endpoint: "formspree.io/f/" },
  { name: "Airtable", category: "Data", desc: "Flexible data storage and workflows", endpoint: "api.airtable.com/v0" },
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
  const categories = ["all", ...new Set(PUBLIC_APIS.map(a => a.category))];
  const filtered = filter === "all" ? PUBLIC_APIS : PUBLIC_APIS.filter(a => a.category === filter);

  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Integrations</span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            23 APIs. <span className="font-serif-alt italic text-primary">Connected.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            Public APIs for AI, communication, and e-signature — plus deep integrations with 8 enterprise HCM platforms.
          </p>
        </RevealDiv>

        {/* Filter */}
        <RevealDiv delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border cursor-pointer transition-colors capitalize ${
                  filter === c ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </RevealDiv>

        {/* Public APIs */}
        <RevealDiv delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filtered.map(api => (
              <div key={api.name} className="bg-background border border-border rounded-xl p-5 hover:border-blue-mid transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{api.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-accent text-accent-foreground">{api.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{api.desc}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground font-mono">{api.endpoint}</code>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* HCM Platforms */}
        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Enterprise HCM Platforms</h2>
          <p className="text-muted-foreground mb-8">Deep integrations with the platforms your HR team already uses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HCM_PLATFORMS.map(p => (
              <div key={p.name} className="bg-background border border-border rounded-xl p-5">
                <h3 className="font-display text-lg text-foreground mb-3">{p.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.modules.map(m => (
                    <span key={m} className="text-xs px-2 py-1 rounded bg-muted border border-border text-muted-foreground">{m}</span>
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
