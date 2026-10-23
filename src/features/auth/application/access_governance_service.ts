import { UserRole } from '../domain/user_session';

type GovernanceListener = (isAllowed: boolean) => void;

export class AccessGovernanceService {
  private static readonly STORAGE_KEY = '__cntr_allow_admin_login';
  private listeners: Set<GovernanceListener> = new Set();
  private allowAdminLogin: boolean;

  constructor() {
    const saved = localStorage.getItem(AccessGovernanceService.STORAGE_KEY);
    // Por defecto es false: el botón de login como admin está oculto para máxima seguridad
    this.allowAdminLogin = saved !== null ? saved === 'true' : false;
  }

  public isPublicAdminLoginAllowed(): boolean {
    return this.allowAdminLogin;
  }

  public setPublicAdminLoginAllowed(allowed: boolean): void {
    this.allowAdminLogin = allowed;
    localStorage.setItem(AccessGovernanceService.STORAGE_KEY, String(allowed));
    this.notify();
  }

  public subscribe(listener: GovernanceListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public canDemoteAdmin(_targetUserId: string, allUsers: Array<{ id: string; role: UserRole }>): boolean {
    const adminCount = allUsers.filter((u) => u.role === 'admin').length;
    // No se puede degradar al último admin activo para no dejar el sistema sin administrador
    return adminCount > 1;
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.allowAdminLogin));
  }
}

export const accessGovernanceService = new AccessGovernanceService();
