import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, UserSession } from '../domain/user_session';
import { GithubAuthService } from './github_auth_service';

interface AuthContextValue {
  session: UserSession | null;
  isAuthenticating: boolean;
  login: (email: string, role: UserRole) => void;
  loginWithGithub: (role: UserRole, username?: string, code?: string) => Promise<void>;
  loginWithOAuthRedirect: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const INITIAL_ADMIN_SESSION: UserSession = {
  id: 'cntr_sess_initial',
  name: 'David Solorza',
  email: 'davidsolorza@github.local',
  role: 'admin',
  isAuthenticated: true,
  provider: 'github',
  githubUsername: 'DavidSolorza',
  avatarUrl: 'https://github.com/DavidSolorza.png',
  siteKey: 'wk_live_demo',
  clientName: 'Streaming Store JP',
  createdAt: '2026-10-22',
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(INITIAL_ADMIN_SESSION);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (email: string, role: UserRole) => {
    setSession({
      id: `usr_${Date.now()}`,
      name: role === 'admin' ? 'Administrador Sistema' : 'Analista Estándar',
      email,
      role,
      isAuthenticated: true,
      provider: 'local',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsAuthModalOpen(false);
  };

  const loginWithGithub = async (
    role: UserRole,
    username: string = 'DavidSolorza',
    code?: string
  ) => {
    setIsAuthenticating(true);
    try {
      const authData = await GithubAuthService.authenticate(role, username, code);
      setSession({
        id: authData.token,
        name: authData.user.username === 'DavidSolorza' ? 'David Solorza' : authData.user.username,
        email: authData.user.email,
        role: authData.user.role,
        isAuthenticated: true,
        provider: 'github',
        githubUsername: authData.user.username,
        avatarUrl: authData.user.avatar_url,
        token: authData.token,
        siteKey: authData.license.site_key,
        clientName: authData.license.client_name,
        createdAt: new Date().toISOString().split('T')[0],
      });
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loginWithOAuthRedirect = (role: UserRole) => {
    GithubAuthService.redirectToGithubOAuth(role);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state') as UserRole;
    if (code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      loginWithGithub(state === 'user' ? 'user' : 'admin', 'DavidSolorza', code);
    }
  }, []);

  const logout = () => {
    GithubAuthService.clearSession();
    setSession(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!session) return;
    setSession({ ...session, role: newRole });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticating,
        login,
        loginWithGithub,
        loginWithOAuthRedirect,
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
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
