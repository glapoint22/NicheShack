import { Component, Input } from '@angular/core';
import { FillColor } from '../../../classes/fill-color';

@Component({
  selector: 'fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.scss']
})
export class FillComponent {
  @Input() fill: FillColor;
}
