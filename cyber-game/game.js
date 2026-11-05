const scenarios = [
  {
    day: { en: 'MON / 08:42', af: 'MAA / 08:42' },
    category: { en: 'INBOX SECURITY', af: 'INKOMSEKURITEIT' },
    title: { en: 'The overdue invoice', af: 'Die agterstallige faktuur' },
    prompt: {
      en: 'A message that appears to come from a regular supplier says an invoice is overdue. It asks you to open an attached file before end of day.',
      af: '’n Boodskap wat lyk of dit van ’n gereelde verskaffer kom, sê ’n faktuur is agterstallig. Dit vra jou om ’n aangehegte lêer voor die einde van die dag oop te maak.'
    },
    evidence: [
      { label: { en: 'SENDER', af: 'SENDER' }, value: 'billing@northstar-payments.co' },
      { label: { en: 'ATTACHMENT', af: 'AANHEGSEL' }, value: 'Invoice_March.html' },
      { label: { en: 'TONE', af: 'TOON' }, value: { en: 'Urgent · pay today', af: 'Dringend · betaal vandag' } }
    ],
    choices: [
      {
        title: { en: 'Open the file to check the invoice', af: 'Maak die lêer oop om die faktuur na te gaan' },
        detail: { en: 'The supplier is familiar, so the attachment is probably fine.', af: 'Die verskaffer is bekend, dus is die aanhegsel waarskynlik veilig.' },
        correct: false,
        feedback: { en: 'A familiar name can be copied or impersonated. The unexpected attachment and urgency are reasons to pause.', af: '’n Bekende naam kan gekopieer of nageboots word. Die onverwagte aanhegsel en dringendheid is redes om eers stil te staan.' },
        tip: { en: 'Check the sender details, then contact the supplier using a number or address you already trust.', af: 'Gaan die senderbesonderhede na en kontak die verskaffer deur ’n nommer of adres wat jy reeds vertrou.' }
      },
      {
        title: { en: 'Reply and ask if it is real', af: 'Antwoord en vra of dit eg is' },
        detail: { en: 'Use the contact details in the message to confirm.', af: 'Gebruik die kontakbesonderhede in die boodskap om dit te bevestig.' },
        correct: false,
        feedback: { en: 'A reply goes back to the same unverified sender. It does not independently confirm who sent the message.', af: '’n Antwoord gaan terug na dieselfde ongeverifieerde sender. Dit bevestig nie onafhanklik wie die boodskap gestuur het nie.' },
        tip: { en: 'Verify an unexpected request through a separate, previously trusted channel.', af: 'Bevestig ’n onverwagte versoek deur ’n afsonderlike kanaal wat jy voorheen vertrou het.' }
      },
      {
        title: { en: 'Verify with the supplier through a known channel', af: 'Bevestig dit met die verskaffer deur ’n bekende kanaal' },
        detail: { en: 'Use the contact details already on file; do not open the attachment yet.', af: 'Gebruik die kontakbesonderhede wat reeds op rekord is; moenie die aanhegsel oopmaak nie.' },
        correct: true,
        feedback: { en: 'Good call. You checked the request independently before interacting with the attachment.', af: 'Goeie keuse. Jy het die versoek onafhanklik nagegaan voordat jy met die aanhegsel gewerk het.' },
        tip: { en: 'If it is suspicious, report it using your organisation’s normal process and remove it only as directed.', af: 'As dit verdag is, rapporteer dit volgens jou organisasie se normale proses en verwyder dit slegs soos aangedui.' }
      }
    ]
  },
  {
    day: { en: 'MON / 11:16', af: 'MAA / 11:16' },
    category: { en: 'ACCOUNT SECURITY', af: 'REKENINGSEKURITEIT' },
    title: { en: 'The login you did not start', af: 'Die aanmelding wat jy nie begin het nie' },
    prompt: {
      en: 'Your phone shows a sign-in approval request while you are away from your computer. A chat message from someone claiming to be IT says they triggered it and asks you to approve.',
      af: 'Jou foon wys ’n aanmeldingsversoek terwyl jy weg van jou rekenaar is. ’n Kletsboodskap van iemand wat sê hulle is IT, beweer hulle het dit veroorsaak en vra jou om goed te keur.'
    },
    evidence: [
      { label: { en: 'YOU', af: 'JY' }, value: { en: 'Not signing in', af: 'Meld nie aan nie' } },
      { label: { en: 'REQUEST', af: 'VERSOEK' }, value: { en: 'Approve sign-in?', af: 'Keur aanmelding goed?' } },
      { label: { en: 'CHAT', af: 'KLETS' }, value: { en: '“Quick favour”', af: '“Vinnige guns”' } }
    ],
    choices: [
      {
        title: { en: 'Approve it; IT says it is theirs', af: 'Keur dit goed; IT sê dit is hulle s’n' },
        detail: { en: 'They may be testing a system or fixing your account.', af: 'Hulle toets dalk ’n stelsel of herstel jou rekening.' },
        correct: false,
        feedback: { en: 'An approval grants access. A chat message does not prove that the request is legitimate.', af: '’n Goedkeuring verleen toegang. ’n Kletsboodskap bewys nie dat die versoek wettig is nie.' },
        tip: { en: 'Never approve a sign-in you did not initiate, even if someone asks you to.', af: 'Moet nooit ’n aanmelding goedkeur wat jy nie begin het nie, selfs al vra iemand jou daarvoor.' }
      },
      {
        title: { en: 'Deny it and report the unexpected request', af: 'Weier dit en rapporteer die onverwagte versoek' },
        detail: { en: 'Use your organisation’s official IT or security reporting route.', af: 'Gebruik jou organisasie se amptelike IT- of sekuriteitsrapporteringskanaal.' },
        correct: true,
        feedback: { en: 'Exactly. Denying the prompt blocks the approval, and reporting lets the team check for other unusual activity.', af: 'Presies. Deur die versoek te weier, blokkeer jy die goedkeuring, en die rapportering help die span om ander ongewone aktiwiteit na te gaan.' },
        tip: { en: 'If you already approved it, contact your security team immediately using a trusted route.', af: 'As jy dit reeds goedgekeur het, kontak jou sekuriteitspan onmiddellik deur ’n betroubare kanaal.' }
      },
      {
        title: { en: 'Ignore it and keep working', af: 'Ignoreer dit en hou aan werk' },
        detail: { en: 'If you do nothing, the request will probably disappear.', af: 'As jy niks doen nie, sal die versoek waarskynlik verdwyn.' },
        correct: false,
        feedback: { en: 'Leaving an unexpected sign-in unreported can hide a useful warning from your security team.', af: 'As ’n onverwagte aanmelding ongerapporteer bly, kan jou sekuriteitspan ’n nuttige waarskuwing misloop.' },
        tip: { en: 'Deny it, then report it through the official channel.', af: 'Weier dit en rapporteer dit deur die amptelike kanaal.' }
      }
    ]
  },
  {
    day: { en: 'TUE / 09:03', af: 'DIN / 09:03' },
    category: { en: 'MOBILE SAFETY', af: 'MOBIELE VEILIGHEID' },
    title: { en: 'A QR code with a deadline', af: '’n QR-kode met ’n sperdatum' },
    prompt: {
      en: 'A printed notice beside the office entrance says a delivery is waiting. It asks staff to scan a QR code and sign in to confirm the drop-off before noon.',
      af: '’n Gedrukte kennisgewing by die kantoor se ingang sê ’n aflewering wag. Dit vra personeel om ’n QR-kode te skandeer en aan te meld om die aflewering voor middag te bevestig.'
    },
    evidence: [
      { label: { en: 'LOCATION', af: 'PLEK' }, value: { en: 'Shared entrance', af: 'Gedeelde ingang' } },
      { label: { en: 'REQUEST', af: 'VERSOEK' }, value: { en: 'Scan + sign in', af: 'Skandeer + meld aan' } },
      { label: { en: 'DEADLINE', af: 'SPERDATUM' }, value: { en: 'Before 12:00', af: 'Voor 12:00' } }
    ],
    choices: [
      {
        title: { en: 'Scan it and use your work password', af: 'Skandeer dit en gebruik jou werk se wagwoord' },
        detail: { en: 'The notice is in the building, so it likely belongs there.', af: 'Die kennisgewing is in die gebou, dus hoort dit waarskynlik daar.' },
        correct: false,
        feedback: { en: 'A QR code can lead anywhere, and a public notice is not proof of who posted it.', af: '’n QR-kode kan enige plek heen lei, en ’n publieke kennisgewing bewys nie wie dit opgesit het nie.' },
        tip: { en: 'Do not enter work credentials on a page reached through an unexpected QR code.', af: 'Moenie werksaanmeldbesonderhede invoer op ’n bladsy wat deur ’n onverwagte QR-kode bereik is nie.' }
      },
      {
        title: { en: 'Use the delivery company’s official app or site directly', af: 'Gebruik die afleweringsmaatskappy se amptelike toepassing of webwerf direk' },
        detail: { en: 'Navigate there yourself and check with reception if needed.', af: 'Gaan self daarheen en vra ontvangs indien nodig.' },
        correct: true,
        feedback: { en: 'Right. You avoided trusting an unverified code and checked through a channel you chose yourself.', af: 'Reg. Jy het vermy om ’n ongeverifieerde kode te vertrou en het deur ’n kanaal nagegaan wat jy self gekies het.' },
        tip: { en: 'If the notice seems suspicious, report its location to the office or building team.', af: 'As die kennisgewing verdag lyk, rapporteer waar dit is aan die kantoor- of gebouspan.' }
      },
      {
        title: { en: 'Forward the QR image to a coworker to try', af: 'Stuur die QR-beeld vir ’n kollega om te toets' },
        detail: { en: 'Let someone else check whether the link looks normal.', af: 'Laat iemand anders kyk of die skakel normaal lyk.' },
        correct: false,
        feedback: { en: 'Forwarding the code passes the same unverified risk to a coworker.', af: 'As jy die kode aanstuur, dra jy dieselfde ongeverifieerde risiko aan ’n kollega oor.' },
        tip: { en: 'Verify the delivery using contact details from an existing, trusted source.', af: 'Bevestig die aflewering met kontakbesonderhede van ’n bestaande, betroubare bron.' }
      }
    ]
  },
  {
    day: { en: 'TUE / 14:27', af: 'DIN / 14:27' },
    category: { en: 'INCIDENT RESPONSE', af: 'INSIDENTREAKSIE' },
    title: { en: 'The misdirected file', af: 'Die lêer wat verkeerd gestuur is' },
    prompt: {
      en: 'You notice a spreadsheet with customer details was sent to the wrong external recipient. A teammate asks you to delete the sent email and keep it quiet until you know more.',
      af: 'Jy sien ’n sigblad met kliëntbesonderhede is aan die verkeerde eksterne ontvanger gestuur. ’n Spanmaat vra jou om die gestuurde e-pos uit te vee en stil te bly totdat julle meer weet.'
    },
    evidence: [
      { label: { en: 'DATA', af: 'DATA' }, value: { en: 'Customer details', af: 'Kliëntbesonderhede' } },
      { label: { en: 'RECIPIENT', af: 'ONTVANGER' }, value: { en: 'External / incorrect', af: 'Ekstern / verkeerd' } },
      { label: { en: 'SUGGESTION', af: 'VOORSTEL' }, value: { en: 'Delete + wait', af: 'Vee uit + wag' } }
    ],
    choices: [
      {
        title: { en: 'Report it promptly through the incident process', af: 'Rapporteer dit dadelik deur die insidentproses' },
        detail: { en: 'Preserve relevant details and follow the response team’s instructions.', af: 'Bewaar relevante besonderhede en volg die reaksiespan se instruksies.' },
        correct: true,
        feedback: { en: 'Good response. Fast reporting gives the responsible team a chance to assess the exposure and respond appropriately.', af: 'Goeie reaksie. Vinnige rapportering gee die verantwoordelike span kans om die blootstelling te beoordeel en gepas te reageer.' },
        tip: { en: 'Do not hide or alter evidence. Follow your organisation’s privacy and incident procedures.', af: 'Moenie bewyse wegsteek of verander nie. Volg jou organisasie se privaatheids- en insidentprosedures.' }
      },
      {
        title: { en: 'Delete it and see whether anyone notices', af: 'Vee dit uit en kyk of iemand dit agterkom' },
        detail: { en: 'Avoid raising a false alarm before the impact is clear.', af: 'Vermy ’n vals alarm voordat die impak duidelik is.' },
        correct: false,
        feedback: { en: 'Waiting can delay a necessary response. Removing evidence can also make it harder to understand what happened.', af: 'Wag kan ’n nodige reaksie vertraag. As jy bewyse verwyder, kan dit ook moeiliker word om te verstaan wat gebeur het.' },
        tip: { en: 'Report what you know quickly; the response team can determine the impact.', af: 'Rapporteer vinnig wat jy weet; die reaksiespan kan die impak bepaal.' }
      },
      {
        title: { en: 'Ask the recipient to keep the file', af: 'Vra die ontvanger om die lêer te hou' },
        detail: { en: 'A quick note might resolve the mistake without involving others.', af: '’n Vinnige boodskap kan dalk die fout oplos sonder om ander te betrek.' },
        correct: false,
        feedback: { en: 'Contacting them yourself may conflict with your organisation’s response process or create more disclosure.', af: 'As jy hulle self kontak, kan dit met jou organisasie se reaksieproses bots of verdere openbaarmaking veroorsaak.' },
        tip: { en: 'Notify the designated privacy or security contact and follow their guidance.', af: 'Stel die aangewese privaatheids- of sekuriteitskontak in kennis en volg hul leiding.' }
      }
    ]
  },
  {
    day: { en: 'WED / 10:51', af: 'WOE / 10:51' },
    category: { en: 'DEVICE RESPONSE', af: 'TOESTELREAKSIE' },
    title: { en: 'The strange screen', af: 'Die vreemde skerm' },
    prompt: {
      en: 'Your work computer suddenly displays a warning you do not recognise, and files behave oddly. You are not sure whether it is a software problem or a security issue.',
      af: 'Jou werkrekenaar wys skielik ’n waarskuwing wat jy nie herken nie, en lêers tree vreemd op. Jy weet nie of dit ’n sagtewareprobleem of ’n sekuriteitskwessie is nie.'
    },
    evidence: [
      { label: { en: 'DEVICE', af: 'TOESTEL' }, value: { en: 'Work computer', af: 'Werksrekenaar' } },
      { label: { en: 'SYMPTOM', af: 'SIMPTOOM' }, value: { en: 'Unexpected changes', af: 'Onverwagte veranderinge' } },
      { label: { en: 'CERTAINTY', af: 'SEKERHEID' }, value: { en: 'Unknown cause', af: 'Onbekende oorsaak' } }
    ],
    choices: [
      {
        title: { en: 'Report it to IT/security and follow their directions', af: 'Rapporteer dit aan IT/sekuriteit en volg hul aanwysings' },
        detail: { en: 'Describe what you saw and when it started; avoid experimenting.', af: 'Beskryf wat jy gesien het en wanneer dit begin het; moenie eksperimenteer nie.' },
        correct: true,
        feedback: { en: 'That is the right first move. Prompt reporting lets the trained responders assess the device and guide safe next steps.', af: 'Dit is die regte eerste stap. Vinnige rapportering laat opgeleide reageerders die toestel beoordeel en veilige volgende stappe voorstel.' },
        tip: { en: 'Avoid deleting files, installing tools or trying to investigate on your own. Follow your organisation’s incident process.', af: 'Moenie lêers uitvee, gereedskap installeer of self probeer ondersoek nie. Volg jou organisasie se insidentproses.' }
      },
      {
        title: { en: 'Restart it and continue if the warning disappears', af: 'Herbegin dit en gaan voort as die waarskuwing verdwyn' },
        detail: { en: 'A restart often clears temporary computer issues.', af: '’n Herbegin maak tydelike rekenaarprobleme dikwels reg.' },
        correct: false,
        feedback: { en: 'A restart may hide useful information or make recovery harder. Let your support team advise you first.', af: '’n Herbegin kan nuttige inligting verberg of herstel bemoeilik. Laat jou ondersteuningspan jou eers adviseer.' },
        tip: { en: 'Report the symptoms and wait for instructions before using the device again.', af: 'Rapporteer die simptome en wag vir aanwysings voordat jy die toestel weer gebruik.' }
      },
      {
        title: { en: 'Search online and download a cleanup tool', af: 'Soek aanlyn en laai ’n skoonmaakprogram af' },
        detail: { en: 'Try a quick fix before asking the team for help.', af: 'Probeer ’n vinnige oplossing voordat jy die span om hulp vra.' },
        correct: false,
        feedback: { en: 'Unapproved tools can add risk and interfere with your organisation’s response.', af: 'Ongemagtigde gereedskap kan risiko verhoog en jou organisasie se reaksie belemmer.' },
        tip: { en: 'Use official support channels and only approved tools.', af: 'Gebruik amptelike ondersteuningskanale en slegs goedgekeurde gereedskap.' }
      }
    ]
  }
];

