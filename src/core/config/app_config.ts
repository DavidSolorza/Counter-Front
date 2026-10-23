const authBase = import.meta.env.VITE_AUTH_BASE_URL || 'https://counter-auth.servidor.blog/api/v1/auth';
const derivedAdminUsersUrl = authBase.replace(/\/auth\/?$/, '/admin/users');

export const APP_CONFIG = {
  name: 'Counter Intelligence',
  version: '3.2.0-rc',
  tagline: 'Observabilidad y Telemetría Web Ultraligera',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://counter-api.servidor.blog/api/v1',
  authBaseUrl: authBase,
  adminUsersUrl: import.meta.env.VITE_ADMIN_USERS_URL || derivedAdminUsersUrl,
  githubClientId: import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liCRgpOkJdEvTFzO',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  defaultSiteKey: import.meta.env.VITE_DEFAULT_SITE_KEY || 'wk_live_demo',
  supportEmail: 'soporte@counter.local',
  routes: {
    landing: 'landing',
    dashboard: 'dashboard',
  },
} as const;

export type AppView = (typeof APP_CONFIG.routes)[keyof typeof APP_CONFIG.routes];
