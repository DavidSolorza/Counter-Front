import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, RotateCw, Database } from 'lucide-react';
import { userManagementService } from '../application/user_management_service';
import { ManagedUser } from '../domain/managed_user';
import { AdminSummaryCards } from './AdminSummaryCards';
import { UserTable } from './UserTable';
import { LicenseManagementCard } from './LicenseManagementCard';
import { UserAnalyticsDashboard } from '../../analytics/infrastructure/UserAnalyticsDashboard';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>(() => userManagementService.getAll());
  const [notification, setNotification] = useState<string | null>(null);
  const [monitoredUser, setMonitoredUser] = useState<ManagedUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadLiveUsers = async () => {
    setIsLoading(true);
    const liveUsers = await userManagementService.fetchAll();
    setUsers(liveUsers);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLiveUsers();
  }, []);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleActive = async (id: string) => {
    const updated = await userManagementService.toggleActiveInactive(id);
    setUsers(updated);
    showToast('Estado de licencia y Kill-Switch actualizado.');
  };

  const handleCancelUser = async (id: string) => {
    const updated = await userManagementService.cancelUser(id);
    setUsers(updated);
    showToast('Licencia marcada como cancelada.');
  };

  const handleReactivateUser = async (id: string) => {
    const updated = await userManagementService.reactivateUser(id);
    setUsers(updated);
    showToast('Licencia reactivada satisfactoriamente.');
  };

  if (monitoredUser) {
    return (
      <UserAnalyticsDashboard
        customSiteKey={monitoredUser.siteKey || 'wk_live_demo'}
        monitoredUserTitle={monitoredUser.fullName}
        onExitMonitoring={() => setMonitoredUser(null)}
      />
    );
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <div>
          <div className="admin-role-badge">
            <ShieldCheck size={13} />
            <span>Privilegios de Administrador Activos</span>
          </div>
          <h1 className="admin-title">Gestión de Usuarios y Licencias</h1>
          <p className="admin-subtitle">
            Base de datos de seguridad en tiempo real. Activa, pausa o monitorea los dashboards de cada cliente.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="panel-back-btn"
            onClick={loadLiveUsers}
            disabled={isLoading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.9rem', fontSize: '0.8rem' }}
          >
            <RotateCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Sincronizando...' : 'Actualizar'}</span>
          </button>
          {notification && (
            <div className="admin-toast">
              <CheckCircle2 size={15} />
              <span>{notification}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
        <Database size={13} style={{ color: '#00d2ff' }} />
        <span>Microservicio de Seguridad Sincronizado (security.db) &middot; {users.length} licencias cargadas</span>
      </div>

      <LicenseManagementCard />
      <AdminSummaryCards users={users} />
      <UserTable
        users={users}
        onToggleActive={handleToggleActive}
        onCancelUser={handleCancelUser}
        onReactivateUser={handleReactivateUser}
        onMonitorUser={(user) => setMonitoredUser(user)}
      />
    </div>
  );
};
