import { Breakpoint } from './breakpoint';
import { Padding } from './padding';
import { VerticalAlignment } from './vertical-alignment';

export interface BreakpointsComponent {
    breakpoints: Array<Breakpoint>;
    padding?: Padding;
    verticalAlignment?: VerticalAlignment;
}