import { ouraConfig } from './config';

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: ouraConfig.clientId,
    redirect_uri: ouraConfig.redirectUri,
    response_type: 'code',
    scope: ouraConfig.scopes,
    state,
  });
  return `${ouraConfig.authorizeUrl}?${params}`;
}

export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: ouraConfig.redirectUri,
    client_id: ouraConfig.clientId,
    client_secret: ouraConfig.clientSecret,
  });

  const res = await fetch(ouraConfig.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    throw new Error(`Oura token exchange failed: ${res.status}`);
  }
  return res.json();
}