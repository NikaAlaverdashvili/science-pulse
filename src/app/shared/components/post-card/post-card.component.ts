import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../../core/models/post.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<article class="post-card" [routerLink]="['/post', post.id]">
  <div class="card-image">
    <img [src]="post.image || defaultImg" [alt]="lang.t(post.titleKa, post.titleEn)" loading="lazy"/>
    <span class="category-badge">{{ post.category }}</span>
  </div>
  <div class="card-body">
    <h3 class="card-title">{{ lang.t(post.titleKa, post.titleEn) }}</h3>
    <p class="card-desc">{{ lang.t(post.shortDescKa, post.shortDescEn) }}</p>
    <div class="card-footer">
      <div class="card-meta">
        <span class="author">{{ post.authorName }}</span>
        <span class="date">{{ post.createdAt | date:'MMM d, y' }}</span>
      </div>
      <div class="card-stats">
        <span>👍 {{ post.likes.length }}</span>
        <span>💬</span>
      </div>
    </div>
    <div class="read-more">
      <span>{{ lang.t('სრულად წაკითხვა', 'Read More') }}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </div>
  </div>
</article>
  `,
  styles: [`
.post-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  backdrop-filter: blur(10px);
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(59,130,246,0.3);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1);
    .read-more { color: #3B82F6; gap: 0.5rem; }
  }
}
.card-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  &:hover img { transform: scale(1.04); }
}
.category-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(37,99,235,0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
}
.card-body { padding: 1.25rem; }
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.6rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  margin-bottom: 0.75rem;
}
.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  .author { font-size: 0.75rem; color: rgba(255,255,255,0.6); font-weight: 500; }
  .date { font-size: 0.7rem; color: rgba(255,255,255,0.3); }
}
.card-stats { display: flex; gap: 0.75rem; font-size: 0.75rem; color: rgba(255,255,255,0.4); }
.read-more {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  transition: all 0.2s;
}
  `]
})
export class PostCardComponent {
  @Input() post!: Post;
  defaultImg = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80';
  constructor(public lang: LanguageService) {}
}
