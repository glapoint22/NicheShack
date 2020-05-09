import { Component, Input } from '@angular/core';
import { HorizontalAlignment } from '../../../classes/horizontal-alignment';
import { BreakpointHorizontalAlignment } from '../../../classes/breakpoint';

@Component({
  selector: 'horizontal-alignment',
  templateUrl: './horizontal-alignment.component.html',
  styleUrls: ['./horizontal-alignment.component.scss']
})
export class HorizontalAlignmentComponent {
  @Input() horizontalAlignment: HorizontalAlignment;
  public breakpointHorizontalAlignment = BreakpointHorizontalAlignment;
}