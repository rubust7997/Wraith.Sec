const DAY_SECONDS = 60;
const BASE_CASH = 1400;

const products = [
  { id: 'mug', name: { en: 'Stoneware mug', af: 'Steengoedbeker' }, category: { en: 'HOME GOODS', af: 'HUISWARE' }, price: 135, unitCost: 55, stock: 5, startingStock: 5, batch: 5, timer: 0, interval: 5, soldToday: 0, soldTotal: 0 },
  { id: 'tote', name: { en: 'Canvas tote', af: 'Seiltassak' }, category: { en: 'ACCESSORIES', af: 'BYKOMSTIGHEDE' }, price: 195, unitCost: 75, stock: 4, startingStock: 4, batch: 4, timer: 0, interval: 8, soldToday: 0, soldTotal: 0 },
  { id: 'planter', name: { en: 'Desk planter', af: 'Skriftafelplanter' }, category: { en: 'LIVING', af: 'LEWENDE GOEDERE' }, price: 295, unitCost: 110, stock: 3, startingStock: 3, batch: 3, timer: 0, interval: 12, soldToday: 0, soldTotal: 0 },
  { id: 'candle', name: { en: 'Scented candle', af: 'Geurkers' }, category: { en: 'HOME GOODS', af: 'HUISWARE' }, price: 225, unitCost: 90, stock: 4, startingStock: 4, batch: 4, timer: 0, interval: 9, soldToday: 0, soldTotal: 0 },
  { id: 'journal', name: { en: 'Linen journal', af: 'Linnejoernaal' }, category: { en: 'STATIONERY', af: 'SKRYFBEHOEFTES' }, price: 165, unitCost: 60, stock: 4, startingStock: 4, batch: 4, timer: 0, interval: 7, soldToday: 0, soldTotal: 0 },
  { id: 'lamp', name: { en: 'Arc desk lamp', af: 'Booglessenaarlamp' }, category: { en: 'LIGHTING', af: 'BELIGTING' }, price: 420, unitCost: 180, stock: 2, startingStock: 2, batch: 2, timer: 0, interval: 15, soldToday: 0, soldTotal: 0 }
];

