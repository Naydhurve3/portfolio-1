# Resume & Contact Operations (Private / Public)

How the portfolio serves a private-managed resume **without redeploying**, plus how
to run the admin panel, contact storage, and rollback.

## Architecture

```
Visitor clicks "Resume"  →  /api/resume  →  public-resume function
                                             │
                        active version in Neon (portfolio_resume_versions)
                                             │
                     PDF bytes in Netlify Blobs store "portfolio-private"
                                             │
                     no DB / no version  →  302 redirect to the static
                                            fallback (public/certificates/…pdf)
```

- **Public by design:** `/api/resume` is unauthenticated — the PDF is meant to be
  publicly downloadable (recruiters, `Content-Disposition: inline`).
- **Private:** *changing* the resume requires the admin password (`/admin`).
- No redeploy is ever needed: Blobs + Neon persist across deploys.

## One-time production setup (Netlify env vars)

Required for the admin panel and contact form to work in production:

| Variable              | Purpose                          | Notes                                   |
| --------------------- | -------------------------------- | --------------------------------------- |
| `ADMIN_PASSWORD_HASH` | scrypt hash of admin password    | Generate per `ADMIN_SETUP.md`           |
| `ADMIN_SESSION_SECRET`| HMAC secret for session cookies  | `openssl rand -hex 32`                  |
| `DATABASE_URL`        | Neon Postgres connection string  | `postgresql://…` (pooled or direct)     |
| `URL` (auto)          | Production site URL              | Set automatically by Netlify            |

Set them: Netlify → Site → **Site configuration → Environment variables**.
`public-resume` / `public-settings` degrade gracefully (fallback PDF / `{}`)
when `DATABASE_URL` is absent, so the site never breaks.

## Daily operation

### Update the resume privately (2 min, no redeploy)
1. Open `https://transcendent-frangollo-953e9a.netlify.app/admin`, sign in.
2. **Resume** tab → upload the new PDF (max 5 MB, must be a real PDF).
3. Click **Activate** on the new version. It serves immediately on `/api/resume`.
   - Every upload is versioned (kept 25 deep) with SHA-256 + audit log.
4. Rollback anytime: Admin → Resume → Activate an older version.

### Contact messages
- Visitors' form submissions (or footer `mailto:` fallback) land in
  `portfolio_contacts` in Neon when `DATABASE_URL` is set.
- Read them: Admin → **Messages**. Rate-limited (10/hour/IP) + honeypot.

### Announcement banner (optional)
- Admin → Settings lets you set a site announcement; the top name banner shows it.

## Security notes
- Login: scrypt verify + signed cookie (`HttpOnly; Secure; SameSite=Strict`),
  8 h expiry, rate-limited 5 tries / 15 min, trusted-origin check on writes.
- The resume PDF itself is intentionally public (it is your CV).
  Keep anything sensitive out of it if you prefer truly private operation.
- Blob store name `portfolio-private` is a label, not access control —
  access control lives in the admin functions (cookie + origin checks).

## Dev workflow
- Local: `npx netlify-cli dev` (proxy `/api` → `:8888`), set the env vars
  (`.env` is not required; functions read process env).
- Deploy: `netlify deploy --prod --dir dist --functions netlify/functions
  --site 3f0e1a74-efa6-4d54-8cad-f8c48a564c04` with `NETLIFY_AUTH_TOKEN` set.
