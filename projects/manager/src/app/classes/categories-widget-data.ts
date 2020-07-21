import { Category } from './category';
import { WidgetData } from './widget-data';
import { CaptionData } from './caption-data';
import { ShadowData } from './shadow-data';

export interface CategoriesWidgetData extends WidgetData {
    caption: CaptionData;
    categories: Array<Category>;
    textColor: string;
    backgroundColor: string;
    shadow: ShadowData;
}