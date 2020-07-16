import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';

@Component({
  selector: 'style-property',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent {
  @Input() border: Border;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
}
