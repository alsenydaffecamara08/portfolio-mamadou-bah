
import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective
  implements AfterViewInit, OnDestroy {

  private element = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const target = this.element.nativeElement;

    if (typeof window === 'undefined' ||
        typeof IntersectionObserver === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.classList.add('is-visible');
      return;
    }


    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            target.classList.add('is-visible');
            this.observer?.unobserve(target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -25px 0px'
      }
    );

    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