const gameUrl = 'https://rubust7997.github.io/Wraith.Sec/cyber-game/';
const languageToggle = document.getElementById('languageToggle');
const choicesNode = document.getElementById('choices');
const feedbackNode = document.getElementById('feedback');
const continueButton = document.getElementById('continueButton');
const scenarioTitle = document.getElementById('scenarioTitle');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const responseIndexes = [];
let language = 'en';
let roundIndex = 0;
let score = 0;
let highScore = 0;

try {
  highScore = Number(localStorage.getItem('wraithSignalCheckHighScore')) || 0;
} catch {
  highScore = 0;
}

function text(value) {
  return typeof value === 'string' ? value : value[language];
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-af]').forEach(node => {
    node.textContent = node.dataset[language];
  });
  languageToggle.textContent = language === 'en' ? 'AF' : 'EN';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Afrikaans' : 'Skakel oor na Engels');
  if (!document.getElementById('playfield').hidden) renderRound();
  if (!document.getElementById('results').hidden) renderResults();
}

function renderEvidence(items) {
  const evidence = document.getElementById('scenarioEvidence');
  evidence.replaceChildren();
  items.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'evidence-item';
    const label = document.createElement('span');
    label.textContent = text(item.label);
    const value = document.createElement('strong');
    value.textContent = text(item.value);
    wrapper.append(label, value);
    evidence.append(wrapper);
  });
}

