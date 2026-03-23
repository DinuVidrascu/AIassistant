import React, { useState } from 'react';
import { callGemini } from '../services/geminiApi';
import { formatMarkdown } from '../utils/formatters';

export default function TabKcal({ state, addMeal, setKcalGoal }) {
  const [manualName, setManualName] = useState('');
  const [manualKcal, setManualKcal] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const [aiInput, setAiInput] = useState('');
  const [aiRes, setAiRes] = useState('');
  const [aiLoad, setAiLoad] = useState(false);

  const totalKcal = state.meals ? state.meals.reduce((sum, m) => sum + m.kcal, 0) : 0;
  const goal = state.kcalGoal || 1800;
  let pct = (totalKcal / goal) * 100;
  if (pct > 100) pct = 100;

  const handleAdd = () => {
    const kcal = parseInt(manualKcal);
    if (!manualName || isNaN(kcal) || kcal <= 0) return;
    addMeal(manualName, kcal);
    setManualName('');
    setManualKcal('');
  };

  const handleEstimate = async () => {
    if (!aiInput) return;
    setAiLoad(true); setAiRes('');
    const prompt = `Estimează caloriile și macronutrienții (Proteine, Grăsimi, Carbohidrați) pentru: "${aiInput}".\nREGULĂ: La toate ce este legat de specificatii le dai in lista in jos in rind fiecare specificatii din rind nou, folosind bullet point (-).`;
    const r = await callGemini(prompt);
    setAiRes(formatMarkdown(r));
    setAiLoad(false);
  };

  const saveGoal = () => {
    const parsed = parseInt(newGoal);
    if (!isNaN(parsed) && parsed > 0) setKcalGoal(parsed);
    setIsEditingGoal(false);
  };

  return (
    <div className="panel active">
      <div className="kcal-header-card">
        <div className="kcal-numbers">
          <span>{totalKcal}</span> <span>/ <span onClick={() => { setNewGoal(goal); setIsEditingGoal(true); }} style={{cursor: 'pointer', borderBottom: '2px dashed var(--muted)', paddingBottom: '2px'}} title="Apasă pentru a modifica">{goal}</span> kcal</span>
        </div>
        <div className="kcal-bar-bg"><div className="kcal-bar-fill" style={{ width: `${pct}%` }}></div></div>
        <p style={{fontSize: '0.75rem', color: 'var(--muted)'}}>Obiectivul tău zilnic de calorii (apasă pe număr pentru a-l modifica).</p>
      </div>

      <div className="kcal-actions">
        <input type="text" className="ai-input" style={{margin:0, flex: 2}} placeholder="Ex: Mic dejun" value={manualName} onChange={e => setManualName(e.target.value)} />
        <input type="number" className="ai-input" style={{margin:0, flex: 1}} placeholder="Kcal" value={manualKcal} onChange={e => setManualKcal(e.target.value)} />
        <button className="kcal-add-btn" onClick={handleAdd}>Adaugă</button>
      </div>

      <div className="section-label">Mesele de azi</div>
      <div className="meal-list">
        {(!state.meals || state.meals.length === 0) ? (
          <p style={{color:'var(--muted)', fontSize:'0.8rem', textAlign:'center'}}>Nu ai adăugat nicio masă încă.</p>
        ) : (
          state.meals.map((meal, i) => (
            <div key={i} className="meal-item">
              <div><span className="meal-name">{meal.name}</span><span className="meal-time">{meal.time}</span></div>
              <div className="meal-cals">+{meal.kcal}</div>
            </div>
          ))
        )}
      </div>

      <div className="ai-card" style={{marginTop: '20px'}}>
        <div className="ai-header"><span>🤖</span><div>Estimează Caloriile cu AI</div></div>
        <p className="ai-desc">Nu știi câte calorii ai mâncat? Scrie ce ai consumat, iar asistentul îți va estima nutrienții.</p>
        <input type="text" className="ai-input" placeholder="Ex: 150g pui la grătar cu orez..." value={aiInput} onChange={e => setAiInput(e.target.value)} />
        <button className="ai-btn" onClick={handleEstimate} disabled={aiLoad}>Calculează {aiLoad && <div className="loader" style={{display:'inline-block'}}></div>}</button>
        {aiRes && <div className="ai-result" style={{display:'block'}} dangerouslySetInnerHTML={{__html: aiRes}}></div>}
      </div>

      {isEditingGoal && (
        <div className="modal-overlay open" onClick={(e) => { if(e.target.className.includes('overlay')) setIsEditingGoal(false); }}>
          <div className="modal">
            <div className="modal-handle"></div>
            <h3>Setează Obiectivul</h3>
            <p style={{color:'var(--muted)', fontSize:'0.85rem', textAlign:'center', marginBottom: '20px'}}>Introdu numărul de calorii (kcal) vizat zilnic.</p>
            <input type="number" className="ai-input" style={{fontSize: '1.2rem', textAlign: 'center', marginBottom: '20px'}} placeholder="Ex: 1800" value={newGoal} onChange={e => setNewGoal(e.target.value)} />
            <button className="save-btn" onClick={saveGoal}>Salvează</button>
            <button className="modal-close" onClick={() => setIsEditingGoal(false)}>Anulează</button>
          </div>
        </div>
      )}
    </div>
  );
}