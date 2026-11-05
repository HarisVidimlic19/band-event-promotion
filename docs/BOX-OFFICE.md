# Website box office

The website uses the organiser-supplied **all-events Ticket Tailor widget** for `stopostoliveband`, embedded once in `dist/index.html` under `#shows`. The generated script and its data attributes are preserved. Ticket Tailor owns listings, prices, booking fees, capacity, checkout, confirmation emails and QR tickets.

## Publish future events

1. Create the event and ticket types in the **same Ticket Tailor box office**.
2. Confirm prices/fees, shared event capacity, dates/timezone, venue and policies.
3. Enable the intended live Stripe account for the event.
4. Publish the event and make it visible in the box office.
5. Open the band's website and confirm it appears. No website code edit is needed for ordinary future events.

The widget preserves the supplied search/date/sort options; Ticket Tailor controls when these are displayed. Its colours and layout are managed in Ticket Tailor's widget/box-office design settings. If a different generated snippet is needed, replace the complete widget block and keep the separate fallback link pointing to this box office.

## Checkout and fallback

- The permanent **Open ticket shop** link sits outside the widget and works even when the script is blocked or unavailable.
- Language switching translates the surrounding website. It does not recreate or translate the third-party checkout iframe, so an in-progress checkout is preserved.
- Browser cookie restrictions may cause Ticket Tailor to finish checkout in a new tab. This is supported provider behaviour.
- The site loads third-party Ticket Tailor content; its privacy notice has been updated accordingly.
- Do not add Stripe Products, payment keys, ticket inventories or custom payment forms to this repository.
- The legacy `events` and `checkoutHosts` fields in `dist/data.js` are not used to render this box office.

## Appearance and venue information

The website frames the untouched widget in a cream, dark-green and gold ticket section. The direct Ticket Tailor link remains underneath as a fallback. Internal checkout colours belong to Ticket Tailor and cannot be overridden from this website's stylesheet.

For matching checkout colours, use **Promote → Website embed code → Edit widget colors**. Suggested palette: background `#FFFFFF`, text `#171A15`, primary button `#26301E`, button text `#FFFFFF`, accent `#E7C56A`. Inspect contrast and the preview before saving. If saving produces a different snippet, replace the entire supplied widget block in `dist/index.html`; do not invent query parameters. No paid custom-domain or white-label feature is required for the website layout.

The venue card is explicitly for **New Year's Eve 2027, 31 December 2026**. It shows Oakville Legacy Banquet & Convention Centre at 1173 North Service Rd E, Oakville, ON L6H 1A7, with a responsive Google Maps iframe and a separate directions link. The map URL comes from the venue's [official contact page](https://oakvillelegacy.com/index.php/contact-us/); it uses Google's shared-map embed and needs no API key. Google attribution is retained. The privacy notice describes the map's third-party loading.

The featured date strip and venue card have `data-event-end="2027-01-01T02:00:00-05:00"`; JavaScript hides these specific features after the event ends while leaving the all-events box office available. If the organiser changes the date, venue or end time, update both HTML features and their English/Bosnian translations. This featured content is manually maintained and does not sync from Ticket Tailor. With JavaScript disabled, the clearly dated venue remains visible.

Ticket guidance covers fees/total review, confirmation emails, QR codes, child age bands and event-specific refund policies. Prices, fees, ticket age bands and availability remain in Ticket Tailor to avoid stale duplicated sales information. The FAQ's **Find my tickets** link opens Ticket Tailor's official ticket-retrieval page.

## Domain

The intended public website is **https://stopostoliveband.ca/**. Canonical and Open Graph metadata use that hostname. This metadata change does not create DNS records or attach the domain to Cloudflare.

In the existing Cloudflare Worker, use **Domains → Add domain** (or **Settings → Domains & Routes → Add → Custom Domain**) and select `stopostoliveband.ca`. The domain's Cloudflare zone must be active. Use the existing Worker, not a second hosting project. Add `www` separately only if wanted. Leave `workers.dev` available during the transition.

Merge this revision to `main`, then verify Cloudflare builds that commit. If Git is still disconnected, reconnect the Git integration; a custom domain does not repair deployment triggers. See [CLOUDFLARE.md](CLOUDFLARE.md).

Apple Pay may require additional domain verification depending on the Ticket Tailor domain/widget configuration; follow the provider instructions and test on a supported device before advertising it.

## Registered partnership

Partnership registration does not change this frontend integration. The organiser should align the **live** Stripe business type, legal name, representative/partner information and payout-bank ownership with the registered partnership, using Stripe Support if the business-type field cannot be changed. Do not assume a bank account previously used for an individual or unrelated business remains suitable. No Stripe or bank-account changes are made by this repository.

## Checks

`npm run check` validates the source, referenced assets, translations, one approved widget script and a matching permanent ticket link. `npm test` covers the retained event-validation utilities.

Browser acceptance: event listing loads; event opens adult/child ticket options; EN/BS switches preserve the iframe; narrow layout fits; fallback works without the widget. Inspect checkout only—do not place an order or submit payment as part of routine website verification.

## Official references

- [Ticket Tailor box-office embed](https://help.tickettailor.com/en/articles/950997-how-to-embed-a-box-office-widget-on-your-website)
- [Apple Pay and Google Pay](https://help.tickettailor.com/en/articles/1668790-how-to-set-up-apple-pay-and-google-pay-for-ticket-sales)
- [Cloudflare Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Stripe Canadian business types](https://support.stripe.com/questions/types-of-business-and-structure-guidelines-in-canada)
- [Stripe bank ownership](https://support.stripe.com/questions/verify-your-bank-account-ownership)
