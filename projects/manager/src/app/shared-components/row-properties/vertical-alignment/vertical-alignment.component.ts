import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { RowComponent } from '../../designer/row/row.component';
import { VerticalAlign } from 'classes/vertical-align';
import { BreakpointType } from 'classes/breakpoint-type';

@Component({
  selector: 'vertical-alignment',
  templateUrl: './vertical-alignment.component.html',
  styleUrls: ['./vertical-alignment.component.scss']
})
export class VerticalAlignmentComponent implements OnInit {
  @Input() row: RowComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public verticalAlign = VerticalAlign;
  public breakpointType = BreakpointType;

  constructor(public breakpointService: BreakpointService) { }

  // -------------------------------------------------------------- Ng On Init ----------------------------------------------------------------------
  ngOnInit() {
    this.breakpointService.isBreakpointSet(this.row.breakpoints, this.row.verticalAlignment);

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.isBreakpointSet(this.row.breakpoints, this.row.verticalAlignment);
    });
  }





  // ------------------------------------------------------------------ Set Value --------------------------------------------------------------------------  
  setValue(value: VerticalAlign) {
    this.breakpointService.setBreakpointValue(value, this.row.breakpoints, this.row.verticalAlignment, BreakpointType.VerticalAlignment);
    this.onChange.emit();
  }
}