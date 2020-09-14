import { BorderData } from './border-data';
import { ShadowData } from './shadow-data';
import { WidgetDataBase } from './widget-data-base';

export interface LineWidgetDataBase extends WidgetDataBase {
    border: BorderData;
    shadow: ShadowData;
}