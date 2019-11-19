import { Directive, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[onShow]'
})
export class OnShowDirective implements OnInit {
  @Output() onShow: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.onShow.emit();
  }
}