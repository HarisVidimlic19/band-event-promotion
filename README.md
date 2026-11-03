# Sto Posto Live Band

Professional Bosnian/English band website. Charcoal, ivory and copper identity; responsive layout; original SVG artwork; locally hosted fonts; configurable event links; no subscriptions or runtime dependencies required by this frontend.

## View and edit

- Website source: `dist/` (ready to serve directly).
- Content and confirmed event data: `dist/data.js`.
- Bosnian/English copy and interactions: `dist/app.js`.
- Layout and colour system: `dist/styles.css`.
- Editable promotional artwork: `dist/assets/social-card.svg` (Illustrator/Inkscape compatible; open with Nimbus Sans fonts installed, or substitute your fonts).
- Facebook link preview: `dist/assets/social-card.png`, 1200 × 630.

The typographic artwork is code-authored, AI-assisted vector design, not AI-generated photography. No photos or promotional details from the reference band were reused. It is an interim visual until approved photos of the three Sto Posto members are available.

## Current launch state

This is a working band website with **no active ticket sales**. No events, prices, venue, band contact addresses or member names were invented. `events: []` shows the coming-soon state. Event checkout links only appear for validated, future, on-sale events whose exact host is approved. This frontend never processes payments or issues admission tickets itself.

The enquiry form downloads a text draft to the visitor's device. It does not store or submit enquiries. Supplying a valid band email in `dist/data.js` changes the action to opening a prefilled email; the visitor still sends it in their email app. Form inputs start disabled and are enabled only after the JavaScript handlers initialize, preventing a fallback GET submission of personal data.

## Local preview and checks

Use any static HTTP server pointed at `dist/`, for example `python3 -m http.server 8080 --directory dist`, and open `http://localhost:8080`. Opening `index.html` directly from the filesystem will not load ES modules correctly.

Node 20+ is sufficient for checks. No dependency installation is necessary:

```sh
npm test
npm run check
```

## Before public promotion

1. Supply approved photographs of all three members (ideally separate high-resolution portraits with simple backgrounds), their names, instruments and preferred order. Set `heroImage` and both localized `heroImageAlt` strings once the final image is exported into `dist/assets/`.
2. Supply the band's real contact email, phone and official social URLs. The current configuration deliberately leaves these unset.
3. Confirm the first event's date, venue, ticket prices, age/refund policies and organizer. Connect a live ticket provider using [the ticketing guide](docs/TICKETING.md), then test checkout, confirmation and check-in in that provider.
4. Choose the production domain and audience. The first Sites deployment is owner-private for review. Update the absolute Open Graph image URL in `dist/index.html` if moving to another hostname.
5. Review both languages, including the proposed marketing copy, with the band before publishing publicly.

## Hosting and ownership

For deployment to your own Cloudflare account, use the checked-in `wrangler.jsonc` and [Cloudflare deployment guide](docs/CLOUDFLARE.md). It serves `dist/` as static assets on Workers. Select `feature/sto-posto-website` as the production branch while the website pull request is unmerged; `main` does not yet contain the site. A Cloudflare deployment has not yet been completed or verified.

The entire `dist/` directory can be hosted on the MiniPC behind an HTTPS reverse proxy/tunnel, or on static hosting. It does not require the MiniPC while deployed on Sites. `.openai/hosting.json` preserves the Sites project ID for subsequent updates; keep it unchanged for that Site. The private GitHub repository holds the same source for editing and portability.

Ticketing/payment services have their own fees and operating requirements. A self-hosted pretix backend with manually verified Interac transfers can be connected through a public HTTPS ticket URL later. The static website does not automatically verify bank deposits.

Do not commit credentials, attendee lists, QR ticket secrets, bank records or order exports. Configuration is publicly downloadable when the site is public. Only public band content belongs in `dist/data.js`.

## Fonts and assets

`display.otf` is the unmodified Nimbus Sans Narrow Bold font; `body.otf` is the unmodified Nimbus Sans Regular font from URW Base35. Their full copyright/license notice is included in `dist/assets/FONT-LICENSE.txt`. Font sources: https://github.com/ArtifexSoftware/urw-base35-fonts . Artwork is kept separately from these font programs. The downloaded enquiry text and selected language remain local to the visitor's browser; no advertising trackers or third-party font requests are used.
