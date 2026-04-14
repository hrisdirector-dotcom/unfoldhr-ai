
Goal: investigate `useAuth` for hangs and outline the safest fix path for the blank-screen risk.

What I found
- `src/pages/Index.tsx` blocks the entire app on `if (loading) return Loading…`.
- In `src/hooks/useAuth.ts`, `loading` only flips to `false` inside:
  - the success path of `supabase.auth.getSession()`
  - the success path of `supabase.rpc("has_role", ...)`
- There is no error/finally protection around either async branch.

Why this can hang
1. If `getSession()` rejects or stalls, `loading` never becomes `false`, so `Index` can stay on the full-screen loading state indefinitely.
2. If a session exists but `has_role` never resolves, `loading` also never becomes `false`.
3. `AuthPage` creates a second independent `useAuth()` instance. That means auth/role state is duplicated and can race:
   - `Index` owns the real app-gating `loading`
   - `AuthPage` owns a separate `isAdmin`
   - the login page currently uses a `setTimeout(500)` workaround, which is a smell and can misread admin state.
4. `InteractiveAgentSection` also creates another `useAuth()` instance, multiplying auth subscriptions and role RPC calls.

Likely root issue
- The biggest hang risk is not Vite security headers.
- It is the app-wide dependency on `useAuth.loading`, combined with missing failure handling in `useAuth`.
- The current pattern is also weaker than the recommended auth-ready flow because the hook does not explicitly separate:
  - “session restore complete”
  - “admin role check complete”

Implementation plan
1. Harden `useAuth`
- Register `onAuthStateChange` first, then restore session.
- Add explicit `authReady`/`loading` finalization with `try/catch/finally`.
- Ensure `loading` is cleared even if:
  - `getSession` fails
  - `has_role` fails
  - role lookup times out or returns an error
- Default `isAdmin` to `false` on any role-check failure instead of blocking render.

2. Split readiness concerns
- Replace the single ambiguous `loading` flag with clearer state:
  - `authReady`: session restoration finished
  - `roleLoading` or derived admin-check status
- Let the app shell render once auth is ready, even if role lookup is still pending.
- Only gate admin-only UI on `isAdmin`, not the whole app.

3. Remove duplicate hook instances
- Lift auth state into a shared provider/context or pass auth state down from `Index`.
- Update `AuthPage` to stop calling `useAuth()` separately; it should consume shared auth actions/state.
- Update `InteractiveAgentSection` to use shared auth state too.

4. Fix login flow race
- Remove the `setTimeout(500)` in `AuthPage`.
- After sign-in/sign-up, rely on shared auth state updates instead of delayed manual navigation.
- Navigate to dashboard when the authenticated user actually exists.

5. Protect data hooks from pre-auth execution
- Review hooks like `useSavedRuns` and gate queries until auth is ready and user exists.
- This matches the recommended “auth ready” pattern and avoids RLS/null-session edge cases.

Files to update
- `src/hooks/useAuth.ts`
- `src/pages/Index.tsx`
- `src/pages/AuthPage.tsx`
- `src/components/landing/InteractiveAgentSection.tsx`
- likely a new shared auth context/provider file if implemented cleanly

Expected outcome
- No more app-wide indefinite loading if backend auth is slow/fails.
- Home page should render even when role lookup is unavailable.
- Login/admin behavior becomes deterministic instead of timeout-based.
- Fewer duplicate subscriptions and fewer auth-related race conditions.

Technical notes
- Current `has_role` is a security-definer DB function, which is fine for admin checks.
- The issue is client-side state orchestration, not the role function itself.
- The console warnings about refs/Framer Motion are real but separate from the auth hang risk; they should be cleaned up after the auth flow is stabilized.
