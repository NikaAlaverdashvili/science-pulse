import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName = ''; lastName = ''; password = ''; confirmPassword = '';
  profileImageB64 = '';
  showPass = false;
  error = signal('');
  loading = signal(false);

  constructor(private auth: AuthService, private router: Router, public lang: LanguageService) {}

  get hasUppercase(): boolean { return /[A-Z]/.test(this.password); }
  get hasNumber(): boolean { return /[0-9]/.test(this.password); }
  get isPasswordValid(): boolean { return this.password.length >= 8 && this.hasUppercase && this.hasNumber; }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.profileImageB64 = reader.result as string; };
    reader.readAsDataURL(file);
  }

  submit() {
    if (!this.firstName.trim() || !this.lastName.trim()) {
      this.error.set(this.lang.t('სახელი და გვარი სავალდებულოა', 'First and last name are required'));
      return;
    }
    if (!this.isPasswordValid) {
      this.error.set(this.lang.t('პაროლი არ აკმაყოფილებს მოთხოვნებს', 'Password does not meet requirements'));
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set(this.lang.t('პაროლები არ ემთხვევა', 'Passwords do not match'));
      return;
    }
    this.loading.set(true);
    this.error.set('');
    setTimeout(() => {
      const ok = this.auth.register(this.firstName.trim(), this.lastName.trim(), this.password, this.profileImageB64 || undefined);
      this.loading.set(false);
      if (ok) { this.router.navigate(['/']); }
      else { this.error.set(this.lang.t('ამ სახელით მომხმარებელი უკვე არსებობს', 'User with this name already exists')); }
    }, 500);
  }
}
