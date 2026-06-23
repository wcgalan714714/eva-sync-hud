'use client';

import type { PilotState } from '@/types/pilot';

export function StrainWing({ pilot }: { pilot: PilotState }) {
  const v = pilot.vitals;
  const knee = pilot.knee;
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
          <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 8 }}>
            Manual knee log · Apple Health fallback planned
          </div>
        )}
      </div>
    </div>
  );
}