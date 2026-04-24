import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileText, Mail, Globe } from "lucide-react";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information", label: "Information We Collect" },
  { id: "usage", label: "How We Use Information" },
  { id: "sharing", label: "Information Sharing" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "retention", label: "Data Retention" },
  { id: "changes", label: "Changes to Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="font-display text-lg text-white">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-24 overflow-y-auto">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contents
              </h2>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="prose prose-invert prose-slate max-w-none">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mt-4 text-slate-400">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                  <p className="text-slate-300 leading-relaxed">
                    Unfold HR AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you use our AI-powered HR platform and services.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <Eye className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Information We Collect
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">Account Information</h3>
                    <p className="text-slate-400">
                      When you register for an account, we collect your name, email address, company name, 
                      and job title. This information is necessary to provide you with access to our platform 
                      and to communicate with you about your account.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                    <p className="text-slate-400">
                      We collect information about how you interact with our platform, including the features you use, 
                      the agents you run, the decisions you generate, and the time spent on different sections. 
                      This helps us improve our services and user experience.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">HR Data You Provide</h3>
                    <p className="text-slate-400">
                      When using our AI agents, you may input HR-related data such as workforce scenarios, 
                      performance metrics, or compliance questions. This data is processed to generate insights 
                      and recommendations. We do not use this data to train our AI models without your explicit consent.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="usage" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    How We Use Your Information
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "Provide, maintain, and improve our AI-powered HR platform",
                    "Process and complete transactions, and send related information",
                    "Send technical notices, updates, security alerts, and support messages",
                    "Respond to your comments, questions, and customer service requests",
                    "Monitor and analyze trends, usage, and activities in connection with our services",
                    "Detect, investigate, and prevent fraudulent transactions and other illegal activities",
                    "Personalize and improve your experience on our platform",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <Globe className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Information Sharing and Disclosure
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Service Providers</h3>
                    <p className="text-slate-400">
                      We may share your information with third-party vendors, service providers, contractors, 
                      or agents who perform services for us or on our behalf. These include cloud hosting providers, 
                      payment processors, and analytics services. We require these parties to process your data 
                      only in accordance with our instructions and this Privacy Policy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Legal Requirements</h3>
                    <p className="text-slate-400">
                      We may disclose your information if required to do so by law or in the good faith belief 
                      that such action is necessary to: (a) comply with a legal obligation; (b) protect and defend 
                      our rights or property; (c) prevent or investigate possible wrongdoing in connection with our services; 
                      (d) protect the personal safety of users or the public; or (e) protect against legal liability.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Business Transfers</h3>
                    <p className="text-slate-400">
                      If we are involved in a merger, acquisition, or sale of all or a portion of our assets, 
                      your information may be transferred as part of that transaction. We will notify you 
                      via email and/or a prominent notice on our website of any change in ownership or uses 
                      of your personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section id="security" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <Lock className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Data Security
                  </h2>
                </div>
                
                <p className="text-slate-300 mb-4">
                  We take the security of your data seriously and implement appropriate technical and organizational 
                  measures to protect your personal information against unauthorized access, alteration, disclosure, 
                  or destruction.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Encryption", desc: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption." },
                    { title: "Access Controls", desc: "Role-based access controls ensure users can only access data they are authorized to view." },
                    { title: "Regular Audits", desc: "We conduct regular security audits and vulnerability assessments of our infrastructure." },
                    { title: "Incident Response", desc: "We maintain a comprehensive incident response plan to address any security issues promptly." },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Your Rights
                  </h2>
                </div>
                
                <p className="text-slate-300 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information. 
                  These may include:
                </p>

                <div className="space-y-3">
                  {[
                    { right: "Right to Access", desc: "You can request copies of your personal information." },
                    { right: "Right to Rectification", desc: "You can request that we correct inaccurate information." },
                    { right: "Right to Erasure", desc: "You can request that we delete your personal information." },
                    { right: "Right to Restrict Processing", desc: "You can request that we limit how we use your information." },
                    { right: "Right to Data Portability", desc: "You can request a copy of your data in a machine-readable format." },
                    { right: "Right to Object", desc: "You can object to our processing of your information." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-white">{item.right}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Retention */}
              <section id="retention" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Data Retention
                  </h2>
                </div>
                
                <p className="text-slate-300 mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  for which we collected it, including for the purposes of satisfying any legal, accounting, 
                  or reporting requirements.
                </p>

                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-5">
                  <h4 className="font-semibold text-white mb-2">Retention Periods</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>Account information: Retained while your account is active</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>Agent outputs and decisions: 2 years from creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>Usage logs and analytics: 1 year from collection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>Marketing communications: Until you opt out</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Changes to Policy */}
              <section id="changes" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Changes to This Policy
                  </h2>
                </div>
                
                <p className="text-slate-300">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  legal requirements, or operational needs. When we make material changes, we will notify 
                  you by email (sent to the email address specified in your account) or by means of a 
                  notice on our platform prior to the change becoming effective. We encourage you to 
                  review this Privacy Policy periodically to stay informed about how we are protecting 
                  your information.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h2 className="font-display text-2xl text-white">
                    Contact Us
                  </h2>
                </div>
                
                <p className="text-slate-300 mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or 
                  our data practices, please contact us:
                </p>

                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a 
                          href="mailto:privacy@unfoldhrai.com" 
                          className="text-slate-400 transition-colors hover:text-emerald-400"
                        >
                          privacy@unfoldhrai.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Website</p>
                        <a 
                          href="https://unfoldhrai.com" 
                          className="text-slate-400 transition-colors hover:text-emerald-400"
                        >
                          unfoldhrai.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-16 border-t border-slate-800 pt-8">
                <p className="text-center text-sm text-slate-500">
                  © {new Date().getFullYear()} Unfold HR AI. All rights reserved.
                </p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
