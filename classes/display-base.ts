import { BreakpointData } from './breakpoint-data';
import { BreakpointType } from './breakpoint-type';

export class displayBase {
    addClasses(breakpoints: Array<BreakpointData>, element: HTMLElement) {
        let visibilityBreakpoints = breakpoints.filter(x => x.breakpointType == BreakpointType.Visibility);

        visibilityBreakpoints.forEach((breakpoint: BreakpointData) => {
            if (breakpoint.screenSize != 'Z')
                element.classList.add(breakpoint.value + '-' + breakpoint.screenSize.toLowerCase());
        });
    }
}