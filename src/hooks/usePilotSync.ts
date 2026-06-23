'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PILOT_STATE, type PilotState } from '@/types/pilot';

const REFRESH_MS = 5 * 60 * 1000; // 5 min near-real-time

export function usePilotSync() {
  const [pilot, setPilot] = useState<PilotState>(DEFAULT_PILOT_STATE);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/oura/sync', { cache: 'no-store' });
      const data = await res.json();
      if (data.pilot) setPilot(data.pilot);
      setConnected(Boolean(data.connected));
      if (data.error) setError(data.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sync failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    sync();
    const id = setInterval(sync, REFRESH_MS);
    return () => clearInterval(id);
  }, [sync]);

  return { pilot, connected, loading, error, sync };
}