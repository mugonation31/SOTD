import { Injectable } from '@angular/core';
import { GroupAdminInvitation } from '@core/interfaces/group-admin.interface';

@Injectable({
  providedIn: 'root',
})
export class InvitationStorageService {
  private readonly STORAGE_KEY = 'group_admin_invitations';

  saveInvitations(invitations: GroupAdminInvitation[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invitations));
    } catch (error) {
      console.warn('Failed to save invitations to storage:', error);
    }
  }

  getInvitations(): GroupAdminInvitation[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const invitations = JSON.parse(stored) as GroupAdminInvitation[];
      return invitations.map((invite) => ({
        ...invite,
        expiresAt: new Date(invite.expiresAt),
        createdAt: new Date(invite.createdAt),
      }));
    } catch (error) {
      console.warn('Failed to retrieve invitations from storage:', error);
      return [];
    }
  }

  clearInvitations(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear invitations from storage:', error);
    }
  }

  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
