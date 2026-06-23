'use client';

import type { HistoryPoint } from '@/lib/trends/history';

interface Props {
  history: HistoryPoint[];
  field: keyof Pick<HistoryPoint, 'readiness' | 'hrvMs' | 'sleepScore' | 'strainScore'>;
  color: string;
  label: string;
}

export function TrendChart({ history, field, color, label }: Props) {
  const vals = [...history].reverse().map((h) => h[field]).filter((v): v is number => v != null);
  const w = 280;
  const h = 48;
  if (!vals.length) {
    return (
      <div style={{ fontSize: '0.5rem', color: 'var(--muted)' }}>
        {label}: awaiting sync data
      </div>
    );
  }
  const min = Math.min(...vals) - 5;
  const max = Math.max(...vals) + 5;
  const range = max - min || 1;
  const pts = vals.map((v, i) => {
    const x = (i / Math.max(vals.length - 1, 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="label" style={{ marginBottom: 4 }}>{label}</div>
      <svg width={w} height={h} style={{ display: 'block', border: '1px solid rgba(122,62,181,.3)', background: 'rgba(0,0,0,.35)' }}>
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} />
      </svg>
    </div>
  );
}