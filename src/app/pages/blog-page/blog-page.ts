import {Component,inject} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {BlogComponent} from '../../components/blog/blog';
@Component({selector:'app-blog-page',standalone:true,imports:[BlogComponent],template:`<main id="main"><app-blog [lang]="language.current()"/></main>`})
export class BlogPageComponent{language=inject(LanguageService)}
