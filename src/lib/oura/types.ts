/** Raw Oura API v2 response shapes (subset we consume) */

export interface OuraDailyReadiness {
  id: string;
  day: string;
  score: number | null;
  temperature_deviation: number | null;
  contributors?: Record<string, number | null>;
}

export interface OuraDailySleep {
  id: string;
  day: string;
  score: number | null;
  contributors?: Record<string, number | null>;
}

/** Detailed sleep period — total duration + average HRV */
export interface OuraSleepSession {
  id: string;
  day: string;
  total_sleep_duration: number | null;
  average_hrv: number | null;
  average_heart_rate: number | null;
}

export interface OuraDailyActivity {
  id: string;
  day: string;
  score: number | null;
  steps: number | null;
  active_calories: number | null;
  high_activity_time?: number | null;
  medium_activity_time?: number | null;
}

export interface OuraDailyStress {
  id: string;
  day: string;
  stress_high: number | null;
  recovery_high: number | null;
  day_summary: string | null;
}

export interface OuraHeartRateSample {
  bpm: number;
  source: string;
  timestamp: string;
}

export interface OuraCollectionResponse<T> {
  data: T[];
  next_token: string | null;
}

export interface OuraPersonalInfo {
  id: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  biological_sex: string | null;
}