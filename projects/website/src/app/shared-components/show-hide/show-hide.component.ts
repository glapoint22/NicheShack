import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({ template: '' })
export class ShowHideComponent {
  @ViewChild('showHideElement', { static: false }) showHideElement: ElementRef;
  public show: boolean;
  public isMouseDown: boolean;

  onClick() {
    // Don't show the element if there was a mousedown event
    // This prevents the element from showing when the button is clicked again
    if (this.isMouseDown) {
      this.isMouseDown = false;
      return;
    }

    // show the element and set the focus
    this.show = true;
    this.showHideElement.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent) {
    // If escape is pressed, hide the element
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.show = false;
      this.showHideElement.nativeElement.blur();
    }
  }

  onMousedown() {
    if (this.show) {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }
  }

  onBlur() {
    this.show = false;
  }
}