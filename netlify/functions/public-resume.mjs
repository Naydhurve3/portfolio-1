import { getStore } from '@netlify/blobs';
import { database, ensureAdminSchema } from './_lib/database.mjs';

export default async function handler() {
  try {
    const sql = database();
    await ensureAdminSchema(sql);
    const rows = await sql`
      SELECT object_key, original_name FROM portfolio_resume_versions
      WHERE is_active = TRUE ORDER BY activated_at DESC LIMIT 1
    `;
    if (!rows.length) return Response.redirect('/certificates/Nayan%20Dhurve%20Resume.pdf', 302);
    const bytes = await getStore('portfolio-private').get(rows[0].object_key, { type: 'arrayBuffer' });
    if (!bytes) return Response.redirect('/certificates/Nayan%20Dhurve%20Resume.pdf', 302);
    return new Response(bytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': `inline; filename="${rows[0].original_name.replace(/["\\]/g, '')}"`,
        'Cache-Control': 'private, max-age=300'
      }
    });
  } catch {
    return Response.redirect('/certificates/Nayan%20Dhurve%20Resume.pdf', 302);
  }
}
