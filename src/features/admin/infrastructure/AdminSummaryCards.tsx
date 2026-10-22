import React from 'react';
import { Users, UserCheck, UserX, Ban } from 'lucide-react';
import { ManagedUser } from '../domain/managed_user';
import './AdminSummaryCards.css';

interface AdminSummaryCardsProps {
  users: ManagedUser[];
}

export const AdminSummaryCards: React.FC<AdminSummaryCardsProps> = ({ users }) => {
  const total = users.length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const inactiveCount = users.filter((u) => u.status === 'inactive').length;
  const cancelledCount = users.filter((u) => u.status === 'cancelled').length;

  return (
    <div className="admin-summary-grid">
      <div className="summary-card card-total">
        <div className="summary-card-top">
          <span className="summary-label">Total Cuentas</span>
          <div className="summary-icon-wrap icon-total">
            <Users size={16} />
          </div>
        </div>
        <div className="summary-value">{total}</div>
        <span className="summary-sub">Registradas en la organización</span>
      </div>

      <div className="summary-card card-active">
        <div className="summary-card-top">
          <span className="summary-label">Usuarios Activos</span>
          <div className="summary-icon-wrap icon-active">
            <UserCheck size={16} />
          </div>
        </div>
        <div className="summary-value text-active">{activeCount}</div>
        <span className="summary-sub">Con acceso operativo al panel</span>
      </div>

      <div className="summary-card card-inactive">
        <div className="summary-card-top">
          <span className="summary-label">Usuarios Inactivos</span>
          <div className="summary-icon-wrap icon-inactive">
            <UserX size={16} />
          </div>
        </div>
        <div className="summary-value text-inactive">{inactiveCount}</div>
        <span className="summary-sub">Acceso pausado temporalmente</span>
      </div>

      <div className="summary-card card-cancelled">
        <div className="summary-card-top">
          <span className="summary-label">Cuentas Canceladas</span>
          <div className="summary-icon-wrap icon-cancelled">
            <Ban size={16} />
          </div>
        </div>
        <div className="summary-value text-cancelled">{cancelledCount}</div>
        <span className="summary-sub">Canceladas con opción de reintegro</span>
      </div>
    </div>
  );
};
