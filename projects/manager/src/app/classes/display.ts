import { displayBase } from 'classes/display-base';
import { Visibility } from 'classes/visibility';
import { BreakpointObject } from './breakpoint-object';

export class Display extends displayBase implements BreakpointObject {
    public value: string = Visibility.Visible;
    public defaultValue: string = Visibility.Visible;
    public breakpointSet: boolean;
}