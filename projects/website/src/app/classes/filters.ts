import { CategoryFilter } from './category-filter';
import { PriceFilter } from './price-filter';
import { QueryFilter } from './query-filter';

export interface Filters {
    categoryFilters: Array<CategoryFilter>;
    priceFilter: PriceFilter;
    ratingFilter: QueryFilter;
    customFilters: Array<QueryFilter>;
}