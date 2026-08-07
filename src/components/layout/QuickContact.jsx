import { Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, mailtoUrl, whatsappUrl } from '../../config/contact';

const actions = [
  { label: 'Email Nayan', href: mailtoUrl(), icon: Mail },
  { label: 'Call Nayan', href: `tel:${CONTACT.phoneE164}`, icon: Phone },
  { label: 'Chat on WhatsApp', href: whatsappUrl(), icon: MessageCircle, external: true },
];

export default function QuickContact() {
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
