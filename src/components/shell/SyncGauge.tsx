'use client';

import type { PilotStatus } from '@/types/pilot';

interface Props {
  readiness: number;
  status: PilotStatus;
}

export function SyncGauge({ readiness, status }: Props) {
  const deg = readiness * 3.6;
  const good = readiness >= 75;
  const low = readiness < 45;
  const color = good ? 'var(--green-neon)' : low ? 'var(--red)' : 'var(--orange-bright)';

  return (
    <div className="sync-gauge" style={{ textAlign: 'center', position: 'relative' }}>
      <div
        style={{
          width: 200,
          height: 200,
          margin: '0 auto',
          borderRadius: '50%',
          border: '4px solid var(--purple-eva)',
          background: `conic-gradient(${color} 0deg ${deg}deg, var(--purple-deep) ${deg}deg 360deg)`,
          boxShadow: `0 0 30px rgba(122,62,181,.5), 0 0 12px ${good ? 'rgba(0,255,159,.4)' : 'rgba(255,107,0,.4)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: good ? 'pulse-border 1.8s ease-in-out infinite' : undefined,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="stat" style={{ fontSize: '3rem', color, lineHeight: 1 }}>
            {Math.round(readiness)}
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--purple)' }}>SYNC %</div>
          <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 4 }}>{status.toUpperCase()}</div>
        </div>
      </div>
      <div className="label" style={{ marginTop: 12 }}>
        READINESS — 同期率
      </div>
    </div>
  );
}