import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ShowHideComponent } from '../show-hide/show-hide.component';

@Component({
  selector: 'dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent extends ShowHideComponent implements OnChanges {
  @Input() items: Array<KeyValue<string, string>>;
  @Input() defaultIndex: number = 0;
  @Output() itemClick: EventEmitter<KeyValue<string, string>> = new EventEmitter();
  public caption: string;

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
}