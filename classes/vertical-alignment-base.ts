import { BreakpointData } from './breakpoint-data';
import { BreakpointType } from './breakpoint-type';
import { VerticalAlign } from './vertical-align';

export class VerticalAlignmentBase {
    addClasses(breakpoints: Array<BreakpointData>, element: HTMLElement, value: string) {
        if (!breakpoints && !value) return;

        let verticalAlignmentBreakpoints: Array<BreakpointData> = [];

        if (breakpoints) verticalAlignmentBreakpoints = breakpoints.filter(x => x.breakpointType == BreakpointType.VerticalAlignment);

        // If there are any breakpoints, add each breakpoint class 
        if (verticalAlignmentBreakpoints.length > 0) {
            verticalAlignmentBreakpoints.forEach((breakpoint: BreakpointData) => {
                element.classList.add(this.getClassName(breakpoint.value) + '-' + breakpoint.screenSize.toLowerCase());
            });

            // We have no breakpoints, add a single class
        } else if (value) {
            if (value != VerticalAlign.Top) element.classList.add(this.getClassName(value));
        }
    }



    private getClassName(value: string): string {
        let className: string;

        switch (value) {
            case VerticalAlign.Top:
                className = 'vertical-align-top';
                break;

            case VerticalAlign.Middle:
                className = 'vertical-align-middle';
                break;

            case VerticalAlign.Bottom:
                className = 'vertical-align-bottom';
                break;
        }

        return className;
    }
}