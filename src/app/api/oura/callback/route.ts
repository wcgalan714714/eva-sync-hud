import { NextRequest, NextResponse } from 'next/server';
import { ouraAppOrigin } from '@/lib/oura/config';
import { exchangeCodeForToken } from '@/lib/oura/oauth';
import { attachOuraTokens } from '@/lib/oura/session';

export async function GET(req: NextRequest) {
  const origin = ouraAppOrigin();
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const saved = req.cookies.get('oura_oauth_state')?.value;

  if (!code || !state || state !== saved) {
    return NextResponse.redirect(new URL('/?oura=error&reason=state', origin));
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    const res = NextResponse.redirect(new URL('/?oura=connected', origin));
    attachOuraTokens(res, tokens.access_token, tokens.refresh_token, tokens.expires_in);
    res.cookies.delete('oura_oauth_state');
    return res;
  } catch (e) {
    const reason = e instanceof Error ? encodeURIComponent(e.message.slice(0, 80)) : 'token';
    return NextResponse.redirect(new URL(`/?oura=error&reason=${reason}`, origin));
  }
}