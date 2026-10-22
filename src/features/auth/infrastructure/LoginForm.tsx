import React, { useState } from 'react';
import { Lock, Mail, X } from 'lucide-react';
import { useAuth } from '../application/auth_context';
import { UserRole } from '../domain/user_session';
import { RoleSelector } from './RoleSelector';
import { GithubLoginButton } from './GithubLoginButton';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const {
    login,
    loginWithGithub,
    loginWithOAuthRedirect,
    isAuthenticating,
    isAuthModalOpen,
    closeAuthModal,
  } = useAuth();
  const [email, setEmail] = useState('admin@counter.io');
  const [role, setRole] = useState<UserRole>('admin');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
  };

  const handleQuickLogin = (selectedRole: UserRole) => {
    const defaultEmail = selectedRole === 'admin' ? 'admin@counter.io' : 'usuario@empresa.com';
    setEmail(defaultEmail);
    setRole(selectedRole);
    login(defaultEmail, selectedRole);
  };

  const handleRealGithubOAuth = (selectedRole: UserRole) => {
    loginWithOAuthRedirect(selectedRole);
  };

  const handleDirectDemoLogin = () => {
    loginWithGithub(role, 'DavidSolorza');
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <div className="auth-badge">
            <Lock size={12} />
            <span>Acceso Seguro Enterprise</span>
          </div>
          <h2>Autenticación en Counter</h2>
          <p>Conéctate con tu cuenta real de GitHub o ingresa con credenciales.</p>
        </div>

        <GithubLoginButton
          currentRole={role}
          onGithubLogin={handleRealGithubOAuth}
          isLoading={isAuthenticating}
        />

        <div className="oauth-redirect-link-wrap">
          <button
            type="button"
            className="btn-link-oauth"
            onClick={handleDirectDemoLogin}
            title="Iniciar sesión directa de prueba local sin salir a GitHub"
          >
            <span>O probar sesión local demo (@DavidSolorza)</span>
          </button>
        </div>

        <div className="auth-divider">
          <span>o ingresa con correo corporativo</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="auth-email">
              <Mail size={13} />
              <span>Correo Corporativo</span>
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
              required
            />
          </div>

          <RoleSelector
            currentRole={role}
            onSelectRole={setRole}
            onQuickLogin={handleQuickLogin}
          />

          <button type="submit" className="btn-submit">
            Ingresar al Panel
          </button>
        </form>

        <button className="auth-close-btn" onClick={closeAuthModal} title="Cerrar modal">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
