import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const html = readFileSync(join(process.cwd(), 'public', 'hud.html'), 'utf8');
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}