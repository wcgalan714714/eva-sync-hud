'use client';

import type { PilotState } from '@/types/pilot';

export function SleepWing({ pilot }: { pilot: PilotState }) {
  const v = pilot.vitals;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className={`panel ${(v.sleepScore ?? 100) < 60 ? 'warn' : ''}`} style={{ padding: 16, gridColumn: '1 / -1' }}>
        <div className="label">SLEEP SCORE — 睡眠スコア</div>
        <div className={`stat ${(v.sleepScore ?? 0) >= 75 ? 'good' : (v.sleepScore ?? 0) < 55 ? 'bad' : ''}`}>
          {v.sleepScore ?? '—'}
        </div>
        <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 8 }}>
          Recovery wing · maps Oura daily_sleep.score
        </div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">SLEEP HOURS</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{v.sleepHours ?? '—'}</div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">RECOVERY STATUS</div>
        <div className="stat good" style={{ fontSize: '1rem' }}>
          {(v.readiness ?? 0) >= 70 ? 'NOMINAL' : 'RECOVER'}
        </div>
      </div>
    </div>
  );
}