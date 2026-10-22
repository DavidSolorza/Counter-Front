export type UserRole = 'admin' | 'user';
export type AuthProviderType = 'local' | 'github' | 'google';

export interface UserLicense {
  readonly site_key: string;
  readonly client_name: string;
  readonly allowed_domain: string;
  readonly is_active?: number;
}

export interface UserSession {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly isAuthenticated: boolean;
  readonly provider: AuthProviderType;
  readonly githubUsername?: string;
  readonly avatarUrl?: string;
  readonly token?: string;
  readonly license?: UserLicense;
  readonly siteKey?: string;
  readonly clientName?: string;
  readonly createdAt: string;
}

export class SessionHelper {
  public static isAdmin(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.role === 'admin';
  }

  public static isUser(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.role === 'user';
  }

  public static isGithubUser(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.provider === 'github';
  }

  public static isGoogleUser(session: UserSession | null): boolean {
    return session !== null && session.isAuthenticated && session.provider === 'google';
  }
}
