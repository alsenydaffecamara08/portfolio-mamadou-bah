import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';
@Directive({selector:'[appMouseGlow]',standalone:true})
export class MouseGlowDirective implements AfterViewInit,OnDestroy {
 private el=inject(ElementRef<HTMLElement>);
 private listener=(ev:PointerEvent)=>{
   if(ev.pointerType==='touch')return;
   const r=this.el.nativeElement.getBoundingClientRect();
   this.el.nativeElement.style.setProperty('--mx',`${ev.clientX-r.left}px`);
   this.el.nativeElement.style.setProperty('--my',`${ev.clientY-r.top}px`);
 };
 ngAfterViewInit(){
   if(typeof window==='undefined'||!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
   this.el.nativeElement.addEventListener('pointermove',this.listener,{passive:true});
 }
 ngOnDestroy(){this.el.nativeElement.removeEventListener('pointermove',this.listener);}
}
