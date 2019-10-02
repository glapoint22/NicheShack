import { Component } from '@angular/core';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent {
  private isMouseDown: boolean;


  onClick(dropdown: HTMLElement) {
    if(this.isMouseDown) {
      this.isMouseDown = false;
      return;
    }

    dropdown.focus();
    dropdown.style.setProperty('max-height', '200px');
  }

  onKeydown(event: KeyboardEvent, dropdown: HTMLElement) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      dropdown.style.setProperty('max-height', '0');
      dropdown.blur();
    }

  }

  onBlur(dropdown: HTMLElement) {
    dropdown.style.setProperty('max-height', '0');
  }

  onMousedown(dropdown: HTMLElement) {
    if(dropdown.style.getPropertyValue('max-height') != '0px' && dropdown.style.getPropertyValue('max-height') != "")
    this.isMouseDown = true;
  }
}