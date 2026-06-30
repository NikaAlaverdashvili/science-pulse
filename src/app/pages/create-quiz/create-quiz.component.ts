import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { QuizQuestion, QuizAnswer, QuizResult } from '../../core/models/quiz.model';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent {
  imageB64 = '';
  titleKa = ''; titleEn = '';
  descKa = ''; descEn = '';
  questions: QuizQuestion[] = [];
  results: QuizResult[] = [
    { minScore: 0, maxScore: 0, messageKa: '', messageEn: '' },
    { minScore: 0, maxScore: 0, messageKa: '', messageEn: '' }
  ];
  error = signal('');
  success = signal(false);

  constructor(private quizService: QuizService, private auth: AuthService, public lang: LanguageService, private router: Router) {
    this.addQuestion();
  }

  onImageChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imageB64 = reader.result as string; };
    reader.readAsDataURL(file);
  }

  addQuestion() {
    const q: QuizQuestion = {
      id: 'q-' + Date.now() + Math.random(),
      textKa: '', textEn: '',
      answers: [
        { id: 'a-' + Date.now() + '0', textKa: '', textEn: '' },
        { id: 'a-' + Date.now() + '1', textKa: '', textEn: '' },
        { id: 'a-' + Date.now() + '2', textKa: '', textEn: '' },
        { id: 'a-' + Date.now() + '3', textKa: '', textEn: '' }
      ],
      correctAnswerId: ''
    };
    this.questions = [...this.questions, q];
  }

  removeQuestion(idx: number) {
    this.questions = this.questions.filter((_, i) => i !== idx);
  }

  setCorrect(qIdx: number, answerId: string) {
    this.questions = this.questions.map((q, i) => i === qIdx ? { ...q, correctAnswerId: answerId } : q);
  }

  updateQuestion(idx: number, field: 'textKa' | 'textEn', val: string) {
    this.questions = this.questions.map((q, i) => i === idx ? { ...q, [field]: val } : q);
  }

  updateAnswer(qIdx: number, aIdx: number, field: 'textKa' | 'textEn', val: string) {
    this.questions = this.questions.map((q, i) => {
      if (i !== qIdx) return q;
      const answers = q.answers.map((a, ai) => ai === aIdx ? { ...a, [field]: val } : a);
      return { ...q, answers };
    });
  }

  addResult() {
    this.results = [...this.results, { minScore: 0, maxScore: 0, messageKa: '', messageEn: '' }];
  }

  removeResult(idx: number) {
    this.results = this.results.filter((_, i) => i !== idx);
  }

  submit() {
    if (!this.titleKa || !this.titleEn || !this.descKa || !this.descEn) {
      this.error.set(this.lang.t('სათაური და აღწერა სავალდებულოა', 'Title and description are required'));
      return;
    }
    if (this.questions.length === 0) {
      this.error.set(this.lang.t('მინიმუმ 1 კითხვა სავალდებულოა', 'At least 1 question is required'));
      return;
    }
    const invalid = this.questions.find(q => !q.textKa || !q.textEn || !q.correctAnswerId);
    if (invalid) {
      this.error.set(this.lang.t('ყველა კითხვა უნდა შეივსოს და სწორი პასუხი მონიშნოს', 'All questions must be filled and have a correct answer'));
      return;
    }
    const user = this.auth.currentUser()!;
    this.quizService.createQuiz({
      image: this.imageB64 || undefined,
      titleKa: this.titleKa, titleEn: this.titleEn,
      descriptionKa: this.descKa, descriptionEn: this.descEn,
      questions: this.questions,
      results: this.results,
      authorId: user.id, authorName: user.firstName + ' ' + user.lastName
    });
    this.success.set(true);
    setTimeout(() => this.router.navigate(['/quizzes']), 1500);
  }
}
