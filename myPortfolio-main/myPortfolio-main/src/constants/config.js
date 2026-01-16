// Constants for the application

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
};

export const ADMIN_CONFIG = {
  DEFAULT_PASSWORD: 'admin123',
  PANEL_WIDTH: '500px',
};

export const FORM_CONFIG = {
  CONTACT_FORM: {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  },
  PROJECT_FORM: {
    title: '',
    description: '',
    technologies: '',
    link: '',
    github: '',
  },
};

export const COLORS = {
  PRIMARY: '#06b6d4', // cyan-500
  SECONDARY: '#7c3aed', // violet-600
  SUCCESS: '#10b981', // emerald-500
  ERROR: '#ef4444', // red-500
  WARNING: '#f59e0b', // amber-500
};

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
};
