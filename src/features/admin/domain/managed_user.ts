export type UserAccountStatus = 'active' | 'inactive' | 'cancelled';

export interface ManagedUser {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: 'admin' | 'user';
  readonly status: UserAccountStatus;
  readonly department: string;
  readonly lastActive: string;
  readonly siteKey?: string;
}

export class ManagedUserRules {
  public static canBeActivated(status: UserAccountStatus): boolean {
    return status === 'inactive' || status === 'cancelled';
  }

  public static canBeDeactivated(status: UserAccountStatus): boolean {
    return status === 'active';
  }

  public static canBeCancelled(status: UserAccountStatus): boolean {
    return status !== 'cancelled';
  }
}
