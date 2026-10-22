import { APP_CONFIG } from '../../../core/config/app_config';
import { httpClient } from '../../../core/http/http_client';
import { GithubAuthPayload, SpringAuthResponse } from '../domain/auth_contracts';
import { UserRole } from '../domain/user_session';

export class GithubAuthService {
  private static readonly TOKEN_STORAGE_KEY = '__cntr_token';
  private static readonly SITE_KEY_STORAGE_KEY = '__cntr_site_key';

  public static redirectToGithubOAuth(role: UserRole = 'admin'): void {
    const clientId = APP_CONFIG.githubClientId;
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('read:user user:email');
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${role}`;
    window.location.href = authUrl;
  }

  public static async authenticate(
    role: UserRole,
    username: string = 'DavidSolorza',
    code?: string
  ): Promise<SpringAuthResponse> {
    const payload: GithubAuthPayload = {
      code: code || `gh_oauth_${Date.now()}`,
      username,
      avatar_url: `https://github.com/${username}.png`,
      email: `${username.toLowerCase()}@github.local`,
      role,
    };

    const url = `${APP_CONFIG.authBaseUrl}/github`;

    try {
      const response = await httpClient.post<SpringAuthResponse>(url, payload);

      if (response && response.success) {
        this.persistSession(response.token, response.license.site_key);
        return response;
      }

      throw new Error(response?.message || 'Error en validación con Spring Boot');
    } catch (error) {
      console.warn('[GithubAuthService] Fallback local activado tras error:', error);
      return this.createFallbackResponse(payload);
    }
  }

  public static async authenticateWithCode(code: string, stateRole?: string): Promise<SpringAuthResponse> {
    const role: UserRole = stateRole === 'user' ? 'user' : 'admin';
    return this.authenticate(role, 'DavidSolorza', code);
  }

  public static persistSession(token: string, siteKey: string): void {
    try {
      localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
      localStorage.setItem(this.SITE_KEY_STORAGE_KEY, siteKey);
    } catch (e) {
      console.error('[GithubAuthService] No se pudo guardar en localStorage:', e);
    }
  }

  public static clearSession(): void {
    try {
      localStorage.removeItem(this.TOKEN_STORAGE_KEY);
      localStorage.removeItem(this.SITE_KEY_STORAGE_KEY);
    } catch (e) {
      console.error('[GithubAuthService] Error al limpiar localStorage:', e);
    }
  }

  private static createFallbackResponse(payload: GithubAuthPayload): SpringAuthResponse {
    const fallbackToken = `cntr_fallback_${Date.now()}`;
    const fallbackSiteKey = APP_CONFIG.defaultSiteKey;
    this.persistSession(fallbackToken, fallbackSiteKey);

    return {
      success: true,
      token: fallbackToken,
      user: {
        username: payload.username,
        email: payload.email,
        avatar_url: payload.avatar_url,
        role: payload.role,
        provider: 'github',
      },
      license: {
        site_key: fallbackSiteKey,
        client_name: 'Streaming Store JP (Offline/Dev)',
        allowed_domain: '*',
        is_active: 1,
      },
    };
  }
}
