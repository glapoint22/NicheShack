import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'corners',
  templateUrl: './corners.component.html',
  styleUrls: ['./corners.component.scss']
})
export class CornersComponent {
  constructor(public _FormService: FormService) {}

  onCheckboxChange() {

    if(!this._FormService.corners.constrainCorners) {
      this._FormService.corners.topLeft = 0;
      this._FormService.corners.topRight = 0;
      this._FormService.corners.bottomRight = 0;
      this._FormService.corners.bottomLeft = 0;
    }

    this._FormService.corners.constrainCorners = !this._FormService.corners.constrainCorners


  }
}