const incidents = [
  {
    kind: { en: 'PAYMENT DIVERSION', af: 'BETALINGSOMLEIDING' },
    sender: 'accounts@northstar-supply.co',
    subject: { en: 'Updated supplier payment details', af: 'Opgedateerde verskafferbetalingsbesonderhede' },
    title: { en: 'A supplier payment went to the wrong place.', af: '’n Verskafferbetaling het na die verkeerde plek gegaan.' },
    story: { en: 'A convincing supplier email changed where an invoice was paid. The money is gone from the shop account, and the real supplier still expects payment.', af: '’n Oortuigende verskaffer-e-pos het verander waar ’n faktuur betaal is. Die geld is uit die winkelrekening, en die regte verskaffer verwag steeds betaling.' },
    explanation: { en: 'This simulated business email compromise diverts a supplier payment. The financial hit increases as the storefront grows.', af: 'Hierdie gesimuleerde besigheidse-posbedrog lei ’n verskafferbetaling om. Die finansiële impak neem toe namate die winkel groei.' },
    baseLoss: 145, trustLoss: 5, riskKey: 'mail', chance: 1.1, downtime: 0
  },
  {
    kind: { en: 'ACCOUNT TAKEOVER', af: 'REKENINGOORNAME' },
    sender: 'security-alert@store-admin.help',
    subject: { en: 'New administrator sign-in', af: 'Nuwe administrateur-aanmelding' },
    title: { en: 'Someone else took over the store account.', af: 'Iemand anders het die winkelrekening oorgeneem.' },
    story: { en: 'The shop owner can no longer access the admin panel. Orders are delayed while account access is recovered, and several customers leave before checkout.', af: 'Die winkeleienaar kan nie meer toegang tot die administrasiepaneel kry nie. Bestellings word vertraag terwyl rekeningtoegang herstel word, en verskeie kliënte verlaat die betaalproses.' },
    explanation: { en: 'A compromised business account can interrupt operations and customer access. As the shop handles more orders, the disruption costs more.', af: '’n Gekompromitteerde besigheidsrekening kan bedrywighede en kliëntetoegang onderbreek. Namate die winkel meer bestellings hanteer, kos die ontwrigting meer.' },
    baseLoss: 130, trustLoss: 10, riskKey: 'account', chance: 1.15, downtime: 8
  },
  {
    kind: { en: 'CUSTOMER DATA EXPOSURE', af: 'KLIËNTDATABLOOTSTELLING' },
    sender: 'privacy-notice@outside-mail.net',
    subject: { en: 'Customer details shared outside the business', af: 'Kliëntbesonderhede buite die besigheid gedeel' },
    title: { en: 'Customer information was exposed.', af: 'Kliëntinligting is blootgestel.' },
    story: { en: 'A customer list has appeared where it should not be. Support requests arrive, staff time shifts to incident response, and customers become less confident in the store.', af: '’n Kliëntelys het verskyn waar dit nie hoort nie. Ondersteuningsversoeke kom in, personeeltyd skuif na insidentreaksie, en kliënte vertrou die winkel minder.' },
    explanation: { en: 'A data exposure creates response costs and can damage customer confidence. The simulated impact scales with accumulated business value.', af: '’n Datablootstelling veroorsaak reaksiekoste en kan kliëntevertroue skaad. Die gesimuleerde impak skaal met die opgehoopte besigheidswaarde.' },
    baseLoss: 150, trustLoss: 14, riskKey: 'privacy', chance: 0.8, downtime: 2
  },
  {
    kind: { en: 'STORE OUTAGE', af: 'WINKELONDERBREKING' },
    sender: 'hosting-status@service-desk.notice',
    subject: { en: 'Your storefront is unavailable', af: 'Jou aanlynwinkel is nie beskikbaar nie' },
    title: { en: 'Customers cannot reach the storefront.', af: 'Kliënte kan nie die aanlynwinkel bereik nie.' },
    story: { en: 'The storefront goes offline during a busy period. Orders stop arriving while visitors see an error instead of products, and the shop still carries its daily costs.', af: 'Die aanlynwinkel gaan tydens ’n besige tyd vanlyn. Bestellings hou op inkom terwyl besoekers ’n fout in plaas van produkte sien, en die winkel het steeds daaglikse kostes.' },
    explanation: { en: 'An availability incident turns every offline moment into missed sales. The interruption grows more costly as daily demand increases.', af: '’n Beskikbaarheidsinsident verander elke vanlyn oomblik in gemiste verkope. Die onderbreking word duurder namate daaglikse vraag toeneem.' },
    baseLoss: 110, trustLoss: 7, riskKey: 'backup', chance: 1, downtime: 12
  },
  {
    kind: { en: 'PAYMENT DISPUTES', af: 'BETALINGSGESKILLE' },
    sender: 'payments-review@checkout-audit.info',
    subject: { en: 'Several orders are under review', af: 'Verskeie bestellings word nagegaan' },
    title: { en: 'Suspicious checkout activity drained the margin.', af: 'Verdagte betaalaktiwiteit het die winsmarge opgebruik.' },
    story: { en: 'A wave of disputed orders creates refunds, fees, and extra work. Gross sales looked healthy, but the available cash drops after the claims arrive.', af: '’n Vlaag bestellingsdispute veroorsaak terugbetalings, fooie en ekstra werk. Bruto verkope het goed gelyk, maar beskikbare kontant daal wanneer die eise inkom.' },
    explanation: { en: 'Fraud and disputes can turn apparent sales into direct costs. The simulated financial hit grows with checkout volume.', af: 'Bedrog en dispute kan oënskynlike verkope in direkte koste verander. Die gesimuleerde finansiële impak groei saam met betaalvolume.' },
    baseLoss: 160, trustLoss: 8, riskKey: 'payment', chance: 0.9, downtime: 0
  },
  {
    kind: { en: 'LOGIN BOT WAVE', af: 'AANMELBOT-VLAAG' },
    sender: 'store-alert@account-activity.notice',
    subject: { en: 'Unusual sign-in attempts', af: 'Ongewone aanmeldpogings' },
    title: { en: 'A surge of sign-ins locked the owner out.', af: '’n Aanmeldingsvlaag het die eienaar uitgesluit.' },
    story: { en: 'Repeated automated sign-in attempts triggered an account lock during a busy sales window. Support time and delayed orders add up.', af: 'Herhaalde outomatiese aanmeldpogings het ’n rekening tydens ’n besige verkoopstyd gesluit. Ondersteuningstyd en vertraagde bestellings stapel op.' },
    explanation: { en: 'This simulated credential-stuffing incident targets accounts with reused passwords. Login hardening lowers its chance; account recovery still takes time.', af: 'Hierdie gesimuleerde aanmeldvoorval teiken rekeninge met hergebruikte wagwoorde. Versterkte aanmelding verminder die kans; rekeningherstel neem steeds tyd.' },
    baseLoss: 105, trustLoss: 6, riskKey: 'account', chance: 1.05, downtime: 5
  },
  {
    kind: { en: 'DOMAIN IMPERSONATION', af: 'DOMEINNABOOTSING' },
    sender: 'renewals@domain-service-check.net',
    subject: { en: 'Domain renewal needs attention', af: 'Domeinhernuwing vereis aandag' },
    title: { en: 'Customers were sent to an imitation storefront.', af: 'Kliënte is na ’n nagemaakte winkel gestuur.' },
    story: { en: 'A lookalike domain confused shoppers. Some orders were lost and customer trust took a knock while the issue was reviewed.', af: '’n Soortgelyke domein het kopers verwar. Sommige bestellings het verlore gegaan en kliëntevertroue het ’n knou gekry terwyl die probleem nagegaan is.' },
    explanation: { en: 'Domain impersonation can siphon off customer traffic and make a real storefront harder to trust. Domain monitoring reduces this simulated exposure.', af: 'Domeinnabootsing kan kliënteverkeer wegneem en dit moeiliker maak om ’n regte winkel te vertrou. Domeinmonitering verminder hierdie gesimuleerde blootstelling.' },
    baseLoss: 125, trustLoss: 9, riskKey: 'domain', chance: 0.75, downtime: 0
  },
  {
    kind: { en: 'AUTOMATED CHECKOUT TRAFFIC', af: 'OUTOMATIESE BETAALVERKEER' },
    sender: 'traffic-report@shop-platform.notice',
    subject: { en: 'Checkout traffic is running unusually high', af: 'Betaalverkeer is buitengewoon hoog' },
    title: { en: 'Automated traffic crowded out real customers.', af: 'Outomatiese verkeer het regte kliënte verdring.' },
    story: { en: 'A burst of automated visits slowed product pages and checkout. Fewer genuine shoppers completed their orders during the rush.', af: '’n Vlaag outomatiese besoeke het produkbladsye en betaling vertraag. Minder regte kopers het tydens die vlaag hul bestellings voltooi.' },
    explanation: { en: 'Automated traffic can consume capacity without making purchases. A traffic filter lowers the simulated chance of this disruption.', af: 'Outomatiese verkeer kan kapasiteit gebruik sonder om aankope te doen. ’n Verkeersfilter verlaag die gesimuleerde kans op hierdie ontwrigting.' },
    baseLoss: 95, trustLoss: 4, riskKey: 'traffic', chance: 1.2, downtime: 6
  },
  {
    kind: { en: 'LOGIN BOT WAVE', af: 'AANMELBOT-VLAAG' },
    sender: 'store-alert@account-activity.notice',
    subject: { en: 'Unusual sign-in attempts', af: 'Ongewone aanmeldpogings' },
    title: { en: 'A surge of sign-ins locked the owner out.', af: '’n Aanmeldingsvlaag het die eienaar uitgesluit.' },
    story: { en: 'Repeated automated sign-in attempts triggered an account lock during a busy sales window. Support time and delayed orders add up.', af: 'Herhaalde outomatiese aanmeldpogings het ’n rekening tydens ’n besige verkoopstyd gesluit. Ondersteuningstyd en vertraagde bestellings stapel op.' },
    explanation: { en: 'This simulated credential-stuffing incident targets accounts with reused passwords. Login hardening lowers its chance; account recovery still takes time.', af: 'Hierdie gesimuleerde aanmeldvoorval teiken rekeninge met hergebruikte wagwoorde. Versterkte aanmelding verminder die kans; rekeningherstel neem steeds tyd.' },
    baseLoss: 105, trustLoss: 6, riskKey: 'account', chance: 1.05, downtime: 5
  },
  {
    kind: { en: 'DOMAIN IMPERSONATION', af: 'DOMEINNABOOTSING' },
    sender: 'renewals@domain-service-check.net',
    subject: { en: 'Domain renewal needs attention', af: 'Domeinhernuwing vereis aandag' },
    title: { en: 'Customers were sent to an imitation storefront.', af: 'Kliënte is na ’n nagemaakte winkel gestuur.' },
    story: { en: 'A lookalike domain confused shoppers. Some orders were lost and customer trust took a knock while the issue was reviewed.', af: '’n Soortgelyke domein het kopers verwar. Sommige bestellings het verlore gegaan en kliëntevertroue het ’n knou gekry terwyl die probleem nagegaan is.' },
    explanation: { en: 'Domain impersonation can siphon off customer traffic and make a real storefront harder to trust. Domain monitoring reduces this simulated exposure.', af: 'Domeinnabootsing kan kliënteverkeer wegneem en dit moeiliker maak om ’n regte winkel te vertrou. Domeinmonitering verminder hierdie gesimuleerde blootstelling.' },
    baseLoss: 125, trustLoss: 9, riskKey: 'domain', chance: 0.75, downtime: 0
  },
  {
    kind: { en: 'AUTOMATED CHECKOUT TRAFFIC', af: 'OUTOMATIESE BETAALVERKEER' },
    sender: 'traffic-report@shop-platform.notice',
    subject: { en: 'Checkout traffic is running unusually high', af: 'Betaalverkeer is buitengewoon hoog' },
    title: { en: 'Automated traffic crowded out real customers.', af: 'Outomatiese verkeer het regte kliënte verdring.' },
    story: { en: 'A burst of automated visits slowed product pages and checkout. Fewer genuine shoppers completed their orders during the rush.', af: '’n Vlaag outomatiese besoeke het produkbladsye en betaling vertraag. Minder regte kopers het tydens die vlaag hul bestellings voltooi.' },
    explanation: { en: 'Automated traffic can consume capacity without making purchases. A traffic filter lowers the simulated chance of this disruption.', af: 'Outomatiese verkeer kan kapasiteit gebruik sonder om aankope te doen. ’n Verkeersfilter verlaag die gesimuleerde kans op hierdie ontwrigting.' },
    baseLoss: 95, trustLoss: 4, riskKey: 'traffic', chance: 1.2, downtime: 6
  }
];

