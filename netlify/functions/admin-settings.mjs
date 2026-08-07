import { isAdmin, isTrustedOrigin, unauthorized } from './_lib/auth.mjs';
import { audit, database, ensureAdminSchema } from './_lib/database.mjs';

const allowed = ['availability', 'responseTime', 'announcement'];

export default async function handler(req) {
  if (!isAdmin(req) || !isTrustedOrigin(req)) return unauthorized();
  const sql = database();
  await ensureAdminSchema(sql);
  if (req.method === 'GET') {
    const rows = await sql`SELECT setting_key, setting_value, updated_at FROM portfolio_settings ORDER BY setting_key`;
    return Response.json({ settings: Object.fromEntries(rows.map(row => [row.setting_key, row.setting_value])) });
  }
  if (req.method !== 'PUT') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  const body = await req.json().catch(() => ({}));
  for (const key of allowed) {
    if (typeof body[key] !== 'string') continue;
    const value = body[key].trim().slice(0, 240);
    await sql`
      INSERT INTO portfolio_settings (setting_key, setting_value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
      ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = NOW()
    `;
  }
  await audit(sql, 'settings.updated', 'portfolio_settings', null, { keys: allowed.filter(key => typeof body[key] === 'string') });
  return Response.json({ ok: true });
}
