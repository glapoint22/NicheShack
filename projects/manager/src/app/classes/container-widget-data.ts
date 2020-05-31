import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { RowData } from './row-data';

export interface ContainerWidgetData extends WidgetData {
    background: BackgroundData;
    border: BorderData;
    corners: CornersData;
    shadow: ShadowData;
    padding: PaddingData;
    rows: Array<RowData>
}