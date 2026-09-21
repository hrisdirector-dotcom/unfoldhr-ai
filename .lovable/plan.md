# Release 11 — Public Routing, Discoverability and SEO (plan only)

Goal: give every public screen its own real web address that can be shared, refreshed, bookmarked and crawled, without redesigning anything or changing agent/workflow behaviour.

## What I confirmed in the current code and on the live domain

- Only four real addresses exist today: `/`, `/privacy`, `/unsubscribe`, and a catch-all "not found". Everything else (Services, Agent Platform, Workflow Library, About, Pricing, Integrations, Contact, all agent demos, sign-in, dashboard, admin, executive deck, snapshot, today's decisions) is one screen swapped by internal state inside `Index.tsx`, pushed into history with no address.
- Workflow detail is held in memory only (`workflowId`), so the flagship Leave of Absence page cannot be linked. Agent detail keeps its id in history state, so it survives Back but not a shared link or refresh.
- Four aliases exist and must keep working: `try-agents` → Global Lifecycle demo, and the four free agent ids mapping to their try-pages. `snapshot` and `executive-snapshot` both render the snapshot screen; the footer links to it, confirming it is public marketing content.
- Hosting fallback works: `https://www.unfoldhrai.com/services` already returns 200 (serving the homepage HTML). The apex domain 302-redirects to `www`. `/og-image.jpg` and `/sitemap.xml` both exist and return 200. No DNS or domain change is needed or proposed.
- `sitemap.xml` lists `/about /agents /contact /pricing /integrations /explainers /executive-deck`. None resolve to distinct content today. `ExplainersPage.tsx` exists in the codebase but nothing links to it.
- `robots.txt` allows all crawlers and has no `Sitemap:` line.
- `index.html` carries one fixed title, description, canonical (`/`) and social card for the whole site.
- Most navigation is `onClick` buttons, not real links, so search engines cannot follow them.

## Proposed address map

Core search landing pages — public, indexed, in the sitemap:

| Address | Screen |
| --- | --- |
| `/` | Homepage |
| `/services` | HR Workflow Redesign Services |
| `/agents` | Agent Platform |
| `/workflows` | Workflow Library catalog |
| `/about` `/pricing` `/integrations` `/contact` | Existing screens |
| `/privacy` | Unchanged, included as a public page |

Shareable but not indexed initially (real addresses, `noindex`, excluded from the sitemap):

- `/workflows/:workflowId` — every workflow detail, e.g. `/workflows/leave-of-absence`
- `/agents/:agentId` — agent detail from the catalog
- `/agents/global-lifecycle`, `/agents/leave-control`, `/agents/compensation-change` — the three Control & Readiness demonstrations
- The four free try-agent pages
- `/executive-snapshot` (with `/snapshot` redirecting to it) — public and reachable from the footer, held back from the sitemap until you have vetted the content

Reachable, never indexed, never in the sitemap: `/unsubscribe` (token and query behaviour untouched), `/login`, `/dashboard`, `/admin`, `/today-decisions`. `/executive-deck` needs data handed over in memory; a direct visit redirects to the dashboard, or to sign-in when signed out — no blank screen and nothing from the deck exposed.

Detail pages and the snapshot get promoted into the sitemap in a later release, once their content and metadata are vetted. Explainers stays unbuilt; the stale sitemap entry is simply removed.

Backward compatibility: the four internal aliases stay. Every in-app call that names a screen resolves to the right address, so nothing breaks.

## Technical approach

1. Keep one shared layout. `Index.tsx` becomes a thin shell that reads the current address instead of local state; screens are not duplicated or rewritten. `navigateTo`, `navigateToAgent`, `navigateToWorkflow` and `goToInquiry` keep their signatures and route by address internally, so calling components need no changes.
2. Register routes in `App.tsx` above the catch-all. `/agents` and `/agents/:id` do not collide in React Router; the three named demo addresses are registered before the generic one.
3. Navigation, footer, catalog cards and other discovery links become real `<a href="/...">` links (React Router `Link`), so search engines can follow them. Buttons that perform an action stay buttons. No full page reloads.
4. Unknown addresses and invalid workflow or agent ids render the Not Found screen with `noindex`. Honest limitation: the host returns HTTP 200 for unknown paths (SPA fallback), so these are soft 404s at the network level. I will check the actual response headers and report what they really are rather than claim a true 404.
5. Anchor navigation becomes `/#our-method` and `/#final-cta`, handled on mount and on hash change instead of the current timer. Inquiry preselection moves to router state held in memory, so nothing personal appears in an address and the preselection survives navigating from Services or Agent Platform.
6. Sign-in, role checks and redirects keep their exact current logic; only the address changes. The dashboard is never turned into a landing page.

## Titles, descriptions and canonicals

Per-route head tags via `react-helmet-async` (one small dependency, added only with your approval), giving each route exactly one title, one description, one canonical and its own social tags, with `noindex` on the pages listed above.

Following Google's JavaScript SEO guidance, the hardcoded homepage canonical is **removed** from `index.html` so a crawler never sees `/` and then a different canonical swapped in afterwards; every route, the homepage included, injects exactly one correct self-referencing canonical. The sitewide social tags stay in `index.html` as the fallback. I will audit the rendered head after navigation to confirm no duplicate or stale tags carry over between routes.

Lovable announced platform-level prerendering for verified crawlers on existing Vite apps, so per-route metadata may well be served to search and social crawlers without any migration. I am not migrating anything. What I cannot do is prove it from here: an ordinary request (curl) receives the plain app HTML because it is not a verified crawler, so the only honest evidence comes from a real crawler or a link-preview debugger after publishing. I will therefore report per-route metadata as correct in the rendered page, and social previews and indexing as **untested until you run a live crawler or debugger check**. No promise of per-page social cards in this release.

## Sitemap and robots

Sitemap contains only the core landing pages listed above. Removed: `/explainers`, `/executive-deck`. No invented "last modified" dates. `robots.txt` gains `Sitemap: https://www.unfoldhrai.com/sitemap.xml` and keeps every existing allow rule unchanged — no new blocking.

## Verification before I report back

Baseline first, then after the change: TypeScript check, lint, the full test suite (88 today, count may rise), production build. Three separate layers of evidence, reported separately:

- **Browser:** direct load and refresh of every address, Back and Forward across them, workflow and agent detail by direct link, unknown ids landing on Not Found, homepage anchors, inquiry preselection from both Services and Agent Platform, mobile navigation, and signed-out visits to dashboard/admin still redirecting.
- **Raw HTTP:** the actual bytes and status headers returned for deep addresses, stated as what they are (SPA fallback HTML, status 200).
- **Verified crawler:** noted as not accessible from here; left explicitly unverified.

No form submissions, no database reads or writes, no publishing, and no change to the staging-versus-published distinction.

Rollback is a straight revert of the changed files; the live site is untouched either way.

## Out of scope

Redesign of any screen, agent or workflow logic, database or form behaviour, domain or DNS changes, publishing, any migration of the app's framework, prerender or SSR dependencies, and any new public screen that does not exist today.

## Defaults applied (for your explicit approval)

1. Executive Snapshot — real address `/executive-snapshot`, kept public and footer-linked, `noindex` and out of the sitemap until vetted.
2. Explainers — stale sitemap entry removed; no new page built.
3. Free try-pages and the three demonstrations — stable shareable addresses, `noindex`, out of the sitemap, content untouched.
4. Contact — stays a dedicated public page at `/contact`, separate from the homepage application form.
5. `/privacy` and `/unsubscribe` — routes and token behaviour untouched; privacy included in the sitemap, unsubscribe never.
