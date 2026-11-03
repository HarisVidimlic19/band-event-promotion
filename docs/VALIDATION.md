# Validation

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

## Limits

No live event checkout, payment account, inventory, email-ticket delivery, QR admission, refunds, contact email or official Facebook profile is configured or end-to-end tested. The default site still accepts no money. Hosted ticketing setup and a real event link are required before opening sales.

The screenshot is from the local preview. A successful Sites deployment is verified by its native deployment result; this does not verify deployment to the owner's independent Cloudflare account.
