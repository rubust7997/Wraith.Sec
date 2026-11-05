const incidentTypes = [
  {
    kind: { en: 'PAYMENT DIVERSION', af: 'BETALINGSOMLEIDING' },
    sender: 'accounts@northstar-supply.co',
    subject: { en: 'Updated supplier payment details', af: 'Opgedateerde verskafferbetalingsbesonderhede' },
    title: { en: 'A supplier payment went to the wrong place.', af: '’n Verskafferbetaling het na die verkeerde plek gegaan.' },
    story: { en: 'A convincing supplier email changed where an invoice was paid. The money is gone from the shop account, and the real supplier still expects payment.', af: '’n Oortuigende verskaffer-e-pos het verander waar ’n faktuur betaal is. Die geld is uit die winkelrekening, en die regte verskaffer verwag steeds betaling.' },
    explanation: { en: 'This simulated business email compromise diverts a supplier payment. The incident costs rise with the store’s activity; mail screening reduces the scenario impact.', af: 'Hierdie gesimuleerde besigheidse-posbedrog lei ’n verskafferbetaling om. Die insidentkoste styg met die winkel se aktiwiteit; posfiltrering verminder die simulasie-impak.' },
    baseLoss: 175, trustLoss: 5, upgrade: 'mail', downtime: 0
  },
  {
    kind: { en: 'ACCOUNT TAKEOVER', af: 'REKENINGOORNAME' },
    sender: 'security-alert@store-admin.help',
    subject: { en: 'New administrator sign-in', af: 'Nuwe administrateur-aanmelding' },
    title: { en: 'Someone else took over the store account.', af: 'Iemand anders het die winkelrekening oorgeneem.' },
    story: { en: 'The shop owner can no longer access the admin panel. Orders are delayed while account access is recovered, and several customers leave before checkout.', af: 'Die winkeleienaar kan nie meer toegang tot die administrasiepaneel kry nie. Bestellings word vertraag terwyl rekeningtoegang herstel word, en verskeie kliënte verlaat die betaalproses.' },
    explanation: { en: 'A compromised business account can interrupt operations and customer access. Account controls reduce the simulated loss and recovery reserve shortens the disruption.', af: '’n Gekompromitteerde besigheidsrekening kan bedrywighede en kliëntetoegang onderbreek. Rekeningbeheer verminder die gesimuleerde verlies en ’n herstelreserwe verkort die ontwrigting.' },
    baseLoss: 125, trustLoss: 11, upgrade: 'account', downtime: 7
  },
  {
    kind: { en: 'CUSTOMER DATA EXPOSURE', af: 'KLIËNTDATABLOOTSTELLING' },
    sender: 'privacy-notice@outside-mail.net',
    subject: { en: 'Customer details shared outside the business', af: 'Kliëntbesonderhede buite die besigheid gedeel' },
    title: { en: 'Customer information was exposed.', af: 'Kliëntinligting is blootgestel.' },
    story: { en: 'A customer list has appeared where it should not be. Support requests arrive, staff time shifts to incident response, and customers become less confident in the store.', af: '’n Kliëntelys het verskyn waar dit nie hoort nie. Ondersteuningsversoeke kom in, personeeltyd skuif na insidentreaksie, en kliënte vertrou die winkel minder.' },
    explanation: { en: 'A data exposure can create response costs and damage customer confidence even when no payment is stolen. The business impact grows with the size of the shop.', af: '’n Datablootstelling kan reaksiekoste veroorsaak en kliëntevertroue skaad, selfs wanneer geen betaling gesteel word nie. Die besigheidsimpak groei saam met die winkel.' },
    baseLoss: 145, trustLoss: 15, upgrade: 'mail', downtime: 2
  },
  {
    kind: { en: 'STORE OUTAGE', af: 'WINKELONDERBREKING' },
    sender: 'hosting-status@service-desk.notice',
    subject: { en: 'Your storefront is unavailable', af: 'Jou aanlynwinkel is nie beskikbaar nie' },
    title: { en: 'Customers cannot reach the storefront.', af: 'Kliënte kan nie die aanlynwinkel bereik nie.' },
    story: { en: 'The storefront goes offline during a busy period. Orders stop arriving while visitors see an error instead of products, and the store pays for recovery time.', af: 'Die aanlynwinkel gaan tydens ’n besige tyd vanlyn. Bestellings hou op inkom terwyl besoekers ’n fout in plaas van produkte sien, en die winkel betaal vir hersteltyd.' },
    explanation: { en: 'An availability incident turns each offline moment into missed sales. Recovery reserve shortens this simulated interruption.', af: '’n Beskikbaarheidsinsident verander elke vanlyn oomblik in gemiste verkope. ’n Herstelreserwe verkort hierdie gesimuleerde onderbreking.' },
    baseLoss: 95, trustLoss: 7, upgrade: 'backup', downtime: 11
  },
  {
    kind: { en: 'PAYMENT DISPUTES', af: 'BETALINGSGESKILLE' },
    sender: 'payments-review@checkout-audit.info',
    subject: { en: 'Several orders are under review', af: 'Verskeie bestellings word nagegaan' },
    title: { en: 'Suspicious checkout activity drained the margin.', af: 'Verdagte betaalaktiwiteit het die winsmarge opgebruik.' },
    story: { en: 'A wave of disputed orders creates refunds, fees, and extra work. The product revenue looked healthy, but the available cash drops after the claims arrive.', af: '’n Vlaag bestellingsdispute veroorsaak terugbetalings, fooie en ekstra werk. Die produkinkomste het goed gelyk, maar beskikbare kontant daal wanneer die eise inkom.' },
    explanation: { en: 'Fraud and disputes can turn apparent sales into direct costs. Payment monitoring limits the simulated loss; the remaining amount still affects this shop.', af: 'Bedrog en dispute kan oënskynlike verkope in direkte koste verander. Betalingsmonitering beperk die gesimuleerde verlies; die res raak steeds hierdie winkel.' },
    baseLoss: 155, trustLoss: 8, upgrade: 'payment', downtime: 0
  }
];

