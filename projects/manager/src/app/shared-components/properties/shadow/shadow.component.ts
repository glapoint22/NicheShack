import { Component, Input } from '@angular/core';
import { Shadow } from '../../../classes/shadow';

@Component({
  selector: 'shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss']
})
export class ShadowComponent {
  @Input() shadow: Shadow;
}
