# Sto Posto Live Band

An English-first, Bosnian/English band website with band portraits, an AI-assisted group composite, a charcoal and warm-gold palette, responsive navigation and an embedded Ticket Tailor box office for current and future events. Static HTML, CSS and JavaScript; no runtime dependencies or monthly software subscription required by this frontend.

## View and edit

- Website source: `dist/`, ready to serve.
- Contacts and default language: `dist/data.js`.
- Live events, ticket types, prices and availability: manage in Ticket Tailor.
- Embedded box office and permanent fallback link: `dist/index.html`.
- Translations, photo dialogs and interactions: `dist/app.js`.
- Layout: `dist/styles.css`.
- Band imagery: `dist/assets/band/`; individual portraits and responsive group imagery are used on the page, with the earlier supplied photos retained.
- Official logo: `dist/assets/branding/`; the full red-and-cream vector logo appears beside the band introduction. A silhouette-only emblem is used in navigation, the ticket panel, footer and browser tab so tiny lettering is not squeezed into an icon. These are derivatives of the user's supplied logo, traced into paths without generative AI.
- Research and photo provenance: [docs/RESEARCH.md](docs/RESEARCH.md).
- Current box-office integration and future events: [docs/BOX-OFFICE.md](docs/BOX-OFFICE.md).
- Earlier ticketing architecture notes: [docs/TICKETING.md](docs/TICKETING.md).
- Organizer setup: [docs/TICKET-TAILOR-SETUP.md](docs/TICKET-TAILOR-SETUP.md).
- Remaining event details: [docs/EVENT-WORKSHEET.md](docs/EVENT-WORKSHEET.md).

The current gallery uses web-optimized versions of the three individual portraits supplied in `Pics_for_website.zip`. Their original editing history has not been independently verified. The hero is a new AI-assisted promotional group composite made from those portraits; it is not a photograph of an actual group performance. The layout preserves the complete group composition and instruments instead of cropping faces to fit the hero. Individual portraits open at full size, and their earlier photographic versions remain in `dist/assets/band/`. Member names have not been inferred. The Illustrator banner is deferred; `social-card.svg` / `social-card.png` remain the earlier interim sharing graphic.

## Current state

English loads by default. A visitor can explicitly choose Bosnian and retain that choice in their browser. The new preference key does not import the old site's automatically saved Bosnian default. Both initial HTML and JavaScript default to English.

The band's Facebook link is the exact URL supplied by the user: https://www.facebook.com/share/1G5UrS1Wd6/ . Its page contents and canonical destination could not be independently retrieved. The previously proposed Facebook page and November 20 event were rejected by the user and are excluded. Attribution of the three same-name archive listings has also been withdrawn; `events` is empty until the band confirms its own events. The correction and source trail are recorded in [docs/RESEARCH.md](docs/RESEARCH.md).

The organiser-supplied Ticket Tailor box-office widget now appears under **Shows & tickets**. Publishing visible events in the same box office updates the listing without editing this website. A permanent **Open ticket shop** link stays available if the widget is blocked. Ticket Tailor handles prices, availability, checkout, confirmation and admission tickets; no payment backend or Stripe keys are needed here.

English remains the default, with Bosnian surrounding content available. Switching languages does not rebuild the widget or interrupt its checkout. The old locally maintained event UI is retired; its data-validation helpers remain for compatibility.

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
- The intended public domain is **https://stopostoliveband.ca/**. Canonical/Open Graph metadata use it. Attach it to the existing Cloudflare Worker; registration and metadata alone do not configure DNS or deployment.

The website can also be served on the MiniPC behind HTTPS. Hosted ticket links do not require a MiniPC backend. No Cloudflare deployment is verified by this repository's configuration alone.

## Before opening sales

Confirm the public organiser contact, event details, shared capacity, price/fees, age and refund policies. Test the actual Ticket Tailor checkout and door scanning. Partnership registration also requires reviewing the live Stripe legal entity and bank-account ownership; see [the current box-office guide](docs/BOX-OFFICE.md).

Never commit credentials, attendee lists, ticket secrets, bank records or order exports. `dist/data.js` is public to every visitor. Ticketing and payment providers have their own fees; the free static website does not remove card-processing or ticket-service charges.

## Fonts

The locally hosted Nimbus Sans Narrow Bold and Nimbus Sans Regular fonts are unmodified URW Base35 files. Their copyright/license notice is in `dist/assets/FONT-LICENSE.txt`; upstream: https://github.com/ArtifexSoftware/urw-base35-fonts . Fonts are hosted locally. The ticket widget loads third-party Ticket Tailor content and is covered by the updated privacy notice.

