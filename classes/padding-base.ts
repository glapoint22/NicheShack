import { BreakpointData } from './breakpoint-data';
import { BreakpointType } from './breakpoint-type';
import { PaddingData } from './padding-data';

export class PaddingBase {
    addClasses(breakpoints: Array<BreakpointData>, element: HTMLElement, paddingData: PaddingData) {
        if (!breakpoints && !paddingData) return;

        let paddingTypes = [
            'PaddingTop',
            'PaddingRight',
            'PaddingBottom',
            'PaddingLeft'
        ];

        // Loop through each of the padding types
        paddingTypes.forEach((paddingType: string) => {
            let paddingBreakpoints: Array<BreakpointData> = [];


            if (breakpoints) paddingBreakpoints = breakpoints.filter(x => x.breakpointType == BreakpointType[paddingType]);


            // If there any breakpoints for this padding type
            // Add the classes with the screen size
            if (paddingBreakpoints.length > 0) {
                paddingBreakpoints.forEach((breakpoint: BreakpointData) => {
                    element.classList.add(this.getClassName(breakpoint.breakpointType) + '-' +
                        breakpoint.value.substr(0, breakpoint.value.length - 2) +
                        '-' + breakpoint.screenSize.toLowerCase());
                });

                // There are no breakpoints for this padding type
                // Add the classes without the screen size
            } else if (paddingData) {
                let paddingValue = paddingData[paddingType.substring(7).toLowerCase()];

                // Only add class if value is not zero
                if (paddingValue != '0px') {
                    element.classList.add(this.getClassName(BreakpointType[paddingType]) + '-' +
                        paddingValue.substr(0, paddingValue.length - 2));
                }
            }
        });
    }


    private getClassName(breakpointType: BreakpointType): string {
        let className: string;

        switch (breakpointType) {
            case BreakpointType.PaddingTop:
                className = 'padding-top';
                break;

            case BreakpointType.PaddingRight:
                className = 'padding-right';
                break;


            case BreakpointType.PaddingBottom:
                className = 'padding-bottom';
                break;

            case BreakpointType.PaddingLeft:
                className = 'padding-left';
                break;
        }

        return className;
    }
}