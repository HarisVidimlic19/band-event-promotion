# Validation

- Ten Node tests pass: public config, allowed checkout hosts, purchase status, invalid dates, localized fields, duplicate IDs, mailto header injection, status transitions, event sorting, venue time zones.
- JavaScript syntax checks and asset/anchor/translation-hook checks pass.
- Desktop visual inspection at approximately 1363 px; mobile embedded viewports at 390 px and 320 px (375/305 px content widths with scrollbar), without horizontal document overflow.
- Browser interactions checked: Bosnian/English switching, upcoming/past filter, FAQ expansion, mobile menu opening and closing on navigation, privacy modal opening/closing, successful download of a test enquiry draft with explicit unsent confirmation.
- Initial HTML disables enquiry fields until JavaScript finishes initialization. There is no form POST, server storage or email delivery backend.
- Event link rules are tested with synthetic fixtures only. No live event, payment, real bank transfer, ticket email or venue check-in was tested; these require the organizer's confirmed event and chosen ticket backend.
- The screenshot in `preview.jpg` shows the interim typographic banner, not a photographic composite of the band.
