import { Component, Input } from '@angular/core';
import { Color } from '../../../classes/color';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  @Input() color: Color;
  @Input() caption: string;
}