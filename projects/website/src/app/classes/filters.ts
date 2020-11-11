import { CategoryFilter } from './category-filter';
import { QueryFilter } from './query-filter';

export interface Filters {
    categoryFilters: Array<CategoryFilter>;
    priceFilter: QueryFilter;
    ratingFilter: QueryFilter;
    customFilters: Array<QueryFilter>;
}