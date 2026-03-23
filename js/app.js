// ─── DATA ───
const TOTAL = 6;
const TODAY = new Date().toISOString().split('T')[0];

let state = {
  checked: 0,
  pills: Array(6).fill(false),
  streak: 0,
  lastDate: null,
  history: {}, // { "YYYY-MM-DD": { pct: 100, mood: "😊", note: "..." } }
};

const QUOTES = [
  { text: "Consecvența mică, zilnică, e mai puternică decât perfecțiunea ocazională.", author: "— Sfat pentru Hashimoto" },
  { text: "Tiroida ta îți mulțumește pentru fiecare zi în care ai grijă de ea.", author: "— Reminder zilnic" },
  { text: "Vindecarea autoimună e un maraton, nu un sprint. Fiecare zi contează.", author: "— Nutriție funcțională" },
  { text: "Suplimentele sunt un ajutor, nu un înlocuitor. Cel mai mare medicament ești tu.", author: "— Dr. habit" },
  { text: "Un intestin sănătos e baza unui sistem imun echilibrat.", author: "— Medicina funcțională" },
  { text: "Stresul cronic și Hashimoto nu se înțeleg. Odihnește-te fără vină.", author: "— Sfat zilnic" },
  { text: "Vitamina D și somnul sunt cei mai ieftini și mai eficienți doctori.", author: "— Profilactic" },
];

const PILL_INFO = {
  probiotic: {
    emoji: '🦠', title: 'LactoBif 5 Probiotice', dose: '1 capsulă dimineața • pe stomacul gol',
    body: 'Conține 8 tulpini active, inclusiv Lactobacillus și Bifidobacterium. Extrem de important în Hashimoto deoarece 70% din sistemul imun se află în intestin. Un microbiom dezechilibrat poate amplifica inflamația autoimună. Ia-l cu 20-30 min înainte de masă pentru eficiență maximă.',
    tags: ['🦋 Hashimoto', '🧬 Imunitate', '🫁 Intestin', '✓ Fără refrigerare']
  },
  omega3: {
    emoji: '🐟', title: 'Omega-3 Fish Oil', dose: '180mg EPA / 120mg DHA · 1 capsulă',
    body: 'Acizii grași omega-3 reduc inflamația sistemică, esențial în bolile autoimune. EPA acționează ca antiinflamator, DHA susține creierul și sistemul nervos. Ia-l mereu cu o masă care conține grăsimi (ouă, unt, avocado) pentru o absorbție cu 50% mai bună.',
    tags: ['🦋 Hashimoto', '❤️ Inimă', '🧠 Creier', '🔥 Anti-inflamator']
  },
  bcomplex: {
    emoji: '⚡', title: 'B-Complex BioActive', dose: '1 capsulă cu micul dejun',
    body: 'Forma bioactivă înseamnă că vitaminele sunt gata de utilizat fără conversie hepatică. B12 și folatul sunt adesea deficitare la persoanele cu Hashimoto. ATENȚIE: Biotina din complexul B poate falsifica analizele de tiroidă (TSH, T3, T4). Oprește cu 48-72 ore înainte de orice recoltare.',
    tags: ['⚠️ Stop 48h pre-analize', '⚡ Energie', '🧠 Neurotransmițători', '✓ BioActiv']
  },
  d3k2: {
    emoji: '☀️', title: 'Vitamina D3 & K2', dose: '1,000 IU D3 + 45mcg K2 · 1 capsulă',
    body: 'Combinația D3+K2 este ideală: D3 îmbunătățește absorbția calciului și modulează sistemul imun, K2 direcționează calciul spre oase și dinți, prevenind depunerea în artere. Deficiența de vitamina D este extrem de frecventă în Hashimoto și asociată cu niveluri mai ridicate de anticorpi anti-TPO.',
    tags: ['🦋 Hashimoto', '🦴 Oase', '💪 Imunitate', '❤️ Artere sănătoase']
  },
  magneziu: {
    emoji: '🪨', title: 'Magneziu Glicinat', dose: '200mg · 1-2 tablete seara',
    body: 'Glicinatul este forma cu cea mai bună biodisponibilitate și toleranță gastrică. Magneziul este cofactor în peste 300 reacții enzimatice, inclusiv activarea vitaminei D și sinteza hormonilor tiroidieni. Persoanele cu Hashimoto sunt adesea deficitare. Seara reduce cortizolul și îmbunătățește somnul.',
    tags: ['🦋 Hashimoto', '😴 Somn', '💪 Mușchi', '🧘 Relaxare']
  },
  ashwagandha: {
    emoji: '🌿', title: 'Ashwagandha KSM-66', dose: '450mg · 1 capsulă seara',
    body: 'Adaptogen puternic care reduce cortizolul și îmbunătățește rezistența la stres. Studii arată că poate crește T3 și T4, ceea ce e benefic în hipotiroidism, dar necesită monitorizare. Dacă iei Euthyrox, informează endocrinologul. Dacă simți palpitații, nervozitate excesivă sau insomnie, reduce doza sau oprește.',
    tags: ['⚠️ Monitorizare tiroidă', '😴 Somn', '🧘 Stres', '💪 Vitalitate']
  }
};

