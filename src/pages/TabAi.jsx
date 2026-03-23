import React, { useState } from 'react';
import { callGemini } from '../services/geminiApi';
import { formatMarkdown } from '../utils/formatters';

export default function TabAi() {
  const [suppInput, setSuppInput] = useState('');
  const [suppRes, setSuppRes] = useState('');
  const [suppLoad, setSuppLoad] = useState(false);

  const [recRes, setRecRes] = useState('');
  const [recLoad, setRecLoad] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: 'Salut! 👋 Sunt asistentul tău pentru sănătatea tiroidei. Cu ce te pot ajuta astăzi?' }]);
  const [chatLoad, setChatLoad] = useState(false);

  const handleSupp = async () => {
    if (!suppInput) return;
    setSuppLoad(true); setSuppRes('');
    const prompt = `Utilizatorul dorește să ia următorul supliment: "${suppInput}". Este acest supliment recomandat, neutru sau periculos pentru Hashimoto? Explică pe scurt si da o lista in jos.`;
    const r = await callGemini(prompt);
    setSuppRes(formatMarkdown(r));
    setSuppLoad(false);
  };

  const handleRec = async () => {
    setRecLoad(true); setRecRes('');
    const proteins = ['piept de pui', 'carne de curcan', 'carne de vită slabă', 'tofu', 'năut', 'linte', 'fasole', 'pește alb', 'ouă', 'ciuperci', 'creveți'];
    const p = proteins[Math.floor(Math.random() * proteins.length)];
    const prompt = `Generează o idee scurtă de masă principală sănătoasă cu sursă: ${p}. Fără somon. Creează lista ingrediente și pași cu bullet point.`;
    const r = await callGemini(prompt);
    setRecRes(formatMarkdown(r));
    setRecLoad(false);
  };

  const sendChat = async () => {
    if (!chatInput) return;
    const txt = chatInput;
    setChatInput('');
    const newChat = [...chatHistory, { role: 'user', text: txt }];
    setChatHistory(newChat);
    setChatLoad(true);

    let pText = "Ești un asistent medical și nutriționist foarte prietenos. Răspunzi clar, la obiect. \nIstoric:\n";
    newChat.forEach(c => pText += `${c.role === 'user' ? 'Utilizator' : 'Tu'}: ${c.text}\n`);
    pText += "Utilizator: " + txt + "\n\nDa raspuns formatat cu asterisc list.";

    const r = await callGemini(pText);
    setChatHistory([...newChat, { role: 'ai', text: r }]);
    setChatLoad(false);
  };

  return (
    <div className="panel active">
      <div className="ai-card">
        <div className="ai-header"><span>🔍</span><div>Verifică un supliment</div></div>
        <p className="ai-desc">Întreabă inteligența artificială dacă un supliment este sigur în Hashimoto.</p>
        <input className="ai-input" value={suppInput} onChange={e=>setSuppInput(e.target.value)} placeholder="Introdu numele suplimentului..." />
        <button className="ai-btn" onClick={handleSupp} disabled={suppLoad}>Verifică Siguranța {suppLoad && <div className="loader" style={{display:'inline-block'}}></div>}</button>
        {suppRes && <div className="ai-result" style={{display:'block'}} dangerouslySetInnerHTML={{__html: suppRes}}></div>}
      </div>

      <div className="ai-card">
        <div className="ai-header"><span>🥗</span><div>Idee de Masă Sănătoasă</div></div>
        <p className="ai-desc">Generează rapid o rețetă delicioasă, simplă și echilibrată nutrițional.</p>
        <button className="ai-btn ai-recipe-btn" onClick={handleRec} disabled={recLoad}>Generează Rețetă {recLoad && <div className="loader" style={{display:'inline-block'}}></div>}</button>
        {recRes && <div className="ai-result recipe-res" style={{display:'block'}} dangerouslySetInnerHTML={{__html: recRes}}></div>}
      </div>

      <div className="ai-card">
        <div className="ai-header"><span>💬</span><div>Chat Asistent</div></div>
        <p className="ai-desc">Discută liber cu asistentul tău virtual.</p>
        <div className="chat-window">
          {chatHistory.map((m, i) => (
            <div key={i} className={`chat-message ${m.role}-message`} dangerouslySetInnerHTML={m.role === 'ai' ? {__html: formatMarkdown(m.text)} : undefined}>
              {m.role === 'user' ? m.text : null}
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input className="ai-input" value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyPress={e => e.key==='Enter' && sendChat()} placeholder="Scrie mesaj..." />
          <button className="ai-btn chat-send-btn" onClick={sendChat} disabled={chatLoad}>Trimite {chatLoad && <div className="loader" style={{display:'inline-block'}}></div>}</button>
        </div>
      </div>
    </div>
  );
}