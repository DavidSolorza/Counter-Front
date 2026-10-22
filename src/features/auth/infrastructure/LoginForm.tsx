import React, { useState } from 'react';
import { Lock, Mail, X } from 'lucide-react';
import { useAuth } from '../application/auth_context';
import { UserRole } from '../domain/user_session';
import { RoleSelector } from './RoleSelector';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const { login, isAuthModalOpen, closeAuthModal } = useAuth();
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

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <div className="auth-badge">
            <Lock size={12} />
            <span>Acceso Seguro Enterprise</span>
          </div>
          <h2>Autenticación en Counter</h2>
          <p>Selecciona tu rol para explorar el panel operativo.</p>
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
