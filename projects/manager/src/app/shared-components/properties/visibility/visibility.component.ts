import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnComponent } from '../../designer/column/column.component';
import { BreakpointService } from '../../../services/breakpoint.service';
import { Visibility } from 'classes/visibility';
import { BreakpointType } from 'classes/breakpoint-type';
import { Breakpoint } from '../../../classes/breakpoint';
import { BreakpointObject } from '../../../classes/breakpoint-object';

@Component({
  selector: 'visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss']
})
export class VisibilityComponent {
  @Input() column: ColumnComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public visibility = Visibility;

  constructor(private breakpointService: BreakpointService) { }

  setVisibility() {
    if (this.column.display.value == Visibility.Visible) {
      this.column.display.value = Visibility.Hidden;
    } else {
      this.column.display.value = Visibility.Visible;
    }

    this.addRemoveBreakpoints(this.column.breakpoints, this.column.display, BreakpointType.Visibility, this.column.display.value);

    this.onChange.emit();
  }



  // --------------------------------------------------------- Add Remove Breakpoints --------------------------------------------------------------------
  addRemoveBreakpoints(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject, breakpointType: BreakpointType, value: any) {
    let breakpoint: Breakpoint = breakpoints.find(x => x.breakpointObject == breakpointObject && x.screenSize == this.breakpointService.currentBreakpointScreenSize);

    if (breakpoint) {
      this.breakpointService.removeAllBreakpoints(breakpoints, breakpointObject);
    } else {
      this.breakpointService.addBreakpoint(breakpoints, breakpointObject, breakpointType, value, this.breakpointService.currentBreakpointScreenSize);
    }
  }
}