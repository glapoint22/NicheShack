import { Component, Input } from '@angular/core';
import { BreakpointHorizontalAlignment } from '../../../classes/breakpoint';
import { WidgetComponent } from '../../designer/widgets/widget/widget.component';
import { BreakpointService } from '../../../services/breakpoint.service';

@Component({
  selector: 'horizontal-alignment',
  templateUrl: './horizontal-alignment.component.html',
  styleUrls: ['./horizontal-alignment.component.scss']
})
export class HorizontalAlignmentComponent {
  @Input() widget: WidgetComponent;
  public breakpointHorizontalAlignment = BreakpointHorizontalAlignment;

  constructor(public breakpointService: BreakpointService) {}

  // -------------------------------------------------------------- Ng On Init ----------------------------------------------------------------------
  ngOnInit() {
    this.breakpointService.isBreakpointSet(this.widget.breakpoints, this.widget.horizontalAlignment);

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.isBreakpointSet(this.widget.breakpoints, this.widget.horizontalAlignment);
    });
  }

 




  // --------------------------------------------------------------- Set Value --------------------------------------------------------------------------  
  setValue(value: BreakpointHorizontalAlignment) {
    this.breakpointService.setBreakpointValue(value, this.widget.breakpoints, this.widget.horizontalAlignment);
  }
}