function renderRound() {
  const scenario = scenarios[roundIndex];
  document.getElementById('roundLabel').textContent = language === 'en'
    ? `DECISION ${String(roundIndex + 1).padStart(2, '0')} / 05`
    : `BESLUIT ${String(roundIndex + 1).padStart(2, '0')} / 05`;
  document.getElementById('progressText').textContent = language === 'en'
    ? `${Math.round(((roundIndex + 1) / scenarios.length) * 100)}% COMPLETE`
    : `${Math.round(((roundIndex + 1) / scenarios.length) * 100)}% VOLTOOI`;
  document.getElementById('scoreDisplay').textContent = String(score).padStart(3, '0');
  progressFill.style.width = `${((roundIndex + 1) / scenarios.length) * 100}%`;
  progressBar.setAttribute('aria-valuenow', String(roundIndex + 1));
  progressBar.setAttribute('aria-valuetext', language === 'en' ? `Decision ${roundIndex + 1} of 5` : `Besluit ${roundIndex + 1} van 5`);
  document.getElementById('scenarioDay').textContent = text(scenario.day);
  document.getElementById('scenarioCategory').textContent = text(scenario.category);
  scenarioTitle.textContent = text(scenario.title);
  document.getElementById('scenarioPrompt').textContent = text(scenario.prompt);
  renderEvidence(scenario.evidence);
  choicesNode.replaceChildren();

  scenario.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    const key = document.createElement('span');
    key.className = 'choice-key';
    key.textContent = String(index + 1).padStart(2, '0');
    const copy = document.createElement('span');
    copy.className = 'choice-copy';
    const title = document.createElement('strong');
    title.textContent = text(choice.title);
    const detail = document.createElement('small');
    detail.textContent = text(choice.detail);
    copy.append(title, detail);
    const arrow = document.createElement('span');
    arrow.className = 'choice-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    button.append(key, copy, arrow);
    button.addEventListener('click', () => choose(index));
    choicesNode.append(button);
  });

  feedbackNode.hidden = true;
  feedbackNode.classList.remove('is-miss');
  const previousChoice = responseIndexes[roundIndex];
  if (previousChoice !== undefined) revealFeedback(previousChoice, false);
}

