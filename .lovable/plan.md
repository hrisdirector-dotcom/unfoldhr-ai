## Why the Lovable logo shows up in Google

Google's result icon comes from `/favicon.ico`. Right now `public/favicon.ico` is still the default Lovable icon shipped with new projects, so that's what crawlers cached. The social-preview image (`og:image` / `twitter:image`) in `index.html` also points at a Lovable storage URL, which is what LinkedIn, Slack, WhatsApp etc. show.

## Fix

1. **Generate an UnfoldHRAI favicon** from the existing brand mark (the two-dot logo used in `UnfoldMark.tsx` / `src/assets/unfoldhr-logo.png`) at 512×512, on the slate `#1C2330` background with the electric-blue `#2B5CE6` accent dot. Save as:
   - `public/favicon.png` (overwrite the 547-byte placeholder)
   - `public/favicon.ico` (overwrite the Lovable default — this is the one Google reads)
   - `public/apple-touch-icon.png` (180×180, for iOS home screen)

2. **Generate a branded social-preview image** (1200×630) using the UnfoldHRAI logo, brand colors, and the tagline already on the homepage. Save as `public/og-image.jpg`.

3. **Update `index.html`**:
   - Add `<link rel="icon" type="image/x-icon" href="/favicon.ico">` and `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` alongside the existing PNG link.
   - Replace both `og:image` and `twitter:image` URLs with `https://www.unfoldhrai.com/og-image.jpg`.
   - Change `twitter:site` from `@Lovable` to a neutral value (or remove it if no UnfoldHRAI handle exists — please confirm).
   - Add `<meta property="og:url" content="https://www.unfoldhrai.com/" />` and `<link rel="canonical" href="https://www.unfoldhrai.com/" />` so Google consolidates the right domain.

## What will and won't change immediately

- Browser tab icon updates as soon as the change is published and the user hard-refreshes.
- Social previews (LinkedIn/Slack/etc.) update once their cache refreshes — most have a "scrape again" debugger.
- **Google's search-result icon can take 1–4 weeks** to refresh even after the new favicon is live; that's Google-side, nothing more we can do besides waiting or requesting re-indexing in Search Console.

## One thing to confirm

- Twitter handle: remove `@Lovable` entirely, or replace with an UnfoldHRAI handle if you have one?
