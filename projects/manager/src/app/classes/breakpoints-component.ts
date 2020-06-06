import { Breakpoint } from './breakpoint';
import { Padding } from './padding';
import { VerticalAlignment } from './vertical-alignment';
import { HorizontalAlignment } from './horizontal-alignment';
import { Visibility } from './visibility';
import { ColumnSpan } from './column-span';

export interface BreakpointsComponent {
    breakpoints: Array<Breakpoint>;
    padding?: Padding;
    horizontalAlignment?: HorizontalAlignment;
    verticalAlignment?: VerticalAlignment;
    visibility?: Visibility;
    columnSpan?: ColumnSpan;
}