const upgradeDefinitions = {
  marketing: { group: 'shop', icon: '↗', name: { en: 'Outreach campaign', af: 'Uitreikveldtog' }, description: { en: 'Bring in more shoppers. More sales also grow your online footprint.', af: 'Bring meer kopers in. Meer verkope vergroot ook jou aanlyn voetspoor.' }, effect: { en: 'ORDERS ARRIVE FASTER · MAX 3', af: 'BESTELLINGS KOM VINNIGER · MAKS 3' }, baseCost: 300, max: 3, saleBoost: 1 },
  productDisplay: { group: 'shop', icon: '▧', name: { en: 'Product photography', af: 'Produkfotografie' }, description: { en: 'Better product pages lift the value of every order.', af: 'Beter produkbladsye verhoog die waarde van elke bestelling.' }, effect: { en: '+7% SALE VALUE / LEVEL', af: '+7% VERKOOPWAARDE / VLAK' }, baseCost: 420, max: 3, saleValue: 0.07 },
  fulfillment: { group: 'shop', icon: '▣', name: { en: 'Fulfilment bench', af: 'Bestellingswerkstasie' }, description: { en: 'Streamline packing and bring down daily operating costs.', af: 'Stroomlyn verpakking en verlaag daaglikse bedryfskoste.' }, effect: { en: 'DAILY COSTS ↓ · MAX 3', af: 'DAAGLIKSE KOSTE ↓ · MAKS 3' }, baseCost: 480, max: 3, dailySavings: 45 },
  stockroom: { group: 'shop', icon: '▤', name: { en: 'Stockroom shelving', af: 'Voorraadkamer-rakke' }, description: { en: 'Order larger restock batches for every product.', af: 'Bestel groter aanvullingsgroepe vir elke produk.' }, effect: { en: '+2 UNITS / RESTOCK', af: '+2 EENHEDE / AANVULLING' }, baseCost: 560, max: 3, batchBonus: 2 },
  customerCare: { group: 'shop', icon: '♡', name: { en: 'Customer care desk', af: 'Kliëntedienslessenaar' }, description: { en: 'Dedicated support helps rebuild customer trust at close.', af: 'Toegewyde ondersteuning help om kliëntevertroue met sluiting te herstel.' }, effect: { en: 'TRUST RECOVERY / DAY', af: 'VERTROUEHERSTEL / DAG' }, baseCost: 520, max: 3, trustRecovery: 3 },
  loyalty: { group: 'shop', icon: '✳', name: { en: 'Loyalty programme', af: 'Lojaliteitsprogram' }, description: { en: 'Returning customers provide a steadier stream of orders.', af: 'Terugkerende kliënte sorg vir ’n bestendiger stroom bestellings.' }, effect: { en: 'ORDER RATE ↑ · MAX 2', af: 'BESTELKOERS ↑ · MAKS 2' }, baseCost: 650, max: 2, saleBoost: 1 },
  mail: { group: 'website', icon: '✉', name: { en: 'Mail authentication', af: 'Posverifikasie' }, description: { en: 'Lowers payment-diversion and supplier-impersonation exposure.', af: 'Verlaag blootstelling aan betalingsomleiding en verskaffernabootsing.' }, effect: { en: 'SUPPLIER EMAIL RISK ↓', af: 'VERSKAFFER-E-POSRISIKO ↓' }, riskKey: 'mail', baseCost: 420, max: 1, duration: 240 },
  account: { group: 'website', icon: '◈', name: { en: 'Login hardening', af: 'Versterkte aanmelding' }, description: { en: 'Reduces account takeover and login-bot incident chances.', af: 'Verminder die kans op rekeningoorname en aanmeldbot-insidente.' }, effect: { en: 'ACCOUNT THREATS ↓', af: 'REKENINGBEDREIGINGS ↓' }, riskKey: 'account', baseCost: 520, max: 1, duration: 240 },
  backup: { group: 'website', icon: '▤', name: { en: 'Recovery-ready hosting', af: 'Herstelgereed-gasheer' }, description: { en: 'Reduces the chance and downtime of storefront interruptions.', af: 'Verminder die kans en stilstand van winkelonderbrekings.' }, effect: { en: 'OUTAGE RISK & DURATION ↓', af: 'ONDERBREKINGSRISIKO EN DUUR ↓' }, riskKey: 'availability', baseCost: 460, max: 1, duration: 240 },
  payment: { group: 'website', icon: '◎', name: { en: 'Payment monitoring', af: 'Betalingsmonitering' }, description: { en: 'Lowers checkout dispute and suspicious-payment exposure.', af: 'Verlaag blootstelling aan betaalgeskille en verdagte betalings.' }, effect: { en: 'PAYMENT THREATS ↓', af: 'BETALINGSBEDREIGINGS ↓' }, riskKey: 'payment', baseCost: 580, max: 1, duration: 240 },
  privacy: { group: 'website', icon: '◉', name: { en: 'Customer-data controls', af: 'Kliëntdatabeheer' }, description: { en: 'Reduces customer-data exposure and its trust impact.', af: 'Verminder kliëntdatablootstelling en die impak daarvan op vertroue.' }, effect: { en: 'DATA EXPOSURE ↓', af: 'DATABLOOTSTELLING ↓' }, riskKey: 'privacy', baseCost: 620, max: 1, duration: 240 },
  traffic: { group: 'website', icon: '⌁', name: { en: 'Traffic filter', af: 'Verkeersfilter' }, description: { en: 'Lowers automated traffic incidents that disrupt real shoppers.', af: 'Verlaag outomatiese verkeersinsidente wat regte kopers ontwrig.' }, effect: { en: 'BOT TRAFFIC RISK ↓', af: 'BOTVERKEERSRISIKO ↓' }, riskKey: 'traffic', baseCost: 540, max: 1, duration: 240 },
  domain: { group: 'website', icon: '◎', name: { en: 'Domain monitoring', af: 'Domeinmonitering' }, description: { en: 'Reduces the chance of lookalike domains diverting customers.', af: 'Verlaag die kans dat soortgelyke domeine kliënte herlei.' }, effect: { en: 'DOMAIN IMPERSONATION ↓', af: 'DOMEINNABOOTSING ↓' }, riskKey: 'domain', baseCost: 390, max: 1, duration: 240 }
};

