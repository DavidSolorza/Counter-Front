import React from 'react';
import { Pause, Play, Ban, RotateCcw } from 'lucide-react';
import { ManagedUser, ManagedUserRules } from '../domain/managed_user';
import './UserActionControls.css';

interface UserActionControlsProps {
  user: ManagedUser;
  onToggleActive: (id: string) => void;
  onCancelUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
}

export const UserActionControls: React.FC<UserActionControlsProps> = ({
  user,
  onToggleActive,
  onCancelUser,
  onReactivateUser,
}) => {
  return (
    <div className="action-controls-group">
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
