import React from 'react';
import { PILL_INFO } from '../utils/constants';

export default function Modal({ modalKey, onClose }) {
  if (!modalKey || !PILL_INFO[modalKey]) return null;
  const info = PILL_INFO[modalKey];

  return (
    <div className="modal-overlay open" onClick={(e) => { if(e.target.className.includes('overlay')) onClose() }}>
      <div className="modal">
        <div className="modal-handle"></div>
        <span className="modal-emoji">{info.emoji}</span>
        <h3>{info.title}</h3>
        <div className="modal-dose">{info.dose}</div>
        <p className="modal-body">{info.body}</p>
        <div className="modal-tags">
          {info.tags.map((t, i) => <span key={i} className="modal-tag">{t}</span>)}
        </div>
        <button className="modal-close" onClick={onClose}>Închide</button>
      </div>
    </div>
  );
}