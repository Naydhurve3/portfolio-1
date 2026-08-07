import { clearSessionCookie, createSessionCookie, isAdmin, isTrustedOrigin, verifyPassword } from './_lib/auth.mjs';

export default async function handler(req) {
  if (!isTrustedOrigin(req)) return Response.json({ error: 'Untrusted request origin' }, { status: 403 });
  if (req.method === 'GET') return Response.json({ authenticated: isAdmin(req) });
  if (req.method === 'DELETE') {
    return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } });
  }
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  const { password = '' } = await req.json().catch(() => ({}));
  if (!verifyPassword(password)) {
    await new Promise(resolve => setTimeout(resolve, 450));
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return Response.json({ authenticated: true }, { headers: { 'Set-Cookie': createSessionCookie() } });
}
