# Ticketing integration

The static website presents confirmed events and links to the organizer's public checkout. pretix or Eventbrite handles inventory, payment, confirmation email, and admission tickets. The marketing site does not confirm payments or issue tickets.

## Current state

`dist/data.js` exports `SITE_CONFIG`. Its `events` and `checkoutHosts` arrays are empty. Contact details, social profiles, and the band photo are `null` until supplied. This is intentional: no event dates, ticket prices, contact addresses, or live sales have been invented.

Keep the bilingual coming-soon message while `events` is empty. Do not add a nonfunctional purchase button, fake availability count, placeholder checkout link, or admission QR code.

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
| `events` | Array of confirmed events; `[]` when none are announced |

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
| `checkout` | For `on_sale` | `{ provider: 'pretix' \| 'eventbrite', url: string }` |

The checkout URL must use HTTPS, contain no credentials, use the normal HTTPS port, and match one `checkoutHosts` entry exactly. Add the actual self-hosted pretix hostname when it exists. Do not use an admin page, API endpoint, or example/demo event as a checkout link. Host validation does not prove ownership or that the event is live; those are checked before launch.

No sample event belongs in the public configuration. Synthetic examples exist only in the tests.

## Module API

`dist/lib/events.js` exports:

- `validateEvent(event, checkoutHosts = [])`: returns `{ valid, errors, canPurchase }`. `canPurchase` is true only for a valid, future `on_sale` event with a permitted checkout. Empty `checkoutHosts` allows no checkout URL.
- `validateSiteConfig(config)`: returns `{ valid, errors }`, validating events, duplicate IDs, public links, and image alternatives.
- `getEventStatus(event, now = new Date())`: returns an event status, `past`, or `invalid`. A show becomes past at its scheduled start; cancelled/postponed notices retain those statuses. Purchase links should disappear at the scheduled start.
- `formatEventDate(event, locale = 'bs')`: returns the date and time in the venue's time zone, localized for Bosnian or Canadian English; returns an empty string for an invalid date/zone.
- `isSafeHttpsUrl(url, hostsOptional)`: validates public HTTPS links. When a hostname list is supplied, exact membership is required. Without one, it validates the URL structure only.
- `getAvailableEvents(events, filter = 'all', now = new Date())`: returns a new chronological array; `all`, `upcoming`, and `past` are supported. Invalid dates/statuses are excluded. Time-based filtering retains cancelled/postponed notices in their chronological group. Validate the configuration before rendering; this helper does not replace field validation.

Render localized text with text nodes/textContent, not unsanitized HTML. Use `validateEvent(...).canPurchase` for the purchase gate. A static availability label is informational; the checkout provider must enforce actual inventory. Recheck gates when rendering and do not claim realtime availability.

## Checkout launch checklist

1. Organizer approves date/time, venue, ticket types, capacity, price/fees, age policy, refund terms, and public contact details.
2. Configure a real event and the organizer's verified payout/payment account in pretix or Eventbrite.
3. Test checkout, confirmation email, ticket access, and QR check-in. A second use of a ticket must be rejected. Test cancelled and sold-out cases.
4. Add the approved exact checkout hostname, event data, and public event URL. Run the validation tests and inspect both languages on a phone.
5. For self-hosted pretix, verify HTTPS, backups, email delivery, updates, and the venue's check-in fallback.

For manual Interac e-Transfer, the ticketing backend must hold the order pending until the organizer verifies the actual bank transaction. A website button, screenshot, or return URL is not payment verification. The marketing site does not need to store banking details.

Start with direct checkout links. A pretix widget can be added later after the event exists and its shop is active: https://docs.pretix.eu/guides/widget/

Self-hosted pretix payment configuration belongs in its backend, not this repository: https://docs.pretix.eu/guides/payment/stripe/
