import { useState, useEffect } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight } from "lucide-react";
import { submitContactRequest } from "@/lib/submitContact";
import { BOOKING_URL } from "@/lib/booking";
import type { InquiryPreset } from "@/pages/Index";

interface FinalCTAProps {
  setPage: (p: string) => void;
  showToast: (msg: string) => void;
  inquiry?: InquiryPreset | null;
}

const AGENT_STEP = "Agent Platform / Agent Implementation";

const NEXT_STEPS = [
  "Confidential introduction",
  "Workflow Redesign Sprint",
  AGENT_STEP,
  "Executive briefing",
  "General question",
] as const;

type NextStep = (typeof NEXT_STEPS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-200/40 outline-none focus:border-blue-300/60 focus:bg-white/[0.08] transition-colors";

const labelClass = "block text-xs font-semibold text-slate-200/80 mb-1.5";

const emptyForm = {
  name: "",
  email: "",
  company: "",
  role: "",
  nextStep: "" as "" | NextStep,
  workflow: "",
  notWorking: "",
  outcome: "",
  question: "",
  agentArea: "",
  agentWorkflow: "",
  agentContext: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function FinalCTA({ setPage, showToast, inquiry }: FinalCTAProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastStep, setLastStep] = useState<"" | NextStep>("");

  const isGeneral = form.nextStep === "General question";
  const isAgent = form.nextStep === AGENT_STEP;
  const showWorkflowFields = form.nextStep !== "" && !isGeneral && !isAgent;

  useEffect(() => {
    if (!inquiry) return;
    const match = NEXT_STEPS.find((s) => s === inquiry.type);
    if (!match) return;
    setSubmitted(false);
    setForm((prev) => ({ ...prev, nextStep: match }));
    setErrors({});
  }, [inquiry]);


  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setNextStep = (value: NextStep) => {
    setForm((prev) => ({ ...prev, nextStep: value }));
    // Drop validation for fields that are no longer visible.
    setErrors((prev) => ({
      ...prev,
      nextStep: undefined,
      workflow: undefined,
      notWorking: undefined,
      outcome: undefined,
      question: undefined,
      agentArea: undefined,
      agentWorkflow: undefined,
      agentContext: undefined,
    }));
  };

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your work email.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.company.trim()) next.company = "Please enter your company.";
    if (!form.role.trim()) next.role = "Please enter your role.";
    if (!form.nextStep) next.nextStep = "Please choose a preferred next step.";

    if (showWorkflowFields) {
      if (!form.workflow.trim()) next.workflow = "Please name the workflow or process.";
      if (!form.notWorking.trim()) next.notWorking = "Please describe what is not working.";
      if (!form.outcome.trim()) next.outcome = "Please describe the outcome you need.";
    }
    if (isAgent) {
      if (!form.agentArea.trim()) next.agentArea = "Please describe the agent capability of interest.";
      if (!form.agentWorkflow.trim()) next.agentWorkflow = "Please name the workflow it would support.";
      if (!form.agentContext.trim()) next.agentContext = "Please describe your current systems and context.";
    }
    if (isGeneral && !form.question.trim()) {
      next.question = "Please enter your question.";
    }
    return next;
  }

  function buildMessage(): string {
    const role = `Role: ${form.role.trim()}`;
    if (isGeneral) {
      return [
        role,
        "Preferred next step:",
        "General question",
        "General question:",
        form.question.trim(),
      ].join("\n");
    }
    if (isAgent) {
      return [
        role,
        "Agent capability of interest:",
        form.agentArea.trim(),
        "Workflow it would support:",
        form.agentWorkflow.trim(),
        "Current systems and context:",
        form.agentContext.trim(),
        "Preferred next step:",
        AGENT_STEP,
      ].join("\n");
    }
    return [
      role,
      "HR workflow or process:",
      form.workflow.trim(),
      "What is not working today:",
      form.notWorking.trim(),
      "Outcome needed:",
      form.outcome.trim(),
      "Preferred next step:",
      form.nextStep,
    ].join("\n");
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFormError("Please complete the required fields.");
      return;
    }

    setFormError("");
    setSubmitting(true);

    const result = await submitContactRequest({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      aiJourney: form.nextStep as string,
      message: buildMessage(),
      notificationFields: { role: form.role.trim(), preferred_next_step: form.nextStep as string },
    });

    if (result === "saved") {
      setSubmitted(true);
      setForm(emptyForm);
      setErrors({});
    } else if (result === "unknown") {
      setFormError(
        "We couldn't confirm your request was received. Your details are still here — please check back before resending.",
      );
    } else {
      setFormError("Your request could not be sent. Please try again.");
    }

    setSubmitting(false);
  }

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-xs text-red-300">
        {errors[key]}
      </p>
    ) : null;

  const a11y = (key: keyof FormState) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

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
              Start the Conversation
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-4">
              Bring us one HR workflow that needs to change
            </h2>
            <p className="text-slate-200/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us where the work is breaking down. We will use the initial conversation to
              determine whether a Workflow Redesign Sprint is appropriate.
            </p>

            {submitted ? (
              <div
                role="status"
                className="max-w-md mx-auto rounded-2xl border border-white/15 bg-white/[0.06] p-8 text-center"
              >
                <p className="text-base text-white leading-relaxed">
                  Request received. We will review the information and respond within two business
                  days.
                </p>
              </div>
            ) : (
              <form id="request" onSubmit={handleSubmit} noValidate className="space-y-4 text-left max-w-md mx-auto">
                <div>
                  <label className={labelClass} htmlFor="cta-name">Name</label>
                  <input
                    id="cta-name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass}
                    {...a11y("name")}
                  />
                  {fieldError("name")}
                </div>

                <div>
                  <label className={labelClass} htmlFor="cta-email">Work email</label>
                  <input
                    id="cta-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputClass}
                    {...a11y("email")}
                  />
                  {fieldError("email")}
                </div>

                <div>
                  <label className={labelClass} htmlFor="cta-company">Company</label>
                  <input
                    id="cta-company"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    className={inputClass}
                    {...a11y("company")}
                  />
                  {fieldError("company")}
                </div>

                <div>
                  <label className={labelClass} htmlFor="cta-role">Role</label>
                  <input
                    id="cta-role"
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    className={inputClass}
                    {...a11y("role")}
                  />
                  {fieldError("role")}
                </div>

                <fieldset>
                  <legend className={labelClass}>Preferred next step</legend>
                  <div className="flex flex-wrap gap-2">
                    {NEXT_STEPS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={form.nextStep === opt}
                        onClick={() => setNextStep(opt)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                          form.nextStep === opt
                            ? "bg-white text-slate border-white"
                            : "bg-white/[0.06] text-slate-100 border-white/15 hover:border-white/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {fieldError("nextStep")}
                </fieldset>

                {showWorkflowFields && (
                  <>
                    <div>
                      <label className={labelClass} htmlFor="cta-workflow">HR workflow or process</label>
                      <input
                        id="cta-workflow"
                        value={form.workflow}
                        onChange={(e) => set("workflow", e.target.value)}
                        placeholder="For example: leave of absence, onboarding, job changes"
                        className={inputClass}
                        {...a11y("workflow")}
                      />
                      {fieldError("workflow")}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="cta-notworking">What is not working today</label>
                      <textarea
                        id="cta-notworking"
                        rows={3}
                        value={form.notWorking}
                        onChange={(e) => set("notWorking", e.target.value)}
                        className={`${inputClass} resize-none`}
                        {...a11y("notWorking")}
                      />
                      {fieldError("notWorking")}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="cta-outcome">What outcome the organization needs</label>
                      <textarea
                        id="cta-outcome"
                        rows={3}
                        value={form.outcome}
                        onChange={(e) => set("outcome", e.target.value)}
                        className={`${inputClass} resize-none`}
                        {...a11y("outcome")}
                      />
                      {fieldError("outcome")}
                    </div>
                  </>
                )}

                {isGeneral && (
                  <div>
                    <label className={labelClass} htmlFor="cta-question">Your question</label>
                    <textarea
                      id="cta-question"
                      rows={4}
                      value={form.question}
                      onChange={(e) => set("question", e.target.value)}
                      className={`${inputClass} resize-none`}
                      {...a11y("question")}
                    />
                    {fieldError("question")}
                  </div>
                )}

                <p className="text-xs text-slate-200/60 leading-relaxed">
                  Please do not submit employee records, payroll information, medical information,
                  candidate data, or other sensitive personal data through this form.
                </p>

                {formError && (
                  <p role="alert" className="text-sm text-red-300">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-slate font-semibold text-sm hover:bg-blue-50 transition-all shadow-[0_18px_50px_-12px_rgba(43,92,230,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Request a Confidential Introduction"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}

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
