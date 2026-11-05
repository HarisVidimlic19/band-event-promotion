# Validation

## Ticket Tailor box-office integration — November 4, 2026

- Generated all-events snippet preserved, including CDN origin, referral tag and widget settings.
- Browser loaded the live Nova Godina 2027 listing and opened adult, child and free-under-five ticket options. No ticket quantities, orders or payments were submitted.
- Bosnian language switch preserved the same iframe ID and active event checkout.
- 390px frame (375px content viewport with scrollbar) rendered without horizontal overflow.
- A script-free copy retained the persistent direct ticket-shop link and provider fallback.
- Console inspection found no site application errors; browser-extension metadata messages were unrelated to this site.
- Temporary QA pages removed before final checks. Existing 13 unit tests cover retained event helpers; widget acceptance was checked in the browser.
- Cloudflare deployment, custom-domain DNS/certificate and live Stripe payments/payouts were not verified by these checks.

Earlier validation notes below describe the pre-widget website.

Checked November 2, 2026 (America/Toronto), against the redesigned static site.

- `npm run check`: JavaScript syntax, public configuration, local assets, anchor targets, duplicate element IDs, translation/alt hooks, initial language and temporary-fixture exclusion.
- `npm test`: 13 passing Node tests covering event dates and time zones, English default, archived-only configuration, purchase status/time/hostname gates, Ticket Tailor support, optional policy/price metadata and contact URL injection restrictions.
- Desktop browser: English initial render, all six displayed photo instances loaded, no horizontal page overflow, English/Bosnian switch, upcoming/archive filters, original source links, event modal and deep link, photo lightbox, FAQ and privacy dialog.
- Mobile-width iframe checks at 390 and 320 px: no horizontal overflow in English or Bosnian; mobile menu opens and closes after navigation. These are browser iframe viewport checks, not physical-phone tests.
- A temporary, clearly labeled synthetic future event verified the on-sale UI: approved price wording, policies and checkout destination. Its checkout link was inspected, not followed; no payment or external ticket order was created. Closing restored focus to the event button. An invalid event hash closed the prior dialog.
- Archived public events exposed source links with no purchase button.
- A browser with incomplete Bosnian locale data initially displayed placeholder month names. The date presentation now uses explicit Bosnian month abbreviations and a numeric Bosnian date/time format; the regression is covered by the date-format test.
- All three website photo files are byte-for-byte copies of the supplied originals. Only CSS changes the visible crop.
- Browser console output contained unrelated extension metadata errors; no application error was observed.
- Full-page screenshot capture timed out. The viewport preview in `docs/preview.jpg` succeeded; hero, ticket section and mobile composition were inspected separately.

Temporary browser QA pages/scripts were removed before final checks and packaging. The site check rejects files prefixed `qa-` in the public directory.

## Facebook correction follow-up

The user supplied the band’s Facebook link and rejected the earlier candidate. The exact supplied link is configured; all unverified same-name archive entries were removed, and archive navigation is hidden while no historical events are confirmed. The original redesign checks above describe the previous revision; the current public configuration contains no events.

## New Year announcement and launch guides

- Added the user-confirmed New Year celebration welcoming 2027 in English and Bosnian. English reads “Welcome 2027” to avoid implying December 31, 2027; the planning worksheet explains December 31, 2026.
- Desktop and 390/320 px iframe checks confirm the announcement, correct Facebook update link and closed-sales wording. No horizontal overflow was measured in either language. No venue, time, price or checkout URL was invented.
- `npm run check` and all 13 existing tests pass after the changes. No payment account or live event has been connected.
- Added an owner setup guide, an event-details worksheet and an Illustrator poster guide. The separate poster kit uses unchanged original photo bytes inside editable SVG clipping paths, not regenerated faces.

## Limits

No live event checkout, payment account, inventory, email-ticket delivery, QR admission, refunds, or contact email is configured or end-to-end tested. The Facebook destination is user-supplied, but Facebook’s page content could not be independently retrieved. The default site still accepts no money. Hosted ticketing setup and a real event link are required before opening sales.

The screenshot is from the local preview. A successful Sites deployment is verified by its native deployment result; this does not verify deployment to the owner's independent Cloudflare account.


## Ticket styling and venue update — 5 November 2026

- Existing generated Ticket Tailor block confirmed byte-for-byte unchanged.
- Desktop live box office loads; Nova Godina 2027 opens ticket selection within the iframe. No quantities selected, orders submitted or payments made.
- Published ticket names observed: General Admission, Child - ages 6 - 12, Child - ages 5 and under. Prices and fees remain provider-owned.
- Google Maps renders the Oakville Legacy marker; address and external directions link remain available outside the iframe.
- 390px and 320px outer viewport fixtures: document client/scroll widths matched at 375/375 and 305/305, with no horizontal page overflow. The 390px fixture's ticket-selector iframe measured 309/309. These are responsive layout checks, not physical-device tests.
- Corrected the featured-date strip's mobile layout after visual QA.
- EN → BS preserves the same Ticket Tailor iframe ID and translates the venue/help text; restored English for preview.
- A script-free fixture retains both the vendor fallback and permanent ticket-shop link.
- An expired-date fixture hides both New Year's Eve features while retaining the live box office.
- Temporary QA fixture files removed before publication.
- Existing PR Cloudflare preview previously reported a build failure. Local checks are separate from Cloudflare deployment status.
