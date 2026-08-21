import { clearSessionCookie, createSessionCookie, isAdmin, isTrustedOrigin, verifyPasswordAsync } from './_lib/auth.mjs';
import { database, ensureAdminSchema } from './_lib/database.mjs';
import { rateLimit } from './_lib/rate-limit.mjs';

export default async function handler(req) {
  if (!isTrustedOrigin(req)) return Response.json({ error: 'Untrusted request origin' }, { status: 403 });
  const sql = database();
  try {
    await ensureAdminSchema(sql);
  } catch {
    if (req.method === 'GET') return Response.json({ authenticated: false });
    return Response.json({ error: 'Control room database is unavailable' }, { status: 503 });
  }
  if (req.method === 'GET') return Response.json({ authenticated: await isAdmin(req, sql) });
  if (req.method === 'DELETE') {
    return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } });
  }
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  const limited = rateLimit(req, { key: 'login', limit: 5, windowMs: 15 * 60 * 1000, windowLabel: '15 minutes' });
  if (limited) return Response.json(JSON.parse(limited.body), { status: limited.statusCode, headers: limited.headers });

  const { password = '' } = await req.json().catch(() => ({}));
  if (!(await verifyPasswordAsync(sql, password))) {
    await new Promise(resolve => setTimeout(resolve, 450));
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return Response.json({ authenticated: true }, { headers: { 'Set-Cookie': await createSessionCookie(sql) } });
}
