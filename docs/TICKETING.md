# Ticketing integration

The static website presents confirmed events and links to the organizer's public checkout. Ticket Tailor, pretix, or Eventbrite handles inventory, payment, confirmation email, and admission tickets. The marketing site does not confirm payments or issue tickets.

## Current state

`dist/data.js` exports `SITE_CONFIG`. English is the default language, with a Bosnian translation. Publicly sourced past listings may appear in the archive; they do not establish future dates, ticket prices, or availability. No future ticket sale is configured. `checkoutHosts` is empty, and public contact/social settings remain `null` until supplied. Site photos are managed in the page markup; `heroImage` remains `null`.

Keep a clear bilingual empty state while there are no upcoming events. Do not add a nonfunctional purchase button, fake availability count, placeholder checkout link, or admission QR code. A past public listing should link to its source and must not be offered for purchase.

## Recommended first checkout

Use **Ticket Tailor with Stripe** and link to its hosted checkout. Buyers choose ticket types and quantities there, enter their details, and pay. Ticket Tailor sends the ticket confirmation and QR code; its check-in app handles admission. Keep quantity selection at checkout so the marketing site does not maintain a separate cart or inventory count.

Ticket Tailor's standard service has no subscription: paid tickets incur a usage fee, with payment-processing charges separately. Check the actual CAD usage rate in the organizer's Billing screen before setting prices. Optional custom checkout domains and removing Ticket Tailor branding have monthly charges; neither is needed to link from this Cloudflare website. Stripe's published standard Canadian domestic-card rate is 2.9% + CA$0.30 per successful transaction; other card/currency cases can cost more. Apple Pay and Google Pay can be enabled in Ticket Tailor's Stripe settings and appear for eligible devices/browsers.

pretix Hosted is an alternative with no monthly fee and a 2.5% fee on the ticket price excluding taxes, capped at EUR 15 per ticket, plus the payment provider's charges. Self-hosted pretix adds server, email, update, backup, and check-in operations. A direct Stripe Payment Link is easy for collecting payment, but does not by itself supply this site's event ticket issuance and check-in workflow. Automated fulfillment needs a backend and verified payment webhooks. For this first launch, a hosted ticket provider is the simpler complete system.

Official references, checked November 2, 2026:

