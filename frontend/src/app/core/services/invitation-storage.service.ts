import { Injectable } from '@angular/core';
import { GroupAdminInvitation } from '@core/interfaces/group-admin.interface';

@Injectable({
  providedIn: 'root',
})
export class InvitationStorageService {
  private readonly STORAGE_KEY = 'group_admin_invitations';

  saveInvitations(invitations: GroupAdminInvitation[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invitations));
  }

  getInvitations(): GroupAdminInvitation[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    const invitations = JSON.parse(stored) as GroupAdminInvitation[];
    return invitations.map((invite) => ({
      ...invite,
      expiresAt: new Date(invite.expiresAt),
      createdAt: new Date(invite.createdAt),
    }));
  }

  clearInvitations(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
