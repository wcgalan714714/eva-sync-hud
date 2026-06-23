import type { KneeLog, NutritionLog } from '@/types/pilot';

const KNEE_KEY = 'eva_knee_log';
const NUTRITION_KEY = 'eva_nutrition_log';

/** Client-side manual logs until Oura + Apple Health fully wired */
export function loadKneeLog(): KneeLog | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KNEE_KEY);
    return raw ? (JSON.parse(raw) as KneeLog) : null;
  } catch {
    return null;
  }
}

export function saveKneeLog(log: KneeLog): void {
  localStorage.setItem(KNEE_KEY, JSON.stringify(log));
}

export function loadNutritionLog(): NutritionLog | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(NUTRITION_KEY);
    return raw ? (JSON.parse(raw) as NutritionLog) : null;
  } catch {
    return null;
  }
}

export function saveNutritionLog(log: NutritionLog): void {
  localStorage.setItem(NUTRITION_KEY, JSON.stringify(log));
}