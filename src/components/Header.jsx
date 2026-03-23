import React from 'react';
import { QUOTES } from '../utils/constants';

export default function Header({ theme, toggleTheme, streak }) {
  const quoteIdx = new Date().getDate() % QUOTES.length;
  const currentQuote = QUOTES[quoteIdx];

  return (
    <div className="header">
      <div className="header-glow"></div>
      <div className="header-top">
        <div className="header-tag">🦋 Profilactic</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="theme-toggle" onClick={toggleTheme} title="Schimbă tema">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="streak-badge" onClick={() => alert(`🔥 Streak: ${streak} zile consecutive`)}>
            <span style={{ fontSize: '1rem' }}>🔥</span>
            <span className="streak-num">{streak}</span>
            <span className="streak-label">zile</span>
          </div>
        </div>
      </div>
      <h1>Suplimentele<br /><em>tale zilnice</em></h1>
      <div className="quote-box">
        <p>"{currentQuote.text}"</p>
        <span>{currentQuote.author}</span>
      </div>
    </div>
  );
}