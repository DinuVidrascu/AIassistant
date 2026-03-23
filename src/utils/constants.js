export const TOTAL = 6;
export const QUOTES = [
  { text: "Consecvența mică, zilnică, e mai puternică decât perfecțiunea ocazională.", author: "— Sfat pentru Hashimoto" },
  { text: "Tiroida ta îți mulțumește pentru fiecare zi în care ai grijă de ea.", author: "— Reminder zilnic" },
  { text: "Vindecarea autoimună e un maraton, nu un sprint. Fiecare zi contează.", author: "— Nutriție funcțională" },
  { text: "Suplimentele sunt un ajutor, nu un înlocuitor. Cel mai mare medicament ești tu.", author: "— Dr. habit" },
  { text: "Un intestin sănătos e baza unui sistem imun echilibrat.", author: "— Medicina funcțională" },
  { text: "Stresul cronic și Hashimoto nu se înțeleg. Odihnește-te fără vină.", author: "— Sfat zilnic" },
  { text: "Vitamina D și somnul sunt cei mai ieftini și mai eficienți doctori.", author: "— Profilactic" },
];

export const PILL_INFO = {
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