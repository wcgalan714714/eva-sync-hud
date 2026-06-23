'use client';

import { useState } from 'react';
import type { PilotState } from '@/types/pilot';
import { saveKneeLog } from '@/lib/fallbacks/manual';

export function StrainWing({ pilot, onSave }: { pilot: PilotState; onSave: () => void }) {
  const v = pilot.vitals;
  const knee = pilot.knee;
  const [pain, setPain] = useState(knee?.pain ?? 3);
  const [mobility, setMobility] = useState(knee?.mobility ?? 80);

  function logKnee() {
    saveKneeLog({
      date: new Date().toISOString().slice(0, 10),
      pain,
      mobility,
    });
    onSave();
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">STRAIN SCORE</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{v.strainScore ?? '—'}</div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">STEPS</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{v.steps?.toLocaleString() ?? '—'}</div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">ACTIVE CAL</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{v.activeCalories ?? '—'}</div>
      </div>
      <div className={`panel ${knee && knee.pain > 5 ? 'warn' : ''}`} style={{ padding: 12 }}>
        <div className="label">KNEE TRACK — 膝</div>
        {knee ? (
          <>
            <div className="stat" style={{ fontSize: '1rem' }}>PAIN {knee.pain}/10</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--muted)' }}>MOBILITY {knee.mobility}%</div>
          </>
        ) : (
          <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 8 }}>No log today</div>
        )}
        <div style={{ marginTop: 8, fontSize: '0.5rem' }}>
          <label>PAIN {pain}/10</label>
          <input type="range" min={0} max={10} value={pain} onChange={(e) => setPain(+e.target.value)} style={{ width: '100%' }} />
          <label>MOBILITY {mobility}%</label>
          <input type="range" min={0} max={100} value={mobility} onChange={(e) => setMobility(+e.target.value)} style={{ width: '100%' }} />
          <button type="button" onClick={logKnee} style={{ marginTop: 6, font: 'inherit', fontSize: '0.5rem', padding: '4px 8px', border: '1px solid var(--orange)', background: 'transparent', color: 'var(--orange-bright)', cursor: 'pointer' }}>
            LOG KNEE
          </button>
        </div>
      </div>
    </div>
  );
}