import { Padding } from './padding';
import { VerticalAlignment } from './vertical-alignment';
import { HorizontalAlignment } from './horizontal-alignment';
import { Visibility } from './visibility';
import { ColumnSpan } from './column-span';
import { Breakpoint } from 'projects/manager/src/app/classes/breakpoint';

export interface BreakpointsComponent {
    breakpoints: Array<Breakpoint>;
    padding?: Padding;
    horizontalAlignment?: HorizontalAlignment;
    verticalAlignment?: VerticalAlignment;
    visibility?: Visibility;
    columnSpan?: ColumnSpan;
}