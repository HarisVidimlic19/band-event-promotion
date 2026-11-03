/** Small, dependency-free validation and presentation helpers for public events. */
const LOCALES = ['bs', 'en'];
const EVENT_STATUSES = ['announced', 'on_sale', 'sold_out', 'postponed', 'cancelled'];
const CHECKOUT_PROVIDERS = ['pretix', 'eventbrite', 'ticket_tailor'];
const OPTIONAL_EVENT_TEXT = ['description', 'agePolicy', 'refundPolicy', 'ticketDelivery', 'priceNote'];
const ISO_INSTANT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;
const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function validInstant(value) {
  if (typeof value !== 'string') return false;
  const match = ISO_INSTANT.exec(value);
  if (!match) return false;
  const [, year, month, day, hour, minute, second, offset] = match;
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (m < 1 || m > 12 || d < 1 || d > days[m - 1]) return false;
  if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return false;
  if (offset !== 'Z' && (Number(offset.slice(1, 3)) > 23 || Number(offset.slice(4, 6)) > 59)) return false;
  return Number.isFinite(Date.parse(value));
}

function validTimeZone(value) {
  if (!hasText(value)) return false;
  try {
    new Intl.DateTimeFormat('en', { timeZone: value }).format(0);
    return true;
  } catch {
    return false;
  }
}

function validHost(host) {
  return typeof host === 'string'
    && host.length <= 253
    && /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(host)
    && !host.toLowerCase().endsWith('.localhost');
}

/**
 * Permit public HTTPS links without embedded credentials or nonstandard ports.
 * If hostsOptional is supplied, require an exact hostname match (no wildcards).
 * In particular, an empty allowlist permits no checkout URLs.
 */
export function isSafeHttpsUrl(value, hostsOptional) {
  if (!hasText(value) || value !== value.trim() || /[\\\u0000-\u0020]/.test(value)) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || !validHost(url.hostname)) return false;
    if (hostsOptional === undefined) return true;
    return Array.isArray(hostsOptional) && hostsOptional.some(
      (host) => validHost(host) && host.toLowerCase() === url.hostname.toLowerCase(),
    );
  } catch {
    return false;
  }
}

function validateLocalized(value, field, errors) {
  if (!isRecord(value) || LOCALES.some((locale) => !hasText(value[locale]))) {
    errors.push(`${field} must contain nonempty bs and en text.`);
  }
}

function validatePlainLocalized(value, field, errors) {
  validateLocalized(value, field, errors);
  if (isRecord(value) && LOCALES.some((locale) => typeof value[locale] === 'string'
    && /[<>\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value[locale]))) {
    errors.push(`${field} must contain plain text, without HTML or control characters.`);
  }
}

/**
 * Returns { valid, errors, canPurchase }. This does not verify inventory or
 * ownership of a checkout URL; the organizer must confirm those before launch.
 */
export function validateEvent(event, checkoutHosts = []) {
  const errors = [];
  if (!isRecord(event)) return { valid: false, errors: ['Event must be an object.'], canPurchase: false };
  if (!hasText(event.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.id)) {
    errors.push('id must be a lowercase hyphen-separated identifier.');
  }
  validateLocalized(event.title ?? event.name, 'title', errors);
  if (!validInstant(event.startsAt)) errors.push('startsAt must be a real ISO date and time with seconds and an explicit UTC offset or Z.');
  if (!validTimeZone(event.timeZone)) errors.push('timeZone must be a valid IANA time zone.');
  if (!hasText(event.venue)) errors.push('venue must be confirmed, nonempty text.');
  if (!hasText(event.city)) errors.push('city must be confirmed, nonempty text.');
  if (!EVENT_STATUSES.includes(event.status)) errors.push(`status must be one of: ${EVENT_STATUSES.join(', ')}.`);
  if (event.ticketLabel !== undefined && event.ticketLabel !== null) {
    validateLocalized(event.ticketLabel, 'ticketLabel', errors);
  }
  for (const field of OPTIONAL_EVENT_TEXT) {
    if (event[field] !== undefined) validatePlainLocalized(event[field], field, errors);
  }
  if (event.sourceUrl !== undefined && !isSafeHttpsUrl(event.sourceUrl)) {
    errors.push('sourceUrl must be a public HTTPS URL.');
  }
  if (event.price !== undefined) {
    if (!isRecord(event.price)
      || typeof event.price.amount !== 'number' || !Number.isFinite(event.price.amount) || event.price.amount < 0
      || event.price.currency !== 'CAD' || typeof event.price.includesFees !== 'boolean') {
      errors.push('price must contain a nonnegative finite amount, currency CAD, and a boolean includesFees.');
    }
  }
  if (event.checkout !== undefined && event.checkout !== null) {
    if (!isRecord(event.checkout)) {
      errors.push('checkout must be an object or null.');
    } else {
      if (!CHECKOUT_PROVIDERS.includes(event.checkout.provider)) {
        errors.push(`checkout.provider must be one of: ${CHECKOUT_PROVIDERS.join(', ')}.`);
      }
      if (!isSafeHttpsUrl(event.checkout.url, checkoutHosts)) {
        errors.push('checkout.url must be HTTPS on an explicitly approved checkout hostname.');
      }
    }
  }
  if (event.status === 'on_sale' && !isRecord(event.checkout)) errors.push('An on_sale event requires a checkout.');
  const valid = errors.length === 0;
  return { valid, errors, canPurchase: valid && getEventStatus(event) === 'on_sale' };
}

