import { CategoriesWidgetDataBase } from 'classes/categories-widget-data-base';
import { Category } from '../interfaces/category';

export interface CategoriesWidgetData extends CategoriesWidgetDataBase {
    categories: Array<Category>;
} 