const languageToggle = document.getElementById('languageToggle');
const musicToggle = document.getElementById('musicToggle');
const ambientMusic = document.getElementById('ambientMusic');
const welcomeDialog = document.getElementById('welcomeDialog');
const dayDialog = document.getElementById('dayDialog');
const incidentDialog = document.getElementById('incidentDialog');
const responseLog = [];
const leaderboardStorageKey = 'wraithStorefrontTopThree';
const goalDefinitions = [
  { id: 'day3', title: { en: 'Reach business day 3', af: 'Bereik besigheidsdag 3' }, target: 3, reward: 300, value: () => day },
  { id: 'orders30', title: { en: 'Complete 30 customer orders', af: 'Voltooi 30 kliëntbestellings' }, target: 30, reward: 250, value: () => orders },
  { id: 'review', title: { en: 'Commission a website review', af: 'Laat ’n webwerfoorsig doen' }, target: 1, reward: 350, value: () => Number(websiteReviewHired) }
];

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
let upgrades = Object.fromEntries(Object.keys(upgradeDefinitions).map(key => [key, 0]));
let websiteReviewHired = false;
let websiteRenewals = {};
let completedGoals = {};
let currentRunRank = 0;
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

function restockBatch(product) {
  return product.batch + upgrades.stockroom * upgradeDefinitions.stockroom.batchBonus;
}

function orderPrice(product) {
  return Math.round(product.price * (1 + upgrades.productDisplay * upgradeDefinitions.productDisplay.saleValue));
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

function effectiveUpgradeLevel(key) {
  const definition = upgradeDefinitions[key];
  if (!definition || definition.group !== 'website') return upgrades[key] || 0;
  return (websiteRenewals[key] || 0) > totalOpenSeconds ? upgrades[key] : 0;
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
  renderUpgradeCatalog();
  renderSecurityReview();
  updateDisplay();
  renderGoals();
  if (welcomeDialog.open) document.getElementById('businessNameInput').focus();
  if (dayDialog.open) renderDaySummary();
  if (incidentDialog.open && currentIncident) renderIncident(currentIncident);
  if (phase === 'ended') {
    renderFinalReport();
    renderSharePreview();
  }
  renderGoals();
  renderLeaderboard();
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
    const batchSize = restockBatch(product);
    const price = product.unitCost * batchSize;
    stockCount.textContent = language === 'en' ? `IN STOCK · ${product.stock}` : `IN VORRAAD · ${product.stock}`;
    soldCount.textContent = language === 'en' ? `SOLD TODAY · ${product.soldToday}` : `VANDAG VERKOOP · ${product.soldToday}`;
    stockBar.style.width = `${Math.min(100, (product.stock / (product.batch * 2)) * 100)}%`;
    stockBar.classList.toggle('is-low', product.stock <= 2);
    restock.innerHTML = `<span>${language === 'en' ? 'Restock' : 'Vul aan'} +${batchSize}</span><b>${money(price)}</b>`;
    restock.setAttribute('aria-label', language === 'en'
      ? `Restock ${product.name.en}, ${batchSize} units for ${money(price)}`
      : `Vul ${product.name.af} aan, ${batchSize} eenhede vir ${money(price)}`);
    restock.disabled = !open || cash < price;
  });
  const units = products.reduce((sum, product) => sum + product.stock, 0);
  document.getElementById('stockTotal').textContent = language === 'en' ? `${units} units` : `${units} eenhede`;
}