const upgradeDefinitions = {
  marketing: { button: 'marketingUpgrade', level: 'marketingLevel', baseCost: 180, max: 3, income: 4 },
  mail: { button: 'mailUpgrade', level: 'mailLevel', baseCost: 240, max: 2 },
  account: { button: 'accountUpgrade', level: 'accountLevel', baseCost: 320, max: 2 },
  backup: { button: 'backupUpgrade', level: 'backupLevel', baseCost: 280, max: 2 },
  payment: { button: 'paymentUpgrade', level: 'paymentLevel', baseCost: 360, max: 2 }
};

const languageToggle = document.getElementById('languageToggle');
const incidentDialog = document.getElementById('incidentDialog');
const responseIndexes = [];
let language = 'en';
let cash = 850;
let grossSales = 0;
let totalLosses = 0;
let orders = 0;
let trust = 100;
let elapsed = 0;
let downtimeRemaining = 0;
let incidentCount = 0;
let nextIncidentAt = 12;
let orderTimer = 0;
const incidentLog = [];
let activeIncident = null;
let eventPaused = false;
let finished = false;
let storeCollapsed = false;
let upgrades = { marketing: 0, mail: 0, account: 0, backup: 0, payment: 0 };
let clockHandle;

function tr(value) {
  return typeof value === 'string' ? value : value[language];
}

function number(value) {
  return Math.round(value).toLocaleString('en-ZA');
}

function money(value) {
  return `R ${number(value)}`;
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-af]').forEach(node => {
    node.innerHTML = node.dataset[language];
  });
  languageToggle.textContent = language === 'en' ? 'AF' : 'EN';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Afrikaans' : 'Skakel oor na Engels');
  updateDisplay();
  if (!document.getElementById('results').hidden) {
    renderEndingCopy();
    renderIncidentReport();
  }
  if (activeIncident && incidentDialog.open) showIncident(activeIncident, true);
}

function actualSalesRate() {
  return 8 + upgrades.marketing * upgradeDefinitions.marketing.income;
}

function currentUpgradeLevel(key) {
  return upgrades[key];
}

function currentCost(key) {
  const definition = upgradeDefinitions[key];
  return definition.baseCost * (upgrades[key] + 1);
}

function updateUpgradeButtons() {
  Object.entries(upgradeDefinitions).forEach(([key, definition]) => {
    const button = document.getElementById(definition.button);
    const costLabel = button.querySelector('span');
    const addMark = button.querySelector('b');
    const maxed = upgrades[key] >= definition.max;
    costLabel.textContent = maxed ? (language === 'en' ? 'MAX' : 'MAKS') : money(currentCost(key));
    addMark.textContent = maxed ? '✓' : '+';
    button.disabled = maxed || cash < currentCost(key) || finished;
    document.getElementById(definition.level).textContent = language === 'en'
      ? `LEVEL ${upgrades[key]} / ${definition.max}`
      : `VLAK ${upgrades[key]} / ${definition.max}`;
  });
  const total = Object.values(upgrades).reduce((sum, level) => sum + level, 0);
  document.getElementById('upgradeCount').textContent = `${total} / 11`;
}

