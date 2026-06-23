'use client';

import type { PilotState } from '@/types/pilot';
import { SyncGauge } from '../shell/SyncGauge';
import { AlertCascade } from '../shell/AlertCascade';

export function StatusWing({ pilot }: { pilot: PilotState }) {
  const v = pilot.vitals;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="panel" style={{ padding: 16, gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <SyncGauge readiness={v.readiness} status={pilot.status} />
        <AlertCascade alerts={pilot.alerts} />
      </div>
      {[
        ['HRV', v.hrvMs != null ? `${v.hrvMs}ms` : '—', '神経同期'],
        ['RHR', v.rhrBpm != null ? `${v.rhrBpm}bpm` : '—', '脈拍'],
        ['TEMP Δ', v.tempDeviation != null ? v.tempDeviation.toFixed(2) : '—', '体温'],
        ['STRESS', v.stressScore != null ? `${v.stressScore}` : '—', 'ストレス'],
      ].map(([l, val, jp]) => (
        <div key={l} className="panel" style={{ padding: 10 }}>
          <div className="label">{l}</div>
          <div className="nge-jp" style={{ fontSize: '0.5rem', color: 'var(--purple)' }}>{jp}</div>
          <div className="stat" style={{ fontSize: '1.2rem', marginTop: 6 }}>{val}</div>
        </div>
      ))}
      <div className="panel" style={{ padding: 10, gridColumn: '1 / -1', fontSize: '0.55rem', color: 'var(--muted)' }}>
        SOURCE: {pilot.source.toUpperCase()} · LAST SYNC: {pilot.lastSync ? new Date(pilot.lastSync).toLocaleString() : 'MOCK'}
        {pilot.ouraConnected ? ' · OURA LINKED' : ' · OURA PENDING'}
      </div>
    </div>
  );
}