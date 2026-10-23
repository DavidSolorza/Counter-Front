import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Lock, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../../auth/application/auth_context';
import { accessGovernanceService } from '../../auth/application/access_governance_service';
import { AdminPanel } from '../../admin/infrastructure/AdminPanel';
import { UserAnalyticsDashboard } from '../../analytics/infrastructure/UserAnalyticsDashboard';
import './DashboardRouterView.css';

export const DashboardRouterView: React.FC = () => {
  const { session, switchRole, openAuthModal } = useAuth();
  const [allowAdminSwitch, setAllowAdminSwitch] = useState<boolean>(() =>
    accessGovernanceService.isPublicAdminLoginAllowed()
  );

  useEffect(() => {
    return accessGovernanceService.subscribe(setAllowAdminSwitch);
  }, []);

  if (!session) {
    return (
      <div className="dashboard-unauth-container">
        <div className="unauth-card">
          <div className="unauth-icon-wrap">
            <Lock size={32} />
          </div>
          <h2>Acceso Restringido al Panel</h2>
          <p>Debes autenticarte con una cuenta para explorar las vistas del sistema.</p>
          <button type="button" className="btn-unauth-login" onClick={openAuthModal}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const showRoleSwitcher = allowAdminSwitch || session.role === 'admin';

  return (
    <div className="dashboard-view-wrapper">
      {showRoleSwitcher && (
        <div className="role-switcher-banner">
          <div className="banner-info">
            <span>Vista activa según tu rol asignado:</span>
            <div className={`active-role-tag tag-${session.role}`}>
              {session.role === 'admin' ? (
                <>
                  <ShieldCheck size={14} />
                  <strong>Modo Administrador</strong>
                </>
              ) : (
                <>
                  <User size={14} />
                  <strong>Modo Usuario Analista</strong>
                </>
              )}
            </div>
          </div>

          <div className="banner-actions">
            <span className="banner-actions-label">
              <ArrowLeftRight size={13} />
              Alternar vista:
            </span>
            <button
              type="button"
              className={`btn-role-tab ${session.role === 'admin' ? 'active-admin' : ''}`}
              onClick={() => switchRole('admin')}
            >
              <ShieldCheck size={13} />
              <span>Vista Admin (Gestión)</span>
            </button>
            <button
              type="button"
              className={`btn-role-tab ${session.role === 'user' ? 'active-user' : ''}`}
              onClick={() => switchRole('user')}
            >
              <User size={13} />
              <span>Vista Usuario (Telemetría)</span>
            </button>
          </div>
        </div>
      )}

      {session.role === 'admin' ? <AdminPanel /> : <UserAnalyticsDashboard />}
    </div>
  );
};
