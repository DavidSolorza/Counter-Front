import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { userManagementService } from '../application/user_management_service';
import { ManagedUser } from '../domain/managed_user';
import { AdminSummaryCards } from './AdminSummaryCards';
import { UserTable } from './UserTable';
import { LicenseManagementCard } from './LicenseManagementCard';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>(() => userManagementService.getAll());
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleActive = (id: string) => {
    const updated = userManagementService.toggleActiveInactive(id);
    setUsers(updated);
    showToast('Estado de usuario modificado con éxito.');
  };

  const handleCancelUser = (id: string) => {
    const updated = userManagementService.cancelUser(id);
    setUsers(updated);
    showToast('Usuario cancelado en el sistema.');
  };

  const handleReactivateUser = (id: string) => {
    const updated = userManagementService.reactivateUser(id);
    setUsers(updated);
    showToast('Usuario reactivado satisfactoriamente.');
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <div>
          <div className="admin-role-badge">
            <ShieldCheck size={13} />
            <span>Privilegios de Administrador Activos</span>
          </div>
          <h1 className="admin-title">Gestión de Usuarios y Accesos</h1>
          <p className="admin-subtitle">
            Administra los roles, pausa usuarios temporalmente o cancela cuentas de la organización.
          </p>
        </div>
        {notification && (
          <div className="admin-toast">
            <CheckCircle2 size={15} />
            <span>{notification}</span>
          </div>
        )}
      </div>

      <LicenseManagementCard />

      <AdminSummaryCards users={users} />

      <UserTable
        users={users}
        onToggleActive={handleToggleActive}
        onCancelUser={handleCancelUser}
        onReactivateUser={handleReactivateUser}
      />
    </div>
  );
};
