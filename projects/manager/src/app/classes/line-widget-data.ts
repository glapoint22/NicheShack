import { WidgetData } from './widget-data';
import { BorderData } from './border-data';
import { ShadowData } from './shadow-data';

export interface LineWidgetData extends WidgetData {
    border: BorderData;
    shadow: ShadowData;
}