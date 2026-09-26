# Add Password Reset to Client Workspace Sign-In

## Goal
Let approved users (including the admin, eric.weaver@unfoldhrai.com) reset a forgotten password by email, since passwords cannot be retrieved.

## Changes

### 1. Sign-in page (`src/pages/AuthPage.tsx`)
- Add a low-emphasis "Forgot password?" link below the sign-in button.
- Clicking it switches the card to a reset-request state: email field + "Send reset link" button.
- On submit, call `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" })`.
- Show a neutral confirmation ("If an account exists for that email, a reset link is on its way") — never reveal whether the email is registered.
- Link back to the sign-in form.

### 2. New reset-password page (`src/pages/ResetPasswordPage.tsx`)
- Public route `/reset-password`, noindex.
- Reads the recovery session from the URL (Supabase delivers `type=recovery` in the hash).
- Form: new password + confirm password, calls `supabase.auth.updateUser({ password })` (no `current_password` — recovery sessions are exempt).
- On success: brief confirmation, then navigate to the workspace (dashboard).
- If the link is invalid/expired: show a message with a link back to `/login`.

### 3. Routing (`src/lib/routes.ts`, `src/App.tsx` / `src/pages/Index.tsx`)
- Register `/reset-password` as a public, noindex route.
- Add page metadata entry; not added to sitemap.

### 4. Auth hook (`src/hooks/useAuth.ts`)
- Add `resetPassword(email)` and `updatePassword(newPassword)` helpers wrapping the Supabase calls.

## Verification
- Scoped lint on touched files, TypeScript, full test suite (expect 147/147 plus any new tests), production build.
- Browser QA (signed out): sign-in page shows "Forgot password?", reset-request form renders and shows confirmation, `/reset-password` route loads, invalid-link state shows gracefully.
- Revert any unrelated `previewAuthStorage.ts` platform drift before final diff.
- No publish, no deploy, no emails sent during testing (the actual reset email send is not triggered in QA).

## Out of scope
- No backend auth setting changes, no database changes, no new account provisioning.
- Email delivery uses the existing auth email infrastructure already configured for the project.