function choose(choiceIndex) {
  if (responseIndexes[roundIndex] !== undefined) return;
  responseIndexes[roundIndex] = choiceIndex;
  const choice = scenarios[roundIndex].choices[choiceIndex];
  if (choice.correct) score += 20;
  document.getElementById('scoreDisplay').textContent = String(score).padStart(3, '0');
  revealFeedback(choiceIndex, true);
}

function revealFeedback(choiceIndex, moveFocus) {
  const scenario = scenarios[roundIndex];
  const selected = scenario.choices[choiceIndex];
  const buttons = [...choicesNode.querySelectorAll('.choice')];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (scenario.choices[index].correct) button.classList.add('is-correct');
    if (index === choiceIndex) {
      button.setAttribute('aria-pressed', 'true');
      if (!selected.correct) button.classList.add('is-incorrect');
    }
  });

  const isCorrect = selected.correct;
  feedbackNode.hidden = false;
  feedbackNode.classList.toggle('is-miss', !isCorrect);
  document.getElementById('feedbackMark').textContent = isCorrect ? '✓' : 'i';
  document.getElementById('feedbackResult').textContent = isCorrect
    ? (language === 'en' ? 'Good signal. +20 points' : 'Goeie sein. +20 punte')
    : (language === 'en' ? 'Signal missed. No points this round' : 'Sein gemis. Geen punte hierdie rondte nie');
  document.getElementById('feedbackText').textContent = text(selected.feedback);
  document.getElementById('fieldTip').textContent = `${language === 'en' ? 'FIELD TIP: ' : 'VELDWENK: '}${text(selected.tip)}`;
  const continueLabel = continueButton.querySelector('span');
  const isLast = roundIndex === scenarios.length - 1;
  continueLabel.textContent = isLast
    ? (language === 'en' ? 'View debrief' : 'Sien ontleding')
    : (language === 'en' ? 'Next decision' : 'Volgende besluit');
  if (moveFocus) continueButton.focus();
}

