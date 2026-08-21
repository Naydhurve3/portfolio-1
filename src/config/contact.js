export const CONTACT = {
  name: 'Nayan Dhurve',
  email: 'nayankdhurve@gmail.com',
  phoneDisplay: '+91 87885 77239',
  phoneE164: '+918788577239',
  whatsappNumber: '918788577239',
  whatsappMessage: "Hi Nayan! I found your portfolio and would like to discuss an opportunity.",
  github: 'https://github.com/Naydhurve3',
  linkedin: 'https://www.linkedin.com/in/nayan-dhurve-31815a258',
};

export const whatsappUrl = (message = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = ({ name = '', email = '', subject = '', message = '' } = {}) => {
  const mailSubject = subject || `Portfolio enquiry${name ? ` from ${name}` : ''}`;
  const body = [
    name && `Name: ${name}`,
    email && `Reply to: ${email}`,
    message && `Message:\n${message}`,
  ].filter(Boolean).join('\n\n');

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
};
