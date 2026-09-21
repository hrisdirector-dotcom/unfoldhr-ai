import { useMemo, useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

type PublicApi = {
  name: string;
  category: string;
  desc: string;
  endpoint: string;
  docsUrl: string;
  siteUrl: string;
};

type HcmPlatform = {
  name: string;
  modules: string[];
  access: string;
};

const PUBLIC_APIS: PublicApi[] = [
  {
    name: "OpenAI",
    category: "AI / LLM",
    desc: "GPT models, embeddings, and workflow automation.",
    endpoint: "api.openai.com",
    docsUrl: "https://platform.openai.com/docs",
    siteUrl: "https://platform.openai.com",
  },
  {
    name: "Anthropic",
    category: "AI / LLM",
    desc: "Claude models for reasoning, summarization, and agent workflows.",
    endpoint: "api.anthropic.com",
    docsUrl: "https://docs.anthropic.com",
    siteUrl: "https://www.anthropic.com",
  },
  {
    name: "Google Gemini",
    category: "AI / LLM",
    desc: "Multimodal AI for document, image, and workflow use cases.",
    endpoint: "generativelanguage.googleapis.com",
    docsUrl: "https://ai.google.dev/gemini-api/docs",
    siteUrl: "https://ai.google.dev",
  },
  {
    name: "Pinecone",
    category: "Vector DB",
    desc: "Vector search and retrieval for policy, content, and knowledge layers.",
    endpoint: "*.pinecone.io",
    docsUrl: "https://docs.pinecone.io/reference/api/introduction",
    siteUrl: "https://www.pinecone.io",
  },
  {
    name: "Slack",
    category: "Communication",
    desc: "Notifications, nudges, bots, and workflow automation.",
    endpoint: "slack.com/api",
    docsUrl: "https://api.slack.com",
    siteUrl: "https://slack.com",
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    desc: "Teams integrations through Microsoft Graph and bot frameworks.",
    endpoint: "graph.microsoft.com",
    docsUrl: "https://learn.microsoft.com/graph/teams-concept-overview",
    siteUrl: "https://www.microsoft.com/microsoft-teams",
  },
  {
    name: "SendGrid",
    category: "Email",
    desc: "Transactional email delivery and notification workflows.",
    endpoint: "api.sendgrid.com",
    docsUrl: "https://www.twilio.com/docs/sendgrid/api-reference",
    siteUrl: "https://sendgrid.com",
  },
  {
    name: "DocuSign",
    category: "E-Signature",
    desc: "Offer letters, acknowledgments, and document workflows.",
    endpoint: "docusign.net/restapi",
    docsUrl: "https://developers.docusign.com/docs/esign-rest-api/",
    siteUrl: "https://www.docusign.com",
  },
  {
    name: "Greenhouse",
    category: "ATS",
    desc: "Candidate pipeline, requisitions, and recruiting workflow data.",
    endpoint: "harvest.greenhouse.io",
    docsUrl: "https://developers.greenhouse.io/harvest.html",
    siteUrl: "https://www.greenhouse.com",
  },
  {
    name: "Lever",
    category: "ATS",
    desc: "Candidates, opportunities, and recruiting operations.",
    endpoint: "api.lever.co",
    docsUrl: "https://hire.lever.co/developer/documentation",
    siteUrl: "https://www.lever.co",
  },
  {
    name: "BambooHR",
    category: "HRIS",
    desc: "Employee records, time off, and HR data access.",
    endpoint: "api.bamboohr.com",
    docsUrl: "https://documentation.bamboohr.com/docs",
    siteUrl: "https://www.bamboohr.com",
  },
  {
    name: "Lattice",
    category: "Performance",
    desc: "Goals, reviews, and engagement workflow data.",
    endpoint: "api.lattice.com",
    docsUrl: "https://developers.lattice.com",
    siteUrl: "https://lattice.com",
  },
  {
    name: "Formspree",
    category: "Forms",
    desc: "Lightweight form handling for contact and request flows.",
    endpoint: "formspree.io/f/",
    docsUrl: "https://help.formspree.io/hc/en-us",
    siteUrl: "https://formspree.io",
  },
  {
    name: "Airtable",
    category: "Data",
    desc: "Flexible structured data, lightweight workflow storage, and operational apps.",
    endpoint: "api.airtable.com",
    docsUrl: "https://airtable.com/developers/web/api/introduction",
    siteUrl: "https://airtable.com",
  },
];

const HCM_PLATFORMS: HcmPlatform[] = [
  {
    name: "Workday",
    modules: ["HCM", "Recruiting", "Learning", "Compensation", "Benefits", "People Analytics"],
    access: "Customer-controlled API access",
  },
  {
    name: "SAP SuccessFactors",
    modules: ["Employee Central", "Recruiting", "Learning", "Performance"],
    access: "Customer-controlled API access",
  },
  {
    name: "Oracle HCM Cloud",
    modules: ["Core HR", "Talent Management", "Workforce Management"],
    access: "Customer-controlled API access",
  },
  {
    name: "UKG Pro",
    modules: ["HR", "Payroll", "Talent", "Time & Attendance"],
    access: "Customer-controlled API access",
  },
  {
    name: "ADP Workforce Now",
    modules: ["HR", "Payroll", "Benefits", "Talent"],
    access: "Customer-controlled API access",
  },
  {
    name: "Ceridian Dayforce",
    modules: ["HR", "Payroll", "Benefits", "Workforce Management"],
    access: "Customer-controlled API access",
  },
  {
    name: "Namely",
    modules: ["HR", "Payroll", "Benefits", "Talent"],
    access: "Customer-controlled API access",
  },
  {
    name: "Rippling",
    modules: ["HR", "IT", "Finance", "Global Workforce"],
    access: "Customer-controlled API access",
  },
];

function ExternalLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-lg border border-foreground bg-foreground px-3 py-2 text-xs font-semibold text-background transition-colors hover:bg-primary hover:border-primary"
      : "inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-foreground";

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function IntegrationsPage() {
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => ["all", ...new Set(PUBLIC_APIS.map((a) => a.category))], []);

  const filtered = filter === "all" ? PUBLIC_APIS : PUBLIC_APIS.filter((a) => a.category === filter);

  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            Integrations
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Built to <span className="font-serif-alt italic text-primary">connect</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mb-4">
            Connect public APIs for AI, communication, forms, and workflow tools — and integrate with enterprise HR
            systems through secure, customer-controlled access.
          </p>
          <p className="text-muted-foreground text-sm max-w-3xl">
            This catalog lists potential integration options only. It does not represent completed or deployed
            customer connections. Public APIs are linked for direct developer access. Enterprise HCM connections
            depend on your existing customer permissions, tenant configuration, and security model.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.08}>
          <div className="mt-8 rounded-2xl border border-border bg-background p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-2">Public APIs</p>
                <p className="text-sm text-muted-foreground">Self-serve docs, endpoints, and developer resources.</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-2">Enterprise Platforms</p>
                <p className="text-sm text-muted-foreground">
                  Secure integrations through customer-accessible APIs and credentials.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-2">Buyer-Friendly UX</p>
                <p className="text-sm text-muted-foreground">
                  Every card links out to official docs so customers can validate fit fast.
                </p>
              </div>
            </div>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="flex flex-wrap gap-2 mt-8 mb-8">
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

        <RevealDiv delay={0.15}>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-2xl text-foreground">Public APIs</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Official docs and endpoints customers can review directly.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {filtered.length} integration{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-20">
            {filtered.map((api) => (
              <div
                key={api.name}
                className="bg-background border border-border rounded-xl p-5 hover:border-blue-mid transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{api.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-accent text-accent-foreground whitespace-nowrap">
                    {api.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{api.desc}</p>

                <div className="mb-4">
                  <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted-foreground mb-2">
                    Endpoint
                  </p>
                  <code className="block text-xs bg-muted px-2 py-2 rounded text-muted-foreground font-mono break-all">
                    {api.endpoint}
                  </code>
                </div>

                <div className="flex flex-wrap gap-2">
                  <ExternalLink href={api.docsUrl} variant="primary">
                    View Docs
                  </ExternalLink>
                  <ExternalLink href={api.siteUrl}>Website</ExternalLink>
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Enterprise HCM Platforms</h2>
          <p className="text-muted-foreground mb-6">
            Connect through secure API access already available within your HR systems.
          </p>
          <p className="text-muted-foreground text-sm mb-8 max-w-3xl">
            These integrations are typically provisioned through customer-controlled credentials, admin permissions, and
            tenant-specific configuration rather than open self-serve developer access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HCM_PLATFORMS.map((p) => (
              <div key={p.name} className="bg-background border border-border rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-lg text-foreground">{p.name}</h3>
                  <span className="text-[11px] px-2 py-1 rounded bg-muted border border-border text-muted-foreground whitespace-nowrap">
                    {p.access}
                  </span>
                </div>

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