function renderUpgradeCatalog() {
  const shopList = document.getElementById('shopUpgradeList');
  const websiteList = document.getElementById('websiteUpgradeList');
  if (!shopList || !websiteList) return;
  shopList.replaceChildren();
  websiteList.replaceChildren();

  Object.entries(upgradeDefinitions).forEach(([key, definition]) => {
    const item = document.createElement('article');
    item.className = 'upgrade-item';
    const symbol = document.createElement('span');
    symbol.className = 'upgrade-symbol';
    symbol.textContent = definition.icon;
    const copy = document.createElement('div');
    copy.className = 'upgrade-copy';
    const title = document.createElement('h3');
    title.textContent = tr(definition.name);
    const description = document.createElement('p');
    description.textContent = tr(definition.description);
    const effect = document.createElement('span');
    effect.className = 'upgrade-effect';
    effect.textContent = tr(definition.effect);
    const status = document.createElement('span');
    status.className = 'upgrade-owned';
    status.id = `${key}Level`;
    copy.append(title, description, effect, status);
    const button = document.createElement('button');
    button.className = 'upgrade-buy';
    button.type = 'button';
    button.id = `${key}Upgrade`;
    const price = document.createElement('span');
    const icon = document.createElement('b');
    icon.textContent = '+';
    button.append(price, icon);
    button.addEventListener('click', () => buyUpgrade(key));
    item.append(symbol, copy, button);
    (definition.group === 'shop' ? shopList : websiteList).append(item);
  });
  document.getElementById('hireReviewer').hidden = websiteReviewHired;
  document.getElementById('reviewFindings').hidden = !websiteReviewHired;
  websiteList.hidden = !websiteReviewHired;
  updateUpgradeButtons();
}

function formatRenewal(seconds) {
  const days = Math.floor(seconds / DAY_SECONDS);
  const remainder = seconds % DAY_SECONDS;
  return language === 'en' ? `${days}d ${remainder}s left` : `${days}d ${remainder}s oor`;
}

function updateUpgradeButtons() {
  let purchased = 0;
  Object.entries(upgradeDefinitions).forEach(([key, definition]) => {
    const button = document.getElementById(`${key}Upgrade`);
    if (!button) return;
    const costLabel = button.querySelector('span');
    const addMark = button.querySelector('b');
    const level = document.getElementById(`${key}Level`);
    const isWebsite = definition.group === 'website';
    const expiresAt = websiteRenewals[key] || 0;
    const remaining = Math.max(0, expiresAt - totalOpenSeconds);
    const active = isWebsite && upgrades[key] > 0 && remaining > 0;
    const maxed = !isWebsite && upgrades[key] >= definition.max;
    const cost = isWebsite && upgrades[key] > 0 ? Math.ceil(definition.baseCost * 0.35) : definition.baseCost * (upgrades[key] + 1);
    if (upgrades[key] > 0) purchased += isWebsite ? 1 : upgrades[key];

    costLabel.textContent = maxed
      ? (language === 'en' ? 'MAX' : 'MAKS')
      : active
        ? (language === 'en' ? 'ACTIVE' : 'AKTIEF')
        : money(cost);
    addMark.textContent = maxed ? '✓' : isWebsite && upgrades[key] > 0 ? '↻' : '+';
    button.disabled = phase !== 'open' || maxed || (isWebsite && !websiteReviewHired) || active || cash < cost;
    level.classList.toggle('is-expiring', active && remaining <= DAY_SECONDS);
    level.classList.toggle('is-expired', isWebsite && upgrades[key] > 0 && !active);
    level.textContent = isWebsite && active
      ? `${remaining <= DAY_SECONDS ? (language === 'en' ? 'RENEW SOON · ' : 'HERNU BINNEKORT · ') : ''}${formatRenewal(remaining)}`
      : language === 'en'
        ? `LEVEL ${upgrades[key]}${isWebsite && upgrades[key] ? ' · RENEW' : ` / ${definition.max}`}`
        : `VLAK ${upgrades[key]}${isWebsite && upgrades[key] ? ' · HERNUWE' : ` / ${definition.max}`}`;
    button.setAttribute('aria-label', active
      ? `${tr(definition.name)} ${language === 'en' ? 'active' : 'aktief'}, ${formatRenewal(remaining)}`
      : `${language === 'en' ? 'Buy' : 'Koop'} ${tr(definition.name)} for ${money(cost)}`);
  });
  document.getElementById('upgradeCount').textContent = `${purchased} / ${Object.keys(upgradeDefinitions).length}`;
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
  renderGoals();
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
  const sale = orderPrice(product);
  daySales += sale;
  grossSales += sale;
  cash += sale;
  appendEmail({
    sender: 'orders@' + businessName.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 18) + '.shop',
    subject: {
      en: `New ${tr(product.name).toLowerCase()} order · ${money(product.price)}`,
      af: `Nuwe ${tr(product.name).toLowerCase()} bestelling · ${money(product.price)}`
    }
  });
  evaluateGoals();
}

