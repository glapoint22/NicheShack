import { CategoriesFilter } from './categories-filter';
import { PriceFilter } from './price-filter';
import { QueryFilter } from './query-filter';

export interface Filters {
    categoriesFilter: CategoriesFilter;
    priceFilter: PriceFilter;
    ratingFilter: QueryFilter;
    customFilters: Array<QueryFilter>;
}