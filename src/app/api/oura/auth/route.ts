import { NextResponse } from 'next/server';
import { buildAuthorizeUrl } from '@/lib/oura/oauth';
import { ouraConfig, ouraConfigured } from '@/lib/oura/config';

export async function GET() {
  const { oauth } = ouraConfigured();
  if (!oauth) {
    return NextResponse.json(
      { error: 'OURA_CLIENT_ID and OURA_CLIENT_SECRET required. Use OURA_PERSONAL_ACCESS_TOKEN for PAT mode.' },
      { status: 503 },
    );
  }

  const state = crypto.randomUUID();
  const res = NextResponse.redirect(buildAuthorizeUrl(state));
  res.cookies.set('oura_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
}