function updateDisplay() {
  document.getElementById('cashBalance').textContent = money(cash);
  document.getElementById('salesRate').textContent = `${money(actualSalesRate())} / ${language === 'en' ? 'SEC' : 'SEK'}`;
  document.getElementById('trustValue').textContent = `${Math.max(0, Math.round(trust))}%`;
  document.getElementById('dayTimer').textContent = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
  document.getElementById('orderCount').textContent = number(orders);
  document.getElementById('grossSales').textContent = money(grossSales);
  const online = downtimeRemaining <= 0;
  document.getElementById('serviceStatus').textContent = online ? (language === 'en' ? 'ONLINE' : 'AANLYN') : (language === 'en' ? 'OFFLINE' : 'VANLYN');
  document.getElementById('serviceStatus').classList.toggle('is-offline', !online);
  document.getElementById('storeState').textContent = online ? (language === 'en' ? 'OPEN' : 'OOP') : (language === 'en' ? 'DISRUPTED' : 'ONTWRIG');
  document.getElementById('mailCount').textContent = String(Math.min(9, 1 + incidentCount));
  document.getElementById('salesPulse').style.width = `${Math.max(5, Math.min(100, actualSalesRate() * 3))}%`;
  document.getElementById('storeCaption').textContent = online
    ? (language === 'en' ? 'The store is open. Incoming orders add to your balance over time.' : 'Die winkel is oop. Inkomende bestellings verhoog jou balans mettertyd.')
    : (language === 'en' ? `Store offline · ${downtimeRemaining}s of simulated interruption remaining.` : `Winkel vanlyn · ${downtimeRemaining}s van gesimuleerde onderbreking oor.`);
  updateUpgradeButtons();
}

function appendEmail({ sender, subject, incident = false }) {
  const feed = document.getElementById('mailFeed');
  const empty = feed.querySelector('.mail-empty');
  if (empty) empty.remove();
  const item = document.createElement('div');
  item.className = `mail-item${incident ? ' mail-threat' : ''}`;
  const icon = document.createElement('span');
  icon.className = 'mail-icon';
  icon.textContent = incident ? '!' : '↗';
  const details = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = tr(subject);
  const source = document.createElement('small');
  source.textContent = sender;
  details.append(title, source);
  const time = document.createElement('time');
  time.textContent = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
  item.append(icon, details, time);
  feed.prepend(item);
  while (feed.children.length > 5) feed.lastElementChild.remove();
}

function tick() {
  if (finished || eventPaused) return;
  elapsed += 1;
  if (downtimeRemaining > 0) {
    downtimeRemaining -= 1;
  } else {
    const income = actualSalesRate() * Math.max(0.35, trust / 100);
    cash += income;
    grossSales += income;
    orderTimer += 1;
    if (orderTimer >= Math.max(3, 6 - upgrades.marketing)) {
      orders += 1;
      orderTimer = 0;
      appendEmail({ sender: 'orders@mossandmirth.shop', subject: { en: 'New customer order confirmed', af: 'Nuwe kliëntebestelling bevestig' } });
    }
  }

  updateDisplay();
  if (elapsed >= nextIncidentAt) {
    triggerIncident();
  }
}

function triggerIncident() {
  const incident = incidentTypes[incidentCount % incidentTypes.length];
  const level = upgrades[incident.upgrade];
  const exposure = 1 + Math.min(1.4, grossSales / 3500) + upgrades.marketing * 0.08;
  const mitigation = Math.max(0.28, 1 - level * 0.3);
  const loss = Math.round(incident.baseLoss * exposure * mitigation);
  const trustImpact = Math.max(2, incident.trustLoss - level * 2);
  const downtime = incident.downtime > 0
    ? Math.max(1, Math.ceil(incident.downtime * (1 - upgrades.backup * 0.35)))
    : 0;

  cash -= loss;
  totalLosses += loss;
  trust = Math.max(0, trust - trustImpact);
  downtimeRemaining = Math.max(downtimeRemaining, downtime);
  incidentCount += 1;
  nextIncidentAt = elapsed + Math.max(15, 23 - Math.floor(incidentCount / 2));
  incidentLog.push({ incident, loss, trustImpact, downtime, elapsed });
  activeIncident = { ...incident, loss, trustImpact, downtime };
  eventPaused = true;
  appendEmail({ sender: incident.sender, subject: incident.subject, incident: true });
  updateDisplay();
  showIncident(activeIncident);
  if (!incidentDialog.open) incidentDialog.showModal();
}