function safeImageSource(value) {
  if (isSafeHttpsUrl(value)) return true;
  return hasText(value)
    && /^(?:\.?\/)?assets\//.test(value)
    && !/[\\\u0000-\u0020]/.test(value)
    && !value.split('/').includes('..');
}

// A single plain contact address, not a mailto URL or a list of recipients.
// Restrict to ordinary ASCII mailbox syntax so raw mailto construction cannot
// introduce query parameters, fragments, or percent-encoded control characters.
function validContactEmail(value) {
  if (typeof value !== 'string' || value.length > 254) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [mailbox, host] = parts;
  return mailbox.length > 0 && mailbox.length <= 64
    && /^[A-Za-z0-9_+.-]+$/.test(mailbox)
    && !mailbox.startsWith('.') && !mailbox.endsWith('.') && !mailbox.includes('..')
    && validHost(host);
}

/** Validate the public configuration, including every event and duplicate IDs. */
export function validateSiteConfig(config) {
  const errors = [];
  if (!isRecord(config)) return { valid: false, errors: ['Site configuration must be an object.'] };
  if (!hasText(config.bandName)) errors.push('bandName is required.');
  if (!LOCALES.includes(config.defaultLocale)) errors.push('defaultLocale must be bs or en.');
  if (config.email !== null && config.email !== undefined && !validContactEmail(config.email)) {
    errors.push('email must be a valid email address or null.');
  }
  if (config.phone !== null && config.phone !== undefined
    && (typeof config.phone !== 'string' || !/^\+?[\d\s().-]+$/.test(config.phone)
      || config.phone.replace(/\D/g, '').length < 7 || config.phone.replace(/\D/g, '').length > 15)) {
    errors.push('phone must be a telephone number or null.');
  }
  for (const key of ['facebookUrl', 'instagramUrl']) {
    if (config[key] !== null && config[key] !== undefined && !isSafeHttpsUrl(config[key])) {
      errors.push(`${key} must be a public HTTPS URL or null.`);
    }
  }
  if (config.heroImage !== null && config.heroImage !== undefined) {
    if (!safeImageSource(config.heroImage)) errors.push('heroImage must be an assets/ path or a public HTTPS image URL.');
    validateLocalized(config.heroImageAlt, 'heroImageAlt', errors);
  }
  const hosts = config.checkoutHosts;
  if (!Array.isArray(hosts) || hosts.some((host) => !validHost(host))) {
    errors.push('checkoutHosts must be an array of exact domain names, without schemes, paths, ports, or wildcards.');
  }
  if (!Array.isArray(config.events)) {
    errors.push('events must be an array; use [] until event details are confirmed.');
  } else {
    const ids = new Set();
    config.events.forEach((event, index) => {
      const result = validateEvent(event, Array.isArray(hosts) ? hosts : []);
      errors.push(...result.errors.map((error) => `events[${index}]: ${error}`));
      if (isRecord(event) && hasText(event.id)) {
        if (ids.has(event.id)) errors.push(`events[${index}]: duplicate id ${event.id}.`);
        ids.add(event.id);
      }
    });
  }
  return { valid: errors.length === 0, errors };
}

/** A show is past at its scheduled start. Postponed/cancelled notices remain explicit. */
export function getEventStatus(event, now = new Date()) {
  const nowTime = new Date(now).getTime();
  if (!isRecord(event) || !validInstant(event.startsAt) || !EVENT_STATUSES.includes(event.status) || !Number.isFinite(nowTime)) return 'invalid';
  if (event.status === 'cancelled' || event.status === 'postponed') return event.status;
  if (Date.parse(event.startsAt) <= nowTime) return 'past';
  return event.status;
}

/** Format one event's instant in its venue's time zone, not the visitor's. */
export function formatEventDate(event, locale = 'bs') {
  if (!isRecord(event) || !validInstant(event.startsAt) || !validTimeZone(event.timeZone)) return '';
  if (locale === 'bs') {
    // Numeric Bosnian format also works in browsers with incomplete bs locale data.
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
      hourCycle: 'h23', timeZone: event.timeZone,
    }).formatToParts(new Date(event.startsAt)).map(part => [part.type, part.value]));
    return parts.day + '.' + parts.month + '.' + parts.year + '. u ' + parts.hour + ':' + parts.minute;
  }
  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: event.timeZone,
  }).format(new Date(event.startsAt));
}

/** Return a new chronological array; invalid dates are excluded. */
export function getAvailableEvents(events, filter = 'all', now = new Date()) {
  if (!['all', 'upcoming', 'past'].includes(filter)) throw new RangeError(`Unknown event filter: ${filter}`);
  if (!Array.isArray(events)) return [];
  const nowTime = new Date(now).getTime();
  if (!Number.isFinite(nowTime)) return [];
  return events.filter((event) => {
    if (!isRecord(event) || !validInstant(event.startsAt) || !EVENT_STATUSES.includes(event.status)) return false;
    const eventTime = Date.parse(event.startsAt);
    return filter === 'all' || (filter === 'upcoming' ? eventTime > nowTime : eventTime <= nowTime);
  }).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}
