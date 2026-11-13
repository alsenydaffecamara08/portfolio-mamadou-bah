import {Component,Input,OnInit,inject,signal} from '@angular/core';
import {SanityService,Experience,Education} from '../../services/sanity.service';
import {RevealDirective} from '../../directives/reveal.directive';
import {SectionTitleComponent} from '../section-title/section-title';
@Component({selector:'app-career',standalone:true,imports:[RevealDirective,SectionTitleComponent],templateUrl:'./career.html',styleUrl:'./career.css'})
export class CareerComponent implements OnInit {
 @Input() lang:'fr'|'en'='fr';private cms=inject(SanityService);
 experiences=signal<Experience[]>([]);education=signal<Education[]>([]);error=signal(false);loading=signal(true);
 async ngOnInit(){try{const [x,e]=await Promise.all([this.cms.getExperiences(),this.cms.getEducations()]);this.experiences.set(x);this.education.set(e)}catch(err){console.error(err);this.error.set(true)}finally{this.loading.set(false)}}
 txt(fr?:string,en?:string){return (this.lang==='fr'?fr||en:en||fr)||'';}
 year(date?:string){return date?.slice(0,4)||'—';}
}
