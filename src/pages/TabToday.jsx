import React from 'react';
import PillCard from '../components/PillCard';
import { TOTAL } from '../utils/constants';

export default function TabToday({ pills, togglePill, setModal, isAllDone }) {
  return (
    <div className="panel active">
      {isAllDone && (
        <div className="all-done-banner show">
          <div className="big">🎉</div>
          <p>Felicitări! Ai luat toate suplimentele azi!</p>
        </div>
      )}

      {/* 07:00 */}
      <div className="time-block t1">
        <div className="time-header">
          <div className="time-dot"></div><span className="time-title">Pe stomacul gol</span><span className="time-clock">07:00</span>
        </div>
        <div className="pill-card">
          <PillCard emoji="🦠" name="LactoBif 5 Probiotice" isHashi={true} sub="1 capsulă • 20-30 min înainte de masă" 
            isDone={pills[0]} onToggle={() => togglePill(0)} onInfo={() => setModal({ open: true, key: 'probiotic' })} />
        </div>
      </div>
      
      {/* 08:00 */}
      <div className="time-block t2">
        <div className="time-header">
          <div className="time-dot"></div><span className="time-title">Micul dejun</span><span className="time-clock">08:00</span>
        </div>
        <div className="pill-card">
          <PillCard emoji="🐟" name="Omega-3 Fish Oil" isHashi={true} sub="1 capsulă • cu grăsimi pentru absorbție maximă" 
            isDone={pills[1]} onToggle={() => togglePill(1)} onInfo={() => setModal({ open: true, key: 'omega3' })} />
          <PillCard emoji="⚡" name="B-Complex (Life Extension)" sub="1 capsulă • ⚠️ oprește cu 48h înainte de analize!" 
            isDone={pills[2]} onToggle={() => togglePill(2)} onInfo={() => setModal({ open: true, key: 'bcomplex' })} />
          <PillCard emoji="☀️" name="Vitamina D3 & K2 (1,000 IU)" isHashi={true} sub="1 capsulă • K2 ghidează calciul spre oase" 
            isDone={pills[3]} onToggle={() => togglePill(3)} onInfo={() => setModal({ open: true, key: 'd3k2' })} />
        </div>
      </div>

      {/* 19:00 */}
      <div className="time-block t3">
        <div className="time-header">
          <div className="time-dot"></div><span className="time-title">Cina</span><span className="time-clock">19:00</span>
        </div>
        <div className="pill-card">
          <PillCard emoji="🪨" name="Magneziu Glicinat (200mg)" isHashi={true} sub="1-2 tablete • relaxare musculară & somn" 
            isDone={pills[4]} onToggle={() => togglePill(4)} onInfo={() => setModal({ open: true, key: 'magneziu' })} />
        </div>
      </div>

      {/* 22:00 */}
      <div className="time-block t4">
        <div className="time-header">
          <div className="time-dot"></div><span className="time-title">Înainte de culcare</span><span className="time-clock">22:00</span>
        </div>
        <div className="pill-card">
          <PillCard emoji="🌿" name="Ashwagandha (450mg)" sub="1 capsulă • ⚠️ monitorizează palpitații sau insomnie" 
            isDone={pills[5]} onToggle={() => togglePill(5)} onInfo={() => setModal({ open: true, key: 'ashwagandha' })} />
        </div>
      </div>
    </div>
  );
}