# Release 5 — Sprint application and contact flow

Turn the homepage contact block into the real application form for the Workflow Redesign Sprint, using the submission path that already exists. One form, no new backend, no database changes.

## What exists today (inspected)

- The homepage engagement block is `src/components/landing/FinalCTA.tsx`, anchor `final-cta`, headline "Not seeing the right agent for your system?".
- Its current fields are Work email (required), Company & role (optional), workflow question (optional) — all placeholder-only, no labels.
- **It does not actually submit anywhere.** It shows a success toast on submit and saves nothing. This is the main defect Release 5 fixes.
- The real, working submission path is on the Contact page: it calls the existing `submit-contact` function, which saves a record and sends the sender a confirmation email, and it also posts a notification to the existing Formspree inbox.
- Saved record fields: request type, contact name (required), email (required), company, module, message (required), status.
- CTAs pointing at `final-cta`: Release 1 hero "Book a Workflow Redesign Sprint", Release 4 "Book a Confidential Introduction", and the interactive agent section. All keep working unchanged.

## Storage without schema changes

| Form field | Stored as |
| --- | --- |
| Name | contact name |
| Work email | email |
| Company | company |
| Role | first line of message, labelled `Role:` |
| HR workflow or process | message, labelled `HR workflow or process:` |
| What is not working today | message, labelled `What is not working today:` |
| What outcome the organization needs | message, labelled `Outcome needed:` |
| Preferred next step | stored in the existing choice field, and repeated in the message as `Preferred next step:` |

Every label is written with its submitted value; nothing is dropped, nothing is stored empty. No migration, no new columns, no new function.

Name is required because the saved record requires a contact name — you confirmed adding a visible required Name field rather than inventing one.

## The form

Inside the existing dark card, above the fields: eyebrow "Start the Conversation", heading "Bring us one HR workflow that needs to change", and the supporting line about where the work is breaking down. The existing section headline and surrounding links stay as they are.

Fields, all required, all with visible labels: Name, Work email, Company, Role, HR workflow or process, What is not working today, What outcome the organization needs, Preferred next step (Confidential introduction / Workflow Redesign Sprint / Executive briefing / General question).

Submit button: "Request a Confidential Introduction" — disabled with a submitting state so repeated clicks cannot double-submit. Privacy line directly above it: "Please do not submit employee records, payroll information, medical information, candidate data, or other sensitive personal data through this form."

Success (only after the submission is confirmed): "Request received. We will review the information and respond within two business days." On failure: a plain error message, entered values kept, retry allowed, no backend detail and nothing logged to the console. The form clears only on confirmed success.

## Files

1. `src/components/landing/FinalCTA.tsx` — rewrite of the form inside the existing section shell (anchor, position, styling, links preserved).
2. `src/pages/HomePage.tsx` — only if the unused toast prop needs tidying; otherwise untouched.

Nothing else changes: hero, business-problem, methodology, sprint-offer sections, navigation, agents, workflow library, auth, dashboard, routes, schema, policies, and the existing notification destination all stay exactly as they are.

## Verification

Submit a real complete request through the live path and confirm the stored record contains every entered value with its label; test each Preferred next step option including General question; test required fields, an invalid email, and rapid repeat clicks; test a failure and confirm values survive it; confirm no form values in the console; confirm all hero and sprint CTAs reach this one form; check logged-out and logged-in, desktop, tablet and mobile, labels, error associations, keyboard and focus, wrapping and horizontal scroll; run typecheck, build and the test suite; then report every file changed and the final field-to-storage mapping.
