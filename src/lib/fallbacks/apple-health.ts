/**
 * Apple Health fallback (planned)
 * Options: Health Auto Export → webhook, Shortcuts → API, or on-device HealthKit bridge.
 * Stub for architecture alignment — not wired yet.
 */

export interface AppleHealthBundle {
  exportedAt: string;
  restingHeartRate?: number;
  hrvSdnn?: number;
  sleepHours?: number;
  steps?: number;
}

export function mapAppleHealthToPartial(_bundle: AppleHealthBundle) {
  return {
    source: 'apple_health' as const,
    note: 'Apple Health sync not yet implemented',
  };
}