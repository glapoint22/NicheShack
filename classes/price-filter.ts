import { PriceFilterOption } from './price-filter-option';

export interface PriceFilter {
    caption: string;
    options: Array<PriceFilterOption>;
}