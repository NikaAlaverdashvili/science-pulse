import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="page-wrapper">
  <div class="page-hero">
    <div class="container">
      <h1>{{ lang.t('კონტაქტი', 'Contact Us') }}</h1>
      <p>{{ lang.t('დაგვიკავშირდი', 'Get in touch with us') }}</p>
    </div>
  </div>

  <div class="container">
    <div class="contacts-layout">
      <div class="contact-info">
        <h2>{{ lang.t('კონტაქტის ინფო', 'Contact Information') }}</h2>

        <div class="contact-cards">
          <a href="mailto:nikaalaverdashvili12@gmail.com" class="contact-card email">
            <div class="contact-icon">📧</div>
            <div>
              <strong>Gmail</strong>
              <span>nikaalaverdashvili12&#64;gmail.com</span>
            </div>
          </a>

          <a href="tel:+995555770827" class="contact-card phone">
            <div class="contact-icon">📱</div>
            <div>
              <strong>{{ lang.t('ტელეფონი', 'Phone') }}</strong>
              <span>+995 555 770 827</span>
            </div>
          </a>

          <a href="https://www.facebook.com/share/1JSTLNZU5A/?mibextid=wwXIfr" target="_blank" class="contact-card facebook">
            <div class="contact-icon">👥</div>
            <div>
              <strong>Facebook</strong>
              <span>{{ lang.t('ჩვენი გვერდი', 'Our Page') }}</span>
            </div>
          </a>

          <a href="https://t.me/spacepulse_geo" target="_blank" class="contact-card telegram">
            <div class="contact-icon">✈️</div>
            <div>
              <strong>Telegram</strong>
              <span>&#64;spacepulse_geo</span>
            </div>
          </a>
        </div>
      </div>

      <div class="contact-form-section">
        <h2>{{ lang.t('შეტყობინების გაგზავნა', 'Send a Message') }}</h2>

        @if (submitted()) {
          <div class="success-state">
            <span class="success-icon">✅</span>
            <h3>{{ lang.t('გმადლობთ!', 'Thank you!') }}</h3>
            <p>{{ lang.t('თქვენი შეტყობინება გაიგზავნა.', 'Your message has been sent.') }}</p>
            <button (click)="submitted.set(false)">{{ lang.t('კიდევ გაგზავნა', 'Send Another') }}</button>
          </div>
        } @else {
          <form class="contact-form" (ngSubmit)="submit()">
            <div class="form-group">
              <label>{{ lang.t('სახელი *', 'Name *') }}</label>
              <input type="text" [(ngModel)]="name" name="name" [placeholder]="lang.t('შენი სახელი', 'Your name')" required/>
            </div>
            <div class="form-group">
              <label>{{ lang.t('ელ-ფოსტა *', 'Email *') }}</label>
              <input type="email" [(ngModel)]="email" name="email" [placeholder]="lang.t('ელ-ფოსტა', 'your@email.com')" required/>
            </div>
            <div class="form-group">
              <label>{{ lang.t('შეტყობინება *', 'Message *') }}</label>
              <textarea [(ngModel)]="message" name="message" [placeholder]="lang.t('შენი შეტყობინება...', 'Your message...')" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn" [disabled]="!name || !email || !message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              {{ lang.t('გაგზავნა', 'Send Message') }}
            </button>
          </form>
        }
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.page-wrapper { min-height: 100vh; padding-top: 70px; }
.page-hero { background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(37,99,235,0.08)); border-bottom: 1px solid rgba(59,130,246,0.1); padding: 4rem 0 3rem; h1 { font-size: 2.75rem; font-weight: 900; color: #fff; margin: 0 0 0.5rem; } p { color: rgba(255,255,255,0.5); margin: 0; } }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.contacts-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; padding: 4rem 0; }
.contact-info h2, .contact-form-section h2 { font-size: 1.35rem; font-weight: 800; color: #fff; margin: 0 0 1.5rem; }
.contact-cards { display: flex; flex-direction: column; gap: 1rem; }
.contact-card {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
  text-decoration: none; transition: all 0.3s;
  strong { display: block; color: #fff; font-size: 0.9rem; margin-bottom: 0.2rem; }
  span { color: rgba(255,255,255,0.45); font-size: 0.82rem; }
  .contact-icon { font-size: 1.5rem; }
  &:hover { transform: translateX(4px); border-color: rgba(59,130,246,0.3); }
  &.email:hover { border-color: rgba(234,88,12,0.35); }
  &.facebook:hover { border-color: rgba(59,130,246,0.45); }
  &.telegram:hover { border-color: rgba(14,165,233,0.45); }
  &.phone:hover { border-color: rgba(16,185,129,0.35); }
}
.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.form-group {
  display: flex; flex-direction: column; gap: 0.4rem;
  label { color: rgba(255,255,255,0.6); font-size: 0.82rem; font-weight: 500; }
  input, textarea { padding: 0.75rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 0.9rem; transition: border-color 0.2s; font-family: inherit; width: 100%; box-sizing: border-box; resize: vertical; &:focus { outline: none; border-color: rgba(59,130,246,0.5); } &::placeholder { color: rgba(255,255,255,0.25); } }
}
.submit-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 2rem; background: linear-gradient(135deg, #1D4ED8, #3B82F6); border: none; border-radius: 10px; color: #fff; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.4); } &:disabled { opacity: 0.5; cursor: default; } }
.success-state { text-align: center; padding: 3rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 16px; .success-icon { font-size: 3rem; display: block; margin-bottom: 1rem; } h3 { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0 0 0.5rem; } p { color: rgba(255,255,255,0.5); margin: 0 0 1.5rem; } button { padding: 0.6rem 1.5rem; background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); border-radius: 8px; color: #6EE7B7; cursor: pointer; font-size: 0.85rem; font-family: inherit; } }
@media (max-width: 768px) { .contacts-layout { grid-template-columns: 1fr; } }
  `]
})
export class ContactsComponent {
  name = ''; email = ''; message = '';
  submitted = signal(false);
  constructor(public lang: LanguageService) {}

  submit() {
    if (!this.name || !this.email || !this.message) return;
    this.submitted.set(true);
    this.name = ''; this.email = ''; this.message = '';
  }
}
