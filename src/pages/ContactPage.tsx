import { useState } from "react";
import { submitContactRequest } from "@/lib/submitContact";

const AI_JOURNEY_OPTIONS = [
  "It's a new language to me",
  "I've experimented with AI tools",
  "My company wants me to figure this out",
  "I get AI — show me what's next",
];

export default function RequestBuildPanel({ agentName }: { agentName?: string | null }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [aiJourney, setAiJourney] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const company = (formData.get("company") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !aiJourney || !message) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    const result = await submitContactRequest({ name, email, company, aiJourney, message });

    if (result === "saved") {
      setSubmitted(true);
      form.reset();
    } else if (result === "unknown") {
      setError("We couldn't confirm your request was received. Please check back before resending.");
    } else {
      setError("Request failed. Please try again.");
    }

    setSubmitting(false);
  }


  const header = (
    <header className="mb-10 text-center">
      <p className="text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Contact UnfoldHR</p>
      <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
        Bring us one HR workflow that needs to change
      </h1>
      <p className="text-base text-muted-foreground max-w-xl mx-auto">
        Tell us where the work is breaking down. We will use the initial conversation to determine
        the most appropriate next step.
      </p>
      {agentName && (
        <p className="mt-4 inline-block text-sm font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5">
          You're asking about building: {agentName}
        </p>
      )}
    </header>
  );

  if (submitted) {
    return (
      <div className="pt-24 pb-20 px-6 bg-background">
        <div className="max-w-2xl mx-auto">
          {header}
          <div className="bg-background border border-border rounded-2xl p-10 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="font-display text-2xl text-foreground mb-2">Request sent</h2>
            <p className="text-muted-foreground">We'll be in contact within 48 hours.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        {header}
        <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl p-8 md:p-10 space-y-5">
      <input type="hidden" name="form_type" value="contact" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Name</label>
          <input
            id="contact-name"
            name="name"
            required
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Company</label>
        <input
          id="contact-company"
          name="company"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
          Where are you on your AI journey?
        </label>
        <div className="flex flex-wrap gap-2">
          {AI_JOURNEY_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setAiJourney(opt)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
                aiJourney === opt
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:border-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Challenges you're trying to solve?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
          placeholder="Tell us about the HR workflows or decisions you'd like to improve."
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Get in Touch →"}
      </button>
        </form>
      </div>
    </div>
  );
}
