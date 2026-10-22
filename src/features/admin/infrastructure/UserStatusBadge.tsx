import React from 'react';
import { UserAccountStatus } from '../domain/managed_user';
import './UserStatusBadge.css';

interface UserStatusBadgeProps {
  status: UserAccountStatus;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: { label: 'Activo', className: 'badge-active', dotColor: '#16a34a' },
    inactive: { label: 'Inactivo', className: 'badge-inactive', dotColor: '#d97706' },
    cancelled: { label: 'Cancelado', className: 'badge-cancelled', dotColor: '#dc2626' },
  };

  const current = statusConfig[status];

  return (
    <span className={`status-badge ${current.className}`}>
      <span className="status-dot" style={{ backgroundColor: current.dotColor }} />
      {current.label}
    </span>
  );
};
