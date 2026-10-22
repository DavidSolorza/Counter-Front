import React from 'react';
import { ShieldCheck, User, Lock, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../../auth/application/auth_context';
import { AdminPanel } from '../../admin/infrastructure/AdminPanel';
import { UserAnalyticsDashboard } from '../../analytics/infrastructure/UserAnalyticsDashboard';
import './DashboardRouterView.css';

export const DashboardRouterView: React.FC = () => {
  const { session, switchRole, openAuthModal } = useAuth();

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
            Iniciar Sesión con Cuenta Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-view-wrapper">
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
            Alternar rol de prueba:
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

      {session.role === 'admin' ? <AdminPanel /> : <UserAnalyticsDashboard />}
    </div>
  );
};
