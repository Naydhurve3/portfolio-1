import { useCallback, useEffect, useState } from 'react';
import { Download, FileClock, FileUp, LogOut, RefreshCw, Save, ShieldCheck } from 'lucide-react';

const request = async (url, options) => {
  const response = await fetch(url, { credentials: 'same-origin', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [versions, setVersions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ availability: '', responseTime: '', announcement: '' });

  const loadDashboard = useCallback(async () => {
    const [resumeData, settingsData, contactData] = await Promise.all([
      request('/api/admin/resumes'),
      request('/api/admin/settings'),
      request('/api/admin/contacts').catch(() => ({ contacts: [] })),
    ]);
    setVersions(resumeData.versions || []);
    setSettings(current => ({ ...current, ...(settingsData.settings || {}) }));
    setContacts(contactData.contacts || []);
  }, []);

  useEffect(() => {
    request('/api/admin/session')
      .then(async data => {
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) await loadDashboard();
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, [loadDashboard]);

  const login = async event => {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      await request('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      setPassword(''); setAuthenticated(true); await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const uploadResume = async event => {
    event.preventDefault();
    const file = event.currentTarget.elements.resume.files[0];
    if (!file) return;
    setBusy(true); setError('');
    try {
      const body = new FormData(); body.append('resume', file);
      const uploaded = await request('/api/admin/resumes', { method: 'POST', body });
      await request('/api/admin/resumes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: uploaded.id }) });
      event.currentTarget.reset(); await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const activateResume = async id => {
    setBusy(true); setError('');
    try {
      await request('/api/admin/resumes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const saveSettings = async event => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await request('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    await request('/api/admin/session', { method: 'DELETE' });
    setAuthenticated(false); setVersions([]); setContacts([]);
  };

  if (checking) return <main className="admin-shell admin-shell--center">Checking secure session…</main>;
  if (!authenticated) return (
    <main className="admin-shell admin-shell--center">
      <form className="admin-login" onSubmit={login}>
        <ShieldCheck size={34} />
        <span>Private control room</span>
        <h1>Portfolio Admin</h1>
        <p>Only server-verified sessions can access resume versions, enquiries and publishing controls.</p>
        <label>Admin password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label>
        {error && <div className="admin-error" role="alert">{error}</div>}
        <button className="btn btn-accent" disabled={busy}>{busy ? 'Verifying…' : 'Enter securely'}</button>
        <a href="/">← Return to portfolio</a>
      </form>
    </main>
  );

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><span>Private control room</span><h1>Portfolio operations</h1></div>
        <div><a className="btn btn-secondary btn-sm" href="/">View site</a><button className="btn btn-secondary btn-sm" onClick={logout}><LogOut size={14}/> Log out</button></div>
      </header>
      {error && <div className="admin-error" role="alert">{error}</div>}

      <div className="admin-grid">
        <section className="admin-card admin-card--wide">
          <div className="admin-card__heading"><div><span>Resume manager</span><h2>Publish without redeploying</h2></div><FileClock /></div>
          <form className="admin-upload" onSubmit={uploadResume}>
            <input type="file" name="resume" accept="application/pdf,.pdf" required />
            <button className="btn btn-accent btn-sm" disabled={busy}><FileUp size={14}/> Upload & publish</button>
          </form>
          <div className="admin-versions">
            {versions.length === 0 && <p>No managed versions yet. The static resume remains active.</p>}
            {versions.map(version => (
              <div key={version.id}>
                <div><strong>{version.original_name}</strong><small>{(version.file_size / 1024).toFixed(0)} KB · {new Date(version.created_at).toLocaleString()}</small></div>
                {version.is_active ? <span className="admin-active">Active</span> : <button onClick={() => activateResume(version.id)} disabled={busy}>Restore</button>}
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card__heading"><div><span>Public settings</span><h2>Live site controls</h2></div><Save /></div>
          <form className="admin-settings" onSubmit={saveSettings}>
            <label>Availability<input value={settings.availability} onChange={e => setSettings(s => ({ ...s, availability: e.target.value }))} placeholder="Available for opportunities" /></label>
            <label>Response time<input value={settings.responseTime} onChange={e => setSettings(s => ({ ...s, responseTime: e.target.value }))} placeholder="Usually within 24 hours" /></label>
            <label>Announcement<textarea value={settings.announcement} onChange={e => setSettings(s => ({ ...s, announcement: e.target.value }))} placeholder="Optional public announcement" /></label>
            <button className="btn btn-primary btn-sm" disabled={busy}><Save size={14}/> Save settings</button>
          </form>
        </section>

        <section className="admin-card">
          <div className="admin-card__heading"><div><span>Private inbox</span><h2>Recent enquiries</h2></div><RefreshCw /></div>
          <div className="admin-contacts">
            {contacts.length === 0 && <p>No saved enquiries yet.</p>}
            {contacts.slice(0, 8).map(contact => (
              <article key={contact.id}><strong>{contact.name}</strong><a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.subject || 'Portfolio enquiry'}</p><small>{new Date(contact.created_at).toLocaleString()}</small></article>
            ))}
          </div>
        </section>
      </div>
      <footer className="admin-security-note"><ShieldCheck size={15}/> Passwords, database credentials and private files are never included in the browser bundle.</footer>
    </main>
  );
}
