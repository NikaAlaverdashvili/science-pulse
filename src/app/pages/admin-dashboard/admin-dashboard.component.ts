import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { QuizService } from '../../core/services/quiz.service';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(
    public postService: PostService,
    public quizService: QuizService,
    public auth: AuthService,
    public lang: LanguageService
  ) {}

  get totalUsers(): number { return this.auth.getUsers().length; }
  get totalComments(): number { return this.postService.getAllComments().length; }
  get recentPosts() { return this.postService.getLatestPosts(5); }
  get recentComments() { return [...this.postService.getAllComments()].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5); }

  deletePost(id: string) {
    if (confirm(this.lang.t('სტატიის წაშლა?', 'Delete this post?'))) {
      this.postService.deletePost(id);
    }
  }

  deleteComment(id: string) {
    if (confirm(this.lang.t('კომენტარის წაშლა?', 'Delete this comment?'))) {
      this.postService.deleteComment(id);
    }
  }
}
