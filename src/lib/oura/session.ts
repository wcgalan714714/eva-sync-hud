import { cookies } from 'next/headers';
import { refreshAccessToken } from './oauth';

const TOKEN_COOKIE = 'oura_access_token';
const REFRESH_COOKIE = 'oura_refresh_token';
const EXPIRES_COOKIE = 'oura_token_expires';

function cookieOpts(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

export async function getOuraToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(TOKEN_COOKIE)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value ?? null;
}

export async function setOuraTokens(
  access: string,
  refresh?: string,
  expiresIn?: number,
): Promise<void> {
  const jar = await cookies();
  jar.set(TOKEN_COOKIE, access, cookieOpts(60 * 60 * 24 * 30));
  if (refresh) {
    jar.set(REFRESH_COOKIE, refresh, cookieOpts(60 * 60 * 24 * 90));
  }
  if (expiresIn) {
    const expiresAt = Math.floor(Date.now() / 1000) + expiresIn - 120;
    jar.set(EXPIRES_COOKIE, String(expiresAt), cookieOpts(60 * 60 * 24 * 90));
  }
}

export async function clearOuraTokens(): Promise<void> {
  const jar = await cookies();
  jar.delete(TOKEN_COOKIE);
  jar.delete(REFRESH_COOKIE);
  jar.delete(EXPIRES_COOKIE);
}

/** Return a valid access token, refreshing automatically when expired. */
export async function getValidOuraToken(): Promise<string | null> {
  const jar = await cookies();
  const access = jar.get(TOKEN_COOKIE)?.value ?? null;
  const refresh = jar.get(REFRESH_COOKIE)?.value ?? null;
  const expiresStr = jar.get(EXPIRES_COOKIE)?.value;
  const expiresAt = expiresStr ? parseInt(expiresStr, 10) : 0;
  const now = Math.floor(Date.now() / 1000);

  if (access && (!expiresAt || expiresAt > now)) return access;

  if (!refresh) return access;

  try {
    const tokens = await refreshAccessToken(refresh);
    await setOuraTokens(
      tokens.access_token,
      tokens.refresh_token ?? refresh,
      tokens.expires_in,
    );
    return tokens.access_token;
  } catch {
    await clearOuraTokens();
    return null;
  }
}