/** Public content only. Never put payment keys or attendee records here. */
export const SITE_CONFIG = {
  bandName: 'Sto Posto Live Band',
  defaultLocale: 'en',
  email: null,
  phone: null,
  // Official link supplied by the user; preserve it without guessing a canonical profile.
  facebookUrl: 'https://www.facebook.com/share/1G5UrS1Wd6/',
  instagramUrl: null,
  heroImage: null,
  heroImageAlt: { bs: '', en: '' },
  checkoutHosts: [],
  // Legacy local-event fields are retained for validation/backward compatibility.
  // The live box-office widget in index.html owns listings, prices and availability.
  // Publish future events in Ticket Tailor; do not duplicate them in this array.
  events: []
};

