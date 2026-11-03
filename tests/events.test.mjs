import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG } from '../dist/data.js';
import {
  validateEvent, validateSiteConfig, getEventStatus, formatEventDate,
  isSafeHttpsUrl, getAvailableEvents,
} from '../dist/lib/events.js';

// Synthetic fixtures are confined to tests and never shipped as public events.
const now = '2030-06-01T12:00:00Z';
const fixture = (changes = {}) => ({
  id: 'test-event',
  title: { bs: 'Testni događaj', en: 'Test event' },
  startsAt: '2099-06-15T20:00:00-04:00',
  timeZone: 'America/Toronto',
  venue: 'Test venue',
  city: 'Test city',
  status: 'announced',
  ...changes,
});
const checkout = { provider: 'pretix', url: 'https://tickets.example.org/band/show/' };
const hosts = ['tickets.example.org'];

test('public configuration defaults to English and contains no unconfirmed sales or contacts', () => {
  assert.deepEqual(validateSiteConfig(SITE_CONFIG), { valid: true, errors: [] });
  assert.equal(SITE_CONFIG.defaultLocale, 'en');
  assert.equal(SITE_CONFIG.events.some((event) => getEventStatus(event) === 'on_sale'), false);
  assert.deepEqual(SITE_CONFIG.checkoutHosts, []);
  assert.deepEqual(SITE_CONFIG.events, []);
  assert.equal(SITE_CONFIG.facebookUrl, 'https://www.facebook.com/share/1G5UrS1Wd6/');
  for (const key of ['email', 'phone', 'instagramUrl', 'heroImage']) assert.equal(SITE_CONFIG[key], null);
});

test('Ticket Tailor uses the same hostname, status, and time purchase gates', () => {
  const ticketTailorCheckout = { provider: 'ticket_tailor', url: 'https://www.tickettailor.com/events/test-fixture/123/' };
  const approved = ['www.tickettailor.com'];
  const event = fixture({ status: 'on_sale', checkout: ticketTailorCheckout });
  assert.equal(validateEvent(event, approved).canPurchase, true);
  assert.equal(validateEvent(event, []).canPurchase, false);
  assert.equal(validateEvent(event, ['tickettailor.com']).canPurchase, false);
  for (const status of ['announced', 'sold_out', 'cancelled', 'postponed']) {
    assert.equal(validateEvent({ ...event, status }, approved).canPurchase, false, status);
  }
  assert.equal(validateEvent({ ...event, startsAt: '2000-01-01T12:00:00Z' }, approved).canPurchase, false);
  assert.equal(validateEvent({ ...event, checkout: { ...ticketTailorCheckout, url: 'https://www.tickettailor.com.evil.test/events/1' } }, approved).valid, false);
});

test('optional event details require bilingual plain text and safe source links', () => {
  const text = { bs: 'Potvrđena informacija.', en: 'Confirmed information.' };
  for (const field of ['description', 'agePolicy', 'refundPolicy', 'ticketDelivery', 'priceNote']) {
    assert.equal(validateEvent(fixture({ [field]: text }), hosts).valid, true, field);
    for (const value of [null, 'Not localized', [], { en: 'English only' }, { bs: 'Tekst', en: 12 },
      { bs: 'Tekst', en: { html: 'Text' } }, { bs: 'Tekst', en: '<script>alert(1)</script>' },
      { bs: 'Tekst', en: 'Text\u0000hidden' }]) {
      assert.equal(validateEvent(fixture({ [field]: value }), hosts).valid, false, field);
    }
  }
  assert.equal(validateEvent(fixture({ sourceUrl: 'https://www.desavanja.ca/events/public-source' }), []).valid, true);
  for (const sourceUrl of [null, {}, 'javascript:alert(1)', 'http://example.org/event', 'https://user:secret@example.org/event']) {
    assert.equal(validateEvent(fixture({ sourceUrl }), hosts).valid, false);
  }
});

