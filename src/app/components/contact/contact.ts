import {Component,Input,OnInit,inject,signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SanityService,SiteSettings} from '../../services/sanity.service';
import {RevealDirective} from '../../directives/reveal.directive';
@Component({selector:'app-contact',standalone:true,imports:[FormsModule,RevealDirective],templateUrl:'./contact.html',styleUrl:'./contact.css'})
export class ContactComponent implements OnInit{
 @Input() lang:'fr'|'en'='fr';private cms=inject(SanityService); settings=signal<SiteSettings|null>(null);
 name='';email='';subject='';message='';
 async ngOnInit(){try{this.settings.set(await this.cms.getSettings())}catch(e){console.error(e)}}
 send(){const to=this.settings()?.email;if(!to)return;
 const sub=encodeURIComponent(this.subject||'Portfolio — contact');
 const body=encodeURIComponent(`Nom: ${this.name}\nEmail: ${this.email}\n\n${this.message}`);
 if(typeof window!=='undefined')window.location.href=`mailto:${encodeURIComponent(to)}?subject=${sub}&body=${body}`;
 }
}
