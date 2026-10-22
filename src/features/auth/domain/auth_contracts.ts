import { UserRole } from './user_session';

export interface GithubAuthPayload {
  readonly code?: string;
  readonly username: string;
  readonly avatar_url: string;
  readonly email: string;
  readonly role: UserRole;
}

export interface LicenseDto {
  readonly site_key: string;
  readonly client_name: string;
  readonly allowed_domain: string;
  readonly is_active: number;
}

export interface SpringAuthUserDto {
  readonly username: string;
  readonly email: string;
  readonly avatar_url: string;
  readonly role: UserRole;
  readonly provider: string;
}

export interface SpringAuthResponse {
  readonly success: boolean;
  readonly token: string;
  readonly user: SpringAuthUserDto;
  readonly license: LicenseDto;
  readonly message?: string;
}
