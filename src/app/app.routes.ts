import { Routes } from '@angular/router';
import { authGuard, adminGuard, creatorGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent) },
  { path: 'post/:id', loadComponent: () => import('./pages/post-details/post-details.component').then(m => m.PostDetailsComponent) },
  { path: 'quizzes', loadComponent: () => import('./pages/quizzes/quizzes.component').then(m => m.QuizzesComponent) },
  { path: 'quiz/:id', loadComponent: () => import('./pages/quiz-details/quiz-details.component').then(m => m.QuizDetailsComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contacts', loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [creatorGuard] },
  { path: 'create-post', loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent), canActivate: [creatorGuard] },
  { path: 'create-quiz', loadComponent: () => import('./pages/create-quiz/create-quiz.component').then(m => m.CreateQuizComponent), canActivate: [creatorGuard] },
  { path: 'manage-users', loadComponent: () => import('./pages/manage-users/manage-users.component').then(m => m.ManageUsersComponent), canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
