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

test('initial configuration contains no invented contact, image, or event data', () => {
  assert.deepEqual(validateSiteConfig(SITE_CONFIG), { valid: true, errors: [] });
  assert.deepEqual(SITE_CONFIG.events, []);
  assert.deepEqual(SITE_CONFIG.checkoutHosts, []);
  for (const key of ['email', 'phone', 'facebookUrl', 'instagramUrl', 'heroImage']) assert.equal(SITE_CONFIG[key], null);
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
  assert.match(bosnian, /15/);
  assert.notEqual(english, bosnian);
  assert.equal(formatEventDate(fixture({ startsAt: 'invalid' }), 'en'), '');
});
