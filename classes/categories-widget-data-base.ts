import { CaptionData } from './caption-data';
import { ShadowData } from './shadow-data';
import { WidgetDataBase } from './widget-data-base';

export interface CategoriesWidgetDataBase extends WidgetDataBase {
    caption: CaptionData;
    textColor: string;
    backgroundColor: string;
    shadow: ShadowData;
}