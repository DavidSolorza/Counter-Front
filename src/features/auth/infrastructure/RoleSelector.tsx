import React from 'react';
import { ShieldCheck, UserCheck, Sparkles, Lock } from 'lucide-react';
import { UserRole } from '../domain/user_session';
import './RoleSelector.css';

interface RoleSelectorProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onQuickLogin: (role: UserRole) => void;
  allowAdminSelection?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onSelectRole,
  onQuickLogin,
  allowAdminSelection = false,
}) => {
  if (!allowAdminSelection) {
    return (
      <div className="role-selector-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span className="role-selector-label">Rol Asignado por Política</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#10b981' }}>
            <Lock size={11} />
            <span>Acceso Seguro Restringido</span>
          </span>
        </div>

        <div className="role-btn active-user" style={{ cursor: 'default', display: 'flex', justifyContent: 'center' }}>
          <UserCheck size={16} />
          <span>Usuario Analista (Acceso Estándar de Telemetría)</span>
        </div>
      </div>
    );
  }

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
