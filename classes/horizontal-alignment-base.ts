import { BreakpointData } from './breakpoint-data';
import { BreakpointType } from './breakpoint-type';
import { HorizontalAlign } from './horizontal-align';

export class HorizontalAlignmentBase {
    addClasses(breakpoints: Array<BreakpointData>, element: HTMLElement, value: string) {
        if (!breakpoints && !value) return;

        let horizontalAlignmentBreakpoints: Array<BreakpointData> = [];

        if (breakpoints) horizontalAlignmentBreakpoints = breakpoints.filter(x => x.breakpointType == BreakpointType.HorizontalAlignment);

        // If there are any breakpoints, add each breakpoint class 
        if (horizontalAlignmentBreakpoints.length > 0) {
            horizontalAlignmentBreakpoints.forEach((breakpoint: BreakpointData) => {
                element.classList.add(this.getClassName(breakpoint.value) + '-' + breakpoint.screenSize.toLowerCase());
            });

            // We have no breakpoints, add a single class
        } else if (value) {
            if (value != HorizontalAlign.Left) element.classList.add(this.getClassName(value));
        }
    }



    private getClassName(value: string): string {
        let className: string;

        switch (value) {
            case HorizontalAlign.Left:
                className = 'horizontal-align-left';
                break;

            case HorizontalAlign.Center:
                className = 'horizontal-align-center';
                break;

            case HorizontalAlign.Right:
                className = 'horizontal-align-right';
                break;
        }

        return className;
    }
}