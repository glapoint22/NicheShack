import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../../../classes/color';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  @Input() color: Color;
  @Input() caption: string;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
}