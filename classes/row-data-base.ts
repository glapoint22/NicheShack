import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { BreakpointData } from './breakpoint-data';

export interface RowDataBase {
    top: number;
    background: BackgroundData;
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    padding: PaddingData;
    verticalAlignment: string;
    breakpoints: Array<BreakpointData>;
}