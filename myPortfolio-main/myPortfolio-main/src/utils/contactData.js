/**
 * Contact Information Configuration
 * Centralized contact details for easy updates
 */

export const CONTACT_CONFIG = {
  // Personal Information
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'Passionate about building web applications with modern technologies',
  
  // Contact Methods
  email: 'profileemail77@gmail.com',
  phone: '+91 XXXXXXXXXX',
  location: 'India',
  website: 'https://yourportfolio.com',
  
  // Response Time
  responseTime: '24 hours',
};

export const SOCIAL_PROFILES = [
  {
    name: 'GitHub',
    url: 'https://github.com/Rahulpadole11',
    icon: 'github',
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
    icon: 'linkedin',
    color: '#0077b5',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourprofile',
    icon: 'twitter',
    color: '#1da1f2',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourprofile',
    icon: 'instagram',
    color: '#e4405f',
  },
];

export const CONTACT_CHANNELS = [
  {
    type: 'email',
    label: 'Email',
    value: CONTACT_CONFIG.email,
    href: `mailto:${CONTACT_CONFIG.email}`,
    icon: 'mail',
    description: 'Send me an email',
  },
  {
    type: 'phone',
    label: 'Phone',
    value: CONTACT_CONFIG.phone,
    href: `tel:${CONTACT_CONFIG.phone}`,
    icon: 'phone',
    description: 'Call me directly',
  },
  {
    type: 'location',
    label: 'Location',
    value: CONTACT_CONFIG.location,
    href: '#',
    icon: 'location',
    description: 'Based in',
  },
  {
    type: 'website',
    label: 'Website',
    value: CONTACT_CONFIG.website,
    href: CONTACT_CONFIG.website,
    icon: 'globe',
    description: 'Visit my website',
  },
];

export const EMAIL_TEMPLATES = {
  inquiry: {
    subject: 'Inquiry from Portfolio',
    template: `Hi,\n\nI'm interested in connecting with you.\n\nBest regards`,
  },
  collaboration: {
    subject: 'Collaboration Proposal',
    template: `Hi,\n\nI have an interesting project collaboration idea.\n\nBest regards`,
  },
  feedback: {
    subject: 'Portfolio Feedback',
    template: `Hi,\n\nI have some feedback about your portfolio.\n\nBest regards`,
  },
};

/**
 * Generate mailto link with pre-filled content
 */
export const generateMailtoLink = (templateType = 'inquiry') => {
  const template = EMAIL_TEMPLATES[templateType] || EMAIL_TEMPLATES.inquiry;
  const subject = encodeURIComponent(template.subject);
  const body = encodeURIComponent(template.template);
  return `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Copy to clipboard utility
 */
export const copyToClipboard = async (text, label = 'Text') => {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`✓ ${label} copied to clipboard`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to copy ${label}:`, err);
    return false;
  }
};