function showIncident(incident) {
  document.getElementById('incidentTime').textContent = document.getElementById('dayTimer').textContent;
  document.getElementById('incidentSender').textContent = incident.sender;
  document.getElementById('incidentSubject').textContent = tr(incident.subject);
  document.getElementById('incidentType').textContent = tr(incident.kind);
  document.getElementById('incidentTitle').textContent = tr(incident.title);
  document.getElementById('incidentStory').textContent = tr(incident.story);
  document.getElementById('incidentCashImpact').textContent = `−${money(incident.loss)}`;
  document.getElementById('incidentTrustImpact').textContent = `−${incident.trustImpact}%`;
  document.getElementById('incidentStoreImpact').textContent = incident.downtime
    ? (language === 'en' ? `${incident.downtime}s OFFLINE` : `${incident.downtime}s VANLYN`)
    : (language === 'en' ? 'OPEN' : 'OOP');
  document.getElementById('incidentExplainer').textContent = tr(incident.explanation);
}

function closeIncident() {
  if (!incidentDialog.open) return;
  incidentDialog.close();
  activeIncident = null;
  eventPaused = false;
  if (cash <= 0 || trust <= 0) {
    endStore(true);
    return;
  }
  document.getElementById('gameStatus').textContent = language === 'en'
    ? 'Incident recorded. The store is back to work.'
    : 'Insident aangeteken. Die winkel gaan voort.';
  updateDisplay();
}

function buyUpgrade(key) {
  const definition = upgradeDefinitions[key];
  if (finished || upgrades[key] >= definition.max) return;
  const cost = currentCost(key);
  if (cash < cost) {
    document.getElementById('gameStatus').textContent = language === 'en'
      ? `Not enough cash for that upgrade. It costs ${money(cost)}.`
      : `Nie genoeg kontant vir daardie opgradering nie. Dit kos ${money(cost)}.`;
    return;
  }
  cash -= cost;
  upgrades[key] += 1;
  const label = document.querySelector(`#${definition.button}`).closest('.upgrade-item').querySelector('h3').textContent;
  document.getElementById('gameStatus').textContent = language === 'en'
    ? `${label} purchased. Available cash: ${money(cash)}.`
    : `${label} gekoop. Beskikbare kontant: ${money(cash)}.`;
  updateDisplay();
}

function endStore(bankrupt = false) {
  if (finished) return;
  finished = true;
  clearInterval(clockHandle);
  if (incidentDialog.open) incidentDialog.close();
  document.getElementById('playfield').hidden = true;
  document.getElementById('results').hidden = false;
  document.getElementById('finalBalance').textContent = money(cash);
  document.getElementById('finalSales').textContent = money(grossSales);
  document.getElementById('finalLosses').textContent = money(totalLosses);
  document.getElementById('finalTrust').textContent = `${Math.round(trust)}%`;
  document.getElementById('finalOrders').textContent = number(orders);
  storeCollapsed = bankrupt;
  renderEndingCopy();
  renderIncidentReport();
  document.getElementById('shareStatus').textContent = '';
  document.getElementById('resultTitle').focus();
}

function renderEndingCopy() {
  document.getElementById('businessStatus').textContent = storeCollapsed
    ? (language === 'en' ? 'CASH FLOW COLLAPSED' : 'KONTANTVLOEI INEENGESTORT')
    : (language === 'en' ? 'SHIFT COMPLETE' : 'SKOF VOLTOOI');
  document.getElementById('resultMessage').textContent = storeCollapsed
    ? (language === 'en' ? 'The shop ran out of cash or customer trust. Review the incident costs and see how quickly simulated losses can overwhelm a small business.' : 'Die winkel het sonder kontant of kliëntevertroue gelaat. Kyk na die insidentkoste en sien hoe vinnig gesimuleerde verliese ’n klein besigheid kan oorweldig.')
    : (language === 'en' ? `You kept the store open for ${Math.floor(elapsed / 60)}m ${elapsed % 60}s. Sales reached ${money(grossSales)}, while simulated incidents cost ${money(totalLosses)}.` : `Jy het die winkel vir ${Math.floor(elapsed / 60)}m ${elapsed % 60}s oopgehou. Verkope het ${money(grossSales)} bereik, terwyl gesimuleerde insidente ${money(totalLosses)} gekos het.`);
}

