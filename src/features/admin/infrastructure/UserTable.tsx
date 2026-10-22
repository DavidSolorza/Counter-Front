import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ManagedUser } from '../domain/managed_user';
import { UserTableRow } from './UserTableRow';
import './UserTable.css';
import './UserTableToolbar.css';

interface UserTableProps {
  users: ManagedUser[];
  onToggleActive: (id: string) => void;
  onCancelUser: (id: string) => void;
  onReactivateUser: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onToggleActive,
  onCancelUser,
  onReactivateUser,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => {
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="user-table-card">
      <div className="table-toolbar">
        <div className="status-tabs">
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'all' ? 'active-tab' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Todos ({users.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'active' ? 'active-tab' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Activos ({users.filter((u) => u.status === 'active').length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'inactive' ? 'active-tab' : ''}`}
            onClick={() => setFilterStatus('inactive')}
          >
            Inactivos ({users.filter((u) => u.status === 'inactive').length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'cancelled' ? 'active-tab' : ''}`}
            onClick={() => setFilterStatus('cancelled')}
          >
            Cancelados ({users.filter((u) => u.status === 'cancelled').length})
          </button>
        </div>

        <div className="search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario & Contacto</th>
              <th>Departamento</th>
              <th>Rol Asignado</th>
              <th>Estado Actual</th>
              <th>Última Actividad</th>
              <th>Acciones Administrativas</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onToggleActive={onToggleActive}
                  onCancelUser={onCancelUser}
                  onReactivateUser={onReactivateUser}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-table-state">
                  No se encontraron usuarios bajo este filtro o término de búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
