import { SITE_CONFIG } from './data.js';
import { validateEvent, validateSiteConfig, getAvailableEvents, getEventStatus, formatEventDate, isSafeHttpsUrl } from './lib/events.js';

const translations = {
  en: {
    skip:'Skip to content',homeLabel:'Sto Posto Live Band, home',navLabel:'Main navigation',mobileNavLabel:'Mobile navigation',menuLabel:'Open menu',closeLabel:'Close',filterLabel:'Show filter',photosLabel:'The band on stage',photoDialogLabel:'Performance photo',
    navEvents:'Shows & tickets',navBand:'The band',navContact:'Contact',tickets:'Tickets',heroEyebrow:'BOSNIAN ROOTS. LIVE IN CANADA.',heroTagline:'One hundred percent live.',heroDescription:'The songs you know. The people you love.<br>A little closer to home, wherever we play.',seeEvents:'Shows & tickets',meetBand:'Meet the band',heroCaption:'THREE MUSICIANS. ONE SHARED ENERGY.',introLine:'For the music. For the memories. For our people.',introLink:'See what’s next ↓',
    eventsEyebrow:'COME FOR THE MUSIC. STAY FOR THE NIGHT.',eventsTitle:'Be there. <em>Sing along.</em>',upcoming:'Upcoming',past:'Past listings',archiveNote:'Previously advertised shows, with links to the original event listings.',datesSoon:'THE NEXT CHAPTER',emptyTitle:'New nights are on the way.',emptyDescription:'Our next confirmed shows will be announced here, with the venue, price and a direct link to tickets.',browsePast:'Explore past listings',ticketHelpTitle:'Your night starts here.',ticketHelpDescription:'Choose a show. Review the details. Follow its official ticket link to checkout.',ticketQuestionsLink:'Ticket questions ↓',
    viewEvent:'View event',eventDetails:'EVENT DETAILS',buyTickets:'Buy tickets',announced:'Tickets coming soon',on_sale:'Tickets on sale',sold_out:'Sold out',postponed:'Postponed',cancelled:'Cancelled',pastStatus:'Past listing',date:'When',venue:'Where',price:'Tickets from',priceIncludes:'Includes listed fees. Review the final total at checkout.',priceExcludes:'Additional fees may apply. Review the final total at checkout.',checkoutHandoff:'Choose ticket types and quantity at the official checkout. Your order is only confirmed by the ticket seller after checkout.',notOnSale:'Tickets are not available for this event here.',source:'View original event listing ↗',agePolicy:'Age policy',refundPolicy:'Refund policy',ticketDelivery:'Ticket delivery',unknownPolicy:'Check the seller’s age restrictions, refund terms and ticket delivery instructions before paying.',
    bandEyebrow:'THE MUSIC BRINGS US TOGETHER',bandTitle:'Our roots.<br><em>Our rhythm.</em>',bandDescription:'We’re Sto Posto Live Band — three musicians with Bosnian roots and a love for playing live in Canada.',bandDescription2:'From a familiar folk song to a room singing together, it’s about the moments we share. Bring your friends. Make a night of it.',accordion:'Accordion',vocals:'Vocals',bass:'Bass',accordionAlt:'Accordion player performing on stage',vocalsAlt:'Vocalist singing among the audience',bassAlt:'Bass guitarist performing on stage',accordionView:'View accordion performance photo',vocalsView:'View vocalist performance photo',bassView:'View bass performance photo',
    faqEyebrow:'BEFORE YOU HEAD OUT',faqTitle:'Good to know.',faqIntro:'A little planning. A great night.',faqQ1:'How do I buy tickets?',faqA1:'Select an upcoming show to see its date, venue and ticket details. When sales open, “Buy tickets” takes you directly to that show’s official checkout.',faqQ2:'Which payment methods can I use?',faqA2:'Available cards, digital wallets and other payment methods are shown at checkout. Ticket sales are not open on this website yet.',faqA2Active:'Available cards, digital wallets and other payment methods are shown at the official checkout for your chosen event.',faqQ3:'Where is my ticket and order confirmation?',faqA3:'Ticket delivery instructions appear with each event and at checkout. Use an email address you can access and keep your order confirmation. For an existing order, contact the ticket seller listed on your receipt.',faqQ4:'Can I get a refund or bring children?',faqA4:'Age restrictions and refund terms vary by event. Check the event details and the seller’s policy before paying.',
    contactEyebrow:'LET’S MAKE A NIGHT OF IT',contactTitle:'Your people.<br><em>Our music.</em>',contactDescription:'Planning a celebration or a live music night? We’d love to hear what you have in mind.',contactSoon:'Booking contact details will be published here soon.',shareBand:'Share the band',shareText:'Discover Sto Posto Live Band. Bosnian roots. One hundred percent live.',linkCopied:'Link copied. Share it with your people.',shareFallback:'Copy the address from your browser to share this page.',
    footerLine:'Bosnian roots. One hundred percent live.',privacy:'Privacy',privacyText:'This site uses no marketing cookies or analytics. Your chosen language is stored in your browser. We do not collect payment details here. External ticketing sites have their own terms and privacy policies. Our hosting provider may process technical information needed to deliver and secure this site.'
  },
  bs: {
    skip:'Preskoči na sadržaj',homeLabel:'Sto Posto Live Band, početna',navLabel:'Glavna navigacija',mobileNavLabel:'Mobilna navigacija',menuLabel:'Otvori meni',closeLabel:'Zatvori',filterLabel:'Filter nastupa',photosLabel:'Bend na sceni',photoDialogLabel:'Fotografija s nastupa',
    navEvents:'Nastupi i ulaznice',navBand:'O bendu',navContact:'Kontakt',tickets:'Ulaznice',heroEyebrow:'BOSANSKI KORIJENI. UŽIVO U KANADI.',heroTagline:'Sto posto uživo.',heroDescription:'Pjesme koje znate. Ljudi koje volite.<br>Bliže kući, gdje god sviramo.',seeEvents:'Nastupi i ulaznice',meetBand:'Upoznajte bend',heroCaption:'TRI MUZIČARA. JEDNA ZAJEDNIČKA ENERGIJA.',introLine:'Za muziku. Za uspomene. Za našu raju.',introLink:'Pogledajte šta slijedi ↓',
    eventsEyebrow:'DOĐITE ZBOG MUZIKE. OSTANITE ZBOG RAJE.',eventsTitle:'Budite tu. <em>Zapjevajte s nama.</em>',upcoming:'Naredni nastupi',past:'Prethodne najave',archiveNote:'Ranije najavljeni nastupi, s linkovima na izvorne objave događaja.',datesSoon:'NOVO POGLAVLJE',emptyTitle:'Nove noći su pred nama.',emptyDescription:'Ovdje ćemo objaviti naredne potvrđene nastupe, lokacije, cijene i direktne linkove za ulaznice.',browsePast:'Pogledajte prethodne najave',ticketHelpTitle:'Vaša noć počinje ovdje.',ticketHelpDescription:'Odaberite nastup. Provjerite detalje. Pratite službeni link za kupovinu ulaznica.',ticketQuestionsLink:'Pitanja o ulaznicama ↓',
    viewEvent:'Detalji događaja',eventDetails:'DETALJI DOGAĐAJA',buyTickets:'Kupi ulaznice',announced:'Ulaznice uskoro',on_sale:'Ulaznice u prodaji',sold_out:'Rasprodano',postponed:'Odgođeno',cancelled:'Otkazano',pastStatus:'Prethodna najava',date:'Kada',venue:'Gdje',price:'Ulaznice od',priceIncludes:'Navedene naknade su uključene. Provjerite konačan iznos pri kupovini.',priceExcludes:'Moguće su dodatne naknade. Provjerite konačan iznos pri kupovini.',checkoutHandoff:'Vrstu i broj ulaznica birate na službenoj stranici za kupovinu. Narudžbu potvrđuje prodavač ulaznica nakon završetka kupovine.',notOnSale:'Ulaznice za ovaj događaj ovdje nisu dostupne.',source:'Pogledajte izvornu najavu ↗',agePolicy:'Dobna ograničenja',refundPolicy:'Uslovi povrata',ticketDelivery:'Dostava ulaznica',unknownPolicy:'Prije plaćanja provjerite dobna ograničenja, uslove povrata i način dostave ulaznica kod prodavača.',
    bandEyebrow:'MUZIKA NAS SPAJA',bandTitle:'Naši korijeni.<br><em>Naš ritam.</em>',bandDescription:'Mi smo Sto Posto Live Band — tri muzičara s bosanskim korijenima i ljubavlju prema živoj muzici u Kanadi.',bandDescription2:'Od poznate narodne pjesme do sale koja pjeva zajedno — najvažniji su trenuci koje dijelimo. Povedite svoju raju. Uživajmo zajedno.',accordion:'Harmonika',vocals:'Vokal',bass:'Bas gitara',accordionAlt:'Harmonikaš svira na sceni',vocalsAlt:'Pjevač nastupa među publikom',bassAlt:'Bas gitarista svira na sceni',accordionView:'Pogledajte fotografiju harmonikaša',vocalsView:'Pogledajte fotografiju pjevača',bassView:'Pogledajte fotografiju bas gitariste',
    faqEyebrow:'PRIJE NEGO KRENETE',faqTitle:'Dobro je znati.',faqIntro:'Malo planiranja. Odličan provod.',faqQ1:'Kako mogu kupiti ulaznice?',faqA1:'Odaberite naredni nastup da vidite datum, lokaciju i informacije o ulaznicama. Kada prodaja počne, dugme „Kupi ulaznice“ vodi direktno na službenu stranicu za kupovinu.',faqQ2:'Koje načine plaćanja mogu koristiti?',faqA2:'Dostupne kartice, digitalni novčanici i drugi načini plaćanja prikazani su pri kupovini. Prodaja ulaznica na ovoj stranici još nije otvorena.',faqA2Active:'Dostupne kartice, digitalni novčanici i drugi načini plaćanja prikazani su na službenoj stranici za kupovinu odabranog događaja.',faqQ3:'Gdje su moja ulaznica i potvrda narudžbe?',faqA3:'Upute za dostavu ulaznica nalaze se uz događaj i pri kupovini. Unesite email kojem imate pristup i sačuvajte potvrdu narudžbe. Za postojeću narudžbu obratite se prodavaču navedenom na potvrdi.',faqQ4:'Mogu li dobiti povrat novca ili dovesti djecu?',faqA4:'Dobna ograničenja i uslovi povrata razlikuju se za svaki događaj. Prije plaćanja provjerite detalje događaja i pravila prodavača.',
    contactEyebrow:'NAPRAVIMO NOĆ ZA PAMĆENJE',contactTitle:'Vaša raja.<br><em>Naša muzika.</em>',contactDescription:'Planirate slavlje ili veče uz živu muziku? Radujemo se vašim idejama.',contactSoon:'Informacije za rezervacije nastupa uskoro objavljujemo ovdje.',shareBand:'Podijelite bend',shareText:'Upoznajte Sto Posto Live Band. Bosanski korijeni. Sto posto uživo.',linkCopied:'Link je kopiran. Podijelite ga s rajom.',shareFallback:'Kopirajte adresu iz svog preglednika i podijelite je.',
    footerLine:'Bosanski korijeni. Sto posto uživo.',privacy:'Privatnost',privacyText:'Ova stranica ne koristi marketinške kolačiće niti analitiku. Vaš izbor jezika pohranjuje se u pregledniku. Ovdje ne prikupljamo podatke za plaćanje. Vanjske stranice za ulaznice imaju vlastite uslove i pravila privatnosti. Hosting pružatelj može obrađivati tehničke podatke potrebne za isporuku i sigurnost stranice.'
  }
};
const $ = selector => document.querySelector(selector);
const textElement = (tag, text, className) => {const element=document.createElement(tag);element.textContent=text;if(className)element.className=className;return element;};
const preferenceKey = 'sto-posto-language-v2';
let locale = SITE_CONFIG.defaultLocale === 'bs' ? 'bs' : 'en';
try {const saved=localStorage.getItem(preferenceKey);if(['en','bs'].includes(saved))locale=saved;} catch { /* Optional preference. */ }
let eventFilter='upcoming';
let currentEvent=null;
let currentPhoto=null;
const configCheck=validateSiteConfig(SITE_CONFIG);
if(!configCheck.valid)console.error('Invalid site configuration:',configCheck.errors);
const validEvents=(configCheck.valid?SITE_CONFIG.events:[]).filter(event=>validateEvent(event,SITE_CONFIG.checkoutHosts).valid);
const t=key=>translations[locale][key]||translations.en[key]||key;
const localized=value=>value?.[locale]||value?.en||'';
const currency=value=>new Intl.NumberFormat(locale==='bs'?'bs-BA':'en-CA',{style:'currency',currency:'CAD',currencyDisplay:'code'}).format(value);
const statusText=event=>t(getEventStatus(event)==='past'?'pastStatus':getEventStatus(event));
function purchaseLink(event){
  const link=textElement('a',t('buyTickets')+' ↗','button button-gold');link.href=event.checkout.url;link.rel='noopener noreferrer';
  link.addEventListener('click',eventClick=>{if(!configCheck.valid||!validateEvent(event,SITE_CONFIG.checkoutHosts).canPurchase){eventClick.preventDefault();renderEvents();if(currentEvent)renderEventDetails();}});return link;
}
function renderEvents(){
  const events=getAvailableEvents(validEvents,eventFilter);if(eventFilter==='past')events.reverse();
  $('#events-list').replaceChildren();$('#events-empty').hidden=events.length>0;$('#archive-note').hidden=eventFilter!=='past'||events.length===0;
  for(const event of events){
    const card=document.createElement('article');card.className='event-card';
    const date=document.createElement('time');date.className='date-block';date.dateTime=event.startsAt;date.setAttribute('aria-label',formatEventDate(event,locale));
    const opts={timeZone:event.timeZone};const when=new Date(event.startsAt);const lang=locale==='bs'?'bs-BA':'en-CA';
    date.append(textElement('span',(locale==='bs'?['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec'][Number(new Intl.DateTimeFormat('en-CA',{...opts,month:'numeric'}).format(when))-1]:new Intl.DateTimeFormat(lang,{...opts,month:'short'}).format(when))),textElement('strong',new Intl.DateTimeFormat(lang,{...opts,day:'numeric'}).format(when)),textElement('small',new Intl.DateTimeFormat(lang,{...opts,year:'numeric'}).format(when)));
    const info=document.createElement('div');info.append(textElement('span',statusText(event),'event-badge'));
    const title=textElement('h3',localized(event.title??event.name));info.append(title,textElement('p',event.venue+' · '+event.city));
    if(getEventStatus(event)!=='past'&&event.ticketLabel)info.append(textElement('p',localized(event.ticketLabel),'ticket-price'));
    const available=validateEvent(event,SITE_CONFIG.checkoutHosts).canPurchase;
    const view=textElement('button',t(available?'buyTickets':'viewEvent')+' ↗',available?'button button-gold':'button button-outline');view.type='button';view.dataset.eventId=event.id;view.setAttribute('aria-label',t(available?'buyTickets':'viewEvent')+': '+localized(event.title??event.name));view.addEventListener('click',()=>openEvent(event));
    card.append(date,info,view);$('#events-list').append(card);
  }
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===eventFilter)));
  if(validEvents.some(event=>validateEvent(event,SITE_CONFIG.checkoutHosts).canPurchase))$('[data-i18n="faqA2"]').textContent=t('faqA2Active');
}
function renderEventDetails(){
  const event=currentEvent;if(!event)return;const container=$('#event-detail-content');container.replaceChildren();
  const title=textElement('h2',localized(event.title??event.name));title.id='event-detail-title';container.append(textElement('p',statusText(event),'event-badge'),title);
  const meta=document.createElement('dl');meta.className='event-detail-meta';
  for(const [label,value] of [[t('date'),formatEventDate(event,locale)],[t('venue'),event.venue+' · '+event.city]]){const row=document.createElement('div');row.append(textElement('dt',label),textElement('dd',value));meta.append(row);}container.append(meta);
  if(event.description)container.append(textElement('p',localized(event.description),'event-detail-description'));
  for(const field of ['agePolicy','refundPolicy','ticketDelivery']){if(event[field]){const section=document.createElement('div');section.className='event-policy';section.append(textElement('strong',t(field)),textElement('p',localized(event[field])));container.append(section);}}
  const purchase=document.createElement('div');purchase.className='event-purchase';
  if(validateEvent(event,SITE_CONFIG.checkoutHosts).canPurchase){
    if(event.ticketLabel)purchase.append(textElement('div',localized(event.ticketLabel),'event-price'));else if(event.price)purchase.append(textElement('div',t('price')+' '+currency(event.price.amount),'event-price'));
    purchase.append(textElement('p',event.priceNote?localized(event.priceNote):(locale==='bs'?'Konačan iznos je prikazan pri kupovini.':'The final total is shown at checkout.')));
    if(!event.agePolicy||!event.refundPolicy||!event.ticketDelivery)purchase.append(textElement('p',t('unknownPolicy')));
    purchase.append(purchaseLink(event),textElement('p',t('checkoutHandoff')));
  }else purchase.append(textElement('p',t('notOnSale')));
  if(event.sourceUrl&&isSafeHttpsUrl(event.sourceUrl)){const source=textElement('a',t('source'),'event-source');source.href=event.sourceUrl;source.rel='noopener noreferrer';purchase.append(source);}container.append(purchase);
}
function openEvent(event,fromHash=false){currentEvent=event;renderEventDetails();if(!$('#event-dialog').open)$('#event-dialog').showModal();if(!fromHash)history.pushState(null,'','#show='+encodeURIComponent(event.id));}
function eventFromHash(){let event=null;if(location.hash.startsWith('#show=')){try{const id=decodeURIComponent(location.hash.slice(6));event=validEvents.find(item=>item.id===id);}catch{/* Malformed deep links have no selected event. */}}if(event)openEvent(event,true);else if($('#event-dialog').open)$('#event-dialog').close();}
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
  renderEvents();renderContacts();if(currentEvent)renderEventDetails();if(currentPhoto)$('#full-photo').alt=t(currentPhoto+'Alt');$('#share-status').textContent='';
  if(save)try{localStorage.setItem(preferenceKey,locale);}catch{/* Browsing without storage is supported. */}
}
function setFilter(value){eventFilter=value;renderEvents();}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang,true)));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
$('#archive-button').addEventListener('click',()=>{setFilter('past');$('[data-filter="past"]').focus();});
function closeMenu(){$('.menu-toggle').setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;}
$('.menu-toggle').addEventListener('click',()=>{const open=$('.menu-toggle').getAttribute('aria-expanded')!=='true';$('.menu-toggle').setAttribute('aria-expanded',String(open));$('#mobile-nav').hidden=!open;});
$('#mobile-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));
$('#event-dialog').addEventListener('close',()=>{const previousId=currentEvent?.id;currentEvent=null;if(location.hash.startsWith('#show='))history.replaceState(null,'','#shows');const opener=previousId?document.querySelector('[data-event-id="'+previousId+'"]'):null;(opener||document.querySelector('[data-filter][aria-pressed="true"]'))?.focus({preventScroll:true});});
window.addEventListener('hashchange',eventFromHash);window.addEventListener('popstate',eventFromHash);
const photos={accordion:'./assets/band/accordion.jpg',vocals:'./assets/band/vocals.jpg',bass:'./assets/band/bass.jpg'};
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{currentPhoto=button.dataset.photo;$('#full-photo').src=photos[currentPhoto];$('#full-photo').alt=t(currentPhoto+'Alt');$('#photo-dialog').showModal();}));
$('#privacy-button').addEventListener('click',()=>$('#privacy-dialog').showModal());
$('#share-button').addEventListener('click',async()=>{const url=location.origin+location.pathname;try{if(navigator.share){await navigator.share({title:SITE_CONFIG.bandName,text:t('shareText'),url});return;}await navigator.clipboard.writeText(url);$('#share-status').textContent=t('linkCopied');}catch(error){if(error.name!=='AbortError')$('#share-status').textContent=t('shareFallback');}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){renderEvents();if(currentEvent)renderEventDetails();}});
$('#year').textContent=new Date().getFullYear();applyLanguage(locale);eventFromHash();