function tick() {
  if (phase !== 'open' || eventPaused) return;
  daySeconds += 1;
  totalOpenSeconds += 1;
  expireWebsiteDefenses();

  if (downtimeRemaining > 0) {
    downtimeRemaining -= 1;
  } else {
    products.forEach(product => {
      if (product.stock <= 0) return;
      product.timer += 1;
      const interval = Math.max(3, product.interval - upgrades.marketing * upgradeDefinitions.marketing.saleBoost - upgrades.loyalty * upgradeDefinitions.loyalty.saleBoost);
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
  const weights = incidents.map(incident => Math.max(0.12, incident.chance * Math.max(0.15, 1 - effectiveUpgradeLevel(incident.riskKey) * 0.52)));
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  let draw = Math.random() * weightTotal;
  let incident = incidents[incidents.length - 1];
  for (let index = 0; index < incidents.length; index += 1) {
    draw -= weights[index];
    if (draw <= 0) {
      incident = incidents[index];
      break;
    }
  }
  const scale = threatScale();
  const level = effectiveUpgradeLevel(incident.riskKey);
  const mitigation = Math.max(0.55, 1 - level * 0.18);
  const loss = Math.round(incident.baseLoss * scale * mitigation);
  const trustLoss = Math.max(2, incident.trustLoss - level * 2);
  const downtime = incident.downtime > 0
    ? Math.max(1, Math.ceil(incident.downtime * (1 - level * 0.35)))
    : 0;

  cash -= loss;
  totalLosses += loss;
  trust = Math.max(0, trust - trustLoss);
  downtimeRemaining = Math.max(downtimeRemaining, downtime);
  incidentCount += 1;
  nextIncidentAt = totalOpenSeconds + Math.max(14, 42 - Math.round(scale * 5) + Math.floor(Math.random() * 7));
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
  const batchSize = restockBatch(product);
  const cost = product.unitCost * batchSize;
  if (cash < cost) {
    setStatus(language === 'en' ? `Not enough cash to restock ${tr(product.name)}.` : `Nie genoeg kontant om ${tr(product.name)} aan te vul nie.`);
    return;
  }
  cash -= cost;
  stockCosts += cost;
  product.stock += batchSize;
  setStatus(language === 'en'
    ? `${batchSize} ${tr(product.name)} added to stock for ${money(cost)}.`
    : `${batchSize} ${tr(product.name)} by voorraad gevoeg vir ${money(cost)}.`);
  updateDisplay();
}

function buyUpgrade(key) {
  if (phase !== 'open') return;
  const definition = upgradeDefinitions[key];
  if (!definition || (definition.group === 'website' && !websiteReviewHired)) return;
  const isWebsite = definition.group === 'website';
  const activeUntil = websiteRenewals[key] || 0;
  if (isWebsite && activeUntil > totalOpenSeconds) return;
  if (!isWebsite && upgrades[key] >= definition.max) return;
  const renewing = isWebsite && upgrades[key] > 0;
  const cost = renewing ? Math.ceil(definition.baseCost * 0.35) : definition.baseCost * (upgrades[key] + 1);
  if (cash < cost) {
    setStatus(language === 'en' ? `That upgrade costs ${money(cost)}.` : `Daardie opgradering kos ${money(cost)}.`);
    return;
  }
  cash -= cost;
  if (isWebsite) {
    upgrades[key] = 1;
    websiteRenewals[key] = totalOpenSeconds + definition.duration;
  } else {
    upgrades[key] += 1;
  }
  const label = tr(definition.name);
  setStatus(language === 'en'
    ? `${label} ${renewing ? 'renewed' : 'purchased'} for ${money(cost)}.`
    : `${label} ${renewing ? 'hernu' : 'gekoop'} vir ${money(cost)}.`);
  updateDisplay();
}

function expireWebsiteDefenses() {
  const expired = Object.entries(upgradeDefinitions)
    .filter(([key, definition]) => definition.group === 'website' && upgrades[key] > 0 && websiteRenewals[key] <= totalOpenSeconds);
  if (!expired.length) return;
  expired.forEach(([key]) => {
    delete websiteRenewals[key];
  });
  setStatus(language === 'en'
    ? `A website defense plan expired. You can renew it from Website Security.`
    : `’n Webwerfbeskermingsplan het verval. Jy kan dit onder Webwerfsekuriteit hernu.`);
}

function closeDay() {
  if (phase !== 'open' || eventPaused) return;
  phase = 'closeout';
  closingCost = Math.max(55, 150 + Math.round(daySales * 0.06) + upgrades.marketing * 20 - upgrades.fulfillment * upgradeDefinitions.fulfillment.dailySavings);
  cash -= closingCost;
  operatingCosts += closingCost;
  trust = Math.min(100, trust + upgrades.customerCare * upgradeDefinitions.customerCare.trustRecovery);
  evaluateGoals();
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

function calculateBusinessScore() {
  return Math.max(0, Math.round(cash + inventoryValue() * 0.6 + grossSales * 0.08 + trust * 25 + day * 300 - totalLosses * 0.18 - operatingCosts * 0.15));
}

function readLeaderboard() {
  try {
    const saved = JSON.parse(localStorage.getItem(leaderboardStorageKey) || '[]');
    return Array.isArray(saved) ? saved.filter(entry => entry && typeof entry.score === 'number').slice(0, 3) : [];
  } catch {
    return [];
  }
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboardList');
  if (!list) return;
  list.replaceChildren();
  const entries = readLeaderboard();
  if (!entries.length) {
    const empty = document.createElement('li');
    empty.className = 'leaderboard-empty';
    empty.textContent = language === 'en' ? 'Finish a run to set the first score.' : 'Voltooi ’n lopie om die eerste telling op te stel.';
    list.append(empty);
    return;
  }
  entries.forEach((entry, index) => {
    const row = document.createElement('li');
    row.className = 'leaderboard-row';
    const place = document.createElement('span');
    place.textContent = `0${index + 1}`;
    const identity = document.createElement('span');
    identity.className = 'leaderboard-identity';
    const name = document.createElement('strong');
    name.textContent = entry.name;
    const days = document.createElement('small');
    days.textContent = language === 'en' ? `${entry.days} days · ${entry.orders} orders` : `${entry.days} dae · ${entry.orders} bestellings`;
    identity.append(name, days);
    const score = document.createElement('b');
    score.textContent = money(entry.score);
    row.append(place, identity, score);
    list.append(row);
  });
}

function renderGoals() {
  const list = document.getElementById('goalList');
  if (!list) return;
  list.replaceChildren();
  const completed = goalDefinitions.filter(goal => completedGoals[goal.id]).length;
  document.getElementById('goalCount').textContent = `${completed} / ${goalDefinitions.length}`;
  goalDefinitions.forEach(goal => {
    const value = Math.min(goal.target, goal.value());
    const done = Boolean(completedGoals[goal.id]);
    const row = document.createElement('div');
    row.className = `goal-item${done ? ' is-complete' : ''}`;
    const copy = document.createElement('div');
    copy.className = 'goal-copy';
    const title = document.createElement('strong');
    title.textContent = tr(goal.title);
    const reward = document.createElement('span');
    reward.textContent = done
      ? (language === 'en' ? 'COMPLETE' : 'VOLTOOI')
      : (language === 'en' ? `REWARD ${money(goal.reward)}` : `BELONING ${money(goal.reward)}`);
    copy.append(title, reward);
    const meter = document.createElement('div');
    meter.className = 'goal-meter';
    const fill = document.createElement('span');
    fill.style.width = `${done ? 100 : Math.round((value / goal.target) * 100)}%`;
    meter.append(fill);
    const count = document.createElement('small');
    count.textContent = `${number(value)} / ${number(goal.target)}`;
    row.append(copy, meter, count);
    list.append(row);
  });
}

function evaluateGoals() {
  let rewardTotal = 0;
  goalDefinitions.forEach(goal => {
    if (!completedGoals[goal.id] && goal.value() >= goal.target) {
      completedGoals[goal.id] = true;
      rewardTotal += goal.reward;
    }
  });
  if (rewardTotal) {
    cash += rewardTotal;
    setStatus(language === 'en' ? `Business milestone reached. ${money(rewardTotal)} added to the till.` : `Besigheidsmylpaal bereik. ${money(rewardTotal)} by die kasregister gevoeg.`);
    renderGoals();
  }
}

function saveLeaderboardRun() {
  const board = readLeaderboard();
  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const entry = { id: runId, name: businessName || (language === 'en' ? 'Unnamed shop' : 'Winkel sonder naam'), score: calculateBusinessScore(), days: day, orders, endingCash: Math.round(cash) };
  board.push(entry);
  board.sort((first, second) => second.score - first.score || second.days - first.days);
  const topThree = board.slice(0, 3);
  try {
    localStorage.setItem(leaderboardStorageKey, JSON.stringify(topThree));
  } catch {
    // Keep this run playable when browser storage is unavailable.
  }
  currentRunRank = topThree.findIndex(item => item.id === runId) + 1;
  const rankResult = document.getElementById('rankResult');
  rankResult.hidden = false;
  rankResult.textContent = currentRunRank
    ? (language === 'en' ? `LOCAL LEADERBOARD · RANK #${currentRunRank} · ${money(entry.score)} BUSINESS SCORE` : `PLAASLIKE RANGLYS · PLEK #${currentRunRank} · ${money(entry.score)} BESIGHEIDSTELLING`)
    : (language === 'en' ? `RUN SCORE · ${money(entry.score)} · TOP THREE REMAINS AHEAD` : `LOPIETELLING · ${money(entry.score)} · TOP DRIE BLY VOOR`);
  renderLeaderboard();
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
  saveLeaderboardRun();
  document.getElementById('businessStatus').textContent = bankrupt
    ? (language === 'en' ? 'CASH FLOW COLLAPSED' : 'KONTANTVLOEI INEENGESTORT')
    : (language === 'en' ? `${day} DAYS IN BUSINESS` : `${day} DAE IN BESIGHEID`);
  renderFinalReport(bankrupt);
  renderSharePreview();
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
  currentRunRank = 0;
  websiteReviewHired = false;
  websiteRenewals = {};
  completedGoals = {};
  responseLog.length = 0;
  upgrades = Object.fromEntries(Object.keys(upgradeDefinitions).map(key => [key, 0]));
  products.forEach(product => {
    product.stock = product.startingStock;
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
  renderUpgradeCatalog();
  renderSecurityReview();
  selectUpgradeTab('shopUpgrades');
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

function renderStatsCard() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const context = canvas.getContext('2d');
  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, '#111a17');
  background.addColorStop(1, '#202d27');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#344b3f';
  context.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 48) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  context.fillStyle = '#c8f169';
  context.font = '500 18px monospace';
  context.fillText('WRAITH SECURITY  /  STORE CLOSEOUT', 64, 68);
  context.fillStyle = '#f2f1e8';
  context.font = '700 48px sans-serif';
  context.fillText(businessName.slice(0, 34), 64, 142);
  context.fillStyle = '#a8b7ac';
  context.font = '20px monospace';
  context.fillText(`${day} DAYS  ·  LOCAL SCORE ${money(calculateBusinessScore())}${currentRunRank ? `  ·  LOCAL RANK #${currentRunRank}` : ''}`, 66, 185);

  const stats = [
    { label: 'ENDING BALANCE', value: money(cash) },
    { label: 'GROSS SALES', value: money(grossSales) },
    { label: 'ORDERS', value: number(orders) },
    { label: 'STOCK + OPERATING COSTS', value: money(stockCosts + operatingCosts) },
    { label: 'SIMULATED INCIDENT LOSSES', value: money(totalLosses) },
    { label: 'CUSTOMER TRUST', value: `${Math.round(trust)}%` }
  ];
  stats.forEach((stat, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 64 + column * 365;
    const y = 245 + row * 145;
    context.fillStyle = '#17221d';
    context.fillRect(x, y, 335, 112);
    context.strokeStyle = '#48604e';
    context.strokeRect(x, y, 335, 112);
    context.fillStyle = '#a8b7ac';
    context.font = '15px monospace';
    context.fillText(stat.label, x + 20, y + 34);
    context.fillStyle = index === 4 ? '#ff9565' : '#c8f169';
    context.font = '700 29px monospace';
    context.fillText(stat.value, x + 20, y + 79);
  });
  context.fillStyle = '#93a197';
  context.font = '14px monospace';
  context.fillText('FICTIONAL BUSINESS SIMULATION  ·  SHARE YOUR RUN', 64, 590);
  return canvas;
}

function downloadStatsCard(canvasOrEvent) {
  const canvas = canvasOrEvent?.toDataURL ? canvasOrEvent : renderStatsCard();
  const link = document.createElement('a');
  const filename = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'store';
  link.download = `${filename}-store-stats.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  document.getElementById('shareStatus').textContent = language === 'en'
    ? 'Stats image saved. Attach it to your Facebook post.'
    : 'Statistiekbeeld gestoor. Heg dit by jou Facebook-plasing aan.';
}

function shareOnFacebook() {
  const canvas = renderStatsCard();
  const quote = createSharePost();
  try {
    const data = canvas.toDataURL('image/png').split(',')[1];
    const bytes = Uint8Array.from(atob(data), character => character.charCodeAt(0));
    const file = new File([new Blob([bytes], { type: 'image/png' })], 'store-stats.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      navigator.share({ files: [file], title: `${businessName} · Storefront Under Pressure`, text: quote, url: 'https://rubust7997.github.io/Wraith.Sec/cyber-game/' }).catch(() => {
        downloadStatsCard(canvas);
        document.getElementById('shareStatus').textContent = language === 'en'
          ? 'Share cancelled. The stats image was saved so you can post it later.'
          : 'Deling gekanselleer. Die statistiekbeeld is gestoor sodat jy dit later kan plaas.';
      });
      return;
    }
  } catch {
    // Fall back to the Facebook composer and a separate image download.
  }
  downloadStatsCard(canvas);
  const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  shareUrl.searchParams.set('u', 'https://rubust7997.github.io/Wraith.Sec/cyber-game/');
  shareUrl.searchParams.set('quote', quote);
  window.open(shareUrl.toString(), '_blank', 'noopener,noreferrer');
  document.getElementById('shareStatus').textContent = language === 'en'
    ? 'The stats image was saved. Add it to the Facebook post that just opened.'
    : 'Die statistiekbeeld is gestoor. Voeg dit by die Facebook-plasing wat oopgemaak het.';
}

function createSharePost() {
  if (language === 'en') {
    return [
      `🏪 ${businessName} · Storefront Under Pressure`,
      `Days in business: ${day}`,
      `Ending balance: ${money(cash)}`,
      `Gross sales: ${money(grossSales)} across ${number(orders)} orders`,
      `Stock purchases: ${money(stockCosts)} · Operating costs: ${money(operatingCosts)}`,
      `Cyber incident losses: ${money(totalLosses)} · Customer trust: ${Math.round(trust)}%`,
      `Business score: ${money(calculateBusinessScore())}`,
      currentRunRank ? `Local leaderboard rank: #${currentRunRank} (this browser)` : 'Local leaderboard: score recorded on this browser',
      'Could you keep your shop running?'
    ].join('\n');
  }
  return [
    `🏪 ${businessName} · Winkelvenster Onder Druk`,
    `Dae in besigheid: ${day}`,
    `Eindbalans: ${money(cash)}`,
    `Bruto verkope: ${money(grossSales)} oor ${number(orders)} bestellings`,
    `Voorraadaankope: ${money(stockCosts)} · Bedryfskoste: ${money(operatingCosts)}`,
    `Kuberinsidentverliese: ${money(totalLosses)} · Kliëntevertroue: ${Math.round(trust)}%`,
    `Besigheidstelling: ${money(calculateBusinessScore())}`,
    currentRunRank ? `Plaaslike rang: #${currentRunRank} (hierdie blaaier)` : 'Plaaslike ranglys: telling op hierdie blaaier aangeteken',
    'Kan jy jou winkel aan die gang hou?'
  ].join('\n');
}

function renderSharePreview() {
  document.getElementById('sharePreview').textContent = createSharePost();
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

function selectUpgradeTab(targetId) {
  document.querySelectorAll('.upgrade-tab').forEach(tab => {
    const active = tab.dataset.upgradeTarget === targetId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    document.getElementById(tab.dataset.upgradeTarget).hidden = !active;
  });
}

function renderSecurityReview() {
  if (!websiteReviewHired) return;
  const findings = document.getElementById('reviewFindings');
  findings.replaceChildren();
  const summary = document.createElement('p');
  summary.textContent = language === 'en'
    ? 'The review found several areas that could affect a growing storefront. Choose which protections fit your budget.'
    : 'Die oorsig het verskeie areas gevind wat ’n groeiende winkel kan raak. Kies watter beskerming by jou begroting pas.';
  findings.append(summary);
  Object.values(upgradeDefinitions).filter(item => item.group === 'website').forEach(item => {
    const finding = document.createElement('div');
    finding.className = 'review-finding';
    const name = document.createElement('strong');
    name.textContent = tr(item.name);
    const risk = document.createElement('span');
    risk.textContent = language === 'en' ? `Potential ${threatLabel()} exposure` : `Moontlike ${threatLabel()} blootstelling`;
    finding.append(name, risk);
    findings.append(finding);
  });
}

function hireWebsiteReviewer() {
  const reviewCost = 650;
  if (phase !== 'open' || websiteReviewHired) return;
  if (cash < reviewCost) {
    setStatus(language === 'en' ? `The website review costs ${money(reviewCost)}.` : `Die webwerfoorsig kos ${money(reviewCost)}.`);
    return;
  }
  cash -= reviewCost;
  websiteReviewHired = true;
  renderUpgradeCatalog();
  renderSecurityReview();
  selectUpgradeTab('websiteUpgrades');
  setStatus(language === 'en' ? 'Website review complete. The findings and upgrade options are ready.' : 'Webwerfoorsig voltooi. Die bevindings en opgraderings is gereed.');
  evaluateGoals();
  updateDisplay();
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
  document.getElementById('downloadCardButton').addEventListener('click', downloadStatsCard);
  document.getElementById('copyButton').addEventListener('click', copyGameLink);
  document.getElementById('hireReviewer').addEventListener('click', hireWebsiteReviewer);
  document.querySelectorAll('.upgrade-tab').forEach(tab => {
    tab.addEventListener('click', () => selectUpgradeTab(tab.dataset.upgradeTarget));
  });
  languageToggle.addEventListener('click', () => {
    language = language === 'en' ? 'af' : 'en';
    updateLanguage();
  });
  musicToggle.addEventListener('click', toggleMusic);
  renderInventory();
  renderUpgradeCatalog();
  updateDisplay();
  renderGoals();
  renderLeaderboard();
  updateMusicControl();
  welcomeDialog.showModal();
  document.getElementById('businessNameInput').focus();
}

initialize();
