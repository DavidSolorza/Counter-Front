import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Check, Lock } from 'lucide-react';
import { accessGovernanceService } from '../../auth/application/access_governance_service';
import './LandingRolePreview.css';

interface LandingRolePreviewProps {
  onSelectRole: (role: 'admin' | 'user') => void;
}

export const LandingRolePreview: React.FC<LandingRolePreviewProps> = ({ onSelectRole }) => {
  const [allowAdmin, setAllowAdmin] = useState<boolean>(() =>
    accessGovernanceService.isPublicAdminLoginAllowed()
  );

  useEffect(() => {
    return accessGovernanceService.subscribe(setAllowAdmin);
  }, []);

  return (
    <section className="role-preview-section">
      <div className="section-title-wrap">
        <span className="section-badge">Control de Acceso</span>
        <h2 className="section-title">Estructura por Roles: Admin vs Usuario</h2>
        <p className="section-subtitle">
          El panel está diseñado para desacoplar permisos operativos y analíticos según el rol asignado.
        </p>
      </div>

      <div className="role-preview-grid">
        <div className="role-card role-card-admin">
          <div className="role-card-header">
            <span className="role-badge-pill admin-pill">
              <ShieldCheck size={13} />
              <span>Rol Administrador</span>
            </span>
            <span className="role-card-status">{allowAdmin ? 'Control Total' : 'Acceso Restringido'}</span>
          </div>
          <h3>Gestión de Usuarios y Accesos</h3>
          <p>Supervisa las cuentas de la organización con permisos elevados:</p>
          <ul className="role-permission-list">
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Activar / Desactivar:</strong> Pausa cuentas de forma reversible.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Cancelar Cuentas:</strong> Bloquea accesos con control de estado.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Reactivación:</strong> Restaura accesos cancelados en 1 clic.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Auditoría & Búsqueda:</strong> Filtrado por departamento y actividad.</span>
            </li>
          </ul>
          {allowAdmin ? (
            <button
              type="button"
              className="btn-role-action btn-admin-action"
              onClick={() => onSelectRole('admin')}
            >
              <ShieldCheck size={14} />
              <span>Probar como Administrador</span>
            </button>
          ) : (
            <div
              className="btn-role-action btn-admin-action"
              style={{ opacity: 0.7, cursor: 'not-allowed', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
              title="El inicio de sesión como Administrador está deshabilitado por el administrador del sistema."
            >
              <Lock size={14} />
              <span>Acceso Admin Protegido</span>
            </div>
          )}
        </div>

        <div className="role-card role-card-user">
          <div className="role-card-header">
            <span className="role-badge-pill user-pill">
              <UserCheck size={13} />
              <span>Rol Usuario / Analista</span>
            </span>
            <span className="role-card-status">Acceso Abierto</span>
          </div>
          <h3>Observabilidad y Telemetría</h3>
          <p>Accede a métricas de comportamiento y eventos en tiempo real:</p>
          <ul className="role-permission-list">
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Métricas en Vivo:</strong> Sesiones, rage clicks y latencias.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Feed de Eventos:</strong> Rastreo de interacciones del usuario.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Seguridad:</strong> Sin acceso a modificar usuarios ajenos.</span>
            </li>
            <li>
              <Check size={14} className="perm-check" />
              <span><strong>Diagnóstico UX:</strong> Inspección rápida de cuellos de botella.</span>
            </li>
          </ul>
          <button
            type="button"
            className="btn-role-action btn-user-action"
            onClick={() => onSelectRole('user')}
          >
            <UserCheck size={14} />
            <span>Probar como Usuario</span>
          </button>
        </div>
      </div>
    </section>
  );
};
