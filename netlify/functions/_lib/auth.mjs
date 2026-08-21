import { createHmac, timingSafeEqual, scryptSync, randomBytes } from 'node:crypto';

const COOKIE_NAME = 'portfolio_admin';
const SESSION_SECONDS = 60 * 60 * 8;

const encode = value => Buffer.from(value).toString('base64url');
const sign = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password, encoded) {
  if (!encoded) return false;
  const [scheme, salt, expected] = encoded.split('$');
  if (scheme !== 'scrypt' || !salt || !expected || !password) return false;
  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, 'hex');
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export async function getStoredPasswordHash(sql) {
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!sql) return envHash || '';
  try {
    const rows = await sql`SELECT auth_value FROM portfolio_auth WHERE auth_key = 'password_hash'`;
    return (rows.length && rows[0].auth_value) || envHash || '';
  } catch {
    return envHash || '';
  }
}

export async function verifyPasswordAsync(sql, password) {
  return verifyPassword(password, await getStoredPasswordHash(sql));
}

export function verifyRecoveryCode(code) {
  const supplied = String(code || '').trim();
  const configuredCode = String(process.env.ADMIN_RECOVERY_CODE || '').trim();
  if (configuredCode) {
    const suppliedDigest = createHmac('sha256', 'portfolio-recovery').update(supplied).digest();
    const configuredDigest = createHmac('sha256', 'portfolio-recovery').update(configuredCode).digest();
    return timingSafeEqual(suppliedDigest, configuredDigest);
  }
  return verifyPassword(supplied, process.env.ADMIN_RECOVERY_HASH || '');
}

export async function getSessionEpoch(sql) {
  if (!sql) return 0;
  try {
    const rows = await sql`SELECT auth_value FROM portfolio_auth WHERE auth_key = 'session_epoch'`;
    return rows.length ? Number(rows[0].auth_value) || 0 : 0;
  } catch {
    return 0;
  }
}

export async function bumpSessionEpoch(sql) {
  await sql`
    INSERT INTO portfolio_auth (auth_key, auth_value, updated_at)
    VALUES ('session_epoch', ${String(Date.now())}, NOW())
    ON CONFLICT (auth_key) DO UPDATE SET auth_value = EXCLUDED.auth_value, updated_at = NOW()
  `;
  return getSessionEpoch(sql);
}

export async function createSessionCookie(sql) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const epoch = await getSessionEpoch(sql);
  const payload = encode(JSON.stringify({ sub: 'portfolio-admin', exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS, v: epoch }));
  const token = `${payload}.${sign(payload, secret)}`;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export async function isAdmin(req, sql) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const cookie = req.headers.get('cookie') || '';
  const token = cookie.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (session.sub !== 'portfolio-admin' || session.exp <= Math.floor(Date.now() / 1000)) return false;
    return Number(session.v) === (await getSessionEpoch(sql));
  } catch {
    return false;
  }
}

export function isTrustedOrigin(req) {
  if (req.method === 'GET' || req.method === 'HEAD') return true;
  const origin = req.headers.get('origin');
  if (!origin) return false;
  const allowed = new Set([new URL(req.url).origin, process.env.URL].filter(Boolean));
  return allowed.has(origin);
}

export const unauthorized = () => Response.json({ error: 'Authentication required' }, { status: 401 });
