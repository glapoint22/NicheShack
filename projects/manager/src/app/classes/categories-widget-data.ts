import { Category } from './category';
import { WidgetData } from './widget-data';

export class CategoriesWidgetData extends WidgetData {
    caption: string;
    categories: Array<Category> = [];
}