function renderIncidentReport() {
  const report = document.getElementById('incidentReport');
  report.replaceChildren();
  const heading = document.createElement('p');
  heading.className = 'panel-kicker';
  heading.textContent = language === 'en'
    ? `INCIDENT EMAIL LOG · ${incidentLog.length}`
    : `INSIDENT-E-POSLOG · ${incidentLog.length}`;
  report.append(heading);

  if (incidentLog.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'incident-log-empty';
    empty.textContent = language === 'en'
      ? 'No incident emails arrived before the books were closed.'
      : 'Geen insident-e-posse het aangekom voordat die boeke toegemaak is nie.';
    report.append(empty);
    return;
  }

  incidentLog.forEach(entry => {
    const row = document.createElement('article');
    row.className = 'incident-log-row';
    const copy = document.createElement('div');
    const category = document.createElement('span');
    category.textContent = tr(entry.incident.kind);
    const title = document.createElement('strong');
    title.textContent = tr(entry.incident.title);
    copy.append(category, title);
    const time = document.createElement('time');
    time.textContent = `${String(Math.floor(entry.elapsed / 60)).padStart(2, '0')}:${String(entry.elapsed % 60).padStart(2, '0')}`;
    const impacts = document.createElement('span');
    impacts.textContent = `${language === 'en' ? 'Cash' : 'Kontant'} −${money(entry.loss)} · ${language === 'en' ? 'Trust' : 'Vertroue'} −${entry.trustImpact}%${entry.downtime ? ` · ${entry.downtime}s ${language === 'en' ? 'offline' : 'vanlyn'}` : ''}`;
    row.append(time, copy, impacts);
    report.append(row);
  });
}

function restartStore() {
  clearInterval(clockHandle);
  cash = 850;
  grossSales = 0;
  totalLosses = 0;
  orders = 0;
  trust = 100;
  elapsed = 0;
  downtimeRemaining = 0;
  incidentCount = 0;
  nextIncidentAt = 12;
  orderTimer = 0;
  incidentLog.length = 0;
  activeIncident = null;
  eventPaused = false;
  finished = false;
  storeCollapsed = false;
  upgrades = { marketing: 0, mail: 0, account: 0, backup: 0, payment: 0 };
  document.getElementById('mailFeed').replaceChildren();
  document.getElementById('results').hidden = true;
  document.getElementById('playfield').hidden = false;
  document.getElementById('gameStatus').textContent = language === 'en'
    ? 'Sales are running. Incoming incidents are simulated.'
    : 'Verkope loop. Inkomende insidente is gesimuleer.';
  updateDisplay();
  clockHandle = setInterval(tick, 1000);
}

function shareOnFacebook() {
  const quote = language === 'en'
    ? `My shop ended with ${money(cash)} after ${incidentCount} simulated security incidents. See what happens to your business.`
    : `My winkel het met ${money(cash)} geëindig ná ${incidentCount} gesimuleerde sekuriteitsinsidente. Kyk wat met jou besigheid gebeur.`;
  const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  shareUrl.searchParams.set('u', 'https://rubust7997.github.io/Wraith.Sec/cyber-game/');
  shareUrl.searchParams.set('quote', quote);
  window.open(shareUrl.toString(), '_blank', 'noopener,noreferrer');
}

async function copyGameLink() {
  const status = document.getElementById('shareStatus');
  try {
    await navigator.clipboard.writeText('https://rubust7997.github.io/Wraith.Sec/cyber-game/');
    status.textContent = language === 'en' ? 'Game link copied.' : 'Spelskakel gekopieer.';
  } catch {
    status.textContent = 'https://rubust7997.github.io/Wraith.Sec/cyber-game/';
  }
}

document.getElementById('marketingUpgrade').addEventListener('click', () => buyUpgrade('marketing'));
document.getElementById('mailUpgrade').addEventListener('click', () => buyUpgrade('mail'));
document.getElementById('accountUpgrade').addEventListener('click', () => buyUpgrade('account'));
document.getElementById('backupUpgrade').addEventListener('click', () => buyUpgrade('backup'));
document.getElementById('paymentUpgrade').addEventListener('click', () => buyUpgrade('payment'));
document.getElementById('endShiftButton').addEventListener('click', () => endStore(false));
document.getElementById('incidentContinue').addEventListener('click', closeIncident);
incidentDialog.addEventListener('cancel', event => event.preventDefault());
languageToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'af' : 'en'));
document.getElementById('replayButton').addEventListener('click', restartStore);
document.getElementById('shareButton').addEventListener('click', shareOnFacebook);
document.getElementById('copyButton').addEventListener('click', copyGameLink);
updateDisplay();
clockHandle = setInterval(tick, 1000);
