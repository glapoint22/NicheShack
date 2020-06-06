import { WidgetData } from './widget-data';
import { BackgroundData } from './background-data';
import { BorderData } from './border-data';
import { CornersData } from './corners-data';
import { ShadowData } from './shadow-data';
import { PaddingData } from './padding-data';
import { RowData } from './row-data';

export class ContainerWidgetData extends WidgetData {
    background: BackgroundData = new BackgroundData();
    border: BorderData = new BorderData();
    corners: CornersData = new CornersData();
    shadow: ShadowData = new ShadowData();
    padding: PaddingData = new PaddingData();
    rows: Array<RowData> = [];
}