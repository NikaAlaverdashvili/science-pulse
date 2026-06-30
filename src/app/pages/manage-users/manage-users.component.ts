import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="page-wrapper">
  <div class="page-header">
    <div class="container">
      <a routerLink="/admin" class="back-link">← {{ lang.t('ადმინ პანელი', 'Admin Panel') }}</a>
      <h1>{{ lang.t('მომხმარებლების მართვა', 'Manage Users') }}</h1>
      <p>{{ users.length }} {{ lang.t('მომხმარებელი', 'users') }}</p>
    </div>
  </div>

  <div class="container">
    @if (message()) {
      <div class="message-banner" [class.success]="messageType() === 'success'" [class.error]="messageType() === 'error'">
        {{ message() }}
      </div>
    }

    <div class="users-table">
      @for (user of users; track user.id) {
        <div class="user-row" [class.admin-row]="user.role === 'admin'">
          <div class="user-info">
            <div class="user-avatar">
              @if (user.profileImage) {
                <img [src]="user.profileImage" alt="avatar"/>
              } @else {
                <span>{{ user.firstName[0] }}{{ user.lastName[0] }}</span>
              }
            </div>
            <div>
              <strong>{{ user.firstName }} {{ user.lastName }}</strong>
              <span class="joined">{{ lang.t('გაწევრიანდა:', 'Joined:') }} {{ user.createdAt | date:'MMM d, y' }}</span>
            </div>
          </div>

          <span class="role-badge" [class]="user.role">{{ user.role | titlecase }}</span>

          <div class="user-actions">
            @if (user.role !== 'admin') {
              @if (user.role === 'user') {
                <button class="btn-make-creator" (click)="makeCreator(user)">
                  ⬆️ {{ lang.t('კრეატორი', 'Make Creator') }}
                </button>
              }
              @if (user.role === 'creator') {
                <button class="btn-remove-creator" (click)="removeCreator(user)">
                  ⬇️ {{ lang.t('კრეატორობის მოხსნა', 'Remove Creator') }}
                </button>
              }
            } @else {
              <span class="protected">🔒 {{ lang.t('დაცული', 'Protected') }}</span>
            }
          </div>
        </div>
      }
    </div>
  </div>
</div>
  `,
  styles: [`
.page-wrapper { min-height: 100vh; padding-top: 70px; }
.page-header { background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(37,99,235,0.08)); border-bottom: 1px solid rgba(16,185,129,0.12); padding: 2rem 0; h1 { font-size: 2rem; font-weight: 900; color: #fff; margin: 0.4rem 0 0.25rem; } p { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin: 0; } }
.back-link { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; &:hover { color: #6EE7B7; } }
.container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
.message-banner { border-radius: 10px; padding: 0.85rem 1.25rem; margin: 1.5rem 0; font-size: 0.9rem; &.success { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); color: #6EE7B7; } &.error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #FCA5A5; } }
.users-table { padding: 2rem 0 4rem; display: flex; flex-direction: column; gap: 0.75rem; }
.user-row { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; transition: all 0.2s; &:hover { border-color: rgba(255,255,255,0.12); } &.admin-row { border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.04); } }
.user-info { display: flex; align-items: center; gap: 0.9rem; flex: 1; strong { display: block; color: #fff; font-size: 0.95rem; margin-bottom: 0.2rem; } .joined { display: block; color: rgba(255,255,255,0.35); font-size: 0.75rem; } }
.user-avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.25); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; img { width: 100%; height: 100%; object-fit: cover; } span { color: #3B82F6; font-weight: 700; font-size: 0.9rem; } }
.role-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; &.admin { background: rgba(239,68,68,0.2); color: #FCA5A5; } &.creator { background: rgba(139,92,246,0.2); color: #a78bfa; } &.user { background: rgba(59,130,246,0.15); color: #93C5FD; } }
.user-actions { display: flex; align-items: center; gap: 0.5rem; }
.btn-make-creator { padding: 0.4rem 1rem; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); border-radius: 8px; color: #6EE7B7; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; &:hover { background: rgba(16,185,129,0.22); } }
.btn-remove-creator { padding: 0.4rem 1rem; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); border-radius: 8px; color: #FCD34D; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; &:hover { background: rgba(245,158,11,0.2); } }
.protected { color: rgba(255,255,255,0.25); font-size: 0.8rem; }
@media (max-width: 600px) { .user-row { flex-wrap: wrap; } .user-actions { width: 100%; } }
  `]
})
export class ManageUsersComponent {
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  constructor(public auth: AuthService, public lang: LanguageService) {}

  get users(): User[] { return this.auth.getUsers(); }

  showMsg(text: string, type: 'success' | 'error' = 'success') {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => this.message.set(''), 3000);
  }

  makeCreator(user: User) {
    const users = this.auth.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx < 0) return;
    users[idx] = { ...users[idx], role: 'creator' };
    this.auth.saveUsers(users);
    this.showMsg(this.lang.t(`${user.firstName} კრეატორი გახდა`, `${user.firstName} is now a Creator`));
  }

  removeCreator(user: User) {
    const users = this.auth.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx < 0) return;
    users[idx] = { ...users[idx], role: 'user' };
    this.auth.saveUsers(users);
    this.showMsg(this.lang.t(`${user.firstName}-ს კრეატორობა მოეხსნა`, `${user.firstName}'s Creator role removed`));
  }
}
