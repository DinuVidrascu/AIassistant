import React, { useState } from 'react';

export default function TabJournal({ history, onSave }) {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!note && !mood) return;
    onSave(note, mood);
    setNote('');
    setMood('');
  };

  const entries = Object.entries(history).filter(([,v]) => v.note || v.mood).sort(([a],[b]) => b.localeCompare(a)).slice(0, 14);

  return (
    <div className="panel active">
      <div className="mood-section">
        <div className="section-label">Cum te simți azi?</div>
        <div className="mood-row">
          {[
            {m:'😴', l:'Obosit'}, {m:'😕', l:'Rău'}, {m:'😐', l:'Normal'}, 
            {m:'🙂', l:'Bine'}, {m:'😄', l:'Super'}
          ].map(x => (
            <div key={x.m} className={`mood-btn ${mood === x.m ? 'selected' : ''}`} onClick={() => setMood(x.m)}>
              {x.m}<span>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="section-label">Note zilnice</div>
      <textarea className="journal-input" value={note} onChange={e => setNote(e.target.value)} placeholder="Cum te-ai simțit azi? Efecte observate, energie, somn..."></textarea>
      <button className="save-btn" onClick={handleSave}>Salvează intrarea de azi</button>
      
      <div className="section-label">Istoric</div>
      <div className="journal-entries">
        {entries.length === 0 ? <p style={{color:'var(--muted)', fontSize:'0.8rem', textAlign:'center', padding:'20px 0'}}>Nicio intrare încă.</p> : 
          entries.map(([date, data]) => {
            const d = new Date(date + 'T12:00:00');
            const dateStr = d.toLocaleDateString('ro-RO', { weekday:'short', day:'numeric', month:'long' });
            return (
              <div key={date} className="entry-card">
                <div className="entry-top">
                  <span className="entry-mood">{data.mood || '😐'}</span>
                  <span className="entry-date">{dateStr}{data.time ? ' · ' + data.time : ''}</span>
                  {data.pct !== undefined && <span style={{fontSize:'0.7rem',color:'var(--teal)',background:'var(--teal-dim)',padding:'2px 8px',borderRadius:'6px'}}>{data.pct}%</span>}
                </div>
                {data.note && <p className="entry-text">{data.note}</p>}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}