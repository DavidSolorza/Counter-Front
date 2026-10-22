export type UserRole = 'admin' | 'user';

export interface UserSession {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly isAuthenticated: boolean;
  readonly avatarUrl?: string;
  readonly createdAt: string;
}

export class SessionHelper {
  public static isAdmin(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.role === 'admin';
  }

  public static isUser(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.role === 'user';
  }
}
