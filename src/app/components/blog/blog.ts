import {Component,Input,OnInit,inject,signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SanityService,Article} from '../../services/sanity.service';
import {RevealDirective} from '../../directives/reveal.directive';
import {SectionTitleComponent} from '../section-title/section-title';
@Component({selector:'app-blog',standalone:true,imports:[RouterLink,RevealDirective,SectionTitleComponent],templateUrl:'./blog.html',styleUrl:'./blog.css'})
export class BlogComponent implements OnInit{
 @Input() lang:'fr'|'en'='fr';@Input() compact=false;private cms=inject(SanityService);
 articles=signal<Article[]>([]);loading=signal(true);error=signal(false);
 async ngOnInit(){try{this.articles.set(await this.cms.getArticles())}catch(e){console.error(e);this.error.set(true)}finally{this.loading.set(false)}}
 visible(){return this.compact?this.articles().slice(0,3):this.articles();}
 txt(fr?:string,en?:string){return (this.lang==='fr'?fr||en:en||fr)||'';}
}
