const OURA_API = 'https://api.ouraring.com';
const OURA_CLOUD = 'https://cloud.ouraring.com';

export const ouraConfig = {
  apiBase: `${OURA_API}/v2/usercollection`,
  tokenUrl: `${OURA_API}/oauth/token`,
  authorizeUrl: `${OURA_CLOUD}/oauth/authorize`,
  /** Scopes for readiness, sleep, activity, stress, heartrate */
  scopes: ['email', 'personal', 'daily', 'heartrate', 'workout', 'session', 'tag'].join(' '),
  clientId: process.env.OURA_CLIENT_ID ?? '',
  clientSecret: process.env.OURA_CLIENT_SECRET ?? '',
  redirectUri: process.env.OURA_REDIRECT_URI ?? 'http://localhost:3000/api/oura/callback',
  /** Personal Access Token — fastest path when ring arrives (dev / single-user) */
  personalAccessToken: process.env.OURA_PERSONAL_ACCESS_TOKEN ?? '',
};

export function ouraConfigured(): { oauth: boolean; pat: boolean } {
  return {
    oauth: Boolean(ouraConfig.clientId && ouraConfig.clientSecret),
    pat: Boolean(ouraConfig.personalAccessToken),
  };
}