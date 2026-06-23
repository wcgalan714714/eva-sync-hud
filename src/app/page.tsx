'use client';

import { useState, type ReactNode } from 'react';
import type { WingId } from '@/types/pilot';
import { NgeShell } from '@/components/shell/NgeShell';
import { StatusWing } from '@/components/wings/StatusWing';
import { SleepWing } from '@/components/wings/SleepWing';
import { StrainWing } from '@/components/wings/StrainWing';
import { NutritionWing } from '@/components/wings/NutritionWing';
import { TrendsWing } from '@/components/wings/TrendsWing';
import { usePilotSync } from '@/hooks/usePilotSync';

export default function DashboardPage() {
  const [wing, setWing] = useState<WingId>('status');
  const { pilot, history, connected, loading, error, sync, refreshManual } = usePilotSync();
  const glitch = pilot.vitals.readiness < 55;

  const headerRight = (
    <div style={{ textAlign: 'right', fontSize: '0.55rem' }}>
      <div style={{ color: connected ? 'var(--green-neon)' : 'var(--orange)', animation: 'live 1s step-end infinite' }}>
        {connected ? '● OURA LIVE' : '○ MOCK / DISCONNECTED'}
      </div>
      <button
        type="button"
        onClick={() => sync()}
        style={{
          marginTop: 6,
          background: 'rgba(255,107,0,.15)',
          border: '1px solid var(--orange)',
          color: 'var(--orange-bright)',
          font: 'inherit',
          fontSize: '0.55rem',
          padding: '4px 8px',
          cursor: 'pointer',
          marginRight: 6,
        }}
      >
        {loading ? 'SYNCING…' : 'FORCE SYNC'}
      </button>
      <a
        href="/api/oura/auth"
        style={{ fontSize: '0.55rem', marginLeft: 4 }}
      >
        CONNECT OURA
      </a>
      {error && <div style={{ color: 'var(--red)', marginTop: 4 }}>{error}</div>}
    </div>
  );

  const wings: Record<WingId, ReactNode> = {
    status: <StatusWing pilot={pilot} />,
    sleep: <SleepWing pilot={pilot} />,
    strain: <StrainWing pilot={pilot} onSave={refreshManual} />,
    nutrition: <NutritionWing pilot={pilot} onSave={refreshManual} />,
    trends: <TrendsWing pilot={pilot} history={history} />,
  };

  return (
    <NgeShell active={wing} onWing={setWing} headerRight={headerRight} glitch={glitch}>
      {wings[wing]}
    </NgeShell>
  );
}