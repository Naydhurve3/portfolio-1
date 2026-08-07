# Private Portfolio Admin Setup

The admin UI is available at `/admin`. It controls resume versions, public availability settings, announcements, response-time text, and the private contact inbox.

## Security model

- The password hash, session signing secret, database URL, and Blob credentials never enter the Vite browser bundle.
- Admin sessions use an `HttpOnly`, `Secure`, `SameSite=Strict` cookie with an eight-hour expiry.
- Passwords are checked with Node `scrypt`; the raw password is never stored.
- Non-read admin requests require a same-origin request.
- Resume uploads are limited to PDF files under 5 MB and checked for the `%PDF-` file signature.
- Uploaded resumes remain in the private `portfolio-private` Netlify Blob store. Only the active version is served through `/api/resume`.
- Every upload, activation and settings update writes an audit event to Neon.

## One-time configuration

1. Generate the password hash and session secret locally:

   ```powershell
   npm run admin:hash
   ```

2. In Netlify, open **Project configuration → Environment variables** and add the three generated/runtime values:

   - `DATABASE_URL`: the full Neon Postgres connection string.
   - `ADMIN_PASSWORD_HASH`: the generated `scrypt$...` value.
   - `ADMIN_SESSION_SECRET`: the generated random value.

3. Mark all three as secret values. If your Netlify plan supports scopes, restrict them to **Functions**.

4. Redeploy the production site. Environment-variable changes are applied to Functions at deploy time.

5. Open `https://YOUR_DOMAIN/admin`, sign in, upload a sanitized public resume, preview it through the portfolio, and keep the private master resume outside the public website.

## Resume lifecycle

1. Uploading creates an inactive immutable version in Netlify Blobs.
2. **Upload & publish** activates that version after storage succeeds.
3. The public Resume button calls `/api/resume`, which serves only the active version.
4. **Restore** makes any older version active without deleting history.
5. If the database or Blob service is not configured, `/api/resume` falls back to the existing static resume.

## Database objects

The server functions create and maintain:

- `portfolio_resume_versions`
- `portfolio_settings`
- `portfolio_audit_log`
- `portfolio_contacts` (created by the contact function)

Do not add the real values from `.env.example` to Git. Configure them only in Netlify's environment-variable UI or API.
