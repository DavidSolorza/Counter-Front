export const APP_CONFIG = {
  name: 'Counter Intelligence',
  version: '3.2.0-rc',
  tagline: 'Observabilidad y Telemetría Web Ultraligera',
  apiBaseUrl: 'http://127.0.0.1:5000/api/v1',
  supportEmail: 'soporte@counter.local',
  routes: {
    landing: 'landing',
    dashboard: 'dashboard',
  },
} as const;

export type AppView = (typeof APP_CONFIG.routes)[keyof typeof APP_CONFIG.routes];
