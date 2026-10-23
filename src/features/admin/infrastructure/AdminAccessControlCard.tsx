import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Eye, EyeOff } from 'lucide-react';
import { accessGovernanceService } from '../../auth/application/access_governance_service';
import './AdminAccessControlCard.css';

interface AdminAccessControlCardProps {
  onToggleMessage?: (msg: string) => void;
}

export const AdminAccessControlCard: React.FC<AdminAccessControlCardProps> = ({ onToggleMessage }) => {
  const [allowAdminLogin, setAllowAdminLogin] = useState<boolean>(() =>
    accessGovernanceService.isPublicAdminLoginAllowed()
  );

  useEffect(() => {
    return accessGovernanceService.subscribe((isAllowed) => {
      setAllowAdminLogin(isAllowed);
    });
  }, []);

  const handleToggle = () => {
    const nextState = !allowAdminLogin;
    setAllowAdminLogin(nextState);
    accessGovernanceService.setPublicAdminLoginAllowed(nextState);
    if (onToggleMessage) {
      onToggleMessage(
        nextState
          ? 'Botón de Administrador HABILITADO en el login público.'
          : 'Botón de Administrador OCULTO. Nuevos ingresos serán solo usuarios.'
      );
    }
  };

  return (
    <div className="access-control-card">
      <div className="access-control-info">
        <div className="access-icon-wrapper">
          {allowAdminLogin ? <ShieldAlert size={18} className="warn-icon" /> : <ShieldCheck size={18} className="safe-icon" />}
        </div>
        <div>
          <div className="access-badge-title">
            <Lock size={12} />
            <span>Gobernanza de Acceso y Puerta de Entrada</span>
          </div>
          <h4>Visibilidad del Botón de Login como Administrador</h4>
          <p className="access-desc">
            {allowAdminLogin
              ? 'Visible al público: Los usuarios pueden seleccionar entrar como Administrador desde el modal de autenticación.'
              : 'Oculto y protegido: Nadie puede elegir Administrador al ingresar. Todo nuevo usuario entra como Usuario regular.'}
          </p>
        </div>
      </div>

      <div className="access-control-actions">
        <div className={`status-pill ${allowAdminLogin ? 'pill-exposed' : 'pill-protected'}`}>
          <span className="pill-dot" />
          <span>{allowAdminLogin ? 'Acceso Admin Expuesto' : 'Acceso Admin Blindado'}</span>
        </div>

        <button
          type="button"
          className={`toggle-switch-btn ${allowAdminLogin ? 'btn-active' : 'btn-inactive'}`}
          onClick={handleToggle}
          title={allowAdminLogin ? 'Hacer clic para ocultar botón admin' : 'Hacer clic para mostrar botón admin'}
        >
          {allowAdminLogin ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{allowAdminLogin ? 'Ocultar Opción de Admin' : 'Mostrar Opción de Admin'}</span>
        </button>
      </div>
    </div>
  );
};
