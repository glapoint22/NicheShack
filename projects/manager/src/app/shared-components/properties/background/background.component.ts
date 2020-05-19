import { Component, Input } from '@angular/core';
import { Background } from '../../../classes/background';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {
  @Input() background: Background;
}
