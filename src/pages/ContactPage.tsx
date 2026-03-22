import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Contact</span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Let's <span className="font-serif-alt italic text-primary">talk</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Have a question or ready to start building? Drop us a line.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          {submitted ? (
            <div className="bg-background border border-border rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="font-display text-2xl text-foreground mb-2">Message sent</h2>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              action="https://formspree.io/f/xwvrjodw"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="bg-background border border-border rounded-2xl p-8 md:p-10 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Name</label>
                  <input name="name" required className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
                  <input name="email" type="email" required className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Company</label>
                <input name="company" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Message</label>
                <textarea name="message" rows={5} required className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors">
                Send Message →
              </button>
            </form>
          )}
        </RevealDiv>
      </div>
    </div>
  );
}
