import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

// SECURITY NOTE: This is a LOCAL DEMO ONLY.
// In production: use a real backend with bcrypt password hashing, JWT tokens,
// and server-side role validation. NEVER store plain passwords in localStorage.

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  constructor() {
    this.seedAdminIfNeeded();
    const stored = localStorage.getItem('sp_currentUser');
    if (stored) {
      try { this._currentUser.set(JSON.parse(stored)); } catch {}
    }
  }

  private seedAdminIfNeeded() {
    const users: User[] = this.getUsers();
    if (!users.find(u => u.role === 'admin')) {
      const admin: User = {
        id: 'admin-001',
        firstName: 'Nika',
        lastName: 'Alaverdashvili',
        password: 'D28ffMMs', // DEMO ONLY - production must use hashed passwords
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      users.unshift(admin);
      localStorage.setItem('sp_users', JSON.stringify(users));
    }
  }

  getUsers(): User[] {
    try { return JSON.parse(localStorage.getItem('sp_users') || '[]'); } catch { return []; }
  }

  saveUsers(users: User[]) {
    localStorage.setItem('sp_users', JSON.stringify(users));
  }

  login(firstName: string, lastName: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u =>
      u.firstName.toLowerCase() === firstName.toLowerCase() &&
      u.lastName.toLowerCase() === lastName.toLowerCase() &&
      u.password === password
    );
    if (user) {
      this._currentUser.set(user);
      localStorage.setItem('sp_currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(firstName: string, lastName: string, password: string, profileImage?: string): boolean {
    const users = this.getUsers();
    const exists = users.find(u =>
      u.firstName.toLowerCase() === firstName.toLowerCase() &&
      u.lastName.toLowerCase() === lastName.toLowerCase()
    );
    if (exists) return false;
    const user: User = {
      id: 'user-' + Date.now(),
      firstName, lastName, password,
      role: 'user',
      profileImage,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    this.saveUsers(users);
    this._currentUser.set(user);
    localStorage.setItem('sp_currentUser', JSON.stringify(user));
    return true;
  }

  logout() {
    this._currentUser.set(null);
    localStorage.removeItem('sp_currentUser');
  }

  isLoggedIn(): boolean { return !!this._currentUser(); }
  isAdmin(): boolean { return this._currentUser()?.role === 'admin'; }
  isCreator(): boolean { return ['admin', 'creator'].includes(this._currentUser()?.role || ''); }

  updateCurrentUser(user: User) {
    this._currentUser.set(user);
    localStorage.setItem('sp_currentUser', JSON.stringify(user));
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) { users[idx] = user; this.saveUsers(users); }
  }
}
