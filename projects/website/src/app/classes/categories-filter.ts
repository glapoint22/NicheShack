import { CategoryFilter } from './category-filter';

export interface CategoriesFilter {
    visible: Array<CategoryFilter>;
    hidden: Array<CategoryFilter>;
}