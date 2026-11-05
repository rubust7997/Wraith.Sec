const DAY_SECONDS = 60;
const BASE_CASH = 1400;

const products = [
  { id: 'mug', name: { en: 'Stoneware mug', af: 'Steengoedbeker' }, category: { en: 'HOME GOODS', af: 'HUISWARE' }, price: 135, unitCost: 55, stock: 5, batch: 5, timer: 0, interval: 5, soldToday: 0, soldTotal: 0 },
  { id: 'tote', name: { en: 'Canvas tote', af: 'Seiltassak' }, category: { en: 'ACCESSORIES', af: 'BYKOMSTIGHEDE' }, price: 195, unitCost: 75, stock: 4, batch: 4, timer: 0, interval: 8, soldToday: 0, soldTotal: 0 },
  { id: 'planter', name: { en: 'Desk planter', af: 'Skriftafelplanter' }, category: { en: 'LIVING', af: 'LEWENDE GOEDERE' }, price: 295, unitCost: 110, stock: 3, batch: 3, timer: 0, interval: 12, soldToday: 0, soldTotal: 0 }
];

const incidents = [
  {
    kind: { en: 'PAYMENT DIVERSION', af: 'BETALINGSOMLEIDING' },
    sender: 'accounts@northstar-supply.co',
    subject: { en: 'Updated supplier payment details', af: 'Opgedateerde verskafferbetalingsbesonderhede' },
    title: { en: 'A supplier payment went to the wrong place.', af: '’n Verskafferbetaling het na die verkeerde plek gegaan.' },
    story: { en: 'A convincing supplier email changed where an invoice was paid. The money is gone from the shop account, and the real supplier still expects payment.', af: '’n Oortuigende verskaffer-e-pos het verander waar ’n faktuur betaal is. Die geld is uit die winkelrekening, en die regte verskaffer verwag steeds betaling.' },
    explanation: { en: 'This simulated business email compromise diverts a supplier payment. The financial hit increases as the storefront grows.', af: 'Hierdie gesimuleerde besigheidse-posbedrog lei ’n verskafferbetaling om. Die finansiële impak neem toe namate die winkel groei.' },
    baseLoss: 145, trustLoss: 5, upgrade: 'mail', downtime: 0
  },
  {
    kind: { en: 'ACCOUNT TAKEOVER', af: 'REKENINGOORNAME' },
    sender: 'security-alert@store-admin.help',
    subject: { en: 'New administrator sign-in', af: 'Nuwe administrateur-aanmelding' },
    title: { en: 'Someone else took over the store account.', af: 'Iemand anders het die winkelrekening oorgeneem.' },
    story: { en: 'The shop owner can no longer access the admin panel. Orders are delayed while account access is recovered, and several customers leave before checkout.', af: 'Die winkeleienaar kan nie meer toegang tot die administrasiepaneel kry nie. Bestellings word vertraag terwyl rekeningtoegang herstel word, en verskeie kliënte verlaat die betaalproses.' },
    explanation: { en: 'A compromised business account can interrupt operations and customer access. As the shop handles more orders, the disruption costs more.', af: '’n Gekompromitteerde besigheidsrekening kan bedrywighede en kliëntetoegang onderbreek. Namate die winkel meer bestellings hanteer, kos die ontwrigting meer.' },
    baseLoss: 130, trustLoss: 10, upgrade: 'account', downtime: 8
  },
  {
    kind: { en: 'CUSTOMER DATA EXPOSURE', af: 'KLIËNTDATABLOOTSTELLING' },
    sender: 'privacy-notice@outside-mail.net',
    subject: { en: 'Customer details shared outside the business', af: 'Kliëntbesonderhede buite die besigheid gedeel' },
    title: { en: 'Customer information was exposed.', af: 'Kliëntinligting is blootgestel.' },
    story: { en: 'A customer list has appeared where it should not be. Support requests arrive, staff time shifts to incident response, and customers become less confident in the store.', af: '’n Kliëntelys het verskyn waar dit nie hoort nie. Ondersteuningsversoeke kom in, personeeltyd skuif na insidentreaksie, en kliënte vertrou die winkel minder.' },
    explanation: { en: 'A data exposure creates response costs and can damage customer confidence. The simulated impact scales with accumulated business value.', af: '’n Datablootstelling veroorsaak reaksiekoste en kan kliëntevertroue skaad. Die gesimuleerde impak skaal met die opgehoopte besigheidswaarde.' },
    baseLoss: 150, trustLoss: 14, upgrade: 'mail', downtime: 2
  },
  {
    kind: { en: 'STORE OUTAGE', af: 'WINKELONDERBREKING' },
    sender: 'hosting-status@service-desk.notice',
    subject: { en: 'Your storefront is unavailable', af: 'Jou aanlynwinkel is nie beskikbaar nie' },
    title: { en: 'Customers cannot reach the storefront.', af: 'Kliënte kan nie die aanlynwinkel bereik nie.' },
    story: { en: 'The storefront goes offline during a busy period. Orders stop arriving while visitors see an error instead of products, and the shop still carries its daily costs.', af: 'Die aanlynwinkel gaan tydens ’n besige tyd vanlyn. Bestellings hou op inkom terwyl besoekers ’n fout in plaas van produkte sien, en die winkel het steeds daaglikse kostes.' },
    explanation: { en: 'An availability incident turns every offline moment into missed sales. The interruption grows more costly as daily demand increases.', af: '’n Beskikbaarheidsinsident verander elke vanlyn oomblik in gemiste verkope. Die onderbreking word duurder namate daaglikse vraag toeneem.' },
    baseLoss: 110, trustLoss: 7, upgrade: 'backup', downtime: 12
  },
  {
    kind: { en: 'PAYMENT DISPUTES', af: 'BETALINGSGESKILLE' },
    sender: 'payments-review@checkout-audit.info',
    subject: { en: 'Several orders are under review', af: 'Verskeie bestellings word nagegaan' },
    title: { en: 'Suspicious checkout activity drained the margin.', af: 'Verdagte betaalaktiwiteit het die winsmarge opgebruik.' },
    story: { en: 'A wave of disputed orders creates refunds, fees, and extra work. Gross sales looked healthy, but the available cash drops after the claims arrive.', af: '’n Vlaag bestellingsdispute veroorsaak terugbetalings, fooie en ekstra werk. Bruto verkope het goed gelyk, maar beskikbare kontant daal wanneer die eise inkom.' },
    explanation: { en: 'Fraud and disputes can turn apparent sales into direct costs. The simulated financial hit grows with checkout volume.', af: 'Bedrog en dispute kan oënskynlike verkope in direkte koste verander. Die gesimuleerde finansiële impak groei saam met betaalvolume.' },
    baseLoss: 160, trustLoss: 8, upgrade: 'payment', downtime: 0
  }
];

