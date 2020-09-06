import { CaptionData } from './caption-data';
import { ShadowData } from './shadow-data';

export interface CategoriesWidgetDataBase {
    caption: CaptionData;
    textColor: string;
    backgroundColor: string;
    shadow: ShadowData;
}