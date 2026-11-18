import { Component, OnInit, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PortfolioStory, SanityService } from '../../services/sanity.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({selector:'app-stories',standalone:true,imports:[RevealDirective],templateUrl:'./stories.html',styleUrl:'./stories.css'})
export class StoriesComponent implements OnInit {
  readonly language = inject(LanguageService);
  private readonly cms = inject(SanityService);
  readonly testimonials = signal<PortfolioStory[]>([]);
  readonly photos = signal<PortfolioStory[]>([]);
  async ngOnInit() {
    const [reviews, photos] = await Promise.allSettled([
      this.cms.getStories('testimonial'), this.cms.getStories('journeyPhoto')
    ]);
    if (reviews.status === 'fulfilled') this.testimonials.set(reviews.value);
    else console.error('Testimonials:', reviews.reason);
    if (photos.status === 'fulfilled') this.photos.set(photos.value.filter(p => !!p.imageUrl));
    else console.error('Journey photos:', photos.reason);
  }
}
