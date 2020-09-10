import { Padding } from './padding';
import { VerticalAlignment } from './vertical-alignment';
import { HorizontalAlignment } from './horizontal-alignment';
import { ColumnSpan } from './column-span';
import { Breakpoint } from 'projects/manager/src/app/classes/breakpoint';
import { Display } from './display';

export interface BreakpointsComponent {
    breakpoints: Array<Breakpoint>;
    padding?: Padding;
    horizontalAlignment?: HorizontalAlignment;
    verticalAlignment?: VerticalAlignment;
    display?: Display;
    columnSpan?: ColumnSpan;
}