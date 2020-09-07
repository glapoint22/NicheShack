import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WidgetComponent } from '../../designer/widgets/widget/widget.component';
import { BreakpointService } from '../../../services/breakpoint.service';
import { HorizontalAlign } from 'classes/horizontal-align';

@Component({
  selector: 'horizontal-alignment',
  templateUrl: './horizontal-alignment.component.html',
  styleUrls: ['./horizontal-alignment.component.scss']
})
export class HorizontalAlignmentComponent {
  @Input() widget: WidgetComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public horizontalAlign = HorizontalAlign;

  constructor(public breakpointService: BreakpointService) {}

  // -------------------------------------------------------------- Ng On Init ----------------------------------------------------------------------
  ngOnInit() {
    this.breakpointService.isBreakpointSet(this.widget.breakpoints, this.widget.horizontalAlignment);

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.isBreakpointSet(this.widget.breakpoints, this.widget.horizontalAlignment);
    });
  }

 




  // --------------------------------------------------------------- Set Value --------------------------------------------------------------------------  
  setValue(value: HorizontalAlign) {
    this.breakpointService.setBreakpointValue(value, this.widget.breakpoints, this.widget.horizontalAlignment);
    this.onChange.emit();
  }
}