const upgradeDefinitions = {
  marketing: { button: 'marketingUpgrade', level: 'marketingLevel', baseCost: 300, max: 3, saleBoost: 1 },
  mail: { button: 'mailUpgrade', level: 'mailLevel', baseCost: 420, max: 2 },
  account: { button: 'accountUpgrade', level: 'accountLevel', baseCost: 520, max: 2 },
  backup: { button: 'backupUpgrade', level: 'backupLevel', baseCost: 460, max: 2 },
  payment: { button: 'paymentUpgrade', level: 'paymentLevel', baseCost: 580, max: 2 }
};

const languageToggle = document.getElementById('languageToggle');
const musicToggle = document.getElementById('musicToggle');
const ambientMusic = document.getElementById('ambientMusic');
const welcomeDialog = document.getElementById('welcomeDialog');
const dayDialog = document.getElementById('dayDialog');
const incidentDialog = document.getElementById('incidentDialog');
const responseLog = [];

let language = 'en';
let businessName = '';
let cash = BASE_CASH;
let grossSales = 0;
let daySales = 0;
let totalLosses = 0;
let operatingCosts = 0;
let stockCosts = 0;
let orders = 0;
let dayOrders = 0;
let trust = 100;
let day = 0;
let daySeconds = 0;
let totalOpenSeconds = 0;
let downtimeRemaining = 0;
let incidentCount = 0;
let nextIncidentAt = 18;
let phase = 'welcome';
let eventPaused = false;
let musicEnabled = true;
let currentIncident = null;
let closingCost = 0;
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

function inventoryValue() {
  return products.reduce((sum, product) => sum + product.stock * product.unitCost, 0);
}

function threatScale() {
  const businessValue = Math.max(0, cash) + grossSales * 0.42 + inventoryValue();
  return Math.min(5.2, 0.75 + businessValue / 2600 + Math.max(0, day - 1) * 0.28 + upgrades.marketing * 0.14);
}

