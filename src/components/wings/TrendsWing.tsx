'use client';

import type { PilotState } from '@/types/pilot';
import type { HistoryPoint } from '@/lib/trends/history';
import { TrendChart } from './TrendChart';

export function TrendsWing({ pilot, history }: { pilot: PilotState; history: HistoryPoint[] }) {
  return (
    <div className="panel" style={{ padding: 16 }}>
      <div className="label">LONG-TERM TRENDS — 傾向分析</div>
      <div style={{ fontSize: '0.55rem', color: 'var(--muted)', marginTop: 8, marginBottom: 12 }}>
        Local history from syncs · {history.length} points · baseline {pilot.vitals.readiness}%
      </div>
      <TrendChart history={history} field="readiness" color="var(--orange-bright)" label="READINESS / SYNC" />
      <TrendChart history={history} field="hrvMs" color="var(--green-neon)" label="HRV NEURAL LINK" />
      <TrendChart history={history} field="sleepScore" color="var(--rei)" label="SLEEP SCORE" />
      <TrendChart history={history} field="strainScore" color="var(--purple)" label="STRAIN LOAD" />
    </div>
  );
}