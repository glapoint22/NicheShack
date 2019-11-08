import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent implements OnChanges {
  @Input() items: Array<KeyValue<string, string>>;
  @Input() defaultIndex: number = 0;
  @Output() itemClick: EventEmitter<KeyValue<string, string>> = new EventEmitter();
  public caption: string;
  public show: boolean;
  private isMouseDown: boolean;

  ngOnChanges(): void {
    if(this.items.length > 0) {
      this.caption = this.items[this.defaultIndex].value;
    }
  }

  onItemClick(item: KeyValue<string, string>) {
    this.itemClick.emit(item);
    this.caption = item.value;
    this.show = false;
  }

  onClick() {
    // Don't show the element if there was a mousedown event
    // This prevents the element from showing when the button is clicked again
    if (this.isMouseDown) {
      this.show = false;
      this.isMouseDown = false;
      return;
    }

    // show the element
    this.show = true;
  }

  onMousedown() {
    if (this.show) {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }
  }

}