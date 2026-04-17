import { RevealDiv } from "@/components/RevealDiv";

export default function PatternBreak() {
  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/60">
      <div className="max-w-4xl mx-auto px-6 md:px-14 text-center">
        <RevealDiv>
          <p className="font-display text-xl md:text-2xl text-foreground/80 italic">
            Most AI conversations miss this<span className="text-primary">…</span>
          </p>
        </RevealDiv>
      </div>
    </section>
  );
}
