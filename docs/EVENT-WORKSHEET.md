# Sto Posto — New Year 2027 ticket launch worksheet

Use this to collect approved public event details before configuring a checkout. This file belongs outside `dist/`; do not put bank details, login credentials or attendee data here.

Already confirmed: Sto Posto Live Band, New Year celebration welcoming 2027, more information coming soon; three supplied original musician photos; official Facebook share link https://www.facebook.com/share/1G5UrS1Wd6/ .

The evening welcoming 2027 is December 31, **2026**. Exact event start/end time and venue remain to be supplied.

| Decision | Organizer-approved value |
| --- | --- |
| Public organizer/support email | To be supplied |
| Venue name and full address | To be supplied |
| Start, doors and end times; venue timezone | To be supplied |
| Ticket types and quantities/capacity | To be supplied |
| CAD price per type | To be supplied |
| Fees included or added; applicable tax handling | To be supplied |
| Age restrictions / child-ticket policy | To be supplied |
| Refund/cancellation policy | To be supplied |
| General admission or assigned seating | To be supplied |
| Sale start and end | To be supplied |
| Ticket email and door-entry instructions | To be supplied |
| Published public Ticket Tailor event URL | To be supplied after testing |

## Connect the finished event

Supply the actual public URL and approved values above. Add the verified exact checkout hostname to `SITE_CONFIG.checkoutHosts`; create an event with `checkout.provider: 'ticket_tailor'`, bilingual content, actual timestamp with timezone offset and `status: 'on_sale'` only after the event is published and tested. Do not use a draft preview, administrator URL, password/discount link, or another organizer’s event.

Run `npm run check` and `npm test`, then check English/Bosnian on desktop and phone. Confirm the visible price matches checkout, the final total is clear, email tickets arrive, the first QR scan admits the ticket, and a repeated scan is rejected. Free checkout tests do not verify Stripe payment or bank payout. Draft tickets cannot test scanning; follow the current testing instructions in TICKET-TAILOR-SETUP.md.

The website never needs a Stripe secret key or a Ticket Tailor API key for this hosted-checkout arrangement.
