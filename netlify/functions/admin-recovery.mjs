import { bumpSessionEpoch, hashPassword, isTrustedOrigin, verifyRecoveryCode } from './_lib/auth.mjs';
import { audit, database, ensureAdminSchema } from './_lib/database.mjs';
import { rateLimit } from './_lib/rate-limit.mjs';

export default async function handler(req) {
  if (!isTrustedOrigin(req)) return Response.json({ error: 'Untrusted request origin' }, { status: 403 });
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  const limited = rateLimit(req, { key: 'password-recovery', limit: 3, windowMs: 30 * 60 * 1000, windowLabel: '30 minutes' });
  if (limited) return Response.json(JSON.parse(limited.body), { status: limited.statusCode, headers: limited.headers });

  if (!process.env.ADMIN_RECOVERY_HASH) {
    return Response.json({ error: 'Password recovery has not been configured' }, { status: 503 });
  }

  const { recoveryCode = '', newPassword = '' } = await req.json().catch(() => ({}));
  if (!verifyRecoveryCode(recoveryCode)) {
    await new Promise(resolve => setTimeout(resolve, 650));
    return Response.json({ error: 'Recovery code is incorrect' }, { status: 401 });
  }
  if (String(newPassword).length < 12) {
    return Response.json({ error: 'New password must be at least 12 characters' }, { status: 400 });
  }

  const sql = database();
  await ensureAdminSchema(sql);
  await sql`
    INSERT INTO portfolio_auth (auth_key, auth_value, updated_at)
    VALUES ('password_hash', ${hashPassword(String(newPassword))}, NOW())
    ON CONFLICT (auth_key) DO UPDATE SET auth_value = EXCLUDED.auth_value, updated_at = NOW()
  `;
  const epoch = await bumpSessionEpoch(sql);
  await audit(sql, 'password.recovered', 'portfolio_auth', null, { epoch });
  return Response.json({ ok: true, message: 'Password reset. Sign in with your new password.' });
}
