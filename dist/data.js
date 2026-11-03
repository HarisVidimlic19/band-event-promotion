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
  // Same-name archive listings are withheld: their connection to this band is unconfirmed.
  // Add events only after the band confirms attribution, details and any official checkout.
  events: []
};
