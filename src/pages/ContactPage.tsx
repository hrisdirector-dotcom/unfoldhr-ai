import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type RequestBuildPanelProps = {
  moduleTitle?: string;
};

export default function RequestBuildPanel({ moduleTitle }: RequestBuildPanelProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const company = (formData.get("company") as string)?.trim();
    const module = (formData.get("module") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      // Save to database
      const { error: dbError } = await supabase.from("submissions").insert({
        request_type: "contact",
        contact_name: name,
        email,
        company_name: company || "",
        module: module || "",
        message,
      });

      if (dbError) throw dbError;

      // Also send to Formspree
      await fetch("https://formspree.io/f/mgopojll", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-background border border-border rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-display text-2xl text-foreground mb-2">Request sent</h2>
        <p className="text-muted-foreground">We'll be in contact within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl p-8 md:p-10 space-y-5">
      <input type="hidden" name="form_type" value="request_build" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Company</label>
        <input
          name="company"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Module</label>
        <input
          name="module"
          defaultValue={moduleTitle}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
          Request Details
        </label>
        <textarea
          name="message"
          rows={6}
          required
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
          placeholder="Describe the workflow, systems, outputs, and business outcome you want."
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Request Build →"}
      </button>
    </form>
  );
}
