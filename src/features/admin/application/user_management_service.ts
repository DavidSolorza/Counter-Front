import { ManagedUser, UserAccountStatus } from '../domain/managed_user';

const INITIAL_MOCK_USERS: ManagedUser[] = [
  {
    id: 'usr_001',
    fullName: 'Valeria Restrepo',
    email: 'valeria.restrepo@empresa.com',
    role: 'admin',
    status: 'active',
    department: 'DevOps & Observabilidad',
    lastActive: 'Hace 5 min',
    siteKey: 'wk_valeria_devops',
  },
  {
    id: 'usr_002',
    fullName: 'Carlos Mendoza',
    email: 'carlos.mendoza@empresa.com',
    role: 'user',
    status: 'active',
    department: 'Producto & UX',
    lastActive: 'Hace 23 min',
    siteKey: 'wk_carlos_mendoza',
  },
  {
    id: 'usr_003',
    fullName: 'Sofía Navarro',
    email: 'sofia.navarro@empresa.com',
    role: 'user',
    status: 'inactive',
    department: 'Seguridad de la Información',
    lastActive: 'Ayer',
    siteKey: 'wk_sofia_security',
  },
  {
    id: 'usr_004',
    fullName: 'Mateo Gómez',
    email: 'mateo.gomez@empresa.com',
    role: 'user',
    status: 'active',
    department: 'Ingeniería Frontend',
    lastActive: 'Hace 1 hora',
    siteKey: 'wk_mateo_frontend',
  },
  {
    id: 'usr_005',
    fullName: 'Elena Silva',
    email: 'elena.silva@empresa.com',
    role: 'user',
    status: 'cancelled',
    department: 'Auditoría Externa',
    lastActive: 'Hace 2 semanas',
    siteKey: 'wk_elena_audit',
  },
  {
    id: 'usr_006',
    fullName: 'Andrés Morales',
    email: 'andres.morales@empresa.com',
    role: 'user',
    status: 'inactive',
    department: 'Inteligencia de Datos',
    lastActive: 'Hace 3 días',
    siteKey: 'wk_andres_data',
  },
];

export class UserManagementService {
  private users: ManagedUser[] = [...INITIAL_MOCK_USERS];

  public getAll(): ManagedUser[] {
    return [...this.users];
  }

  public updateStatus(id: string, newStatus: UserAccountStatus): ManagedUser[] {
    this.users = this.users.map((u) => (u.id === id ? { ...u, status: newStatus } : u));
    return [...this.users];
  }

  public toggleActiveInactive(id: string): ManagedUser[] {
    this.users = this.users.map((u) => {
      if (u.id !== id) return u;
      const nextStatus = u.status === 'active' ? 'inactive' : 'active';
      return { ...u, status: nextStatus };
    });
    return [...this.users];
  }

  public cancelUser(id: string): ManagedUser[] {
    return this.updateStatus(id, 'cancelled');
  }

  public reactivateUser(id: string): ManagedUser[] {
    return this.updateStatus(id, 'active');
  }
}

export const userManagementService = new UserManagementService();
