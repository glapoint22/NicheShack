import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Border } from '../../../classes/border';

@Component({
  selector: 'border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss']
})
export class BorderComponent {
  @Input() border: Border;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
}
