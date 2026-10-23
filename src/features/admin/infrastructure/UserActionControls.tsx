import React from 'react';
import { Pause, Play, Ban, RotateCcw, Activity, ShieldCheck, User } from 'lucide-react';
import { ManagedUser, ManagedUserRules } from '../domain/managed_user';
import './UserActionControls.css';

interface UserActionControlsProps {
  user: ManagedUser;
  onToggleActive: (id: string) => void;
  onCancelUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
  onMonitorUser?: (user: ManagedUser) => void;
  onChangeRole?: (id: string, newRole: 'admin' | 'user') => void;
  totalAdminsCount?: number;
}

export const UserActionControls: React.FC<UserActionControlsProps> = ({
  user,
  onToggleActive,
  onCancelUser,
  onReactivateUser,
  onMonitorUser,
  onChangeRole,
  totalAdminsCount = 1,
}) => {
  const isOnlyAdmin = user.role === 'admin' && totalAdminsCount <= 1;

  const handleRoleToggle = () => {
    if (!onChangeRole || isOnlyAdmin) return;
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    onChangeRole(user.id, nextRole);
  };

  return (
    <div className="action-controls-group">
      {onMonitorUser && (
        <button
          type="button"
          className="action-btn btn-monitor"
          onClick={() => onMonitorUser(user)}
          title={`Monitorear telemetría y dashboard de ${user.fullName}`}
        >
          <Activity size={12} />
          <span>Monitorear</span>
        </button>
      )}

      {onChangeRole && (
        <button
          type="button"
          className={`action-btn ${user.role === 'user' ? 'btn-promote' : 'btn-demote'} ${isOnlyAdmin ? 'btn-disabled' : ''}`}
          onClick={handleRoleToggle}
          disabled={isOnlyAdmin}
          title={
            isOnlyAdmin
              ? 'No puedes degradar al único Administrador de la plataforma'
              : user.role === 'user'
              ? 'Conceder privilegios de Administrador'
              : 'Revocar privilegios de Administrador'
          }
        >
          {user.role === 'user' ? <ShieldCheck size={12} /> : <User size={12} />}
          <span>{user.role === 'user' ? 'Hacer Admin' : 'Hacer Usuario'}</span>
        </button>
      )}

      {user.status !== 'cancelled' ? (
        <>
          <button
            type="button"
            className={`action-btn ${user.status === 'active' ? 'btn-deactivate' : 'btn-activate'}`}
            onClick={() => onToggleActive(user.id)}
            title={user.status === 'active' ? 'Pausar cuenta' : 'Activar cuenta'}
          >
            {user.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
            <span>{user.status === 'active' ? 'Pausar' : 'Activar'}</span>
          </button>

          {ManagedUserRules.canBeCancelled(user.status) && (
            <button
              type="button"
              className="action-btn btn-cancel"
              onClick={() => onCancelUser(user.id)}
              title="Cancelar cuenta en el sistema"
            >
              <Ban size={12} />
              <span>Cancelar</span>
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          className="action-btn btn-reactivate"
          onClick={() => onReactivateUser(user.id)}
          title="Restablecer cuenta a estado activo"
        >
          <RotateCcw size={12} />
          <span>Reactivar</span>
        </button>
      )}
    </div>
  );
};
