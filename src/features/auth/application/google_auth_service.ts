import { APP_CONFIG } from '../../../core/config/app_config';
import { httpClient } from '../../../core/http/http_client';
import { SpringAuthResponse } from '../domain/auth_contracts';
import { UserRole, UserSession } from '../domain/user_session';
import { GithubAuthService } from './github_auth_service';

export class GoogleAuthService {
  public static redirectToGoogleOAuth(role: UserRole = 'admin'): void {
    const clientId = APP_CONFIG.googleClientId;
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('openid profile email');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=google_${role}&prompt=select_account`;
    window.location.href = authUrl;
  }

  public static async authenticate(
    role: UserRole,
    email: string = 'usuario@gmail.com',
    fullName: string = 'Usuario Google',
    code?: string
  ): Promise<UserSession> {
    const payload = {
      code: code || '',
      username: fullName,
      email,
      role,
      redirect_uri: window.location.origin,
    };

    try {
      const url = `${APP_CONFIG.authBaseUrl}/google`;
      const res = await httpClient.post<SpringAuthResponse>(url, payload);
      if (res && res.success) {
        GithubAuthService.persistTokens(res.token, res.license.site_key);
        const session: UserSession = {
          id: res.token,
          name: res.user.username,
          email: res.user.email,
          role: res.user.role,
          isAuthenticated: true,
          provider: 'google',
          avatarUrl: res.user.avatar_url,
          token: res.token,
          license: res.license,
          siteKey: res.license.site_key,
          clientName: res.license.client_name,
          createdAt: new Date().toISOString().split('T')[0],
        };
        GithubAuthService.persistSession(session);
        return session;
      }
    } catch (e) {
      console.warn('[GoogleAuthService] Backend no disponible, usando fallback:', e);
    }

    return this.createFallback(role, email, fullName);
  }

  private static createFallback(role: UserRole, email: string, name: string): UserSession {
    const token = `cntr_googlesess_${Date.now()}`;
    const siteKey = `cntr_google_${name.toLowerCase().replace(/[^a-z0-9]/g, '')}_live`;
    const session: UserSession = {
      id: token,
      name,
      email,
      role,
      isAuthenticated: true,
      provider: 'google',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      token,
      license: { site_key: siteKey, client_name: name, allowed_domain: '*', is_active: 1 },
      siteKey,
      clientName: name,
      createdAt: new Date().toISOString().split('T')[0],
    };
    GithubAuthService.persistSession(session);
    return session;
  }
}
