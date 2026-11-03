import { SITE_CONFIG } from './data.js';
import { validateEvent, validateSiteConfig, getAvailableEvents, getEventStatus, formatEventDate, isSafeHttpsUrl } from './lib/events.js';

const translations = {
  bs: {
    skip:'Preskoči na sadržaj',homeLabel:'Sto Posto Live Band, početna',navLabel:'Glavna navigacija',mobileNavLabel:'Mobilna navigacija',menuLabel:'Otvori meni',closeLabel:'Zatvori',filterLabel:'Filter nastupa',goEvents:'Idi na nastupe',
    navEvents:'Nastupi & ulaznice',navBand:'O bendu',navContact:'Kontakt',tickets:'Ulaznice',heroEyebrow:'BOSANSKI BEND · KANADA',heroTagline:'Naša muzika. Vaša noć.',heroDescription:'Tri muzičara. Jedna ljubav prema muzici koja nas spaja. Dobro došli u svijet Sto Posto Live Banda.',seeEvents:'Pogledaj nastupe',meetBand:'Upoznaj bend',visualTop:'MUZIKA BEZ GRANICA',visualLine1:'NAŠ ZVUK.',visualLine2:'NAŠA PRIČA.',visualSide:'STO POSTO MUZIKE. STO POSTO UŽIVO.',heroFooter:'ZA SVE KOJI MUZIKU OSJEĆAJU KAO SVOJU.',
    eventsEyebrow:'NASTUPI & ULAZNICE',eventsTitle:'Vaša sljedeća<br>noć za pamćenje.',eventsDescription:'Svi naši naredni nastupi na jednom mjestu. Pronađite svoj grad, odaberite događaj i budite dio naše priče.',upcoming:'Naredni nastupi',past:'Prethodni nastupi',officialSite:'SLUŽBENA STRANICA BENDA',posterHeadline:'SLJEDEĆA<br>STANICA?',posterBottom:'VIDIMO SE USKORO.',datesSoon:'NOVI DATUMI USKORO',emptyTitle:'Najbolje noći<br>tek dolaze.',emptyDescription:'Pripremamo naredne susrete. Čim datumi budu potvrđeni, ovdje ćete pronaći gradove, lokacije i informacije o ulaznicama.',pastLabel:'NAŠI SUSRETI',pastTitle:'Svaka noć<br>ima svoju priču.',pastDescription:'Arhiva naših nastupa bit će objavljena ovdje. Za nove datume pogledajte naredne nastupe.',shareBand:'Podijeli s rajom',shareTitle:'Sto Posto Live Band',shareText:'Naša muzika. Vaša noć. Pratite nastupe Sto Posto Live Banda.',linkCopied:'Link je kopiran. Podijelite ga s rajom.',shareFallback:'Kopirajte adresu iz svog preglednika i podijelite je.',ticketNote:'Potvrđeni nastupi i službeni linkovi za ulaznice bit će objavljeni ovdje.',buyTickets:'Kupi ulaznice',announced:'Ulaznice uskoro',sold_out:'Rasprodano',postponed:'Odgođeno',cancelled:'Otkazano',pastStatus:'Završen nastup',on_sale:'Ulaznice u prodaji',
    bandEyebrow:'NAŠA PRIČA',bandTitle:'Tri muzičara.<br>Jedna energija.',bandIntro:'Daleko od kuće.<br>Blizu onoga što nas spaja.',bandDescription:'Sto Posto Live Band je bosanski bend u Kanadi. Muzika je naš način da okupimo ljude — da zapjevamo zajedno, podijelimo trenutak i osjetimo se kao kod kuće.',bandDescription2:'Naša priča nastavlja se u sastavu od tri muzičara. Vi donosite svoju raju. Mi donosimo sto posto.',bandSignature:'S LJUBAVLJU PREMA MUZICI.',
    faqEyebrow:'DOBRO JE ZNATI',faqTitle:'Sve prije<br>prvog refrena.',faqQ1:'Gdje mogu kupiti ulaznice?',faqA1:'Kada prodaja počne, uz potvrđeni nastup pojavit će se dugme „Kupi ulaznice“. Ono vodi na službenu stranicu za kupovinu. Naredni datumi još nisu objavljeni.',faqA1Active:'Uz nastupe s otvorenom prodajom nalazi se dugme „Kupi ulaznice“. Ono vodi na službenu stranicu za kupovinu. Prije plaćanja provjerite detalje događaja, cijenu i uslove prodaje.',faqQ2:'Kako dobijam svoju ulaznicu?',faqA2:'Na stranici za kupovinu bit će navedeni način plaćanja, dostava ulaznica i uslovi za odabrani događaj. Sačuvajte potvrdu kupovine i provjerite email koji unesete pri naručivanju.',faqQ3:'Kako mogu kontaktirati bend?',faqA3:'Informacije za kontakt nalaze se ispod. Dok pripremamo službene kanale, ovdje možete sastaviti i sačuvati upit za svoj događaj.',faqA3Active:'Koristite kontakt ispod ili pripremite upit s datumom, gradom i opisom događaja. Ako je email dostupan, obrazac otvara vašu email aplikaciju za slanje.',
    contactEyebrow:'HAJDE DA SE ČUJEMO',contactTitle:'Vaš događaj.<br>Sto posto muzike.',contactDescription:'Imate datum i mjesto na umu? Pripremite nekoliko detalja o svom događaju.',contactSoon:'Službene informacije za kontakt objavljujemo uskoro.',formTitle:'Pripremite svoj upit',formIntro:'Sačuvajte upit na svom uređaju. Ovaj obrazac trenutno ne šalje poruku bendu.',formIntroActive:'Pripremite upit, a zatim ga pošaljite bendu kroz svoju email aplikaciju.',yourName:'Vaše ime',yourEmail:'Email',eventDate:'Željeni datum',eventCity:'Grad / lokacija',yourMessage:'Recite nam više',saveInquiry:'Preuzmi upit',sendInquiry:'Otvori email upit',formPrivacy:'Vaši podaci ostaju u pregledniku dok ne preuzmete upit ili ga pošaljete kroz svoj email.',formSaved:'Upit je preuzet na vaš uređaj. Nije poslan bendu.',formEmailOpened:'Upit je pripremljen za vašu email aplikaciju. Potrebno ga je poslati iz te aplikacije.',inquirySubject:'Upit za nastup — Sto Posto Live Band',dateFlexible:'Datum po dogovoru',
    footerLine:'Naša muzika. Vaša noć.',privacy:'Privatnost',backTop:'Na vrh ↑',privacyText:'Ova stranica ne koristi marketinške kolačiće niti analitiku. Vaš izbor jezika pohranjuje se samo u ovom pregledniku. Upit za događaj nije poslan niti sačuvan na našem serveru: možete ga preuzeti na svoj uređaj. Ako bude dostupan email kontakt, slanje se obavlja kroz vašu email aplikaciju. Vanjske stranice za ulaznice imaju vlastite uslove i pravila privatnosti. Hosting pružatelj može obrađivati tehničke podatke potrebne za isporuku i sigurnost stranice.'
  },
  en: {
    skip:'Skip to content',homeLabel:'Sto Posto Live Band, home',navLabel:'Main navigation',mobileNavLabel:'Mobile navigation',menuLabel:'Open menu',closeLabel:'Close',filterLabel:'Show filter',goEvents:'Go to shows',
    navEvents:'Shows & tickets',navBand:'The band',navContact:'Contact',tickets:'Tickets',heroEyebrow:'BOSNIAN BAND · CANADA',heroTagline:'Our music. Your night.',heroDescription:'Three musicians. One love for the music that brings us together. Welcome to the world of Sto Posto Live Band.',seeEvents:'Explore the shows',meetBand:'Meet the band',visualTop:'MUSIC WITHOUT BORDERS',visualLine1:'OUR SOUND.',visualLine2:'OUR STORY.',visualSide:'ONE HUNDRED PERCENT MUSIC. ONE HUNDRED PERCENT LIVE.',heroFooter:'FOR EVERYONE WHO FINDS A LITTLE HOME IN MUSIC.',
    eventsEyebrow:'SHOWS & TICKETS',eventsTitle:'Your next<br>unforgettable night.',eventsDescription:'All our upcoming shows, together in one place. Find your city, choose your event and become part of the story.',upcoming:'Upcoming shows',past:'Past shows',officialSite:'OFFICIAL BAND WEBSITE',posterHeadline:'THE NEXT<br>STOP?',posterBottom:'SEE YOU SOON.',datesSoon:'NEW DATES COMING SOON',emptyTitle:'The best nights<br>are still to come.',emptyDescription:'Our next get-togethers are taking shape. Once dates are confirmed, you’ll find the cities, venues and ticket information right here.',pastLabel:'OUR GET-TOGETHERS',pastTitle:'Every night<br>has a story.',pastDescription:'Our show archive will appear here. Switch to upcoming shows to find our next dates.',shareBand:'Share with your people',shareTitle:'Sto Posto Live Band',shareText:'Our music. Your night. Discover the next Sto Posto Live Band shows.',linkCopied:'Link copied. Share it with your people.',shareFallback:'Copy the address from your browser to share this page.',ticketNote:'Confirmed shows and official ticket links will be published here.',buyTickets:'Buy tickets',announced:'Tickets coming soon',sold_out:'Sold out',postponed:'Postponed',cancelled:'Cancelled',pastStatus:'Past show',on_sale:'Tickets on sale',
    bandEyebrow:'OUR STORY',bandTitle:'Three musicians.<br>One shared energy.',bandIntro:'A little far from home.<br>A little closer through music.',bandDescription:'Sto Posto Live Band is a Bosnian band based in Canada. Music is how we bring people together — to sing along, share a moment and feel a little closer to home.',bandDescription2:'Our story continues as a three-piece band. You bring your people. We bring one hundred percent.',bandSignature:'FOR THE LOVE OF MUSIC.',
    faqEyebrow:'GOOD TO KNOW',faqTitle:'Before the<br>first chorus.',faqQ1:'Where can I buy tickets?',faqA1:'When sales open, a “Buy tickets” button will appear beside the confirmed show. It takes you to the official checkout. Our next show dates have not been announced yet.',faqA1Active:'Shows with open sales have a “Buy tickets” button that takes you to the official checkout. Check the event details, price and sales terms before paying.',faqQ2:'How will I receive my ticket?',faqA2:'The checkout page will explain payment, ticket delivery and the terms for your chosen event. Keep your order confirmation and double-check the email address you enter when booking.',faqQ3:'How can I contact the band?',faqA3:'Contact information appears below. While our official channels are being prepared, you can write and download an enquiry for your event here.',faqA3Active:'Use the contact details below, or prepare an enquiry with your event date, city and details. If email is available, the form opens your email app for you to send it.',
    contactEyebrow:'LET’S GET TOGETHER',contactTitle:'Your occasion.<br>Our kind of music.',contactDescription:'Have a date and a place in mind? Put together a few details about your event.',contactSoon:'Official contact details will be announced soon.',formTitle:'Prepare your enquiry',formIntro:'Save an enquiry on your device. This form does not currently send a message to the band.',formIntroActive:'Prepare your enquiry, then send it to the band through your email app.',yourName:'Your name',yourEmail:'Email',eventDate:'Preferred date',eventCity:'City / venue',yourMessage:'Tell us a little more',saveInquiry:'Download enquiry',sendInquiry:'Open email enquiry',formPrivacy:'Your details stay in your browser until you download the enquiry or send it through your email app.',formSaved:'Your enquiry was downloaded to your device. It has not been sent to the band.',formEmailOpened:'The enquiry is ready for your email app. You still need to send it from that app.',inquirySubject:'Performance enquiry — Sto Posto Live Band',dateFlexible:'Date to be confirmed',
    footerLine:'Our music. Your night.',privacy:'Privacy',backTop:'Back to top ↑',privacyText:'This website uses no marketing cookies or analytics. Your language choice is stored only in this browser. Event enquiries are not sent to or saved on our server: you can download yours to your device. If an email contact is available, sending happens through your own email app. External ticketing websites have their own terms and privacy policies. The hosting provider may process technical information needed to deliver and secure this website.'
  }
};

