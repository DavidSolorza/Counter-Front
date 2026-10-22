import React from 'react';
import { ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { UserRole } from '../domain/user_session';
import './RoleSelector.css';

interface RoleSelectorProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onQuickLogin: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onSelectRole,
  onQuickLogin,
}) => {
  return (
    <div className="role-selector-container">
      <span className="role-selector-label">Rol de Acceso Asignado</span>
      <div className="role-selector-grid">
        <button
          type="button"
          className={`role-btn ${currentRole === 'admin' ? 'active-admin' : ''}`}
          onClick={() => onSelectRole('admin')}
        >
          <ShieldCheck size={16} />
          <span>Administrador</span>
        </button>
        <button
          type="button"
          className={`role-btn ${currentRole === 'user' ? 'active-user' : ''}`}
          onClick={() => onSelectRole('user')}
        >
          <UserCheck size={16} />
          <span>Usuario Analista</span>
        </button>
      </div>

      <div className="auth-quick-access">
        <div className="quick-access-header">
          <Sparkles size={12} />
          <span>Accesos directos de demostración:</span>
        </div>
        <div className="quick-buttons">
          <button
            type="button"
            className="btn-quick"
            onClick={() => onQuickLogin('admin')}
          >
            <ShieldCheck size={13} />
            <span>Demo Admin</span>
          </button>
          <button
            type="button"
            className="btn-quick"
            onClick={() => onQuickLogin('user')}
          >
            <UserCheck size={13} />
            <span>Demo Usuario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
