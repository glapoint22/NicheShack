import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'line-border',
  templateUrl: './line-border.component.html',
  styleUrls: ['./line-border.component.scss']
})
export class LineBorderComponent {

  constructor(public _FormService: FormService) {}

  onBorderStyleSelect(index: number) {
    // Depending on which border style is selected, update the border style accordingly
    if(index == 0) this._FormService.border.style = "solid";
    if(index == 1) this._FormService.border.style = "dotted";
    if(index == 2) this._FormService.border.style = "dashed";
    if(index == 3) this._FormService.border.style = "double";
  }

}