let locale = ['bs', 'en'].includes(SITE_CONFIG.defaultLocale) ? SITE_CONFIG.defaultLocale : 'bs';
let eventFilter = 'upcoming';
try { const saved = localStorage.getItem('sto-posto-language'); if (saved === 'bs' || saved === 'en') locale = saved; } catch { /* Browsing without local storage is supported. */ }
const configCheck = validateSiteConfig(SITE_CONFIG);
if (!configCheck.valid) console.error('Invalid site configuration:', configCheck.errors);
const validEvents = (configCheck.valid && Array.isArray(SITE_CONFIG.events) ? SITE_CONFIG.events : []).filter(event => validateEvent(event, SITE_CONFIG.checkoutHosts).valid);
const $ = (selector) => document.querySelector(selector);
const t = (key) => translations[locale][key] || translations.bs[key] || key;
const textElement = (tag, text, className) => { const el = document.createElement(tag); el.textContent = text; if (className) el.className = className; return el; };

function renderEvents() {
  const events = getAvailableEvents(validEvents, eventFilter);
  const list = $('#events-list');
  list.replaceChildren();
  $('#events-empty').hidden = events.length > 0;
  $('#event-status').textContent = t(eventFilter === 'past' ? 'pastLabel' : 'datesSoon');
  $('#empty-title').innerHTML = t(eventFilter === 'past' ? 'pastTitle' : 'emptyTitle');
  $('#empty-description').textContent = t(eventFilter === 'past' ? 'pastDescription' : 'emptyDescription');
  for (const event of events) {
    const card = document.createElement('article'); card.className = 'event-card';
    const date = textElement('time', formatEventDate(event, locale), 'event-card-date'); date.dateTime = event.startsAt;
    const info = document.createElement('div');
    info.append(textElement('h3',(event.title ?? event.name)[locale]),textElement('p',`${event.venue} · ${event.city}`));
    if (event.ticketLabel) info.append(textElement('p',event.ticketLabel[locale]));
    const status = getEventStatus(event);
    card.append(date,info);
    if (configCheck.valid && validateEvent(event,SITE_CONFIG.checkoutHosts).canPurchase) {
      const link = textElement('a',`${t('buyTickets')} ↗`,'button button-outline-dark');
      link.href = event.checkout.url; link.rel = 'noopener noreferrer';
      link.addEventListener('click', e => { if (!validateEvent(event, SITE_CONFIG.checkoutHosts).canPurchase) { e.preventDefault(); renderEvents(); } });
      card.append(link);
    } else card.append(textElement('span',t(status === 'past' ? 'pastStatus' : status),'event-badge'));
    list.append(card);
  }
  document.querySelectorAll('[data-filter]').forEach(button => {const active = button.dataset.filter === eventFilter; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active));});
  if (validEvents.length) $('[data-i18n="faqA1"]').textContent = t('faqA1Active');
}

