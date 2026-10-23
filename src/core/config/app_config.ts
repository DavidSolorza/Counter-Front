export const APP_CONFIG = {
  name: 'Counter Intelligence',
  version: '3.2.0-rc',
  tagline: 'Observabilidad y Telemetría Web Ultraligera',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api/v1',
  authBaseUrl: import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8080/api/v1/auth',
  adminUsersUrl: import.meta.env.VITE_ADMIN_USERS_URL || 'http://localhost:8080/api/v1/admin/users',
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