- [Ticket Tailor pricing](https://www.tickettailor.com/pricing) and [usage/optional feature fees](https://help.tickettailor.com/en/articles/6731528-how-much-does-ticket-tailor-cost-and-how-will-i-be-charged).
- [Ticket confirmation and QR email](https://help.tickettailor.com/en/articles/8015343-how-can-i-edit-my-event-confirmation-email) and [Apple Pay / Google Pay setup](https://help.tickettailor.com/en/articles/1668790-how-to-set-up-apple-pay-and-google-pay-for-ticket-sales).
- [Stripe Canadian pricing](https://stripe.com/en-ca/pricing), [Payment Links](https://docs.stripe.com/payment-links), and [payment fulfillment](https://docs.stripe.com/checkout/fulfillment).
- [pretix Hosted pricing](https://pretix.eu/about/en/pricing/).

## Public configuration

| Field | Type and meaning |
| --- | --- |
| `bandName` | Nonempty display name |
| `defaultLocale` | `bs` or `en` |
| `email`, `phone` | Confirmed public contact details, or `null`; email is one plain ASCII mailbox address, with no `mailto:` prefix, query parameters, or recipient list |
| `facebookUrl`, `instagramUrl` | Confirmed public HTTPS profile URLs, or `null` |
| `heroImage` | Image in `assets/`, or a public HTTPS image URL, or `null` |
| `heroImageAlt` | `{ bs, en }`; both descriptions required when a photo is present |
| `checkoutHosts` | Exact approved domain names without schemes, paths, ports, or wildcards |
| `events` | Array of confirmed events or sourced historical listings; `[]` when none are available |

Use a licensed band photo and meaningful descriptions in both languages. Public configuration is downloaded by every visitor. Never put payment keys, bank credentials, purchaser data, order exports, or ticket secrets in it.

## Event schema

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Unique lowercase identifier such as `show-slug`; hyphens allowed |
| `title` | Yes | `{ bs: string, en: string }`, both nonempty; `name` is accepted as an alias when `title` is absent |
| `startsAt` | Yes | Real ISO timestamp with seconds and explicit UTC offset or `Z` |
| `timeZone` | Yes | IANA time zone for the venue; dates display in this zone |
| `venue` | Yes | Confirmed venue name |
| `city` | Yes | Confirmed city |
| `status` | Yes | `announced`, `on_sale`, `sold_out`, `postponed`, or `cancelled` |
| `ticketLabel` | No | Approved display wording as `{ bs, en }`, or `null`; omit an unconfirmed price |
| `description` | No | Bilingual plain text `{ bs, en }` describing this event |
| `agePolicy` | No | Organizer-approved bilingual plain text `{ bs, en }` |
| `refundPolicy` | No | Organizer-approved bilingual plain text `{ bs, en }` |
| `ticketDelivery` | No | Confirmed delivery instructions as bilingual plain text `{ bs, en }` |
| `priceNote` | No | Approved bilingual plain text `{ bs, en }` explaining the displayed price/fees |
| `sourceUrl` | No | Public HTTPS URL for the original event announcement; never a purchase authorization |
| `price` | No | `{ amount: number, currency: 'CAD', includesFees: boolean }`; amount must be finite and nonnegative |
| `checkout` | For `on_sale` | `{ provider: 'ticket_tailor' \| 'pretix' \| 'eventbrite', url: string }` |

Omit optional detail fields when unknown. If supplied, `description`, `agePolicy`, `refundPolicy`, `ticketDelivery`, and `priceNote` require both nonempty language strings; HTML and control characters are rejected. `sourceUrl` and `price` must have the listed types when supplied, rather than `null`. Historical events do not require a price or checkout.

Price metadata is display information, not a quote engine or a guarantee of the final payable total. `includesFees` only records the organizer's assertion about fees; it does not establish tax treatment, ticket variants, or quantities. Render the approved `ticketLabel` when present; otherwise format `price.amount` in CAD alongside the exact `priceNote`. Do not infer or invent tax/fee wording from `includesFees`, and do not call a base price an all-inclusive total. The provider's checkout calculates and displays the actual total.

The checkout URL must use HTTPS, contain no credentials, use the normal HTTPS port, and match one `checkoutHosts` entry exactly. Add the hostname from the real provider-issued public event link, including `www` when present. Do not infer a hostname, allow all subdomains, or use an admin page, API endpoint, another organizer's event, or example/demo event. Host validation does not prove ownership or that the event is live; those are checked before launch.

No sample event belongs in the public configuration. Synthetic examples exist only in the tests.

## Module API

`dist/lib/events.js` exports:

- `validateEvent(event, checkoutHosts = [])`: returns `{ valid, errors, canPurchase }`. `canPurchase` is true only for a valid, future `on_sale` event with a permitted checkout. Empty `checkoutHosts` allows no checkout URL.
- `validateSiteConfig(config)`: returns `{ valid, errors }`, validating events, duplicate IDs, public links, and image alternatives.
- `getEventStatus(event, now = new Date())`: returns an event status, `past`, or `invalid`. A show becomes past at its scheduled start; cancelled/postponed notices retain those statuses. Purchase links should disappear at the scheduled start.
- `formatEventDate(event, locale = 'bs')`: returns the date and time in the venue's time zone, localized for Bosnian or Canadian English; returns an empty string for an invalid date/zone.
- `isSafeHttpsUrl(url, hostsOptional)`: validates public HTTPS links. When a hostname list is supplied, exact membership is required. Without one, it validates the URL structure only.
- `getAvailableEvents(events, filter = 'all', now = new Date())`: returns a new chronological array; `all`, `upcoming`, and `past` are supported. Invalid dates/statuses are excluded. Time-based filtering retains cancelled/postponed notices in their chronological group. Validate the configuration before rendering; this helper does not replace field validation.

Render localized text with text nodes/textContent, not unsanitized HTML. Use `validateEvent(...).canPurchase` for the purchase gate. A static availability label is informational; the checkout provider must enforce actual inventory. Recheck gates when rendering and when activating a purchase link, and do not claim realtime availability. Optional price or source metadata must never enable a purchase.

## Checkout launch checklist

1. Organizer approves date/time, venue, ticket types, capacity, price/fees, age policy, refund terms, and public contact details.
2. The organizer creates/verifies the Ticket Tailor box office and Stripe payout account through their secure setup flows. Configure the real event, capacity, ticket types, currency, fees, policies, and delivery email. Do not send credentials in chat or add them to this repository.
3. Test checkout, confirmation email, ticket access, QR check-in, and the refund workflow. Test the normal card path and eligible mobile wallets. A second use of a ticket must be flagged as already used. Test cancelled and sold-out cases. A free test ticket verifies ticket delivery/check-in but does not test a live card charge.
4. Add the approved exact checkout hostname, event data, and public event URL. Run the validation tests and inspect both languages on a phone.
5. Verify the venue's check-in connectivity/fallback and access for door staff. For self-hosted pretix, also verify HTTPS, backups, email delivery, and updates.

The frontend needs only approved event content and the provider's public event URL. No Stripe secret key, webhook secret, or Ticket Tailor API credential is needed for these checkout links. Until the real event and public checkout URL exist, the site can show its event-detail interface and past archive, but sales remain disabled.

For manual Interac e-Transfer, the ticketing backend must hold the order pending until the organizer verifies the actual bank transaction. A website button, screenshot, or return URL is not payment verification. The marketing site does not need to store banking details.

Start with direct checkout links. A pretix widget can be added later after the event exists and its shop is active: https://docs.pretix.eu/guides/widget/

Self-hosted pretix payment configuration belongs in its backend, not this repository: https://docs.pretix.eu/guides/payment/stripe/
