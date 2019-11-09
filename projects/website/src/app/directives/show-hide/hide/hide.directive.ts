import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[hide]'
})
export class HideDirective {
  @Output() onHide: EventEmitter<void> = new EventEmitter();

  constructor() {}

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
