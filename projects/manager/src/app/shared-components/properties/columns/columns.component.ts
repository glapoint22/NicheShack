import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ColumnComponent } from '../../designer/column/column.component';
import { NumberFieldComponent } from '../../elements/number-fields/number-field/number-field.component';
import { ColumnSpan } from '../../../classes/column-span';
import { Column } from '../../../classes/column';
import { BreakpointService } from '../../../services/breakpoint.service';
import { Breakpoint } from 'projects/manager/src/app/classes/breakpoint';
import { BreakpointType } from 'classes/breakpoint-type';


@Component({
  selector: 'columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  @Input() column: ColumnComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public columns: Array<number> = new Array<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);


  constructor(public breakpointService: BreakpointService) { }


  ngOnInit() {
    this.breakpointService.isBreakpointSet(this.column.breakpoints, this.column.columnSpan);

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.isBreakpointSet(this.column.breakpoints, this.column.columnSpan);
    });
  }


  // ------------------------------------------------------------ On Value Change ----------------------------------------------------------
  onValueChange(value: number, numberField: NumberFieldComponent) {
    let index: number = this.column.row.columns.findIndex(x => x.component == this.column);
    let maxColumnSpan: number = this.column.row.columns.length == 5 ? 10 : 12;
    value = Math.min(value, maxColumnSpan);
    let delta: number = value - this.column.columnSpan.value;


    // If this row only has one column
    if (this.column.row.columns.length == 1) {
      numberField.value = 12;
      numberField.currentIndex = 11;
      return;
    }


    // We are increasing the column span
    if (delta == 1) {
      // Get the last column that is not at max column span
      let lastColumn: ColumnComponent = this.getLastColumn(maxColumnSpan);


      // If the last column is NOT the current column we are on
      if (lastColumn != this.column) {

        // If the last column does not have a column span of one
        if (lastColumn.columnSpan.value != 1) {
          lastColumn.columnSpan.value -= 1;

          // The last column has a column span of one so we assign it the max column span
        } else {
          lastColumn.columnSpan.value = maxColumnSpan;
        }


        // The last column is the current column we're on
      } else {

        // Get the first column that does not have a column span of one
        let firstColumn: ColumnComponent = this.getFirstColumn();

        // If the first column is NOT the current column we are on
        if (firstColumn != this.column) {
          firstColumn.columnSpan.value -= 1;

          // The first column is the current column we are on
          // We can't increase the value, so we reset the properties of the number field
        } else {
          numberField.value -= 1;
          numberField.currentIndex -= 1
          return;
        }
      }



      // We are decreasing the column span
    } else if (delta == -1) {

      // If we are not on the first column and the column span is at max
      // We can't decrease the value, so we reset the properties of the number field
      if (index != 0 && this.column.columnSpan.value == maxColumnSpan) {
        numberField.value = maxColumnSpan;
        numberField.currentIndex = maxColumnSpan - 1;
        return;
      }


      // If we are on the last column, increase the column span of the previous column
      if (index == this.column.row.columns.length - 1) {
        this.column.row.columns[index - 1].component.columnSpan.value += 1;

        // We are not on the last column
      } else {
        // Get the next column span that needs to be updated
        let nextColumnSpan: ColumnSpan = this.getNextColumnSpan(index, maxColumnSpan);
        let newValue = nextColumnSpan.value == maxColumnSpan ? 1 : nextColumnSpan.value + 1;

        // Update the column span
        nextColumnSpan.value = newValue;
      }
    }



    // This will set this column's column span value, the number field value, and the number field's current index
    numberField.currentIndex = (numberField.value = this.column.columnSpan.value = value) - 1;


    // If there are any breakpoints set at this screen size, remove them
    if (this.column.columnSpan.breakpointSet) {
      this.column.row.columns.forEach((column: Column) => {
        this.breakpointService.removeBreakpointAtCurrentScreenSize(column.component.breakpoints, column.component.columnSpan);
      });

      // Add a new breakpoint
      this.addBreakpoint();
    }

    this.onChange.emit();
  }









  // -------------------------------------------------------- Get Next Column Span ----------------------------------------------------------
  getNextColumnSpan(index: number, maxColumnSpan: number): ColumnSpan {
    let nextColumnSpan: ColumnSpan;
    // This is the starting column span value for each column
    let startingColumnSpan = maxColumnSpan / this.column.row.columns.length;

    // Search back from the current column for a column that does not have the starting column span
    for (let i = index - 1; i > -1; i--) {
      if (this.column.row.columns[i].component.columnSpan.value != startingColumnSpan) {
        nextColumnSpan = this.column.row.columns[i].component.columnSpan;
        break;
      }
    }

    // If a column was not found
    if (!nextColumnSpan) {

      // Search forward from the current column for a column that does not have the starting column span
      for (let i = index + 1; i < this.column.row.columns.length; i++) {
        if (this.column.row.columns[i].component.columnSpan.value != startingColumnSpan) {
          nextColumnSpan = this.column.row.columns[i].component.columnSpan;
          break;
        }
      }
    }


    // If we still haven't found a column, use the last column in the row
    if (!nextColumnSpan) nextColumnSpan = this.column.row.columns[this.column.row.columns.length - 1].component.columnSpan;

    return nextColumnSpan;
  }







  // ----------------------------------------------------------- Get Last Column -----------------------------------------------------------------
  getLastColumn(maxColumnSpan: number): ColumnComponent {
    // This will return the last column that does not have a max column span value
    for (let i = this.column.row.columns.length - 1; i > -1; i--) {
      let currentColumn: ColumnComponent = this.column.row.columns[i].component;

      if (currentColumn.columnSpan.value != maxColumnSpan) return currentColumn;
    }
  }









  // ---------------------------------------------------------- Get First Column ------------------------------------------------------------------
  getFirstColumn(): ColumnComponent {
    // This will return the first column that does not have a column span of one
    for (let i = 0; i < this.column.row.columns.length; i++) {
      let currentColumn: ColumnComponent = this.column.row.columns[i].component;

      if (currentColumn.columnSpan.value != 1) return currentColumn;
    }
  }




  // ----------------------------------------------------------Set Breakpoint ----------------------------------------------------------------------
  setBreakpoint() {
    if (this.column.columnSpan.breakpointSet) {
      this.removeBreakpoint();

    } else {
      this.addBreakpoint();
    }

    this.onChange.emit();
  }









  // ----------------------------------------------------------Add Breakpoint ----------------------------------------------------------------------
  addBreakpoint() {
    this.column.row.columns.forEach((column: Column) => {
      this.breakpointService.addBreakpoint(column.component.breakpoints, column.component.columnSpan, BreakpointType.ColumnSpan, column.component.columnSpan.value, this.breakpointService.currentBreakpointScreenSize);
      column.component.columnSpan.breakpointSet = true;
    });
  }









  // ----------------------------------------------------------Remove Breakpoint --------------------------------------------------------------------
  removeBreakpoint() {
    this.column.row.columns.forEach((column: Column) => {
      let breakpoint: Breakpoint = this.breakpointService.getBreakpoint(column.component.breakpoints, column.component.columnSpan);
      this.breakpointService.removeBreakpoint(column.component.breakpoints, breakpoint);
      column.component.columnSpan.breakpointSet = false;
    });
  }
}