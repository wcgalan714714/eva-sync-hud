import type { PilotVitals } from '@/types/pilot';

const KEY = 'eva_pilot_history';
const MAX = 14;

export interface HistoryPoint {
  at: string;
  readiness: number;
  hrvMs: number | null;
  sleepScore: number | null;
  strainScore: number | null;
}

export function loadHistory(): HistoryPoint[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as HistoryPoint[];
  } catch {
    return [];
  }
}

export function appendHistory(v: PilotVitals): HistoryPoint[] {
  const row: HistoryPoint = {
    at: new Date().toISOString(),
    readiness: v.readiness,
    hrvMs: v.hrvMs,
    sleepScore: v.sleepScore,
    strainScore: v.strainScore,
  };
  const prev = loadHistory();
  const last = prev[0];
  if (last && last.readiness === row.readiness && last.at.slice(0, 13) === row.at.slice(0, 13)) {
    return prev;
  }
  const next = [row, ...prev].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}