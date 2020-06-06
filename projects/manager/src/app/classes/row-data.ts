import { ColumnData } from './column-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { BreakpointData } from './breakpoint-data';

export class RowData {
    public name: string;
    public top: number;
    public background: BackgroundData = new BackgroundData();
    public border: BorderData = new BorderData();
    public corners: CornersData = new CornersData();
    public shadow: ShadowData = new ShadowData();
    public padding: PaddingData = new PaddingData();
    public verticalAlignment: string;
    public breakpoints: Array<BreakpointData> = [];
    public columns: Array<ColumnData> = [];
}