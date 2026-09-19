# Release 5 (revised) — Sprint application and contact flow

One homepage form, real submission, and a genuine general-contact path.

## How submission works today (inspected)

- `submit-contact` is a single server-side function: it saves the record **and** triggers the confirmation email inside that one call. The email failure is caught and ignored — the record stays saved.
- Formspree is called **by the browser**, on the Contact page, after `submit-contact` returns successfully. It is not part of the server function.
- Returns: successful save → `{ success: true, id }`; save failure → HTTP 500 `{ error: "Failed to record submission" }`; confirmation-email failure after a successful save → still `{ success: true }`; Formspree failure → happens in the browser afterwards and does not affect the saved record.
- There is **no shared submission helper** today; the logic is inline in the Contact page. This release extracts it so both forms use one path.

## Files to modify

1. `src/lib/submitContact.ts` — **new** shared helper: builds the request, calls `submit-contact` exactly once, then (only on confirmed save) posts the Formspree notification. Returns `saved` / `failed` / `unknown`.
2. `src/pages/ContactPage.tsx` — switched to the shared helper; no change to its fields, copy, or behaviour.
3. `src/components/landing/FinalCTA.tsx` — the form inside the existing card is rebuilt; section shell, `final-cta` anchor, position, headline and the links below stay as they are.

No backend, function contract, schema, policy, notification recipient, or email provider changes.

## The form

Above the fields: eyebrow "Start the Conversation", heading "Bring us one HR workflow that needs to change", and the supporting line. The existing section headline stays.

Always visible and required: Name, Work email, Company, Role, Preferred next step (Confidential introduction / Workflow Redesign Sprint / Executive briefing / General question).

- Next step is Confidential introduction, Workflow Redesign Sprint or Executive briefing → also show and require: HR workflow or process, What is not working today, What outcome the organization needs.
- Next step is General question → those three are hidden, removed from validation, their errors cleared, and their values never submitted. One required multiline field "Your question" appears instead.
- Switching between options keeps Name, Work email, Company, Role and Preferred next step intact.

Every field has a visible label; required fields marked. Submit button "Request a Confidential Introduction", disabled while pending so repeat clicks cannot double-submit. Privacy line directly above it: "Please do not submit employee records, payroll information, medical information, candidate data, or other sensitive personal data through this form."

## Field-to-storage mapping (no schema change)

| Field | Stored as |
| --- | --- |
| Name | contact name |
| Work email | email |
| Company | company |
| Preferred next step | the existing choice field, and repeated in the message |
| Role, workflow answers / question | message, labelled |

Sprint message body:

```text
Role: [value]
HR workflow or process:
[value]
What is not working today:
[value]
Outcome needed:
[value]
Preferred next step:
[value]
```

General question message body:

```text
Role: [value]
Preferred next step:
General question
General question:
[value]
```

No label is ever written with an empty value, and nothing is discarded.

## Submission order and outcomes

1. Validate in the browser (required fields for the current mode, email format).
2. Call `submit-contact` once. No automatic retry.
3. Only if it confirms the record was saved, post the Formspree notification.

- **Saved** → success message "Request received. We will review the information and respond within two business days."; form cleared once. A failed Formspree or confirmation email is treated as a notification issue only — no resubmission prompt, nothing logged to the console.
- **Not saved** → accessible error message, all entered values preserved, manual retry allowed, no success state.
- **Unknown** (network dropped, no confirmation received) → neutral message that the submission could not be confirmed, values preserved, no automatic retry. This is an existing limitation of the current function contract and will be noted in the final report rather than changed here.

No backend detail, raw error, or form value is written to the console.

## Verification

Submit a real sprint request and a real General question through the live path, and confirm each stored record contains exactly the mapped values in the documented format; confirm the three workflow fields are absent from a General question record and that stale values never leak after switching options; test each of the four options; test required-field validation per mode, an invalid email, and rapid repeat clicks; test a forced failure and confirm values survive with no success shown; confirm no form values in the console; confirm the hero and sprint CTAs both reach this one form; check logged-out and logged-in, desktop, tablet and mobile, labels, error associations, keyboard and focus, wrapping and horizontal scroll; run typecheck, build and the test suite; report every file changed, the final mapping, and the test results.