function threatLabel(scale = threatScale()) {
  if (scale < 1.7) return language === 'en' ? 'LOW' : 'LAAG';
  if (scale < 2.5) return language === 'en' ? 'WATCH' : 'WAAK';
  if (scale < 3.5) return language === 'en' ? 'HIGH' : 'HOOG';
  return language === 'en' ? 'CRITICAL' : 'KRITIES';
}

function businessClock() {
  const minutesAfterOpen = Math.floor((daySeconds / DAY_SECONDS) * 480);
  const totalMinutes = 9 * 60 + minutesAfterOpen;
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
}

function setStatus(message) {
  document.getElementById('gameStatus').textContent = message;
}

function updateLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-af]').forEach(node => {
    node.innerHTML = node.dataset[language];
  });
  document.querySelectorAll('[data-en-placeholder][data-af-placeholder]').forEach(node => {
    node.placeholder = node.dataset[`${language}Placeholder`];
  });
  languageToggle.textContent = language === 'en' ? 'AF' : 'EN';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Afrikaans' : 'Skakel oor na Engels');
  renderInventory();
  updateDisplay();
  if (welcomeDialog.open) document.getElementById('businessNameInput').focus();
  if (dayDialog.open) renderDaySummary();
  if (incidentDialog.open && currentIncident) renderIncident(currentIncident);
  if (phase === 'ended') renderFinalReport();
}

function renderInventory() {
  const list = document.getElementById('itemGrid');
  if (!list) return;
  list.replaceChildren();

  products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.dataset.product = product.id;

    const titleRow = document.createElement('div');
    titleRow.className = 'item-title-row';
    const productInfo = document.createElement('div');
    const category = document.createElement('span');
    category.className = 'item-category';
    category.textContent = tr(product.category);
    const title = document.createElement('h3');
    title.textContent = tr(product.name);
    productInfo.append(category, title);
    const price = document.createElement('strong');
    price.className = 'item-price';
    price.textContent = money(product.price);
    titleRow.append(productInfo, price);

    const stockInfo = document.createElement('div');
    stockInfo.className = 'item-stock-info';
    const stockCount = document.createElement('span');
    stockCount.id = `stock-${product.id}`;
    const soldCount = document.createElement('span');
    soldCount.id = `sold-${product.id}`;
    stockInfo.append(stockCount, soldCount);

    const stockTrack = document.createElement('div');
    stockTrack.className = 'stock-track';
    const stockBar = document.createElement('span');
    stockBar.id = `stockBar-${product.id}`;
    stockTrack.append(stockBar);

    const restock = document.createElement('button');
    restock.className = 'restock-button';
    restock.type = 'button';
    restock.id = `restock-${product.id}`;
    restock.addEventListener('click', () => buyStock(product.id));

    card.append(titleRow, stockInfo, stockTrack, restock);
    list.append(card);
  });
  updateInventoryCards();
}

function updateInventoryCards() {
  const open = phase === 'open';
  products.forEach(product => {
    const stockCount = document.getElementById(`stock-${product.id}`);
    if (!stockCount) return;
    const soldCount = document.getElementById(`sold-${product.id}`);
    const restock = document.getElementById(`restock-${product.id}`);
    const stockBar = document.getElementById(`stockBar-${product.id}`);
    const price = product.unitCost * product.batch;
    stockCount.textContent = language === 'en' ? `IN STOCK · ${product.stock}` : `IN VORRAAD · ${product.stock}`;
    soldCount.textContent = language === 'en' ? `SOLD TODAY · ${product.soldToday}` : `VANDAG VERKOOP · ${product.soldToday}`;
    stockBar.style.width = `${Math.min(100, (product.stock / (product.batch * 2)) * 100)}%`;
    stockBar.classList.toggle('is-low', product.stock <= 2);
    restock.innerHTML = `<span>${language === 'en' ? 'Restock' : 'Vul aan'} +${product.batch}</span><b>${money(price)}</b>`;
    restock.setAttribute('aria-label', language === 'en'
      ? `Restock ${product.name.en}, ${product.batch} units for ${money(price)}`
      : `Vul ${product.name.af} aan, ${product.batch} eenhede vir ${money(price)}`);
    restock.disabled = !open || cash < price;
  });
  const units = products.reduce((sum, product) => sum + product.stock, 0);
  document.getElementById('stockTotal').textContent = language === 'en' ? `${units} units` : `${units} eenhede`;
}

