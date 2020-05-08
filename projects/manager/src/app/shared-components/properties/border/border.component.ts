import { Component, Input } from '@angular/core';
import { Border } from '../../../classes/border';

@Component({
  selector: 'border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss']
})
export class BorderComponent {
  @Input() border: Border;
}
