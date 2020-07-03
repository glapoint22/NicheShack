import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnChanges {
  @Output() onValueChange: EventEmitter<number> = new EventEmitter();
  @Input() value: number;
  @Input() values: Array<number>;
  public currentIndex: number;
  public inEditMode: boolean;


  ngOnChanges() {
    // Get the defualt index
    this.currentIndex = this.values.findIndex(x => x == this.value);
  }

  onMousedown(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();

  }


  updateValue(delta: number) {
    // Get the current index based on the delta
    this.currentIndex = Math.min(Math.max(0, this.currentIndex + delta), this.values.length - 1);

    // Update the value and emit
    this.value = this.values[this.currentIndex];
    this.onValueChange.emit(this.value);
  }

  onInput(event) { }
}