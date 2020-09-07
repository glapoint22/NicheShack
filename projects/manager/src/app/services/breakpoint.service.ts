import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObject } from '../classes/breakpoint-object';
import { BreakpointsComponent } from '../classes/breakpoints-component';
import { BreakpointScreenSize, Breakpoint, BreakpointType } from '../classes/breakpoint';
import { BreakpointData } from '../classes/breakpoint-data';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public onCanvasWidthChange = new Subject<number>();
  public onBreakpointChange = new Subject<void>();
  public currentBreakpointScreenSize: string = BreakpointScreenSize.HD;


  constructor() {
    // When the canvas has a width change, test to see if we are at a new breakpoint
    this.onCanvasWidthChange.subscribe((width: number) => {
      for (let item in BreakpointScreenSize) {
        let minSize: number = parseInt(BreakpointScreenSize[item]);
        let maxSize = this.getNextBreakpointScreenSize(BreakpointScreenSize[item]);

        // Test to see if the width falls between a new breakpoint
        if (width >= minSize && width < maxSize && this.currentBreakpointScreenSize != BreakpointScreenSize[item]) {
          this.currentBreakpointScreenSize = BreakpointScreenSize[item];
          this.onBreakpointChange.next();
          break;
        }
      }
    });
  }




  // --------------------------------------------------------- Set Breakpoint Values ----------------------------------------------------------------------
  setBreakpointValues(breakpoints: Array<Breakpoint>) {
    breakpoints.forEach(x => x.breakpointObject.value = x.breakpointObject.defaultValue);

    // Filter the breakpoints based on screen size
    let filteredBreakpoints = breakpoints.filter((x) => parseInt(this.currentBreakpointScreenSize) >= parseInt(x.screenSize))
      .filter((v, i, a) => a.map(x => x.breakpointObject).indexOf(v.breakpointObject) == i);

    // Set the values
    filteredBreakpoints.forEach((breakpoint: Breakpoint) => {
      breakpoint.breakpointObject.value = breakpoint.value;
    });
  }








  // ----------------------------------------------------------- Add Breakpoint ----------------------------------------------------------------------
  addBreakpoint(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject, value: any, screenSize: string) {
    // Add a new breakpoint to the passed in breakpoints array
    breakpoints.push(new Breakpoint(breakpointObject, screenSize, value));

    // Sort the breakpoints based on screeen size
    this.sortBreakpoints(breakpoints);
  }






  // --------------------------------------------------------- Remove Breakpoint ----------------------------------------------------------------------
  removeBreakpoint(breakpoints: Array<Breakpoint>, breakpoint: Breakpoint) {
    // Remove the breakpoint from the breakpoints array
    breakpoints.splice(breakpoints.findIndex(x => x == breakpoint), 1);
  }









  // ---------------------------------------------- Remove Breakpoint At Current Screen Size -------------------------------------------------------------
  removeBreakpointAtCurrentScreenSize(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    let breakpoint: Breakpoint = breakpoints.find(x => x.breakpointObject == breakpointObject && x.screenSize == this.currentBreakpointScreenSize);

    if (breakpoint) this.removeBreakpoint(breakpoints, breakpoint);
  }









  // ----------------------------------------------------------- Get Breakpoint ----------------------------------------------------------------------
  getBreakpoint(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    return breakpoints.find(x => x.breakpointObject == breakpointObject && parseInt(x.screenSize) <= parseInt(this.currentBreakpointScreenSize));
  }








  // -------------------------------------------------------- Remove All Breakpoints -------------------------------------------------------------------
  removeAllBreakpoints(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    breakpoints.forEach((breakpoint: Breakpoint, index: number) => {
      if (breakpoint.breakpointObject == breakpointObject) {
        breakpoints.splice(index, 1);
      }
    });
  }







  // --------------------------------------------------------- Add Remove Breakpoints --------------------------------------------------------------------
  addRemoveBreakpoint(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject, value: any) {
    let breakpoint: Breakpoint = breakpoints.find(x => x.breakpointObject == breakpointObject && x.screenSize == this.currentBreakpointScreenSize);

    if (breakpoint) {
      this.removeBreakpoint(breakpoints, breakpoint);
    } else {
      this.addBreakpoint(breakpoints, breakpointObject, value, this.currentBreakpointScreenSize);
    }
  }







  // -------------------------------------------------------- Remove All Breakpoints -------------------------------------------------------------------
  isBreakpointSet(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    breakpointObject.breakpointSet = breakpoints.some(x => x.breakpointObject == breakpointObject && parseInt(this.currentBreakpointScreenSize) >= parseInt(x.screenSize));
  }








  // ------------------------------------------------------ Set Breakpoint Classes ---------------------------------------------------------------------
  setBreakpointClasses(breakpointsComponent: BreakpointsComponent, element: HTMLElement) {
    let properties = Object.keys(breakpointsComponent);

    properties.forEach((property: string) => {
      // If the type of property is a BreakpointType
      if (breakpointsComponent[property] && typeof (breakpointsComponent[property]) == 'object' && 'setClass' in breakpointsComponent[property]) {


        // If the current property has breakpoints applied to it
        if (breakpointsComponent.breakpoints.find(x => x.breakpointObject == breakpointsComponent[property])) {

          // Get all breakpoints of this type
          let breakpoints = breakpointsComponent.breakpoints.filter(x => x.breakpointObject == breakpointsComponent[property]);

          // Set the class for each breakpoint
          breakpoints.forEach((breakpoint: Breakpoint) => {
            breakpoint.breakpointObject.setClass(breakpoint.value, element, this.getScreenSizeKey(breakpoint.screenSize));
          });

          // No breakpoints have been set to this property
        } else {

          // Set the class only if the property value is not the default value
          if (breakpointsComponent[property].value != breakpointsComponent[property].defaultValue) {
            breakpointsComponent[property].setClass(breakpointsComponent[property].value, element);
          }
        }
      }
    });
  }






  // --------------------------------------------------- Get Next Breakpoint ScreenSize -------------------------------------------------------------------
  private getNextBreakpointScreenSize(screenSize: string): number {
    let nextScreenSize: number;

    // This is the index of the next breakpoint screen size
    let index: number = Object.values(BreakpointScreenSize).findIndex(x => x == screenSize) + 1;

    // If this is the last screen size in the list
    if (index == Object.keys(BreakpointScreenSize).length) {
      nextScreenSize = Infinity;

      // Assign the next screen size in the list
    } else {
      nextScreenSize = parseInt(Object.values(BreakpointScreenSize)[index]);
    }

    return nextScreenSize;
  }










  // ---------------------------------------------------------- Sort Breakpoints -------------------------------------------------------------------
  private sortBreakpoints(breakpoints: Array<Breakpoint>) {
    breakpoints.sort((a, b) => {
      if (parseInt(a.screenSize) < parseInt(b.screenSize)) return 1;
      return -1;
    });
  }








  // ---------------------------------------------------------- Get Screen Size Key -------------------------------------------------------------------
  private getScreenSizeKey(screenSize: string) {
    // This will return the key based on the screenSize value (eg. MD)
    return Object.keys(BreakpointScreenSize).filter(x => BreakpointScreenSize[x] == screenSize)[0].toLowerCase();
  }








  // ------------------------------------------------------------ Toggle Breakpoint -------------------------------------------------------------------
  toggleBreakpoint(breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    // If there is a breakpoint set for this breakpoint type
    if (breakpointObject.breakpointSet) {
      let breakpoint: Breakpoint = this.getBreakpoint(breakpoints, breakpointObject);

      // Remove the breakpoint
      this.removeBreakpoint(breakpoints, breakpoint);
      breakpointObject.breakpointSet = false;

    } else {
      // Add the breakpoint
      this.addBreakpoint(breakpoints, breakpointObject, breakpointObject.value, this.currentBreakpointScreenSize);
      breakpointObject.breakpointSet = true;
    }
  }







  // ------------------------------------------------------------- Set Breakpoint Value --------------------------------------------------------------------
  setBreakpointValue(value: any, breakpoints: Array<Breakpoint>, breakpointObject: BreakpointObject) {
    // Set the value for this breakpoint type
    breakpointObject.value = value;

    // If there is a breakpoint set at this screen size, remove it
    if (breakpointObject.breakpointSet) {
      this.removeBreakpointAtCurrentScreenSize(breakpoints, breakpointObject);

      // Add a new breakpoint
      this.addBreakpoint(breakpoints, breakpointObject, breakpointObject.value, this.currentBreakpointScreenSize);
    }
  }






  // -------------------------------------------------------------- Load Breakpoints ----------------------------------------------------------------------
  loadBreakpoints(breakpoints: Array<BreakpointData>, breakpointsComponent: BreakpointsComponent) {
    if (breakpoints) {
      breakpoints.forEach((breakpoint: BreakpointData) => {
        this.addBreakpoint(breakpointsComponent.breakpoints, this.getBreakpointObject(breakpoint.breakpointType, breakpointsComponent), breakpoint.value, breakpoint.screenSize);
      });
    }
  }






  // -------------------------------------------------------------- Save Breakpoints ----------------------------------------------------------------------
  saveBreakpoints(breakpoints: Array<Breakpoint>, breakpointsData: Array<BreakpointData>, breakpointObject: BreakpointObject) {
    breakpoints.forEach((breakpoint: Breakpoint) => {
      if (breakpoint.breakpointObject == breakpointObject) {
        breakpointsData.push({
          breakpointType: breakpoint.breakpointObject.breakpointType,
          screenSize: breakpoint.screenSize,
          value: breakpoint.value
        });
      }
    });
  }







  // ------------------------------------------------------------- Get Breakpoint Object -------------------------------------------------------------------
  getBreakpointObject(breakpointType: BreakpointType, breakpointsComponent: BreakpointsComponent) {
    let breakpointObject: BreakpointObject;

    switch (breakpointType) {
      case BreakpointType.PaddingTop:
        breakpointObject = breakpointsComponent.padding.top;
        break;

      case BreakpointType.PaddingRight:
        breakpointObject = breakpointsComponent.padding.right;
        break;

      case BreakpointType.PaddingBottom:
        breakpointObject = breakpointsComponent.padding.bottom;
        break;

      case BreakpointType.PaddingLeft:
        breakpointObject = breakpointsComponent.padding.left;
        break;

      case BreakpointType.HorizontalAlignment:
        breakpointObject = breakpointsComponent.horizontalAlignment;
        break;

      case BreakpointType.VerticalAlignment:
        breakpointObject = breakpointsComponent.verticalAlignment;
        break;

      case BreakpointType.ColumnSpan:
        breakpointObject = breakpointsComponent.columnSpan;
        break;
    }

    return breakpointObject;
  }
}