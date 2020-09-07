import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Color } from 'classes/color';

@Component({
  selector: 'button-color',
  templateUrl: './button-color.component.html',
  styleUrls: ['./button-color.component.scss']
})
export class ButtonColorComponent {
  @Input() backgroundColor: Color;
  @Input() borderColor: Color;
  @Input() textColor: Color;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
}