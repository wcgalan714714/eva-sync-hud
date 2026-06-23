import { NextResponse } from 'next/server';
import { ouraConfigured } from '@/lib/oura/config';
import { getRefreshToken, getValidOuraToken } from '@/lib/oura/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cfg = ouraConfigured();
  const refresh = await getRefreshToken();
  const token = await getValidOuraToken();

  return NextResponse.json({
    configured: cfg.oauth || cfg.pat,
    oauth: cfg.oauth,
    pat: cfg.pat,
    hasSession: Boolean(refresh || token || cfg.pat),
    hasToken: Boolean(token || cfg.pat),
    mode: cfg.pat ? 'personal_access_token' : cfg.oauth ? 'oauth' : 'unconfigured',
  });
}