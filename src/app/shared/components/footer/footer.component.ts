import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" stroke="#2563EB" stroke-width="1.5"/>
        <ellipse cx="18" cy="18" rx="16" ry="6" stroke="#2563EB" stroke-width="1.5"/>
        <polyline points="10,18 14,14 18,22 22,12 26,18" stroke="#3B82F6" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <div class="brand-name">SCIENCE <span>PULSE</span></div>
        <div class="brand-desc">{{ lang.t('სამეცნიერო სიახლეები ქართულად და ინგლისურად', 'Science news in Georgian & English') }}</div>
      </div>
    </div>
    <div class="footer-links">
      <div class="link-group">
        <h4>{{ lang.t('კატეგორიები', 'Categories') }}</h4>
        <a routerLink="/news" [queryParams]="{cat:'Space'}">{{ lang.t('კოსმოსი', 'Space') }}</a>
        <a routerLink="/news" [queryParams]="{cat:'Technology'}">{{ lang.t('ტექნოლოგია', 'Technology') }}</a>
        <a routerLink="/news" [queryParams]="{cat:'Health'}">{{ lang.t('ჯანმრთელობა', 'Health') }}</a>
        <a routerLink="/news" [queryParams]="{cat:'Environment'}">{{ lang.t('გარემო', 'Environment') }}</a>
        <a routerLink="/news" [queryParams]="{cat:'Physics'}">{{ lang.t('ფიზიკა', 'Physics') }}</a>
      </div>
      <div class="link-group">
        <h4>{{ lang.t('სხვა', 'More') }}</h4>
        <a routerLink="/quizzes">{{ lang.t('ვიქტორინა', 'Quizzes') }}</a>
        <a routerLink="/about">{{ lang.t('ჩვენს შესახებ', 'About') }}</a>
        <a routerLink="/contacts">{{ lang.t('კონტაქტი', 'Contacts') }}</a>
      </div>
      <div class="link-group">
        <h4>{{ lang.t('სოციალური', 'Social') }}</h4>
        <a href="https://www.facebook.com/share/1JSTLNZU5A/" target="_blank">Facebook</a>
        <a href="https://t.me/spacepulse_geo" target="_blank">Telegram</a>
        <a href="mailto:nikaalaverdashvili12@gmail.com">Email</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© {{ year }} SCIENCE PULSE. {{ lang.t('ყველა უფლება დაცულია.', 'All rights reserved.') }}</p>
  </div>
</footer>
  `,
  styles: [`
.footer {
  background: rgba(5,8,20,0.95);
  border-top: 1px solid rgba(59,130,246,0.15);
  padding: 3rem 2rem 1rem;
  margin-top: auto;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}
.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  .brand-name { font-size: 1.1rem; font-weight: 800; color: #fff; letter-spacing: 0.05em; span { color: #3B82F6; } }
  .brand-desc { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.25rem; }
}
.footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.link-group {
  h4 { color: rgba(255,255,255,0.6); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.75rem; }
  a { display: block; color: rgba(255,255,255,0.4); text-decoration: none; font-size: 0.85rem; margin-bottom: 0.4rem; transition: color 0.2s; &:hover { color: #3B82F6; } }
}
.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  p { color: rgba(255,255,255,0.25); font-size: 0.78rem; margin: 0; }
}
@media (max-width: 768px) {
  .footer-container { grid-template-columns: 1fr; gap: 2rem; }
  .footer-links { grid-template-columns: repeat(2, 1fr); }
}
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
  constructor(public lang: LanguageService) {}
}