function updateUpgradeButtons() {
  Object.entries(upgradeDefinitions).forEach(([key, definition]) => {
    const button = document.getElementById(definition.button);
    const costLabel = button.querySelector('span');
    const addMark = button.querySelector('b');
    const maxed = upgrades[key] >= definition.max;
    costLabel.textContent = maxed ? (language === 'en' ? 'MAX' : 'MAKS') : money(definition.baseCost * (upgrades[key] + 1));
    addMark.textContent = maxed ? '✓' : '+';
    button.disabled = phase !== 'open' || maxed || cash < definition.baseCost * (upgrades[key] + 1);
    document.getElementById(definition.level).textContent = language === 'en'
      ? `LEVEL ${upgrades[key]} / ${definition.max}`
      : `VLAK ${upgrades[key]} / ${definition.max}`;
  });
  const total = Object.values(upgrades).reduce((sum, level) => sum + level, 0);
  document.getElementById('upgradeCount').textContent = `${total} / 11`;
}

function updateDisplay() {
  document.getElementById('cashBalance').textContent = money(cash);
  document.getElementById('trustValue').textContent = `${Math.max(0, Math.round(trust))}%`;
  document.getElementById('dayTimer').textContent = day
    ? `${language === 'en' ? 'DAY' : 'DAG'} ${String(day).padStart(2, '0')} · ${businessClock()}`
    : (language === 'en' ? 'NOT OPEN' : 'NOG TOE');
  document.getElementById('threatPressure').textContent = threatLabel();
  document.getElementById('threatPressure').dataset.level = threatScale() >= 3.5 ? 'critical' : threatScale() >= 2.5 ? 'high' : threatScale() >= 1.7 ? 'watch' : 'low';
  document.getElementById('orderCount').textContent = number(dayOrders);
  document.getElementById('grossSales').textContent = money(daySales);
  document.getElementById('serviceStatus').textContent = downtimeRemaining > 0
    ? (language === 'en' ? 'OFFLINE' : 'VANLYN')
    : (language === 'en' ? 'ONLINE' : 'AANLYN');
  document.getElementById('serviceStatus').classList.toggle('is-offline', downtimeRemaining > 0);
  document.getElementById('storeState').textContent = phase === 'open'
    ? (downtimeRemaining > 0 ? (language === 'en' ? 'DISRUPTED' : 'ONTWRIG') : (language === 'en' ? 'OPEN' : 'OOP'))
    : (language === 'en' ? 'CLOSED' : 'GESLUIT');
  document.getElementById('mailCount').textContent = String(Math.min(99, 1 + incidentCount + dayOrders));
  document.getElementById('salesPulse').style.width = `${Math.max(4, Math.min(100, products.reduce((sum, product) => sum + product.stock, 0) * 4))}%`;
  document.getElementById('storeCaption').textContent = phase === 'open'
    ? downtimeRemaining > 0
      ? (language === 'en' ? `Store offline · ${downtimeRemaining}s of simulated disruption remaining.` : `Winkel vanlyn · ${downtimeRemaining}s van gesimuleerde onderbreking oor.`)
      : (language === 'en' ? 'Orders arrive while the shop is open. Product sales require available stock.' : 'Bestellings kom in terwyl die winkel oop is. Produkverkope benodig beskikbare voorraad.')
    : (language === 'en' ? 'The shop is closed. Open the next business day to resume sales.' : 'Die winkel is gesluit. Maak die volgende besigheidsdag oop om verkope te hervat.');
  updateUpgradeButtons();
  updateInventoryCards();
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
  time.textContent = businessClock();
  item.append(icon, details, time);
  feed.prepend(item);
  while (feed.children.length > 6) feed.lastElementChild.remove();
}

function recordOrder(product) {
  product.stock -= 1;
  product.soldToday += 1;
  product.soldTotal += 1;
  dayOrders += 1;
  orders += 1;
  daySales += product.price;
  grossSales += product.price;
  cash += product.price;
  appendEmail({
    sender: 'orders@' + businessName.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 18) + '.shop',
    subject: {
      en: `New ${tr(product.name).toLowerCase()} order · ${money(product.price)}`,
      af: `Nuwe ${tr(product.name).toLowerCase()} bestelling · ${money(product.price)}`
    }
  });
}

