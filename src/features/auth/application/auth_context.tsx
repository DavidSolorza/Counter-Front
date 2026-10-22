import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, UserSession } from '../domain/user_session';
import { GithubAuthService } from './github_auth_service';
import { GoogleAuthService } from './google_auth_service';

interface AuthContextValue {
  session: UserSession | null;
  isAuthenticating: boolean;
  login: (email: string, role: UserRole) => void;
  loginWithGithub: (role: UserRole, username?: string, code?: string) => Promise<void>;
  loginWithOAuthRedirect: (role: UserRole) => void;
  loginWithGoogle: (role: UserRole, email?: string, name?: string, code?: string) => Promise<void>;
  loginWithGoogleOAuthRedirect: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(() => GithubAuthService.getSavedSession());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (email: string, role: UserRole) => {
    const localSession: UserSession = {
      id: `usr_${Date.now()}`,
      name: role === 'admin' ? 'Administrador Sistema' : 'Analista Estándar',
      email,
      role,
      isAuthenticated: true,
      provider: 'local',
      createdAt: new Date().toISOString().split('T')[0],
    };
    GithubAuthService.persistSession(localSession);
    setSession(localSession);
    setIsAuthModalOpen(false);
  };

  const loginWithGithub = async (role: UserRole, username?: string, code?: string) => {
    setIsAuthenticating(true);
    try {
      const auth = await GithubAuthService.authenticate(role, username, code);
      const newSession: UserSession = {
        id: auth.token,
        name: auth.user.username,
        email: auth.user.email,
        role: auth.user.role,
        isAuthenticated: true,
        provider: 'github',
        githubUsername: auth.user.username,
        avatarUrl: auth.user.avatar_url,
        token: auth.token,
        license: auth.license,
        siteKey: auth.license.site_key,
        clientName: auth.license.client_name,
        createdAt: new Date().toISOString().split('T')[0],
      };
      GithubAuthService.persistSession(newSession);
      setSession(newSession);
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loginWithGoogle = async (role: UserRole, email?: string, name?: string, code?: string) => {
    setIsAuthenticating(true);
    try {
      const newSession = await GoogleAuthService.authenticate(role, email, name, code);
      setSession(newSession);
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loginWithOAuthRedirect = (role: UserRole) => GithubAuthService.redirectToGithubOAuth(role);
  const loginWithGoogleOAuthRedirect = (role: UserRole) => GoogleAuthService.redirectToGoogleOAuth(role);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const rawState = params.get('state') || '';
    if (code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      if (rawState.startsWith('google_')) {
        const role = (rawState.replace('google_', '') as UserRole) || 'admin';
        loginWithGoogle(role, 'davidsolorza@gmail.com', 'David Solorza', code);
      } else {
        const stateRole = rawState as UserRole;
        loginWithGithub(stateRole === 'user' ? 'user' : 'admin', undefined, code);
      }
    }
  }, []);

  const logout = () => {
    GithubAuthService.clearSession();
    setSession(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!session) return;
    const updated = { ...session, role: newRole };
    GithubAuthService.persistSession(updated);
    setSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticating,
        login,
        loginWithGithub,
        loginWithOAuthRedirect,
        loginWithGoogle,
        loginWithGoogleOAuthRedirect,
        logout,
        switchRole,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  return context;
};

export const useActiveSiteKey = (): string => {
  const { session } = useAuth();
  return session?.license?.site_key || session?.siteKey || localStorage.getItem('__cntr_site_key') || 'wk_live_demo';
};
