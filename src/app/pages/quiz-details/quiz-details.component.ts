import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';
import { LanguageService } from '../../core/services/language.service';
import { Quiz, QuizQuestion } from '../../core/models/quiz.model';

type QuizState = 'intro' | 'playing' | 'result';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {
  quiz = signal<Quiz | null>(null);
  state = signal<QuizState>('intro');
  currentIdx = signal(0);
  selectedAnswer = signal<string | null>(null);
  answered = signal(false);
  score = signal(0);
  userAnswers: Record<string, string> = {};
  defaultImg = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80';

  constructor(private route: ActivatedRoute, public quizService: QuizService, public lang: LanguageService) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      const quiz = this.quizService.getQuiz(p['id']);
      this.quiz.set(quiz || null);
    });
  }

  get currentQuestion(): QuizQuestion | null {
    const q = this.quiz(); if (!q) return null;
    return q.questions[this.currentIdx()] || null;
  }

  get progress(): number {
    const q = this.quiz(); if (!q) return 0;
    return ((this.currentIdx() + 1) / q.questions.length) * 100;
  }

  get resultMessage(): string {
    const q = this.quiz(); if (!q) return '';
    const s = this.score();
    const result = q.results.find(r => s >= r.minScore && s <= r.maxScore);
    return result ? this.lang.t(result.messageKa, result.messageEn) : '';
  }

  startQuiz() {
    this.currentIdx.set(0);
    this.score.set(0);
    this.selectedAnswer.set(null);
    this.answered.set(false);
    this.userAnswers = {};
    this.state.set('playing');
  }

  selectAnswer(answerId: string) {
    if (this.answered()) return;
    this.selectedAnswer.set(answerId);
    this.answered.set(true);
    const q = this.currentQuestion;
    if (q && answerId === q.correctAnswerId) {
      this.score.update(s => s + 1);
    }
    this.userAnswers[this.currentIdx()] = answerId;
  }

  next() {
    const q = this.quiz(); if (!q) return;
    if (this.currentIdx() < q.questions.length - 1) {
      this.currentIdx.update(i => i + 1);
      this.selectedAnswer.set(null);
      this.answered.set(false);
    } else {
      this.state.set('result');
    }
  }

  restart() {
    this.state.set('intro');
    this.startQuiz();
  }

  isCorrect(answerId: string): boolean {
    return answerId === this.currentQuestion?.correctAnswerId;
  }

  getAnswerClass(answerId: string): string {
    if (!this.answered()) return '';
    if (answerId === this.currentQuestion?.correctAnswerId) return 'correct';
    if (answerId === this.selectedAnswer()) return 'wrong';
    return '';
  }

  getCorrectAnswerText(): string {
    const q = this.currentQuestion;
    if (!q) return '';
    const a = q.answers.find(ans => ans.id === q.correctAnswerId);
    if (!a) return '';
    return this.lang.t(a.textKa, a.textEn);
  }
}
