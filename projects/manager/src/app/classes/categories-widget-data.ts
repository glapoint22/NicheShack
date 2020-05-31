import { Category } from './category';
import { WidgetData } from './widget-data';

export interface CategoriesWidgetData extends WidgetData {
    caption: string;
    categories: Array<Category>;
}