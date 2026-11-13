import {Component,Input,OnInit,inject,signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SanityService,Project} from '../../services/sanity.service';
import {RevealDirective} from '../../directives/reveal.directive';
import {SectionTitleComponent} from '../section-title/section-title';
@Component({selector:'app-projects',standalone:true,imports:[RouterLink,RevealDirective,SectionTitleComponent],templateUrl:'./projects.html',styleUrl:'./projects.css'})
export class ProjectsComponent implements OnInit{
 @Input() lang:'fr'|'en'='fr'; @Input() compact=false;
 private cms=inject(SanityService); items=signal<Project[]>([]);loading=signal(true);error=signal(false);
 filter=signal('all');
 async ngOnInit(){try{this.items.set(await this.cms.getProjects());}catch(e){console.error(e);this.error.set(true)}finally{this.loading.set(false)}}
 categories(){return [...new Set(this.items().map(x=>x.category||'other'))];}
 shown(){const featured=this.items().filter(x=>x.featured);const arr=this.compact?(featured.length?featured:this.items()).slice(0,3):this.items();return this.filter()==='all'?arr:arr.filter(x=>x.category===this.filter());}
 txt(fr?:string,en?:string){return (this.lang==='fr'?fr||en:en||fr)||'';}
}
