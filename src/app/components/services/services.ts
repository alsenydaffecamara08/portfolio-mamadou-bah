import {Component,Input,OnInit,inject,signal} from '@angular/core';
import {SanityService,ServiceItem} from '../../services/sanity.service';
import {RevealDirective} from '../../directives/reveal.directive';
import {SectionTitleComponent} from '../section-title/section-title';
@Component({selector:'app-services',standalone:true,imports:[RevealDirective,SectionTitleComponent],templateUrl:'./services.html',styleUrl:'./services.css'})
export class ServicesComponent implements OnInit{
 @Input() lang:'fr'|'en'='fr'; private cms=inject(SanityService);items=signal<ServiceItem[]>([]);loading=signal(true);error=signal(false);
 async ngOnInit(){try{this.items.set(await this.cms.getServices())}catch(e){console.error(e);this.error.set(true)}finally{this.loading.set(false)}}
 txt(fr?:string,en?:string){return (this.lang==='fr'?fr||en:en||fr)||'';}
}
