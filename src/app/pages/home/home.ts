import { StoriesComponent } from '../../components/stories/stories';
import {Component,OnInit,inject,signal} from '@angular/core';
import {SanityService,PortfolioProfile} from '../../services/sanity.service';
import {LanguageService} from '../../services/language.service';
import {SkillsComponent} from '../../components/skills/skills';
import {ProjectsComponent} from '../../components/projects/projects';
import {CareerComponent} from '../../components/career/career';
import {ServicesComponent} from '../../components/services/services';
import {BlogComponent} from '../../components/blog/blog';
import {ContactComponent} from '../../components/contact/contact';
import {RevealDirective} from '../../directives/reveal.directive';
import {MouseGlowDirective} from '../../directives/mouse-glow.directive';
@Component({selector:'app-home',standalone:true,imports:[StoriesComponent,SkillsComponent,ProjectsComponent,CareerComponent,ServicesComponent,BlogComponent,ContactComponent,RevealDirective,MouseGlowDirective],templateUrl:'./home.html',styleUrl:'./home.css'})
export class HomeComponent implements OnInit {
 language=inject(LanguageService);private cms=inject(SanityService);
 profile=signal<PortfolioProfile|null>(null);loading=signal(true);error=signal(false);
 async ngOnInit(){try{this.profile.set(await this.cms.getProfile())}catch(err){console.error(err);this.error.set(true)}finally{this.loading.set(false)}}
 title(){return this.language.text(this.profile()?.jobTitleFr,this.profile()?.jobTitleEn);}
 bio(){return this.language.text(this.profile()?.biographyFr,this.profile()?.biographyEn);}
}
