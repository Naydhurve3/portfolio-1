import { Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, mailtoUrl, whatsappUrl } from '../../config/contact';

export default function QuickContact({ channels = {} }) {
  const actions = [
    ...(channels.email !== false ? [{ label: 'Email Nayan', href: mailtoUrl(), icon: Mail }] : []),
    ...(channels.phone !== false ? [{ label: 'Call Nayan', href: `tel:${CONTACT.phoneE164}`, icon: Phone }] : []),
    ...(channels.whatsapp !== false ? [{ label: 'Chat on WhatsApp', href: whatsappUrl(), icon: MessageCircle, external: true }] : []),
  ];
  if (!actions.length) return null;
  return (
    <aside className="quick-contact" aria-label="Quick contact options">
      <span className="quick-contact__status" aria-hidden="true" />
      <span className="quick-contact__label">Let&apos;s talk</span>
      <div className="quick-contact__actions">
        {actions.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon size={17} />
          </a>
        ))}
      </div>
    </aside>
  );
}
