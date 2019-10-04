import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent implements OnChanges {
  @Input() items: Array<KeyValue<string, string>>;
  @Output() itemClick: EventEmitter<KeyValue<string, string>> = new EventEmitter();
  public isMouseDown: boolean;
  public showDropdown: boolean;
  public caption: string;

  ngOnChanges(): void {
    if(this.items.length > 0) {
      this.caption = this.items[0].value;
    }
  }


  onClick(dropdown: HTMLElement) {
    // Don't show the dropdown if there was a mousedown event
    // This prevents the dropdown from showing when the button is clicked again
    if (this.isMouseDown) {
      this.isMouseDown = false;
      return;
    }

    // show the dropdown and set the focus
    this.showDropdown = true;
    dropdown.focus();
  }

  onKeydown(event: KeyboardEvent, dropdown: HTMLElement) {
    // If escape is pressed, hide the dropdown
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.showDropdown = false;
      dropdown.blur();
    }
  }

  onItemClick(item: KeyValue<string, string>) {
    this.itemClick.emit(item);
    this.caption = item.value;
    this.showDropdown = false;
  }
}