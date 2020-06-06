import { Component, Input } from '@angular/core';
import { RowComponent } from '../../designer/row/row.component';
import { EditableNumberFieldComponent } from '../../elements/number-fields/editable-number-field/editable-number-field.component';

@Component({
  selector: 'position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent {
  @Input() row: RowComponent;
  private position: number;

  getPosition() {
    // Get the current position
    this.position = this.row.getPosition();
      
    return Math.round(this.position);
  }

  setPosition(value: number, numberField: EditableNumberFieldComponent) {
    // Get the initial delta and then the new delta when the row is positioned
    let delta = value - this.position;
    let newDelta =  this.row.setPosition(delta);

    // Set the value for the number field
    numberField.value = Math.round(this.position - newDelta);

    // Position the next row
    this.row.positionNextRow(newDelta);
  }
}