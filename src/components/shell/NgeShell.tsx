'use client';

import type { ReactNode } from 'react';
import type { WingId } from '@/types/pilot';

const WINGS: { id: WingId; label: string; jp: string }[] = [
  { id: 'status', label: 'PILOT STATUS', jp: '初号機' },
  { id: 'sleep', label: 'SLEEP & RECOVERY', jp: '睡眠' },
  { id: 'strain', label: 'STRAIN & ACTIVITY', jp: '活動' },
  { id: 'nutrition', label: 'NUTRITION', jp: '栄養' },
  { id: 'trends', label: 'TRENDS', jp: '傾向' },
];

interface Props {
  active: WingId;
  onWing: (id: WingId) => void;
  headerRight?: ReactNode;
  children: ReactNode;
}

export function NgeShell({ active, onWing, headerRight, children }: Props) {
  return (
    <div className="shell" style={{ padding: '12px 16px', position: 'relative', zIndex: 1 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--purple-eva)',
          paddingBottom: 8,
          marginBottom: 12,
        }}
      >
        <div>
          <div className="label">NERV PILOT INTERFACE</div>
          <div className="nge-jp" style={{ fontSize: '0.75rem', color: 'var(--purple)' }}>
            第3新東京市 — OURA LINK
          </div>
        </div>
        {headerRight}
      </header>

      <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {WINGS.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => onWing(w.id)}
            style={{
              background: active === w.id ? 'rgba(255,107,0,.2)' : 'rgba(8,8,16,.8)',
              border: `1px solid ${active === w.id ? 'var(--orange)' : 'rgba(122,62,181,.5)'}`,
              color: active === w.id ? 'var(--green-neon)' : 'var(--muted)',
              font: 'inherit',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            {w.label}
            <span style={{ display: 'block', fontSize: '0.5rem', color: 'var(--purple)' }}>{w.jp}</span>
          </button>
        ))}
      </nav>

      <main>{children}</main>

      <footer style={{ marginTop: 16, fontSize: '0.5rem', color: 'var(--muted)', textAlign: 'center' }}>
        <a href="/cinematic/index.html">CLASSIC CINEMATIC HUD</a>
        {' · '}
        EVA SYNC — PRIVATE LOCAL-FIRST
      </footer>
    </div>
  );
}