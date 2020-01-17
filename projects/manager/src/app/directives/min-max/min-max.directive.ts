import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[minMax]'
})
export class MinMaxDirective {
  @Input()
  min: number;
  @Input()
  max: number;
  @Output() 
  minMaxOut: EventEmitter<number> = new EventEmitter();

  constructor(el: ElementRef) {

    // On key down
    el.nativeElement.addEventListener("keydown", (e)=> {

      // Arrow UP
      if(e.keyCode === 38) {
        el.nativeElement.value++;
        if(this.max != null) el.nativeElement.value = Math.min(this.max, el.nativeElement.value)
        this.minMaxOut.emit(el.nativeElement.value)
      }

      // Arrow Down
      if(e.keyCode === 40) {
        el.nativeElement.value--;
        el.nativeElement.value = Math.max(this.min, el.nativeElement.value)
        this.minMaxOut.emit(el.nativeElement.value)
      }
    });
  }
}