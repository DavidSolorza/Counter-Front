import React, { useState, useEffect } from 'react';
import { Lock, Mail, X } from 'lucide-react';
import { useAuth } from '../application/auth_context';
import { UserRole } from '../domain/user_session';
import { accessGovernanceService } from '../application/access_governance_service';
import { RoleSelector } from './RoleSelector';
import { GithubLoginButton } from './GithubLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const {
    login,
    loginWithGithub,
    loginWithOAuthRedirect,
    loginWithGoogleOAuthRedirect,
    isAuthenticating,
    isAuthModalOpen,
    closeAuthModal,
  } = useAuth();

  const [allowAdmin, setAllowAdmin] = useState<boolean>(() =>
    accessGovernanceService.isPublicAdminLoginAllowed()
  );

  useEffect(() => {
    return accessGovernanceService.subscribe((allowed) => {
      setAllowAdmin(allowed);
      if (!allowed) setRole('user');
    });
  }, []);

  const [role, setRole] = useState<UserRole>(() => (allowAdmin ? 'admin' : 'user'));
  const [email, setEmail] = useState(() => (allowAdmin ? 'admin@counter.io' : 'usuario@empresa.com'));

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
  };

  const handleQuickLogin = (selectedRole: UserRole) => {
    const finalRole = allowAdmin ? selectedRole : 'user';
    const defaultEmail = finalRole === 'admin' ? 'admin@counter.io' : 'usuario@empresa.com';
    setEmail(defaultEmail);
    setRole(finalRole);
    login(defaultEmail, finalRole);
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
          <p>Conéctate con tu cuenta de GitHub, Google o credenciales corporativas.</p>
        </div>

        <GithubLoginButton
          currentRole={role}
          onGithubLogin={(r) => loginWithOAuthRedirect(allowAdmin ? r : 'user')}
          isLoading={isAuthenticating}
        />

        <GoogleLoginButton
          currentRole={role}
          onGoogleLogin={(r) => loginWithGoogleOAuthRedirect(allowAdmin ? r : 'user')}
          isLoading={isAuthenticating}
        />

        {allowAdmin && (
          <div className="oauth-redirect-link-wrap">
            <button
              type="button"
              className="btn-link-oauth"
              onClick={() => loginWithGithub('admin', 'DavidSolorza')}
              title="Iniciar sesión directa de prueba como Admin"
            >
              <span>O probar sesión local demo (@DavidSolorza Admin)</span>
            </button>
          </div>
        )}

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
            onSelectRole={(r) => setRole(allowAdmin ? r : 'user')}
            onQuickLogin={handleQuickLogin}
            allowAdminSelection={allowAdmin}
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
