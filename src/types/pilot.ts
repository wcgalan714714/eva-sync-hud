/** Eva / Pilot dashboard state — mapped from Oura + fallbacks */

export type WingId = 'status' | 'sleep' | 'strain' | 'nutrition' | 'trends';

export type DataSource = 'oura' | 'apple_health' | 'manual' | 'mock';

export type PilotStatus = 'nominal' | 'caution' | 'warning' | 'critical';

export interface KneeLog {
  date: string;
  pain: number; // 0–10
  mobility: number; // 0–100
  notes?: string;
}

export interface NutritionLog {
  date: string;
  proteinG: number;
  fastingHours?: number;
  hydrationPct?: number;
}

export interface PilotVitals {
  readiness: number; // 0–100 → SYNC gauge
  hrvMs: number | null;
  rhrBpm: number | null;
  tempDeviation: number | null;
  stressScore: number | null;
  recoveryHigh: number | null;
  sleepScore: number | null;
  sleepHours: number | null;
  strainScore: number | null;
  steps: number | null;
  activeCalories: number | null;
}

export interface PilotState {
  source: DataSource;
  status: PilotStatus;
  lastSync: string | null;
  vitals: PilotVitals;
  knee: KneeLog | null;
  nutrition: NutritionLog | null;
  alerts: string[];
  ouraConnected: boolean;
}

export const DEFAULT_PILOT_STATE: PilotState = {
  source: 'mock',
  status: 'nominal',
  lastSync: null,
  vitals: {
    readiness: 72,
    hrvMs: 42,
    rhrBpm: 58,
    tempDeviation: 0.1,
    stressScore: 28,
    recoveryHigh: 42,
    sleepScore: 78,
    sleepHours: 7.2,
    strainScore: 45,
    steps: 6200,
    activeCalories: 320,
  },
  knee: null,
  nutrition: { date: new Date().toISOString().slice(0, 10), proteinG: 1240, fastingHours: 14, hydrationPct: 87 },
  alerts: [],
  ouraConnected: false,
};