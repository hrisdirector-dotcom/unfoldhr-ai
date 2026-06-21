Fix logo clarity on the Agents page.

The Agents page uses a dark slate hero gradient (same visual language as the homepage and Global Lifecycle Agent page), but the navigation logo currently renders in dark `text-foreground` against that dark background because the page is missing from the `DARK_HERO_PAGES` set.

Single-line fix:
- Add `"agents"` to `DARK_HERO_PAGES` in `src/components/UnfoldNav.tsx` so the logo and nav text switch to white/light mode on the dark hero, matching the homepage and Global Lifecycle Agent behavior.