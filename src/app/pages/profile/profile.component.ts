import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
<div class="page-wrapper">
  <div class="container">
    @if (auth.currentUser(); as user) {
      <div class="profile-layout">
        <!-- Sidebar -->
        <aside class="profile-sidebar">
          <div class="avatar-section">
            <div class="avatar-wrap">
              @if (user.profileImage) {
                <img [src]="user.profileImage" alt="profile" class="avatar"/>
              } @else {
                <div class="avatar-initials">{{ user.firstName[0] }}{{ user.lastName[0] }}</div>
              }
              <label class="avatar-change">
                📷
                <input type="file" accept="image/*" (change)="onImageChange($event)" style="display:none"/>
              </label>
            </div>
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <span class="role-badge" [class]="user.role">{{ user.role | titlecase }}</span>
          </div>

          <div class="sidebar-stats">
            <div class="stat"><span>{{ likedCount }}</span><label>{{ lang.t('მოწონება', 'Likes Given') }}</label></div>
            <div class="stat"><span>{{ commentCount }}</span><label>{{ lang.t('კომენტარი', 'Comments') }}</label></div>
          </div>

          @if (auth.isCreator()) {
            <a routerLink="/admin" class="btn-admin-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              {{ lang.t('ადმინ პანელი', 'Admin Panel') }}
            </a>
          }
        </aside>

        <!-- Main content -->
        <div class="profile-main">
          @if (saved()) {
            <div class="success-banner">✅ {{ lang.t('პროფილი განახლდა!', 'Profile updated!') }}</div>
          }

          <div class="profile-card">
            <h3>{{ lang.t('პირადი ინფორმაცია', 'Personal Information') }}</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>{{ lang.t('სახელი', 'First Name') }}</label>
                <span>{{ user.firstName }}</span>
              </div>
              <div class="info-item">
                <label>{{ lang.t('გვარი', 'Last Name') }}</label>
                <span>{{ user.lastName }}</span>
              </div>
              <div class="info-item">
                <label>{{ lang.t('როლი', 'Role') }}</label>
                <span class="role-text {{ user.role }}">{{ user.role | titlecase }}</span>
              </div>
              <div class="info-item">
                <label>{{ lang.t('გაწევრიანება', 'Joined') }}</label>
                <span>{{ user.createdAt | date:'MMMM d, y' }}</span>
              </div>
            </div>
          </div>

          <div class="profile-card">
            <h3>{{ lang.t('ფოტოს შეცვლა', 'Change Profile Photo') }}</h3>
            @if (newImageB64) {
              <img [src]="newImageB64" alt="preview" class="image-preview"/>
              <button class="btn-save" (click)="saveImage()">{{ lang.t('შენახვა', 'Save Photo') }}</button>
            } @else {
              <label class="upload-label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                {{ lang.t('ფოტოს ატვირთვა', 'Upload Photo') }}
                <input type="file" accept="image/*" (change)="onImageChange($event)" style="display:none"/>
              </label>
            }
          </div>

          <div class="profile-card">
            <h3>{{ lang.t('ჩემი კომენტარები', 'My Comments') }}</h3>
            @if (myComments.length > 0) {
              @for (comment of myComments; track comment.id) {
                <div class="comment-row">
                  <p>{{ comment.text }}</p>
                  <span class="comment-date">{{ comment.createdAt | date:'MMM d, y' }}</span>
                </div>
              }
            } @else {
              <p class="empty-text">{{ lang.t('კომენტარები ჯერ არ გაქვს', 'No comments yet') }}</p>
            }
          </div>
        </div>
      </div>
    }
  </div>
</div>
  `,
  styles: [`
.page-wrapper { min-height: 100vh; padding: 5rem 2rem 3rem; }
.container { max-width: 1100px; margin: 0 auto; }
.profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
.profile-sidebar { display: flex; flex-direction: column; gap: 1rem; }
.avatar-section {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2rem; text-align: center;
  h2 { font-size: 1.25rem; font-weight: 800; color: #fff; margin: 0.75rem 0 0.4rem; }
}
.avatar-wrap { position: relative; display: inline-block; }
.avatar { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(59,130,246,0.4); }
.avatar-initials { width: 90px; height: 90px; border-radius: 50%; background: rgba(37,99,235,0.2); border: 2px solid rgba(59,130,246,0.4); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; color: #3B82F6; }
.avatar-change { position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; background: #3B82F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; cursor: pointer; }
.role-badge { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 20px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; &.admin { background: rgba(239,68,68,0.2); color: #FCA5A5; } &.creator { background: rgba(139,92,246,0.2); color: #a78bfa; } &.user { background: rgba(59,130,246,0.2); color: #93C5FD; } }
.sidebar-stats { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.25rem; display: grid; grid-template-columns: 1fr 1fr; }
.stat { text-align: center; padding: 0.5rem; span { display: block; font-size: 1.75rem; font-weight: 900; color: #3B82F6; } label { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; } }
.btn-admin-link { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem; background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; color: #a78bfa; font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: all 0.2s; &:hover { background: rgba(139,92,246,0.25); } }
.profile-main { display: flex; flex-direction: column; gap: 1.5rem; }
.success-banner { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); color: #6EE7B7; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.9rem; }
.profile-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.5rem; h3 { font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.7); margin: 0 0 1.25rem; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.8rem; } }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.info-item { label { display: block; font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 0.25rem; } span { color: #fff; font-size: 0.9rem; font-weight: 500; } }
.role-text { &.admin { color: #FCA5A5; } &.creator { color: #a78bfa; } &.user { color: #93C5FD; } }
.image-preview { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; display: block; margin-bottom: 1rem; border: 2px solid rgba(59,130,246,0.4); }
.btn-save { padding: 0.6rem 1.5rem; background: linear-gradient(135deg, #1D4ED8, #3B82F6); border: none; border-radius: 8px; color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
.upload-label { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.12); border-radius: 12px; color: rgba(255,255,255,0.4); font-size: 0.85rem; cursor: pointer; transition: all 0.2s; &:hover { border-color: rgba(59,130,246,0.4); color: #fff; } }
.comment-row { padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); p { color: rgba(255,255,255,0.7); font-size: 0.875rem; margin: 0 0 0.25rem; } .comment-date { font-size: 0.72rem; color: rgba(255,255,255,0.3); } &:last-child { border-bottom: none; } }
.empty-text { color: rgba(255,255,255,0.3); font-size: 0.875rem; }
@media (max-width: 768px) { .profile-layout { grid-template-columns: 1fr; } .info-grid { grid-template-columns: 1fr; } }
  `]
})
export class ProfileComponent {
  newImageB64 = '';
  saved = signal(false);

  constructor(public auth: AuthService, public lang: LanguageService, private postService: PostService) {}

  get likedCount(): number {
    const u = this.auth.currentUser();
    if (!u) return 0;
    return this.postService.posts().filter(p => p.likes.includes(u.id)).length;
  }

  get commentCount(): number {
    const u = this.auth.currentUser();
    if (!u) return 0;
    return this.postService.getAllComments().filter(c => c.userId === u.id).length;
  }

  get myComments() {
    const u = this.auth.currentUser();
    if (!u) return [];
    return this.postService.getAllComments().filter(c => c.userId === u.id).slice(0, 5);
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.newImageB64 = reader.result as string; };
    reader.readAsDataURL(file);
  }

  saveImage() {
    const u = this.auth.currentUser();
    if (!u || !this.newImageB64) return;
    this.auth.updateCurrentUser({ ...u, profileImage: this.newImageB64 });
    this.newImageB64 = '';
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