function finishRound() {
  if (roundIndex < scenarios.length - 1) {
    roundIndex += 1;
    renderRound();
    scenarioTitle.focus?.();
    return;
  }
  document.getElementById('progressText').textContent = language === 'en' ? '100% COMPLETE' : '100% VOLTOOI';
  progressFill.style.width = '100%';
  progressBar.setAttribute('aria-valuenow', String(scenarios.length));
  document.getElementById('playfield').hidden = true;
  document.querySelector('.briefing-rail').hidden = true;
  document.getElementById('results').hidden = false;
  try {
    highScore = Math.max(highScore, score);
    localStorage.setItem('wraithSignalCheckHighScore', String(highScore));
  } catch {
    highScore = score;
  }
  renderResults();
  document.getElementById('resultTitle').focus?.();
}

function renderResults() {
  const rank = score >= 80
    ? { en: 'SIGNAL KEEPER', af: 'SEINBEWAARDER' }
    : score >= 60
      ? { en: 'ALERT ANALYST', af: 'WAKKER ONTLEDER' }
      : { en: 'FIRST RESPONDER', af: 'EERSTE REAGEERDER' };
  const title = score >= 80
    ? { en: 'Sharp instincts. Safer shift.', af: 'Skerp instinkte. Veiliger skof.' }
    : score >= 60
      ? { en: 'Good awareness grows with practice.', af: 'Goeie bewustheid groei met oefening.' }
      : { en: 'Every miss is a chance to learn.', af: 'Elke gemiste sein is ’n kans om te leer.' };
  const message = language === 'en'
    ? `You chose ${score / 20} of 5 safer responses. Your personal best is ${highScore} out of 100. The debrief below shows what to carry into a real workday.`
    : `Jy het ${score / 20} van 5 veiliger reaksies gekies. Jou persoonlike beste is ${highScore} uit 100. Die ontleding hieronder wys wat jy na ’n werksdag kan saamneem.`;
  document.getElementById('finalScore').textContent = String(score);
  document.getElementById('resultRank').textContent = text(rank);
  document.getElementById('resultTitle').textContent = text(title);
  document.getElementById('resultMessage').textContent = message;
  document.getElementById('shareStatus').textContent = '';

  const debrief = document.getElementById('debrief');
  debrief.replaceChildren();
  scenarios.forEach((scenario, index) => {
    const selected = scenario.choices[responseIndexes[index]];
    const row = document.createElement('div');
    row.className = `debrief-row${selected.correct ? '' : ' is-miss'}`;
    const mark = document.createElement('span');
    mark.className = 'debrief-mark';
    mark.textContent = selected.correct ? '✓' : '○';
    const copy = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = text(scenario.title);
    const detail = document.createElement('span');
    detail.textContent = `${language === 'en' ? 'Your choice: ' : 'Jou keuse: '}${text(selected.title)} ${language === 'en' ? '— ' : '— '}${text(selected.tip)}`;
    copy.append(heading, detail);
    row.append(mark, copy);
    debrief.append(row);
  });
}

