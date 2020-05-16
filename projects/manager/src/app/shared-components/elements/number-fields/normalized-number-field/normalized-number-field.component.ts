import { Component } from '@angular/core';
import { EditableNumberFieldComponent } from '../editable-number-field/editable-number-field.component';

@Component({
  selector: 'normalized-number-field',
  templateUrl: './normalized-number-field.component.html',
  styleUrls: ['../number-field/number-field.component.scss', './normalized-number-field.component.scss']
})
export class NormalizedNumberFieldComponent extends EditableNumberFieldComponent{
  
  onInput(event) {
    let input = event.target;

    // Only accept numeric values
    !(/^[0-9], .+$/ig).test(input.value) ? input.value = input.value.replace(/[^0-9], .+$/ig, '') : null;
  }




  parseValue(value: string) {
    return parseFloat(value);
  }









  updateValue(delta: number) {
    let normalizedDelta = (delta / 100);
    let currentValue = this.value + normalizedDelta;
    let max = Math.max(currentValue, 0);
    let clampedValue = Math.min(max, 1);
    let roundedValue = Math.round(clampedValue * 100) / 100;
    this.value = roundedValue;

    // Emit the new value
    this.onValueChange.emit(this.value);
  }
}