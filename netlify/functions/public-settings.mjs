import { database, ensureAdminSchema } from './_lib/database.mjs';

export default async function handler() {
  try {
    const sql = database();
    await ensureAdminSchema(sql);
    const rows = await sql`SELECT setting_key, setting_value FROM portfolio_settings`;
    return Response.json(Object.fromEntries(rows.map(row => [row.setting_key, row.setting_value])), {
      headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' }
    });
  } catch {
    return Response.json({});
  }
}
