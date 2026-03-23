import React, { useEffect, useState } from 'react';

export default function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#2DD4BF', '#FBBF24', '#FB7185', '#A78BFA', '#67E8F9', '#FDE68A'];
    const p = [];
    for (let i = 0; i < 80; i++) {
      p.push({
        id: i,
        left: Math.random() * 100 + 'vw',
        bg: colors[Math.floor(Math.random() * colors.length)],
        w: (6 + Math.random() * 8) + 'px',
        h: (6 + Math.random() * 8) + 'px',
        br: Math.random() > 0.5 ? '50%' : '2px',
        dur: (1.5 + Math.random() * 2) + 's',
        del: Math.random() * 0.8 + 's'
      });
    }
    setPieces(p);
  }, []);

  return (
    <div className="confetti-container" style={{ pointerEvents: 'none' }}>
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{
          position: 'absolute',
          top: '-20px',
          left: p.left, background: p.bg, width: p.w, height: p.h, 
          borderRadius: p.br, animationDuration: p.dur, animationDelay: p.del,
          animation: `confettiFall \${p.dur} linear forwards \${p.del}`
        }}></div>
      ))}
    </div>
  );
}