function tick() {
  if (phase !== 'open' || eventPaused) return;
  daySeconds += 1;
  totalOpenSeconds += 1;

  if (downtimeRemaining > 0) {
    downtimeRemaining -= 1;
  } else {
    products.forEach(product => {
      if (product.stock <= 0) return;
      product.timer += 1;
      const interval = Math.max(3, product.interval - upgrades.marketing * upgradeDefinitions.marketing.saleBoost);
      if (product.timer >= interval) {
        product.timer = 0;
        recordOrder(product);
      }
    });
  }

  updateDisplay();
  if (totalOpenSeconds >= nextIncidentAt) {
    triggerIncident();
    return;
  }
  if (daySeconds >= DAY_SECONDS) closeDay();
}

function triggerIncident() {
  const incident = incidents[incidentCount % incidents.length];
  const scale = threatScale();
  const level = upgrades[incident.upgrade];
  const mitigation = Math.max(0.35, 1 - level * 0.28);
  const loss = Math.round(incident.baseLoss * scale * mitigation);
  const trustLoss = Math.max(2, incident.trustLoss - level * 2);
  const downtime = incident.downtime > 0
    ? Math.max(1, Math.ceil(incident.downtime * (1 - upgrades.backup * 0.35)))
    : 0;

  cash -= loss;
  totalLosses += loss;
  trust = Math.max(0, trust - trustLoss);
  downtimeRemaining = Math.max(downtimeRemaining, downtime);
  incidentCount += 1;
  nextIncidentAt = totalOpenSeconds + Math.max(12, 31 - Math.floor(scale * 4));
  responseLog.push({ incident, loss, trustLoss, downtime, day, time: businessClock(), scale });
  currentIncident = { ...incident, loss, trustLoss, downtime, scale };
  eventPaused = true;
  appendEmail({ sender: incident.sender, subject: incident.subject, incident: true });
  updateDisplay();
  renderIncident(currentIncident);
  incidentDialog.showModal();
}

function renderIncident(incident) {
  document.getElementById('incidentTime').textContent = `${language === 'en' ? 'DAY' : 'DAG'} ${String(day).padStart(2, '0')} · ${businessClock()}`;
  document.getElementById('incidentSender').textContent = incident.sender;
  document.getElementById('incidentSubject').textContent = tr(incident.subject);
  document.getElementById('incidentType').textContent = tr(incident.kind);
  document.getElementById('incidentTitle').textContent = tr(incident.title);
  document.getElementById('incidentStory').textContent = tr(incident.story);
  document.getElementById('incidentCashImpact').textContent = `−${money(incident.loss)}`;
  document.getElementById('incidentTrustImpact').textContent = `−${incident.trustLoss}%`;
  document.getElementById('incidentStoreImpact').textContent = incident.downtime
    ? (language === 'en' ? `${incident.downtime} min offline` : `${incident.downtime} min vanlyn`)
    : (language === 'en' ? 'OPEN' : 'OOP');
  document.getElementById('incidentScale').textContent = `${threatLabel(incident.scale)} · ×${incident.scale.toFixed(1)}`;
  document.getElementById('incidentExplainer').textContent = tr(incident.explanation);
}

function closeIncident() {
  if (!incidentDialog.open) return;
  incidentDialog.close();
  currentIncident = null;
  eventPaused = false;
  if (cash <= 0 || trust <= 0) {
    endBusiness(true);
    return;
  }
  setStatus(language === 'en' ? 'Incident recorded. The store is back to work.' : 'Insident aangeteken. Die winkel gaan voort.');
  updateDisplay();
}

function openWelcome() {
  renderInventory();
  updateDisplay();
  welcomeDialog.showModal();
  document.getElementById('businessNameInput').focus();
}

function startBusiness(event) {
  event.preventDefault();
  const input = document.getElementById('businessNameInput');
  businessName = input.value.trim().slice(0, 36);
  if (!businessName) {
    input.focus();
    return;
  }
  document.getElementById('storeTitle').textContent = businessName;
  welcomeDialog.close();
  musicEnabled = true;
  updateMusicControl();
  ambientMusic.volume = 0.18;
  ambientMusic.play().catch(() => {
    musicEnabled = false;
    updateMusicControl();
    setStatus(language === 'en' ? 'Shop opened. Tap the music control to start ambient audio.' : 'Winkel oop. Druk die musiekbeheer om agtergrondklank te begin.');
  });
  openNextDay(true);
  clockHandle = setInterval(tick, 1000);
}

