import { useState } from "react";

export default function RequestBuildPage() {
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
      const response = await fetch("https://formspree.io/f/f/xojpjonl", {
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

  if (submitted) {
    return (
      <div className="bg-background border border-border rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-display text-2xl text-foreground mb-2">Request sent</h2>
        <p className="text-muted-foreground">We’ll review your request and be in contact within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl p-8 md:p-10 space-y-5">
      <input type="hidden" name="form_type" value="request_build" />

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Name</label>
        <input
          name="name"
          required
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Company</label>
        <input
          name="company"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Module / Use Case
        </label>
        <input
          name="module"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Request Details
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Request Build →"}
      </button>
    </form>
  );
}
