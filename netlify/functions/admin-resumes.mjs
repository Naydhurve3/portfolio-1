import { createHash, randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { isAdmin, isTrustedOrigin, unauthorized } from './_lib/auth.mjs';
import { audit, database, ensureAdminSchema } from './_lib/database.mjs';

const MAX_BYTES = 5 * 1024 * 1024;

export default async function handler(req) {
  if (!isAdmin(req) || !isTrustedOrigin(req)) return unauthorized();
  const sql = database();
  await ensureAdminSchema(sql);

  if (req.method === 'GET') {
    const versions = await sql`
      SELECT id, original_name, file_size, file_hash, is_active, created_at, activated_at
      FROM portfolio_resume_versions ORDER BY created_at DESC LIMIT 25
    `;
    return Response.json({ versions });
  }

  if (req.method === 'PATCH') {
    const { id } = await req.json().catch(() => ({}));
    if (!id) return Response.json({ error: 'Resume version is required' }, { status: 400 });
    await sql`UPDATE portfolio_resume_versions SET is_active = FALSE WHERE is_active = TRUE`;
    const activated = await sql`
      UPDATE portfolio_resume_versions SET is_active = TRUE, activated_at = NOW()
      WHERE id = ${id} RETURNING id, original_name
    `;
    if (!activated.length) return Response.json({ error: 'Resume version not found' }, { status: 404 });
    await audit(sql, 'resume.activated', 'resume', String(id), { originalName: activated[0].original_name });
    return Response.json({ ok: true });
  }

  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  const form = await req.formData();
  const file = form.get('resume');
  if (!(file instanceof File)) return Response.json({ error: 'Select a PDF file' }, { status: 400 });
  if (file.type !== 'application/pdf' || file.size < 5 || file.size > MAX_BYTES) {
    return Response.json({ error: 'Resume must be a PDF smaller than 5 MB' }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
    return Response.json({ error: 'The uploaded file is not a valid PDF' }, { status: 400 });
  }

  const hash = createHash('sha256').update(bytes).digest('hex');
  const key = `resume/${Date.now()}-${randomUUID()}.pdf`;
  await getStore('portfolio-private').set(key, bytes, { metadata: { contentType: 'application/pdf', hash } });
  const rows = await sql`
    INSERT INTO portfolio_resume_versions (object_key, original_name, file_size, file_hash)
    VALUES (${key}, ${file.name.slice(0, 180)}, ${file.size}, ${hash})
    RETURNING id
  `;
  await audit(sql, 'resume.uploaded', 'resume', String(rows[0].id), { originalName: file.name, size: file.size, hash });
  return Response.json({ ok: true, id: rows[0].id }, { status: 201 });
}
