import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
if (typeof window !== 'undefined') {
  const glassMotion = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
  );

  let frame = 0;

  document.addEventListener('pointermove', (event: PointerEvent) => {
    if (!glassMotion.matches || event.pointerType !== 'mouse') return;
    if (!(event.target instanceof Element)) return;

    const card = event.target.closest<HTMLElement>('.glass-edge');
    if (!card) return;

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--glass-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--glass-y', `${event.clientY - bounds.top}px`);
    });
  }, { passive: true });
}