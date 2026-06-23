import { ouraConfig } from './config';
import type {
  OuraCollectionResponse,
  OuraDailyActivity,
  OuraDailyReadiness,
  OuraDailySleep,
  OuraDailyStress,
  OuraHeartRateSample,
  OuraPersonalInfo,
} from './types';

export class OuraApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'OuraApiError';
  }
}

async function ouraFetch<T>(path: string, token: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${ouraConfig.apiBase}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new OuraApiError(`Oura API ${path}: ${res.status} ${body}`, res.status);
  }
  return res.json() as Promise<T>;
}

function dateRange(days = 7): { start_date: string; end_date: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return {
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10),
  };
}

export interface OuraSnapshot {
  personal: OuraPersonalInfo | null;
  readiness: OuraDailyReadiness[];
  sleep: OuraDailySleep[];
  activity: OuraDailyActivity[];
  stress: OuraDailyStress[];
  heartrate: OuraHeartRateSample[];
  fetchedAt: string;
}

/** Pull latest Oura collections for dashboard mapping */
export async function fetchOuraSnapshot(token: string, days = 7): Promise<OuraSnapshot> {
  const range = dateRange(days);
  const [personal, readiness, sleep, activity, stress, heartrate] = await Promise.all([
    ouraFetch<OuraPersonalInfo>('/personal_info', token).catch(() => null),
    ouraFetch<OuraCollectionResponse<OuraDailyReadiness>>('/daily_readiness', token, range),
    ouraFetch<OuraCollectionResponse<OuraDailySleep>>('/daily_sleep', token, range),
    ouraFetch<OuraCollectionResponse<OuraDailyActivity>>('/daily_activity', token, range),
    ouraFetch<OuraCollectionResponse<OuraDailyStress>>('/daily_stress', token, range).catch(() => ({ data: [], next_token: null })),
    ouraFetch<OuraCollectionResponse<OuraHeartRateSample>>('/heartrate', token, {
      start_datetime: new Date(Date.now() - 86400000).toISOString(),
      end_datetime: new Date().toISOString(),
    }).catch(() => ({ data: [], next_token: null })),
  ]);

  return {
    personal,
    readiness: readiness.data,
    sleep: sleep.data,
    activity: activity.data,
    stress: stress.data,
    heartrate: heartrate.data,
    fetchedAt: new Date().toISOString(),
  };
}