function renderContacts() {
  const channels = $('#contact-channels'); channels.replaceChildren();
  if (!configCheck.valid) return;
  const contactItems = [];
  if (SITE_CONFIG.email) contactItems.push([SITE_CONFIG.email,`mailto:${SITE_CONFIG.email}`]);
  if (SITE_CONFIG.phone) contactItems.push([SITE_CONFIG.phone,`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g,'')}`]);
  if (SITE_CONFIG.facebookUrl && isSafeHttpsUrl(SITE_CONFIG.facebookUrl)) contactItems.push(['Facebook ↗',SITE_CONFIG.facebookUrl]);
  if (SITE_CONFIG.instagramUrl && isSafeHttpsUrl(SITE_CONFIG.instagramUrl)) contactItems.push(['Instagram ↗',SITE_CONFIG.instagramUrl]);
  for (const [label,href] of contactItems) {const a = textElement('a',label,'contact-channel');a.href=href;a.rel='noopener noreferrer';channels.append(a);}
  $('#contact-availability').hidden = contactItems.length > 0;
  if (contactItems.length) $('[data-i18n="faqA3"]').textContent=t('faqA3Active');
  if (SITE_CONFIG.email) {$('#form-intro').textContent=t('formIntroActive');$('#form-submit').textContent=t('sendInquiry');}
}

