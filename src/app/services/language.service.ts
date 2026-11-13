import { Injectable, signal } from '@angular/core';
export type Lang = 'fr' | 'en';
@Injectable({providedIn:'root'})
export class LanguageService {
  current = signal<Lang>('fr');
  constructor() {
    if (typeof window !== 'undefined') {
      const previous = localStorage.getItem('mrb-language');
      this.set(previous === 'en' ? 'en' : 'fr');
    }
  }
  set(lang:Lang) {
    this.current.set(lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
    if (typeof localStorage !== 'undefined') localStorage.setItem('mrb-language',lang);
  }
  text(fr?:string|null,en?:string|null) { return (this.current()==='en' ? en || fr : fr || en) || ''; }
}
