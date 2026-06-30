import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { LanguageService } from '../../core/services/language.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { Post, PostCategory } from '../../core/models/post.model';

const CATEGORIES: (PostCategory | 'All')[] = ['All', 'Space', 'Technology', 'Health', 'Environment', 'Physics', 'Research'];

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent],
  template: `
<div class="page-wrapper">
  <div class="page-header">
    <div class="container">
      <h1>{{ lang.t('სამეცნიერო სიახლეები', 'Science News') }}</h1>
      <p>{{ lang.t('უახლესი სამეცნიერო კვლევები და აღმოჩენები', 'Latest scientific research and discoveries') }}</p>
    </div>
  </div>

  <div class="container">
    <div class="filter-bar">
      @for (cat of categories; track cat) {
        <button class="filter-btn" [class.active]="selectedCat() === cat" (click)="selectCat(cat)">
          {{ cat === 'All' ? lang.t('ყველა', 'All') : cat }}
        </button>
      }
    </div>

    @if (filteredPosts().length > 0) {
      <div class="posts-grid">
        @for (post of filteredPosts(); track post.id) {
          <app-post-card [post]="post"/>
        }
      </div>
    } @else {
      <div class="empty-state">
        <span>📰</span>
        <p>{{ lang.t('სტატიები არ მოიძებნა', 'No articles found in this category') }}</p>
      </div>
    }
  </div>
</div>
  `,
  styles: [`
.page-wrapper { min-height: 100vh; padding-top: 70px; }
.page-header {
  background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.1));
  border-bottom: 1px solid rgba(59,130,246,0.1);
  padding: 3rem 0;
  h1 { font-size: 2.5rem; font-weight: 900; color: #fff; margin: 0 0 0.5rem; }
  p { color: rgba(255,255,255,0.5); font-size: 1rem; margin: 0; }
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 2rem 0;
}
.filter-btn {
  padding: 0.5rem 1.25rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  color: rgba(255,255,255,0.6);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: rgba(59,130,246,0.3); color: #fff; }
  &.active { background: rgba(37,99,235,0.25); border-color: rgba(59,130,246,0.5); color: #fff; }
}
.posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding-bottom: 4rem; }
.empty-state { text-align: center; padding: 6rem 2rem; color: rgba(255,255,255,0.3); span { font-size: 3rem; display: block; margin-bottom: 1rem; } }
@media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .posts-grid { grid-template-columns: 1fr; } }
  `]
})
export class NewsComponent implements OnInit {
  categories = CATEGORIES;
  selectedCat = signal<PostCategory | 'All'>('All');
  filteredPosts = signal<Post[]>([]);

  constructor(public postService: PostService, public lang: LanguageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cat = params['cat'] as PostCategory | undefined;
      if (cat && CATEGORIES.includes(cat)) { this.selectedCat.set(cat); }
      this.updateFiltered();
    });
  }

  selectCat(cat: PostCategory | 'All') {
    this.selectedCat.set(cat);
    this.updateFiltered();
  }

  updateFiltered() {
    const cat = this.selectedCat();
    const all = this.postService.posts();
    this.filteredPosts.set(cat === 'All' ? all : all.filter(p => p.category === cat));
  }
}
