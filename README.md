# Sto Posto Live Band

An English-first, Bosnian/English band website with real performance photography, a charcoal and warm-gold palette, responsive navigation, event details, and a direct route to hosted ticket checkout. Static HTML, CSS and JavaScript; no runtime dependencies or monthly software subscription required by this frontend.

## View and edit

- Website source: `dist/`, ready to serve.
- Confirmed event data, contacts and default language: `dist/data.js`.
- Translations, event dialogs and interactions: `dist/app.js`.
- Layout: `dist/styles.css`.
- Original supplied performance photos: `dist/assets/band/`.
- Research and photo provenance: [docs/RESEARCH.md](docs/RESEARCH.md).
- Ticketing integration and launch steps: [docs/TICKETING.md](docs/TICKETING.md).

The three supplied photos are unaltered copies. CSS controls their display crop; no synthetic people, AI photo generation or face changes are used. Member names have not been inferred. The Illustrator banner is deferred; existing `social-card.svg` / `social-card.png` are the earlier interim graphic and can be replaced in that phase. Preserve the photos as source material for the banner.

## Current state

English loads by default. A visitor can explicitly choose Bosnian and retain that choice in their browser. The new preference key does not import the old site's automatically saved Bosnian default. Both initial HTML and JavaScript default to English.

The archive contains three sourced **past event listings**, each with its original announcement. No future event, ticket price, payment account, band contact address or official Facebook URL has been invented. The possible November 20 event and Facebook candidate are recorded only in the research notes until confirmed.

There are **no active ticket sales**. Event detail dialogs support venue-local dates, approved prices and fee wording, age restrictions, refund terms, ticket delivery and a direct checkout button. Purchase links appear only for a valid future `on_sale` event on an exact approved hostname, and are rechecked when clicked. Ticket Tailor, pretix and Eventbrite checkout links are supported. The provider owns quantity selection, inventory, payment, confirmation and admission tickets.

The previous enquiry-download form has been removed. Contact information renders once confirmed public contacts are configured. No message is claimed to have been sent, and this site collects no payment details.

## Local preview and checks

Serve `dist/` with a static HTTP server, for example `python3 -m http.server 8080 --directory dist`. Open `http://localhost:8080`; loading ES modules from a local `file:` URL is unsupported.

Node 20+ is enough for checks; there are no app dependencies to install:

```sh
npm run check
npm test
```

Temporary browser QA fixtures must never be published. The site check rejects `qa-*` files in `dist/`.

## Hosting

- The existing private Sites preview is https://sto-posto-live-band.hvidimlic1234.chatgpt.site . Keep its `.openai/hosting.json` identity unchanged.
- To host on your Cloudflare account, use `wrangler.jsonc` and [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md). Only `dist/` is public website content.
- The original website PR has been merged to GitHub `main`. Subsequent revisions are reviewed in their own PRs. Use `main` for a GitHub-connected Cloudflare production project, after merging the intended revision.
- When the actual production hostname is known, update the absolute Open Graph image URL in `dist/index.html`. It currently uses the private Sites origin. Replace it before promoting the public Cloudflare URL on Facebook.

The website can also be served on the MiniPC behind HTTPS. Hosted ticket links do not require a MiniPC backend. No Cloudflare deployment is verified by this repository's configuration alone.

## Before opening sales

Confirm the band's official social URL and booking contact. Approve the first event's date/time, venue, ticket types, capacity, price/fees, age policy, refund terms and delivery instructions. Create the ticketing account and payment connection, test payment and QR admission, then supply the actual public event checkout link. Follow [the ticketing guide](docs/TICKETING.md).

Never commit credentials, attendee lists, ticket secrets, bank records or order exports. `dist/data.js` is public to every visitor. Ticketing and payment providers have their own fees; the free static website does not remove card-processing or ticket-service charges.

## Fonts

The locally hosted Nimbus Sans Narrow Bold and Nimbus Sans Regular fonts are unmodified URW Base35 files. Their copyright/license notice is in `dist/assets/FONT-LICENSE.txt`; upstream: https://github.com/ArtifexSoftware/urw-base35-fonts . No third-party fonts or advertising trackers are loaded.
