import { NextResponse } from 'next/server';
import { ouraConfigured } from '@/lib/oura/config';

export async function GET() {
  const cfg = ouraConfigured();
  return NextResponse.json({
    ok: true,
    oura: cfg,
    version: '0.2.0',
    mode: cfg.pat ? 'personal_access_token' : cfg.oauth ? 'oauth' : 'mock',
  });
}