import { RevealDiv } from "@/components/RevealDiv";
import { Linkedin, ArrowRight } from "lucide-react";

const founders = [
  {
    initial: "E",
    bg: "bg-foreground",
    name: "Eric Weaver",
    title: "Co-Founder & CEO",
    tenure: "20+ years · HR Technology & Enterprise AI Strategy",
    bio: "Eric is a strategic AI solution consultant with over 15 years leading HCM, payroll, and workforce technology initiatives. He has guided CHROs, CFOs, and CIOs on AI-driven workforce transformation, built enterprise AI narratives, and translated complex technology into measurable business outcomes. Before co-founding unfoldHR, he spent a decade at UKG as a Lead Solution Consultant, consistently driving multi-million dollar deals while helping organizations reimagine workforce strategy with AI.",
    domains: [
      "AI-Driven Workforce Strategy",
      "Enterprise AI Advisory",
      "HRIS & HCM Transformation",
      "Executive Solution Consulting",
      "Workforce Decision Intelligence",
    ],
    creds: [
      [
        "🏗️",
        "Enterprise AI & HCM Strategist",
        "Led AI-enabled workforce transformation initiatives and solution strategy for global organizations.",
      ],
      [
        "📈",
        "Lead Solution Consultant (UKG)",
        "Drove $50M+ in SaaS revenue through enterprise presales engagements focused on HCM, Payroll, and Workforce Management.",
      ],
      [
        "🌐",
        "Global HR Technology Leader",
        "Directed HRIS transformations, payroll accuracy improvements to 99.8%, and data-driven workforce analytics at scale.",
      ],
      [
        "🤖",
        "AI Strategy & Innovation",
        "Built UnfoldHR, an AI-driven workforce decision platform, and developed frameworks connecting AI agents to real business outcomes.",
      ],
    ],
    linkedin: "https://www.linkedin.com/in/ericweaverhrisleader",
  },
  {
    initial: "K",
    bg: "bg-primary",
    name: "Kirk Weaver",
    title: "Co-Founder & CTO",
    tenure: "20+ years · Technology, Data & Product Delivery",
    bio: "Kirk brings the technical architecture and product delivery rigor that turns AI concepts into systems that run in production. With a career spanning enterprise technology, data analytics, and complex systems integration, he's the force behind how unfold HR's agents are built — reliably, scalably, and without shortcuts. Where Eric speaks the language of HR leaders, Kirk speaks the language of the systems they run on. Together, they close the gap that has kept enterprise AI out of reach for most HR teams.",
    domains: [
      "Enterprise Technology Delivery",
      "Data Analytics Infrastructure",
      "AI Systems Architecture",
      "Product Management",
      "Systems Integration",
      "Agile Delivery",
    ],
    creds: [
      [
        "⚙️",
        "Enterprise Systems Architect",
        "Designed and delivered complex technology platforms at enterprise scale with production reliability.",
      ],
      [
        "📊",
        "Data & Analytics Leader",
        "Built analytics infrastructure that turns raw organizational data into actionable intelligence.",
      ],
      [
        "🚀",
        "Product Delivery Manager",
        "Track record of taking complex technical products from concept to production with enterprise rigor.",
      ],
    ],
    linkedin: "https://www.linkedin.com/in/kirk-weaver-91969a10",
  },
];

export default function AboutPage() {
  const scrollToGallery = () => {
    // Navigate to home and scroll to gallery
    window.history.pushState({ page: "home" }, "");
    window.dispatchEvent(new PopStateEvent("popstate", { state: { page: "home" } }));
    setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <div className="bg-background pt-32 pb-0">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 md:px-14 pb-20">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">About</span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-5">
            The origin of <span className="font-serif-alt italic text-primary">unfoldHR</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Built by HR practitioners who got tired of watching great teams drown in admin work.
          </p>
        </RevealDiv>

        {/* Origin story */}
        <RevealDiv delay={0.1}>
          <div className="mt-12 space-y-5">
            <p className="text-foreground text-lg leading-relaxed">
              We founded unfoldHR after seeing the same pattern repeat across organizations: talented HR teams buried
              under manual processes while powerful AI tools sat unused on the shelf.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary pl-5">
              The real barrier wasn't technology — it was the missing translation layer between HR strategy and reliable
              AI engineering.
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              We speak both languages fluently. Eric brings decades of hands-on HR transformation experience. Kirk
              brings enterprise-grade technical architecture and product delivery rigor. Together, we build AI agents
              that actually work in production — so HR teams can stop pushing paper and start focusing on people again.
            </p>
          </div>
        </RevealDiv>

        {/* Founders */}
        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl text-foreground mt-20 mb-8">Founded by practitioners</h2>
          <div className="space-y-8">
            {founders.map((person) => (
              <div key={person.name} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-14 h-14 rounded-full ${person.bg} flex items-center justify-center text-xl font-display text-primary-foreground shrink-0`}
                    >
                      {person.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-xl text-foreground">{person.name}</h3>
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${person.name} LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-primary font-semibold mt-1">{person.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{person.tenure}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-6 md:p-8 border-b border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">{person.bio}</p>
                </div>

                {/* Domains + Credentials */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Domains</p>
                    <div className="flex flex-wrap gap-1.5">
                      {person.domains.map((d) => (
                        <span
                          key={d}
                          className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-border font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-3">
                      Credentials
                    </p>
                    <div className="space-y-3">
                      {person.creds.map(([icon, label, desc]) => (
                        <div key={label} className="flex gap-2.5">
                          <span className="text-base shrink-0 mt-0.5">{icon}</span>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{label}</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>

      {/* Vision section */}
      <section className="bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-14 py-20 md:py-28">
          <RevealDiv>
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
              Our Vision
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
              HR should be the most <span className="font-serif-alt italic text-primary">human</span> part of any
              organization.
            </h2>
          </RevealDiv>

          <RevealDiv delay={0.1}>
            <div className="space-y-5 mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The future of work isn't about replacing people with AI — it's about freeing HR professionals from
                repetitive, soul-crushing tasks so they can do what they joined the profession to do: build cultures,
                develop talent, solve real human problems, and create workplaces where people thrive.
              </p>
              <p className="text-lg text-foreground leading-relaxed font-medium">
                unfoldHR exists to make that future real — one autonomous, trustworthy agent at a time.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-primary pl-5">
                We're not here to sell hype. We're here to deliver agents that HR leaders can actually trust with their
                most important workflows.
              </p>
            </div>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({ page: "contact" }, "");
                  window.dispatchEvent(new PopStateEvent("popstate", { state: { page: "contact" } }));
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 no-underline"
              >
                Join the Mission — Build With Us <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToGallery}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-transparent text-foreground font-semibold text-sm border border-border cursor-pointer hover:border-primary hover:text-primary transition-all duration-200"
              >
                Try Our Agents
              </button>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
