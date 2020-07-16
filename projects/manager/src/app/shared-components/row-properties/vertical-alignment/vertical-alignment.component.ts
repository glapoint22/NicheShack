import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointVerticalAlignment } from '../../../classes/breakpoint';
import { BreakpointService } from '../../../services/breakpoint.service';
import { RowComponent } from '../../designer/row/row.component';

@Component({
  selector: 'vertical-alignment',
  templateUrl: './vertical-alignment.component.html',
  styleUrls: ['./vertical-alignment.component.scss']
})
export class VerticalAlignmentComponent implements OnInit {
  @Input() row: RowComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public breakpointVerticalAlignment = BreakpointVerticalAlignment;

  constructor(public breakpointService: BreakpointService) { }

  // -------------------------------------------------------------- Ng On Init ----------------------------------------------------------------------
  ngOnInit() {
    this.breakpointService.isBreakpointSet(this.row.breakpoints, this.row.verticalAlignment);

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.isBreakpointSet(this.row.breakpoints, this.row.verticalAlignment);
    });
  }





  // ------------------------------------------------------------------ Set Value --------------------------------------------------------------------------  
  setValue(value: BreakpointVerticalAlignment) {
    this.breakpointService.setBreakpointValue(value, this.row.breakpoints, this.row.verticalAlignment);
    this.onChange.emit();
  }
}