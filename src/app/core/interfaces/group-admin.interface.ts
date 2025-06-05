export interface GroupAdminInvitation {
  id: string;
  email: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  createdAt: Date;
  expiresAt: Date;
  acceptedBy?: {
    id: string;
    name: string;
    email: string;
  };
  reminderCount: number;
  history?: {
    type: 'created' | 'resent' | 'accepted' | 'expired' | 'revoked';
    message: string;
    timestamp: Date;
  }[];
}
