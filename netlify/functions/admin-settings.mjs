import { isAdmin, isTrustedOrigin, unauthorized } from './_lib/auth.mjs';
import { audit, database, ensureAdminSchema } from './_lib/database.mjs';

const TEXT_KEYS = ['availability', 'responseTime', 'announcement'];
const SECTION_KEYS = ['about', 'skills', 'projects', 'experience'];
const CHANNEL_KEYS = ['email', 'phone', 'whatsapp', 'github', 'linkedin'];

const normalize = value => {
  if (TEXT_KEYS.includes(value)) return { type: 'text' };
  if (value === 'sections') return { type: 'sections', keys: SECTION_KEYS };
  if (value === 'channels') return { type: 'channels', keys: CHANNEL_KEYS };
  if (value === 'hiddenProjects') return { type: 'ids' };
  if (value === 'resumeVisible') return { type: 'boolean' };
  return null;
};

export default async function handler(req) {
  const sql = database();
  await ensureAdminSchema(sql);
  if (!(await isAdmin(req, sql)) || !isTrustedOrigin(req)) return unauthorized();
  if (req.method === 'GET') {
    const rows = await sql`SELECT setting_key, setting_value, updated_at FROM portfolio_settings ORDER BY setting_key`;
    return Response.json({ settings: Object.fromEntries(rows.map(row => [row.setting_key, row.setting_value])) });
  }
  if (req.method !== 'PUT') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  const body = await req.json().catch(() => ({}));
  const changed = [];
  for (const [key, raw] of Object.entries(body)) {
    const spec = normalize(key);
    if (!spec) continue;
    let value;
    if (spec.type === 'text') {
      if (typeof raw !== 'string') continue;
      value = JSON.stringify(raw.trim().slice(0, 240));
    } else if (spec.type === 'boolean') {
      if (typeof raw !== 'boolean') continue;
      value = JSON.stringify(raw);
    } else if (spec.type === 'ids') {
      if (!Array.isArray(raw)) continue;
      value = JSON.stringify([...new Set(raw.filter(id => typeof id === 'string').slice(0, 50))]);
    } else {
      if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) continue;
      const cleaned = {};
      for (const subKey of spec.keys) {
        if (typeof raw[subKey] === 'boolean') cleaned[subKey] = raw[subKey];
      }
      if (!Object.keys(cleaned).length) continue;
      value = JSON.stringify(cleaned);
    }
    await sql`
      INSERT INTO portfolio_settings (setting_key, setting_value, updated_at)
      VALUES (${key}, ${value}::jsonb, NOW())
      ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = NOW()
    `;
    changed.push(key);
  }
  if (changed.length) await audit(sql, 'settings.updated', 'portfolio_settings', null, { keys: changed });
  return Response.json({ ok: true, changed });
}