function buyStock(productId) {
  if (phase !== 'open') return;
  const product = products.find(item => item.id === productId);
  if (!product) return;
  const cost = product.unitCost * product.batch;
  if (cash < cost) {
    setStatus(language === 'en' ? `Not enough cash to restock ${tr(product.name)}.` : `Nie genoeg kontant om ${tr(product.name)} aan te vul nie.`);
    return;
  }
  cash -= cost;
  stockCosts += cost;
  product.stock += product.batch;
  setStatus(language === 'en'
    ? `${product.batch} ${tr(product.name)} added to stock for ${money(cost)}.`
    : `${product.batch} ${tr(product.name)} by voorraad gevoeg vir ${money(cost)}.`);
  updateDisplay();
}

function buyUpgrade(key) {
  if (phase !== 'open') return;
  const definition = upgradeDefinitions[key];
  if (!definition || upgrades[key] >= definition.max) return;
  const cost = definition.baseCost * (upgrades[key] + 1);
  if (cash < cost) {
    setStatus(language === 'en' ? `That upgrade costs ${money(cost)}.` : `Daardie opgradering kos ${money(cost)}.`);
    return;
  }
  cash -= cost;
  upgrades[key] += 1;
  const label = document.getElementById(definition.button).closest('.upgrade-item').querySelector('h3').textContent;
  setStatus(language === 'en' ? `${label} purchased for ${money(cost)}.` : `${label} gekoop vir ${money(cost)}.`);
  updateDisplay();
}

function closeDay() {
  if (phase !== 'open' || eventPaused) return;
  phase = 'closeout';
  closingCost = 150 + Math.round(daySales * 0.06) + upgrades.marketing * 20;
  cash -= closingCost;
  operatingCosts += closingCost;
  updateDisplay();
  if (cash <= 0 || trust <= 0) {
    endBusiness(true);
    return;
  }
  renderDaySummary();
  dayDialog.showModal();
}

function renderDaySummary() {
  document.getElementById('closedDayLabel').textContent = `${language === 'en' ? 'DAY' : 'DAG'} ${String(day).padStart(2, '0')}`;
  document.getElementById('dayResultTitle').textContent = language === 'en'
    ? `Day ${String(day).padStart(2, '0')} complete`
    : `Dag ${String(day).padStart(2, '0')} voltooi`;
  document.getElementById('dayResultCopy').textContent = language === 'en'
    ? `${number(dayOrders)} orders brought in ${money(daySales)}. Daily operating costs were ${money(closingCost)}. The business closes with ${money(cash)} available.`
    : `${number(dayOrders)} bestellings het ${money(daySales)} ingebring. Daaglikse bedryfskoste was ${money(closingCost)}. Die besigheid sluit met ${money(cash)} beskikbaar.`;
  const ledger = document.getElementById('dayLedger');
  ledger.replaceChildren();
  products.forEach(product => {
    const row = document.createElement('div');
    row.className = 'day-ledger-row';
    const label = document.createElement('span');
    label.textContent = tr(product.name);
    const detail = document.createElement('strong');
    detail.textContent = language === 'en'
      ? `${product.soldToday} sold · ${product.stock} left`
      : `${product.soldToday} verkoop · ${product.stock} oor`;
    row.append(label, detail);
    ledger.append(row);
  });
  const closeRow = document.createElement('div');
  closeRow.className = 'day-ledger-row day-ledger-total';
  closeRow.innerHTML = `<span>${language === 'en' ? 'OPERATING COSTS' : 'BEDRYFSKOSTE'}</span><strong>−${money(closingCost)}</strong>`;
  ledger.append(closeRow);
}

function openNextDay(firstDay = false) {
  if (dayDialog.open) dayDialog.close();
  if (firstDay) day = 1;
  else day += 1;
  daySeconds = 0;
  daySales = 0;
  dayOrders = 0;
  products.forEach(product => {
    product.soldToday = 0;
    product.timer = 0;
  });
  phase = 'open';
  eventPaused = false;
  document.getElementById('closeDayButton').disabled = false;
  setStatus(language === 'en'
    ? `Day ${String(day).padStart(2, '0')} is open. Customers are browsing.`
    : `Dag ${String(day).padStart(2, '0')} is oop. Kliënte blaai deur.`);
  updateDisplay();
}

