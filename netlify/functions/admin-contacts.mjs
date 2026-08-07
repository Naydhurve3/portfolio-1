import { isAdmin, unauthorized } from './_lib/auth.mjs';
import { database } from './_lib/database.mjs';

export default async function handler(req) {
  if (!isAdmin(req)) return unauthorized();
  if (req.method !== 'GET') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  const sql = database();
  const contacts = await sql`
    SELECT id, name, email, subject, message, created_at
    FROM portfolio_contacts ORDER BY created_at DESC LIMIT 100
  `;
  return Response.json({ contacts });
}
