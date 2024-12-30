export interface GroupAdminInvitation {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: Date;
}
