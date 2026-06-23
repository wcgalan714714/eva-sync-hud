'use client';

import type { PilotState } from '@/types/pilot';

export function NutritionWing({ pilot }: { pilot: PilotState }) {
  const n = pilot.nutrition;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="panel" style={{ padding: 16, gridColumn: '1 / -1' }}>
        <div className="label">NUTRITION PROTOCOL — LCL ANALOG</div>
        <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 4 }}>
          Protein intake · intermittent fasting window · hydration
        </div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">PROTEIN</div>
        <div className="stat good" style={{ fontSize: '1.2rem' }}>{n?.proteinG ?? '—'}g</div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">FASTING</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{n?.fastingHours ?? '—'}h</div>
      </div>
      <div className="panel" style={{ padding: 12, gridColumn: '1 / -1' }}>
        <div className="label">HYDRATION</div>
        <div
          style={{
            height: 10,
            marginTop: 8,
            border: '1px solid var(--purple-eva)',
            background: '#06060e',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${n?.hydrationPct ?? 0}%`,
              background: 'linear-gradient(90deg, var(--green), var(--green-neon))',
              boxShadow: '0 0 8px var(--green-neon)',
            }}
          />
        </div>
      </div>
    </div>
  );
}