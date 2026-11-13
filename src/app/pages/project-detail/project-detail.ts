import {Component,OnInit,inject,signal} from '@angular/core';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {SanityService,Project} from '../../services/sanity.service';
import {LanguageService} from '../../services/language.service';
import {RevealDirective} from '../../directives/reveal.directive';
@Component({selector:'app-project-detail',standalone:true,imports:[RouterLink,RevealDirective],templateUrl:'./project-detail.html',styleUrl:'./project-detail.css'})
export class ProjectDetailComponent implements OnInit{
 private cms=inject(SanityService); private route=inject(ActivatedRoute);language=inject(LanguageService);
 item=signal<Project|null>(null);loading=signal(true);error=signal(false);
 async ngOnInit(){const slug=this.route.snapshot.paramMap.get('slug');if(!slug){this.loading.set(false);return}
 try{this.item.set(await this.cms.getProject(slug))}catch(e){console.error(e);this.error.set(true)}finally{this.loading.set(false)}}
 txt(fr?:string,en?:string){return this.language.text(fr,en)}
}
