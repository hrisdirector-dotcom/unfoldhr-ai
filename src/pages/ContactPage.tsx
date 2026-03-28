import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";

type RequestBuildPageProps = {
  moduleTitle?: string;
};

export default function RequestBuildPage({ moduleTitle = "" }: RequestBuildPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgopojll", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError("Request failed. Please try again.");
      }
    } catch {
      setError("Request failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">
            Request Build
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Build this <span className="font-serif-alt italic text-primary">for me</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Tell us what you want to build and we’ll be in contact within 48 hours.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          {submitted ? (
            <div className="bg-background border border-border rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="font-display text-2xl text-foreground mb-2">Request sent</h2>
              <p className="text-muted-foreground">We’ll be in contact within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-background border border-border rounded-2xl p-8 md:p-10 space-y-5"
            >
              <input type="hidden" name="form_type" value="request_build" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Company
                </label>
                <input
                  name="company"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Module
                </label>
                <input
                  name="module"
                  defaultValue={moduleTitle}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  What do you need built?
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Describe the workflow, systems, outputs, and business outcome you want."
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Request Build →"}
              </button>
            </form>
          )}
        </RevealDiv>
      </div>
    </div>
  );
}