function endBusiness(bankrupt = false) {
  if (phase === 'ended') return;
  phase = 'ended';
  clearInterval(clockHandle);
  if (incidentDialog.open) incidentDialog.close();
  if (dayDialog.open) dayDialog.close();
  document.getElementById('playfield').hidden = true;
  document.getElementById('results').hidden = false;
  document.getElementById('finalBalance').textContent = money(cash);
  document.getElementById('finalSales').textContent = money(grossSales);
  document.getElementById('finalStockCosts').textContent = money(stockCosts);
  document.getElementById('finalOperatingCosts').textContent = money(operatingCosts);
  document.getElementById('finalLosses').textContent = money(totalLosses);
  document.getElementById('finalTrust').textContent = `${Math.round(trust)}%`;
  document.getElementById('finalOrders').textContent = number(orders);
  document.getElementById('businessStatus').textContent = bankrupt
    ? (language === 'en' ? 'CASH FLOW COLLAPSED' : 'KONTANTVLOEI INEENGESTORT')
    : (language === 'en' ? `${day} DAYS IN BUSINESS` : `${day} DAE IN BESIGHEID`);
  renderFinalReport(bankrupt);
  document.getElementById('shareStatus').textContent = '';
  document.getElementById('resultTitle').focus();
}

let endedAsBankrupt = false;
function renderFinalReport(bankrupt = endedAsBankrupt) {
  endedAsBankrupt = bankrupt;
  document.getElementById('businessStatus').textContent = bankrupt
    ? (language === 'en' ? 'CASH FLOW COLLAPSED' : 'KONTANTVLOEI INEENGESTORT')
    : (language === 'en' ? `${day} DAYS IN BUSINESS` : `${day} DAE IN BESIGHEID`);
  document.getElementById('resultMessage').textContent = language === 'en'
    ? `${businessName} ran for ${day} business days. It recorded ${money(grossSales)} in sales, ${money(totalLosses)} in incident losses, and ${money(operatingCosts)} in operating costs.`
    : `${businessName} het vir ${day} besigheidsdae bedryf. Dit het ${money(grossSales)} in verkope, ${money(totalLosses)} in insidentverliese en ${money(operatingCosts)} in bedryfskoste aangeteken.`;
  document.getElementById('resultTitle').textContent = bankrupt
    ? (language === 'en' ? 'Growth met a hard stop.' : 'Groei het tot stilstand gekom.')
    : (language === 'en' ? 'The shop closes on your terms.' : 'Die winkel sluit op jou terme.');
  const report = document.getElementById('incidentReport');
  report.replaceChildren();
  const heading = document.createElement('p');
  heading.className = 'panel-kicker';
  heading.textContent = language === 'en' ? `INCIDENT EMAIL LOG · ${responseLog.length}` : `INSIDENT-E-POSLOG · ${responseLog.length}`;
  report.append(heading);
  responseLog.forEach(entry => {
    const row = document.createElement('article');
    row.className = 'incident-log-row';
    const copy = document.createElement('div');
    const category = document.createElement('span');
    category.textContent = tr(entry.incident.kind);
    const title = document.createElement('strong');
    title.textContent = `${tr(entry.incident.title)} · ${language === 'en' ? 'Threat' : 'Bedreiging'} ×${entry.scale.toFixed(1)}`;
    copy.append(category, title);
    const time = document.createElement('time');
    time.textContent = `${language === 'en' ? 'DAY' : 'DAG'} ${entry.day} · ${entry.time}`;
    const impacts = document.createElement('span');
    impacts.textContent = `${language === 'en' ? 'Cash' : 'Kontant'} −${money(entry.loss)} · ${language === 'en' ? 'Trust' : 'Vertroue'} −${entry.trustLoss}%`;
    row.append(time, copy, impacts);
    report.append(row);
  });
  if (!responseLog.length) {
    const empty = document.createElement('p');
    empty.className = 'incident-log-empty';
    empty.textContent = language === 'en' ? 'No threat emails arrived during this run.' : 'Geen bedreigingse-posse het tydens hierdie lopie aangekom nie.';
    report.append(empty);
  }
}

