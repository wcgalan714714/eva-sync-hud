'use client';

import { useState } from 'react';
import type { PilotState } from '@/types/pilot';
import { saveNutritionLog } from '@/lib/fallbacks/manual';

export function NutritionWing({ pilot, onSave }: { pilot: PilotState; onSave: () => void }) {
  const n = pilot.nutrition;
  const [protein, setProtein] = useState(n?.proteinG ?? 1240);
  const [fasting, setFasting] = useState(n?.fastingHours ?? 14);
  const [hyd, setHyd] = useState(n?.hydrationPct ?? 87);

  function logNutrition() {
    saveNutritionLog({
      date: new Date().toISOString().slice(0, 10),
      proteinG: protein,
      fastingHours: fasting,
      hydrationPct: hyd,
    });
    onSave();
  }

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
        <div className="stat good" style={{ fontSize: '1.2rem' }}>{protein}g</div>
      </div>
      <div className="panel" style={{ padding: 12 }}>
        <div className="label">FASTING</div>
        <div className="stat" style={{ fontSize: '1.2rem' }}>{n?.fastingHours ?? '—'}h</div>
      </div>
      <div className="panel" style={{ padding: 12, gridColumn: '1 / -1' }}>
        <div className="label">HYDRATION — LCL DENSITY</div>
        <input type="range" min={0} max={100} value={hyd} onChange={(e) => setHyd(+e.target.value)} style={{ width: '100%', marginTop: 8 }} />
        <div
          style={{
            height: 10,
            marginTop: 4,
            border: '1px solid var(--purple-eva)',
            background: '#06060e',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${hyd}%`,
              background: 'linear-gradient(90deg, var(--green), var(--green-neon))',
              boxShadow: '0 0 8px var(--green-neon)',
            }}
          />
        </div>
        <button type="button" onClick={logNutrition} style={{ marginTop: 10, font: 'inherit', fontSize: '0.5rem', padding: '4px 8px', border: '1px solid var(--green-neon)', background: 'transparent', color: 'var(--green-neon)', cursor: 'pointer' }}>
          SAVE PROTOCOL
        </button>
      </div>
      <div className="panel" style={{ padding: 12, gridColumn: '1 / -1', fontSize: '0.5rem' }}>
        <label>PROTEIN +10g</label>
        <button type="button" onClick={() => setProtein((p) => p + 10)} style={{ marginLeft: 8, font: 'inherit', fontSize: '0.5rem', padding: '2px 6px', border: '1px solid var(--orange)', background: 'transparent', color: 'var(--orange)', cursor: 'pointer' }}>+10g</button>
        <div style={{ marginTop: 6 }}>IF WINDOW: {fasting}h · adjust via slider after ring sync</div>
        <input type="range" min={0} max={24} value={fasting} onChange={(e) => setFasting(+e.target.value)} style={{ width: '100%' }} />
      </div>
    </div>
  );
}