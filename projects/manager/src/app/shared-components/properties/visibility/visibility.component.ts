import { Component, Input } from '@angular/core';
import { BreakpointVisibility } from '../../../classes/breakpoint';
import { ColumnComponent } from '../../designer/column/column.component';
import { BreakpointService } from '../../../services/breakpoint.service';

@Component({
  selector: 'visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss']
})
export class VisibilityComponent {
  @Input() column: ColumnComponent;
  public breakpointVisibility = BreakpointVisibility;

  constructor(private breakpointService: BreakpointService) { }

  setVisibility() {
    if (this.column.visibility.value == BreakpointVisibility.Visible) {
      this.column.visibility.value = BreakpointVisibility.Hidden;
    } else {
      this.column.visibility.value = BreakpointVisibility.Visible;
    }

    this.breakpointService.addRemoveBreakpoint(this.column.breakpoints, this.column.visibility, this.column.visibility.value);
  }
}