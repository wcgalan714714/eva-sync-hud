'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PILOT_STATE, type PilotState } from '@/types/pilot';
import { loadKneeLog, loadNutritionLog } from '@/lib/fallbacks/manual';
import { appendHistory, loadHistory, type HistoryPoint } from '@/lib/trends/history';

const REFRESH_MS = 60 * 1000; // 60s — matches cinematic HUD auto-sync

function mergeManual(base: PilotState): PilotState {
  return {
    ...base,
    knee: loadKneeLog() ?? base.knee,
    nutrition: loadNutritionLog() ?? base.nutrition ?? DEFAULT_PILOT_STATE.nutrition,
  };
}

export function usePilotSync() {
  const [pilot, setPilot] = useState<PilotState>(DEFAULT_PILOT_STATE);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/oura/sync', { cache: 'no-store', credentials: 'same-origin' });
      const data = await res.json();
      if (data.pilot) {
        const merged = mergeManual(data.pilot as PilotState);
        setPilot(merged);
        setHistory(appendHistory(merged.vitals));
      }
      setConnected(Boolean(data.connected));
      if (data.error) setError(data.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sync failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshManual = useCallback(() => {
    setPilot((p) => mergeManual(p));
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    setHistory(loadHistory());
    sync();
    const id = setInterval(sync, REFRESH_MS);
    return () => clearInterval(id);
  }, [sync]);

  return { pilot, history, connected, loading, error, sync, refreshManual };
}