test('CAD price metadata is optional and does not prove a total or authorize a purchase', () => {
  assert.equal(validateEvent(fixture({ startsAt: '2000-01-01T12:00:00Z' }), hosts).valid, true);
  for (const amount of [0, 30, 30.50]) {
    for (const includesFees of [true, false]) {
      const event = fixture({ price: { amount, currency: 'CAD', includesFees } });
      assert.equal(validateEvent(event, hosts).valid, true);
      assert.equal(validateEvent(event, hosts).canPurchase, false);
    }
  }
  const price = { amount: 30, currency: 'CAD', includesFees: false };
  for (const value of [null, [], '30', { ...price, amount: -1 }, { ...price, amount: Infinity },
    { ...price, amount: NaN }, { ...price, amount: '30' }, { ...price, currency: 'USD' },
    { ...price, includesFees: 'true' }, { amount: 30, currency: 'CAD' }]) {
    assert.equal(validateEvent(fixture({ price: value }), hosts).valid, false);
  }
  assert.equal(validateEvent(fixture({ status: 'on_sale', price }), hosts).canPurchase, false);
  assert.equal(validateEvent(fixture({ sourceUrl: checkout.url, price }), hosts).canPurchase, false);
});

test('checkout links require explicit HTTPS hostname approval', () => {
  assert.equal(isSafeHttpsUrl(checkout.url, hosts), true);
  assert.equal(isSafeHttpsUrl('https://TICKETS.EXAMPLE.ORG/band/show/', hosts), true);
  for (const url of [
    'http://tickets.example.org/show',
    'javascript:alert(1)',
    'https://tickets.example.org.evil.test/show',
    'https://evil.test/?next=https://tickets.example.org',
    'https://user:password@tickets.example.org/show',
    'https://tickets.example.org:8443/show',
    ' https://tickets.example.org/show',
    'https://tickets.example.org\\@evil.test/show',
  ]) assert.equal(isSafeHttpsUrl(url, hosts), false, url);
  assert.equal(isSafeHttpsUrl(checkout.url, []), false);
  assert.equal(isSafeHttpsUrl(checkout.url), true);
});

test('only valid future on-sale events permit purchase', () => {
  assert.equal(validateEvent(fixture(), hosts).canPurchase, false);
  assert.equal(validateEvent(fixture({ status: 'on_sale' }), hosts).valid, false);
  assert.equal(validateEvent(fixture({ status: 'on_sale', checkout }), []).valid, false);
  assert.equal(validateEvent(fixture({ status: 'on_sale', checkout }), hosts).canPurchase, true);
  for (const status of ['announced', 'sold_out', 'cancelled', 'postponed']) {
    const result = validateEvent(fixture({ status, checkout }), hosts);
    assert.equal(result.valid, true);
    assert.equal(result.canPurchase, false, status);
  }
  assert.equal(validateEvent(fixture({ status: 'on_sale', checkout, startsAt: '2000-01-01T12:00:00Z' }), hosts).canPurchase, false);
});

test('invalid calendar dates and ambiguous times fail validation', () => {
  for (const startsAt of [
    '2030-02-29T20:00:00-05:00', '2030-04-31T20:00:00-04:00',
    '2030-06-15T20:00:00', '2030-06-15', '2030-06-15T24:00:00Z',
    '2030-06-15T20:00:00+25:00',
  ]) assert.equal(validateEvent(fixture({ startsAt }), hosts).valid, false, startsAt);
  assert.equal(validateEvent(fixture({ startsAt: '2032-02-29T20:00:00-05:00' }), hosts).valid, true);
  assert.equal(validateEvent(fixture({ timeZone: 'Not/AZone' }), hosts).valid, false);
});

test('localized confirmed event fields are required and name alias is supported', () => {
  assert.equal(validateEvent(fixture({ title: { en: 'Test' } }), hosts).valid, false);
  assert.equal(validateEvent(fixture({ venue: '' }), hosts).valid, false);
  assert.equal(validateEvent(fixture({ ticketLabel: { bs: 'Uskoro' } }), hosts).valid, false);
  assert.equal(validateEvent(fixture({ title: undefined, name: { bs: 'Test', en: 'Test' } }), hosts).valid, true);
  assert.equal(validateEvent(fixture({ checkout: { ...checkout, provider: 'unknown' } }), hosts).valid, false);
});

