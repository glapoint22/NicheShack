import { BreakpointVerticalAlignment, BreakpointType } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';
import { RowData } from './row-data';

export class VerticalAlignment extends Alignment implements BreakpointObject {
    public value: BreakpointVerticalAlignment = BreakpointVerticalAlignment.Top;
    public defaultValue: BreakpointVerticalAlignment = BreakpointVerticalAlignment.Top;
    public breakpointSet: boolean;
    public breakpointType: BreakpointType = BreakpointType.VerticalAlignment;

    setClass(value: string, element: HTMLElement, screenSize?: string) {
        switch (value) {
            case BreakpointVerticalAlignment.Top:
                this.applyClass(element, screenSize, 'vertical-align-top');
                break;

            case BreakpointVerticalAlignment.Middle:
                this.applyClass(element, screenSize, 'vertical-align-middle');
                break;

            case BreakpointVerticalAlignment.Bottom:
                this.applyClass(element, screenSize, 'vertical-align-bottom');
                break;
        }
    }

    setData(value: string) {
        if (value) {
            this.value = value as BreakpointVerticalAlignment;
        }
    }


    getData(rowData: RowData) {
        if (this.value != this.defaultValue) rowData.verticalAlignment = this.value;
    }
}