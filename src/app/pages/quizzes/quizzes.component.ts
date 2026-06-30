import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/services/quiz.service';
import { LanguageService } from '../../core/services/language.service';
import { QuizCardComponent } from '../../shared/components/quiz-card/quiz-card.component';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, QuizCardComponent],
  template: `
<div class="page-wrapper">
  <div class="page-header">
    <div class="container">
      <h1>{{ lang.t('ვიქტორინები', 'Quizzes') }}</h1>
      <p>{{ lang.t('გამოცადე შენი სამეცნიერო ცოდნა', 'Test your scientific knowledge') }}</p>
    </div>
  </div>
  <div class="container">
    @if (quizService.quizzes().length > 0) {
      <div class="quizzes-grid">
        @for (quiz of quizService.quizzes(); track quiz.id) {
          <app-quiz-card [quiz]="quiz"/>
        }
      </div>
    } @else {
      <div class="empty-state"><span>🧠</span><p>{{ lang.t('ვიქტორინები არ არის.', 'No quizzes yet.') }}</p></div>
    }
  </div>
</div>
  `,
  styles: [`
.page-wrapper { min-height: 100vh; padding-top: 70px; }
.page-header { background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1)); border-bottom: 1px solid rgba(139,92,246,0.15); padding: 3rem 0; h1 { font-size: 2.5rem; font-weight: 900; color: #fff; margin: 0 0 0.5rem; } p { color: rgba(255,255,255,0.5); margin: 0; } }
.container { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
.quizzes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.empty-state { text-align: center; padding: 6rem; color: rgba(255,255,255,0.3); span { font-size: 3rem; display: block; margin-bottom: 1rem; } }
@media (max-width: 1024px) { .quizzes-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .quizzes-grid { grid-template-columns: 1fr; } }
  `]
})
export class QuizzesComponent {
  constructor(public quizService: QuizService, public lang: LanguageService) {}
}
