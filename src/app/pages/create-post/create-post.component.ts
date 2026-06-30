import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { PostCategory } from '../../core/models/post.model';

const CATEGORIES: PostCategory[] = ['Space', 'Technology', 'Health', 'Environment', 'Physics', 'Research'];

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  categories = CATEGORIES;
  imageB64 = '';
  titleKa = ''; titleEn = '';
  shortDescKa = ''; shortDescEn = '';
  contentKa = ''; contentEn = '';
  category: PostCategory = 'Space';
  error = signal('');
  success = signal(false);

  constructor(private postService: PostService, private auth: AuthService, public lang: LanguageService, private router: Router) {}

  onImageChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imageB64 = reader.result as string; };
    reader.readAsDataURL(file);
  }

  submit() {
    if (!this.titleKa || !this.titleEn || !this.shortDescKa || !this.shortDescEn || !this.contentKa || !this.contentEn) {
      this.error.set(this.lang.t('ყველა ველი სავალდებულოა', 'All fields are required'));
      return;
    }
    const user = this.auth.currentUser()!;
    this.postService.createPost({
      image: this.imageB64 || undefined,
      titleKa: this.titleKa, titleEn: this.titleEn,
      shortDescKa: this.shortDescKa, shortDescEn: this.shortDescEn,
      contentKa: this.contentKa, contentEn: this.contentEn,
      category: this.category,
      authorId: user.id, authorName: user.firstName + ' ' + user.lastName
    });
    this.success.set(true);
    setTimeout(() => this.router.navigate(['/news']), 1500);
  }
}
