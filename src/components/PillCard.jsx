import React from 'react';

export default function PillCard({ emoji, name, isHashi, sub, isDone, onToggle, onInfo }) {
  return (
    <div className={`pill-row ${isDone ? 'done' : ''}`} onClick={onToggle}>
      <div className="pill-emoji">{emoji}</div>
      <div className="pill-body">
        <div className="pill-name">{name} {isHashi && <span className="hashi-pill">Hashimoto</span>}</div>
        <div className="pill-sub">{sub}</div>
      </div>
      <div className="info-btn" onClick={(e) => { e.stopPropagation(); onInfo(); }}>i</div>
      <div className="pill-check">✓</div>
    </div>
  );
}