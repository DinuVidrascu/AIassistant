import React from 'react';
import { TOTAL } from '../utils/constants';

export default function Progress({ donePills }) {
  const pct = Math.round((donePills / TOTAL) * 100);
  const isAllDone = donePills === TOTAL;

  return (
    <div className="progress-section">
      <div className="prog-track">
        <div className="prog-row">
          <span>{donePills} din {TOTAL} luate azi {isAllDone ? '🎉' : ''}</span>
          <strong>{pct}%</strong>
        </div>
        <div className="prog-bar"><div className="prog-fill" style={{ width: `${pct}%` }}></div></div>
      </div>
    </div>
  );
}