import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { QuizService } from '../../core/services/quiz.service';
import { LanguageService } from '../../core/services/language.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { QuizCardComponent } from '../../shared/components/quiz-card/quiz-card.component';

const DEFAULT_SLIDES = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&q=80',
  'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1400&q=80'
];

const CATEGORIES = [
  { key: 'Space', iconPath: 'M12 2l2 7H6L12 2zm0 0v18M5 12a7 7 0 0 0 14 0', ka: 'კოსმოსი', en: 'Space', desc_ka: 'სამყაროს კვლევა', desc_en: 'Explore the universe', color: '#3B82F6', emoji: '🚀' },
  { key: 'Technology', iconPath: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18', ka: 'ტექნოლოგია', en: 'Technology', desc_ka: 'ინოვაციები ხვალისთვის', desc_en: 'Innovations shaping tomorrow', color: '#06B6D4', emoji: '💻' },
  { key: 'Health', iconPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', ka: 'ჯანმრთელობა', en: 'Health', desc_ka: 'ჯანდაცვის მიღწევები', desc_en: 'Advances in health & medicine', color: '#10B981', emoji: '🧬' },
  { key: 'Environment', iconPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z', ka: 'გარემო', en: 'Environment', desc_ka: 'ჩვენი პლანეტა', desc_en: 'Understanding our planet', color: '#84CC16', emoji: '🌿' },
  { key: 'Physics', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z', ka: 'ფიზიკა', en: 'Physics', desc_ka: 'ბუნების კანონები', desc_en: 'Unraveling the laws of nature', color: '#F59E0B', emoji: '⚛️' },
  { key: 'Research', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', ka: 'კვლევა', en: 'Research', desc_ka: 'უახლესი კვლევები', desc_en: 'Latest studies and findings', color: '#EC4899', emoji: '🔬' }
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent, QuizCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = CATEGORIES;
  slideIndex = signal(0);
  slides: string[] = [];
  private timer: any;

  constructor(public postService: PostService, public quizService: QuizService, public lang: LanguageService) {}

  ngOnInit() {
    const latest = this.postService.getLatestPosts(5);
    this.slides = latest.length > 0 ? latest.map(p => p.image || DEFAULT_SLIDES[0]) : DEFAULT_SLIDES;
    this.timer = setInterval(() => {
      this.slideIndex.update(i => (i + 1) % this.slides.length);
    }, 5000);
  }

  ngOnDestroy() { clearInterval(this.timer); }

  goToSlide(i: number) { this.slideIndex.set(i); }

  get latestPosts() { return this.postService.getLatestPosts(6); }
  get featuredQuizzes() { return this.quizService.quizzes().slice(0, 3); }
}
