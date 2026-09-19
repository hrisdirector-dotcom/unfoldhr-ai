# Release 9 — Final launch closeout (findings and proposed scope)

No code was changed during this review. Everything below is a proposal.

## 1. Pricing page — findings

**Files:** `src/pages/PricingPage.tsx` (the whole page), rendered from `src/pages/Index.tsx` on the `pricing` screen.

**Public?** Yes. It is reachable while signed out, with no gate.

**Linked from?** Not from the main menu or any footer, but it *is* linked publicly: the homepage application block (`src/components/landing/FinalCTA.tsx`, "View pricing →") sends visitors straight to it. It is also linked from the signed-in dashboard and from Decision Support.

**What it displays:** four plans — Free ($0), Growth ($179/mo or $149 billed annually, marked "Most Popular"), Professional ($699 / $599), Enterprise (Custom); a monthly/annual toggle promising 20% off; a nine-row plan comparison table (monthly agent runs, deployed live agents, HRIS/ATS integrations, autonomous actions, multi-agent orchestration, support level, SOC 2/GDPR, dedicated success manager); a note about "Build It For Me / Co-Build / Advisory"; and the closing pair of buttons "Start Free Trial" and "Book a Demo". Plan buttons read "Try Gallery Now", "Start Growth Plan", "Start Professional Plan", "Contact Sales".

**Exact behaviour of "Start Free Trial":** it switches to the homepage and scrolls to the agent gallery section. That is all. No account is created, no trial record is written, no duration, entitlement, expiry, conversion path or billing state exists anywhere in the product — there is no billing system, no subscription or plan data, and no payment provider. It behaves identically signed out and signed in. The only "trial" in the code is a single browser-side flag that limits the daily brief to one generation per browser; it is not connected to this page, is not enforced server-side, and is cleared by clearing browser data. "Start Growth Plan" and "Start Professional Plan" simply open the contact form; no purchase is possible.

**Classification: Misleading / nonfunctional.** The button claims a free trial that does not exist, and the page as a whole advertises seat-free monthly subscriptions, run quotas, deployed-agent limits, integrations and compliance guarantees that the current commercial model (Workflow Redesign Sprint, $7,500 founding client) does not offer and the product does not enforce.

### Proposed correction (smallest truthful option)

Two candidate scopes — the plan assumes **Option A** unless you say otherwise:

- **Option A (recommended, content-only, one file plus one link):** remove the false trial claim and the unsupported subscription page from the public path.
  - `src/pages/PricingPage.tsx` — replace the plan grid, billing toggle and comparison table with a short truthful engagement-and-pricing statement using the existing page shell, typography and spacing: the Workflow Redesign Sprint at $7,500 for founding clients (already published on the homepage), plus "Implementation and ongoing engagement are scoped individually." Closing buttons become "Book a Confidential Introduction" (contact) and "Explore the Workflow Library". No new prices are invented; no plan, quota or compliance claim survives.
  - `src/components/landing/FinalCTA.tsx` line ~358 — leave the link in place pointing at the corrected page.
- **Option B (most minimal):** leave the plan content untouched and only remove the "Start Free Trial" button and the "Start trying agents for free" line. This removes the trial lie but leaves four unsold subscription plans and their feature promises live on a public page, which the spec explicitly warns against.

No pricing value, entitlement, billing, dashboard, authentication or backend behaviour would change in either option.

## 2. Contact page — findings

**File:** `src/pages/ContactPage.tsx` (140 lines). It renders only the form card — no eyebrow, no `h1`, no supporting copy. The only heading in the file is the `h2` "Request sent" in the success state (line 55). `src/pages/Index.tsx` renders it with no wrapper, so the page genuinely has no heading. Release 7's "Bring Us Your Workflow" button lands here.

### Proposed change (content only)

In `src/pages/ContactPage.tsx`, inside the existing returned markup and above the existing form card, add a header block using the page's existing width, typography and spacing:

- eyebrow "Contact UnfoldHR"
- `h1` "Bring us one HR workflow that needs to change"
- supporting line "Tell us where the work is breaking down. We will use the initial conversation to determine the most appropriate next step."

Lines of responsibility: wrap the current `return (` at line 61 in a page container and insert the header before the `<form>`; the success branch at lines 51–59 gets the same header so the page never loses its `h1`. Every field, label, placeholder, validation rule, submission call, storage, notification and email path stays exactly as it is. `src/lib/submitContact.ts` is not touched. No second form, no new questions, no redesign.

## 3. Signed-in verification

**No authorized test account exists.** There are three sign-in accounts on the project and none is a development or test account; an attempt to mint a session for the requesting email failed because no account matches it. I will not request or handle your credentials, so these items are reported as NOT VERIFIED rather than passed.

Owner-operated checklist for you to run with your own account:

1. Sign in through the normal interface; confirm a wrong password is rejected cleanly.
2. Confirm My Dashboard loads.
3. Open paid Decision Support.
4. Confirm saved runs and expected access appear.
5. Refresh each signed-in page and confirm it stays signed in without flicker.
6. Open a protected page while signed out and confirm correct handling.
7. Sign out and confirm protected content is no longer reachable.
8. Repeat on a phone, including the menu.
9. Report any browser error without including personal data.

## Protected scope

Releases 1–8, homepage section order, agents, Global Lifecycle priority, the 20-workflow library, the Leave sample, workflow calculations, authentication, paid Decision Support, entitlements, billing, database schema, backend functions, security policies, stored data, routes, submission logic and email/Formspree behaviour all remain untouched.

## Files proposed for modification

- `src/pages/PricingPage.tsx` (truthfulness correction — pending your choice of Option A or B)
- `src/pages/ContactPage.tsx` (header block only)
