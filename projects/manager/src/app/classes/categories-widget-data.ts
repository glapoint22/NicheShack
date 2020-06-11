import { Category } from './category';
import { WidgetData } from './widget-data';
import { CaptionData } from './caption-data';
import { ShadowData } from './shadow-data';

export class CategoriesWidgetData extends WidgetData {
    public caption: CaptionData = new CaptionData();
    public categories: Array<Category> = [];
    public textColor: string;
    public backgroundColor: string;
    public shadow: ShadowData = new ShadowData();
}