import { Component, Input } from '@angular/core';
import { VerticalAlignment } from '../../../classes/vertical-alignment';
import { BreakpointVerticalAlignment } from '../../../classes/breakpoint';

@Component({
  selector: 'vertical-alignment',
  templateUrl: './vertical-alignment.component.html',
  styleUrls: ['./vertical-alignment.component.scss']
})
export class VerticalAlignmentComponent {
  @Input() verticalAlignment: VerticalAlignment;
  public breakpointVerticalAlignment = BreakpointVerticalAlignment;
}