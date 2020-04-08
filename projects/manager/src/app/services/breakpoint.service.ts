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
  public onBreakpointChange = new Subject<string>();
  private currentBreakpointScreenSize: string;

  constructor() {
    this.onCanvasWidthChange.subscribe((width: number) => {
      for (let item in BreakpointScreenSize) {
        let minSize: number = parseInt(BreakpointScreenSize[item]);
        let maxSize = this.getNextBreakpointScreenSize(BreakpointScreenSize[item]);

        // Test to see if the width falls between a new breakpoint
        if (width >= minSize && width < maxSize && this.currentBreakpointScreenSize != BreakpointScreenSize[item]) {
          this.currentBreakpointScreenSize = BreakpointScreenSize[item];
          this.onBreakpointChange.next(BreakpointScreenSize[item]);
          break;
        }
      }
    })
  }

  private getNextBreakpointScreenSize(screenSize: string): number {
    let nextScreenSize: number;

    // This is the index of the next breakpoint screen size
    let index: number = Object.values(BreakpointScreenSize).findIndex(x => x == screenSize) + 1;

    if (index == Object.keys(BreakpointScreenSize).length) {
      nextScreenSize = Infinity;
    } else {
      nextScreenSize = parseInt(Object.values(BreakpointScreenSize)[index]);
    }

    return nextScreenSize;
  }

  public setBreakpointValues(breakpoints: Array<Breakpoint>, screenSize: string) {
    breakpoints.forEach(x => x.type.value = x.type.defaultValue);

    // Filter the breakpoints based on screen size
    let filteredBreakpoints = breakpoints.filter((x) => parseInt(screenSize) >= parseInt(x.screenSize))
      .filter((v, i, a) => a.map(x => x.type).indexOf(v.type) == i);

    // Set the values
    filteredBreakpoints.forEach((breakpoint: Breakpoint) => {
      breakpoint.type.value = breakpoint.value;
    });
  }

  sortBreakpoints(breakpoints: Array<Breakpoint>) {
    breakpoints.sort((a, b) => {
      if (parseInt(a.screenSize) < parseInt(b.screenSize)) return 1;
      return -1;
    });
  }


  private getScreenSizeKey(screenSize: string) {
    return Object.keys(BreakpointScreenSize).filter(x => BreakpointScreenSize[x] == screenSize)[0].toLowerCase();
  }


  addBreakpoint(breakpoints: Array<Breakpoint>, type: BreakpointType, screenSize: BreakpointScreenSize, value: any) {
    breakpoints.push(new Breakpoint(type, screenSize, value));

    this.sortBreakpoints(breakpoints);
  }

  removeBreakpoint(breakpoints: Array<Breakpoint>, breakpoint: Breakpoint) {
    breakpoints.splice(breakpoints.findIndex(x => x == breakpoint), 1);
  }


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
            breakpoint.type.value = breakpoint.value;
            breakpoint.type.setClass(element, this.getScreenSizeKey(breakpoint.screenSize));
          });

          // No breakpoints have been set to this property
        } else {

          // Set the class only if the property value is not the default value
          if (breakpointsComponent[property].value != breakpointsComponent[property].defaultValue) {
            breakpointsComponent[property].setClass(element);
          }
        }
      }
    });
  }
}