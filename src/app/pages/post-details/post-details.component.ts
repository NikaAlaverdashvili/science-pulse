import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { Post } from '../../core/models/post.model';
import { Comment } from '../../core/models/comment.model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  newComment = '';
  defaultImg = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80';

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    public auth: AuthService,
    public lang: LanguageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const post = this.postService.getPost(params['id']);
      this.post.set(post || null);
      if (post) this.comments.set(this.postService.getComments(post.id));
    });
  }

  get isLiked() { const u = this.auth.currentUser(); return u ? this.post()?.likes.includes(u.id) : false; }
  get isDisliked() { const u = this.auth.currentUser(); return u ? this.post()?.dislikes.includes(u.id) : false; }

  toggleLike() {
    const u = this.auth.currentUser(); const p = this.post();
    if (!u || !p) return;
    this.postService.toggleLike(p.id, u.id);
    this.post.set(this.postService.getPost(p.id) || null);
  }

  toggleDislike() {
    const u = this.auth.currentUser(); const p = this.post();
    if (!u || !p) return;
    this.postService.toggleDislike(p.id, u.id);
    this.post.set(this.postService.getPost(p.id) || null);
  }

  submitComment() {
    const u = this.auth.currentUser(); const p = this.post();
    if (!u || !p || !this.newComment.trim()) return;
    this.postService.addComment({ postId: p.id, userId: u.id, userName: u.firstName + ' ' + u.lastName, userImage: u.profileImage, text: this.newComment.trim() });
    this.newComment = '';
    this.comments.set(this.postService.getComments(p.id));
  }

  deleteComment(commentId: string) {
    this.postService.deleteComment(commentId);
    this.comments.set(this.postService.getComments(this.post()!.id));
  }

  canDeleteComment(comment: Comment): boolean {
    const u = this.auth.currentUser();
    return !!u && (u.id === comment.userId || u.role === 'admin');
  }
}
