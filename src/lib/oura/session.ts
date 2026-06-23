import { cookies } from 'next/headers';

const TOKEN_COOKIE = 'oura_access_token';
const REFRESH_COOKIE = 'oura_refresh_token';

export async function getOuraToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(TOKEN_COOKIE)?.value ?? null;
}

export async function setOuraTokens(access: string, refresh?: string): Promise<void> {
  const jar = await cookies();
  const secure = process.env.NODE_ENV === 'production';
  jar.set(TOKEN_COOKIE, access, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  if (refresh) {
    jar.set(REFRESH_COOKIE, refresh, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 90,
    });
  }
}

export async function clearOuraTokens(): Promise<void> {
  const jar = await cookies();
  jar.delete(TOKEN_COOKIE);
  jar.delete(REFRESH_COOKIE);
}