function applyLanguage(next) {
  locale = next;
  document.documentElement.lang = locale;
  document.querySelectorAll('[data-i18n]').forEach(el => {el.innerHTML=t(el.dataset.i18n);});
  document.querySelectorAll('[data-label]').forEach(el => {el.setAttribute('aria-label',t(el.dataset.label));});
  document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.lang === locale)));
  document.title = `${SITE_CONFIG.bandName} — ${t('heroTagline')}`;
  $('meta[name="description"]').content = `${SITE_CONFIG.bandName}. ${t('heroDescription')}`;
  $('.band-art-bottom').innerHTML=locale==='bs'?'JEDAN BEND.<br>STO POSTO.':'ONE BAND.<br>ONE HUNDRED PERCENT.';
  $('.hero-footer>span:last-child').textContent=locale==='bs'?'ZA TRENUTKE KOJI OSTAJU.':'FOR MOMENTS THAT STAY.';
  $('#form-status').textContent=''; $('#share-status').textContent='';
  if (configCheck.valid && SITE_CONFIG.heroImage) {const image=$('#hero-image'); image.src=SITE_CONFIG.heroImage; image.alt=SITE_CONFIG.heroImageAlt[locale]; image.classList.add('portraits');}
  renderEvents(); renderContacts();
  try {localStorage.setItem('sto-posto-language',locale);} catch { /* Optional preference. */ }
}

