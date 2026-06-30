import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Quiz } from '../../../core/models/quiz.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<article class="quiz-card" [routerLink]="['/quiz', quiz.id]">
  <div class="card-image">
    <img [src]="quiz.image || defaultImg" [alt]="lang.t(quiz.titleKa, quiz.titleEn)" loading="lazy"/>
    <div class="quiz-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      {{ quiz.questions.length }} {{ lang.t('კითხვა', 'Questions') }}
    </div>
  </div>
  <div class="card-body">
    <h3 class="card-title">{{ lang.t(quiz.titleKa, quiz.titleEn) }}</h3>
    <p class="card-desc">{{ lang.t(quiz.descriptionKa, quiz.descriptionEn) }}</p>
    <div class="card-footer">
      <span class="date">{{ quiz.createdAt | date:'MMM d, y' }}</span>
      <button class="start-btn">
        {{ lang.t('დაწყება', 'Start Quiz') }}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
    </div>
  </div>
</article>
  `,
  styles: [`
.quiz-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  backdrop-filter: blur(10px);
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139,92,246,0.3);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1);
  }
}
.card-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  &:hover img { transform: scale(1.04); }
}
.quiz-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(139,92,246,0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.card-body { padding: 1.25rem; }
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.6rem;
  line-height: 1.4;
}
.card-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
}
.start-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #7C3AED, #8B5CF6);
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { transform: scale(1.03); box-shadow: 0 4px 15px rgba(139,92,246,0.4); }
}
  `]
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;
  defaultImg = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80';
  constructor(public lang: LanguageService) {}
}
