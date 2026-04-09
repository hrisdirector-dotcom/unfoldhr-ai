import { RevealDiv } from "@/components/RevealDiv";

interface FinalCTAProps {
  setPage: (p: string) => void;
  showToast: (msg: string) => void;
}

export default function FinalCTA({ setPage, showToast }: FinalCTAProps) {
  return (
    <section id="final-cta" className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-5">Get Started</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Ready to transform how your team makes decisions?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Tell us about your HR workflow challenge and we'll show you how an Unfold HR agent can help — in a single conversation.
            </p>

            <form
              id="request"
              onSubmit={(e) => { e.preventDefault(); showToast("✓ Request received! We'll be in touch within 48 hours."); }}
              className="space-y-4 text-left max-w-md mx-auto"
            >
              <input
                placeholder="Work email"
                type="email"
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
              <input
                placeholder="Company & role"
                type="text"
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
              <textarea
                placeholder="Describe your HR workflow challenge…"
                rows={3}
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Request →
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => setPage("try-picker")}
                className="text-sm font-medium text-primary hover:underline cursor-pointer bg-transparent border-none"
              >
                Or try an agent for free →
              </button>
              <button
                onClick={() => setPage("pricing")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer bg-transparent border-none transition-colors"
              >
                View pricing →
              </button>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
