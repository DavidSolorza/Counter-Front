import React from 'react';
import { Pause, Play, Ban, RotateCcw, Activity } from 'lucide-react';
import { ManagedUser, ManagedUserRules } from '../domain/managed_user';
import './UserActionControls.css';

interface UserActionControlsProps {
  user: ManagedUser;
  onToggleActive: (id: string) => void;
  onCancelUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
  onMonitorUser?: (user: ManagedUser) => void;
}

export const UserActionControls: React.FC<UserActionControlsProps> = ({
  user,
  onToggleActive,
  onCancelUser,
  onReactivateUser,
  onMonitorUser,
}) => {
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

      {user.status !== 'cancelled' ? (
        <>
          <button
            type="button"
            className={`action-btn ${user.status === 'active' ? 'btn-deactivate' : 'btn-activate'}`}
            onClick={() => onToggleActive(user.id)}
            title={user.status === 'active' ? 'Pausar cuenta' : 'Activar cuenta'}
          >
            {user.status === 'active' ? (
              <>
                <Pause size={12} />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Activar</span>
              </>
            )}
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
