export interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'player';
}

export interface GroupSettings {
  allowPlayerInvites: boolean;
  autoApproveJoins: boolean;
  showLeaderboard: boolean;
  allowMemberChat: boolean;
}

export interface GroupLeaderboardEntry {
  memberId: string;
  memberName: string;
  points: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
  position: number;
  name: string;
  played: number;
  jokerUsed: boolean;
  totalPoints: number;
}

export interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: GroupMember[];
  settings: GroupSettings;
  type: 'casual' | 'prize';
  entryFee?: number;
  paidMembers: number;
  totalPrizePool?: number;
  adminName: string;
  leaderboard: GroupLeaderboardEntry[];
  description: string;
  isPrivate: boolean;
  rules?: string;
  adminId: string;
  updatedAt: Date;
}

export interface CreateGroupData {
  name: string;
  description: string;
  entryFee: number;
  isPrivate: boolean;
  rules?: string;
}
