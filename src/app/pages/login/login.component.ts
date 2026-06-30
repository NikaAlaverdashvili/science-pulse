import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
<div class="auth-page">
  <div class="auth-bg"></div>
  <div class="auth-card">
    <div class="auth-logo">
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" stroke="#2563EB" stroke-width="1.5"/>
        <ellipse cx="18" cy="18" rx="16" ry="6" stroke="#2563EB" stroke-width="1.5"/>
        <polyline points="10,18 14,14 18,22 22,12 26,18" stroke="#3B82F6" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>SCIENCE <span class="accent">PULSE</span></span>
    </div>
    <h2>{{ lang.t('მოგესალმებით', 'Welcome Back') }}</h2>
    <p class="subtitle">{{ lang.t('შედი შენს ანგარიშზე', 'Sign in to your account') }}</p>

    @if (error()) {
      <div class="error-banner">⚠️ {{ error() }}</div>
    }

    <form (ngSubmit)="submit()" class="auth-form">
      <div class="form-group">
        <label>{{ lang.t('სახელი', 'First Name') }}</label>
        <input type="text" [(ngModel)]="firstName" name="firstName" [placeholder]="lang.t('სახელი', 'First name')" required autocomplete="given-name"/>
      </div>
      <div class="form-group">
        <label>{{ lang.t('გვარი', 'Last Name') }}</label>
        <input type="text" [(ngModel)]="lastName" name="lastName" [placeholder]="lang.t('გვარი', 'Last name')" required autocomplete="family-name"/>
      </div>
      <div class="form-group">
        <label>{{ lang.t('პაროლი', 'Password') }}</label>
        <div class="input-wrap">
          <input [type]="showPass ? 'text' : 'password'" [(ngModel)]="password" name="password" [placeholder]="lang.t('პაროლი', 'Password')" required autocomplete="current-password"/>
          <button type="button" class="toggle-pass" (click)="showPass = !showPass">{{ showPass ? '🙈' : '👁️' }}</button>
        </div>
      </div>
      <button type="submit" class="submit-btn" [disabled]="loading()">
        {{ loading() ? lang.t('შესვლა...', 'Signing in...') : lang.t('შესვლა', 'Sign In') }}
      </button>
    </form>

    <p class="auth-footer">
      {{ lang.t('ანგარიში არ გაქვს?', 'Don\'t have an account?') }}
      <a routerLink="/register">{{ lang.t('რეგისტრაცია', 'Register') }}</a>
    </p>
  </div>
</div>
  `,
  styles: [`
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 5rem 1.5rem 2rem; position: relative; }
.auth-bg { position: fixed; inset: 0; background: radial-gradient(ellipse at top, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(139,92,246,0.08) 0%, transparent 60%); pointer-events: none; }
.auth-card { position: relative; z-index: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 2.5rem 2rem; width: 100%; max-width: 420px; backdrop-filter: blur(20px); box-shadow: 0 25px 80px rgba(0,0,0,0.5); }
.auth-logo { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 800; color: #fff; letter-spacing: 0.05em; .accent { color: #3B82F6; } }
h2 { font-size: 1.75rem; font-weight: 800; color: #fff; margin: 0 0 0.35rem; }
.subtitle { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin: 0 0 1.75rem; }
.error-banner { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); color: #FCA5A5; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1.25rem; }
.auth-form { display: flex; flex-direction: column; gap: 1rem; }
.form-group {
  display: flex; flex-direction: column; gap: 0.4rem;
  label { color: rgba(255,255,255,0.6); font-size: 0.82rem; font-weight: 500; }
  input { padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 0.9rem; transition: border-color 0.2s; font-family: inherit; width: 100%; box-sizing: border-box; &:focus { outline: none; border-color: rgba(59,130,246,0.5); } &::placeholder { color: rgba(255,255,255,0.25); } }
}
.input-wrap { position: relative; input { padding-right: 3rem; } }
.toggle-pass { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; }
.submit-btn { margin-top: 0.5rem; padding: 0.85rem; background: linear-gradient(135deg, #1D4ED8, #3B82F6); border: none; border-radius: 10px; color: #fff; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); } &:disabled { opacity: 0.6; cursor: default; } }
.auth-footer { text-align: center; color: rgba(255,255,255,0.4); font-size: 0.85rem; margin: 1.25rem 0 0; a { color: #3B82F6; text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } } }
  `]
})
export class LoginComponent {
  firstName = ''; lastName = ''; password = '';
  showPass = false;
  error = signal('');
  loading = signal(false);

  constructor(private auth: AuthService, private router: Router, public lang: LanguageService) {}

  submit() {
    if (!this.firstName || !this.lastName || !this.password) {
      this.error.set(this.lang.t('ყველა ველი სავალდებულოა', 'All fields are required'));
      return;
    }
    this.loading.set(true);
    this.error.set('');
    setTimeout(() => {
      const ok = this.auth.login(this.firstName, this.lastName, this.password);
      this.loading.set(false);
      if (ok) { this.router.navigate(['/']); }
      else { this.error.set(this.lang.t('არასწორი მონაცემები', 'Invalid credentials')); }
    }, 500);
  }
}
