import { useCallback, useEffect, useState } from 'react';
import {
  Eye, FileClock, FileText, FileUp, KeyRound, LayoutGrid, Lock, LogOut,
  Mail, MessageSquare, Save, ShieldCheck, SlidersHorizontal, Users, ExternalLink,
  ArrowLeft, RefreshCcw
} from 'lucide-react';
import { projects as featuredProjects, secondaryProjects } from '../../data/projects';

const request = async (url, options) => {
  const response = await fetch(url, { credentials: 'same-origin', ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

const DEFAULT_SETTINGS = {
  availability: '',
  responseTime: '',
  announcement: '',
  sections: { about: true, skills: true, projects: true, experience: true },
  channels: { email: true, phone: true, whatsapp: true, github: true, linkedin: true },
  hiddenProjects: [],
  resumeVisible: true,
};

const TABS = [
  { id: 'resume', label: 'Resume manager', icon: FileClock },
  { id: 'visibility', label: 'What visitors see', icon: Eye },
  { id: 'projects', label: 'Project visibility', icon: LayoutGrid },
  { id: 'settings', label: 'Site text & status', icon: SlidersHorizontal },
  { id: 'inbox', label: 'Enquiries', icon: MessageSquare },
  { id: 'account', label: 'Account & sessions', icon: KeyRound },
];

const SECTION_LABELS = { about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Journey' };
const CHANNEL_LABELS = { email: 'Email', phone: 'Phone', whatsapp: 'WhatsApp', github: 'GitHub', linkedin: 'LinkedIn' };

function Switch({ checked, onChange, label }) {
  return (
    <label className="admin-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="admin-switch__track" aria-hidden="true"><span className="admin-switch__thumb" /></span>
      <span className="admin-switch__label">{label}</span>
    </label>
  );
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [recoveryConfirm, setRecoveryConfirm] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState('resume');
  const [versions, setVersions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loadDashboard = useCallback(async () => {
    const [resumeData, settingsData, contactData] = await Promise.all([
      request('/api/admin/resumes'),
      request('/api/admin/settings'),
      request('/api/admin/contacts').catch(() => ({ contacts: [] })),
    ]);
    setVersions(resumeData.versions || []);
    setSettings(current => ({ ...DEFAULT_SETTINGS, ...current, ...(settingsData.settings || {}) }));
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
    setBusy(true); setError(''); setNotice('');
    try {
      await request('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      setPassword(''); setAuthenticated(true); await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const recoverPassword = async event => {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      if (recoveryPassword !== recoveryConfirm) throw new Error('New passwords do not match');
      const data = await request('/api/admin/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryCode, newPassword: recoveryPassword }),
      });
      setRecoveryCode(''); setRecoveryPassword(''); setRecoveryConfirm('');
      setRecoveryMode(false); setNotice(data.message || 'Password reset. Sign in with your new password.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const uploadResume = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const file = form.elements.resume.files[0];
    if (!file) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const body = new FormData(); body.append('resume', file);
      const uploaded = await request('/api/admin/resumes', { method: 'POST', body });
      await request('/api/admin/resumes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: uploaded.id }) });
      form.reset(); await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const activateResume = async id => {
    setBusy(true); setError(''); setNotice('');
    try {
      await request('/api/admin/resumes', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      await loadDashboard();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const saveSettings = async () => {
    setBusy(true); setError(''); setNotice('');
    try {
      await request('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      setNotice('Live site settings saved and applied instantly.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const toggleGroup = (group, key) => {
    setSettings(current => ({ ...current, [group]: { ...current[group], [key]: !current[group][key] } }));
  };

  const toggleProject = id => {
    setSettings(current => ({
      ...current,
      hiddenProjects: current.hiddenProjects.includes(id)
        ? current.hiddenProjects.filter(pid => pid !== id)
        : [...current.hiddenProjects, id],
    }));
  };

  const changePassword = async event => {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      if (newPassword !== confirmPassword) throw new Error('New passwords do not match');
      await request('/api/admin/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword, newPassword }) });
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      setNotice('Password changed. All other devices were signed out.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const signOutAll = async () => {
    if (!window.confirm('Sign out every admin session, including this one?')) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await request('/api/admin/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ signOutAll: true }) });
      setNotice('All sessions revoked. A fresh session was issued to this device.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    await request('/api/admin/session', { method: 'DELETE' });
    setAuthenticated(false); setVersions([]); setContacts([]); setNotice('');
  };

  const activeVersion = versions.find(version => version.is_active);

  if (checking) return <main className="admin-shell admin-shell--center">Checking secure session…</main>;
  if (!authenticated && recoveryMode) return (
    <main className="admin-shell admin-shell--center">
      <form className="admin-login admin-login--recovery" onSubmit={recoverPassword}>
        <div className="admin-login__icon"><RefreshCcw size={28} /></div>
        <span className="admin-login__eyebrow">Secure account recovery</span>
        <h1>Reset access</h1>
        <p>Use the offline recovery code created during setup. Resetting the password signs out every existing admin session.</p>
        <label>Recovery code
          <div className="admin-login__field"><KeyRound size={15} /><input type="password" value={recoveryCode} onChange={e => setRecoveryCode(e.target.value)} autoComplete="off" required /></div>
        </label>
        <label>New password
          <div className="admin-login__field"><Lock size={15} /><input type="password" value={recoveryPassword} onChange={e => setRecoveryPassword(e.target.value)} autoComplete="new-password" minLength={12} required /></div>
        </label>
        <label>Confirm new password
          <div className="admin-login__field"><Lock size={15} /><input type="password" value={recoveryConfirm} onChange={e => setRecoveryConfirm(e.target.value)} autoComplete="new-password" minLength={12} required /></div>
        </label>
        {error && <div className="admin-error" role="alert">{error}</div>}
        <button className="btn btn-accent" disabled={busy}>{busy ? 'Resetting…' : 'Reset password securely'}</button>
        <button type="button" className="admin-login__text-button" onClick={() => { setRecoveryMode(false); setError(''); }}><ArrowLeft size={13} /> Back to sign in</button>
      </form>
    </main>
  );
  if (!authenticated) return (
    <main className="admin-shell admin-shell--center">
      <form className="admin-login" onSubmit={login}>
        <div className="admin-login__icon"><ShieldCheck size={30} /></div>
        <span className="admin-login__eyebrow">Private control room</span>
        <h1>Portfolio Admin</h1>
        <p>Only server-verified sessions can access resume versions, live-site controls and the private inbox.</p>
        <label>Admin password
          <div className="admin-login__field"><Lock size={15} /><input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></div>
        </label>
        {error && <div className="admin-error" role="alert">{error}</div>}
        {notice && <div className="admin-notice" role="status">{notice}</div>}
        <button className="btn btn-accent" disabled={busy}>{busy ? 'Verifying…' : 'Enter securely'}</button>
        <button type="button" className="admin-login__text-button" onClick={() => { setRecoveryMode(true); setError(''); setNotice(''); }}>Forgot password?</button>
        <a href="/">← Return to portfolio</a>
      </form>
    </main>
  );

  return (
    <main className="admin-shell admin-shell--app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          N.<span>DHURVE</span>
          <small>Control room</small>
        </div>
        <nav className="admin-sidebar__nav" aria-label="Admin sections">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`admin-sidebar__link ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
              aria-current={tab === id ? 'page' : undefined}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <a className="admin-sidebar__link" href="/"><ExternalLink size={16} /> View public site</a>
          <button type="button" className="admin-sidebar__link" onClick={logout}><LogOut size={16} /> Log out</button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-topbar__eyebrow">Private control room</span>
            <h1>{TABS.find(t => t.id === tab)?.label}</h1>
          </div>
          <span className="admin-status-pill"><span /> Live · applies instantly</span>
        </header>

        {error && <div className="admin-error" role="alert">{error}</div>}
        {notice && <div className="admin-notice" role="status">{notice}</div>}

        <div className="admin-content">
          {tab === 'resume' && (
            <>
              <section className="admin-panel">
                <div className="admin-panel__head">
                  <div><span>Resume manager</span><h2>Publish without redeploying</h2></div>
                  <div className="admin-panel__meta">
                    {activeVersion ? <span className="admin-badge">Active: {activeVersion.original_name}</span> : <span className="admin-badge admin-badge--muted">Static fallback active</span>}
                  </div>
                </div>
                <div className="admin-panel__body">
                  <form className="admin-upload" onSubmit={uploadResume}>
                    <label className="admin-file">
                      <input type="file" name="resume" accept="application/pdf,.pdf" required />
                      <span><FileUp size={15} /> Choose PDF (max 5 MB)</span>
                    </label>
                    <button className="btn btn-accent" disabled={busy}><FileUp size={14} /> Upload & publish</button>
                  </form>

                  <div className="admin-versions">
                    <span className="admin-list-label">Version history</span>
                    {versions.length === 0 && <p className="admin-empty">No managed versions yet. The static resume remains active.</p>}
                    {versions.map(version => (
                      <div className={`admin-version ${version.is_active ? 'admin-version--active' : ''}`} key={version.id}>
                        <div className="admin-version__icon"><FileText size={17} /></div>
                        <div className="admin-version__meta">
                          <strong>{version.original_name}</strong>
                          <small>{(version.file_size / 1024).toFixed(0)} KB · {new Date(version.created_at).toLocaleString()}</small>
                        </div>
                        {version.is_active
                          ? <span className="admin-badge">Active</span>
                          : <button className="admin-btn-ghost" onClick={() => activateResume(version.id)} disabled={busy}>Restore</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="admin-panel admin-panel--accent">
                <div className="admin-panel__head"><div><span>Preview</span><h2>Check the public link</h2></div></div>
                <div className="admin-panel__body admin-panel__row">
                  <a className="btn btn-secondary btn-sm" href="/api/resume" target="_blank" rel="noopener noreferrer"><ExternalLink size={13} /> Open /api/resume</a>
                  <span className="admin-hint">Visitors see the active version through the Resume popup on the site.</span>
                </div>
              </section>
            </>
          )}

          {tab === 'visibility' && (
            <section className="admin-panel">
              <div className="admin-panel__head"><div><span>Visibility manager</span><h2>What visitors see</h2></div><Eye /></div>
              <div className="admin-panel__body">
                <p className="admin-hint">Public visitors can always view the page, but only the sections and channels you keep enabled. Changes apply instantly after saving.</p>
                <div className="admin-switch-group">
                  <span className="admin-list-label">Sections</span>
                  {Object.entries(settings.sections).map(([key, value]) => (
                    <Switch key={key} checked={value} onChange={() => toggleGroup('sections', key)} label={SECTION_LABELS[key] || key} />
                  ))}
                </div>
                <div className="admin-switch-group">
                  <span className="admin-list-label">Resume link</span>
                  <Switch checked={settings.resumeVisible} onChange={e => setSettings(s => ({ ...s, resumeVisible: e.target.checked }))} label="Show Resume button and popup" />
                </div>
                <div className="admin-switch-group">
                  <span className="admin-list-label">Contact channels</span>
                  {Object.entries(settings.channels).map(([key, value]) => (
                    <Switch key={key} checked={value} onChange={() => toggleGroup('channels', key)} label={CHANNEL_LABELS[key] || key} />
                  ))}
                </div>
                <div className="admin-panel__actions"><button className="btn btn-primary" onClick={saveSettings} disabled={busy}><Save size={14} /> Apply visibility</button></div>
              </div>
            </section>
          )}

          {tab === 'projects' && (
            <section className="admin-panel">
              <div className="admin-panel__head"><div><span>Project visibility</span><h2>Hide individual projects</h2></div><LayoutGrid /></div>
              <div className="admin-panel__body">
                <p className="admin-hint">Toggle a project off to remove it from the public page. Hidden projects are never deleted — just not shown.</p>
                <div className="admin-switch-group">
                  <span className="admin-list-label">Featured projects</span>
                  {featuredProjects.map(project => (
                    <Switch key={project.id} checked={!settings.hiddenProjects.includes(project.id)} onChange={() => toggleProject(project.id)} label={project.title} />
                  ))}
                </div>
                <div className="admin-switch-group">
                  <span className="admin-list-label">Additional work</span>
                  {secondaryProjects.map(project => (
                    <Switch key={project.id} checked={!settings.hiddenProjects.includes(project.id)} onChange={() => toggleProject(project.id)} label={project.title} />
                  ))}
                </div>
                <div className="admin-panel__actions"><button className="btn btn-primary" onClick={saveSettings} disabled={busy}><Save size={14} /> Apply project visibility</button></div>
              </div>
            </section>
          )}

          {tab === 'settings' && (
            <section className="admin-panel">
              <div className="admin-panel__head"><div><span>Site text & status</span><h2>Live site controls</h2></div><SlidersHorizontal /></div>
              <div className="admin-panel__body admin-form">
                <label className="admin-field">Availability
                  <input value={settings.availability} onChange={e => setSettings(s => ({ ...s, availability: e.target.value }))} placeholder="Available for opportunities" />
                </label>
                <label className="admin-field">Response time
                  <input value={settings.responseTime} onChange={e => setSettings(s => ({ ...s, responseTime: e.target.value }))} placeholder="Usually within 24 hours" />
                </label>
                <label className="admin-field">Announcement
                  <textarea value={settings.announcement} onChange={e => setSettings(s => ({ ...s, announcement: e.target.value }))} placeholder="Optional public announcement" rows={3} />
                </label>
                <div className="admin-panel__actions"><button className="btn btn-primary" onClick={saveSettings} disabled={busy}><Save size={14} /> Save settings</button></div>
              </div>
            </section>
          )}

          {tab === 'inbox' && (
            <section className="admin-panel">
              <div className="admin-panel__head"><div><span>Private inbox</span><h2>Recent enquiries</h2></div><MessageSquare /></div>
              <div className="admin-panel__body">
                {contacts.length === 0 && <p className="admin-empty">No saved enquiries yet. Messages arrive here from the contact form.</p>}
                <div className="admin-contacts">
                  {contacts.slice(0, 20).map(contact => (
                    <article className="admin-message" key={contact.id}>
                      <div className="admin-message__icon"><Mail size={15} /></div>
                      <div className="admin-message__body">
                        <strong>{contact.name}</strong>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        {contact.subject && <p>{contact.subject}</p>}
                        {contact.message && <p className="admin-message__text">{contact.message}</p>}
                        <small>{new Date(contact.created_at).toLocaleString()}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'account' && (
            <section className="admin-panel">
              <div className="admin-panel__head"><div><span>Account & sessions</span><h2>Password & device control</h2></div><KeyRound /></div>
              <div className="admin-panel__body admin-form">
                <form className="admin-form" onSubmit={changePassword}>
                  <label className="admin-field">Current password
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} autoComplete="current-password" required />
                  </label>
                  <label className="admin-field">New password (min 12 characters)
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" minLength={12} required />
                  </label>
                  <label className="admin-field">Confirm new password
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" minLength={12} required />
                  </label>
                  <div className="admin-panel__actions">
                    <button className="btn btn-accent" disabled={busy}><KeyRound size={14} /> Change password</button>
                  </div>
                </form>

                <div className="admin-divider" />

                <div className="admin-panel__row">
                  <div>
                    <span className="admin-list-label">Devices</span>
                    <p className="admin-hint" style={{ margin: 0 }}>Revoke every active session immediately. You'll get a fresh session on this device.</p>
                  </div>
                  <button className="btn btn-secondary" onClick={signOutAll} disabled={busy}><Users size={14} /> Sign out all devices</button>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className="admin-security-note"><ShieldCheck size={15} /> Passwords, database credentials and private files are never included in the browser bundle. Changing your password signs out every other device automatically.</footer>
      </div>
    </main>
  );
}
