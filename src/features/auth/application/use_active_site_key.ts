import { useAuth } from './auth_context';

export const useActiveSiteKey = (): string => {
  const { session } = useAuth();
  return (
    session?.license?.site_key ||
    session?.siteKey ||
    localStorage.getItem('__cntr_site_key') ||
    import.meta.env.VITE_DEFAULT_SITE_KEY ||
    'wk_live_demo'
  );
};
