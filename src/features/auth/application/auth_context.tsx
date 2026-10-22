import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, UserSession } from '../domain/user_session';

interface AuthContextValue {
  session: UserSession | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_ADMIN_SESSION: UserSession = {
  id: 'usr_admin_01',
  name: 'Administrador Demo',
  email: 'admin@counter.io',
  role: 'admin',
  isAuthenticated: true,
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
      name: newRole === 'admin' ? 'Administrador Sistema' : 'Analista Estándar',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
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
