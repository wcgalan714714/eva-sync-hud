import { NextResponse } from 'next/server';
import { fetchOuraSnapshot } from '@/lib/oura/client';
import { mapOuraToPilot } from '@/lib/oura/mapper';
import { ouraConfig, ouraConfigured } from '@/lib/oura/config';
import { getOuraToken } from '@/lib/oura/session';
import { DEFAULT_PILOT_STATE } from '@/types/pilot';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { pat } = ouraConfigured();
  let token = await getOuraToken();

  if (!token && pat) token = ouraConfig.personalAccessToken;
  if (!token) {
    return NextResponse.json({
      pilot: DEFAULT_PILOT_STATE,
      connected: false,
      message: 'No Oura token. Connect via /api/oura/auth or set OURA_PERSONAL_ACCESS_TOKEN.',
    });
  }

  try {
    const snapshot = await fetchOuraSnapshot(token);
    const pilot = mapOuraToPilot(snapshot);
    return NextResponse.json({ pilot, connected: true, snapshot: { fetchedAt: snapshot.fetchedAt } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Oura sync failed';
    return NextResponse.json(
      { pilot: DEFAULT_PILOT_STATE, connected: false, error: msg },
      { status: 502 },
    );
  }
}