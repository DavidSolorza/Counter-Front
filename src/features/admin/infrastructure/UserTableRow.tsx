import React from 'react';
import { Shield, User } from 'lucide-react';
import { ManagedUser } from '../domain/managed_user';
import { UserStatusBadge } from './UserStatusBadge';
import { UserActionControls } from './UserActionControls';

interface UserTableRowProps {
  user: ManagedUser;
  onToggleActive: (id: string) => void;
  onCancelUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
  onMonitorUser?: (user: ManagedUser) => void;
  onChangeRole?: (id: string, newRole: 'admin' | 'user') => void;
  totalAdminsCount?: number;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onToggleActive,
  onCancelUser,
  onReactivateUser,
  onMonitorUser,
  onChangeRole,
  totalAdminsCount = 1,
}) => {
  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <tr className={`user-row row-status-${user.status}`}>
      <td>
        <div className="user-profile-cell">
          <div className="user-avatar">{initials}</div>
          <div>
            <div className="user-name">{user.fullName}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="user-department">{user.department}</span>
      </td>
      <td>
        <span className={`role-pill pill-${user.role}`}>
          {user.role === 'admin' ? (
            <>
              <Shield size={12} />
              <span>Admin</span>
            </>
          ) : (
            <>
              <User size={12} />
              <span>Usuario</span>
            </>
          )}
        </span>
      </td>
      <td>
        <UserStatusBadge status={user.status} />
      </td>
      <td>
        <span className="user-last-active">{user.lastActive}</span>
      </td>
      <td className="actions-cell">
        <UserActionControls
          user={user}
          onToggleActive={onToggleActive}
          onCancelUser={onCancelUser}
          onReactivateUser={onReactivateUser}
          onMonitorUser={onMonitorUser}
          onChangeRole={onChangeRole}
          totalAdminsCount={totalAdminsCount}
        />
      </td>
    </tr>
  );
};