function restartBusiness() {
  clearInterval(clockHandle);
  cash = BASE_CASH;
  grossSales = 0;
  daySales = 0;
  totalLosses = 0;
  operatingCosts = 0;
  stockCosts = 0;
  orders = 0;
  dayOrders = 0;
  trust = 100;
  day = 0;
  daySeconds = 0;
  totalOpenSeconds = 0;
  downtimeRemaining = 0;
  incidentCount = 0;
  nextIncidentAt = 18;
  phase = 'welcome';
  eventPaused = false;
  currentIncident = null;
  closingCost = 0;
  endedAsBankrupt = false;
  responseLog.length = 0;
  upgrades = { marketing: 0, mail: 0, account: 0, backup: 0, payment: 0 };
  products.forEach(product => {
    product.stock = product.id === 'mug' ? 5 : product.id === 'tote' ? 4 : 3;
    product.timer = 0;
    product.soldToday = 0;
    product.soldTotal = 0;
  });
  document.getElementById('mailFeed').replaceChildren();
  document.getElementById('playfield').hidden = false;
  document.getElementById('results').hidden = true;
  document.getElementById('businessNameInput').value = '';
  document.getElementById('storeTitle').textContent = language === 'en' ? 'Your Shop' : 'Jou Winkel';
  renderInventory();
  updateDisplay();
  welcomeDialog.showModal();
}

function toggleMusic() {
  musicEnabled = !musicEnabled;
  updateMusicControl();
  if (musicEnabled) {
    ambientMusic.play().catch(() => {
      musicEnabled = false;
      updateMusicControl();
      setStatus(language === 'en' ? 'Ambient music could not start in this browser.' : 'Agtergrondmusiek kon nie in hierdie blaaier begin nie.');
    });
  } else {
    ambientMusic.pause();
  }
}

function updateMusicControl() {
  musicToggle.setAttribute('aria-pressed', String(musicEnabled));
  musicToggle.setAttribute('aria-label', musicEnabled
    ? (language === 'en' ? 'Mute ambient music' : 'Demp agtergrondmusiek')
    : (language === 'en' ? 'Enable ambient music' : 'Skakel agtergrondmusiek aan'));
  document.getElementById('musicState').textContent = musicEnabled
    ? (language === 'en' ? 'ON' : 'AAN')
    : (language === 'en' ? 'OFF' : 'AF');
}

function shareOnFacebook() {
  const quote = language === 'en'
    ? `${businessName} closed after ${day} days with ${money(cash)} left. Simulated cyber incidents cost the shop ${money(totalLosses)}. How would your business hold up?`
    : `${businessName} het ná ${day} dae met ${money(cash)} oorgebly. Gesimuleerde kuberinsidente het die winkel ${money(totalLosses)} gekos. Hoe sou jou besigheid vaar?`;
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

function startBusinessFromForm(event) {
  event.preventDefault();
  const input = document.getElementById('businessNameInput');
  businessName = input.value.trim().slice(0, 36);
  if (!businessName) return input.focus();
  document.getElementById('storeTitle').textContent = businessName;
  welcomeDialog.close();
  ambientMusic.volume = 0.18;
  if (musicEnabled) {
    ambientMusic.play().catch(() => {
      musicEnabled = false;
      updateMusicControl();
      setStatus(language === 'en' ? 'Shop opened. Tap the music control to start ambient audio.' : 'Winkel oop. Druk die musiekbeheer om agtergrondklank te begin.');
    });
  }
  openNextDay(true);
  clockHandle = setInterval(tick, 1000);
}

function bindUpgrade(key) {
  document.getElementById(upgradeDefinitions[key].button).addEventListener('click', () => buyUpgrade(key));
}

function initialize() {
  document.getElementById('welcomeForm').addEventListener('submit', startBusinessFromForm);
  document.getElementById('closeDayButton').addEventListener('click', () => closeDay());
  document.getElementById('nextDayButton').addEventListener('click', () => openNextDay());
  document.getElementById('finishBusinessButton').addEventListener('click', () => endBusiness(false));
  document.getElementById('incidentContinue').addEventListener('click', closeIncident);
  incidentDialog.addEventListener('cancel', event => event.preventDefault());
  dayDialog.addEventListener('cancel', event => event.preventDefault());
  welcomeDialog.addEventListener('cancel', event => event.preventDefault());
  document.getElementById('replayButton').addEventListener('click', restartBusiness);
  document.getElementById('shareButton').addEventListener('click', shareOnFacebook);
  document.getElementById('copyButton').addEventListener('click', copyGameLink);
  languageToggle.addEventListener('click', () => {
    language = language === 'en' ? 'af' : 'en';
    updateLanguage();
  });
  musicToggle.addEventListener('click', toggleMusic);
  Object.keys(upgradeDefinitions).forEach(bindUpgrade);
  renderInventory();
  updateDisplay();
  updateMusicControl();
  welcomeDialog.showModal();
  document.getElementById('businessNameInput').focus();
}

initialize();
