import { bumpSessionEpoch, createSessionCookie, hashPassword, isAdmin, isTrustedOrigin, verifyPasswordAsync, unauthorized } from './_lib/auth.mjs';
import { audit, database, ensureAdminSchema } from './_lib/database.mjs';

export default async function handler(req) {
  if (!isTrustedOrigin(req)) return Response.json({ error: 'Untrusted request origin' }, { status: 403 });
  const sql = database();
  await ensureAdminSchema(sql);
  if (!(await isAdmin(req, sql))) return unauthorized();
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  const body = await req.json().catch(() => ({}));
  const headers = {};

  if (body.signOutAll) {
    await bumpSessionEpoch(sql);
    await audit(sql, 'session.signout_all', 'portfolio_auth', null, {});
    headers['Set-Cookie'] = await createSessionCookie(sql);
    return Response.json({ ok: true }, { headers });
  }

  const currentPassword = String(body.currentPassword || '');
  const newPassword = String(body.newPassword || '');
  if (!(await verifyPasswordAsync(sql, currentPassword))) {
    return Response.json({ error: 'Current password is incorrect' }, { status: 403 });
  }
  if (newPassword.length < 12) {
    return Response.json({ error: 'New password must be at least 12 characters' }, { status: 400 });
  }
  if (newPassword === currentPassword) {
    return Response.json({ error: 'New password must be different from the current one' }, { status: 400 });
  }

  await sql`
    INSERT INTO portfolio_auth (auth_key, auth_value, updated_at)
    VALUES ('password_hash', ${hashPassword(newPassword)}, NOW())
    ON CONFLICT (auth_key) DO UPDATE SET auth_value = EXCLUDED.auth_value, updated_at = NOW()
  `;
  const epoch = await bumpSessionEpoch(sql);
  await audit(sql, 'password.changed', 'portfolio_auth', null, { epoch });
  headers['Set-Cookie'] = await createSessionCookie(sql);
  return Response.json({ ok: true }, { headers });
}
