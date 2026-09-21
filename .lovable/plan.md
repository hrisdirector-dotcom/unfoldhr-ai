# Release 11 — Public Routing, Discoverability and SEO (plan only)

Goal: give every public screen its own real web address that can be shared, refreshed, bookmarked and crawled, without redesigning anything or changing agent/workflow behaviour.

## What I confirmed in the current code and on the live domain

- Only four real addresses exist today: `/`, `/privacy`, `/unsubscribe`, and a catch-all "not found". Everything else (Services, Agent Platform, Workflow Library, About, Pricing, Integrations, Contact, all agent demos, sign-in, dashboard, admin, executive deck, snapshot, today's decisions) is one screen swapped by internal state inside `Index.tsx`, pushed into history with no address.
- Workflow detail is held in memory only (`workflowId`), so the flagship Leave of Absence page cannot be linked. Agent detail keeps its id in history state, so it survives Back but not a shared link or refresh.
- Four aliases exist and must keep working: `try-agents` → Global Lifecycle demo, and the four free agent ids mapping to their try-pages. `snapshot` and `executive-snapshot` both render the snapshot screen.
- Hosting fallback works: `https://www.unfoldhrai.com/services` already returns 200 (it serves the homepage HTML). The apex domain 302-redirects to `www`. `/og-image.jpg` and `/sitemap.xml` both exist and return 200. No DNS or domain change is needed or proposed.
- `sitemap.xml` lists `/about /agents /contact /pricing /integrations /explainers /executive-deck`. None resolve to distinct content today. `ExplainersPage.tsx` exists in the codebase but is not reachable from anywhere in the app.
- `robots.txt` allows all crawlers and has no `Sitemap:` line.
- `index.html` carries one fixed title, description, canonical and social card for the whole site.
- The project is a plain Vite single-page app. There is no server rendering and no prerendering plugin.

## Proposed address map

Public, indexable:

| Address | Screen |
| --- | --- |
| `/` | Homepage |
| `/services` | HR Workflow Redesign Services |
| `/agents` | Agent Platform |
| `/agents/:agentId` | Agent detail (catalog agents) |
| `/agents/global-lifecycle` `/agents/leave-control` `/agents/compensation-change` | The three Control & Readiness demonstrations |
| `/workflows` | Workflow Library catalog |
| `/workflows/:workflowId` | Workflow detail, e.g. `/workflows/leave-of-absence` |
| `/about` `/pricing` `/integrations` `/contact` | Existing screens |
| `/privacy` | Unchanged |

Kept working but not indexed (`noindex`): `/unsubscribe` (query token behaviour untouched), `/login`, `/dashboard`, `/admin`, `/today-decisions`, `/executive-deck` (needs data handed over in memory — direct visits redirect to the dashboard, never a blank screen), and the free try-agent pages if you prefer them unlisted.

Open decisions are in Questions below: the executive snapshot and the explainers screen.

Backward compatibility: the four internal aliases stay. Any old in-app call that names a screen still resolves to the right address, so no link in the app breaks. `/snapshot` redirects to `/executive-snapshot` if the snapshot goes public.

## Technical approach

1. Keep one shared layout. `Index.tsx` becomes a thin shell that reads the current address instead of local state; screens are not duplicated or rewritten. `navigateTo`, `navigateToAgent`, `navigateToWorkflow` and `goToInquiry` keep their exact signatures and internally route by address, so no calling component changes.
2. Register the routes in `App.tsx` above the catch-all. `/agents` and `/agents/:id` do not collide in React Router; specific demo addresses are registered before the generic one.
3. Unknown workflow or agent ids render the real Not Found screen, not an empty page.
4. Anchor navigation becomes `/#our-method` and `/#final-cta` handled on mount and on hash change, replacing the current timer. Inquiry preselection moves to router state (in memory, not the address) so nothing personal appears in a link, and it survives navigating from Services or Agent Platform.
5. Sign-in, role checks and redirects keep their current logic; only the address changes.
6. Internal navigation uses router links with no full page reload; Back and Forward restore the screen, the selected detail and scroll position.

## Search and social previews — honest limits

Lovable's classic stack serves one static HTML file for every address. Search engines that run JavaScript (Google) will see per-page titles and descriptions if we add them with a head manager (`react-helmet-async`). Social preview crawlers (LinkedIn, Slack, WhatsApp, X) do **not** run JavaScript and will keep showing the homepage card for every link, whatever we do in the app.

So Release 11 will deliver, and I will only claim:

- Distinct, correct titles, descriptions and canonical addresses per route for JavaScript-capable crawlers and for real users.
- A correct sitemap and robots file.
- Working, shareable, refreshable addresses.

It will **not** deliver and I will not claim: per-page social share cards, or verified "independently indexed" pages. Two options for that, neither started without your approval:

- **A (deferred):** accept homepage social cards for now; re-check indexing after the site is published and crawled.
- **B (separate release):** move the site to Lovable's server-rendered template, which produces real per-page HTML. That is a migration, not a patch, and out of scope here.

I will not add a prerender or SSR dependency in this release.

## Sitemap and robots

New sitemap contains only real 200 pages: `/`, `/services`, `/agents`, `/workflows`, `/about`, `/pricing`, `/integrations`, `/contact`, plus `/privacy` (low priority) and the flagship `/workflows/leave-of-absence`. Removed: `/explainers`, `/executive-deck`. No dated "last modified" values will be invented. `robots.txt` gains `Sitemap: https://www.unfoldhrai.com/sitemap.xml` and keeps every existing allow rule unchanged.

## Verification before I report back

Baseline first, then after the change: TypeScript check, lint, the full test suite (88 today, count may rise), production build. In the browser: direct load and refresh of every public address, Back and Forward across them, workflow detail and agent detail by direct link, unknown ids landing on Not Found, the homepage anchors, inquiry preselection from both Services and Agent Platform, mobile navigation, and that signed-out visits to dashboard/admin still redirect. I will inspect the HTML actually delivered for a deep address, not just the browser view, and report exactly what it contains. No form submissions, no database reads or writes, no publishing.

Rollback is a straight revert of the changed files; the live site is untouched either way.

## Out of scope

Redesign of any screen, agent or workflow logic, database or form behaviour, domain or DNS changes, publishing, server rendering, and any new public screen that does not exist today.

## Questions (product decisions only)

1. **Executive snapshot** — is it public marketing content? If yes I give it `/executive-snapshot` and list it; if no, it stays reachable but unindexed.
2. **Explainers** — the screen exists in the code but nothing links to it. Delete from the sitemap only, or bring it back as a real public page at `/explainers`?
3. **Free agent try-pages** (workforce planning, listening, performance, US workforce complexity) — public addresses that can be shared and indexed, or reachable-but-unlisted like the demos?
4. **Contact** — should `/contact` stay its own page, or redirect to the homepage form at `/#final-cta`, which is where all the CTAs now point?
