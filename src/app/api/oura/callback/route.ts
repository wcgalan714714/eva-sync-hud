import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/oura/oauth';
import { setOuraTokens } from '@/lib/oura/session';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const saved = req.cookies.get('oura_oauth_state')?.value;

  if (!code || !state || state !== saved) {
    return NextResponse.redirect(new URL('/?oura=error', req.url));
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    await setOuraTokens(tokens.access_token, tokens.refresh_token, tokens.expires_in);
    const res = NextResponse.redirect(new URL('/?oura=connected', req.url));
    res.cookies.delete('oura_oauth_state');
    return res;
  } catch {
    return NextResponse.redirect(new URL('/?oura=error', req.url));
  }
}