// ─── LOAD STATE ───
function loadState() {
  try {
    const saved = localStorage.getItem('hashi_state_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) { }

  // Check if new day
  if (state.lastDate !== TODAY) {
    if (state.lastDate) {
      // Save yesterday completion
      const yPct = state.pills.filter(Boolean).length / TOTAL * 100;
      if (!state.history[state.lastDate]) {
        state.history[state.lastDate] = { pct: Math.round(yPct) };
      }
      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split('T')[0];
      if (state.lastDate === yStr && yPct >= 80) {
        state.streak = (state.streak || 0) + 1;
      } else if (state.lastDate !== yStr) {
        state.streak = 0;
      }
    }
    state.pills = Array(6).fill(false);
    state.lastDate = TODAY;
    saveState();
  }
}

function saveState() {
  try {
    localStorage.setItem('hashi_state_v2', JSON.stringify(state));
  } catch (e) { }
}

// ─── PILLS ───
function togglePill(row) {
  const rows = document.querySelectorAll('.pill-row');
  const idx = Array.from(rows).indexOf(row);
  state.pills[idx] = !state.pills[idx];
  row.classList.toggle('done', state.pills[idx]);
  updateProgress();
  saveState();
}

function updateProgress() {
  const done = state.pills.filter(Boolean).length;
  const pct = Math.round(done / TOTAL * 100);
  document.getElementById('progFill').style.width = pct + '%';
  document.getElementById('progPct').textContent = pct + '%';
  document.getElementById('progLabel').textContent = done + ' din ' + TOTAL + ' luate azi' + (done === TOTAL ? ' 🎉' : '');

  const banner = document.getElementById('allDoneBanner');
  if (done === TOTAL) {
    banner.classList.add('show');
    if (!state._confettiFired) {
      fireConfetti();
      state._confettiFired = true;
      // Save today as complete
      if (!state.history[TODAY]) state.history[TODAY] = {};
      state.history[TODAY].pct = 100;
      state.streak = (state.streak || 0);
      document.getElementById('streakNum').textContent = state.streak;
      saveState();
    }
  } else {
    banner.classList.remove('show');
    state._confettiFired = false;
  }
}

function resetDay() {
  state.pills = Array(6).fill(false);
  state._confettiFired = false;
  document.querySelectorAll('.pill-row').forEach(r => r.classList.remove('done'));
  document.getElementById('allDoneBanner').classList.remove('show');
  updateProgress();
  saveState();
}

// ─── STREAK ───
function showStreakInfo() {
  const s = state.streak;
  alert(`🔥 Streak: ${s} zile consecutive\n\n${s === 0 ? 'Începe azi!' : s < 7 ? 'Continuă! Ești pe drumul cel bun.' : s < 30 ? 'Impresionant! Obiceiul se formează.' : 'Extraordinar! Ești un campion al consecvenței.'}`);
}

// ─── CONFETTI ───
function fireConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#2DD4BF', '#FBBF24', '#FB7185', '#A78BFA', '#67E8F9', '#FDE68A'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 0.8 + 's';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

// ─── TABS ───
function switchTab(name, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
  if (name === 'calendar') renderCalendar();
  if (name === 'jurnal') renderJournal();
}

// ─── CALENDAR ───
function renderCalendar() {
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay(); // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1; // Mon=0

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayNum = now.getDate();

  // Empty cells
  for (let i = 0; i < startDow; i++) {
    const empty = document.createElement('div');
    grid.appendChild(empty);
  }

  let completeDays = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    cell.textContent = d;

    const hist = state.history[dateStr];
    const isToday = d === todayNum;

    if (isToday) cell.classList.add('today');
    if (hist) {
      if (hist.pct >= 80) { cell.classList.add('complete'); completeDays++; }
      else if (hist.pct > 0) cell.classList.add('partial');
      const dot = document.createElement('div');
      dot.className = 'dot';
      cell.appendChild(dot);
    }
    grid.appendChild(cell);
  }

  // Stats
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
  document.getElementById('wstatDays').textContent = completeDays;
  document.getElementById('wstatStreak').textContent = state.streak || 0;
  document.getElementById('wstatPct').textContent = completeDays > 0 ? Math.round(completeDays / todayNum * 100) + '%' : '0%';
}

// ─── JOURNAL ───
let selectedMood = '';

function selectMood(btn, mood) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedMood = mood;
}

