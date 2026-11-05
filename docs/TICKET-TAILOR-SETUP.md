# Sto Posto: Ticket Tailor + Stripe setup

> **Current integration:** the website now embeds the supplied all-events Ticket Tailor box office. Manage future events in Ticket Tailor. See [BOX-OFFICE.md](BOX-OFFICE.md) for the current workflow. The original setup/local-event instructions below are historical and do not describe the active website.

Researched November 2, 2026 (America/Toronto), from official Ticket Tailor and Stripe documentation. This is a setup guide, not confirmation that accounts, an event, or live payments have been configured.

## Recommended arrangement

Keep the Cloudflare website as the band's home. A show's **Buy tickets** button opens that show's Ticket Tailor checkout. Buyers choose ticket types and quantity there; Stripe processes payment; Ticket Tailor handles the order, ticket email and admission QR codes. No payment keys or buyer records belong in the website repository.

Start with Ticket Tailor's own checkout hostname, ordinary card payment, optional Apple Pay/Google Pay, and general admission if that matches the actual event. A custom checkout domain, embedded widget, reserved seating and paid extras are unnecessary for the initial setup.

## 1. Create the organizer's box office

1. Open [Ticket Tailor](https://www.tickettailor.com/) and choose **Get started**. The organizer creates their own account and completes the service's signup and verification prompts.
2. Name the box office **Sto Posto Live Band**, if the band approves that public trading name. Use a band-controlled organizer email. Choose Canada and CAD wherever the account asks for the actual country and billing currency.
3. In **Box office Settings**, review the public name, contact information, branding and default timezone. Use the venue's actual timezone for each event; do not assume all Canadian dates use Toronto time.
4. Keep the included Ticket Tailor branding and hostname. Confirm the actual usage rate under **Settings → Billing** before buying credits or enabling optional subscriptions.

The account belongs to the person signing in; the box office is the band's event shop. Other organizers can later have separate team access. If Ticket Tailor requests ID/selfie verification, the owner completes it directly through the provider's secure flow. That verification is separate from Stripe's payment-account verification. [Box office explanation](https://help.tickettailor.com/en/articles/13141014-what-is-a-box-office) · [Verification](https://help.tickettailor.com/en/articles/10028459-box-office-verification-faq-s)

## 2. Connect Stripe securely

1. In Ticket Tailor, open **Box office Settings → Payment systems**.
2. Under **Online payments (powered by Stripe)**, select **Enable online payments**.
3. On Stripe, sign into the intended existing account or create the organizer's account. Choose the actual Canadian business/individual structure; follow Stripe's requests for identity, business and payout-bank details.
4. The owner completes credentials, identity documents and bank details directly with Stripe. Do not put them in chat, GitHub or the public frontend.
5. On returning to Ticket Tailor, review the connected account and default payment-method choice. For each event, verify **Edit event and tickets → Event settings → Payment settings → Customer payment method → Stripe**.

Connecting an existing Stripe account requires its owner or administrator. A box office can connect to one Stripe account. Stripe handles account approval and payouts; inspect any outstanding dashboard requirements before opening sales. Merely seeing a connected account is not a completed payment test. [Connection steps](https://help.tickettailor.com/en/articles/950956-how-to-use-stripe-for-payment-processing) · [Account setup and verification](https://help.tickettailor.com/en/articles/950014-how-do-i-set-up-a-stripe-account)

## 3. Prepare the event without inventing details

The band has confirmed a New Year celebration welcoming 2027. The venue, start time, capacity, prices and policies are still unconfirmed. New Year’s Eve welcoming 2027 is December 31, 2026; use the actual confirmed start time on that date when creating the event. Do not copy another performer's event, reuse an archived date, guess a venue or set a token price simply to fill required fields.

Once the organizer has real event information, use **Events → Add new event**. Enter the name, date/time, timezone, venue/address and description; add confirmed ticket types, quantities/capacity and prices. Use **Save event**, leaving the status **Draft**. The current setup page groups settings into Event info, Tickets, Add-ons and extras, Event page, and Event settings. Preview and complete its publication checklist before choosing **Publish event**. [Event creation](https://help.tickettailor.com/en/articles/15804203-how-to-create-your-first-event-with-ticket-tailor)

The documentation does not establish that a draft can be saved without every required date/location/ticket field. If the live form requires missing facts, finish the box-office/payment setup and keep the event specification in notes until those facts are confirmed. Do not substitute fictional public event data.

For ticket currency, open **Edit event and tickets → Event settings → Currency** (within Payment settings in the newer layout) and select **CAD**. Billing currency and the event's selling currency are separate. A published event must return to Draft before changing currency. [Currency instructions](https://help.tickettailor.com/en/articles/950004-how-do-i-edit-the-currency-for-my-event) · [CAD support](https://help.tickettailor.com/en/articles/9071904-what-currencies-can-i-accept)

**Draft, hidden and payment sandbox are different.** Under Event settings, hiding an event removes it from listings/search; a separate password option restricts purchase access. A hidden published event can still sell tickets to someone with access. Keep draft links out of the band's public site and social posts. [Visibility controls](https://help.tickettailor.com/en/articles/950006-how-do-i-make-my-event-private)

## 4. Keep checkout short and enable wallets

Use **Settings → Checkout form**, or the event's **Checkout form → Event specific checkout form**. Ticket Tailor's default buyer questions are name and email; email confirmation is enabled by default. Phone/address are hidden unless enabled, and SMS reminders make phone compulsory. Keep email confirmation for reliable ticket delivery. Add individual attendee names or other questions only when the event needs them. Payment providers may still request payment/billing information. [Checkout form](https://help.tickettailor.com/en/articles/950989-how-to-edit-your-checkout-form)

No buyer account is needed on the band's website. The documented Ticket Tailor flow is a simple buyer-details checkout; verify the actual event in a logged-out browser before advertising an unconditional “no account needed” claim. Stripe Link is an optional accelerated-payment feature, configurable in Stripe settings, rather than a band membership system.

To enable wallets: **Settings → Payment systems → Stripe three-dot menu → Settings → Apple Pay and Google Pay for convenient checkout → Save**. Wallets only appear for eligible buyer devices/browsers. A custom Ticket Tailor domain or embedded widget adds Apple Pay domain-verification steps; direct links to the standard hosted checkout avoid those custom-domain steps. Test ordinary card checkout as well as wallets. [Wallet setup](https://help.tickettailor.com/en/articles/1668790-how-to-set-up-apple-pay-and-google-pay-for-ticket-sales)

## 5. Ticket delivery and door scanning

Under **Settings → Email templates → Standard → Event confirmation email → Edit**, retain the ticket/QR elements and add approved entry instructions. Select PDF attachment if wanted. An individual event can override this through **Event confirmation → Event specific confirmation**. Ticket Tailor automatically sends the event confirmation to the buyer; a buyer purchasing several tickets forwards the relevant tickets to companions. Order confirmation is a separate summary. [Email configuration](https://help.tickettailor.com/en/articles/8015343-how-can-i-edit-my-event-confirmation-email)

Use the free [Ticket Tailor Check-in app](https://www.tickettailor.com/free-checkin-app). Set up door-team users, choose the correct event and download its doorlist before opening doors. A successful scan is green; a repeat scan is flagged as already checked in. Check-in devices need connectivity to synchronize with one another. Offline scanning requires a previously downloaded doorlist; separate offline devices cannot share new check-ins until online, so do not promise immediate duplicate prevention across disconnected doors. [Scanning](https://help.tickettailor.com/en/articles/5151698-how-to-check-in-your-attendees-with-the-check-in-app-at-your-event) · [Synchronization](https://help.tickettailor.com/en/articles/9330194-when-does-my-check-in-app-sync)

## 6. Test in two stages

**First: no-money draft checkout.** On the saved event's summary, use **Preview and share → Draft link**. Create a free test ticket or apply a 100% discount and verify that the final order total is zero before completing checkout. Check the email, ticket details and mobile layout. Draft orders are marked as test orders and do not incur Ticket Tailor ticket fees. **A paid checkout on a draft event charges real money.** No official Ticket Tailor documentation reviewed confirms a Stripe test-mode switch or support for Stripe test card numbers; do not assume these work. [Current draft/testing instructions](https://help.tickettailor.com/en/articles/4066222-how-can-i-share-a-draft-event)

**Second: admission and payment checks.** Current direct documentation says draft events do not appear in the check-in app, so draft tickets cannot test scanning. Test scanning after publishing the confirmed event, using an admin-only free ticket, or with a separate clearly labeled published internal test event explicitly chosen by the organizer. Remove/hide test ticket types before opening real sales. A published free reserved-seat test still incurs a seating usage charge. [Free test ticket workflow](https://help.tickettailor.com/en/articles/10425891-how-can-i-test-my-new-event) · [Seating charges](https://help.tickettailor.com/en/articles/4096561-what-are-the-fees-for-using-seating-charts)

A free order does not verify card authorization, wallet payment or bank payout. If the organizer chooses a small real-payment test, treat it as a real charge with possible unrecovered fees. Refund through **Ticket Tailor Orders → open order → Cancel order → select refund amount → Refund via Stripe**, then complete cancellation. Cancellation by itself does not refund; a refund made only in Stripe does not update Ticket Tailor tickets/orders. Verify both systems. [Refund procedure](https://help.tickettailor.com/en/articles/950960-how-to-cancel-or-refund-an-order)

## 7. Costs to confirm before publishing

| Cost | Current public reference |
| --- | --- |
| Standard Ticket Tailor service | No required monthly subscription; usage charge per paid ticket |
| Canadian ticket usage fee | Confirm the current CAD pay-as-you-go or prepaid rate under Settings → Billing; no credits have been purchased |
| Reserved seating | One extra usage per seat, in addition to paid-ticket usage |
| Stripe domestic Canadian card | 2.9% + C$0.30 per successful transaction, separate from Ticket Tailor; international/currency cases can cost more |
| Custom checkout domain | Optional C$10/month |
| Remove Ticket Tailor branding | Optional C$69/month, includes custom domain; usage charges remain separate |

Prepaid credits can reduce usage costs but need an upfront purchase. Leave paid add-ons and credit auto-renewal off unless intentionally chosen. Taxes apply where relevant. Use approved all-in pricing/fee wording on the website; its static price label is not a payment quote or tax calculation. [Ticket Tailor pricing](https://www.tickettailor.com/pricing) · [Billing/add-ons](https://help.tickettailor.com/en/articles/6731528-how-much-does-ticket-tailor-cost-and-how-will-i-be-charged) · [PAYG/seating table](https://help.tickettailor.com/en/articles/4096561-what-are-the-fees-for-using-seating-charts) · [Stripe Canada](https://stripe.com/en-ca/pricing)

## 8. Website implementation

- The bilingual New Year coming-soon announcement and official Facebook follow link are implemented.
- Ticket Tailor provider support, confirmed-event details, bilingual policy/price text, exact HTTPS checkout-host allowlisting and purchase gates are already part of the static architecture.
- Use the organizer worksheet in `docs/EVENT-WORKSHEET.md` to collect the public details. Existing checkout-link tests validate the hostname, date and sale-status gates.
- Keep quantity and ticket-type selection in Ticket Tailor so there is one inventory/cart system.
- Keep purchase links absent until the confirmed future event is published, correctly configured and verified. Do not publish draft-preview links, admin links, discount/access tokens or example URLs.
- After setup, the organizer supplies the real public event URL and approved public content. The frontend needs no Stripe secret key, webhook secret or Ticket Tailor API key for a hosted link.

## Information still needed to open sales

| Item | Required confirmation |
| --- | --- |
| Organizer | Account owner, payout recipient and public support contact |
| Event | Title, actual date/time/timezone, venue and address |
| Tickets | General admission vs assigned seats, types, prices, capacity and sales window |
| Buyer terms | Fee/tax display, age policy, refund terms and ticket-delivery instructions |
| Integration | Published Ticket Tailor event URL; successful checks of checkout, delivery and door scanning |


