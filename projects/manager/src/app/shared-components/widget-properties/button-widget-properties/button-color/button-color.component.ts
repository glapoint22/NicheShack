import { Component, Input } from '@angular/core';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'button-color',
  templateUrl: './button-color.component.html',
  styleUrls: ['./button-color.component.scss']
})
export class ButtonColorComponent {
  @Input() backgroundColor: Color;
  @Input() borderColor: Color;
  @Input() textColor: Color;
}