function saveEntry() {
  const text = document.getElementById('journalInput').value.trim();
  if (!text && !selectedMood) {
    document.getElementById('journalInput').focus();
    return;
  }
  if (!state.history[TODAY]) state.history[TODAY] = {};
  state.history[TODAY].mood = selectedMood || '😐';
  state.history[TODAY].note = text;
  state.history[TODAY].time = new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
  saveState();
  document.getElementById('journalInput').value = '';
  selectedMood = '';
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  renderJournal();
}

function renderJournal() {
  const container = document.getElementById('journalEntries');
  container.innerHTML = '';
  const entries = Object.entries(state.history)
    .filter(([, v]) => v.note || v.mood)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 14);

  if (entries.length === 0) {
    container.innerHTML = '<p style="color:var(--muted);font-size:0.8rem;text-align:center;padding:20px 0">Nicio intrare încă. Adaugă prima notă! 📝</p>';
    return;
  }

  entries.forEach(([date, data]) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const d = new Date(date + 'T12:00:00');
    const dateStr = d.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'long' });
    card.innerHTML = `
      <div class="entry-top">
        <span class="entry-mood">${data.mood || '😐'}</span>
        <span class="entry-date">${dateStr}${data.time ? ' · ' + data.time : ''}</span>
        ${data.pct !== undefined ? `<span style="font-size:0.7rem;color:var(--teal);background:var(--teal-dim);padding:2px 8px;border-radius:6px">${data.pct}%</span>` : ''}
      </div>
      ${data.note ? `<p class="entry-text">${data.note}</p>` : ''}
    `;
    container.appendChild(card);
  });
}

