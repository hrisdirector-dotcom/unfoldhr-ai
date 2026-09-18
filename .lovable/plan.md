# Restore the public website

## Confirmed issue
- `https://www.unfoldhrai.com` returns the correct page shell, but nothing mounts into the page.
- The public browser fails during startup with `supabaseUrl is required`.
- The local preview renders normally, confirming the site UI itself is intact and the failure is limited to missing deployment-time Lovable Cloud connection values.

## Plan
1. Add a small, project-owned Lovable Cloud client wrapper that uses the normal deployment values first and a safe public connection fallback when those values are absent.
2. Point the existing authentication and data consumers at that wrapper without changing their behavior, content, permissions, or routes.
3. Keep the generated connection files untouched.
4. Verify the homepage and key public pages render locally, then publish the corrected version.
5. Re-test both `unfoldhrai.com` and `www.unfoldhrai.com` in a clean browser and confirm the startup error is gone.

## Scope
- No homepage redesign, copy changes, navigation changes, workflow changes, agent changes, or database-policy changes.
- The fallback contains only the public browser connection details; no private credentials are added.
