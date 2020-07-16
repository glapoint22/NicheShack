import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Corners } from '../../../classes/corners';

@Component({
  selector: 'corners',
  templateUrl: './corners.component.html',
  styleUrls: ['./corners.component.scss']
})
export class CornersComponent {
  @Input() corners: Corners;
  @Output() onChange: EventEmitter<void> = new EventEmitter();

  onValueChange(corner: string, value: number) {
    // If the corners are constrained, set the value for each corner
    if (this.corners.constrain) {
      this.corners.topLeft = value;
      this.corners.topRight = value;
      this.corners.bottomRight = value;
      this.corners.bottomLeft = value;
    } else {
      // Set the value for the passed in corner
      this.corners[corner] = value;
    }

    this.onChange.emit();
  }
}