test('configuration catches duplicate IDs, malformed hosts, and missing image alternatives', () => {
  assert.equal(validateSiteConfig({ ...SITE_CONFIG, events: [fixture(), fixture()] }).valid, false);
  for (const host of ['*.example.org', 'https://example.org', 'example.org/path', 'localhost', 'example.org:443']) {
    assert.equal(validateSiteConfig({ ...SITE_CONFIG, checkoutHosts: [host] }).valid, false, host);
  }
  assert.equal(validateSiteConfig({ ...SITE_CONFIG, heroImage: 'assets/band.jpg' }).valid, false);
  assert.equal(validateSiteConfig({ ...SITE_CONFIG, heroImage: 'assets/band.jpg', heroImageAlt: { bs: 'Bend', en: 'Band' } }).valid, true);
  assert.equal(validateSiteConfig({ ...SITE_CONFIG, facebookUrl: 'javascript:alert(1)' }).valid, false);
});

test('public email must be a plain address and cannot inject mailto headers', () => {
  for (const email of ['band@example.org', 'booking+shows@band.example.org', 'first.last@example.org']) {
    assert.equal(validateSiteConfig({ ...SITE_CONFIG, email }).valid, true, email);
  }
  for (const email of [
    'band@example.org?bcc=other%40example.org',
    'band@example.org#fragment',
    'band%0aBcc@example.org',
    'band@example.org&body=unexpected',
    'mailto:band@example.org',
    'band@example.org,other@example.org',
    '.band@example.org',
    'first..last@example.org',
    'band@example.org\r\n',
  ]) assert.equal(validateSiteConfig({ ...SITE_CONFIG, email }).valid, false, email);
});

test('status honors event time and preserves cancellation or postponement notices', () => {
  assert.equal(getEventStatus(fixture({ status: 'on_sale' }), now), 'on_sale');
  const past = fixture({ startsAt: '2029-06-15T20:00:00-04:00' });
  assert.equal(getEventStatus(past, now), 'past');
  assert.equal(getEventStatus({ ...past, status: 'cancelled' }, now), 'cancelled');
  assert.equal(getEventStatus({ ...past, status: 'postponed' }, now), 'postponed');
  assert.equal(getEventStatus(fixture({ startsAt: now }), now), 'past');
  assert.equal(getEventStatus(fixture({ startsAt: 'invalid' }), now), 'invalid');
});

test('event filtering sorts without mutating and excludes invalid data', () => {
  const earlier = fixture({ id: 'earlier', startsAt: '2029-06-15T20:00:00-04:00' });
  const later = fixture({ id: 'later' });
  const source = [later, fixture({ startsAt: 'not-a-date' }), earlier];
  assert.deepEqual(getAvailableEvents(source, 'all', now).map((event) => event.id), ['earlier', 'later']);
  assert.deepEqual(getAvailableEvents(source, 'upcoming', now).map((event) => event.id), ['later']);
  assert.deepEqual(getAvailableEvents(source, 'past', now).map((event) => event.id), ['earlier']);
  assert.equal(source[0], later);
  assert.throws(() => getAvailableEvents(source, 'unknown', now), RangeError);
});

test('date formatting uses venue timezone, not browser timezone', () => {
  const event = fixture({ startsAt: '2030-06-16T01:00:00Z' });
  const english = formatEventDate(event, 'en');
  const bosnian = formatEventDate(event, 'bs');
  assert.match(english, /June 15, 2030/);
  assert.match(english, /9:00|21:00/);
  assert.equal(bosnian, '15.06.2030. u 21:00');
  assert.notEqual(english, bosnian);
  assert.equal(formatEventDate(fixture({ startsAt: 'invalid' }), 'en'), '');
});
