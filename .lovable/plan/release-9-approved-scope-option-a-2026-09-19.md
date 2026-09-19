# Release 9 — Approved scope (Option A)

Two files change. No code has been changed yet.

## 1. Pricing page — `src/pages/PricingPage.tsx`

Rewrite the page body only. Keep the existing page shell, container widths, fonts, colours, spacing, reveal animations and responsive behaviour, and keep the existing `setPage` entry point so every existing link into this page keeps working.

**Removed from the rendered page entirely** (not hidden): the Free / Growth / Professional / Enterprise plans, the monthly-annual toggle, all subscription prices, the 20% discount, "Most Popular", the comparison table, run quotas, deployed-agent limits, integration entitlements, autonomous-action and multi-agent claims, support levels, SOC 2 / GDPR plan claims, dedicated success manager, and the buttons "Start Free Trial", "Start Growth Plan", "Start Professional Plan", "Try Gallery Now". The billing-toggle state and the plan/comparison data structures are deleted with them.

**New content, exactly as supplied:**
- Eyebrow "Pricing and Engagements"; headline "Start with the workflow, not a software plan"; the two supporting paragraphs.
- Three engagement cards in order — Explore / "Explore HR Work Reimagined" / Public access / "Explore the Workflow Library"; Redesign / "Agentic HR Workflow Redesign Sprint" / $7,500 founding-client engagement / "Available to the first three organizations." / "Book a Confidential Introduction"; Implement / "Pilot and Implementation Advisory" / Scoped individually / "Discuss an Implementation" — with the approved body copy and no price, duration, deliverable or outcome for Implement.
- A restrained closing note: "Existing authorized users can access Decision Support through My Dashboard." No subscription, trial, plan or purchase framing.

**Behaviour:** Explore calls the app's ordinary navigation to the Workflows screen, which already clears any remembered workflow, so it opens the catalog, never Leave. Both commercial buttons open the existing Contact page directly — no delayed scrolling, modal, calendar or second form. No new route.

## 2. Contact page — `src/pages/ContactPage.tsx`

Add a header block above the existing form card, inside the page's current width, typography, spacing and colours: eyebrow "Contact UnfoldHR", `h1` "Bring us one HR workflow that needs to change", and the supporting line "Tell us where the work is breaking down. We will use the initial conversation to determine the most appropriate next step."

The same header wraps the success state, so the page carries exactly one `h1` before and after submission. Every field, label, placeholder and validation rule, the shared submit helper, storage, notification, confirmation email, and the success / failure / unconfirmed handling stay exactly as they are. No second form, no new fields.

## 3. Signed-in verification

Stays owner-operated. No authentication change, no credentials requested.

## Verification after implementation

Source and rendered search for "Start Free Trial", "Start Growth Plan", "Start Professional Plan", "Most Popular", $179, $149, $699, $599, 20% — reporting any remaining occurrence and whether it renders; $7,500 appears exactly once on the page; "ten business days" reads correctly; Explore opens the catalog; both commercial buttons open Contact; the Decision Support note points to My Dashboard; Contact has exactly one `h1` before and after a successful submission and unchanged fields; desktop, tablet and mobile; heading order, contrast, keyboard and focus, wrapping, clipping, no sideways scrolling; no new browser errors; typecheck, production build, lint and the full test suite; a final confirmation that no route, schema, migration, backend function, security policy, authentication, entitlement, billing, stored data, email or notification behaviour changed.

## Files modified

- `src/pages/PricingPage.tsx`
- `src/pages/ContactPage.tsx`
