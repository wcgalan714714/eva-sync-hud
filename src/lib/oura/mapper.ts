import type { PilotState, PilotStatus, PilotVitals } from '@/types/pilot';
import type { OuraSnapshot } from './client';

function latest<T extends { day: string }>(rows: T[]): T | null {
  if (!rows.length) return null;
  return [...rows].sort((a, b) => b.day.localeCompare(a.day))[0];
}

function avgRestingBpm(samples: { bpm: number; timestamp: string }[]): number | null {
  if (!samples.length) return null;
  const sorted = [...samples].sort((a, b) => a.bpm - b.bpm);
  const low = sorted.slice(0, Math.max(3, Math.floor(sorted.length * 0.2)));
  return Math.round(low.reduce((s, x) => s + x.bpm, 0) / low.length);
}

function deriveStatus(v: PilotVitals): PilotStatus {
  if (v.readiness < 40 || (v.tempDeviation ?? 0) > 0.5) return 'critical';
  if (v.readiness < 55 || (v.stressScore ?? 0) > 70) return 'warning';
  if (v.readiness < 70) return 'caution';
  return 'nominal';
}

function buildAlerts(v: PilotVitals): string[] {
  const a: string[] = [];
  if (v.readiness < 55) a.push('READINESS LOW — RECOVERY ADVISED');
  if ((v.tempDeviation ?? 0) > 0.3) a.push('TEMP DEVIATION — PATTERN CHECK');
  if ((v.stressScore ?? 0) > 65) a.push('STRESS ELEVATED — NEURAL LOAD HIGH');
  if ((v.hrvMs ?? 99) < 25) a.push('HRV SUPPRESSED — SYNC UNSTABLE');
  if (!a.length) a.push('ALL SYSTEMS NOMINAL');
  return a;
}

/**
 * Map Oura snapshot → Eva Pilot state
 * Readiness = SYNC % | HRV = neural link | RHR = pulse | Strain = activity load
 */
export function mapOuraToPilot(snapshot: OuraSnapshot, extras?: Partial<PilotState>): PilotState {
  const r = latest(snapshot.readiness);
  const s = latest(snapshot.sleep);
  const a = latest(snapshot.activity);
  const st = latest(snapshot.stress);

  const readiness = r?.score ?? 0;
  const hrvContributor = r?.contributors?.hrv_balance ?? null;
  const hrvMs = hrvContributor != null ? Math.round(20 + hrvContributor * 0.8) : null;

  const vitals: PilotVitals = {
    readiness,
    hrvMs,
    rhrBpm: avgRestingBpm(snapshot.heartrate),
    tempDeviation: r?.temperature_deviation ?? null,
    stressScore: st?.stress_high ?? null,
    sleepScore: s?.score ?? null,
    sleepHours: null, // filled from sleep contributors / session later
    strainScore: a?.score ?? null,
    steps: a?.steps ?? null,
    activeCalories: a?.active_calories ?? null,
  };

  return {
    source: 'oura',
    status: deriveStatus(vitals),
    lastSync: snapshot.fetchedAt,
    vitals,
    knee: extras?.knee ?? null,
    nutrition: extras?.nutrition ?? null,
    alerts: buildAlerts(vitals),
    ouraConnected: true,
  };
}