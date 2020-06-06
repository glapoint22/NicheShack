import { WidgetData } from './widget-data';
import { BorderData } from './border-data';
import { ShadowData } from './shadow-data';

export class LineWidgetData extends WidgetData {
    border: BorderData = new BorderData();
    shadow: ShadowData = new ShadowData();
}