import React from 'react';

export default function TabCalendar({ history, streak }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay(); 
  startDow = startDow === 0 ? 6 : startDow - 1; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayNum = now.getDate();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(<div key={`empty-${i}`} />);

  let completeDays = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hist = history[dateStr];
    const isToday = d === todayNum;
    
    let cls = 'cal-cell';
    if (isToday) cls += ' today';
    if (hist) {
      if (hist.pct >= 80) { cls += ' complete'; completeDays++; }
      else if (hist.pct > 0) cls += ' partial';
    }
    cells.push(
      <div key={d} className={cls}>
        {d}
        {hist && <div className="dot"></div>}
      </div>
    );
  }

  const actPct = completeDays > 0 ? Math.round(completeDays / todayNum * 100) + '%' : '0%';

  return (
    <div className="panel active">
      <div className="cal-header">
        {['L','M','M','J','V','S','D'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
      </div>
      <div className="cal-grid">{cells}</div>
      <div className="week-stat">
        <div className="wstat"><div className="wstat-num">{completeDays}</div><div className="wstat-label">Zile complete</div></div>
        <div className="wstat"><div className="wstat-num">{streak}</div><div className="wstat-label">Streak actual</div></div>
        <div className="wstat"><div className="wstat-num">{actPct}</div><div className="wstat-label">Luna asta</div></div>
      </div>
    </div>
  );
}