import { SITE_CONFIG } from './data.js';
import { validateSiteConfig } from './lib/events.js';

const translations = {
  en: {
    boxOfficeIntro:'Choose your next night out. Find event details, ticket options and current availability in our box office.',openBoxOffice:'Open ticket shop',openBoxOfficeLabel:'Open ticket shop in a new tab',boxOfficeTitle:'Sto Posto Live Band ticket shop',
    skip:'Skip to content',homeLabel:'Sto Posto Live Band, home',navLabel:'Main navigation',mobileNavLabel:'Mobile navigation',menuLabel:'Open menu',closeLabel:'Close',photosLabel:'The band',photoDialogLabel:'Band photo',
    navEvents:'Shows & tickets',navBand:'The band',navContact:'Contact',tickets:'Tickets',heroEyebrow:'BOSNIAN ROOTS. LIVE IN CANADA.',heroTagline:'One hundred percent live.',heroDescription:'The songs you know. The people you love.<br>A little closer to home, wherever we play.',seeEvents:'Shows & tickets',meetBand:'Meet the band',heroCaption:'THREE MUSICIANS. ONE SHARED ENERGY.',introLine:'For the music. For the memories. For our people.',introLink:'See what’s next ↓',
    eventsEyebrow:'COME FOR THE MUSIC. STAY FOR THE NIGHT.',eventsTitle:'Be there. <em>Sing along.</em>',ticketHelpTitle:'Your night starts here.',ticketHelpDescription:'Choose a show and your tickets. Ticket Tailor handles checkout and emails your tickets.',ticketQuestionsLink:'Ticket questions ↓',

    bandEyebrow:'THE MUSIC BRINGS US TOGETHER',bandTitle:'Our roots.<br><em>Our rhythm.</em>',bandDescription:'We’re Sto Posto Live Band — three musicians with Bosnian roots and a love for playing live in Canada.',bandDescription2:'From the first song to a room singing together, it’s about the moments we share. Bring your friends. Make a night of it.',accordion:'Accordion',vocals:'Vocals',bass:'Bass',accordionAlt:'Accordion player in a black shirt holding his accordion',vocalsAlt:'Vocalist singing among the audience',bassAlt:'Bass guitarist performing on stage',accordionView:'View accordion player portrait',vocalsView:'View vocalist performance photo',bassView:'View bass performance photo',
    faqEyebrow:'BEFORE YOU HEAD OUT',faqTitle:'Good to know.',faqIntro:'A little planning. A great night.',faqQ1:'How do I buy tickets?',faqA1:'Choose an event in our box office, select your tickets and complete checkout with Ticket Tailor. Ticket types, prices and availability are shown there.',faqQ2:'Which payment methods can I use?',faqA2:'Available cards, digital wallets and other payment methods are shown at Ticket Tailor checkout.',faqQ3:'Where is my ticket and order confirmation?',faqA3:'Ticket Tailor emails your confirmation and tickets to the address you enter at checkout. Check your spam folder if they do not arrive, and use the organiser contact on your confirmation for help.',faqQ4:'Can I get a refund or bring children?',faqA4:'Age restrictions and refund terms vary by event. Check the event details and the seller’s policy before paying.',
    contactEyebrow:'LET’S MAKE A NIGHT OF IT',contactTitle:'Your people.<br><em>Our music.</em>',contactDescription:'Planning a celebration or a live music night? We’d love to hear what you have in mind.',contactSoon:'Booking contact details will be published here soon.',shareBand:'Share the band',shareText:'Discover Sto Posto Live Band. Bosnian roots. One hundred percent live.',linkCopied:'Link copied. Share it with your people.',shareFallback:'Copy the address from your browser to share this page.',
    footerLine:'Bosnian roots. One hundred percent live.',privacy:'Privacy',privacyText:'Your chosen language is stored in your browser. The embedded ticket shop loads content from Ticket Tailor, which may use cookies and process booking information under its own privacy policy. Ticket Tailor and Stripe handle checkout and payments; this website does not store card details. Our hosting provider may process technical information needed to deliver and secure this site.'
  },
  bs: {
    boxOfficeIntro:'Odaberite svoj naredni izlazak. U našoj prodavnici ulaznica pogledajte detalje događaja, vrste ulaznica i trenutnu dostupnost.',openBoxOffice:'Otvori prodavnicu ulaznica',openBoxOfficeLabel:'Otvori prodavnicu ulaznica u novoj kartici',boxOfficeTitle:'Sto Posto Live Band prodavnica ulaznica',
    skip:'Preskoči na sadržaj',homeLabel:'Sto Posto Live Band, početna',navLabel:'Glavna navigacija',mobileNavLabel:'Mobilna navigacija',menuLabel:'Otvori meni',closeLabel:'Zatvori',photosLabel:'Članovi benda',photoDialogLabel:'Fotografija benda',
    navEvents:'Nastupi i ulaznice',navBand:'O bendu',navContact:'Kontakt',tickets:'Ulaznice',heroEyebrow:'BOSANSKI KORIJENI. UŽIVO U KANADI.',heroTagline:'Sto posto uživo.',heroDescription:'Pjesme koje znate. Ljudi koje volite.<br>Bliže kući, gdje god sviramo.',seeEvents:'Nastupi i ulaznice',meetBand:'Upoznajte bend',heroCaption:'TRI MUZIČARA. JEDNA ZAJEDNIČKA ENERGIJA.',introLine:'Za muziku. Za uspomene. Za našu raju.',introLink:'Pogledajte šta slijedi ↓',
    eventsEyebrow:'DOĐITE ZBOG MUZIKE. OSTANITE ZBOG RAJE.',eventsTitle:'Budite tu. <em>Zapjevajte s nama.</em>',ticketHelpTitle:'Vaša noć počinje ovdje.',ticketHelpDescription:'Odaberite nastup i ulaznice. Ticket Tailor obrađuje kupovinu i šalje ulaznice emailom.',ticketQuestionsLink:'Pitanja o ulaznicama ↓',

    bandEyebrow:'MUZIKA NAS SPAJA',bandTitle:'Naši korijeni.<br><em>Naš ritam.</em>',bandDescription:'Mi smo Sto Posto Live Band — tri muzičara s bosanskim korijenima i ljubavlju prema živoj muzici u Kanadi.',bandDescription2:'Od prve pjesme do sale koja pjeva zajedno — najvažniji su trenuci koje dijelimo. Povedite svoju raju. Uživajmo zajedno.',accordion:'Harmonika',vocals:'Vokal',bass:'Bas gitara',accordionAlt:'Harmonikaš u crnoj košulji sa svojom harmonikom',vocalsAlt:'Pjevač nastupa među publikom',bassAlt:'Bas gitarista svira na sceni',accordionView:'Pogledajte fotografiju harmonikaša',vocalsView:'Pogledajte fotografiju pjevača',bassView:'Pogledajte fotografiju bas gitariste',
    faqEyebrow:'PRIJE NEGO KRENETE',faqTitle:'Dobro je znati.',faqIntro:'Malo planiranja. Odličan provod.',faqQ1:'Kako mogu kupiti ulaznice?',faqA1:'Odaberite događaj i ulaznice u našoj prodavnici, a zatim završite kupovinu putem Ticket Tailora. Tamo su prikazane vrste ulaznica, cijene i dostupnost.',faqQ2:'Koje načine plaćanja mogu koristiti?',faqA2:'Dostupne kartice, digitalni novčanici i drugi načini plaćanja prikazani su pri kupovini putem Ticket Tailora.',faqQ3:'Gdje su moja ulaznica i potvrda narudžbe?',faqA3:'Ticket Tailor šalje potvrdu i ulaznice na email adresu koju unesete pri kupovini. Ako ne stignu, provjerite neželjenu poštu. Za pomoć koristite kontakt organizatora na potvrdi.',faqQ4:'Mogu li dobiti povrat novca ili dovesti djecu?',faqA4:'Dobna ograničenja i uslovi povrata razlikuju se za svaki događaj. Prije plaćanja provjerite detalje događaja i pravila prodavača.',
    contactEyebrow:'NAPRAVIMO NOĆ ZA PAMĆENJE',contactTitle:'Vaša raja.<br><em>Naša muzika.</em>',contactDescription:'Planirate slavlje ili veče uz živu muziku? Radujemo se vašim idejama.',contactSoon:'Informacije za rezervacije nastupa uskoro objavljujemo ovdje.',shareBand:'Podijelite bend',shareText:'Upoznajte Sto Posto Live Band. Bosanski korijeni. Sto posto uživo.',linkCopied:'Link je kopiran. Podijelite ga s rajom.',shareFallback:'Kopirajte adresu iz svog preglednika i podijelite je.',
    footerLine:'Bosanski korijeni. Sto posto uživo.',privacy:'Privatnost',privacyText:'Vaš izbor jezika pohranjuje se u pregledniku. Ugrađena prodavnica ulaznica učitava sadržaj Ticket Tailora, koji može koristiti kolačiće i obrađivati podatke o rezervacijama prema vlastitim pravilima privatnosti. Ticket Tailor i Stripe obrađuju kupovinu i plaćanja; ova stranica ne pohranjuje podatke kartice. Hosting pružatelj može obrađivati tehničke podatke potrebne za isporuku i sigurnost stranice.'
  }
};
const $ = selector => document.querySelector(selector);
const textElement = (tag, text, className) => {const element=document.createElement(tag);element.textContent=text;if(className)element.className=className;return element;};
const preferenceKey = 'sto-posto-language-v2';
let locale = SITE_CONFIG.defaultLocale === 'bs' ? 'bs' : 'en';
try {const saved=localStorage.getItem(preferenceKey);if(['en','bs'].includes(saved))locale=saved;} catch { /* Optional preference. */ }
let currentPhoto=null;
const configCheck=validateSiteConfig(SITE_CONFIG);
if(!configCheck.valid)console.error('Invalid site configuration:',configCheck.errors);
const t=key=>translations[locale][key]||translations.en[key]||key;
function renderContacts(){
  const channels=$('#contact-channels');channels.replaceChildren();const items=[];
  if(configCheck.valid){if(SITE_CONFIG.email)items.push([SITE_CONFIG.email,'mailto:'+SITE_CONFIG.email]);if(SITE_CONFIG.phone)items.push([SITE_CONFIG.phone,'tel:'+SITE_CONFIG.phone.replace(/[^+\d]/g,'')]);if(SITE_CONFIG.facebookUrl)items.push(['Facebook ↗',SITE_CONFIG.facebookUrl]);if(SITE_CONFIG.instagramUrl)items.push(['Instagram ↗',SITE_CONFIG.instagramUrl]);}
  for(const [label,href] of items){const link=textElement('a',label,'contact-channel');link.href=href;link.rel='noopener noreferrer';channels.append(link);}$('#contact-availability').hidden=items.length>0;
}
function applyLanguage(next,save=false){
  locale=next;document.documentElement.lang=locale;
  document.querySelectorAll('[data-i18n]').forEach(element=>element.innerHTML=t(element.dataset.i18n));
  document.querySelectorAll('[data-label]').forEach(element=>element.setAttribute('aria-label',t(element.dataset.label)));
  document.querySelectorAll('[data-alt]').forEach(element=>element.alt=t(element.dataset.alt));
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===locale)));
  document.title=SITE_CONFIG.bandName+' — '+t('heroTagline');$('meta[name="description"]').content=SITE_CONFIG.bandName+'. '+t('heroTagline');
  renderContacts();if(currentPhoto)$('#full-photo').alt=t(currentPhoto+'Alt');$('#share-status').textContent='';
  if(save)try{localStorage.setItem(preferenceKey,locale);}catch{/* Browsing without storage is supported. */}
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang,true)));
function closeMenu(){$('.menu-toggle').setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;}
$('.menu-toggle').addEventListener('click',()=>{const open=$('.menu-toggle').getAttribute('aria-expanded')!=='true';$('.menu-toggle').setAttribute('aria-expanded',String(open));$('#mobile-nav').hidden=!open;});
$('#mobile-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));
const photos={accordion:'./assets/band/accordion.jpg',vocals:'./assets/band/vocals.jpg',bass:'./assets/band/bass.jpg'};
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{currentPhoto=button.dataset.photo;$('#full-photo').src=photos[currentPhoto];$('#full-photo').alt=t(currentPhoto+'Alt');$('#photo-dialog').showModal();}));
$('#privacy-button').addEventListener('click',()=>$('#privacy-dialog').showModal());
$('#share-button').addEventListener('click',async()=>{const url=location.origin+location.pathname;try{if(navigator.share){await navigator.share({title:SITE_CONFIG.bandName,text:t('shareText'),url});return;}await navigator.clipboard.writeText(url);$('#share-status').textContent=t('linkCopied');}catch(error){if(error.name!=='AbortError')$('#share-status').textContent=t('shareFallback');}});
$('#year').textContent=new Date().getFullYear();applyLanguage(locale);

