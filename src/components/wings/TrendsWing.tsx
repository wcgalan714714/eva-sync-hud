'use client';

import type { PilotState } from '@/types/pilot';

export function TrendsWing({ pilot }: { pilot: PilotState }) {
  return (
    <div className="panel" style={{ padding: 16 }}>
      <div className="label">LONG-TERM TRENDS — 傾向分析</div>
      <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
        7-day readiness, HRV, sleep, and strain charts will render here once Oura sync is live.
        <br />
        Current readiness baseline: <strong style={{ color: 'var(--orange-bright)' }}>{pilot.vitals.readiness}%</strong>
      </div>
      <div
        style={{
          marginTop: 16,
          height: 120,
          border: '1px solid rgba(142,223,95,.3)',
          background: 'rgba(0,0,0,.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.55rem',
          color: 'var(--purple)',
        }}
      >
        GAUSS / DNA TREND CANVAS — POST-OURA
      </div>
    </div>
  );
}