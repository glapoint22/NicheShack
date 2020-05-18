import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointScreenSize, Breakpoint } from '../classes/breakpoint';
import { BreakpointType } from '../classes/breakpoint-type';
import { BreakpointsComponent } from '../classes/breakpoints-component';

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
    breakpoints.forEach(x => x.type.value = x.type.defaultValue);

    // Filter the breakpoints based on screen size
    let filteredBreakpoints = breakpoints.filter((x) => parseInt(this.currentBreakpointScreenSize) >= parseInt(x.screenSize))
      .filter((v, i, a) => a.map(x => x.type).indexOf(v.type) == i);

    // Set the values
    filteredBreakpoints.forEach((breakpoint: Breakpoint) => {
      breakpoint.type.value = breakpoint.value;
    });
  }








  // ----------------------------------------------------------- Add Breakpoint ----------------------------------------------------------------------
  addBreakpoint(breakpoints: Array<Breakpoint>, type: BreakpointType, value: any) {
    // Add a new breakpoint to the passed in breakpoints array
    breakpoints.push(new Breakpoint(type, this.currentBreakpointScreenSize, value));

    // Sort the breakpoints based on screeen size
    this.sortBreakpoints(breakpoints);
  }






  // --------------------------------------------------------- Remove Breakpoint ----------------------------------------------------------------------
  removeBreakpoint(breakpoints: Array<Breakpoint>, breakpoint: Breakpoint) {
    // Remove the breakpoint from the breakpoints array
    breakpoints.splice(breakpoints.findIndex(x => x == breakpoint), 1);
  }









  // ---------------------------------------------- Remove Breakpoint At Current Screen Size -------------------------------------------------------------
  removeBreakpointAtCurrentScreenSize(breakpoints: Array<Breakpoint>, type: BreakpointType) {
    let breakpoint: Breakpoint = breakpoints.find(x => x.type == type && x.screenSize == this.currentBreakpointScreenSize);

    if (breakpoint) this.removeBreakpoint(breakpoints, breakpoint);
  }







  
  
  // ----------------------------------------------------------- Get Breakpoint ----------------------------------------------------------------------
  getBreakpoint(breakpoints: Array<Breakpoint>, type: BreakpointType) {
    return breakpoints.find(x => x.type == type && parseInt(x.screenSize) <= parseInt(this.currentBreakpointScreenSize));
  }








  // -------------------------------------------------------- Remove All Breakpoints -------------------------------------------------------------------
  removeAllBreakpoints(breakpoints: Array<Breakpoint>, type: BreakpointType) {
    breakpoints.forEach((breakpoint: Breakpoint, index: number) => {
      if (breakpoint.type == type) {
        breakpoints.splice(index, 1);
      }
    });
  }







  // --------------------------------------------------------- Add Remove Breakpoints --------------------------------------------------------------------
  addRemoveBreakpoint(breakpoints: Array<Breakpoint>, type: BreakpointType, value: any) {
    let breakpoint: Breakpoint = breakpoints.find(x => x.type == type && x.screenSize == this.currentBreakpointScreenSize);

    if (breakpoint) {
      this.removeBreakpoint(breakpoints, breakpoint);
    } else {
      this.addBreakpoint(breakpoints, type, value);
    }
  }







  // -------------------------------------------------------- Remove All Breakpoints -------------------------------------------------------------------
  isBreakpointSet(breakpoints: Array<Breakpoint>, type: BreakpointType) {
    type.breakpointSet = breakpoints.some(x => x.type == type && parseInt(this.currentBreakpointScreenSize) >= parseInt(x.screenSize));
  }








  // ------------------------------------------------------ Set Breakpoint Classes ---------------------------------------------------------------------
  setBreakpointClasses(breakpointsComponent: BreakpointsComponent, element: HTMLElement) {
    let properties = Object.keys(breakpointsComponent);

    properties.forEach((property: string) => {
      // If the type of property is a BreakpointType
      if (typeof (breakpointsComponent[property]) == 'object' && 'setClass' in breakpointsComponent[property]) {


        // If the current property has breakpoints applied to it
        if (breakpointsComponent.breakpoints.find(x => x.type == breakpointsComponent[property])) {

          // Get all breakpoints of this type
          let breakpoints = breakpointsComponent.breakpoints.filter(x => x.type == breakpointsComponent[property]);

          // Set the class for each breakpoint
          breakpoints.forEach((breakpoint: Breakpoint) => {
            breakpoint.type.setClass(breakpoint.value, element, this.getScreenSizeKey(breakpoint.screenSize));
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
  toggleBreakpoint(breakpoints: Array<Breakpoint>, breakpointType: BreakpointType) {
    // If there is a breakpoint set for this breakpoint type
    if (breakpointType.breakpointSet) {
      let breakpoint: Breakpoint = this.getBreakpoint(breakpoints, breakpointType);

      // Remove the breakpoint
      this.removeBreakpoint(breakpoints, breakpoint);
      breakpointType.breakpointSet = false;

    } else {
      // Add the breakpoint
      this.addBreakpoint(breakpoints, breakpointType, breakpointType.value);
      breakpointType.breakpointSet = true;
    }
  }







// ------------------------------------------------------------- Set Breakpoint Value --------------------------------------------------------------------
  setBreakpointValue(value: any, breakpoints: Array<Breakpoint>, breakpointType: BreakpointType) {
    // Set the value for this breakpoint type
    breakpointType.value = value;

    // If there is a breakpoint set at this screen size, remove it
    if (breakpointType.breakpointSet) {
      this.removeBreakpointAtCurrentScreenSize(breakpoints, breakpointType);

      // Add a new breakpoint
      this.addBreakpoint(breakpoints, breakpointType, breakpointType.value);
    }
  }
}