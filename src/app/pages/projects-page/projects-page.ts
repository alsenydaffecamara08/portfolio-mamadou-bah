import {Component,inject} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {ProjectsComponent} from '../../components/projects/projects';
@Component({selector:'app-projects-page',standalone:true,imports:[ProjectsComponent],template:`<main id="main"><app-projects [lang]="language.current()"/></main>`})
export class ProjectsPageComponent{language=inject(LanguageService)}
