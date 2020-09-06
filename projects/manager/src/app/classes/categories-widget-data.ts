import { WidgetData } from './widget-data';
import { CategoriesWidgetDataBase } from 'classes/categories-widget-data-base';
import { Category } from './category';

export interface CategoriesWidgetData extends WidgetData, CategoriesWidgetDataBase {
    categories: Array<Category>;
 }