import { UserRole } from '../services/auth.service';

export interface User {
  id: string;
  role: UserRole;
  firstLogin: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
} 