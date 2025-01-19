export interface GroupAdminInvitation {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  createdAt: Date;
  lastReminder?: Date;
  reminderCount: number;
  acceptedAt?: Date;
  acceptedBy?: {
    id: string;
    name: string;
    email: string;
  };
}
