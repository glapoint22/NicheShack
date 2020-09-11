import { BreakpointData } from './breakpoint-data';
import { BreakpointType } from './breakpoint-type';

export class ColumnSpanBase {
    addClasses(breakpoints: Array<BreakpointData>, element: HTMLElement, columnSpan: number) {
        let columnSpanBreakpoints: Array<BreakpointData> = [];

        if (breakpoints) columnSpanBreakpoints = breakpoints.filter(x => x.breakpointType == BreakpointType.ColumnSpan);

        if (columnSpanBreakpoints.length > 0) {
            columnSpanBreakpoints.forEach((breakpoint: BreakpointData) => {
                element.classList.add('col-' + breakpoint.value + '-' + breakpoint.screenSize.toLowerCase());
            });
        } else if (columnSpan) {
            element.classList.add('col-' + columnSpan);
        }
    }
}