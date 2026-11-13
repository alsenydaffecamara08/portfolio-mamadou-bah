
import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject
} from '@angular/core';

@Directive({
  selector: '[appScrollProgress]',
  standalone: true
})
export class ScrollProgressDirective
  implements AfterViewInit, OnDestroy {

  private el = inject(ElementRef<HTMLElement>);
  private frame = 0;

  private update = () => {
    if (this.frame) return;

    this.frame = requestAnimationFrame(() => {
      const doc = document.documentElement;

      const scrollable =
        doc.scrollHeight - window.innerHeight;

      const progress = scrollable > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollable))
        : 0;

      this.el.nativeElement.style.transform =
        `scaleX(${progress})`;

      this.frame = 0;
    });
  };

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', this.update, {
      passive: true
    });

    window.addEventListener('resize', this.update);
    this.update();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;

    window.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update);

    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
