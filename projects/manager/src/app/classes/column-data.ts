import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { BreakpointData } from './breakpoint-data';

export class ColumnData {
    public name: string;
    public background: BackgroundData = new BackgroundData();
    public border: BorderData = new BorderData();
    public corners: CornersData = new CornersData();
    public shadow: ShadowData = new ShadowData();
    public padding: PaddingData = new PaddingData;
    public breakpoints: Array<BreakpointData> = [];
    public columnSpan: number;
    public widgetData: WidgetData = new WidgetData();
}