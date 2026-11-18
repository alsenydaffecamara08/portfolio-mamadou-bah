import {SanityService,PortfolioProfile} from './services/sanity.service';
import {Component,inject,signal} from '@angular/core';
import {RouterLink,RouterOutlet,NavigationEnd,Router} from '@angular/router';
import {filter} from 'rxjs';
import {LanguageService,Lang} from './services/language.service';
import {ScrollProgressDirective} from './directives/scroll-progress.directive';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,ScrollProgressDirective],templateUrl:'./app.html',styleUrl:'./app.css'})
export class App {
 language=inject(LanguageService);private router=inject(Router);
 profile=signal<PortfolioProfile|null>(null);
 private cms=inject(SanityService);
 menuOpen=signal(false); year=new Date().getFullYear();
 constructor(){void this.cms.getProfile().then(p=>this.profile.set(p)).catch(()=>{});this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe(()=>{
    this.menuOpen.set(false); if(typeof window!=='undefined'){
      const target=window.location.hash.replace('#','');
      if(target)requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView());
      else window.scrollTo({top:0,behavior:'instant'});
    }
  });}
 setLanguage(lang:Lang){this.language.set(lang)}
 scrollTop(){if(typeof window!=='undefined')window.scrollTo({top:0,behavior:'smooth'});}
}
