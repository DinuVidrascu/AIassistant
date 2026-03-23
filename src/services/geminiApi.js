const p1 = "AIzaSy";
const p2 = "B5Z2X-SfiUPFyOCOxC";
const p3 = "7_r6JEvD7OFfoUc";
const apiKey = p1 + p2 + p3;

export async function callGemini(prompt) {
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