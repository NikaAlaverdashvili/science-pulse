import { Injectable, signal } from '@angular/core';

export type Language = 'ka' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = signal<Language>((localStorage.getItem('sp_lang') as Language) || 'en');
  lang = this._lang.asReadonly();

  setLang(l: Language) {
    this._lang.set(l);
    localStorage.setItem('sp_lang', l);
  }

  t(ka: string, en: string): string {
    return this._lang() === 'ka' ? ka : en;
  }
}
