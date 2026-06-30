export type UserRole = 'user' | 'creator' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string; // NOTE: In production, NEVER store plain text passwords. Use bcrypt or similar hashing on the backend.
  role: UserRole;
  profileImage?: string; // Base64 encoded image
  createdAt: string;
}
