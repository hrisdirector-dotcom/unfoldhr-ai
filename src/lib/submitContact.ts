import { supabase } from "@/lib/cloudClient";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgopojll";

export type ContactSubmissionResult = "saved" | "failed" | "unknown";

export interface ContactSubmissionInput {
  /** Contact name — required by the stored record. */
  name: string;
  email: string;
  company?: string;
  /** Stored in the existing choice field (AI journey / preferred next step). */
  aiJourney: string;
  /** Serialized application body. */
  message: string;
  /** Extra labelled values forwarded to the notification inbox only. */
  notificationFields?: Record<string, string>;
}

/**
 * Single authoritative submission path.
 *
 * 1. Calls the `submit-contact` function exactly once (it saves the record and
 *    triggers the confirmation email server-side). No automatic retry.
 * 2. Only when the save is confirmed, posts the secondary notification.
 *
 * A secondary notification failure never invalidates the saved record.
 * Nothing about the payload or the raw error is written to the console.
 */
export async function submitContactRequest(
  input: ContactSubmissionInput,
): Promise<ContactSubmissionResult> {
  let saved = false;

  try {
    const { data, error } = await supabase.functions.invoke("submit-contact", {
      body: {
        name: input.name,
        email: input.email,
        company: input.company ?? "",
        aiJourney: input.aiJourney,
        message: input.message,
      },
    });

    if (error) {
      // A non-2xx response means the server answered and the record was not saved.
      // Anything else (network interruption) leaves the save state unknown.
      const status = (error as { context?: { status?: number } })?.context?.status;
      return typeof status === "number" ? "failed" : "unknown";
    }

    saved = Boolean((data as { success?: boolean } | null)?.success);
  } catch {
    return "unknown";
  }

  if (!saved) return "failed";

  // Secondary notification — never affects the authoritative result.
  try {
    const payload = new FormData();
    payload.append("name", input.name);
    payload.append("email", input.email);
    if (input.company) payload.append("company", input.company);
    payload.append("ai_journey", input.aiJourney);
    payload.append("message", input.message);
    for (const [key, value] of Object.entries(input.notificationFields ?? {})) {
      if (value) payload.append(key, value);
    }
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    });
  } catch {
    // Notification-only failure: the application is already stored.
  }

  return "saved";
}