document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click',()=>applyLanguage(el.dataset.lang)));
document.querySelectorAll('[data-filter]').forEach(el => el.addEventListener('click',()=>{eventFilter=el.dataset.filter;renderEvents();}));
function closeMenu(){ $('.menu-toggle').setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true; }
$('.menu-toggle').addEventListener('click',()=>{const open=$('.menu-toggle').getAttribute('aria-expanded')!=='true';$('.menu-toggle').setAttribute('aria-expanded',String(open));$('#mobile-nav').hidden=!open;});
$('#mobile-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

$('#share-button').addEventListener('click',async()=>{
  const url = `${location.origin}${location.pathname}`;
  try {
    if(navigator.share){await navigator.share({title:t('shareTitle'),text:t('shareText'),url});return;}
    await navigator.clipboard.writeText(url);$('#share-status').textContent=t('linkCopied');
  } catch(error) {if(error.name!=='AbortError')$('#share-status').textContent=t('shareFallback');}
});

$('#booking-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;if(!form.reportValidity())return;
  const data=new FormData(form);
  const body=[t('inquirySubject'),'',`${t('yourName')}: ${String(data.get('name')).trim()}`,`${t('yourEmail')}: ${String(data.get('email')).trim()}`,`${t('eventDate')}: ${data.get('date')||t('dateFlexible')}`,`${t('eventCity')}: ${String(data.get('city')).trim()}`,'',String(data.get('message')).trim()].join('\n');
  if(configCheck.valid && SITE_CONFIG.email){
    location.href=`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(t('inquirySubject'))}&body=${encodeURIComponent(body)}`;
    $('#form-status').textContent=t('formEmailOpened');
  }else{
    const url=URL.createObjectURL(new Blob(['\uFEFF'+body],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='sto-posto-event-enquiry.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('#form-status').textContent=t('formSaved');
  }
});

const privacy=$('#privacy-dialog');
$('#privacy-button').addEventListener('click',()=>privacy.showModal());
$('#close-privacy').addEventListener('click',()=>privacy.close());
privacy.addEventListener('click',event=>{if(event.target===privacy){const rect=privacy.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)privacy.close();}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderEvents();});
$('#year').textContent=new Date().getFullYear();
applyLanguage(locale);
$('#booking-fields').disabled = false;
