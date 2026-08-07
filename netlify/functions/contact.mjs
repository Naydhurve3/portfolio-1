import { neon } from '@neondatabase/serverless';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body),
});

const clean = (value, max) => String(value || '').trim().slice(0, max);

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!process.env.DATABASE_URL) return json(503, { error: 'Contact service is not configured' });

  try {
    const body = JSON.parse(event.body || '{}');
    if (body.company) return json(200, { ok: true });

    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const subject = clean(body.subject, 160);
    const message = clean(body.message, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: 'Please provide a valid name, email, and message' });
    }

    const sql = neon(process.env.DATABASE_URL);
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_contacts (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        subject VARCHAR(160),
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      INSERT INTO portfolio_contacts (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject || null}, ${message})
    `;

    return json(201, { ok: true });
  } catch (error) {
    console.error('Contact submission failed:', error instanceof Error ? error.message : 'unknown error');
    return json(500, { error: 'Unable to save the message' });
  }
}
