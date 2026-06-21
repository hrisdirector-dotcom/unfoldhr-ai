import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  setPage: (p: string) => void;
  showToast: (msg: string) => void;
}

export default function FinalCTA({ setPage, showToast }: FinalCTAProps) {
  return (
    <section id="final-cta" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-2 to-slate text-white overflow-hidden border-t border-slate-2">
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(43,92,230,0.22), transparent 65%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
        <RevealDiv>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-blue-200/90 font-mono mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              Request an Agent
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-4">
              Not seeing the right agent for your system?
            </h2>
            <p className="text-slate-200/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us about your HRIS and workflow. We'll match you to an existing agent or scope a new one for your stack.
            </p>

            <form
              id="request"
              onSubmit={(e) => { e.preventDefault(); showToast("✓ Request received! We'll be in touch within 48 hours."); }}
              className="space-y-3 text-left max-w-md mx-auto"
            >
              <input
                placeholder="Work email"
                type="email"
                required
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-200/50 outline-none focus:border-blue-300/60 focus:bg-white/[0.08] transition-colors"
              />
              <input
                placeholder="Company & role"
                type="text"
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-200/50 outline-none focus:border-blue-300/60 focus:bg-white/[0.08] transition-colors"
              />
              <textarea
                placeholder="What HR workflow do you need an agent for?"
                rows={3}
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-200/50 outline-none focus:border-blue-300/60 focus:bg-white/[0.08] transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-slate font-semibold text-sm hover:bg-blue-50 transition-all shadow-[0_18px_50px_-12px_rgba(43,92,230,0.6)]"
              >
                Submit Request <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm">
              <button
                onClick={() => setPage("global-lifecycle-agent")}
                className="font-medium text-blue-200 hover:text-white cursor-pointer bg-transparent border-none transition-colors"
              >
                Explore the Global Lifecycle Agent →
              </button>
              <button
                onClick={() => setPage("pricing")}
                className="font-medium text-slate-200/70 hover:text-white cursor-pointer bg-transparent border-none transition-colors"
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
