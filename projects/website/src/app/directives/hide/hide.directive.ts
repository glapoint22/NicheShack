import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[hide]'
})
export class HideDirective {
  @Output() onHide: EventEmitter<void> = new EventEmitter();

  constructor(private el: ElementRef) {
    // let interval = window.setInterval(() => {
    //   if (this.el.nativeElement.id != '') {
    //     this.el.nativeElement.focus();
    //     window.clearInterval(interval);
    //   }
    // }, 1);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.onHide.emit();
    }
  }


  @HostListener('mousedown')
  onMousedown() {
    this.onHide.emit();
  }

}
