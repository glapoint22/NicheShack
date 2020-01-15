import { Component} from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss']
})
export class BorderComponent {
  constructor(public _FormService: FormService) {}

  onBorderStyleSelect(index: number) {
    // Depending on which border style is selected, update the border style accordingly
    if(index == 0) this._FormService.border.style = "solid";
    if(index == 1) this._FormService.border.style = "dotted";
    if(index == 2) this._FormService.border.style = "dashed";
    if(index == 3) this._FormService.border.style = "double";
    if(index == 4) this._FormService.border.style = "groove";
    if(index == 5) this._FormService.border.style = "ridge";
    if(index == 6) this._FormService.border.style = "inset";
    if(index == 7) this._FormService.border.style = "outset";
  }
}