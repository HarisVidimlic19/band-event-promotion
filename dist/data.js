/** Public content only. Never put payment keys or attendee records here. */
export const SITE_CONFIG = {
  bandName: 'Sto Posto Live Band',
  defaultLocale: 'en',
  email: null,
  phone: null,
  facebookUrl: null,
  instagramUrl: null,
  heroImage: null,
  heroImageAlt: { bs: '', en: '' },
  checkoutHosts: [],
  // Archived public listings. Dates do not imply current membership or ticket availability.
  // Add future events only once the band confirms the details and official checkout.
  events: [
    {
      id: 'hamilton-2026',
      title: { en: 'Bajramsko Sijelo — Hamilton', bs: 'Bajramsko sijelo — Hamilton' },
      startsAt: '2026-03-21T20:00:00-04:00',
      timeZone: 'America/Toronto',
      venue: 'The Columbus Club of Hamilton',
      city: 'Hamilton, ON',
      status: 'announced',
      description: { en: 'A past public listing for Sto Posto Live Band at the Columbus Club of Hamilton. See the original announcement for the event as advertised.', bs: 'Ranija javna najava nastupa Sto Posto Live Banda u Columbus Clubu u Hamiltonu. Detalji su dostupni u izvornoj objavi.' },
      sourceUrl: 'https://www.desavanja.ca/events/bajramsko-sijelo-hamilton-sto-posto-live-band'
    },
    {
      id: 'new-year-2026',
      title: { en: 'New Year’s Eve — Welcome 2026', bs: 'Doček Nove 2026. godine' },
      startsAt: '2025-12-31T19:00:00-05:00',
      timeZone: 'America/Toronto',
      venue: 'Grand Victorian Convention Centre',
      city: 'Mississauga, ON',
      status: 'announced',
      description: { en: 'A past public listing for a New Year celebration with Sto Posto Live Band on December 31, 2025. This is an archive entry, not the upcoming New Year’s Eve event.', bs: 'Ranija javna najava dočeka Nove godine uz Sto Posto Live Band, 31. decembra 2025. Ovo je arhivska objava, a ne najava narednog dočeka.' },
      sourceUrl: 'https://www.desavanja.ca/events/docek-nove-godine-2026-sto-posto-live-band'
    },
    {
      id: 'toronto-2025',
      title: { en: 'Live at Tesla 369', bs: 'Uživo u Tesla 369' },
      startsAt: '2025-04-12T19:00:00-04:00',
      timeZone: 'America/Toronto',
      venue: 'Tesla 369 Bar & Restaurant',
      city: 'Etobicoke, ON',
      status: 'announced',
      description: { en: 'A past public listing featuring Bosanac, Džidža and Sto Posto Live Band. See the original announcement for the advertised lineup.', bs: 'Ranija javna najava nastupa Bosanca, Džidže i Sto Posto Live Banda. Najavljeni program nalazi se u izvornoj objavi.' },
      sourceUrl: 'https://www.desavanja.ca/events/bosanac-dzidza-i-sto-posto-live-band-toronto'
    }
  ]
};