function replay() {
  roundIndex = 0;
  score = 0;
  responseIndexes.length = 0;
  document.getElementById('results').hidden = true;
  document.getElementById('playfield').hidden = false;
  document.querySelector('.briefing-rail').hidden = false;
  renderRound();
  scenarioTitle.focus?.();
}

function shareOnFacebook() {
  const quote = language === 'en'
    ? `I scored ${score}/100 on Signal Check, a cybersecurity awareness game by Wraith Security. How would you do?`
    : `Ek het ${score}/100 behaal met Signal Check, ’n kuberveiligheidsbewustmakingspel deur Wraith Security. Hoe sou jy vaar?`;
  const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
  shareUrl.searchParams.set('u', gameUrl);
  shareUrl.searchParams.set('quote', quote);
  window.open(shareUrl.toString(), '_blank', 'noopener,noreferrer');
}

async function copyGameLink() {
  const status = document.getElementById('shareStatus');
  try {
    await navigator.clipboard.writeText(gameUrl);
    status.textContent = language === 'en' ? 'Game link copied. Pass it along!' : 'Spelskakel gekopieer. Deel dit gerus!';
  } catch {
    status.textContent = language === 'en' ? `Copy this link: ${gameUrl}` : `Kopieer hierdie skakel: ${gameUrl}`;
  }
}

languageToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'af' : 'en'));
continueButton.addEventListener('click', finishRound);
document.getElementById('replayButton').addEventListener('click', replay);
document.getElementById('shareButton').addEventListener('click', shareOnFacebook);
document.getElementById('copyButton').addEventListener('click', copyGameLink);
renderRound();
