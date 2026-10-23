import { ManagedUser, UserAccountStatus } from '../domain/managed_user';
import { httpClient } from '../../../core/http/http_client';
import { APP_CONFIG } from '../../../core/config/app_config';

const INITIAL_FALLBACK_USERS: ManagedUser[] = [
  {
    id: 'lic_1',
    fullName: 'Cliente Demo Enterprise',
    email: 'cliente.demo.enterprise@counter.enterprise',
    role: 'admin',
    status: 'active',
    department: 'Infraestructura Global',
    lastActive: 'Hace 5 min',
    siteKey: 'wk_test_12345',
  },
  {
    id: 'lic_2',
    fullName: 'Streaming Store JP',
    email: 'streaming.store.jp@counter.enterprise',
    role: 'user',
    status: 'active',
    department: 'Comercio Digital & Media',
    lastActive: 'Hace 23 min',
    siteKey: 'wk_live_demo',
  },
];

export class UserManagementService {
  private users: ManagedUser[] = [...INITIAL_FALLBACK_USERS];

  public getAll(): ManagedUser[] {
    return [...this.users];
  }

  public async fetchAll(): Promise<ManagedUser[]> {
    try {
      const response = await httpClient.get<ManagedUser[]>(APP_CONFIG.adminUsersUrl);
      if (Array.isArray(response) && response.length > 0) {
        this.users = response;
      }
    } catch (err) {
      console.warn('[UserManagementService] Fallback a caché local:', err);
    }
    return [...this.users];
  }

  public async toggleActiveInactive(id: string): Promise<ManagedUser[]> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return [...this.users];
    const nextStatus: UserAccountStatus = user.status === 'active' ? 'inactive' : 'active';
    if (user.siteKey) {
      try {
        await httpClient.post(`${APP_CONFIG.adminUsersUrl}/${user.siteKey}/toggle`, {});
      } catch (err) {
        console.warn('[UserManagementService] Error toggling status in backend:', err);
      }
    }
    this.users = this.users.map((u) => (u.id === id ? { ...u, status: nextStatus } : u));
    return [...this.users];
  }

  public async cancelUser(id: string): Promise<ManagedUser[]> {
    const user = this.users.find((u) => u.id === id);
    if (user?.siteKey) {
      try {
        await httpClient.post(`${APP_CONFIG.adminUsersUrl}/${user.siteKey}/cancel`, {});
      } catch (err) {
        console.warn('[UserManagementService] Error cancelling user in backend:', err);
      }
    }
    this.users = this.users.map((u) => (u.id === id ? { ...u, status: 'cancelled' } : u));
    return [...this.users];
  }

  public async reactivateUser(id: string): Promise<ManagedUser[]> {
    const user = this.users.find((u) => u.id === id);
    if (user?.siteKey) {
      try {
        await httpClient.post(`${APP_CONFIG.adminUsersUrl}/${user.siteKey}/activate`, {});
      } catch (err) {
        console.warn('[UserManagementService] Error reactivating user in backend:', err);
      }
    }
    this.users = this.users.map((u) => (u.id === id ? { ...u, status: 'active' } : u));
    return [...this.users];
  }
}

export const userManagementService = new UserManagementService();