// ─── INFO MODAL ───
function openInfo(key) {
  const info = PILL_INFO[key];
  if (!info) return;
  document.getElementById('modalEmoji').textContent = info.emoji;
  document.getElementById('modalTitle').textContent = info.title;
  document.getElementById('modalDose').textContent = info.dose;
  document.getElementById('modalBody').textContent = info.body;
  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = info.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── QUOTE ───
function setQuote() {
  const idx = new Date().getDate() % QUOTES.length;
  const q = QUOTES[idx];
  document.getElementById('quoteText').textContent = '"' + q.text + '"';
  document.getElementById('quoteAuthor').textContent = q.author;
}

// ─── THEME TOGGLE ───
function initTheme() {
  const savedTheme = localStorage.getItem('hashi_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('themeToggleBtn').textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    document.getElementById('themeToggleBtn').textContent = '☀️';
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  document.getElementById('themeToggleBtn').textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('hashi_theme', isLight ? 'light' : 'dark');
}

// ─── INIT ───
initTheme();
loadState();
setQuote();

document.getElementById('streakNum').textContent = state.streak || 0;

// Restore pill states
const rows = document.querySelectorAll('.pill-row');
rows.forEach((row, i) => {
  if (state.pills[i]) row.classList.add('done');
});
updateProgress();

// ─── GEMINI API INTEGRATION ───
const apiKey = "AIzaSyCrai_PY76gU6PnIx6Sw8pxjoDJSolUoJE"; // API key is provided by the environment

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{ text: "Ești un asistent medical și nutriționist virtual. Oferi răspunsuri scurte, la obiect, prietenoase și folosești emoji-uri adecvate. Folosește limba română. Formatează textul important cu Markdown ( **pentru bold** ). La finalul fiecărui răspuns, adaugă disclaimerul: '*Notă: Acest sfat este pur informativ.*'" }]
    }
  };

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Eroare la procesarea răspunsului.";
    } catch (error) {
      if (i === 4) return "Ne pare rău, asistentul AI nu a putut fi accesat momentan. Te rugăm să încerci mai târziu.";
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

async function checkSupplementWithAI() {
  const input = document.getElementById('aiSupplementInput').value.trim();
  if (!input) return;

  const btn = document.getElementById('aiCheckBtn');
  const loader = document.getElementById('aiCheckLoader');
  const resultDiv = document.getElementById('aiCheckResult');

  btn.disabled = true;
  loader.style.display = 'inline-block';
  resultDiv.style.display = 'none';

  // Respectarea preferinței de afișare a specificațiilor (listă în jos, pe rând nou) este adăugată direct în prompt
  const prompt = `Utilizatorul dorește să ia următorul supliment: "${input}". Este acest supliment recomandat, neutru sau periculos pentru persoanele cu tiroidită autoimună (Hashimoto)? Explică pe scurt de ce și menționează posibilele interacțiuni.
  Atenție la formatare: La toate ce este legat de specificatii le dai in lista in jos in rind fiecare specificatii din rind nou, folosind un bullet point (-).`;

  const responseText = await callGemini(prompt);

  resultDiv.innerHTML = formatMarkdown(responseText);
  resultDiv.style.display = 'block';
  btn.disabled = false;
  loader.style.display = 'none';
}

async function generateRecipeWithAI() {
  const btn = document.getElementById('aiRecipeBtn');
  const loader = document.getElementById('aiRecipeLoader');
  const resultDiv = document.getElementById('aiRecipeResult');

  btn.disabled = true;
  loader.style.display = 'inline-block';
  resultDiv.style.display = 'none';

  // Lista de ingrediente pentru a forța AI-ul să ofere diversitate
  const proteins = ['piept de pui', 'carne de curcan', 'carne de vită slabă', 'tofu', 'năut', 'linte', 'fasole', 'pește alb (ex: cod, șalău)', 'ouă', 'ciuperci', 'creveți', 'brânză halloumi', 'miel slab'];
  const randomProtein = proteins[Math.floor(Math.random() * proteins.length)];

  // Prompt actualizat cu ingredient aleatoriu și instrucțiune de a evita somonul
  const prompt = `Generează o idee scurtă de masă principală (prânz sau cină) delicioasă, rapidă și echilibrată nutrițional. 
  IMPORTANT: Vreau diversitate maximă! Te rog să folosești ca sursă principală de proteine: ${randomProtein}. (Evită să recomanzi somon de data aceasta).
  Nu trebuie să aibă restricții stricte legate de diete autoimune, ci pur și simplu să fie o mâncare sănătoasă de zi cu zi.
  Include lista scurtă de ingrediente și 2-3 pași de preparare.
  Atenție la formatare: La toate ce este legat de specificatii, ingrediente sau pași de preparare, le dai in lista in jos in rind fiecare specificatii din rind nou, folosind un bullet point (-).`;

  const responseText = await callGemini(prompt);

  resultDiv.innerHTML = formatMarkdown(responseText);
  resultDiv.style.display = 'block';
  btn.disabled = false;
  loader.style.display = 'none';
}

// ─── CHAT ASSISTANT LOGIC ───
let chatHistory = [];

async function sendChatMessage() {
  const inputEl = document.getElementById('chatInput');
  const text = inputEl.value.trim();
  if (!text) return;

  // 1. Adăugăm mesajul utilizatorului în UI
  appendMessage('user', text);
  inputEl.value = '';

  // 2. Afișăm loader-ul pe buton
  const btn = document.getElementById('chatSendBtn');
  const loader = document.getElementById('chatLoader');
  btn.disabled = true;
  loader.style.display = 'inline-block';

  // 3. Construim prompt-ul contextual (istoric + mesaj nou)
  let promptText = "Ești un asistent medical și nutriționist foarte prietenos. Răspunzi clar, la obiect și cu empatie. Ține cont de contextul discuției anterioare.\n\nIstoric conversație:\n";

  chatHistory.forEach(msg => {
    promptText += `${msg.role === 'user' ? 'Utilizator' : 'Tu'}: ${msg.text}\n`;
  });

  promptText += `\nUtilizator: ${text}\n\n`;
  promptText += `REGULĂ STRICTĂ: La toate ce este legat de specificatii, simptome, beneficii sau recomandari, le dai MEREU in lista in jos in rind, fiecare specificatie din rind nou, folosind bullet point (-).\nRăspunsul tău:`;

  // 4. Apelăm API-ul
  const responseText = await callGemini(promptText);

  // 5. Adăugăm mesajul AI-ului în UI
  appendMessage('ai', responseText);

  // 6. Salvăm în istoric (păstrăm ultimele 10 interacțiuni pentru a nu depăși token limit)
  chatHistory.push({ role: 'user', text: text });
  chatHistory.push({ role: 'ai', text: responseText });
  if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

  // 7. Reset UI
  btn.disabled = false;
  loader.style.display = 'none';
}

function appendMessage(role, text) {
  const windowEl = document.getElementById('chatWindow');
  const msgEl = document.createElement('div');
  msgEl.className = `chat-message ${role}-message`;
  msgEl.innerHTML = role === 'ai' ? formatMarkdown(text) : text;

  windowEl.appendChild(msgEl);
  // Auto-scroll la ultimul mesaj
  windowEl.scrollTop = windowEl.scrollHeight;
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}
