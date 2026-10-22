import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, UserSession } from '../domain/user_session';

interface AuthContextValue {
  session: UserSession | null;
  login: (email: string, role: UserRole) => void;
  loginWithGithub: (role: UserRole, username?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_ADMIN_SESSION: UserSession = {
  id: 'usr_admin_01',
  name: 'David Solorza',
  email: 'david@counter.io',
  role: 'admin',
  isAuthenticated: true,
  provider: 'github',
  githubUsername: 'DavidSolorza',
  avatarUrl: 'https://github.com/DavidSolorza.png',
  createdAt: '2026-01-15',
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(DEFAULT_ADMIN_SESSION);
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

  const loginWithGithub = (role: UserRole, username: string = 'DavidSolorza') => {
    setSession({
      id: `gh_${Date.now()}`,
      name: username === 'DavidSolorza' ? 'David Solorza' : username,
      email: `${username.toLowerCase()}@github.com`,
      role,
      isAuthenticated: true,
      provider: 'github',
      githubUsername: username,
      avatarUrl: `https://github.com/${username}.png`,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setSession(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!session) return;
    setSession({
      ...session,
      role: newRole,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        loginWithGithub,
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
