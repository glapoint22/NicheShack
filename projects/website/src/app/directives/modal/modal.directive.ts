import { Directive, Input, OnChanges, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[modal]'
})
export class ModalDirective implements OnChanges {
  @Input() showModal: boolean;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Set the default property values
    this.setDefault();
  }

  ngOnChanges(): void {
    if (this.showModal) {
      // Display the modal background
      this.el.nativeElement.style.setProperty('background', 'rgba(0, 0, 0, 0.8)');
      this.el.nativeElement.style.setProperty('right', '0');
      this.el.nativeElement.style.setProperty('bottom', '0');
    }
  }

  @HostListener('transitionend', ['$event']) onTransitionend(event: TransitionEvent) {
    if (!this.showModal && event.propertyName == 'opacity') {
      // When opacity reaches 0, set the default property values
      this.setDefault();
    }
  }


  setDefault() {
    // This is the default property values. Basically hiding the modal
    this.el.nativeElement.style.setProperty('background', 'none');
    this.el.nativeElement.style.setProperty('right', 'initial');
    this.el.nativeElement.style.setProperty('bottom', 'initial');
  }
}