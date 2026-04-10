import { RevealDiv } from "@/components/RevealDiv";
import { Linkedin } from "lucide-react";

const founders = [
  {
    initial: "E", bg: "bg-foreground", name: "Eric Weaver", title: "Co-Founder & CEO",
    tenure: "20+ years · HR Technology & Transformation",
    bio1: "Eric has spent two decades at the intersection of HR strategy and enterprise technology — not as an observer, but as a practitioner who carried the work himself. He has led HRIS transformations for global organizations, architected multi-country payroll infrastructures, and built solution consulting practices that brought HR technology to C-suite decision makers across industries.",
    bio2: "His conviction is simple: HR was never meant to be an administrative function. The practitioners who chose this field did so to connect with people, develop careers, and shape culture. The agents handle the noise. Eric built unfold HR to give them that purpose back.",
    domains: ["HR Technology Leadership", "HRIS Transformation", "Global Payroll Architecture", "Compensation & Ops", "Enterprise SaaS Presales", "Workforce Compliance"],
    creds: [
      ["🏗️", "HRIS Transformation Architect", "Led end-to-end Workday and enterprise HR platform implementations across global organizations."],
      ["🌐", "Global Payroll Strategist", "Designed multi-country payroll architectures covering compliance and cross-border tax obligations across 30+ jurisdictions."],
      ["💼", "Enterprise Presales Leader", "Built solution consulting practices translating complex HR technology into executive-level business cases for CHROs, CIOs, and CFOs."],
    ],
    linkedin: "https://www.linkedin.com/in/ericweaverhrisleader"
  },
  {
    initial: "K", bg: "bg-primary", name: "Kirk Weaver", title: "Co-Founder & CTO",
    tenure: "20+ years · Technology, Data & Product Delivery",
    bio1: "Kirk brings the technical architecture and product delivery rigor that turns AI concepts into systems that actually run in production. With a career spanning enterprise technology delivery, data analytics infrastructure, and complex systems integration, he is the force behind how unfold HR's agents are built — reliably, scalably, and without the hallmarks of rushed AI development.",
    bio2: "Where Eric speaks the language of HR leaders, Kirk speaks the language of the systems they run on. Together, they close the gap that has kept enterprise AI out of reach for most HR teams — not capability, but translation.",
    domains: ["Enterprise Technology Delivery", "Data Analytics Infrastructure", "AI Systems Architecture", "Product Management", "Systems Integration", "Agile Delivery"],
    creds: [
      ["⚙️", "Enterprise Systems Architect", "Designed and delivered complex technology platforms at enterprise scale, with expertise in data pipelines, API integration, and production reliability."],
      ["📊", "Data & Analytics Leader", "Built analytics infrastructure that turns raw organizational data into actionable intelligence — the foundation every unfold HR agent is built on."],
      ["🚀", "Product Delivery Manager", "Track record of taking complex technical products from concept to production, with the documentation and QA rigor enterprise clients require."],
    ],
    linkedin: "https://www.linkedin.com/in/kirk-weaver-91969a10"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">About</span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            The origin of <span className="font-serif-alt italic text-primary">unfoldHR</span>
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10 mb-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              We started unfoldHR because we saw the same pattern over and over: brilliant HR teams drowning in manual processes while AI tools sat unused on the shelf.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              The problem wasn't the technology — it was the translation layer. HR leaders needed someone who spoke both "people operations" and "AI engineering."
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              That's us. We build AI agents that automate the repetitive, surface the invisible, and give HR teams back the time they need to do what actually matters — taking care of people.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl text-foreground mb-8">Founded by practitioners</h2>
          <div className="space-y-10 mb-16">
            {founders.map((person) => (
              <div key={person.name} className="bg-background border border-border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-full ${person.bg} flex items-center justify-center text-2xl font-display text-primary-foreground shrink-0`}>
                      {person.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-xl text-foreground">{person.name}</h3>
                        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-primary font-semibold mt-1">{person.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{person.tenure}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-6 md:p-8 border-b border-border space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{person.bio1}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{person.bio2}</p>
                </div>

                {/* Domains */}
                <div className="p-6 md:p-8 border-b border-border">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-3">Domains</p>
                  <div className="flex flex-wrap gap-2">
                    {person.domains.map((d) => (
                      <span key={d} className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground mb-4">Credentials</p>
                  <div className="space-y-4">
                    {person.creds.map(([icon, label, desc]) => (
                      <div key={label} className="flex gap-3">
                        <span className="text-lg shrink-0 mt-0.5">{icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}
