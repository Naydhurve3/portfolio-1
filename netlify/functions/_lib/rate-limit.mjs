// In-memory rate limiter for serverless functions.
// Per-instance by design: adequate for deterring casual brute force / spam
// without adding a Blobs round-trip on every request.
// Supports both modern (Request) and legacy (event) Netlify function formats.
const buckets = new Map();

function getHeader(headers, name) {
  if (!headers) return '';
  const lower = name.toLowerCase();
  if (typeof headers.get === 'function') return headers.get(name) || headers.get(lower) || '';
  return headers[lower] ?? headers[name] ?? '';
}

function clientIp(req) {
  const ip = getHeader(req.headers, 'x-forwarded-for');
  if (ip) return ip.split(',')[0].trim();
  return getHeader(req.headers, 'cf-connecting-ip') || 'unknown';
}

function sweep(now) {
  if (buckets.size < 2000) return;
  for (const [key, entry] of buckets) {
    if (entry.expiresAt <= now) buckets.delete(key);
  }
}

/**
 * Enforce a sliding window limit. Returns a 429 response object when exceeded.
 * @param {Request|object} req
 * @param {{ key: string, limit: number, windowMs: number, windowLabel: string }} opts
 * @returns {{ statusCode: number, headers: object, body: string }|null}
 */
export function rateLimit(req, { key, limit, windowMs, windowLabel }) {
  const now = Date.now();
  sweep(now);
  const id = `${key}:${clientIp(req)}`;
  const entry = buckets.get(id);
  if (!entry || entry.expiresAt <= now) {
    buckets.set(id, { count: 1, expiresAt: now + windowMs });
    return null;
  }
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.expiresAt - now) / 1000);
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: `Too many attempts. Try again in ${Math.max(1, Math.ceil(retryAfter / 60))} minute(s).` }),
    };
  }
  entry.count += 1;
  return null;
}
