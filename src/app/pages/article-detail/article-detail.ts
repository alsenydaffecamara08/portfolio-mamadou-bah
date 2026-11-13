import {Component,OnInit,inject,signal} from '@angular/core';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {SanityService,Article} from '../../services/sanity.service';
import {LanguageService} from '../../services/language.service';
import {RevealDirective} from '../../directives/reveal.directive';
@Component({selector:'app-article-detail',standalone:true,imports:[RouterLink,RevealDirective],templateUrl:'./article-detail.html',styleUrl:'./article-detail.css'})
export class ArticleDetailComponent implements OnInit{
 private cms=inject(SanityService);private route=inject(ActivatedRoute);language=inject(LanguageService);
 item=signal<Article|null>(null);loading=signal(true);error=signal(false);
 async ngOnInit(){const slug=this.route.snapshot.paramMap.get('slug');if(!slug){this.loading.set(false);return}
 try{this.item.set(await this.cms.getArticle(slug))}catch(e){console.error(e);this.error.set(true)}finally{this.loading.set(false)}}
 body(){const a=this.item();return this.language.current()==='en'?(a?.bodyEn?.length?a.bodyEn:a?.bodyFr||[]):(a?.bodyFr?.length?a.bodyFr:a?.bodyEn||[])}
 blockText(block:any){return (block?.children||[]).map((c:any)=>c.text||'').join('')}
}
